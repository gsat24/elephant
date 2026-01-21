import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { 
  ChevronLeft, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Loader2,
  ShieldAlert,
  Heart
} from 'lucide-react'
import { model } from '../lib/gemini'

const AntiBullyBot = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Halo. Saya Anti-Bully Bot 🛡️. Jika kamu atau temanmu mengalami perlakuan tidak menyenangkan, intimidasi, atau bullying di sekolah, kamu bisa lapor atau cerita di sini.\n\nSaya akan membantumu mencari solusi dan memberikan dukungan. Kamu tidak sendirian. Apa yang terjadi?' 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const history = []
      history.push({
        role: 'user',
        parts: [{ text: "Kamu adalah Anti-Bully Bot. Tugasmu adalah mendengarkan laporan bullying dengan sangat serius, memberikan dukungan emosional, menjaga kerahasiaan, dan memberikan saran langkah-langkah aman untuk menangani situasi bullying di sekolah. Gunakan bahasa yang menenangkan dan mendukung." }],
      })
      history.push({
        role: 'model',
        parts: [{ text: "Saya siap membantu dan memberikan dukungan aman bagi siapapun yang mengalami bullying." }],
      })

      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        if (i === 0 && msg.role === 'assistant') continue;
        history.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })
      }

      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.7,
        }
      })

      const result = await chat.sendMessage(input)
      const response = await result.response
      const text = response.text()
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
    } catch (error) {
      console.error("AntiBully Error:", error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Maaf, ada kendala koneksi. Tetap tenang, saya di sini.` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto h-screen bg-[#F8FAFC] flex flex-col overflow-hidden lg:px-10">
      <div className="px-6 pt-8 pb-4 flex items-center justify-between lg:mb-8 bg-[#F8FAFC]/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all text-brand-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">Anti-Bully Bot</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              <p className="text-xs lg:text-sm font-bold text-slate-400">Lapor & Solusi Aman</p>
            </div>
          </div>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 hidden lg:block">
          <ShieldAlert className="w-8 h-8 text-rose-600" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-4 max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-brand-900 text-white' : 'bg-white text-brand-900 border border-slate-100'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 lg:w-6 lg:h-6" /> : <Bot className="w-5 h-5 lg:w-6 lg:h-6" />}
              </div>
              <div className={`p-5 lg:p-7 rounded-[2rem] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-900 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-50'
              }`}>
                <div className="prose prose-sm lg:prose-base prose-slate max-w-none prose-headings:text-inherit prose-p:text-inherit prose-strong:text-inherit">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center bg-white p-5 lg:p-7 rounded-[2rem] rounded-tl-none border border-slate-50 shadow-sm">
              <Loader2 className="w-5 h-5 text-brand-900 animate-spin" />
              <p className="text-sm lg:text-base font-bold text-slate-400 italic">Anti-Bully Bot sedang merespon...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 lg:p-10 bg-white/50 backdrop-blur-xl border-t border-slate-100">
        <div className="relative max-w-4xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ceritakan kejadian atau lapor bullying..."
            className="w-full pl-8 pr-20 py-5 lg:py-6 bg-white border border-slate-200 rounded-[2rem] text-sm lg:text-base font-bold focus:outline-none focus:border-brand-900 focus:ring-4 focus:ring-brand-900/5 transition-all shadow-xl shadow-brand-900/5"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-4 lg:p-5 bg-brand-900 text-white rounded-2xl hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-900/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center mt-6 text-[10px] lg:text-xs font-bold text-slate-400 flex items-center justify-center gap-2">
          <Heart className="w-3 h-3 text-rose-500" /> Kamu aman di sini. Laporanmu bersifat rahasia.
        </p>
      </div>
    </div>
  )
}

export default AntiBullyBot;
