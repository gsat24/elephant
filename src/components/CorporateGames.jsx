import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateGameContent } from '../lib/gemini'
import { 
  ChevronLeft, 
  Users, 
  Coffee, 
  Lightbulb, 
  RotateCcw,
  Target,
  Rocket,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react'

const corpGames = [
  {
    id: 'ice-breaker',
    title: 'Ice Breaking',
    icon: <Coffee className="w-6 h-6 text-brand-600" />,
    desc: 'Cairkan suasana meeting pagi dengan pertanyaan ringan dan seru.',
    color: 'bg-brand-50'
  },
  {
    id: 'team-trivia',
    title: 'Team Trivia',
    icon: <Users className="w-6 h-6 text-coral-500" />,
    desc: 'Seberapa kenal kamu dengan rekan kerjamu? Uji pengetahuan tim di sini.',
    color: 'bg-coral-50'
  },
  {
    id: 'culture-quest',
    title: 'Culture Quest',
    icon: <ShieldCheck className="w-6 h-6 text-sage-500" />,
    desc: 'Pahami nilai-nilai perusahaan (Company Values) lewat kuis interaktif.',
    color: 'bg-sage-50'
  },
  {
    id: 'brainstorm-blitz',
    title: 'Brainstorm Blitz',
    icon: <Lightbulb className="w-6 h-6 text-brand-500" />,
    desc: 'Latihan berpikir kreatif untuk mencari solusi masalah kantor.',
    color: 'bg-brand-50'
  }
]

const iceBreakerQuestions = [
  "Jika tim kita adalah sebuah band, siapa yang akan jadi vokalis utamanya?",
  "Apa satu hal yang paling kamu sukai dari bekerja di perusahaan ini?",
  "Jika kita punya anggaran tak terbatas untuk kantor, apa satu benda yang ingin kamu beli?",
  "Apa kopi atau minuman andalanmu saat dikejar deadline?",
  "Sebutkan satu 'hidden talent' yang rekan kerjamu mungkin belum tahu!",
  "Jika kamu bisa bertukar pekerjaan dengan siapa pun di tim ini selama satu hari, siapa itu?",
  "Apa aplikasi yang paling sering kamu buka selain Slack/Email saat kerja?",
  "Sebutkan satu lagu yang menggambarkan mood kerjamu hari ini!",
  "Jika kantor kita pindah ke Mars, apa satu hal dari Bumi yang paling kamu rindukan?",
  "Apa benda paling aneh yang ada di meja kerjamu saat ini?",
  "Jika kita semua terdampar di pulau terpencil, siapa yang paling mungkin jadi pemimpin tim?",
  "Apa meme terakhir yang kamu kirim ke grup chat kantor?",
  "Jika kamu bisa menghapus satu aturan kantor tanpa ada konsekuensi, apa itu?",
  "Siapa orang di tim ini yang paling cocok jadi pembawa acara talk show?",
  "Apa kebiasaan kerja paling produktif yang baru kamu temukan akhir-akhir ini?",
  "Jika tim kita menang undian 10 miliar, apa hal pertama yang harus kita lakukan bersama?",
  "Apa satu skill 'non-kerja' yang ingin kamu pelajari dari salah satu rekan tim?",
  "Jika kamu harus menjelaskan pekerjaanmu ke anak umur 5 tahun, apa yang kamu katakan?",
  "Apa pencapaian terkecil minggu ini yang membuatmu merasa bangga?",
  "Jika kita punya maskot tim, binatang apa yang paling cocok mewakili kita?"
]

const teamTriviaQuestions = [
  {
    q: "Siapa rekan kerja yang paling sering datang paling pagi di kantor?",
    options: ["Si Tukang Kopi", "Si Deadline Fighter", "Si Morning Person", "Si Rajin Ibadah"]
  },
  {
    q: "Apa camilan favorit yang paling cepat habis di pantry?",
    options: ["Gorengan", "Keripik Pedas", "Biskuit Sehat", "Buah Potong"]
  },
  {
    q: "Siapa yang paling sering bilang 'Izin ke toilet bentar' tapi baliknya lama?",
    options: ["Si Perokok", "Si Pengamat Pantry", "Si Tukang Ngobrol", "Si Misterius"]
  },
  {
    q: "Apa kata-kata 'sakral' yang paling sering muncul di meeting kita?",
    options: ["Synergy", "Next Steps", "ASAP", "Circle Back"]
  },
  {
    q: "Siapa yang background Zoom-nya selalu paling niat atau unik?",
    options: ["Si Traveller", "Si Minimalist", "Si Pecinta Anime", "Si Gamers"]
  },
  {
    q: "Siapa yang paling sering lupa unmute saat lagi ngomong di meeting online?",
    options: ["Si Antusias", "Si Senior", "Si Pelupa", "Semua Orang!"]
  },
  {
    q: "Siapa yang paling mungkin membalas chat Slack/WA dalam hitungan detik?",
    options: ["Si Always Online", "Si Fast Response", "Si Bot Humanoid", "Si Manager"]
  },
  {
    q: "Apa bunyi paling khas yang sering terdengar di ruangan tim kita?",
    options: ["Suara Keyboard Mekanik", "Tawa Menggelegar", "Bunyi Notifikasi", "Hening Total"]
  },
  {
    q: "Siapa yang paling sering bawa bekal makan siang paling niat?",
    options: ["Si Healthy Life", "Si Istri/Suami Idaman", "Si Hemat", "Si Chef Dadakan"]
  },
  {
    q: "Apa tradisi unik tim kita saat ada yang ulang tahun?",
    options: ["Traktir Makan", "Surprise Gagal", "Patungan Kado", "Cuma Ucapan di Grup"]
  },
  {
    q: "Siapa yang meja kerjanya paling rapi (atau paling berantakan)?",
    options: ["Si Minimalist", "Si Creative Chaos", "Si Tukang Koleksi", "Si Invisible Desk"]
  },
  {
    q: "Apa 'internal joke' yang cuma tim kita yang paham?",
    options: ["Typo Legendaris", "Insiden Meeting", "Client Aneh", "Misteri Pantry"]
  },
  {
    q: "Siapa yang paling jago bikin slide presentasi estetik?",
    options: ["Si Designer Wannabe", "Si Canva Master", "Si Copy-Paste", "Si Putih Polos"]
  },
  {
    q: "Berapa kali biasanya meeting kita molor dari jadwal?",
    options: ["Selalu On Time", "5-10 Menit", "Sampai Lupa Waktu", "Meeting di dalam Meeting"]
  },
  {
    q: "Siapa yang paling sering ngajak 'Ngopi yuk' sore-sore?",
    options: ["Si Coffee Addict", "Si Butuh Break", "Si Social Butterfly", "Si Pengantuk"]
  }
]

const cultureQuestContent = [
  {
    value: "Integrity",
    scenario: "Kamu menemukan kesalahan kecil di laporan temanmu yang sudah dikirim ke bos. Apa yang kamu lakukan?",
    options: [
      { text: "Diam saja agar dia tidak malu.", correct: false },
      { text: "Beri tahu dia secara privat agar bisa diperbaiki segera.", correct: true },
      { text: "Lapor ke bos agar performa tim terjaga.", correct: false }
    ],
    feedback: "Great Job! Menjaga integritas adalah kunci budaya kerja kita. 🚀"
  },
  {
    value: "Collaboration",
    scenario: "Ada anggota tim baru yang terlihat bingung tapi tidak berani bertanya. Sikapmu?",
    options: [
      { text: "Biarkan saja, dia harus belajar mandiri.", correct: false },
      { text: "Tawarkan bantuan dan ajak dia makan siang bersama.", correct: true },
      { text: "Beri dia tugas lebih banyak agar cepat terbiasa.", correct: false }
    ],
    feedback: "Tepat! Kolaborasi dimulai dari kepedulian antar rekan tim. 🤝"
  },
  {
    value: "Innovation",
    scenario: "Kamu punya ide gila tapi takut ditertawakan oleh tim yang konservatif.",
    options: [
      { text: "Simpan ide itu untuk diri sendiri.", correct: false },
      { text: "Sampaikan ide tersebut dengan data pendukung di sesi brainstorming.", correct: true },
      { text: "Langsung eksekusi ide itu tanpa izin siapa pun.", correct: false }
    ],
    feedback: "Keren! Inovasi butuh keberanian untuk menyuarakan ide baru. 💡"
  }
]

const brainstormBlitzScenarios = [
  {
    problem: "Deadline proyek sisa 2 hari, tapi anggota tim utama tiba-tiba sakit. Apa solusi tercepatmu?",
    prompts: [
      "Fokus ke fitur MVP (Minimum Viable Product)",
      "Minta bantuan tim lain (Resource Sharing)",
      "Negosiasi perpanjangan waktu dengan alasan jujur"
    ]
  },
  {
    problem: "Meeting mingguan terasa membosankan dan tidak produktif. Bagaimana cara memperbaikinya?",
    prompts: [
      "Terapkan aturan 'No Laptop/HP' selama meeting",
      "Gunakan metode 'Standing Meeting' agar singkat",
      "Ganti moderator setiap minggu agar ada variasi"
    ]
  },
  {
    problem: "Komunikasi antar departemen sering macet (Silo Mentality). Apa idemu untuk mencairkannya?",
    prompts: [
      "Buat sesi 'Cross-Department Coffee Talk'",
      "Gunakan tool manajemen proyek yang transparan",
      "Buat reward untuk kolaborasi antar tim"
    ]
  }
]

const CorporateGames = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  
  // AI States
  const [loadingAI, setLoadingAI] = useState(false)
  const [aiIceBreakers, setAiIceBreakers] = useState([])
  const [aiTeamTrivia, setAiTeamTrivia] = useState([])
  const [aiCultureQuest, setAiCultureQuest] = useState([])
  const [aiBrainstorm, setAiBrainstorm] = useState([])

  const currentIceBreakers = [...iceBreakerQuestions, ...aiIceBreakers]
  const currentTeamTrivia = [...teamTriviaQuestions, ...aiTeamTrivia]
  const currentCultureQuest = [...cultureQuestContent, ...aiCultureQuest]
  const currentBrainstorm = [...brainstormBlitzScenarios, ...aiBrainstorm]

  const handleGenerateAI = async () => {
    if (!activeGame) return
    setLoadingAI(true)
    try {
      let result
      switch (activeGame) {
        case 'ice-breaker':
          result = await generateGameContent('Ice Breaker')
          if (result) setAiIceBreakers(prev => [...prev, ...result])
          break
        case 'team-trivia':
          result = await generateGameContent('Team Trivia', 'corporate office life')
          if (result) setAiTeamTrivia(prev => [...prev, ...result])
          break
        case 'culture-quest':
          result = await generateGameContent('Culture Quest', 'company values')
          if (result) setAiCultureQuest(prev => [...prev, ...result])
          break
        case 'brainstorm-blitz':
          result = await generateGameContent('Brainstorm Blitz')
          if (result) setAiBrainstorm(prev => [...prev, ...result])
          break
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingAI(false)
    }
  }

  const nextItem = (max) => {
    setCurrentIndex((prev) => (prev + 1) % max)
  }

  const renderGameContent = () => {
    switch (activeGame) {
      case 'ice-breaker':
        return (
          <div className="space-y-6 lg:space-y-8 text-center max-w-4xl mx-auto py-6 lg:py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[2rem] border-2 lg:border-4 border-brand-50 shadow-xl min-h-[150px] lg:min-h-[200px] flex flex-col justify-center text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-[10px] lg:text-xs font-black text-brand-600 uppercase tracking-[0.4em] mb-3 lg:mb-4 block">Ice Breaker Challenge</span>
                <h3 className="text-lg lg:text-xl font-black text-brand-900 leading-tight lg:leading-snug max-w-4xl mx-auto px-4">
                  "{currentIceBreakers[currentIndex]}"
                </h3>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-50 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000 opacity-60"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-center px-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => nextItem(currentIceBreakers.length)}
                className="bg-brand-900 text-white px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 shadow-xl shadow-brand-900/20 w-full md:w-auto min-w-[180px] lg:min-w-[240px]"
              >
                <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6" /> Pertanyaan Lain
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="bg-white text-brand-900 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 border-2 lg:border-4 border-brand-100 shadow-lg disabled:opacity-50 hover:bg-brand-50 transition-all w-full md:w-auto min-w-[180px] lg:min-w-[240px]"
              >
                {loadingAI ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />}
                Tanya AI (Update)
              </motion.button>
            </div>
          </div>
        )
      case 'team-trivia':
        return (
          <div className="space-y-6 lg:space-y-8 max-w-6xl mx-auto py-6 lg:py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[2rem] border-2 lg:border-4 border-coral-50 shadow-xl min-h-[150px] lg:min-h-[200px] flex flex-col justify-center text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-[10px] lg:text-xs font-black text-coral-600 uppercase tracking-[0.4em] mb-3 lg:mb-4 block">Team Trivia Challenge</span>
                <h3 className="text-lg lg:text-xl font-black text-brand-900 leading-tight lg:leading-snug max-w-4xl mx-auto px-4">
                  "{currentTeamTrivia[currentIndex]?.q}"
                </h3>
              </div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-coral-50 rounded-full blur-[80px] opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-coral-50 rounded-full blur-[80px] opacity-60"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 px-4">
              {currentTeamTrivia[currentIndex]?.options.map((opt, i) => (
                <motion.button 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => nextItem(currentTeamTrivia.length)}
                  className="p-5 lg:p-8 bg-white rounded-2xl lg:rounded-3xl border border-slate-100 font-bold text-slate-600 hover:border-coral-500 hover:bg-coral-50/30 hover:text-coral-600 shadow-lg transition-all text-left group flex justify-between items-center"
                >
                  <span className="text-sm lg:text-lg">{opt}</span>
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 lg:border-4 border-slate-100 group-hover:border-coral-200 flex items-center justify-center bg-slate-50 group-hover:bg-white transition-colors">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-coral-500 scale-0 group-hover:scale-100 transition-transform shadow-lg shadow-coral-500/50" />
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateAI}
              disabled={loadingAI}
              className="bg-coral-50 text-coral-900 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 border-2 lg:border-4 border-coral-100 shadow-lg disabled:opacity-50 hover:bg-coral-100 transition-all w-full md:w-max md:mx-auto"
            >
              {loadingAI ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-coral-600" />}
              Update Kuis (AI)
            </motion.button>
          </div>
        )
      case 'culture-quest':
        return (
          <div className="space-y-6 lg:space-y-8 max-w-6xl mx-auto py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch px-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-sage-900 p-6 lg:p-10 rounded-3xl lg:rounded-[2rem] text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px] lg:min-h-[350px]"
              >
                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ShieldCheck className="w-12 h-12 lg:w-16 lg:h-16 text-sage-300 mx-auto mb-4 lg:mb-6" />
                  </motion.div>
                  <span className="text-[10px] lg:text-xs font-black text-sage-400 uppercase tracking-[0.4em] block mb-3 lg:mb-4">Culture Quest</span>
                  <h3 className="text-xl lg:text-2xl font-black mb-4 lg:mb-6 uppercase tracking-widest">{currentCultureQuest[currentIndex]?.value}</h3>
                  <p className="text-base lg:text-lg font-medium text-sage-100 leading-relaxed italic px-4">
                    "{currentCultureQuest[currentIndex]?.scenario}"
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              </motion.div>

              <div className="flex flex-col justify-center space-y-4 lg:space-y-5">
                <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.4em] ml-4 mb-1">Pilih Respon Terbaik:</h4>
                {currentCultureQuest[currentIndex]?.options.map((opt, i) => (
                  <motion.button 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setShowResult(true); setTimeout(() => { setShowResult(false); nextItem(currentCultureQuest.length); }, 2000); }}
                    className="w-full p-4 lg:p-6 bg-white rounded-2xl lg:rounded-3xl border-2 border-slate-50 text-left font-bold text-slate-600 hover:border-sage-500 hover:bg-sage-50/30 shadow-lg transition-all flex items-center gap-5 group"
                  >
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-sage-100 font-black text-lg text-slate-400 group-hover:text-sage-600 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="flex-1 text-sm lg:text-base">{opt.text}</span>
                  </motion.button>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateAI}
                  disabled={loadingAI}
                  className="w-full bg-sage-50 text-sage-900 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 border-2 lg:border-4 border-sage-100 shadow-lg disabled:opacity-50 hover:bg-sage-100 transition-all mt-4 lg:mt-6"
                >
                  {loadingAI ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />}
                  Generate Skenario AI
                </motion.button>
              </div>
            </div>
            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed bottom-12 right-12 w-[22rem] bg-sage-600 text-white p-6 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] text-center z-50 border-8 border-white/20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-10 h-10 text-white mx-auto mb-4" />
                  </motion.div>
                  <p className="text-xl font-black leading-tight">{currentCultureQuest[currentIndex]?.feedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      case 'brainstorm-blitz':
        return (
          <div className="space-y-6 lg:space-y-8 max-w-6xl mx-auto py-6 lg:py-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[2rem] border-2 lg:border-4 border-brand-50 shadow-xl relative overflow-hidden px-4"
            >
              <div className="flex items-center gap-5 lg:gap-8 mb-6 lg:mb-8 relative z-10">
                <div className="bg-brand-50 p-4 lg:p-5 rounded-2xl lg:rounded-[1.5rem]">
                  <Lightbulb className="w-8 h-8 lg:w-10 lg:h-10 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-black text-brand-900">Brainstorm Blitz</h3>
                  <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Problem Solving Challenge</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 p-6 lg:p-8 rounded-3xl lg:rounded-[2rem] border-2 lg:border-4 border-slate-100 h-full flex items-center justify-center text-center shadow-inner min-h-[150px] lg:min-h-[180px]"
                  >
                    <p className="text-lg lg:text-xl font-black text-brand-900 leading-tight px-4">
                      "{currentBrainstorm[currentIndex]?.problem}"
                    </p>
                  </motion.div>
                </div>
                
                <div className="space-y-3 lg:space-y-4 flex flex-col justify-center">
                  <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.4em] ml-4 mb-1">Mulai Diskusi dengan:</p>
                  {currentBrainstorm[currentIndex]?.prompts.map((prompt, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-4 lg:gap-5 p-4 lg:p-5 bg-brand-50/50 rounded-2xl lg:rounded-3xl border-2 lg:border-4 border-brand-100/30 hover:bg-brand-50 shadow-lg transition-all group cursor-default"
                    >
                      <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-brand-400 group-hover:scale-125 transition-transform shadow-lg shadow-brand-400/40" />
                      <p className="text-sm lg:text-base font-bold text-brand-800">{prompt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-50 rounded-full blur-[80px] opacity-40"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-center px-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => nextItem(currentBrainstorm.length)}
                className="bg-brand-900 text-white px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 shadow-xl shadow-brand-900/20 w-full md:w-auto min-w-[180px] lg:min-w-[240px]"
              >
                <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6" /> Skenario Lain
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="bg-white text-brand-900 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black flex items-center justify-center gap-3 border-2 lg:border-4 border-brand-100 shadow-lg disabled:opacity-50 hover:bg-brand-50 transition-all w-full md:w-auto min-w-[180px] lg:min-w-[240px]"
              >
                {loadingAI ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-brand-600" />}
                Update AI Skenario
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGame(null)}
                className="bg-slate-100 text-slate-500 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-black hover:bg-slate-200 transition-all w-full md:w-auto min-w-[120px]"
              >
                Selesai
              </motion.button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col lg:px-10">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center gap-5 lg:pt-12">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={activeGame ? () => { setActiveGame(null); setShowResult(false); } : onBack} 
          className="p-3 bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-brand-900 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </motion.button>
        <div>
          <h2 className="text-xl lg:text-3xl font-black text-brand-900 tracking-tight">
            {activeGame ? corpGames.find(g => g.id === activeGame).title : 'Corporate Games'}
          </h2>
          <p className="text-slate-400 font-bold text-xs lg:text-lg mt-0.5">
            {activeGame ? 'Selesaikan tantangan tim bersama AI' : 'Bangun budaya kerja yang positif'}
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 lg:space-y-10"
            >
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-brand-900 rounded-3xl lg:rounded-[2rem] p-6 lg:p-10 text-white relative overflow-hidden group shadow-xl shadow-brand-900/20"
              >
                <div className="relative z-10 lg:max-w-4xl">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <Target className="w-10 h-10 lg:w-14 lg:h-14 mb-4 lg:mb-6 text-brand-300" />
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-black mb-3 lg:mb-4 leading-tight">Tingkatkan Sinergi Tim</h3>
                  <p className="text-brand-200 text-sm lg:text-lg font-medium leading-relaxed max-w-2xl">
                    Koleksi aktivitas interaktif untuk mencairkan suasana dan mempererat hubungan profesional.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {corpGames.map((game, idx) => (
                  <motion.button
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => {
                      setActiveGame(game.id)
                      setCurrentIndex(0)
                    }}
                    className="p-5 lg:p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all text-left group"
                  >
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${game.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(game.icon, { className: "w-5 h-5 lg:w-6 lg:h-6 text-brand-600" })}
                    </div>
                    <h4 className="text-lg lg:text-xl font-black text-brand-900 mb-1.5">{game.title}</h4>
                    <p className="text-slate-500 font-bold leading-relaxed text-xs lg:text-sm">{game.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              {renderGameContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CorporateGames