import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle,
  Sparkles,
  RefreshCw,
  Heart,
  Calendar,
  Trash2
} from 'lucide-react'
import { model } from '../lib/gemini'

const ProjectSync = ({ onBack }) => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Deep Talk Mingguan', completed: false, category: 'Komunikasi' },
    { id: 2, title: 'Liburan ke Bali', completed: false, category: 'Fun' },
    { id: 3, title: 'Tabungan Rumah', completed: true, category: 'Masa Depan' }
  ])
  const [newGoal, setNewGoal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState(null)

  const handleAddGoal = () => {
    if (!newGoal.trim()) return
    setGoals([...goals, { 
      id: Date.now(), 
      title: newGoal, 
      completed: false, 
      category: 'General' 
    }])
    setNewGoal('')
  }

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g))
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const handleGetSuggestion = async () => {
    setIsLoading(true)
    try {
      const prompt = `Anda adalah "The Elephant Relationship Architect". 
      Berikan 3 saran tujuan atau aktivitas bersama (Project Sync) untuk pasangan agar hubungan semakin harmonis dan terarah.

      Berikan output dalam format JSON:
      {
        "suggestions": [
          { "title": "Aktivitas 1", "desc": "Penjelasan singkat", "category": "Kategori" },
          { "title": "Aktivitas 2", "desc": "Penjelasan singkat", "category": "Kategori" },
          { "title": "Aktivitas 3", "desc": "Penjelasan singkat", "category": "Kategori" }
        ]
      }

      Gunakan bahasa Indonesia yang inspiratif dan romantis.`

      const res = await model.generateContent(prompt)
      const response = await res.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text
      setAiSuggestion(JSON.parse(jsonStr))
    } catch (error) {
      console.error("Suggestion Error:", error)
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
            <h2 className="text-xl lg:text-6xl font-black text-brand-900 leading-none mb-1 lg:mb-4">Project Sync</h2>
            <p className="text-[10px] lg:text-lg font-bold text-slate-400 uppercase tracking-[0.3em]">Tujuan Bersama</p>
          </div>
        </div>
        <div className="bg-brand-50 p-2.5 lg:p-8 rounded-2xl lg:rounded-[2.5rem] shadow-inner">
          <Target className="w-5 h-5 lg:w-12 lg:h-12 text-brand-900" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 flex-1 px-6 lg:px-0">
        {/* Left Column: Progress & Input */}
        <div className="lg:w-1/3 space-y-8">
          {/* Progress Overview */}
          <section className="bg-brand-900 rounded-[2.5rem] lg:rounded-[4rem] p-8 lg:p-12 text-white shadow-2xl shadow-brand-900/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6 lg:mb-10">
                <div>
                  <p className="text-[10px] lg:text-sm font-black uppercase tracking-[0.3em] opacity-60 mb-2">Relationship Progress</p>
                  <h3 className="text-3xl lg:text-7xl font-black tracking-tighter">
                    {Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%
                  </h3>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 lg:w-16 lg:h-16 text-coral-400 fill-coral-400" />
                </motion.div>
              </div>
              <div className="w-full bg-white/10 h-3 lg:h-5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%` }}
                  className="bg-coral-400 h-full shadow-[0_0_20px_rgba(248,113,113,0.5)]"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full -mr-32 -mt-32 lg:-mr-48 lg:-mt-48 blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
          </section>

          {/* Goal Input */}
          <section className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1 bg-white px-6 py-4 lg:py-6 rounded-2xl lg:rounded-[2rem] border border-slate-100 shadow-sm focus-within:border-brand-900 transition-all flex items-center group">
                <input 
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Tambah tujuan baru..."
                  className="w-full bg-transparent border-none focus:ring-0 text-sm lg:text-xl font-bold text-slate-700 placeholder:text-slate-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddGoal}
                className="p-4 lg:p-6 bg-brand-900 text-white rounded-2xl lg:rounded-[2rem] shadow-xl shadow-brand-900/20"
              >
                <Plus className="w-6 h-6 lg:w-10 lg:h-10" />
              </motion.button>
            </div>
            <p className="text-[10px] lg:text-sm font-bold text-slate-400 text-center uppercase tracking-widest">Tekan Enter untuk menambah cepat</p>
          </section>

          {/* Tips Section (Desktop Only) */}
          <div className="hidden lg:block p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-50 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-brand-600" />
              </div>
              <h4 className="font-black text-brand-900 text-lg uppercase tracking-widest">Relationship Tips</h4>
            </div>
            <p className="text-slate-500 text-lg font-bold leading-relaxed">
              "Tujuan bersama bukan hanya tentang hasil akhir, tapi tentang bagaimana kalian berdua saling mendukung dalam proses mencapainya."
            </p>
          </div>
        </div>

        {/* Right Column: List & AI Ideas */}
        <div className="flex-1 space-y-10">
          {/* Goals List */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="bg-brand-900 p-3 rounded-xl shadow-lg shadow-brand-900/10">
                  <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-sm lg:text-2xl font-black text-brand-900 uppercase tracking-wider">Project List</h3>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetSuggestion}
                disabled={isLoading}
                className="flex items-center gap-3 text-[10px] lg:text-sm font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-5 py-2.5 lg:px-8 lg:py-4 rounded-full border border-brand-100 shadow-sm"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isLoading ? 'Thinking...' : 'AI Idea'}
              </motion.button>
            </div>

            <div className="grid gap-4">
              {goals.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <Target className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold lg:text-xl">Belum ada tujuan. Mulai tambah sekarang!</p>
                </div>
              ) : (
                goals.map((goal) => (
                  <motion.div 
                    layout
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-between p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border transition-all group ${
                      goal.completed 
                      ? 'bg-slate-50 border-transparent opacity-60' 
                      : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/5 hover:border-brand-100'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleGoal(goal.id)}
                      >
                        {goal.completed ? (
                          <CheckCircle2 className="w-6 h-6 lg:w-10 lg:h-10 text-sage-500" />
                        ) : (
                          <Circle className="w-6 h-6 lg:w-10 lg:h-10 text-slate-300 group-hover:text-brand-400 transition-colors" />
                        )}
                      </motion.button>
                      <div>
                        <p className={`text-base lg:text-3xl font-black ${goal.completed ? 'line-through text-slate-400' : 'text-brand-900'}`}>
                          {goal.title}
                        </p>
                        <span className="text-[10px] lg:text-base font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 block">
                          {goal.category}
                        </span>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteGoal(goal.id)} 
                      className="text-slate-200 hover:text-coral-500 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5 lg:w-8 lg:h-8" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* AI Suggestions */}
          <AnimatePresence>
            {aiSuggestion && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="space-y-6 pb-20 lg:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-sage-500 p-3 rounded-xl shadow-lg shadow-sage-500/10">
                    <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm lg:text-2xl font-black text-brand-900 uppercase tracking-wider">AI Recommendations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiSuggestion.suggestions.map((s, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -8 }}
                      className="bg-gradient-to-br from-sage-50 to-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3.5rem] border border-sage-100 relative group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sage-900/5 transition-all"
                    >
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[10px] lg:text-xs font-black text-sage-600 uppercase tracking-[0.2em] bg-white px-4 py-1.5 rounded-full border border-sage-100">{s.category}</span>
                          <motion.button 
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setGoals([...goals, { id: Date.now() + i, title: s.title, completed: false, category: s.category }])
                              setAiSuggestion({ suggestions: aiSuggestion.suggestions.filter((_, idx) => idx !== i) })
                            }}
                            className="p-3 bg-white rounded-2xl text-sage-600 shadow-sm border border-sage-100 hover:bg-sage-600 hover:text-white transition-all"
                          >
                            <Plus className="w-4 h-4 lg:w-6 lg:h-6" />
                          </motion.button>
                        </div>
                        <h4 className="text-lg lg:text-2xl font-black text-brand-900 mb-3 leading-tight">{s.title}</h4>
                        <p className="text-sm lg:text-lg text-slate-600 font-bold leading-relaxed">{s.desc}</p>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sage-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ProjectSync