import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ShieldAlert, 
  MessageSquareText,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { model } from '../lib/gemini'

const ToxicAlert = ({ onBack }) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleScan = async () => {
    if (!input.trim() || isLoading) return
    setIsLoading(true)
    
    try {
      const prompt = `Anda adalah "The Elephant Toxic Alert System". 
      Tugas Anda adalah mendeteksi apakah sebuah kalimat mengandung unsur toksik (gaslighting, manipulasi, penghinaan, ancaman, atau agresi pasif).

      Kalimat: "${input}"

      Berikan output dalam format JSON:
      {
        "isToxic": boolean,
        "toxicLevel": "Low" | "Medium" | "High",
        "detectedTypes": ["Gaslighting", "Penghinaan", dll],
        "explanation": "Penjelasan kenapa kalimat ini toksik atau tidak",
        "redFlags": ["Poin-poin bendera merah yang ditemukan"],
        "saferAlternative": "Versi kalimat yang lebih sehat (jika ada)"
      }

      Gunakan bahasa Indonesia yang tegas namun edukatif.`

      const res = await model.generateContent(prompt)
      const response = await res.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text
      setResult(JSON.parse(jsonStr))
    } catch (error) {
      console.error("Scan Error:", error)
      setResult({
        isToxic: false,
        toxicLevel: "Low",
        detectedTypes: [],
        explanation: "Gagal memindai kalimat.",
        redFlags: [],
        saferAlternative: "Coba kirim ulang."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-10 lg:bg-transparent lg:border-none lg:static lg:px-0 lg:mt-12 lg:mb-16">
        <div className="flex items-center gap-4 lg:gap-10">
          <button 
            onClick={onBack} 
            className="p-2.5 lg:p-6 bg-white rounded-2xl lg:rounded-[2rem] border border-slate-100 text-brand-800 shadow-sm hover:shadow-xl hover:scale-105 transition-all"
          >
            <ChevronLeft className="w-5 h-5 lg:w-10 lg:h-10" />
          </button>
          <div>
            <h2 className="text-xl lg:text-6xl font-black text-brand-900 leading-none mb-1 lg:mb-4">Toxic Alert</h2>
            <p className="text-[10px] lg:text-lg font-bold text-slate-400 uppercase tracking-[0.3em]">Deteksi Bendera Merah</p>
          </div>
        </div>
        <div className="bg-brand-50 p-2.5 lg:p-8 rounded-2xl lg:rounded-[2.5rem] shadow-inner">
          <ShieldAlert className="w-5 h-5 lg:w-12 lg:h-12 text-brand-900" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 flex-1 px-6 lg:px-0">
        {/* Left Column: Input Section */}
        <section className="lg:w-[450px] space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-brand-900 p-2 rounded-lg lg:hidden">
              <MessageSquareText className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block bg-brand-900 p-4 rounded-2xl shadow-lg shadow-brand-900/20">
              <MessageSquareText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm lg:text-2xl font-black text-brand-900 uppercase tracking-wider lg:tracking-tight">Cek Kalimat</h3>
          </div>
          <div className="bg-white p-6 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border-2 border-slate-100 focus-within:border-brand-900 transition-all shadow-sm hover:shadow-2xl hover:shadow-brand-900/5 group relative overflow-hidden">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan pesan yang ingin diperiksa..."
              className="w-full bg-transparent border-none focus:ring-0 text-sm lg:text-2xl min-h-[150px] lg:min-h-[400px] resize-none font-bold text-slate-700 placeholder:text-slate-300 leading-relaxed"
            />
            <div className="flex justify-end pt-6 lg:pt-10">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={!input.trim() || isLoading}
                className="w-full lg:w-auto bg-brand-900 text-white px-8 py-5 lg:px-12 lg:py-7 rounded-2xl lg:rounded-[2rem] font-black text-xs lg:text-lg flex items-center justify-center gap-4 hover:bg-brand-800 disabled:opacity-50 transition-all shadow-2xl shadow-brand-900/20 uppercase tracking-[0.2em]"
              >
                {isLoading ? <RefreshCw className="w-6 h-6 lg:w-8 lg:h-8 animate-spin" /> : <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8" />}
                {isLoading ? 'Scanning...' : 'Scan Toksisitas'}
              </motion.button>
            </div>
          </div>
          
          <div className="hidden lg:block p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-50 p-3 rounded-xl">
                <AlertCircle className="w-6 h-6 text-brand-600" />
              </div>
              <h4 className="font-black text-brand-900 text-lg uppercase tracking-widest">Tips Deteksi</h4>
            </div>
            <ul className="space-y-6 text-slate-500 text-lg font-bold">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-200 mt-2.5 shrink-0" />
                <span>Perhatikan kata ganti "Kamu selalu..." atau "Kamu tidak pernah..."</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-200 mt-2.5 shrink-0" />
                <span>Waspadai ancaman atau manipulasi emosional.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-200 mt-2.5 shrink-0" />
                <span>Cek apakah ada upaya merendahkan harga diri.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Right Column: Result Section */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10 pb-20 lg:pb-0"
              >
                {/* Toxicity Meter */}
                <div className={`p-8 lg:p-20 rounded-[2.5rem] lg:rounded-[5rem] shadow-2xl relative overflow-hidden group transition-all duration-700 ${
                  result.isToxic ? 'bg-coral-500 text-white shadow-coral-500/20' : 'bg-sage-500 text-white shadow-sage-500/20'
                }`}>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8 lg:mb-16">
                      <span className="text-[10px] lg:text-sm font-black uppercase tracking-[0.4em] opacity-80">Toxicity Analysis Report</span>
                      <div className="bg-white/20 px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-md">
                        <span className="text-[10px] lg:text-sm font-black uppercase tracking-[0.2em]">{result.toxicLevel} Risk Level</span>
                      </div>
                    </div>
                    <h4 className="text-4xl lg:text-8xl font-black mb-6 lg:mb-10 tracking-tighter leading-none">
                      {result.isToxic ? 'Toxic Detected!' : 'Safe to Send'}
                    </h4>
                    <p className="text-base lg:text-3xl opacity-90 font-bold leading-relaxed lg:max-w-3xl">
                      {result.explanation}
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 lg:w-[600px] lg:h-[600px] bg-white/10 rounded-full -mr-32 -mt-32 lg:-mr-64 lg:-mt-64 blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Red Flags */}
                  {result.isToxic && result.redFlags.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-10 lg:p-16 rounded-[3rem] lg:rounded-[4.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                    >
                      <div className="flex items-center gap-4 mb-10">
                        <div className="bg-coral-50 p-4 rounded-2xl">
                          <AlertCircle className="w-8 h-8 text-coral-500" />
                        </div>
                        <span className="text-xs lg:text-lg font-black text-slate-400 uppercase tracking-[0.3em]">Red Flags Ditemukan:</span>
                      </div>
                      <div className="flex flex-wrap gap-4 lg:gap-6">
                        {result.redFlags.map((flag, i) => (
                          <span key={i} className="bg-coral-50 text-coral-600 text-xs lg:text-xl font-black px-6 py-3 lg:px-8 lg:py-4 rounded-[1.5rem] lg:rounded-[2rem] border border-coral-100 shadow-sm hover:scale-105 transition-transform">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Safer Alternative */}
                  {result.isToxic && result.saferAlternative && (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-brand-50 p-10 lg:p-16 rounded-[3rem] lg:rounded-[4.5rem] border border-brand-100 shadow-xl shadow-brand-900/5 relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="bg-brand-100 p-4 rounded-2xl">
                            <Zap className="w-8 h-8 text-brand-600" />
                          </div>
                          <span className="text-xs lg:text-lg font-black text-brand-600 uppercase tracking-[0.3em]">Coba Kalimat Ini Saja:</span>
                        </div>
                        <p className="text-xl lg:text-4xl font-black text-brand-900 italic leading-relaxed">"{result.saferAlternative}"</p>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 lg:w-64 lg:h-64 bg-brand-200/20 rounded-full blur-3xl"></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              !isLoading && (
                <div className="h-full flex flex-col items-center justify-center p-12 lg:p-32 text-center space-y-12">
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-brand-400 blur-[100px] rounded-full opacity-10"></div>
                    <ShieldAlert className="w-32 h-32 lg:w-64 lg:h-64 text-brand-50 relative z-10" />
                  </motion.div>
                  <div className="max-w-xl">
                    <p className="text-2xl lg:text-5xl font-black text-brand-900 uppercase tracking-[0.2em] mb-6">Ready to Scan</p>
                    <p className="text-base lg:text-2xl font-bold text-slate-400 leading-relaxed">Masukkan pesan di kolom sebelah kiri untuk mulai mendeteksi elemen toksik secara mendalam.</p>
                  </div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ToxicAlert