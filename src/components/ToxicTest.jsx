import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, ChevronRight, BarChart3 } from 'lucide-react'

const ToxicTest = ({ onBack }) => {
  const [step, setStep] = useState('intro') // intro, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

  const questions = [
    {
      question: "Bagaimana reaksimu saat pasangan/teman melakukan kesalahan kecil?",
      options: [
        { text: "Membicarakannya baik-baik", score: 0 },
        { text: "Menyindir atau mendiamkan (silent treatment)", score: 2 },
        { text: "Meledak marah dan mengungkit masa lalu", score: 3 },
        { text: "Memaklumi karena manusia biasa", score: 0 }
      ]
    },
    {
      question: "Apakah kamu sering merasa harus mengecek HP pasangan/teman diam-diam?",
      options: [
        { text: "Tidak pernah, aku percaya mereka", score: 0 },
        { text: "Sesekali kalau merasa curiga", score: 1 },
        { text: "Sering, untuk memastikan mereka jujur", score: 3 },
        { text: "Hanya jika mereka mengizinkan", score: 0 }
      ]
    },
    {
      question: "Saat bertengkar, fokus utamamu adalah...",
      options: [
        { text: "Mencari solusi bersama", score: 0 },
        { text: "Membuktikan bahwa aku yang benar", score: 2 },
        { text: "Membuat dia merasa bersalah", score: 3 },
        { text: "Cepat-cepat menyudahi pertengkaran", score: 1 }
      ]
    },
    {
      question: "Seberapa sering kamu merasa iri dengan pencapaian orang terdekatmu?",
      options: [
        { text: "Ikut senang dengan tulus", score: 0 },
        { text: "Senang tapi sedikit membandingkan diri", score: 1 },
        { text: "Merasa tersaingi dan ingin menjatuhkan", score: 3 },
        { text: "Biasa saja, fokus ke diri sendiri", score: 0 }
      ]
    }
  ]

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score]
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setAnswers(newAnswers)
      setStep('result')
    }
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const maxScore = questions.length * 3
  const percentage = (totalScore / maxScore) * 100

  const getResult = () => {
    if (percentage < 20) return { title: "Green Flag!", desc: "Kamu sangat sehat secara emosional. Pertahankan!", color: "text-emerald-500", bg: "bg-emerald-50" }
    if (percentage < 50) return { title: "Mildly Toxic", desc: "Ada beberapa pola perilaku yang perlu diperbaiki agar hubungan lebih sehat.", color: "text-amber-500", bg: "bg-amber-50" }
    return { title: "Toxic Alert!", desc: "Pola perilakumu cenderung merugikan diri sendiri dan orang lain. Yuk mulai belajar empati.", color: "text-rose-500", bg: "bg-rose-50" }
  }

  const result = getResult()

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-900 transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </button>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-sm border border-slate-100 text-center"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-rose-500" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-brand-900 mb-4">Toxic Test</h1>
              <p className="text-slate-400 font-bold mb-8 leading-relaxed text-sm lg:text-base">
                Kadang kita tidak sadar perilaku kita bisa menyakiti orang lain. Tes ini membantu melihat level toxicity-mu secara objektif.
              </p>
              <button 
                onClick={() => setStep('quiz')}
                className="w-full py-4 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 text-sm lg:text-base"
              >
                Mulai Tes Sekarang
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </span>
                <div className="h-1.5 w-24 lg:w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-900 transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-lg lg:text-xl font-black text-brand-900 mb-6 leading-tight">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    className="w-full p-4 lg:p-5 text-left rounded-2xl border border-slate-100 hover:border-brand-900 hover:bg-slate-50 transition-all group flex items-center justify-between"
                  >
                    <span className="font-bold text-sm lg:text-base text-slate-600 group-hover:text-brand-900">{opt.text}</span>
                    <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-brand-900 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-sm border border-slate-100 text-center"
            >
              <div className={`w-20 h-20 ${result.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <BarChart3 className={`w-10 h-10 ${result.color}`} />
              </div>
              <h2 className={`text-2xl lg:text-3xl font-black mb-2 ${result.color}`}>{result.title}</h2>
              <p className="text-slate-400 font-bold mb-8 text-sm lg:text-base">{result.desc}</p>
              
              <div className="bg-slate-50 rounded-2xl p-5 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Toxicity Score</span>
                  <span className="text-base lg:text-lg font-black text-brand-900">{Math.round(percentage)}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${percentage > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    setStep('intro')
                    setCurrentQuestion(0)
                    setAnswers([])
                  }}
                  className="py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-wider hover:bg-slate-200 transition-all text-xs lg:text-sm"
                >
                  Ulangi Tes
                </button>
                <button 
                  onClick={onBack}
                  className="py-3.5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all text-xs lg:text-sm"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ToxicTest