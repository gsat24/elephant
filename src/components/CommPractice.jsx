import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, MessageSquare, Play, Star, BookOpen, Heart, Building2, Briefcase, Loader2, Send } from 'lucide-react'
import { generateCommPractice, analyzeChat } from '../lib/gemini'

const scenarios = [
  {
    id: 1,
    category: 'Relationship',
    title: 'Menghadapi Pasangan Defensif',
    difficulty: 'Easy',
    points: 100,
    desc: 'Latih cara menyampaikan keinginan tanpa membuat pasangan merasa diserang.',
    icon: <Heart className="w-5 h-5 text-coral-500" />
  },
  {
    id: 2,
    category: 'Corporate',
    title: 'Negosiasi Kenaikan Gaji',
    difficulty: 'Hard',
    points: 300,
    desc: 'Gunakan data dan argumen logis tanpa terlihat emosional atau menuntut.',
    icon: <Building2 className="w-5 h-5 text-brand-500" />
  },
  {
    id: 3,
    category: 'Work',
    title: 'Menghadapi Klien Ghosting',
    difficulty: 'Medium',
    points: 200,
    desc: 'Cara menanyakan kabar proyek yang sopan namun tetap menunjukkan urgensi.',
    icon: <Briefcase className="w-5 h-5 text-sage-500" />
  }
]

