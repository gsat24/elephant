import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot, ArrowRight, LogOut, MessageSquareHeart, ShieldCheck, Sparkles, Flame, Info, Loader2, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { model, analyzeChat } from '../lib/gemini'
import ElephantIcon from './ElephantIcon'

const ChatSession = ({ onEnd, role = 'A', roomCode }) => {
  console.log('ChatSession rendering with motion:', typeof motion);
  const storageKey = `elephant-room-${roomCode}`;
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, sender: 'system', text: `Halo! Saya AI Mediator Anda. Saat ini giliran Pihak A untuk bicara. Saya akan membantu menghaluskan kalimat agar diskusi tetap dingin.`, type: 'info' }
    ];
  });

  const [inputText, setInputText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [currentTurn, setCurrentTurn] = useState('A')
  const [isDirectMode, setIsDirectMode] = useState(false)
  const [toneIntensity, setToneIntensity] = useState(20)
  const [isGettingSuggestion, setIsGettingSuggestion] = useState(false)
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}-sessions`);
    return saved ? parseInt(saved) : 0;
  });
  
  const scrollRef = useRef(null)

  // Sync with localStorage and other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === storageKey && e.newValue) {
        const newMessages = JSON.parse(e.newValue);
        setMessages(newMessages);
      }
      if (e.key === `${storageKey}-sessions` && e.newValue) {
        setSessionCount(parseInt(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // Update turn and mode based on messages
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    localStorage.setItem(`${storageKey}-sessions`, sessionCount.toString());
    
    const lastMsg = messages[messages.length - 1];
    
    // Cek apakah sudah masuk Direct Mode
    const directModeActive = messages.some(m => m.directMode);
    if (directModeActive) {
      setIsDirectMode(true);
      setCurrentTurn('BOTH'); // Gunakan flag khusus untuk mematikan giliran
    } else if (lastMsg) {
      if (lastMsg.sender === 'mediator') {
        if (lastMsg.shouldRelay) {
          setCurrentTurn(lastMsg.fromRole === 'A' ? 'B' : 'A');
        } else {
          setCurrentTurn(lastMsg.fromRole);
        }
      } else if ((lastMsg.sender === 'A' || lastMsg.sender === 'B') && lastMsg.directMode) {
        setIsDirectMode(true);
        setCurrentTurn('BOTH');
      }
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, storageKey]);

  const handleSend = async () => {
    if (!inputText.trim()) return

    // Jika mode langsung, kirim tanpa refine AI
    if (isDirectMode) {
      const newMessage = {
        id: Date.now(),
        sender: role,
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      const updatedMessages = [...messages, newMessage];
      // UPDATE STATE DULU baru localStorage untuk kecepatan UI
      setMessages(updatedMessages);
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
      setInputText('');
      return;
    }

    // Mode Mediator: Proses Otomatis
    setIsTranslating(true)
    const originalInput = inputText;
    setInputText(''); // Clear input segera
    
    // 1. Tambahkan pesan asli sebagai 'Private' (hanya dilihat pengirim)
    const privateMsg = {
      id: Date.now(),
      sender: role,
      text: originalInput,
      isPrivate: true, // Flag khusus
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const messagesWithPrivate = [...messages, privateMsg];
    setMessages(messagesWithPrivate);
    localStorage.setItem(storageKey, JSON.stringify(messagesWithPrivate));

    try {
      // Ambil riwayat percakapan privat terakhir antara pengirim dan mediator untuk konteks
      const privateHistory = messages
        .filter(m => (m.fromRole === role || m.sender === role) && !m.shouldRelay)
        .slice(-4)
        .map(m => `${m.sender === 'mediator' ? 'Mediator' : 'User'}: ${m.text}`)
        .join('\n');

      const prompt = `Anda adalah seorang Mediator Profesional bersertifikat. 
      Anda sedang berada dalam sesi KLARIFIKASI PRIVAT dengan Pihak ${role}. Pasangannya tidak bisa melihat percakapan ini sampai Anda memutuskan untuk menyampaikannya.

      Riwayat percakapan privat terakhir:
      ${privateHistory}

      Pesan terbaru dari Pihak ${role}: "${originalInput}"

      Tugas Anda:
      1. ANALISIS: Apakah pesan ini sudah cukup jelas, tenang, dan solutif untuk disampaikan ke pasangan? 
      2. KEPUTUSAN: 
         - Jika pesan masih emosional, tidak jelas, atau menyalahkan: Tetaplah di sesi privat. Tanya lebih dalam, minta klarifikasi, atau bantu dia merumuskan maksudnya (shouldRelay: false).
         - Jika pesan sudah matang atau Anda sudah mendapatkan inti masalah yang jelas setelah bertanya: Sampaikan ke pasangan (shouldRelay: true).

      Format output JSON:
      {
        "shouldRelay": true/false,
        "toSender": "Tanggapan/Pertanyaan pendalaman jika shouldRelay false, atau validasi jika shouldRelay true",
        "toPartner": "Kosongkan jika shouldRelay false. Jika true, tuliskan pesan yang sudah direfine untuk pasangan."
      }

      Aturan Penting:
      - Jika shouldRelay false: Fokus bertanya "Apa yang Anda rasakan?" atau "Apa kebutuhan Anda sebenarnya di balik kemarahan ini?"
      - Jika shouldRelay true: Jangan gunakan kata-kata asli pengirim jika kasar. Gunakan gaya bahasa mediator yang netral.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let content;
      try {
        const text = response.text().trim();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, '').trim();
        content = JSON.parse(jsonStr);
      } catch {
        content = {
          shouldRelay: false,
          toSender: `Saya menangkap poin Anda. Bisa ceritakan lebih lanjut apa yang membuat Anda merasa demikian agar saya bisa menyampaikannya dengan tepat ke pasangan?`,
          toPartner: ""
        };
      }
      
      const newMessage = {
        id: Date.now(),
        sender: 'mediator',
        fromRole: role,
        shouldRelay: content.shouldRelay,
        text: content.shouldRelay ? content.toPartner : content.toSender,
        feedbackToSender: content.shouldRelay ? content.toSender : null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedMessages = [...messagesWithPrivate, newMessage];
      setMessages(updatedMessages);
      
      if (content.shouldRelay) {
        setSessionCount(prev => prev + 1);
        localStorage.setItem(`${storageKey}-sessions`, (sessionCount + 1).toString());
      }
      
      // Update tensi diskusi
      const toxicityKeywords = ['kamu', 'selalu', 'tidak pernah', 'bodoh', 'salah', 'egois'];
      const foundKeywords = toxicityKeywords.filter(k => originalInput.toLowerCase().includes(k));
      setToneIntensity(prev => Math.min(prev + (foundKeywords.length * 10), 100));

    } catch (error) {
      console.error("Mediator Error:", error);
      // Jika error, tetap tampilkan sebagai pesan mediator agar alur tidak rusak
      const fallbackMsg = {
        id: Date.now(),
        sender: 'mediator',
        fromRole: role,
        shouldRelay: false,
        text: `Aduh, sorry banget, gue lagi agak 'blank' nih koneksinya. Intinya gue dapet poin lo soal itu. Bisa ceritain lebih detail gak biar gue enak nyampeinnya ke pasangan lo? 🐘`,
        feedbackToSender: `Sori ya, ada kendala teknis dikit, tapi gue tetep dengerin kok. Coba jelasin lagi ya!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const updatedMessages = [...messagesWithPrivate, fallbackMsg];
      setMessages(updatedMessages);
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    } finally {
      setIsTranslating(false)
    }
  }

  const toggleDirectMode = () => {
    const systemMsg = {
      id: Date.now(),
      sender: 'system',
      text: 'Moderator: "Bagus sekali. Kalian sudah saling mendengarkan melalui saya. Sekarang, saya akan membuka ruang komunikasi langsung. Silakan bicara satu sama lain, saya akan tetap mengamati di sini."',
      type: 'info',
      directMode: true
    };
    const updatedMessages = [...messages, systemMsg];
    setMessages(updatedMessages);
    localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    setIsDirectMode(true);
  }

  const handleGetSuggestion = async () => {
    if (messages.filter(m => m.sender !== 'system').length < 2) return;
    
    setIsGettingSuggestion(true);
    try {
      const chatHistory = messages
        .filter(m => m.sender !== 'system')
        .map(m => `${m.sender === 'mediator' ? `Mediator (dari ${m.fromRole})` : `Pihak ${m.sender}`}: ${m.text}`)
        .join('\n');

      const prompt = `Analisis percakapan antara pasangan ini dan berikan 1 saran refleksi yang sangat bijak, netral, dan menenangkan untuk kedua belah pihak. 
      Fokus pada empati dan solusi jangka panjang. Gunakan bahasa Indonesia yang santun dan hangat.
      
      Riwayat Percakapan:
      ${chatHistory}
      
      Output hanya berupa pesan saran dari Anda sebagai Mediator AI, dimulai dengan kalimat seperti "Sebagai mediator, saya melihat..." atau "Mungkin kalian bisa mencoba merenungkan..."
      Maksimal 3 kalimat.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const suggestion = response.text().trim();

      const suggestionMsg = {
        id: Date.now(),
        sender: 'mediator',
        text: suggestion,
        isSuggestion: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedMessages = [...messages, suggestionMsg];
      setMessages(updatedMessages);
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error getting suggestion:", error);
    } finally {
      setIsGettingSuggestion(false);
    }
  }

  const handleEndSession = async () => {
    setIsTranslating(true);
    const analysis = await analyzeChat(messages.filter(m => m.sender !== 'system'));
    setIsTranslating(false);
    
    if (analysis) {
      onEnd({
        score: analysis.score,
        issue: analysis.mainIssue,
        resolutions: analysis.tips,
        sentiment: analysis.sentiment
      });
    } else {
      onEnd({
        score: 75,
        issue: "Komunikasi mengenai pembagian tugas rumah tangga.",
        resolutions: ["Saling mendengarkan", "Buat jadwal bersama"],
        sentiment: "Positif"
      });
    }
  }

  const messageCount = messages.filter(m => m.sender !== 'system').length;

  return (
    <div className="w-full max-w-7xl mx-auto h-screen flex flex-col bg-[#F8FAFC] lg:px-10 lg:py-6 relative">
      <div className="flex-1 flex flex-col bg-white lg:rounded-[3rem] shadow-2xl overflow-hidden relative border border-slate-100">
        {/* Header */}
        <div className="p-6 lg:p-10 border-b flex flex-col bg-white sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <ElephantIcon className="w-6 h-6 lg:w-8 lg:h-8 text-elephant-900" />
                <h2 className="text-sm lg:text-xl font-black text-elephant-900 uppercase tracking-[0.2em]">Elephant Mediator</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className={clsx(
                    "w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-black shadow-sm transition-all",
                    role === 'A' ? "bg-elephant-900 text-white scale-110 z-10" : "bg-elephant-100 text-elephant-600"
                  )}>A</div>
                  <div className={clsx(
                    "w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-black shadow-sm transition-all",
                    role === 'B' ? "bg-elephant-900 text-white scale-110 z-10" : "bg-elephant-100 text-elephant-600"
                  )}>B</div>
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <span className="text-[10px] lg:text-sm font-bold text-elephant-400 uppercase tracking-widest">Room: {roomCode}</span>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndSession}
              className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl lg:rounded-[1.5rem] bg-coral-50 text-coral-500 transition-all absolute right-6 top-6 lg:right-10 lg:top-10"
            >
              <LogOut className="w-6 h-6 lg:w-8 lg:h-8" />
            </motion.button>
          </div>

          <div className="bg-elephant-50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] border border-elephant-100/50 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] lg:text-xs font-black text-elephant-400 uppercase tracking-widest flex items-center gap-2">
                <Flame className={clsx("w-4 h-4", toneIntensity > 60 ? "text-coral-500 animate-pulse" : "text-elephant-300")} />
                Tensi Diskusi
              </span>
              <span className="text-[10px] lg:text-xs font-black text-elephant-500 uppercase tracking-widest">
                {toneIntensity < 40 ? 'Tenang' : toneIntensity < 70 ? 'Hangat' : 'Tinggi'}
              </span>
            </div>
            <div className="h-2 lg:h-3 w-full bg-elephant-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${toneIntensity}%` }}
                className={clsx(
                  "h-full transition-all duration-1000 ease-out",
                  toneIntensity < 40 ? "bg-sage-500" : toneIntensity < 70 ? "bg-amber-400" : "bg-coral-500"
                )}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-8 bg-elephant-50/20"
        >
          {messages.filter(m => {
            if (m.sender === 'system') return true;
            if (m.sender === role) return true;
            if (m.sender === 'mediator') {
              if (m.shouldRelay) return true;
              if (m.fromRole === role) return true;
            }
            if (m.directMode) return true;
            return false;
          }).map((msg) => (
            <div 
              key={msg.id} 
              className={clsx(
                "flex flex-col w-full",
                msg.sender === 'system' || msg.sender === 'mediator' ? "items-center" : 
                msg.sender === 'A' ? "items-end" : "items-start"
              )}
            >
              {msg.sender === 'system' ? (
                <div className="bg-white/80 backdrop-blur-sm border border-elephant-100 text-elephant-600 text-[11px] lg:text-sm px-6 py-4 lg:px-10 lg:py-6 rounded-[2rem] lg:rounded-[3rem] max-w-[90%] lg:max-w-[60%] text-center shadow-sm font-medium leading-relaxed">
                  <Info className="w-5 h-5 mb-2 mx-auto opacity-40 text-elephant-400" />
                  {msg.text}
                </div>
              ) : msg.sender === 'mediator' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="max-w-[95%] lg:max-w-[70%] w-full flex flex-col items-center gap-4"
                >
                  <div className={clsx(
                    "border-2 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] shadow-xl relative overflow-hidden w-full transition-all duration-700",
                    msg.shouldRelay 
                      ? "bg-white border-sage-100 shadow-sage-900/5" 
                      : "bg-elephant-900 border-elephant-800 shadow-elephant-900/20 text-white"
                  )}>
                    <div className="absolute top-0 right-0 p-8 lg:p-12 opacity-5">
                      <Bot className={clsx("w-20 h-20 lg:w-40 lg:h-40", msg.shouldRelay ? "text-sage-600" : "text-white")} />
                    </div>
                    
                    {!msg.shouldRelay ? (
                      /* Tampilan Sesi Interview Privat */
                      <div className="space-y-6 lg:space-y-8 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <MessageSquareHeart className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                          </div>
                          <p className="text-[10px] lg:text-xs font-black text-amber-500 uppercase tracking-[0.3em]">
                            Sesi Klarifikasi Privat
                          </p>
                        </div>
                        <p className="text-base lg:text-2xl text-white leading-relaxed font-bold">
                          {msg.text}
                        </p>
                        <div className="pt-6 border-t border-white/10">
                          <p className="text-[10px] lg:text-xs text-elephant-400 font-black uppercase tracking-widest italic opacity-70">
                            Hanya Anda yang melihat percakapan ini. Pasangan Anda sedang menunggu giliran.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Tampilan Relay Publik */
                      <div className="relative z-10">
                        {/* Feedback khusus untuk pengirim */}
                        {msg.fromRole === role && msg.feedbackToSender && (
                          <div className="mb-8 p-6 lg:p-8 bg-sage-50/80 rounded-[2rem] lg:rounded-[2.5rem] border border-sage-100 shadow-inner">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-sage-500 rounded-full flex items-center justify-center shadow-lg shadow-sage-500/20">
                                <ShieldCheck className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                              </div>
                              <p className="text-[10px] lg:text-xs font-black text-sage-600 uppercase tracking-[0.3em]">
                                Catatan Mediator untuk Anda
                              </p>
                            </div>
                            <p className="text-sm lg:text-lg text-sage-700 leading-relaxed font-black italic">
                              "{msg.feedbackToSender}"
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-3 mb-4 px-1">
                          <Sparkles className="w-5 h-5 text-amber-400" />
                          <p className="text-[10px] lg:text-xs font-black text-elephant-400 uppercase tracking-[0.3em]">
                            Penyampaian Mediator ke Pasangan
                          </p>
                        </div>
                        <div className="bg-elephant-50/50 p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-elephant-100/50">
                          <p className="text-base lg:text-2xl text-elephant-900 leading-relaxed font-bold">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 pt-6 flex items-center justify-between px-2 border-t border-black/5 lg:border-none">
                      <span className={clsx(
                        "text-[10px] font-black uppercase tracking-widest",
                        msg.shouldRelay ? "text-elephant-300" : "text-elephant-500"
                      )}>
                        Mediator AI Professional
                      </span>
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-widest",
                        msg.shouldRelay ? "text-elephant-300" : "text-elephant-500"
                      )}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, x: msg.sender === 'A' ? 20 : -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className={clsx(
                    "max-w-[85%] lg:max-w-[50%] flex flex-col gap-2",
                    msg.sender === 'A' ? "items-end" : "items-start"
                  )}
                >
                  <div className={clsx(
                    "p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-sm font-bold text-sm lg:text-lg leading-relaxed transition-all duration-300",
                    msg.isPrivate 
                      ? "bg-slate-100 text-slate-400 border-2 border-dashed border-slate-200" 
                      : msg.sender === 'A' 
                        ? "bg-elephant-900 text-white rounded-tr-none shadow-xl shadow-elephant-900/10" 
                        : "bg-white text-elephant-900 rounded-tl-none border border-slate-100 shadow-xl shadow-slate-200/50"
                  )}>
                    {msg.isPrivate && (
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="text-[8px] lg:text-[10px] uppercase tracking-widest font-black">Draft Privat</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                  <span className="text-[10px] lg:text-xs font-black text-slate-300 uppercase tracking-widest px-2">
                    {msg.sender === role ? 'Anda' : `Pihak ${msg.sender}`} • {msg.timestamp}
                  </span>
                </motion.div>
              )}
            </div>
          ))}

          {isTranslating && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[3rem] border border-elephant-100 rounded-tl-none shadow-xl flex items-center gap-4">
                <div className="flex gap-2">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 lg:w-3 lg:h-3 bg-elephant-400 rounded-full" />
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 lg:w-3 lg:h-3 bg-elephant-400 rounded-full" />
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 lg:w-3 lg:h-3 bg-elephant-400 rounded-full" />
                </div>
                <p className="text-xs lg:text-sm text-elephant-400 font-black uppercase tracking-widest">AI sedang menyaring emosi...</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 lg:p-12 bg-white border-t border-slate-100 relative z-30">
          <div className="max-w-4xl mx-auto">
            {currentTurn !== role && !isDirectMode ? (
              <div className="flex flex-col items-center gap-4 py-4 lg:py-8">
                <div className="flex items-center gap-3 px-6 py-3 bg-elephant-50 rounded-full border border-elephant-100">
                  <Loader2 className="w-4 h-4 text-elephant-400 animate-spin" />
                  <span className="text-xs lg:text-sm font-black text-elephant-400 uppercase tracking-widest">
                    Menunggu Pihak {currentTurn === 'A' ? 'A' : 'B'}...
                  </span>
                </div>
                <p className="text-[10px] lg:text-xs font-bold text-slate-400 text-center max-w-xs">
                  Sabar ya, mediator sedang membantu pasanganmu merumuskan kalimat yang lebih baik.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      {isDirectMode ? 'Mode Komunikasi Langsung' : 'Sesi Privat dengan Mediator'}
                    </span>
                  </div>
                  {messageCount >= 4 && !isDirectMode && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleDirectMode}
                      className="text-[10px] lg:text-xs font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest flex items-center gap-2"
                    >
                      Buka Chat Langsung <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  )}
                </div>
                <div className="relative group">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder={isDirectMode ? "Kirim pesan langsung ke pasangan..." : "Tulis apa yang kamu rasakan, mediator akan membantu menghaluskannya..."}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-elephant-900 focus:bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 pr-24 lg:pr-32 text-sm lg:text-xl font-bold text-slate-600 placeholder:text-slate-300 transition-all min-h-[100px] lg:min-h-[150px] resize-none shadow-inner"
                    disabled={isTranslating}
                  />
                  <div className="absolute right-4 bottom-4 lg:right-6 lg:bottom-6 flex gap-2 lg:gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGetSuggestion}
                      disabled={isTranslating || messages.length < 3 || isGettingSuggestion}
                      className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl lg:rounded-[1.5rem] bg-white border border-slate-100 text-amber-500 shadow-sm hover:shadow-md transition-all disabled:opacity-30"
                      title="Dapatkan Saran Mediator"
                    >
                      {isGettingSuggestion ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6 lg:w-8 lg:h-8" />}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputText.trim() || isTranslating}
                      className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl lg:rounded-[1.5rem] bg-elephant-900 text-white shadow-xl shadow-elephant-900/20 transition-all disabled:opacity-30"
                    >
                      {isTranslating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 lg:w-8 lg:h-8" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSession
