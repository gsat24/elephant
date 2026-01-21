import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lightbulb, Brain, CheckCircle2, ChevronRight, Target } from 'lucide-react'

const ProblemSolvingTest = ({ onBack }) => {
  const [step, setStep] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const questions = [
    {
      question: "Dua anggota tim inti sedang bertengkar hebat karena perbedaan pendapat teknis, yang menghambat progres proyek. Apa tindakan pertamamu?",
      options: [
        { text: "Memanggil keduanya untuk mediasi dan mendengarkan argumen masing-masing secara objektif", score: 10 },
        { text: "Meminta mereka untuk profesional dan menyelesaikan masalah di luar jam kerja", score: 5 },
        { text: "Mengambil keputusan sepihak agar proyek tetap berjalan tanpa peduli konflik mereka", score: 2 },
        { text: "Membiarkan mereka sampai salah satu menyerah sendiri", score: 0 }
      ]
    },
    {
      question: "Kamu diberikan tugas kompleks dengan teknologi yang belum pernah kamu gunakan, dan deadline tinggal 3 hari. Bagaimana strategimu?",
      options: [
        { text: "Mencari dokumentasi/tutorial dasar, membuat skala prioritas, dan fokus pada fitur inti", score: 10 },
        { text: "Bekerja lembur mati-matian tanpa rencana yang jelas, yang penting selesai", score: 5 },
        { text: "Meminta perpanjangan deadline segera tanpa mencoba mengerjakannya dulu", score: 2 },
        { text: "Mengeluh kepada atasan bahwa tugas ini tidak masuk akal", score: 0 }
      ]
    },
    {
      question: "Terjadi kesalahan fatal pada hasil kerja tim yang baru saja dipublikasikan. Atasan sangat marah. Apa yang kamu lakukan?",
      options: [
        { text: "Mengakui kesalahan (jika ada andil), menawarkan solusi perbaikan, dan melakukan mitigasi risiko", score: 10 },
        { text: "Mencari siapa yang bertanggung jawab atas bagian yang salah dan melaporkannya", score: 2 },
        { text: "Diam saja dan berharap masalah akan mereda dengan sendirinya", score: 1 },
        { text: "Menyalahkan sistem atau faktor eksternal yang tidak bisa dikontrol", score: 0 }
      ]
    },
    {
      question: "Budget proyek tiba-tiba dipangkas 50% di tengah jalan, padahal target tetap sama. Bagaimana solusinya?",
      options: [
        { text: "Mengevaluasi ulang sumber daya, mencari alternatif yang lebih murah, dan efisiensi proses", score: 10 },
        { text: "Mengurangi kualitas hasil kerja agar sesuai dengan budget yang tersisa", score: 3 },
        { text: "Berhenti mengerjakan proyek sampai budget dikembalikan seperti semula", score: 0 },
        { text: "Meminta tim untuk bekerja sukarela tanpa dibayar ekstra", score: 1 }
      ]
    },
    {
      question: "Ada anggota tim yang sangat pasif dan sering terlambat mengumpulkan tugas. Bagaimana kamu menghadapinya?",
      options: [
        { text: "Mengajaknya bicara empat mata untuk mencari tahu kendalanya dan memberikan dukungan", score: 10 },
        { text: "Menegurnya di depan tim agar dia merasa malu dan berubah", score: 2 },
        { text: "Mengerjakan bagiannya sendiri agar proyek tidak terhambat", score: 5 },
        { text: "Melaporkannya langsung ke HRD agar segera diganti", score: 3 }
      ]
    },
    {
      question: "Rencana proyek yang sudah matang tiba-tiba harus berubah total karena permintaan klien yang mendadak. Reaksimu?",
      options: [
        { text: "Tetap tenang, menganalisis dampak perubahan, dan menyusun rencana baru bersama tim", score: 10 },
        { text: "Marah dan menolak mentah-mentah permintaan klien tersebut", score: 0 },
        { text: "Mengerjakan seadanya karena merasa usaha sebelumnya sia-sia", score: 2 },
        { text: "Mengikuti semua kemauan klien tanpa mempertimbangkan kapasitas tim", score: 4 }
      ]
    },
    {
      question: "Kamu melihat rekan kerja melakukan tindakan yang sedikit melanggar kode etik demi mengejar target. Apa tindakanmu?",
      options: [
        { text: "Mengingatkannya secara personal tentang risiko jangka panjang dan melaporkan jika berulang", score: 10 },
        { text: "Ikut melakukan hal yang sama agar targetku juga tercapai", score: 0 },
        { text: "Abaikan saja, yang penting bukan aku yang melakukannya", score: 2 },
        { text: "Langsung menyebarkan berita tersebut ke seluruh kantor", score: 1 }
      ]
    },
    {
      question: "Terjadi miskomunikasi massal dalam tim yang menyebabkan kerugian waktu. Apa langkah perbaikannya?",
      options: [
        { text: "Membangun sistem komunikasi yang lebih transparan dan terpusat (misal: daily standup)", score: 10 },
        { text: "Menyalahkan orang yang memberikan informasi awal", score: 0 },
        { text: "Mengadakan rapat berjam-jam untuk mencari siapa yang salah", score: 2 },
        { text: "Mengabaikan masalah dan berharap ke depan akan lebih baik", score: 1 }
      ]
    },
    {
      question: "Ada 3 tugas mendesak yang datang bersamaan di akhir hari kerja. Bagaimana kamu memprioritaskannya?",
      options: [
        { text: "Menganalisis dampak masing-masing tugas dan mengerjakan yang paling kritikal dulu", score: 10 },
        { text: "Mengerjakan yang paling mudah dulu agar cepat selesai", score: 5 },
        { text: "Mengerjakan semuanya sekaligus (multi-tasking) meski hasilnya tidak maksimal", score: 3 },
        { text: "Menunda semuanya sampai besok pagi", score: 1 }
      ]
    },
    {
      question: "Hasil analisismu menunjukkan bahwa strategi perusahaan saat ini tidak akan berhasil. Apa yang kamu lakukan?",
      options: [
        { text: "Menyusun data pendukung dan mengusulkan alternatif strategi kepada manajemen", score: 10 },
        { text: "Membicarakan keburukan strategi tersebut di belakang manajemen", score: 0 },
        { text: "Tetap menjalankan strategi tersebut meski tahu akan gagal", score: 3 },
        { text: "Mengundurkan diri karena merasa perusahaan tidak punya masa depan", score: 1 }
      ]
    }
  ]

  const handleAnswer = (s) => {
    setScore(score + s)
    setAnswers([...answers, s])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep('result')
    }
  }

  const maxScore = questions.length * 10
  const finalPercentage = (score / maxScore) * 100

  const getProblemSolvingResult = () => {
    if (finalPercentage > 85) return {
      level: "Strategic Mastermind",
      desc: "Kamu memiliki kemampuan analisis yang luar biasa dan selalu fokus pada solusi jangka panjang.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      suggestion: "Pertahankan ketenanganmu. Kamu sangat cocok menjadi pemimpin tim dalam situasi krisis."
    }
    if (finalPercentage > 60) return {
      level: "Effective Problem Solver",
      desc: "Kamu cukup handal dalam menyelesaikan masalah harian, namun masih bisa ditingkatkan dalam hal visi strategis.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      suggestion: "Cobalah untuk lebih berani mengambil risiko yang terukur dan jangan terlalu terpaku pada prosedur lama."
    }
    if (finalPercentage > 40) return {
      level: "Reactive Solver",
      desc: "Kamu cenderung menyelesaikan masalah hanya saat sudah mendesak (pemadam kebakaran).",
      color: "text-amber-600",
      bg: "bg-amber-50",
      suggestion: "Mulailah belajar untuk mengantisipasi masalah sebelum terjadi (proaktif) daripada hanya bereaksi."
    }
    return {
      level: "Needs Development",
      desc: "Kemampuan pemecahan masalahmu masih sangat terpengaruh oleh emosi dan tekanan.",
      color: "text-rose-600",
      bg: "bg-rose-50",
      suggestion: "Latih kontrol emosimu dan mulailah belajar teknik-teknik problem solving seperti Root Cause Analysis."
    }
  }

  const result = getProblemSolvingResult()

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
              <div className={`w-20 h-20 ${result.bg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                <Target className={`w-10 h-10 ${result.color}`} />
              </div>
              <h2 className={`text-2xl font-black mb-2 ${result.color}`}>{result.level}</h2>
              <p className="text-slate-400 font-bold mb-8">{result.desc}</p>

              <div className="text-5xl font-black text-blue-600 mb-10">{Math.round(finalPercentage)}%</div>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">AI Suggestion</span>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      {result.suggestion}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    setStep('intro')
                    setCurrentQuestion(0)
                    setScore(0)
                    setAnswers([])
                  }}
                  className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-wider hover:bg-slate-200 transition-all"
                >
                  Ulangi Tes
                </button>
                <button 
                  onClick={onBack}
                  className="py-4 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/20"
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

export default ProblemSolvingTest
