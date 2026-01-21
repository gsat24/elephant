import React, { useState } from 'react'
import { generateGameContent } from '../lib/gemini'
import { 
  ChevronLeft, 
  ChevronRight, 
  Gamepad2, 
  Dices, 
  Sparkles, 
  RotateCcw,
  HelpCircle,
  Puzzle,
  MessageCircle,
  Users2,
  Target,
  Trophy,
  Coffee,
  Zap,
  Loader2
} from 'lucide-react'

const games = [
  {
    id: 'wyr',
    title: 'Would You Rather',
    icon: <HelpCircle className="w-6 h-6 text-brand-600" />,
    desc: 'Pilih di antara dua pilihan sulit dan lihat jawaban pasanganmu!',
    color: 'bg-brand-50'
  },
  {
    id: 'tod',
    title: 'Truth or Dare',
    icon: <Dices className="w-6 h-6 text-coral-500" />,
    desc: 'Tantangan seru atau pengakuan jujur untuk mempererat hubungan.',
    color: 'bg-coral-50'
  },
  {
    id: 'pre-conflict',
    title: 'Pre-Conflict Quiz',
    icon: <Puzzle className="w-6 h-6 text-brand-500" />,
    desc: 'Kuis Love Language & Style Komunikasi dengan analisis AI.',
    color: 'bg-brand-50'
  },
  {
    id: 'deep-talk',
    title: 'Daily Deep Talk',
    icon: <MessageCircle className="w-6 h-6 text-sage-500" />,
    desc: 'Satu kartu digital setiap hari untuk kedekatan emosional.',
    color: 'bg-sage-50'
  },
  {
    id: 'role-swap',
    title: 'Role Swap Game',
    icon: <Users2 className="w-6 h-6 text-coral-400" />,
    desc: 'Tukar peran untuk memahami perspektif pasanganmu.',
    color: 'bg-coral-50'
  },
  {
    id: 'missions',
    title: 'Mission: Impossible',
    icon: <Target className="w-6 h-6 text-brand-600" />,
    desc: 'Misi rahasia harian untuk menambah bumbu romantis.',
    color: 'bg-brand-50'
  }
]

const wyrQuestions = [
  "Would you rather selalu tahu saat pasanganmu berbohong ATAU pasanganmu selalu tahu saat kamu berbohong?",
  "Would you rather tinggal di kota yang sibuk selamanya ATAU di desa terpencil selamanya?",
  "Would you rather liburan mewah setahun sekali ATAU liburan sederhana setiap bulan?",
  "Would you rather punya kemampuan membaca pikiran pasangan ATAU kemampuan untuk tidak pernah bertengkar?",
  "Would you rather pasanganmu bisa masak sangat enak tapi berantakan ATAU masakannya biasa saja tapi dapur selalu bersih?",
  "Would you rather kita punya 10 anak ATAU tidak punya anak sama sekali?",
  "Would you rather pasanganmu pelupa soal tanggal penting ATAU pelupa soal barang pribadinya?",
  "Would you rather selalu pakai baju kembaran setiap keluar rumah ATAU tidak boleh gandengan tangan di depan umum?",
  "Would you rather pasanganmu jadi superhero yang sibuk menyelamatkan dunia ATAU orang biasa yang selalu ada di rumah?",
  "Would you rather kita tinggal di rumah hantu yang mewah ATAU di apartemen sempit yang aman?",
  "Would you rather pasanganmu menangis saat nonton film sedih ATAU tertawa di saat yang tidak tepat?",
  "Would you rather pasanganmu mendengkur keras saat tidur ATAU bicara mengigau setiap malam?"
]

