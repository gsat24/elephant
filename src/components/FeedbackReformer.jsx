import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  UserCheck, 
  ArrowRight, 
  MessageSquareText, 
  Sparkles,
  RefreshCw,
  Copy,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react'
import { model } from '../lib/gemini'

const FeedbackReformer = ({ onBack }) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleReform = async () => {
    if (!input.trim() || isLoading) return
    setIsLoading(true)
    
    try {
      const prompt = `Anda adalah "The Elephant Feedback Reformer". 
      Tugas Anda adalah mengubah kritik yang kasar, pasif-agresif, atau menyakitkan menjadi feedback yang konstruktif, menggunakan "I Message", dan tetap menyampaikan poin utamanya dengan jelas namun lembut.

      Kritik Awal: "${input}"

      Berikan output dalam format JSON:
      {
        "feedbackKonstruktif": "Versi kalimat yang sudah diperbaiki menggunakan I-Message",
        "kenapaIniLebihBaik": "Penjelasan singkat kenapa versi ini lebih tidak memicu pertengkaran",
        "poinUtama": "Inti dari apa yang sebenarnya ingin disampaikan"
      }

      Gunakan bahasa Indonesia yang dewasa, bijak, dan menenangkan.`

      const res = await model.generateContent(prompt)
      const response = await res.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text
      setResult(JSON.parse(jsonStr))
    } catch (error) {
      console.error("Reform Error:", error)
      setResult({
        feedbackKonstruktif: "Aduh, gajahnya lagi bingung cari kata-kata! Coba kirim ulang ya.",
        kenapaIniLebihBaik: "Koneksi terputus.",
        poinUtama: "Ingin memberikan masukan."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between lg:mb-8 sticky top-0 z-10 bg-[#F8FAFC]/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none lg:static">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all text-brand-800"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">Feedback Reformer</h2>
            <p className="text-xs lg:text-base font-bold text-slate-400 uppercase tracking-widest mt-1">Ubah Kritik Jadi Solusi</p>
          </div>
        </div>
        <div className="bg-brand-50 p-3 lg:p-4 rounded-2xl">
          <UserCheck className="w-6 h-6 lg:w-8 lg:h-8 text-brand-900" />
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Input Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-brand-50 p-2 rounded-xl">
                <MessageSquareText className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-brand-900 tracking-tight">Kritik Kasar / Keluhan</h3>
            </div>
            <div className="bg-white p-6 lg:p-8 rounded-[3rem] border-2 border-slate-100 focus-within:border-brand-900 transition-all shadow-sm">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Contoh: 'Kamu malas banget sih!', 'Gak pernah dengerin kalau dibilangin!'"
                className="w-full bg-transparent border-none focus:ring-0 text-base lg:text-xl min-h-[150px] resize-none font-medium text-slate-600"
              />
              <div className="flex justify-end pt-6">
                <button 
                  onClick={handleReform}
                  disabled={!input.trim() || isLoading}
                  className="bg-brand-900 text-white px-8 py-4 rounded-2xl font-black text-sm lg:text-base flex items-center gap-3 hover:bg-brand-800 disabled:opacity-50 transition-all shadow-xl shadow-brand-900/20"
                >
                  {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  PERBAIKI KALIMAT
                </button>
              </div>
            </div>
          </section>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-brand-900 text-white p-10 lg:p-16 rounded-[3rem] shadow-2xl shadow-brand-900/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] opacity-60 block mb-4">Poin Utama Anda</span>
                    <p className="text-2xl lg:text-4xl font-black leading-tight">{result.poinUtama}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-10 lg:p-14 rounded-[3rem] border-2 border-brand-50 shadow-sm relative group">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-50 p-2 rounded-xl">
                          <HeartHandshake className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />
                        </div>
                        <span className="text-sm lg:text-base font-black text-brand-900 uppercase tracking-widest">Gunakan Kalimat Ini:</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(result.feedbackKonstruktif)}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-brand-600 hover:bg-brand-50 hover:border-brand-200 transition-all"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-brand-500" /> : <Copy className="w-5 h-5 lg:w-6 lg:h-6" />}
                      </button>
                    </div>
                    <p className="text-xl lg:text-3xl font-black text-brand-900 italic leading-relaxed">
                      "{result.feedbackKonstruktif}"
                    </p>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mb-16 blur-2xl opacity-50"></div>
                  </div>

                  <div className="bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                      <span className="text-sm lg:text-base font-black text-slate-400 uppercase tracking-widest">Kenapa ini lebih baik?</span>
                    </div>
                    <p className="text-lg lg:text-2xl font-medium text-slate-600 leading-relaxed italic">
                      {result.kenapaIniLebihBaik}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : !isLoading && (
              <div className="py-20 lg:py-32 text-center space-y-6">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <UserCheck className="w-10 h-10 lg:w-16 lg:h-16 text-slate-200" />
                </div>
                <h4 className="text-2xl font-black text-brand-900">Siap Memperbaiki Kalimat?</h4>
                <p className="text-slate-400 font-bold max-w-sm mx-auto">Tulis keluhanmu di atas dan biarkan AI Gajah membantumu merangkai kata yang lebih bijak.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FeedbackReformer