const CommPractice = ({ onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [step, setStep] = useState('list') // list, intro, chat, result
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const handleStartPractice = async (scenario) => {
    setSelectedScenario(scenario)
    setStep('intro')
  }

  const handleEnterRoom = async () => {
    setLoading(true)
    setStep('chat')
    try {
      const intro = await generateCommPractice(selectedScenario.title, selectedScenario.category)
      setMessages([{ role: 'assistant', content: intro }])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return
    
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // In a real scenario, we'd call a dedicated "chat" endpoint
      // For now, we reuse analyzeChat to simulate AI response or just use analyzeChat as a placeholder
      const result = await analyzeChat(newMessages)
      if (result) {
        setMessages(prev => [...prev, { role: 'assistant', content: result.summary || "Oke, lanjut..." }])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = async () => {
    setLoading(true)
    try {
      const result = await analyzeChat(messages)
      setAnalysis(result)
      setStep('result')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center gap-6 lg:mb-8">
        <button 
          onClick={() => step === 'list' ? onBack() : setStep('list')} 
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </button>
        <h2 className="text-2xl lg:text-4xl font-black text-brand-900">Latihan Komunikasi</h2>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {step === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="bg-brand-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
                <BookOpen className="w-16 h-16 mb-8 text-brand-300 lg:w-20 lg:h-20" />
                <h3 className="text-3xl lg:text-5xl font-black mb-4 leading-tight">Asah Skill Bicaramu</h3>
                <p className="text-brand-200 font-medium text-lg lg:text-xl max-w-2xl">Pilih skenario simulasi dan lihat sejauh mana AI bisa membantu meningkatkan caramu berkomunikasi.</p>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              </div>

              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="bg-brand-50 p-2 rounded-xl">
                  <Play className="w-5 h-5 text-brand-600 fill-brand-600" />
                </div>
                <h4 className="text-xl lg:text-2xl font-black text-brand-900">Pilih Skenario</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                    onClick={() => handleStartPractice(scenario)}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer group hover:border-brand-900 transition-all h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform group-hover:bg-brand-50">
                          {React.cloneElement(scenario.icon, { className: "w-6 h-6" })}
                        </div>
                        <div className="flex items-center gap-1.5 bg-brand-50 px-4 py-1.5 rounded-full">
                          <Star className="w-4 h-4 text-brand-600 fill-brand-600" />
                          <span className="text-xs font-black text-brand-600 uppercase tracking-wider">{scenario.points} XP</span>
                        </div>
                      </div>
                      <h5 className="text-xl font-black text-brand-900 mb-2">{scenario.title}</h5>
                      <p className="text-sm text-slate-400 font-bold mb-6 leading-relaxed">{scenario.desc}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                        {scenario.difficulty}
                      </span>
                      <div className="flex items-center gap-2 text-brand-900 font-black text-sm group-hover:translate-x-1 transition-transform">
                        Mulai <Play className="w-4 h-4 fill-brand-900" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 max-w-3xl mx-auto py-12"
            >
              <div className="bg-white rounded-[3.5rem] p-12 lg:p-16 border border-slate-100 shadow-2xl text-center">
                <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MessageSquare className="w-12 h-12 text-brand-900 lg:w-16 lg:h-16" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-brand-900 mb-4">Simulasi Dimulai</h3>
                <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                  Anda akan masuk ke dalam percakapan simulasi <span className="text-brand-900 font-black">"{selectedScenario.title}"</span>. AI Elephant akan berperan sebagai lawan bicara Anda.
                </p>
                
                <div className="bg-slate-50 p-8 rounded-[2.5rem] text-left mb-10 border border-slate-100">
                  <span className="text-xs font-black text-brand-400 uppercase tracking-widest block mb-3">Misi Anda:</span>
                  <p className="text-lg font-bold text-slate-600 leading-relaxed italic">
                    "{selectedScenario.desc}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={handleEnterRoom}
                    disabled={loading}
                    className="w-full bg-brand-900 text-white py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-brand-900/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Masuk Ruang Latihan"}
                  </button>
                  <button onClick={() => setStep('list')} className="w-full py-6 text-slate-400 font-black text-lg hover:text-brand-900 transition-colors">
                    Pilih Skenario Lain
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-[75vh] max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-900 p-3 rounded-2xl">
                    {React.cloneElement(selectedScenario.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h4 className="font-black text-brand-900 text-lg">{selectedScenario.title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{selectedScenario.category} Simulation</p>
                  </div>
                </div>
                <button 
                  onClick={handleFinish}
                  className="px-6 py-3 bg-white text-brand-900 rounded-xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:border-brand-900 transition-all"
                >
                  Selesaikan Latihan
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 space-y-6 overflow-y-auto p-8 bg-[#FDFDFD]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-6 rounded-[2rem] font-medium text-base lg:text-lg shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-brand-900 text-white rounded-tr-none' 
                        : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm">
                      <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white border-t border-slate-50">
                <div className="flex gap-4 items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ketik pesanmu di sini..."
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-5 text-lg font-medium focus:outline-none focus:border-brand-900 focus:bg-white transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-brand-900 text-white p-5 rounded-[2rem] disabled:opacity-50 shadow-xl shadow-brand-900/20 hover:scale-110 transition-transform"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && analysis && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 max-w-5xl mx-auto py-8"
            >
              <div className="bg-white rounded-[3.5rem] p-12 lg:p-16 border border-slate-100 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-12 h-12 text-sage-600 fill-sage-600" />
                  </div>
                  <h3 className="text-3xl lg:text-5xl font-black text-brand-900 mb-2">Latihan Selesai!</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Feedback Analisis AI Elephant</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <span className="text-xs font-black text-brand-400 uppercase tracking-widest block mb-4">Ringkasan Sesi:</span>
                      <p className="text-lg font-medium text-slate-600 leading-relaxed bg-slate-50 p-8 rounded-[2.5rem] italic border border-slate-100">
                        "{analysis.summary}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-sage-50/50 p-6 rounded-3xl border border-sage-100">
                        <span className="text-xs font-black text-sage-600 uppercase block mb-2">Skor EQ:</span>
                        <p className="text-3xl font-black text-sage-700">{analysis.eqScore}/100</p>
                      </div>
                      <div className="bg-brand-50/50 p-6 rounded-3xl border border-brand-100">
                        <span className="text-xs font-black text-brand-600 uppercase block mb-2">Tone:</span>
                        <p className="text-xl font-black text-brand-700 capitalize">{analysis.tone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <span className="text-xs font-black text-brand-400 uppercase tracking-widest block mb-4">Saran Elephant:</span>
                      <ul className="space-y-4">
                        {analysis.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-4 text-base font-bold text-slate-500 bg-white p-5 rounded-2xl border border-slate-50 shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setStep('list')}
                      className="w-full bg-brand-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-brand-900/20 hover:scale-[1.02] transition-transform"
                    >
                      Kembali ke Daftar Skenario
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommPractice
