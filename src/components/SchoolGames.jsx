import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  Users, 
  Zap, 
  HelpCircle, 
  MessageCircle,
  Smartphone,
  UserPlus,
  QrCode,
  Send,
  Trophy,
  Loader2,
  Heart,
  Brain,
  CheckCircle,
  X,
  User,
  ArrowRight
} from 'lucide-react'

const schoolGames = [
  {
    id: 'stress-games',
    title: 'The Stress Games',
    icon: <Brain className="w-6 h-6 text-rose-600" />,
    desc: 'Tebak beban pikiran teman sekelasmu dan temukan kesamaan di antara kalian.',
    color: 'bg-rose-50'
  },
  {
    id: 'wyr-school',
    title: 'Would You Rather',
    icon: <HelpCircle className="w-6 h-6 text-amber-600" />,
    desc: 'Pilihan-pilihan sulit yang akan mengungkap kepribadianmu.',
    color: 'bg-amber-50'
  },
  {
    id: 'classmate-trivia',
    title: 'Classmate Trivia',
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    desc: 'Seberapa kenal kamu dengan teman sekelasmu?',
    color: 'bg-indigo-50'
  }
]

const WYR_QUESTIONS = [
  { a: "Bisa baca pikiran orang", b: "Bisa melihat masa depan" },
  { a: "Selalu kepanasan", b: "Selalu kedinginan" },
  { a: "Gak bisa pakai HP selamanya", b: "Gak bisa makan enak selamanya" },
  { a: "Punya sayap tapi gak bisa lari", b: "Punya insang tapi gak bisa jalan" },
  { a: "Tinggal di hutan sendirian", b: "Tinggal di kota tapi gak punya teman" },
  { a: "Jadi orang paling pintar", b: "Jadi orang paling beruntung" },
  { a: "Bisa terbang", b: "Bisa menghilang" },
  { a: "Makan pizza rasa cokelat", b: "Makan cokelat rasa pizza" },
  { a: "Gak pernah telat sekolah", b: "Gak pernah ada PR" },
  { a: "Liburan ke luar angkasa", b: "Liburan ke dasar laut" }
]

const TRIVIA_QUESTIONS = [
  {
    q: "Apa makanan yang bisa kamu makan setiap hari selamanya?",
    options: ["Nasi Goreng", "Mie Instan", "Ayam Bakar", "Sate Ayam"]
  },
  {
    q: "Kalau kamu punya kekuatan super, kamu mau apa?",
    options: ["Terbang", "Menghilang", "Baca Pikiran", "Teleportasi"]
  },
  {
    q: "Apa ketakutan terbesarmu yang paling aneh?",
    options: ["Kecoa", "Badut", "Kegelapan", "Ketinggian"]
  },
  {
    q: "Kalau kamu jadi artis, kamu mau jadi apa?",
    options: ["Penyanyi", "Aktor/Aktris", "Komedian", "Model"]
  },
  {
    q: "Apa kartun masa kecil favoritmu?",
    options: ["Doraemon", "SpongeBob", "Naruto", "Tom & Jerry"]
  },
  {
    q: "Kalau bisa liburan ke mana saja sekarang, mau ke mana?",
    options: ["Jepang", "Korea", "Eropa", "Bali"]
  },
  {
    q: "Apa barang yang wajib ada di tas kamu?",
    options: ["HP", "Parfum", "Powerbank", "Cemilan"]
  },
  {
    q: "Lagu apa yang menggambarkan hidupmu saat ini?",
    options: ["Pop Ceria", "Galau Abis", "Rock Semangat", "Jazz Santai"]
  },
  {
    q: "Apa pelajaran sekolah yang paling bikin kamu ngantuk?",
    options: ["Matematika", "Sejarah", "Fisika", "Bahasa"]
  },
  {
    q: "Apa emoji yang paling sering kamu pakai?",
    options: ["😂", "🔥", "❤️", "💀"]
  }
]

