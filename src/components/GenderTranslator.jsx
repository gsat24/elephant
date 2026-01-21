import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { model } from '../lib/gemini'
import { 
  ChevronLeft,
  MessageCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  Share2, 
  Sparkles,
  Zap,
  BrainCircuit,
  HeartHandshake,
  MessageSquareText,
  CheckCircle2
} from 'lucide-react'

const GenderTranslator = ({ onBack }) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!input.trim() || isLoading) return
    setIsLoading(true)
    
    try {
      const prompt = `Anda adalah "The Elephant Gender Translator". 
      Tugas Anda adalah menerjemahkan kalimat yang membingungkan atau pasif-agresif dari pasangan (baik pria maupun wanita) menjadi maksud yang sebenarnya secara jujur dan memberikan saran respon yang baik.

      Kalimat input: "${input}"

      Berikan output dalam format JSON:
      {
        "maksudSebenarnya": "Penjelasan jujur tentang apa yang sebenarnya dia rasakan/inginkan",
        "kenapaDiaBicaraGitu": "Analisis psikologis singkat kenapa kalimat itu yang keluar",
        "saranRespon": "Contoh kalimat balasan yang menenangkan dan solutif"
      }

      Gunakan bahasa Indonesia yang santai, asik, dan sedikit humoris ala "The Elephant".`

      const res = await model.generateContent(prompt)
      const response = await res.response
      const text = response.text()
      
      // Handle potential markdown code blocks in Gemini response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, "").trim()
      setResult(JSON.parse(jsonStr))
    } catch (error) {
      console.error("Translation Error:", error)
      setResult({
        maksudSebenarnya: "Aduh, gajahnya lagi pusing! Coba kirim ulang ya.",
        kenapaDiaBicaraGitu: "Koneksi ke otak gajah terputus sebentar.",
        saranRespon: "Coba tanya langsung pelan-pelan ke dia."
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
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between bg-transparent lg:pt-12">
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            onClick={onBack} 
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-brand-800 hover:border-brand-900 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl lg:text-4xl font-black text-brand-900 leading-none mb-1 lg:mb-2">Gender Translator</h2>
            <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase tracking-widest">Pahami kode tersembunyi</p>
          </div>
        </div>
        <div className="bg-brand-900 p-3 lg:p-4 rounded-2xl shadow-lg shadow-brand-900/20">
          <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 lg:mt-8">
        {/* Left: Input Section */}
        <section className="flex-1 space-y-4 lg:space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-brand-50 p-2 rounded-xl">
              <MessageSquareText className="w-5 h-5 text-brand-600 lg:w-6 lg:h-6" />
            </div>
            <h3 className="text-sm lg:text-lg font-black text-brand-900 uppercase tracking-wider">Kalimat Dia</h3>
          </div>
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border-2 border-slate-100 focus-within:border-brand-900 transition-all shadow-sm">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: 'Terserah kamu aja', 'Aku nggak apa-apa', 'Gapapa kok'"
              className="w-full bg-transparent border-none focus:ring-0 text-base lg:text-xl min-h-[150px] lg:min-h-[250px] resize-none font-medium text-brand-900"
            />
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleTranslate}
                disabled={!input.trim() || isLoading}
                className="bg-brand-900 text-white px-8 py-4 lg:px-12 lg:py-5 rounded-2xl font-black text-xs lg:text-sm flex items-center gap-3 hover:bg-brand-800 disabled:opacity-50 transition-all shadow-xl shadow-brand-900/20 active:scale-95"
              >
                {isLoading ? <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />}
                TERJEMAHKAN
              </button>
            </div>
          </div>
        </section>

        {/* Right: Result Section */}
        <div className="flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result && !isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 p-12"
              >
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <Zap className="w-12 h-12 lg:w-16 lg:h-16 text-brand-900 opacity-20" />
                </div>
                <div>
                  <p className="text-sm lg:text-lg font-black text-brand-900 uppercase tracking-widest mb-2">Translator Ready</p>
                  <p className="text-xs lg:text-sm font-bold text-slate-400">Masukkan kalimat yang ingin kamu bedah maksudnya</p>
                </div>
              </motion.div>
            ) : result && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 lg:space-y-8"
              >
                {/* Maksud Sebenarnya */}
                <div className="bg-brand-900 text-white p-8 lg:p-10 rounded-[3rem] shadow-2xl shadow-brand-900/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-brand-200 block mb-4">Maksud Sebenarnya</span>
                    <p className="text-xl lg:text-3xl font-black leading-tight">{result.maksudSebenarnya}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* Kenapa Dia Bicara Gitu */}
                <div className="bg-white p-8 lg:p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:border-brand-200 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">Analisis Psikologis</span>
                  </div>
                  <p className="text-sm lg:text-lg font-medium text-slate-600 leading-relaxed">{result.kenapaDiaBicaraGitu}</p>
                </div>

                {/* Saran Respon */}
                <div className="bg-sage-50 p-8 lg:p-10 rounded-[3rem] border border-sage-100 relative group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                      <span className="text-[10px] lg:text-xs font-black text-sage-600 uppercase tracking-widest">Saran Balasan Terbaik</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(result.saranRespon)}
                      className="p-3 bg-white rounded-2xl border border-sage-100 text-sage-600 hover:bg-sage-100 transition-all shadow-sm active:scale-90"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-sage-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-base lg:text-2xl font-black text-brand-900 italic leading-relaxed">"{result.saranRespon}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default GenderTranslator
