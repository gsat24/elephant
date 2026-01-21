import React, { useState, useEffect } from 'react'
import { ArrowLeft, Loader2, Link as LinkIcon, CheckCircle2, Copy, Share2, Sparkles, KeyRound } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import ElephantIcon from './ElephantIcon'

const SyncSession = ({ onJoined, onBack }) => {
  console.log('SyncSession rendering with motion:', typeof motion);
  const [step, setStep] = useState('choice') // 'choice' | 'invite' | 'input' | 'waiting' | 'ready'
  const [sessionCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase())
  const [inputCode, setInputCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const signalKey = `elephant-signal-${sessionCode}`;
  const joinKey = `elephant-signal-${inputCode}`;

  useEffect(() => {
    if (step === 'waiting') {
      const handleSignal = (e) => {
        if (e.key === signalKey && e.newValue === 'joined') {
          setStep('ready');
        }
      };
      window.addEventListener('storage', handleSignal);
      
      const checkSignal = () => {
        if (localStorage.getItem(signalKey) === 'joined') {
          setStep('ready');
        }
      };
      
      // Delay check slightly to avoid synchronous setState in effect
      const timer = setTimeout(checkSignal, 0);

      return () => {
        window.removeEventListener('storage', handleSignal);
        clearTimeout(timer);
      };
    }

    if (step === 'ready') {
      const readyKey = `elephant-ready-${sessionCode}`;
      localStorage.setItem(readyKey, 'true');
    }
  }, [step, signalKey, sessionCode]);

  useEffect(() => {
    if (step === 'input' && isVerifying) {
      const readyKey = `elephant-ready-${inputCode}`;
      const handleReady = (e) => {
        if (e.key === readyKey && e.newValue === 'true') {
          setIsVerifying(false);
          onJoined('B', inputCode);
        }
      };
      window.addEventListener('storage', handleReady);

      const checkReady = () => {
        if (localStorage.getItem(readyKey) === 'true') {
          setIsVerifying(false);
          onJoined('B', inputCode);
        }
      };

      const timer = setTimeout(checkReady, 0);

      return () => {
        window.removeEventListener('storage', handleReady);
        clearTimeout(timer);
      };
    }
  }, [step, isVerifying, inputCode, onJoined]);

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoin = () => {
    if (inputCode.length < 6) return
    setIsVerifying(true)
    
    // Kirim sinyal ke Host bahwa Guest sudah join
    localStorage.setItem(joinKey, 'joined');
    
    // Guest sekarang menunggu host (handleReady di useEffect akan memicu onJoined)
  }

  const handleStartSession = () => {
    localStorage.removeItem(`elephant-room-${sessionCode}`); // Clear old session data
    onJoined('A', sessionCode)
  }

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col lg:px-10 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between lg:pt-12 bg-transparent">
        <button 
          onClick={step === 'choice' ? onBack : () => setStep('choice')} 
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-800 hover:border-brand-900 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Setup Session</h2>
        <div className="w-12 h-12 lg:hidden"></div>
        <div className="hidden lg:block bg-brand-900 p-3 rounded-2xl shadow-lg shadow-brand-900/20">
          <ElephantIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center lg:mt-8">
        <div className="w-full max-w-4xl px-8">
          <AnimatePresence mode="wait">
            {step === 'choice' && (
              <motion.div 
                key="choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 flex flex-col items-center pb-20"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-4 tracking-tight">Mulai Diskusi</h2>
                  <p className="text-slate-400 text-sm lg:text-lg font-medium max-w-md mx-auto">Pilih bagaimana Anda ingin terhubung dengan pasangan dalam ruang yang aman.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                  <button 
                    onClick={() => setStep('invite')}
                    className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center gap-8 group hover:border-brand-900 hover:shadow-xl transition-all text-center h-full"
                  >
                    <div className="w-20 h-20 bg-brand-50 rounded-[2rem] flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500">
                      <Share2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-black text-brand-900 text-xl lg:text-2xl mb-2">Buat Ruang Baru</h3>
                      <p className="text-xs lg:text-sm text-slate-400 font-bold uppercase tracking-wider">Host diskusi & dapatkan kode akses</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setStep('input')}
                    className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center gap-8 group hover:border-brand-900 hover:shadow-xl transition-all text-center h-full"
                  >
                    <div className="w-20 h-20 bg-sage-50 rounded-[2rem] flex items-center justify-center text-sage-600 group-hover:bg-sage-600 group-hover:text-white transition-all duration-500">
                      <KeyRound className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-black text-brand-900 text-xl lg:text-2xl mb-2">Masukkan Kode</h3>
                      <p className="text-xs lg:text-sm text-slate-400 font-bold uppercase tracking-wider">Gabung ke ruang yang sudah dibuat pasangan</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'invite' && (
              <motion.div 
                key="invite"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12 flex flex-col items-center pb-20"
              >
                <div className="text-center">
                  <div className="bg-brand-900 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-900/20">
                    <ElephantIcon className="text-white w-12 h-12" />
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-4 tracking-tight">Undang Pasangan</h2>
                  <p className="text-slate-400 text-sm lg:text-lg font-medium leading-relaxed max-w-md mx-auto">
                    Ajak pasangan Anda untuk masuk ke ruang diskusi yang aman ini menggunakan kode unik di bawah.
                  </p>
                </div>

                <div className="bg-white p-10 lg:p-16 rounded-[4rem] shadow-2xl shadow-brand-900/5 border border-slate-100 text-center relative overflow-hidden group w-full max-w-2xl">
                  <span className="text-[10px] lg:text-xs font-black text-slate-300 uppercase tracking-[0.3em] block mb-6">Unique Access Code</span>
                  <div className="text-6xl lg:text-8xl font-black text-brand-900 tracking-[0.2em] mb-12 font-mono">{sessionCode}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setStep('waiting')}
                      className="bg-brand-900 text-white py-5 lg:py-6 rounded-2xl font-black text-sm lg:text-base hover:bg-brand-800 transition-all active:scale-95 shadow-xl shadow-brand-900/20 flex items-center justify-center gap-3"
                    >
                      <Share2 className="w-5 h-5" />
                      Kirim Link Undangan
                    </button>
                    <button 
                      onClick={() => { handleCopy(); setStep('waiting'); }}
                      className="bg-slate-50 text-brand-800 py-5 lg:py-6 rounded-2xl font-black text-sm lg:text-base hover:bg-slate-100 transition-all active:scale-95 border border-slate-100 flex items-center justify-center gap-3"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-sage-500" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Berhasil Tersalin' : 'Salin Kode Akses'}
                    </button>
                  </div>
                </div>

                <div className="bg-brand-50/50 backdrop-blur-sm p-8 rounded-[3rem] border border-brand-100 flex items-center gap-6 max-w-2xl">
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <Sparkles className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-xs lg:text-sm text-brand-800/60 leading-relaxed font-bold">
                    Diskusi akan dimulai secara otomatis setelah pasangan Anda memasukkan kode ini di aplikasinya. Kami menjaga privasi obrolan Anda sepenuhnya.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12 flex flex-col items-center pb-20"
              >
                <div className="text-center">
                  <div className="bg-sage-500 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sage-500/20">
                    <ElephantIcon className="text-white w-12 h-12" />
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-4 tracking-tight">Gabung Diskusi</h2>
                  <p className="text-slate-400 text-sm lg:text-lg font-medium leading-relaxed max-w-md mx-auto">
                    Masukkan kode akses yang diberikan oleh pasangan Anda untuk memulai sesi mediator.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-8">
                  <input 
                    type="text"
                    maxLength={6}
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="KODE6"
                    className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 lg:p-10 text-center text-5xl lg:text-6xl font-black tracking-[0.3em] text-brand-900 focus:border-brand-900 focus:ring-0 transition-all placeholder:text-slate-100 font-mono shadow-sm"
                  />

                  <button 
                    onClick={handleJoin}
                    disabled={inputCode.length < 6 || isVerifying}
                    className="w-full bg-brand-900 text-white py-6 lg:py-8 rounded-3xl font-black text-lg lg:text-xl shadow-2xl shadow-brand-900/20 hover:bg-brand-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Memverifikasi...
                      </>
                    ) : (
                      'Masuk Sekarang'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'waiting' && (
              <motion.div 
                key="waiting"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center flex flex-col items-center justify-center pb-20"
              >
                <div className="relative w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-12">
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 bg-brand-200 rounded-full"
                  ></motion.div>
                  <div className="relative bg-white w-48 h-48 lg:w-64 lg:h-64 rounded-full flex items-center justify-center shadow-2xl border border-slate-100">
                    <div className="relative">
                      <Loader2 className="w-20 h-20 lg:w-24 lg:h-24 text-brand-900 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-brand-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-4 tracking-tight">Menunggu Pasangan</h2>
                <p className="text-slate-400 text-sm lg:text-lg font-medium max-w-xs mx-auto leading-relaxed">
                  Kami akan memberitahu Anda segera saat pasangan Anda bergabung di ruang ini.
                </p>
              </motion.div>
            )}

            {step === 'ready' && (
              <motion.div 
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center justify-center pb-20"
              >
                <div className="bg-brand-900 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-900/20 relative">
                  <CheckCircle2 className="w-16 h-16 text-white relative z-10" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-brand-400 rounded-[3rem]"
                  ></motion.div>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-brand-900 mb-6 tracking-tight">Pasangan Siap!</h2>
                <p className="text-slate-400 text-sm lg:text-lg font-medium mb-12">Semua sistem mediator aktif. Mari kita mulai diskusi terbuka ini.</p>

                <div className="bg-white p-8 lg:p-10 rounded-[3rem] shadow-sm border border-slate-100 mb-12 text-left flex items-center gap-6 relative overflow-hidden group w-full max-w-md">
                  <div className="w-20 h-20 bg-brand-50 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-3xl text-brand-900">
                    P
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-brand-900 text-xl leading-none mb-2">Pasangan Anda</p>
                    <p className="text-xs lg:text-sm text-sage-600 font-black flex items-center uppercase tracking-widest">
                      <span className="w-2.5 h-2.5 bg-sage-500 rounded-full mr-3 animate-pulse"></span>
                      Online & Ready
                    </p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartSession}
                  className="w-full max-w-md bg-brand-900 text-white py-6 lg:py-8 rounded-[2rem] font-black text-lg lg:text-xl shadow-2xl shadow-brand-900/30 hover:bg-brand-800 transition-all uppercase tracking-[0.2em]"
                >
                  Masuk Ruang Diskusi
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SyncSession