const SchoolGames = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [gameMode, setGameMode] = useState(null) // 'local' or 'online'
  const [step, setStep] = useState('menu') // 'menu', 'mode-select', 'setup', 'playing', 'result'
  const [participants, setParticipants] = useState([])
  const [currentParticipant, setCurrentParticipant] = useState('')
  const [stressData, setStressData] = useState([]) // Array of { name, stress, guessed: false }
  const [wyrData, setWyrData] = useState([])
  const [triviaData, setTriviaData] = useState([])
  const [roomCode, setRoomCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedGuess, setSelectedGuess] = useState(null)
  const [actualAnswer, setActualAnswer] = useState(null)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const [localVotes, setLocalVotes] = useState({ A: '', B: '', C: '', D: '' }) // Store names for each option in local mode

  const handleStartGame = (gameId) => {
    setActiveGame(gameId)
    setStep('mode-select')
    // Reset data
    setStressData([])
    setWyrData([])
    setTriviaData([])
    setCurrentIndex(0)
  }

  const handleSelectMode = (mode) => {
    setGameMode(mode)
    if (mode === 'local') {
      setStep('setup')
    } else {
      // Simulate room creation for online mode
      setRoomCode(Math.random().toString(36).substring(2, 8).toUpperCase())
      setStep('setup')
    }
  }

  const addParticipant = () => {
    if (currentParticipant.trim()) {
      setParticipants([...participants, currentParticipant.trim()])
      setCurrentParticipant('')
    }
  }

  const handleStressSubmit = (stressText) => {
    const newEntry = {
      name: gameMode === 'local' ? participants[currentIndex] : 'Anonymous',
      stress: stressText,
      guessed: false
    }
    setStressData([...stressData, newEntry])
    
    if (gameMode === 'local' && currentIndex < participants.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setStep('playing')
      setCurrentIndex(0)
      // Shuffle stress data for guessing
      setStressData(prev => [...prev].sort(() => Math.random() - 0.5))
    }
  }

  const handleWyrSubmit = (optionA, optionB) => {
    const newEntry = {
      name: gameMode === 'local' ? participants[currentIndex] : 'Anonymous',
      optionA,
      optionB
    }
    setWyrData([...wyrData, newEntry])

    if (gameMode === 'local' && currentIndex < participants.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setStep('playing')
      setCurrentIndex(0)
      setWyrData(prev => [...prev].sort(() => Math.random() - 0.5))
    }
  }

  const handleTriviaSubmit = (question, answer) => {
    const newEntry = {
      targetName: gameMode === 'local' ? participants[currentIndex] : 'Anonymous',
      question,
      answer
    }
    setTriviaData([...triviaData, newEntry])

    if (gameMode === 'local' && currentIndex < participants.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setStep('playing')
      setCurrentIndex(0)
      setTriviaData(prev => [...prev].sort(() => Math.random() - 0.5))
    }
  }

  const handleWyrStart = () => {
    // Generate 5 random WYR questions
    const shuffled = [...WYR_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5)
    setWyrData(shuffled.map(q => ({ name: 'AI Generator', optionA: q.a, optionB: q.b })))
    setStep('playing')
    setCurrentIndex(0)
    setSelectedGuess(null)
    setActualAnswer(null)
    setLocalVotes({ A: '', B: '', C: '', D: '' })
  }

  const handleTriviaStart = () => {
    // Generate trivia for each participant using random questions
    const generatedTrivia = participants.map(name => {
      const qObj = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)]
      return {
        targetName: name,
        question: qObj.q,
        options: qObj.options,
        answer: null 
      }
    })
    
    setTriviaData(generatedTrivia.sort(() => Math.random() - 0.5))
    setStep('playing')
    setCurrentIndex(0)
    setSelectedGuess(null)
    setActualAnswer(null)
    setStats({ correct: 0, total: 0 })
  }

  const renderSetup = () => {
    if (gameMode === 'local') {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl">
            <h3 className="text-xl font-black text-brand-900 mb-4">Daftar Partisipan (Lokal)</h3>
            <p className="text-slate-500 mb-6 font-medium">Masukkan nama murid yang akan ikut bermain satu per satu.</p>
            
            <div className="flex gap-3 mb-8">
              <input 
                type="text"
                value={currentParticipant}
                onChange={(e) => setCurrentParticipant(e.target.value)}
                placeholder="Nama Murid..."
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-500 outline-none font-bold"
                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
              />
              <button 
                onClick={addParticipant}
                className="bg-brand-900 text-white px-6 rounded-2xl font-black hover:bg-brand-800 transition-all"
              >
                Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {participants.map((p, i) => (
                <span key={i} className="bg-brand-50 text-brand-700 px-4 py-2 rounded-xl font-bold border border-brand-100 flex items-center gap-2">
                  {p}
                  <button onClick={() => setParticipants(participants.filter((_, idx) => idx !== i))} className="text-brand-300 hover:text-rose-500">×</button>
                </span>
              ))}
            </div>

            <button 
              disabled={participants.length < 2}
              onClick={() => {
                if (activeGame === 'classmate-trivia') {
                  handleTriviaStart()
                } else {
                  setStep('input-data')
                  setCurrentIndex(0)
                }
              }}
              className="w-full py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all disabled:opacity-50 shadow-xl shadow-brand-900/20"
            >
              {activeGame === 'classmate-trivia' ? 'Mulai Trivia (AI)' : 'Lanjut ke Pengisian Data'}
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-black text-brand-900 mb-2">Mode Online</h3>
            <p className="text-slate-500 mb-8 font-medium">Minta murid untuk scan QR atau masukkan kode room.</p>
            
            <div className="bg-slate-50 p-8 rounded-3xl mb-8 border-2 border-dashed border-slate-200">
              <span className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Room Code</span>
              <span className="text-5xl font-black text-brand-900 tracking-widest">{roomCode}</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-8 text-slate-400 font-bold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menunggu murid bergabung (0/0)...</span>
            </div>

            <button 
                onClick={() => {
                  if (activeGame === 'classmate-trivia') {
                    // In online simulation, we'll just generate some random names
                    const simParticipants = ['Budi', 'Siti', 'Agus', 'Lani']
                    const generatedTrivia = simParticipants.map(name => {
                      const qObj = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)]
                      return {
                        targetName: name,
                        question: qObj.q,
                        options: qObj.options,
                        answer: null
                      }
                    })
                    setTriviaData(generatedTrivia.sort(() => Math.random() - 0.5))
                    setStep('playing')
                    setCurrentIndex(0)
                    setSelectedGuess(null)
                    setActualAnswer(null)
                    setStats({ correct: 0, total: 0 })
                  } else if (activeGame === 'would-you-rather') {
                    handleWyrStart()
                  } else {
                    setStep('input-data')
                  }
                }}
              className="w-full py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
            >
              {activeGame === 'classmate-trivia' ? 'Mulai Trivia (Simulasi)' : 'Mulai Pengisian (Simulasi)'}
            </button>
          </div>
        </div>
      )
    }
  }

  const renderInputData = () => {
    if (activeGame === 'stress-games') {
      return (
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl text-center"
          >
            <div className="mb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">
                Input Beban Pikiran
              </span>
              <h3 className="text-2xl font-black text-brand-900">
                {gameMode === 'local' ? `Giliran: ${participants[currentIndex]}` : 'Tuliskan Stress-mu'}
              </h3>
            </div>

            <p className="text-slate-500 mb-8 font-medium italic">
              "Apa satu hal yang paling membuatmu stress atau terbebani minggu ini?"
            </p>

            <textarea 
              id="stress-input"
              className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-rose-500 outline-none font-bold text-slate-700 min-h-[150px] mb-8"
              placeholder="Tuliskan di sini secara jujur..."
            ></textarea>

            <button 
              onClick={() => {
                const val = document.getElementById('stress-input').value
                if (val.trim()) {
                  handleStressSubmit(val)
                  document.getElementById('stress-input').value = ''
                }
              }}
              className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Simpan & Lanjut
            </button>
          </motion.div>
        </div>
      )
    }

    if (activeGame === 'wyr-school') {
      return (
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl text-center"
          >
            <div className="mb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">
                Input Would You Rather
              </span>
              <h3 className="text-2xl font-black text-brand-900">
                {gameMode === 'local' ? `Giliran: ${participants[currentIndex]}` : 'Buat Pilihanmu'}
              </h3>
            </div>

            <p className="text-slate-500 mb-8 font-medium italic">
              "Buat dua pilihan sulit untuk teman sekelasmu!"
            </p>

            <div className="space-y-4 mb-8">
              <input 
                id="wyr-a"
                type="text"
                placeholder="Pilihan A..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none font-bold"
              />
              <div className="text-slate-400 font-black">ATAU</div>
              <input 
                id="wyr-b"
                type="text"
                placeholder="Pilihan B..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none font-bold"
              />
            </div>

            <button 
              onClick={() => {
                const valA = document.getElementById('wyr-a').value
                const valB = document.getElementById('wyr-b').value
                if (valA.trim() && valB.trim()) {
                  handleWyrSubmit(valA, valB)
                  document.getElementById('wyr-a').value = ''
                  document.getElementById('wyr-b').value = ''
                }
              }}
              className="w-full py-5 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Simpan & Lanjut
            </button>
          </motion.div>
        </div>
      )
    }

    if (activeGame === 'classmate-trivia') {
      return (
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl text-center"
          >
            <div className="mb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">
                Input Trivia
              </span>
              <h3 className="text-2xl font-black text-brand-900">
                {gameMode === 'local' ? `Tentang: ${participants[currentIndex]}` : 'Tulis Trivia Dirimu'}
              </h3>
            </div>

            <p className="text-slate-500 mb-8 font-medium italic">
              "Tuliskan satu pertanyaan trivia tentang dirimu dan jawabannya!"
            </p>

            <div className="space-y-4 mb-8">
              <input 
                id="trivia-q"
                type="text"
                placeholder="Contoh: Apa makanan favoritku?"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold"
              />
              <input 
                id="trivia-a"
                type="text"
                placeholder="Jawaban..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold"
              />
            </div>

            <button 
              onClick={() => {
                const q = document.getElementById('trivia-q').value
                const a = document.getElementById('trivia-a').value
                if (q.trim() && a.trim()) {
                  handleTriviaSubmit(q, a)
                  document.getElementById('trivia-q').value = ''
                  document.getElementById('trivia-a').value = ''
                }
              }}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Simpan & Lanjut
            </button>
          </motion.div>
        </div>
      )
    }
    return null
  }

  const renderPlaying = () => {
    if (activeGame === 'stress-games') {
      const currentStress = stressData[currentIndex]
      if (!currentStress) return null
      return (
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[2.5rem] border-2 border-rose-100 shadow-xl text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-8 h-8 text-rose-500" />
              </div>
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.4em] block mb-4">Misteri Beban Pikiran</span>
              <h3 className="text-2xl lg:text-3xl font-black text-brand-900 leading-tight mb-8 px-4">
                "{currentStress.stress}"
              </h3>
              
              {!showFeedback ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowFeedback(true)}
                    className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
                  >
                    <p className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest group-hover:text-brand-400">Siapa Pemiliknya?</p>
                    <p className="text-xl font-black text-brand-900 group-hover:text-brand-600">Tebak di Kelas!</p>
                  </button>
                  <button 
                    className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                  >
                    <p className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest group-hover:text-rose-400">Relatable?</p>
                    <p className="text-xl font-black text-brand-900 group-hover:text-rose-600">Angkat Tangan!</p>
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-900 p-6 rounded-2xl text-white"
                >
                  <p className="text-sm font-medium text-brand-200 uppercase tracking-widest mb-2">Ditulis Oleh:</p>
                  <p className="text-3xl font-black">{currentStress.name}</p>
                </motion.div>
              )}
            </div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-60"></div>
          </motion.div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                setShowFeedback(false)
                if (currentIndex < stressData.length - 1) {
                  setCurrentIndex(currentIndex + 1)
                } else {
                  setStep('result')
                }
              }}
              className="px-10 py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-xl"
            >
              {currentIndex < stressData.length - 1 ? 'Tampilkan Berikutnya' : 'Lihat Rangkuman'}
            </button>
          </div>
        </div>
      )
    }

    if (activeGame === 'wyr-school') {
      const currentWyr = wyrData[currentIndex]
      if (!currentWyr) return null

      const getVoteCount = (optKey) => {
        if (!localVotes[optKey]) return 0
        return localVotes[optKey].split(',').filter(name => name.trim()).length
      }

      const totalVotes = getVoteCount('A') + getVoteCount('B')
      const isResult = showFeedback

      return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[3rem] border-2 border-slate-100 shadow-2xl text-center relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <span className="bg-slate-100 text-slate-500 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200">
                Question {currentIndex + 1} / {wyrData.length}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-brand-900" />
                </div>
                <span className="text-sm font-black text-brand-900 uppercase tracking-wider">Would You Rather?</span>
              </div>
            </div>

            <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight">
              Pilih satu yang paling oke menurut kamu...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* VS Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
                <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-white font-black italic">VS</span>
                </div>
              </div>

              {/* Option A */}
              <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                isResult && getVoteCount('A') >= getVoteCount('B') ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="mb-8">
                  <span className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center text-xl font-black text-indigo-600 mx-auto mb-4">A</span>
                  <p className="text-2xl font-black text-slate-800 leading-tight h-20 flex items-center justify-center">
                    {currentWyr.optionA}
                  </p>
                </div>

                <div className="space-y-4">
                  {gameMode === 'local' ? (
                    <div className="text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Siapa yang pilih ini? ({getVoteCount('A')})
                      </label>
                      <textarea 
                        disabled={isResult}
                        placeholder="Nama siswa..."
                        value={localVotes.A}
                        onChange={(e) => setLocalVotes(prev => ({ ...prev, A: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-100 focus:border-indigo-400 outline-none text-sm font-bold resize-none h-24 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '45%' }}
                          className="h-full bg-indigo-500 rounded-full"
                        />
                      </div>
                      <span className="text-lg font-black text-indigo-600">45%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Option B */}
              <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                isResult && getVoteCount('B') >= getVoteCount('A') ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="mb-8">
                  <span className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center text-xl font-black text-emerald-600 mx-auto mb-4">B</span>
                  <p className="text-2xl font-black text-slate-800 leading-tight h-20 flex items-center justify-center">
                    {currentWyr.optionB}
                  </p>
                </div>

                <div className="space-y-4">
                  {gameMode === 'local' ? (
                    <div className="text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                        Siapa yang pilih ini? ({getVoteCount('B')})
                      </label>
                      <textarea 
                        disabled={isResult}
                        placeholder="Nama siswa..."
                        value={localVotes.B}
                        onChange={(e) => setLocalVotes(prev => ({ ...prev, B: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-100 focus:border-emerald-400 outline-none text-sm font-bold resize-none h-24 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '55%' }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                      <span className="text-lg font-black text-emerald-600">55%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Voting Result Banner */}
            {isResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 p-8 rounded-[2rem] bg-brand-900 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Zap className="w-20 h-20" />
                </div>
                <h4 className="text-xl font-black mb-2">Hasil Voting Kelas!</h4>
                <p className="text-brand-200 font-medium">
                  {getVoteCount('A') > getVoteCount('B') 
                    ? `Opsi A menang dengan ${getVoteCount('A')} suara!` 
                    : getVoteCount('B') > getVoteCount('A')
                    ? `Opsi B menang with ${getVoteCount('B')} suara!`
                    : "Wah, kelas terbagi dua sama rata!"}
                </p>
              </motion.div>
            )}

            {!isResult && (
              <button 
                onClick={() => {
                  if (gameMode === 'local' && totalVotes === 0) {
                    alert("Masukkan minimal satu nama!")
                    return
                  }
                  setShowFeedback(true)
                }}
                className="mt-12 w-full py-6 bg-brand-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
              >
                Kunci Jawaban Kelas
              </button>
            )}
          </motion.div>

          {isResult && (
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setShowFeedback(false)
                  setLocalVotes({ A: '', B: '', C: '', D: '' })
                  if (currentIndex < wyrData.length - 1) {
                    setCurrentIndex(currentIndex + 1)
                  } else {
                    setStep('result')
                  }
                }}
                className="px-12 py-6 bg-brand-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl flex items-center gap-4 group"
              >
                {currentIndex < wyrData.length - 1 ? (
                  <>Pertanyaan Berikutnya <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                ) : 'Selesai'}
              </button>
            </div>
          )}
        </div>
      )
    }

    if (activeGame === 'classmate-trivia') {
      const currentTrivia = triviaData[currentIndex]
      if (!currentTrivia) return null
      
      const isVoting = selectedGuess === null && actualAnswer === null
      const isConfirming = selectedGuess !== null && actualAnswer === null
      const isResult = actualAnswer !== null

      // Function to count names in local votes
      const getVoteCount = (optKey) => {
        if (!localVotes[optKey]) return 0
        return localVotes[optKey].split(',').filter(name => name.trim()).length
      }

      const totalLocalVotes = ['A', 'B', 'C', 'D'].reduce((sum, key) => sum + getVoteCount(key), 0)

      return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[2.5rem] border-2 border-indigo-100 shadow-xl text-center relative overflow-hidden"
          >
            {/* Header Info */}
            <div className="flex items-center justify-between mb-10">
              <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest">
                Round {currentIndex + 1} / {triviaData.length}
              </span>
              <div className="flex gap-4">
                <span className="bg-slate-50 text-slate-500 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 border border-slate-100">
                  Mode: {gameMode === 'local' ? 'Offline' : 'Online'}
                </span>
                <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
                  <Trophy className="w-4 h-4" />
                  Score: {stats.correct}
                </span>
              </div>
            </div>

            {/* Target Highlight */}
            <div className="mb-10 relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="relative">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl shadow-indigo-600/20">
                  <User className="w-10 h-10 text-white" />
                </div>
                <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em] block mb-2">
                  Pertanyaan Tentang:
                </span>
                <h2 className="text-5xl font-black text-brand-900 mb-2 tracking-tight">
                  {currentTrivia.targetName}
                </h2>
                <div className="h-1.5 w-24 bg-brand-900 mx-auto rounded-full opacity-10" />
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 mb-10">
              <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                "{currentTrivia.question}"
              </h3>
            </div>

            {/* Instruction Banner */}
            <div className={`mb-10 p-6 rounded-3xl text-sm font-black uppercase tracking-widest border-2 ${
              isVoting ? 'bg-amber-50 text-amber-600 border-amber-100' :
              isConfirming ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
              actualAnswer === selectedGuess ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {isVoting && (
                <div className="flex flex-col gap-2">
                  <span>Tahap 1: Pengumpulan Jawaban Kelas</span>
                  <span className="text-[10px] opacity-70">
                    {gameMode === 'local' 
                      ? "Ketik nama siswa yang memilih setiap opsi di bawah" 
                      : "Siswa silakan memilih jawaban di HP masing-masing"}
                  </span>
                </div>
              )}
              {isConfirming && (
                <div className="flex flex-col gap-2">
                  <span>Tahap 2: Konfirmasi Jawaban</span>
                  <span className="text-[10px] opacity-70 italic text-indigo-400">
                    "{currentTrivia.targetName}, mana jawaban yang paling tepat buat kamu?"
                  </span>
                </div>
              )}
              {isResult && (
                <div className="flex items-center justify-center gap-3">
                  {actualAnswer === selectedGuess ? <Zap className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  <span>{actualAnswer === selectedGuess ? "Jawaban Kelas Sesuai!" : "Jawaban Kelas Meleset!"}</span>
                </div>
              )}
            </div>

            {/* Options & Inputs Grid */}
            <div className="grid grid-cols-1 gap-6">
              {currentTrivia.options.map((opt, idx) => {
                const optKey = ['A', 'B', 'C', 'D'][idx]
                const isSelected = selectedGuess === opt
                const isActual = actualAnswer === opt
                
                let cardClass = "bg-white border-slate-200"
                if (isVoting) {
                  cardClass = "bg-white border-slate-200 hover:border-indigo-300"
                } else if (isConfirming) {
                  cardClass = isSelected ? "bg-amber-50 border-amber-500 shadow-lg" : "bg-slate-50 border-slate-100 opacity-50"
                } else if (isResult) {
                  if (isActual) cardClass = "bg-emerald-50 border-emerald-500 shadow-lg"
                  else if (isSelected) cardClass = "bg-rose-50 border-rose-500 opacity-75"
                  else cardClass = "bg-slate-50 border-slate-100 opacity-25"
                }

                return (
                  <div key={idx} className={`p-6 rounded-3xl border-2 transition-all duration-500 ${cardClass}`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Option Label & Button */}
                      <button
                        disabled={!isVoting && !isConfirming}
                        onClick={() => {
                          if (isVoting) {
                            if (gameMode === 'online') setSelectedGuess(opt)
                            // In local, selection is implied by who gets the most names
                          } else if (isConfirming) {
                            setActualAnswer(opt)
                            if (opt === selectedGuess) {
                              setStats(prev => ({ ...prev, correct: prev.correct + 1 }))
                            }
                          }
                        }}
                        className="flex-1 text-left flex items-start gap-4 group"
                      >
                        <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 transition-colors ${
                          isSelected ? 'bg-amber-500 text-white' : 
                          isActual ? 'bg-emerald-500 text-white' : 
                          'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                        }`}>
                          {optKey}
                        </span>
                        <div className="pt-1">
                          <p className={`text-xl font-black ${isSelected || isActual ? 'text-slate-900' : 'text-slate-600'}`}>
                            {opt}
                          </p>
                          {isResult && isActual && (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1 mt-1">
                              <CheckCircle className="w-3 h-3" /> Jawaban {currentTrivia.targetName}
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Vote Input / Display */}
                      <div className="w-full md:w-80 shrink-0">
                        {gameMode === 'local' ? (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                              Nama Siswa
                              <span className="text-indigo-500">{getVoteCount(optKey)} Orang</span>
                            </label>
                            <textarea
                              disabled={!isVoting}
                              placeholder="Pisahkan dengan koma (Andi, Budi...)"
                              value={localVotes[optKey]}
                              onChange={(e) => setLocalVotes(prev => ({ ...prev, [optKey]: e.target.value }))}
                              className={`w-full px-4 py-3 rounded-2xl text-sm font-bold bg-slate-50 border-2 outline-none transition-all resize-none h-20 ${
                                isVoting ? 'border-slate-100 focus:border-indigo-400 focus:bg-white' : 'border-transparent'
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between items-end mb-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Live Votes
                              </span>
                              <span className="text-sm font-black text-indigo-600">
                                {idx === 1 ? '65%' : idx === 0 ? '20%' : idx === 2 ? '10%' : '5%'}
                              </span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: idx === 1 ? '65%' : idx === 0 ? '20%' : idx === 2 ? '10%' : '5%' }}
                                className={`h-full rounded-full ${isSelected ? 'bg-amber-400' : isActual ? 'bg-emerald-400' : 'bg-indigo-400'}`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Voting Phase Actions */}
            {isVoting && gameMode === 'local' && (
              <div className="mt-10 pt-10 border-t-2 border-slate-50">
                <button
                  onClick={() => {
                    // Determine selectedGuess based on highest vote count
                    const counts = {
                      A: getVoteCount('A'),
                      B: getVoteCount('B'),
                      C: getVoteCount('C'),
                      D: getVoteCount('D')
                    }
                    const maxKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
                    const maxVal = counts[maxKey]
                    
                    if (maxVal === 0) {
                      alert("Masukkan minimal satu nama siswa untuk menebak!")
                      return
                    }

                    const optIndex = ['A', 'B', 'C', 'D'].indexOf(maxKey)
                    setSelectedGuess(currentTrivia.options[optIndex])
                  }}
                  className="w-full py-6 bg-brand-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl shadow-brand-900/20 flex items-center justify-center gap-4 group"
                >
                  Selesai Voting & Tanya {currentTrivia.targetName}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Result Visualization */}
            {isResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 pt-10 border-t-2 border-slate-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-brand-900 p-8 rounded-[2.5rem] text-white text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Trophy className="w-24 h-24" />
                    </div>
                    <p className="text-xs font-medium text-brand-300 uppercase tracking-widest mb-2">
                      Statistik Kelas
                    </p>
                    <p className="text-5xl font-black mb-4">
                      {actualAnswer === selectedGuess ? "80%" : "25%"}
                    </p>
                    <p className="text-lg font-bold text-brand-100 italic leading-tight">
                      {actualAnswer === selectedGuess 
                        ? "Wow! Kalian beneran kompak kenal sama teman sendiri!" 
                        : `Ternyata masih banyak yang harus dipelajari tentang ${currentTrivia.targetName}...`}
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-8 rounded-[2.5rem] text-left border-2 border-indigo-100">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">
                      Detail Jawaban {gameMode === 'local' ? '(Local)' : '(Online)'}
                    </p>
                    <div className="space-y-3">
                      {['A', 'B', 'C', 'D'].map(key => {
                        const count = getVoteCount(key)
                        const isOptActual = currentTrivia.options[['A', 'B', 'C', 'D'].indexOf(key)] === actualAnswer
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                                isOptActual ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'
                              }`}>
                                {key}
                              </span>
                              <span className={`text-sm font-bold ${isOptActual ? 'text-emerald-700' : 'text-slate-500'}`}>
                                {count} Siswa
                              </span>
                            </div>
                            {isOptActual && (
                              <span className="text-[10px] font-black text-emerald-600 uppercase">Benar!</span>
                            )}
                          </div>
                        )
                      })}
                      <div className="pt-4 mt-4 border-t border-indigo-200">
                        <p className="text-xs font-bold text-indigo-600">Total Partisipan: {totalLocalVotes || 10} Siswa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center pt-8">
            {isResult && (
              <button 
                onClick={() => {
                  setSelectedGuess(null)
                  setActualAnswer(null)
                  setLocalVotes({ A: '', B: '', C: '', D: '' })
                  if (currentIndex < triviaData.length - 1) {
                    setCurrentIndex(currentIndex + 1)
                  } else {
                    setStep('result')
                  }
                }}
                className="px-12 py-6 bg-brand-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl flex items-center gap-4 group"
              >
                {currentIndex < triviaData.length - 1 ? (
                  <>Lanjut ke Teman Berikutnya <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                ) : 'Lihat Rekap Akhir'}
              </button>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const renderResult = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] border-2 border-brand-100 shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-brand-600" />
          </div>
          <h3 className="text-3xl font-black text-brand-900 mb-4">Sesi Selesai!</h3>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">
            Kalian luar biasa! Ternyata banyak beban pikiran yang kita pikul bersama. Ingat, kamu tidak sendirian di kelas ini.
          </p>

          <div className="space-y-4 mb-10">
            {stressData.slice(0, 3).map((item, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                <p className="text-slate-600 font-bold italic text-sm">"{item.stress.substring(0, 40)}..."</p>
                <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-black text-brand-600 border border-brand-100 uppercase">Relatable</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              setStep('menu')
              setActiveGame(null)
              setGameMode(null)
              setParticipants([])
              setStressData([])
              setCurrentIndex(0)
            }}
            className="w-full py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-800 transition-all shadow-xl"
          >
            Main Lagi
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col lg:px-10 pb-10">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center gap-5 lg:pt-12">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={activeGame ? () => setActiveGame(null) : onBack} 
          className="p-3 bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-brand-900 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </motion.button>
        <div>
          <h2 className="text-xl lg:text-3xl font-black text-brand-900 tracking-tight">
            {activeGame ? schoolGames.find(g => g.id === activeGame).title : 'School Games'}
          </h2>
          <p className="text-slate-400 font-bold text-xs lg:text-lg mt-0.5">
            {activeGame ? 'Bersenang-senang bersama teman sekelas' : 'Permainan interaktif untuk kesehatan mental sekolah'}
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-indigo-900 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden group shadow-xl">
                <div className="relative z-10 lg:max-w-4xl">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Trophy className="w-8 h-8 text-indigo-300" />
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-black mb-4">Class Synergy Games</h3>
                  <p className="text-indigo-100 text-sm lg:text-xl font-medium leading-relaxed max-w-2xl opacity-90">
                    Pererat hubungan pertemanan di kelas dengan permainan yang didesain khusus untuk siswa.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {schoolGames.map((game, idx) => (
                  <motion.button
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => handleStartGame(game.id)}
                    className="p-6 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all text-left group"
                  >
                    <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <h4 className="text-xl font-black text-brand-900 mb-2">{game.title}</h4>
                    <p className="text-slate-500 font-bold leading-relaxed text-sm">{game.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'mode-select' && (
            <motion.div
              key="mode-select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-black text-brand-900 mb-4">Pilih Mode Permainan</h3>
                <p className="text-slate-500 font-bold">Bagaimana kalian ingin bermain hari ini?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.button 
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleSelectMode('local')}
                  className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-100 hover:border-brand-500 shadow-xl text-center group transition-all"
                >
                  <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-100 transition-colors">
                    <UserPlus className="w-10 h-10 text-brand-600" />
                  </div>
                  <h4 className="text-2xl font-black text-brand-900 mb-4">Local Games</h4>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    Satu device untuk semua. Masukkan nama murid dan mainkan bergantian di depan kelas.
                  </p>
                </motion.button>

                <motion.button 
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleSelectMode('online')}
                  className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-100 hover:border-indigo-500 shadow-xl text-center group transition-all"
                >
                  <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-indigo-100 transition-colors">
                    <Smartphone className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h4 className="text-2xl font-black text-brand-900 mb-4">Online Games</h4>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    Setiap murid menggunakan HP masing-masing. Scan QR untuk join ke room yang sama.
                  </p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'setup' && renderSetup()}
          {step === 'input-data' && renderInputData()}
          {step === 'playing' && renderPlaying()}
          {step === 'result' && renderResult()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SchoolGames
