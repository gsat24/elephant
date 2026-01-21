import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  TrendingUp, 
  Search, 
  Calendar, 
  AlertTriangle,
  MessageSquare,
  Sparkles,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import { model } from '../lib/gemini'

const ConflictHistory = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  
  // Mock data for initial view - in real app, this would come from localStorage/DB
  const mockConflicts = [
    { id: 1, date: '20 Jan 2026', topic: 'Piring Kotor', intensity: 'Medium' },
    { id: 2, date: '18 Jan 2026', topic: 'Lupa Kabar', intensity: 'High' },
    { id: 3, date: '15 Jan 2026', topic: 'Main Game Terus', intensity: 'Low' }
  ]

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      const prompt = `Anda adalah "The Elephant Conflict Analyst". 
      Analisis riwayat konflik berikut (mock data untuk saat ini) dan berikan pola yang ditemukan serta saran jangka panjang.
      
      Data Konflik:
      1. 20 Jan: Masalah piring kotor (Intensitas: Medium)
      2. 18 Jan: Masalah lupa kasih kabar (Intensitas: High)
      3. 15 Jan: Masalah waktu main game (Intensitas: Low)

      Berikan output dalam format JSON:
      {
        "pattern": "Penjelasan singkat tentang pola yang berulang",
        "rootCause": "Akar masalah emosional yang sebenarnya",
        "longTermAdvice": "Saran untuk mencegah konflik serupa di masa depan",
        "stats": {
          "totalConflicts": 3,
          "mainTrigger": "Komunikasi & Rumah Tangga"
        }
      }

      Gunakan bahasa Indonesia yang profesional namun tetap hangat.`

      const res = await model.generateContent(prompt)
      const response = await res.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text
      setAnalysis(JSON.parse(jsonStr))
    } catch (error) {
      console.error("Analysis Error:", error)
      setAnalysis({
        pattern: "Ada gangguan pada sistem analisis gajah.",
        rootCause: "Koneksi terputus.",
        longTermAdvice: "Coba lagi nanti ya.",
        stats: { totalConflicts: 0, mainTrigger: "Unknown" }
      })
    } finally {
      setIsLoading(false)
    }
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
            <h2 className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">Conflict History</h2>
            <p className="text-xs lg:text-base font-bold text-slate-400 uppercase tracking-widest mt-1">Analisis Tren & Pola</p>
          </div>
        </div>
        <div className="bg-brand-50 p-3 lg:p-4 rounded-2xl">
          <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-brand-900" />
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Recent Conflicts List */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-brand-50 p-2 rounded-xl">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-900 tracking-tight">Riwayat Terakhir</h3>
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={isLoading}
                className="text-xs lg:text-sm font-black text-white bg-brand-900 px-6 py-3 rounded-2xl hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/20 disabled:opacity-50"
              >
                {isLoading ? 'Menganalisis...' : 'Analisis Pola AI'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {mockConflicts.map((c) => (
                <motion.div 
                  key={c.id} 
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-brand-900 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      c.intensity === 'High' ? 'bg-coral-500' : 
                      c.intensity === 'Medium' ? 'bg-amber-500' : 'bg-sage-500'
                    } group-hover:scale-125 transition-transform`} />
                    <div>
                      <p className="text-lg font-black text-brand-900">{c.topic}</p>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{c.date}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{c.intensity}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Analysis Result */}
          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-brand-900 text-white p-10 lg:p-16 rounded-[3rem] shadow-2xl shadow-brand-900/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="bg-white/10 p-2 rounded-xl">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-brand-300" />
                      </div>
                      <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-brand-200">AI Pattern Discovery</span>
                    </div>
                    <h4 className="text-2xl lg:text-4xl font-black mb-6 leading-tight">{analysis.pattern}</h4>
                    <p className="text-base lg:text-xl text-brand-100 leading-relaxed font-medium">{analysis.rootCause}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="bg-white p-8 lg:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Konflik</p>
                      <p className="text-5xl lg:text-7xl font-black text-brand-900">{analysis.stats.totalConflicts}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-50">
                      <p className="text-sm font-bold text-slate-400">Tercatat dalam 30 hari terakhir</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 lg:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Trigger Utama</p>
                      <p className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">{analysis.stats.mainTrigger}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <p className="text-sm font-bold text-slate-400">Fokus area perbaikan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 lg:p-14 rounded-[3rem] border-2 border-brand-50 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 p-2 rounded-xl">
                      <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />
                    </div>
                    <span className="text-sm lg:text-base font-black text-brand-900 uppercase tracking-widest">Saran Jangka Panjang</span>
                  </div>
                  <p className="text-lg lg:text-2xl font-medium text-slate-600 leading-relaxed italic">
                    "{analysis.longTermAdvice}"
                  </p>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mb-16 blur-2xl opacity-50"></div>
                </div>
              </motion.div>
            ) : !isLoading && (
              <div className="py-20 lg:py-32 text-center space-y-6">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <BarChart3 className="w-10 h-10 lg:w-16 lg:h-16 text-slate-200" />
                </div>
                <h4 className="text-2xl font-black text-brand-900">Belum Ada Analisis</h4>
                <p className="text-slate-400 font-bold max-w-sm mx-auto">Klik tombol "Analisis Pola AI" di atas untuk melihat tren konflikmu.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ConflictHistory