const todContent = {
  truth: [
    "Apa hal pertama yang membuatmu jatuh cinta padaku?",
    "Apa kebiasaan burukku yang paling sulit kamu toleransi?",
    "Jika kamu bisa mengubah satu hal dari hubungan kita, apa itu?",
    "Apa ketakutan terbesarmu dalam hubungan ini?",
    "Apa kesan pertamamu saat pertama kali melihatku?",
    "Pernahkah kamu pura-pura suka dengan hadiah dariku padahal sebenarnya tidak?",
    "Apa rahasia kecilmu yang belum pernah kamu ceritakan karena takut aku marah?",
    "Siapa orang yang paling membuatmu cemburu jika dekat denganku?",
    "Apa hal yang paling memalukan yang pernah kamu lakukan di depanku?",
    "Jika kita bertengkar, siapa yang biasanya lebih dulu ingin minta maaf di dalam hati?",
    "Apa bagian tubuhku yang paling kamu sukai?",
    "Pernahkah kamu memimpikan orang lain saat kita sudah jadian?"
  ],
  dare: [
    "Tunjukkan chat terakhir yang kamu kirim ke temanmu tentang aku.",
    "Lakukan impersonasi gaya bicaraku selama 1 menit ke depan.",
    "Berikan pujian paling tulus yang belum pernah kamu katakan sebelumnya.",
    "Tatapan mata denganku selama 30 detik tanpa tertawa.",
    "Posting foto jelekku di story (tapi hapus setelah 1 menit!).",
    "Gendong aku selama 15 detik.",
    "Nyanyikan lagu cinta favoritmu untukku dengan gaya penyanyi rock.",
    "Beri aku pijatan di bahu selama 2 menit.",
    "Tukarkan handphone kalian selama 3 menit tanpa boleh protes.",
    "Ulangi kata-kata 'Aku sayang kamu' dengan 5 ekspresi wajah yang berbeda.",
    "Biarkan aku merias wajahmu selama 3 menit (pakai lipstik saja!).",
    "Ceritakan satu lelucon paling garing yang kamu tahu."
  ]
}

const preConflictQuestions = [
  {
    q: "Bagaimana perasaanmu jika pasanganmu membatalkan rencana kencan karena pekerjaan?",
    options: [
      { text: "Sedih karena saya butuh waktu bersama (Quality Time)", type: "QT" },
      { text: "Marah karena dia tidak menghargai waktu saya (Communication)", type: "CM" },
      { text: "Biasa saja asal dia membantu pekerjaan rumah nanti (Acts of Service)", type: "AOS" }
    ]
  },
  {
    q: "Apa yang paling membuatmu merasa dicintai?",
    options: [
      { text: "Diberikan hadiah kecil tanpa alasan (Gifts)", type: "GFT" },
      { text: "Dipuji dan diberikan kata-kata penyemangat (Words of Affirmation)", type: "WOA" },
      { text: "Pelukan hangat saat pulang kerja (Physical Touch)", type: "PT" }
    ]
  },
  {
    q: "Saat bertengkar, apa reaksi refleksmu?",
    options: [
      { text: "Langsung bicara panjang lebar (Communicator)", type: "CM" },
      { text: "Diam dan butuh waktu sendiri (Withdrawer)", type: "WD" },
      { text: "Menangis karena merasa tidak dipahami (Emotional)", type: "EM" }
    ]
  },
  {
    q: "Jika pasanganmu sedang lelah, apa yang biasanya kamu lakukan?",
    options: [
      { text: "Memberinya ruang untuk istirahat (Respect)", type: "RES" },
      { text: "Menyiapkan makanan favoritnya (Acts of Service)", type: "AOS" },
      { text: "Mengajaknya mengobrol agar dia lupa lelahnya (Distraction)", type: "DIS" }
    ]
  }
]

const deepTalkCards = [
  "Apa satu ketakutanmu yang belum pernah kamu ceritakan ke aku?",
  "Kalau kita punya uang tak terbatas besok, kita mau ke mana?",
  "Apa memori masa kecilmu yang paling membentuk dirimu sekarang?",
  "Kapan terakhir kali kamu merasa sangat bangga padaku?",
  "Apa satu hal yang ingin kamu lakukan bersama saat kita sudah tua nanti?",
  "Jika hari ini adalah hari terakhir kita bisa bicara, apa pesan terpentingmu?",
  "Apa pelajaran terbesar yang kamu ambil dari kegagalan hubungan masa lalumu?",
  "Apa arti 'kebahagiaan' bagimu saat ini?",
  "Bagaimana caraku bisa menjadi pasangan yang lebih baik untukmu?",
  "Apa satu mimpi yang sempat kamu kubur tapi ingin kamu wujudkan lagi?",
  "Siapa sosok yang paling menginspirasimu dalam hal cinta?",
  "Apa hal yang paling kamu syukuri dari hidupmu hari ini?"
]

