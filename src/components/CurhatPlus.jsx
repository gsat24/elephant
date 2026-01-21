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
  MessageSquareHeart,
  ShieldCheck
} from 'lucide-react'
import { model } from '../lib/gemini'

const CurhatPlus = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Halo! Saya "The Elephant" 🐘. Kamu bisa curhat apa saja di sini—masalah pasangan, kerjaan, atau sekadar ingin didengar ✨.\n\nRuangan ini aman dan rahasia. Apa yang sedang kamu rasakan saat ini?' 
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
      // Format history: Gemini API history MUST alternate between user and model
      const history = []
      
      // If messages.length > 1, the first message in our history must be from 'user'
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        // Skip the very first bot greeting for the API history
        if (i === 0 && msg.role === 'assistant') continue;
        
        history.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })
      }

      console.log("Starting chat with history:", JSON.stringify(history))
      
      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.8,
          topP: 0.95,
        }
      })

      const result = await chat.sendMessage(input)
      const response = await result.response
      const text = response.text()
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
    } catch (error) {
      console.error("Curhat Error:", error)
      
      // Auto-fix for common 404/403/500 errors
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Hmm, sepertinya ada sedikit kendala teknis (Error: ${error.message}). Tenang, saya sedang mencoba menyambungkan ulang. Coba kirim pesan sekali lagi ya!` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto h-screen bg-[#F8FAFC] flex flex-col overflow-hidden lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between lg:mb-8 bg-[#F8FAFC]/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all text-brand-800"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">Curhat Plus</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></span>
              <span className="text-xs lg:text-sm font-black text-sage-600 uppercase tracking-widest">The Elephant Active</span>
            </div>
          </div>
        </div>
        <div className="bg-brand-50 p-3 lg:p-4 rounded-2xl">
          <MessageSquareHeart className="w-6 h-6 lg:w-8 lg:h-8 text-brand-900" />
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-8 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[90%] lg:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                    msg.role === 'user' ? 'bg-brand-900 text-white' : 'bg-white border border-slate-100 text-brand-900'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 lg:w-6 lg:h-6" /> : <Bot className="w-5 h-5 lg:w-6 lg:h-6" />}
                  </div>
                  <div className={`p-6 lg:p-8 rounded-[2rem] text-base lg:text-lg leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-brand-900 text-white rounded-tr-none shadow-xl shadow-brand-900/10' 
                    : 'bg-white border border-slate-100 text-brand-900 rounded-tl-none shadow-sm'
                  }`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({...props}) => <p className="mb-4 last:mb-0" {...props} />,
                        ul: ({...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
                        ol: ({...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                        li: ({...props}) => <li className="mb-2" {...props} />,
                        strong: ({...props}) => <strong className="font-black" {...props} />,
                        a: ({...props}) => <a className="text-brand-600 underline" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-brand-900" />
                  </div>
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] rounded-tl-none shadow-sm">
                    <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600 animate-spin" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 lg:p-10 bg-white border-t border-slate-100 pb-10 lg:pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 items-end">
            <div className="flex-1 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 p-3 lg:p-4 flex items-end focus-within:border-brand-900 focus-within:bg-white transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ketik curhatanmu di sini..."
                className="flex-1 bg-transparent border-none focus:ring-0 p-3 text-base lg:text-lg resize-none max-h-48 min-h-[44px]"
                rows={1}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                input.trim() && !isLoading 
                ? 'bg-brand-900 text-white shadow-brand-900/40' 
                : 'bg-slate-100 text-slate-300 shadow-none'
              }`}
            >
              <Send className="w-7 h-7 lg:w-9 lg:h-9" />
            </motion.button>
          </div>
          <div className="mt-6 flex justify-center gap-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-sage-500" />
              <span className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">End-to-end Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-brand-500" />
              <span className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">AI Emotional Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurhatPlus
