import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lightbulb, Brain, CheckCircle2, ChevronRight, Target } from 'lucide-react'

const ProblemSolvingTest = ({ onBack }) => {
  const [step, setStep] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Dua orang teman sedang bertengkar hebat karena salah paham. Apa langkah pertama yang kamu ambil?",
      options: [
        { text: "Mendengarkan kedua belah pihak secara terpisah", score: 10 },
        { text: "Menyuruh mereka langsung minta maaf", score: 5 },
        { text: "Membiarkan mereka menyelesaikan sendiri", score: 2 },
        { text: "Memihak teman yang paling dekat", score: 0 }
      ]
    },
    {
      question: "Kamu diberi tugas sulit dengan deadline yang sangat mepet. Bagaimana strategimu?",
      options: [
        { text: "Panik dan mengeluh di media sosial", score: 0 },
        { text: "Mengerjakan apa saja yang penting selesai", score: 5 },
        { text: "Memecah tugas menjadi bagian kecil dan prioritas", score: 10 },
        { text: "Meminta orang lain mengerjakannya", score: 2 }
      ]
    },
    {
      question: "Ada kritik pedas tentang kinerjamu. Reaksimu adalah...",
      options: [
        { text: "Marah dan membela diri mati-matian", score: 0 },
        { text: "Menerima dan menjadikannya bahan evaluasi", score: 10 },
        { text: "Abaikan saja karena itu cuma pendapat", score: 5 },
        { text: "Merasa gagal dan ingin berhenti", score: 2 }
      ]
    }
  ]

  const handleAnswer = (s) => {
    setScore(score + s)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep('result')
    }
  }

  const maxScore = questions.length * 10
  const finalPercentage = (score / maxScore) * 100

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-900 transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-10 h-10 text-blue-500" />
              </div>
              <h1 className="text-3xl font-black text-brand-900 mb-4">Problem Solving Test</h1>
              <p className="text-slate-400 font-bold mb-10">
                Uji kemampuanmu dalam menghadapi situasi sulit dan mencari solusi yang paling efektif.
              </p>
              <button 
                onClick={() => setStep('quiz')}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
              >
                Mulai Tes
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Analisis Kasus {currentQuestion + 1}/{questions.length}
                </span>
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>

              <h2 className="text-xl font-black text-brand-900 mb-8 leading-tight">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    className="w-full p-5 text-left rounded-2xl border border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-600 group-hover:text-blue-700">{opt.text}</span>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-black text-brand-900 mb-2">Hasil Analisismu</h2>
              <p className="text-slate-400 font-bold mb-8">Skor Kemampuan Solusi Masalah</p>

              <div className="text-5xl font-black text-blue-600 mb-10">{Math.round(finalPercentage)}%</div>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                  <p className="text-sm font-bold text-slate-600">
                    {finalPercentage > 70 ? "Kamu memiliki pola pikir yang sangat solutif dan tenang." : 
                     finalPercentage > 40 ? "Kemampuan problem solving kamu cukup baik, namun bisa lebih tenang lagi." :
                     "Yuk belajar untuk tidak panik saat menghadapi masalah."}
                  </p>
                </div>
              </div>

              <button 
                onClick={onBack}
                className="w-full py-4 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider"
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

export default ProblemSolvingTest
