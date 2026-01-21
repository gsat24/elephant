import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Lightbulb, CheckCircle2, ChevronRight, Trophy, Sparkles } from 'lucide-react'

const SelfImprovement = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('lesson') // lesson, quiz, success
  const [quizStep, setQuizStep] = useState(0)
  const [score, setScore] = useState(0)

  const dailyLesson = {
    title: "Seni Mendengar Aktif",
    category: "Komunikasi",
    duration: "5 Menit",
    content: [
      {
        sub: "Kenapa Mendengar itu Sulit?",
        text: "Kebanyakan orang tidak mendengar untuk memahami, tapi mendengar untuk menjawab. Kita sibuk menyusun kalimat balasan saat orang lain masih bicara."
      },
      {
        sub: "Teknik 3 Detik",
        text: "Setelah lawan bicara berhenti, hitung sampai 3 sebelum kamu merespon. Ini memberi ruang bagi mereka untuk menambah info, dan menunjukkan kamu benar-benar memproses kata-kata mereka."
      },
      {
        sub: "Validasi Emosi",
        text: "Gunakan kalimat seperti 'Kedengarannya itu membuatmu merasa frustrasi ya?' daripada langsung memberi solusi. Orang butuh didengar sebelum butuh dibantu."
      }
    ]
  }

  const quizQuestions = [
    {
      q: "Apa tujuan utama dari 'Teknik 3 Detik'?",
      options: [
        "Agar kita terlihat pintar",
        "Memberi ruang lawan bicara dan waktu memproses info",
        "Menakut-nakuti lawan bicara dengan keheningan",
        "Menunggu giliran bicara paling tepat"
      ],
      correct: 1
    },
    {
      q: "Mana contoh validasi emosi yang benar?",
      options: [
        "Kamu jangan sedih terus dong",
        "Gitu aja kok nangis, lebay ah",
        "Aku paham kenapa hal itu bikin kamu merasa kecewa",
        "Mending kamu lakuin apa yang aku bilang tadi"
      ],
      correct: 2
    }
  ]

  const handleQuizAnswer = (idx) => {
    if (idx === quizQuestions[quizStep].correct) {
      setScore(score + 1)
    }

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setActiveTab('success')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-900 transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </button>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-all ${activeTab === 'lesson' ? 'bg-brand-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            Materi Hari Ini
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-all ${activeTab === 'quiz' ? 'bg-brand-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            Ambil Quiz
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'lesson' && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-brand-900 rounded-[2.5rem] p-8 lg:p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{dailyLesson.category}</span>
                    <span className="text-[10px] font-bold text-white/60">{dailyLesson.duration} bacaan</span>
                  </div>
                  <h1 className="text-3xl font-black mb-2">{dailyLesson.title}</h1>
                  <p className="text-brand-100 font-bold">Improvement Challenge #42</p>
                </div>
                <Sparkles className="absolute top-10 right-10 w-20 h-20 text-white/5" />
              </div>

              {dailyLesson.content.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-brand-900 mb-2">{item.sub}</h3>
                      <p className="text-slate-500 font-bold leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => setActiveTab('quiz')}
                className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
              >
                Saya Sudah Paham, Mulai Quiz <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-slate-100"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black text-brand-900">Daily Quiz</h2>
                <p className="text-slate-400 font-bold">Uji pemahamanmu dari materi tadi</p>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pertanyaan {quizStep + 1}/{quizQuestions.length}</span>
                </div>
                <h3 className="text-xl font-black text-brand-900 leading-tight">{quizQuestions[quizStep].q}</h3>
              </div>

              <div className="space-y-4">
                {quizQuestions[quizStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    className="w-full p-6 text-left rounded-2xl border border-slate-100 hover:border-brand-900 hover:bg-slate-50 transition-all group flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-600 group-hover:text-brand-900">{opt}</span>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-brand-900 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 text-center"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-black text-brand-900 mb-2">Luar Biasa!</h2>
              <p className="text-slate-400 font-bold mb-10">
                Kamu telah menyelesaikan program hari ini. Skor kamu: <span className="text-emerald-500">{score}/{quizQuestions.length}</span>
              </p>
              
              <div className="bg-emerald-50 rounded-3xl p-6 mb-10 flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-black text-brand-900 text-sm">Streaks: 12 Hari</h4>
                  <p className="text-xs font-bold text-emerald-600">Jangan sampai terputus besok!</p>
                </div>
              </div>

              <button 
                onClick={onBack}
                className="w-full py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
              >
                Kembali ke Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SelfImprovement