const roleSwapScenarios = [
  {
    scenario: "Kunci mobil hilang saat kita sudah telat ke acara penting.",
    question: "Bagaimana kira-kira pasanganmu akan bereaksi?"
  },
  {
    scenario: "Salah satu dari kita tidak sengaja menumpahkan kopi di dokumen penting.",
    question: "Apa kata pertama yang akan keluar dari mulut pasanganmu?"
  },
  {
    scenario: "Ada diskon besar-besaran untuk barang yang sebenarnya tidak kita butuhkan.",
    question: "Siapa yang akan lebih dulu bilang 'Beli yuk!'?"
  },
  {
    scenario: "Pasanganmu lupa membawa dompet saat kita sudah di depan kasir restoran.",
    question: "Apa ekspresi wajah yang akan dia tunjukkan?"
  },
  {
    scenario: "Kita sedang nonton film horor dan ada adegan jumpscare.",
    question: "Siapa yang akan teriak paling kencang?"
  },
  {
    scenario: "Ada tetangga yang sangat berisik di malam hari.",
    question: "Siapa yang akan berani menegur duluan?"
  }
]

const secretMissions = [
  "Puji pasanganmu tentang hal kecil yang biasanya dia anggap sepele hari ini.",
  "Buatkan dia teh atau kopi favoritnya tanpa ditanya.",
  "Kirimkan pesan singkat 'Aku sayang kamu' di tengah jam sibuknya.",
  "Rapikan salah satu sudut rumah yang biasanya dia kerjakan.",
  "Berikan pelukan tiba-tiba dari belakang saat dia sedang sibuk.",
  "Masak atau belikan makanan favoritnya untuk makan malam nanti.",
  "Sembunyikan pesan cinta kecil di dalam tas atau sakunya.",
  "Jangan mengeluh tentang satu hal pun seharian ini di depannya.",
  "Tanyakan 'Bagaimana perasaanmu hari ini?' dan dengarkan tanpa memotong.",
  "Berikan pijatan kaki ringan sebelum tidur.",
  "Kirimkan satu meme lucu yang sangat relate dengan hubungan kita.",
  "Ucapkan terima kasih atas hal yang dia lakukan minggu ini."
]

