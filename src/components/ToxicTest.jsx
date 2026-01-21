import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, ChevronRight, BarChart3 } from 'lucide-react'

const ToxicTest = ({ onBack }) => {
  const [step, setStep] = useState('intro') // intro, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [shuffledOptions, setShuffledOptions] = useState([])

  const questions = [
    {
      question: "Bagaimana reaksimu saat pasangan/teman melakukan kesalahan kecil yang tidak sengaja?",
      options: [
        { text: "Membicarakannya baik-baik untuk mencari solusi", score: 0 },
        { text: "Menyindir atau mendiamkan (silent treatment) agar dia sadar", score: 2 },
        { text: "Meledak marah dan mengungkit kesalahan masa lalunya", score: 3 },
        { text: "Memaklumi karena setiap manusia pasti pernah salah", score: 0 }
      ]
    },
    {
      question: "Apakah kamu merasa perlu mengecek HP atau media sosial pasangan/teman diam-diam?",
      options: [
        { text: "Tidak pernah, kepercayaan adalah kunci hubungan", score: 0 },
        { text: "Sesekali saja kalau ada gelagat yang sangat mencurigakan", score: 1 },
        { text: "Sering, untuk memastikan mereka tidak mengkhianatiku", score: 3 },
        { text: "Hanya jika ada kesepakatan terbuka sebelumnya", score: 0 }
      ]
    },
    {
      question: "Saat terjadi perdebatan hebat, apa tujuan utamamu?",
      options: [
        { text: "Mencari jalan tengah yang menguntungkan kedua pihak", score: 0 },
        { text: "Membuktikan bahwa argumenku yang paling benar", score: 2 },
        { text: "Membuat lawan bicara merasa bersalah atau malu", score: 3 },
        { text: "Mendengarkan dulu sebelum memberikan tanggapan", score: 0 }
      ]
    },
    {
      question: "Seberapa sering kamu merasa 'iri' atau tersaingi saat orang terdekatmu sukses?",
      options: [
        { text: "Ikut senang dan merayakannya dengan tulus", score: 0 },
        { text: "Senang, tapi dalam hati membandingkan dengan nasib sendiri", score: 1 },
        { text: "Merasa terancam dan berusaha mencari celah kekurangannya", score: 3 },
        { text: "Biasa saja, fokus pada progres diri masing-masing", score: 0 }
      ]
    },
    {
      question: "Temanmu membatalkan janji secara mendadak karena urusan darurat. Reaksimu?",
      options: [
        { text: "Menanyakan apakah ada yang bisa dibantu", score: 0 },
        { text: "Marah dan menganggap dia tidak menghargai waktuku", score: 2 },
        { text: "Membalas dengan membatalkan janji berikutnya secara sengaja", score: 3 },
        { text: "Kecewa sebentar tapi memahami kondisinya", score: 0 }
      ]
    },
    {
      question: "Apakah kamu sering merasa menjadi 'korban' (victim mentality) dalam setiap konflik?",
      options: [
        { text: "Berusaha objektif melihat kontribusiku dalam masalah itu", score: 0 },
        { text: "Sering merasa selalu disalahkan padahal sudah berusaha", score: 2 },
        { text: "Yakin bahwa semua masalah adalah kesalahan orang lain", score: 3 },
        { text: "Mencari tahu penyebab masalah tanpa menyalahkan siapa pun", score: 0 }
      ]
    },
    {
      question: "Bagaimana caramu memberikan kritik atau masukan kepada orang lain?",
      options: [
        { text: "Menyampaikannya secara privat dengan bahasa yang sopan", score: 0 },
        { text: "Memberi tahu di depan umum agar dia kapok", score: 3 },
        { text: "Menggunakan sindiran halus di media sosial", score: 2 },
        { text: "Menunggu waktu yang tepat saat emosi sudah stabil", score: 0 }
      ]
    },
    {
      question: "Pasangan/temanmu ingin menghabiskan waktu sendiri tanpa diganggu. Reaksimu?",
      options: [
        { text: "Mendukung dan menghargai privasinya", score: 0 },
        { text: "Merasa curiga dia sedang menyembunyikan sesuatu", score: 2 },
        { text: "Meneror dengan pesan/telepon terus menerus", score: 3 },
        { text: "Mengambil kesempatan untuk melakukan hobiku sendiri", score: 0 }
      ]
    },
    {
      question: "Seberapa sering kamu mengungkit kebaikan yang pernah kamu lakukan saat bertengkar?",
      options: [
        { text: "Hampir tidak pernah, ikhlas adalah kuncinya", score: 0 },
        { text: "Sesekali jika merasa sangat tidak dihargai", score: 1 },
        { text: "Selalu, agar dia sadar betapa beruntungnya memiliki aku", score: 3 },
        { text: "Hanya jika relevan dengan topik diskusi", score: 0 }
      ]
    },
    {
      question: "Saat kamu melakukan kesalahan, apa tindakan pertamamu?",
      options: [
        { text: "Meminta maaf dengan tulus tanpa mencari alasan", score: 0 },
        { text: "Mencari kambing hitam untuk disalahkan", score: 3 },
        { text: "Menunggu orang lain menegur dulu baru mengaku", score: 2 },
        { text: "Berjanji untuk memperbaiki kesalahan tersebut", score: 0 }
      ]
    },
    {
      question: "Apakah kamu sering membandingkan pasangan/temanmu dengan orang lain secara negatif?",
      options: [
        { text: "Tidak, setiap orang punya keunikan masing-masing", score: 0 },
        { text: "Hanya saat sedang sangat kesal saja", score: 1 },
        { text: "Sering, agar dia termotivasi (meski menyakitkan)", score: 3 },
        { text: "Fokus pada kelebihannya daripada kekurangannya", score: 0 }
      ]
    },
    {
      question: "Bagaimana reaksimu jika orang yang tidak kamu sukai mengalami kegagalan?",
      options: [
        { text: "Tetap merasa empati sebagai sesama manusia", score: 0 },
        { text: "Merasa puas dan menganggap itu karma baginya", score: 3 },
        { text: "Biasa saja, tidak peduli dengan urusannya", score: 1 },
        { text: "Berharap dia bisa belajar dari kegagalan itu", score: 0 }
      ]
    },
    {
      question: "Seberapa sering kamu menggunakan kata-kata kasar atau nada tinggi saat marah?",
      options: [
        { text: "Hampir tidak pernah, aku berusaha mengontrol emosi", score: 0 },
        { text: "Hanya jika lawan bicara memancing emosi berlebihan", score: 2 },
        { text: "Sering, itu caraku mengekspresikan kejujuran", score: 3 },
        { text: "Mencoba menarik diri sampai tenang sebelum bicara", score: 0 }
      ]
    },
    {
      question: "Apakah kamu merasa harus mengetahui semua password akun milik pasangan/teman?",
      options: [
        { text: "Tidak perlu, itu adalah ruang privasi mereka", score: 0 },
        { text: "Hanya jika mereka yang memberikannya secara sukarela", score: 0 },
        { text: "Harus tahu, kalau tidak berarti ada yang disembunyikan", score: 3 },
        { text: "Hanya untuk keadaan darurat saja", score: 1 }
      ]
    },
    {
      question: "Bagaimana caramu menunjukkan apresiasi pada bantuan kecil orang lain?",
      options: [
        { text: "Mengucapkan terima kasih dengan tulus", score: 0 },
        { text: "Menganggap itu sudah kewajiban mereka", score: 2 },
        { text: "Memberikan apresiasi balik di kemudian hari", score: 0 },
        { text: "Biasa saja, tidak perlu dibesar-besarkan", score: 1 }
      ]
    },
    {
      question: "Jika ada perbedaan pendapat, apakah kamu mau mendengarkan sampai selesai?",
      options: [
        { text: "Ya, aku ingin memahami sudut pandangnya", score: 0 },
        { text: "Sering memotong pembicaraan karena sudah tahu arahnya", score: 2 },
        { text: "Mendengarkan sambil menyiapkan serangan balik", score: 3 },
        { text: "Mencatat poin-poin yang perlu didiskusikan", score: 0 }
      ]
    },
    {
      question: "Apakah kamu sering memberikan ancaman (seperti ingin putus/pergi) saat konflik?",
      options: [
        { text: "Tidak, ancaman bukan cara menyelesaikan masalah", score: 0 },
        { text: "Sering, agar dia takut kehilangan aku", score: 3 },
        { text: "Hanya jika sudah benar-benar di batas kesabaran", score: 2 },
        { text: "Lebih memilih jeda waktu untuk berpikir jernih", score: 0 }
      ]
    },
    {
      question: "Bagaimana caramu menolak permintaan teman yang tidak bisa kamu penuhi?",
      options: [
        { text: "Menjelaskan alasan dengan jujur dan sopan", score: 0 },
        { text: "Menghilang tanpa kabar (ghosting)", score: 3 },
        { text: "Memberikan janji palsu agar dia tidak kecewa", score: 2 },
        { text: "Menawarkan solusi alternatif jika memungkinkan", score: 0 }
      ]
    },
    {
      question: "Seberapa terbuka kamu dalam mengomunikasikan perasaan tidak nyamanmu?",
      options: [
        { text: "Sangat terbuka dengan cara yang asertif", score: 0 },
        { text: "Dipendam sendiri sampai akhirnya meledak", score: 2 },
        { text: "Menggunakan kode-kode agar dia peka sendiri", score: 3 },
        { text: "Mencari waktu yang tenang untuk berdiskusi", score: 0 }
      ]
    },
    {
      question: "Apakah kamu sering memaksakan kehendakmu dalam mengambil keputusan bersama?",
      options: [
        { text: "Selalu berdiskusi untuk mencapai mufakat", score: 0 },
        { text: "Sering memaksa karena aku merasa lebih tahu", score: 3 },
        { text: "Mengalah terus meski sebenarnya tidak setuju", score: 1 },
        { text: "Mencoba mencari opsi yang paling adil", score: 0 }
      ]
    }
  ]

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize shuffled options for current question
  React.useEffect(() => {
    if (step === 'quiz') {
      setShuffledOptions(shuffleArray(questions[currentQuestion].options))
    }
  }, [currentQuestion, step])

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
  const maxPossibleScore = questions.length * 3
  const percentage = (totalScore / maxPossibleScore) * 100

  const getResult = () => {
    if (percentage < 15) return { 
      title: "Pure Green Flag!", 
      desc: "Kamu adalah contoh pribadi yang sehat secara emosional. Pertahankan empati dan komunikasimu!", 
      color: "text-emerald-500", 
      bg: "bg-emerald-50",
      aiSuggestion: "Pola pikirmu sangat matang. Kamu tahu cara menghargai batasan diri dan orang lain. Saran: Jadilah inspirasi bagi lingkunganmu dalam membangun hubungan yang sehat."
    }
    if (percentage < 40) return { 
      title: "Healthy with Minor Flaws", 
      desc: "Secara umum kamu sehat, namun ada beberapa kebiasaan kecil yang bisa memicu konflik jika dibiarkan.", 
      color: "text-blue-500", 
      bg: "bg-blue-50",
      aiSuggestion: "Kadang kamu masih terjebak dalam rasa tidak aman (insecurity). Fokuslah pada membangun kepercayaan diri dan jangan ragu untuk bicara jujur daripada menggunakan kode."
    }
    if (percentage < 70) return { 
      title: "Caution: Yellow Flag", 
      desc: "Ada pola perilaku toxic yang mulai mengakar. Penting untuk mulai melakukan refleksi diri.", 
      color: "text-amber-500", 
      bg: "bg-amber-50",
      aiSuggestion: "Kamu cenderung ingin mengontrol situasi atau orang lain saat merasa terancam. Belajarlah teknik regulasi emosi dan cobalah melihat masalah dari perspektif orang lain secara lebih mendalam."
    }
    return { 
      title: "Toxic Alert!", 
      desc: "Pola perilakumu saat ini cenderung merugikan orang sekitar dan dirimu sendiri. Yuk, mulai berubah!", 
      color: "text-rose-500", 
      bg: "bg-rose-50",
      aiSuggestion: "Ego dan mekanisme pertahanan dirimu sangat tinggi. Ini sering kali menutupi rasa takut atau luka lama. Sangat disarankan untuk berkonsultasi dengan ahli atau mulai belajar komunikasi non-kekerasan secara serius."
    }
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
                {shuffledOptions.map((opt, idx) => (
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

              {/* AI Suggestion Breakdown */}
              <div className="text-left bg-brand-50/50 border border-brand-100 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest">AI Analysis Breakdown</span>
                </div>
                <p className="text-xs lg:text-sm text-slate-600 font-bold leading-relaxed italic">
                  "{result.aiSuggestion}"
                </p>
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