const CoupleGames = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [todMode, setTodMode] = useState(null) // 'truth' or 'dare'
  const [quizResults, setQuizResults] = useState([])
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [missionAccepted, setMissionAccepted] = useState(false)
  
  // AI States
  const [loadingAI, setLoadingAI] = useState(false)
  const [aiWyr, setAiWyr] = useState([])
  const [aiTod, setAiTod] = useState({ truth: [], dare: [] })
  const [aiDeepTalk, setAiDeepTalk] = useState([])
  const [aiSecretMissions, setAiSecretMissions] = useState([])
  const [aiRoleSwap, setAiRoleSwap] = useState([])

  const currentWyr = [...wyrQuestions, ...aiWyr]
  const currentTod = {
    truth: [...todContent.truth, ...aiTod.truth],
    dare: [...todContent.dare, ...aiTod.dare]
  }
  const currentDeepTalk = [...deepTalkCards, ...aiDeepTalk]
  const currentSecretMissions = [...secretMissions, ...aiSecretMissions]
  const currentRoleSwap = [...roleSwapScenarios, ...aiRoleSwap]

  const handleGenerateAI = async () => {
    if (!activeGame) return
    setLoadingAI(true)
    try {
      let result
      switch (activeGame) {
        case 'wyr':
          result = await generateGameContent('Would You Rather')
          if (result) setAiWyr(prev => [...prev, ...result])
          break
        case 'tod': {
          const truths = await generateGameContent('Truth or Dare', 'truth')
          const dares = await generateGameContent('Truth or Dare', 'dare')
          setAiTod(prev => ({
            truth: [...prev.truth, ...(truths || [])],
            dare: [...prev.dare, ...(dares || [])]
          }))
          break
        }
        case 'deep-talk':
          result = await generateGameContent('Deep Talk')
          if (result) setAiDeepTalk(prev => [...prev, ...result])
          break
        case 'missions':
          result = await generateGameContent('Secret Mission')
          if (result) setAiSecretMissions(prev => [...prev, ...result])
          break
        case 'role-swap':
          result = await generateGameContent('Role Swap Game')
          if (result) setAiRoleSwap(prev => [...prev, ...result])
          break
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingAI(false)
    }
  }

  const nextItem = (max) => {
    const nextIdx = (currentIndex + 1) % max
    setCurrentIndex(nextIdx)
    // If we're reaching the end of local content, maybe fetch more?
    if (nextIdx === 0 && max > 0) {
      // Just loop for now, but user can click AI button
    }
  }

  const handleQuizAnswer = (type) => {
    const newResults = [...quizResults, type]
    if (currentIndex < preConflictQuestions.length - 1) {
      setQuizResults(newResults)
      setCurrentIndex(currentIndex + 1)
    } else {
      setQuizResults(newResults)
      setShowAnalysis(true)
    }
  }

  const renderGameContent = () => {
    switch (activeGame) {
      case 'wyr':
        return (
          <div className="space-y-8 text-center">
            <div className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 border-brand-100 shadow-xl min-h-[180px] lg:min-h-[220px] flex items-center justify-center">
              <p className="text-lg lg:text-xl font-black text-brand-900 leading-relaxed">
                "{currentWyr[currentIndex]}"
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => nextItem(currentWyr.length)}
                className="bg-brand-900 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-black flex items-center gap-2 shadow-lg text-sm lg:text-base"
              >
                <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" /> Lanjut
              </button>
              <button 
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="bg-brand-50 text-brand-900 px-5 py-3 lg:px-6 lg:py-4 rounded-full font-black flex items-center gap-2 border border-brand-100 disabled:opacity-50 text-sm lg:text-base"
              >
                {loadingAI ? <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" /> : <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-brand-600" />}
                Tanya AI
              </button>
            </div>
          </div>
        )
      case 'tod':
        return (
          <div className="space-y-8 text-center">
            {!todMode ? (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setTodMode('truth'); setCurrentIndex(Math.floor(Math.random() * currentTod.truth.length)) }}
                  className="bg-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl border-2 border-brand-100 shadow-lg group hover:border-brand-900 transition-all"
                >
                  <HelpCircle className="w-8 h-8 lg:w-10 lg:h-10 text-brand-600 mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-brand-900 text-sm lg:text-base">TRUTH</span>
                </button>
                <button 
                  onClick={() => { setTodMode('dare'); setCurrentIndex(Math.floor(Math.random() * currentTod.dare.length)) }}
                  className="bg-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl border-2 border-coral-100 shadow-lg group hover:border-coral-500 transition-all"
                >
                  <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-coral-500 mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-coral-900 text-sm lg:text-base">DARE</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 shadow-xl min-h-[180px] lg:min-h-[250px] flex flex-col items-center justify-center ${todMode === 'truth' ? 'bg-brand-50 border-brand-100' : 'bg-coral-50 border-coral-100'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${todMode === 'truth' ? 'text-brand-600' : 'text-coral-600'}`}>
                    {todMode}
                  </span>
                  <p className="text-lg lg:text-xl font-black text-brand-900 leading-relaxed">
                    "{currentTod[todMode][currentIndex]}"
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => setTodMode(null)}
                    className="bg-slate-200 text-slate-600 px-5 py-3 lg:px-6 lg:py-4 rounded-full font-black text-sm lg:text-base"
                  >
                    Kembali
                  </button>
                  <button 
                    onClick={() => setCurrentIndex(Math.floor(Math.random() * currentTod[todMode].length))}
                    className="bg-brand-900 text-white px-5 py-3 lg:px-6 lg:py-4 rounded-full font-black flex items-center gap-2 text-sm lg:text-base"
                  >
                    Lanjut <RotateCcw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={loadingAI}
                    className="bg-brand-50 text-brand-900 px-5 py-3 lg:px-6 lg:py-4 rounded-full font-black flex items-center gap-2 border border-brand-100 disabled:opacity-50 text-sm lg:text-base"
                  >
                    {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-brand-600" />}
                    AI
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      case 'pre-conflict':
        return (
          <div className="space-y-8">
            {!showAnalysis ? (
              <div className="space-y-6">
                <div className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 border-brand-100 shadow-xl min-h-[160px] lg:min-h-[200px] flex flex-col justify-center">
                  <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-3 lg:mb-4 text-center">
                    Question {currentIndex + 1} of {preConflictQuestions.length}
                  </span>
                  <p className="text-lg lg:text-xl font-black text-brand-900 leading-relaxed text-center">
                    "{preConflictQuestions[currentIndex].q}"
                  </p>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  {preConflictQuestions[currentIndex].options.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleQuizAnswer(opt.type)}
                      className="w-full p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-slate-100 text-left font-bold text-slate-600 hover:border-brand-900 hover:text-brand-900 transition-all text-sm lg:text-base"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 border-brand-100 shadow-xl text-center space-y-4 lg:space-y-6">
                <Trophy className="w-12 h-12 lg:w-16 lg:h-16 text-brand-600 mx-auto" />
                <h3 className="text-xl lg:text-2xl font-black text-brand-900">Analisis AI Keluar!</h3>
                <div className="p-4 lg:p-6 bg-brand-50 rounded-xl lg:rounded-2xl text-left">
                  <p className="text-xs lg:text-sm font-bold text-brand-900 leading-relaxed">
                    "Berdasarkan jawabanmu, kamu tipenya sangat menghargai <strong>Quality Time</strong> dan <strong>Words of Affirmation</strong>. Pasanganmu perlu tahu bahwa kehadiran fisik dan apresiasi verbal adalah kunci kebahagiaolamu. Hindari berasumsi dia sudah tahu, komunikasikan ini saat santai!"
                  </p>
                </div>
                <button 
                  onClick={() => { setShowAnalysis(false); setCurrentIndex(0); setQuizResults([]); }}
                  className="w-full py-3 lg:py-4 bg-brand-900 text-white rounded-full font-black text-sm lg:text-base"
                >
                  Main Lagi
                </button>
              </div>
            )}
          </div>
        )
      case 'deep-talk':
        return (
          <div className="space-y-8 text-center">
            <div className="bg-sage-900 p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl relative overflow-hidden min-h-[250px] lg:min-h-[350px] flex flex-col items-center justify-center">
              <div className="relative z-10">
                <Coffee className="w-8 h-8 lg:w-12 lg:h-12 text-sage-300 mx-auto mb-6 lg:mb-8" />
                <span className="text-[10px] font-black text-sage-400 uppercase tracking-[0.4em] block mb-4 lg:mb-6">Daily Deep Talk</span>
                <p className="text-xl lg:text-2xl font-black text-white leading-tight">
                  "{currentDeepTalk[currentIndex]}"
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-white/5 rounded-full -mr-16 lg:-mr-20 -mt-16 lg:-mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-40 lg:h-40 bg-sage-400/10 rounded-full -ml-16 lg:-ml-20 -mb-16 lg:-mb-20 blur-3xl"></div>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => nextItem(currentDeepTalk.length)}
                className="bg-sage-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-black shadow-lg flex items-center gap-2 text-sm lg:text-base"
              >
                <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" /> Lanjut
              </button>
              <button 
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="bg-white text-sage-600 px-5 py-3 lg:px-6 lg:py-4 rounded-full font-black flex items-center gap-2 border border-sage-100 disabled:opacity-50 text-sm lg:text-base"
              >
                {loadingAI ? <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" /> : <Zap className="w-4 h-4 lg:w-5 lg:h-5" />}
                Tanya AI
              </button>
            </div>
          </div>
        )
      case 'role-swap':
        return (
          <div className="space-y-8 text-center">
            <div className="bg-white p-8 rounded-[3rem] border-2 border-coral-100 shadow-xl min-h-[300px] flex flex-col justify-center">
              <span className="text-[10px] font-black text-coral-600 uppercase tracking-widest mb-6">Scenario Challenge</span>
              <div className="bg-coral-50 p-6 rounded-2xl mb-8">
                <p className="text-lg font-bold text-coral-900 italic">
                  "{currentRoleSwap[currentIndex].scenario}"
                </p>
              </div>
              <p className="text-xl font-black text-brand-900 leading-relaxed">
                {currentRoleSwap[currentIndex].question}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => nextItem(currentRoleSwap.length)}
                className="bg-coral-500 text-white px-8 py-4 rounded-full font-black shadow-lg flex items-center gap-2"
              >
                Lanjut <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={handleGenerateAI}
                disabled={loadingAI}
                className="bg-white text-coral-600 px-6 py-4 rounded-full font-black flex items-center gap-2 border border-coral-100 disabled:opacity-50"
              >
                {loadingAI ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                AI
              </button>
            </div>
          </div>
        )
      case 'missions':
        return (
          <div className="space-y-8">
            <div className="bg-brand-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden min-h-[350px] flex flex-col items-center justify-center text-center">
              <div className="relative z-10">
                <Target className="w-16 h-16 text-brand-300 mx-auto mb-8" />
                <h3 className="text-2xl font-black mb-4">Mission: Impossible</h3>
                {!missionAccepted ? (
                  <p className="text-brand-200 font-medium mb-8">Anda memiliki satu misi rahasia hari ini. Apakah Anda siap menerima tantangan ini?</p>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                      <p className="text-xl font-black leading-relaxed">
                        "{currentSecretMissions[currentIndex]}"
                      </p>
                    </div>
                    <p className="text-xs text-brand-300 font-bold italic">Ingat: Jangan beritahu pasanganmu!</p>
                  </div>
                )}
              </div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
            </div>
            {!missionAccepted ? (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setMissionAccepted(true); setCurrentIndex(Math.floor(Math.random() * currentSecretMissions.length)); }}
                  className="w-full py-5 bg-brand-900 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-brand-900/20"
                >
                  Terima Misi
                </button>
                <button 
                  onClick={handleGenerateAI}
                  disabled={loadingAI}
                  className="w-full py-4 bg-white text-brand-900 border-2 border-brand-100 rounded-[2rem] font-black flex items-center justify-center gap-2"
                >
                  {loadingAI ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 text-brand-600" />}
                  Generate Misi Baru (AI)
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setMissionAccepted(false)}
                className="w-full py-5 bg-slate-100 text-slate-400 rounded-[2rem] font-black"
              >
                Selesaikan Misi
              </button>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center gap-6 lg:mb-8">
        <button 
          onClick={activeGame ? () => { setActiveGame(null); setTodMode(null); } : onBack} 
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </button>
        <div>
          <h2 className="text-2xl lg:text-4xl font-black text-brand-900">
            {activeGame ? games.find(g => g.id === activeGame).title : 'Couple Games'}
          </h2>
          {activeGame && (
            <p className="text-slate-400 font-bold text-sm lg:text-base mt-1">
              {games.find(g => g.id === activeGame).desc}
            </p>
          )}
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto">
        {!activeGame ? (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8 lg:mb-12">
              <div className="bg-brand-50 p-2 rounded-xl">
                <Gamepad2 className="w-6 h-6 text-brand-600 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-sm lg:text-xl font-black text-brand-900 uppercase tracking-wider">Pilih Permainan</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {games.map((game) => (
                <button 
                  key={game.id}
                  onClick={() => { setActiveGame(game.id); setCurrentIndex(0); setTodMode(null); setShowAnalysis(false); setMissionAccepted(false); }}
                  className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 text-left group hover:border-brand-900 hover:shadow-lg transition-all h-full flex flex-col justify-between ${game.color} bg-white`}
                >
                  <div>
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500">
                      {React.cloneElement(game.icon, { className: "w-6 h-6 lg:w-8 lg:h-8" })}
                    </div>
                    <span className="font-black text-brand-900 text-lg lg:text-xl block mb-2">{game.title}</span>
                    <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">{game.desc}</p>
                  </div>
                  <div className="mt-6 lg:mt-8 flex justify-end">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderGameContent()}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoupleGames
