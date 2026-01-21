import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Brain, Target, Sparkles, Loader2, Zap, Heart, Users, ShieldCheck } from 'lucide-react'
import { generateEQFeedback } from '../lib/gemini'

const questions = [
  // SELF AWARENESS (8 questions)
  {
    id: 1,
    category: 'Self Awareness',
    question: 'Seberapa sering Anda menyadari perubahan suasana hati Anda tepat saat hal itu terjadi?',
    options: [
      { text: 'Hampir tidak pernah, saya baru sadar setelah semuanya berlalu.', score: 1 },
      { text: 'Jarang, saya sering bingung dengan apa yang saya rasakan.', score: 2 },
      { text: 'Seringkali saya bisa merasakannya meskipun butuh waktu.', score: 4 },
      { text: 'Sangat sering, saya sangat peka dengan setiap perubahan emosi saya.', score: 5 }
    ]
  },
  {
    id: 2,
    category: 'Self Awareness',
    question: 'Saat Anda merasa kesal, apakah Anda tahu persis apa penyebab atau pemicu utamanya?',
    options: [
      { text: 'Tidak tahu, biasanya saya hanya merasa marah pada semua hal.', score: 1 },
      { text: 'Kadang tahu, tapi seringkali pemicunya terasa samar.', score: 2 },
      { text: 'Biasanya saya bisa melacak kembali pemicu kemarahan saya.', score: 4 },
      { text: 'Sangat tahu, saya paham betul pola dan pemicu emosi saya.', score: 5 }
    ]
  },
  {
    id: 3,
    category: 'Self Awareness',
    question: 'Seberapa baik Anda memahami kelebihan dan kekurangan diri sendiri secara jujur?',
    options: [
      { text: 'Saya jarang memikirkannya atau merasa tidak punya kelebihan.', score: 1 },
      { text: 'Saya hanya tahu sedikit dan sering merasa kurang percaya diri.', score: 2 },
      { text: 'Saya punya gambaran yang cukup jelas tentang diri saya.', score: 4 },
      { text: 'Saya sangat mengenal diri saya dan terus belajar memperbaikinya.', score: 5 }
    ]
  },
  {
    id: 4,
    category: 'Self Awareness',
    question: 'Apakah Anda sadar bagaimana kata-kata Anda mempengaruhi perasaan orang lain saat Anda sedang emosi?',
    options: [
      { text: 'Tidak sadar sama sekali, saya hanya fokus meluapkan emosi.', score: 1 },
      { text: 'Kadang sadar setelah melihat reaksi mereka yang sedih/marah.', score: 2 },
      { text: 'Saya mencoba menyadarinya meskipun sulit mengontrolnya.', score: 4 },
      { text: 'Sangat sadar, saya selalu menimbang dampak ucapan saya.', score: 5 }
    ]
  },
  {
    id: 5,
    category: 'Self Awareness',
    question: 'Seberapa sering Anda merenungkan nilai-nilai hidup yang paling penting bagi Anda?',
    options: [
      { text: 'Hampir tidak pernah, saya hidup mengalir saja.', score: 1 },
      { text: 'Jarang, hanya kalau sedang ada masalah besar.', score: 2 },
      { text: 'Sesekali saya meluangkan waktu untuk introspeksi.', score: 4 },
      { text: 'Sangat sering, nilai-nilai saya menjadi kompas tindakan saya.', score: 5 }
    ]
  },
  {
    id: 6,
    category: 'Self Awareness',
    question: 'Apakah Anda mengenali sensasi fisik (seperti sesak dada atau tangan gemetar) saat mulai stres?',
    options: [
      { text: 'Tidak pernah memperhatikan tanda-tanda fisik.', score: 1 },
      { text: 'Baru sadar kalau sudah parah atau sakit.', score: 2 },
      { text: 'Biasanya saya sadar jika tubuh mulai terasa tidak nyaman.', score: 4 },
      { text: 'Sangat sadar, tubuh saya memberikan sinyal yang jelas.', score: 5 }
    ]
  },
  {
    id: 7,
    category: 'Self Awareness',
    question: 'Seberapa cepat Anda menyadari bahwa Anda sedang bersikap defensif (membela diri berlebihan) dalam diskusi?',
    options: [
      { text: 'Tidak pernah merasa defensif, saya selalu merasa benar.', score: 1 },
      { text: 'Biasanya sadar setelah diskusi selesai dan menyesal.', score: 2 },
      { text: 'Seringkali sadar di tengah diskusi dan mencoba tenang.', score: 4 },
      { text: 'Sangat cepat menyadari dan langsung merubah pendekatan saya.', score: 5 }
    ]
  },
  {
    id: 8,
    category: 'Self Awareness',
    question: 'Apakah Anda tahu apa yang benar-benar memotivasi Anda untuk bangun dan beraktivitas setiap hari?',
    options: [
      { text: 'Tidak tahu, saya hanya melakukan apa yang harus dilakukan.', score: 1 },
      { text: 'Hanya karena tuntutan ekonomi atau tekanan orang lain.', score: 2 },
      { text: 'Saya punya beberapa alasan yang membuat saya semangat.', score: 4 },
      { text: 'Sangat tahu, saya punya tujuan hidup yang jelas dan kuat.', score: 5 }
    ]
  },

  // SELF MANAGEMENT (8 questions)
  {
    id: 9,
    category: 'Self Management',
    question: 'Saat rencana besar Anda gagal total secara tiba-tiba, apa reaksi pertama Anda?',
    options: [
      { text: 'Marah besar, menyalahkan keadaan, dan berhenti berusaha.', score: 1 },
      { text: 'Frustasi berat dan butuh waktu sangat lama untuk bangkit.', score: 2 },
      { text: 'Merasa sedih sejenak, lalu mencoba mencari solusi lain.', score: 4 },
      { text: 'Tenang, menerima kegagalan, dan langsung menyusun rencana baru.', score: 5 }
    ]
  },
  {
    id: 10,
    category: 'Self Management',
    question: 'Seberapa baik Anda bisa menahan diri untuk tidak membalas komentar negatif atau kritik kasar?',
    options: [
      { text: 'Sangat sulit, saya harus membalasnya dengan lebih pedas.', score: 1 },
      { text: 'Kadang bisa menahan, tapi seringkali akhirnya terpancing juga.', score: 2 },
      { text: 'Biasanya saya mengabaikannya atau membalas dengan sopan.', score: 4 },
      { text: 'Sangat baik, saya tidak membiarkan opini orang merusak ketenangan saya.', score: 5 }
    ]
  },
  {
    id: 11,
    category: 'Self Management',
    question: 'Jika Anda merasa sangat malas atau jenuh, apa yang Anda lakukan untuk tetap produktif?',
    options: [
      { text: 'Menyerah pada kemalasan dan membiarkan tugas terbengkalai.', score: 1 },
      { text: 'Menunggu sampai mood datang kembali secara alami.', score: 2 },
      { text: 'Memaksa diri bekerja meskipun hasilnya tidak maksimal.', score: 4 },
      { text: 'Menggunakan teknik manajemen diri untuk mengembalikan fokus.', score: 5 }
    ]
  },
  {
    id: 12,
    category: 'Self Management',
    question: 'Bagaimana Anda mengelola emosi negatif agar tidak mengganggu interaksi profesional atau tugas?',
    options: [
      { text: 'Saya tidak bisa, mood saya sangat mempengaruhi kerja saya.', score: 1 },
      { text: 'Orang lain sering kena imbas kalau mood saya sedang buruk.', score: 2 },
      { text: 'Saya mencoba memisahkan perasaan pribadi dari tugas.', score: 4 },
      { text: 'Sangat profesional, saya mampu mengelola emosi dengan bijak.', score: 5 }
    ]
  },
  {
    id: 13,
    category: 'Self Management',
    question: 'Seberapa cepat Anda bisa tenang kembali setelah mengalami kejadian yang memalukan atau membuat stres?',
    options: [
      { text: 'Sangat lama, saya bisa memikirkannya selama berhari-hari.', score: 1 },
      { text: 'Butuh waktu beberapa jam untuk merasa normal kembali.', score: 2 },
      { text: 'Cukup cepat, saya punya cara untuk menenangkan diri.', score: 4 },
      { text: 'Sangat cepat, saya mampu melepaskan hal yang sudah terjadi.', score: 5 }
    ]
  },
  {
    id: 14,
    category: 'Self Management',
    question: 'Apakah Anda bisa tetap fokus pada tujuan jangka panjang meskipun ada godaan kesenangan instan?',
    options: [
      { text: 'Hampir selalu tergoda dengan kesenangan saat ini.', score: 1 },
      { text: 'Seringkali menunda hal penting demi hiburan sejenak.', score: 2 },
      { text: 'Biasanya bisa fokus, meskipun sesekali masih tergoda.', score: 4 },
      { text: 'Sangat disiplin, saya tahu prioritas jangka panjang saya.', score: 5 }
    ]
  },
  {
    id: 15,
    category: 'Self Management',
    question: 'Saat menghadapi perubahan mendadak di lingkungan kerja/sekolah, seberapa fleksibel Anda?',
    options: [
      { text: 'Sangat kaku dan stres berat jika rutinitas berubah.', score: 1 },
      { text: 'Mengeluh terus dan sulit beradaptasi dengan cara baru.', score: 2 },
      { text: 'Mencoba mengikuti meskipun butuh waktu untuk menyesuaikan.', score: 4 },
      { text: 'Sangat fleksibel dan melihat perubahan sebagai peluang.', score: 5 }
    ]
  },
  {
    id: 16,
    category: 'Self Management',
    question: 'Seberapa sering Anda bisa menunda gratifikasi (kesenangan) demi hasil yang lebih besar di masa depan?',
    options: [
      { text: 'Hampir tidak pernah, saya ingin semuanya sekarang juga.', score: 1 },
      { text: 'Seringkali memilih hasil kecil yang instan.', score: 2 },
      { text: 'Kadang bisa bersabar jika tujuannya sangat penting.', score: 4 },
      { text: 'Sangat sering, saya paham nilai dari kesabaran.', score: 5 }
    ]
  },

  // SOCIAL AWARENESS (8 questions)
  {
    id: 17,
    category: 'Social Awareness',
    question: 'Seberapa mudah bagi Anda untuk merasakan suasana hati (mood) di sebuah ruangan yang baru Anda masuki?',
    options: [
      { text: 'Sangat sulit, saya tidak peka dengan atmosfer sekitar.', score: 1 },
      { text: 'Hanya jika suasananya sangat ekstrem (misal: semua orang marah).', score: 2 },
      { text: 'Cukup mudah, saya bisa menangkap getaran emosi orang.', score: 4 },
      { text: 'Sangat mudah, saya sangat peka dengan dinamika energi di ruangan.', score: 5 }
    ]
  },
  {
    id: 18,
    category: 'Social Awareness',
    question: 'Saat seseorang bercerita tentang masalahnya, seberapa sering Anda benar-benar bisa "merasakan" posisi mereka?',
    options: [
      { text: 'Jarang, saya lebih suka memberikan nasihat logis langsung.', score: 1 },
      { text: 'Kadang-kadang, tergantung seberapa dekat saya dengan mereka.', score: 2 },
      { text: 'Seringkali saya bisa berempati dan memahami perasaan mereka.', score: 4 },
      { text: 'Selalu, saya mendengarkan dengan hati dan empati penuh.', score: 5 }
    ]
  },
  {
    id: 19,
    category: 'Social Awareness',
    question: 'Seberapa baik Anda membaca bahasa tubuh orang lain (misal: tahu mereka ingin pergi tapi sungkan)?',
    options: [
      { text: 'Sangat buruk, saya sering tidak sadar kode dari orang lain.', score: 1 },
      { text: 'Hanya jika kodenya sangat jelas atau verbal.', score: 2 },
      { text: 'Cukup baik dalam menangkap isyarat non-verbal.', score: 4 },
      { text: 'Sangat peka, saya bisa membaca mikro-ekspresi dan bahasa tubuh.', score: 5 }
    ]
  },
  {
    id: 20,
    category: 'Social Awareness',
    question: 'Jika ada konflik di kelompok Anda, seberapa peka Anda terhadap perasaan semua pihak yang terlibat?',
    options: [
      { text: 'Saya hanya peduli dengan siapa yang benar secara logika.', score: 1 },
      { text: 'Saya hanya memihak pada orang yang saya sukai.', score: 2 },
      { text: 'Saya mencoba memahami posisi masing-masing pihak.', score: 4 },
      { text: 'Sangat peka, saya memahami kebutuhan emosional tiap individu.', score: 5 }
    ]
  },
  {
    id: 21,
    category: 'Social Awareness',
    question: 'Seberapa sering Anda mencoba memahami sudut pandang orang yang memiliki opini sangat berbeda dari Anda?',
    options: [
      { text: 'Tidak pernah, saya anggap mereka salah atau aneh.', score: 1 },
      { text: 'Hanya jika dipaksa oleh keadaan atau tugas.', score: 2 },
      { text: 'Sesekali saya mencoba melihat dari sisi mereka.', score: 4 },
      { text: 'Sangat sering, saya menghargai keberagaman perspektif.', score: 5 }
    ]
  },
  {
    id: 22,
    category: 'Social Awareness',
    question: 'Apakah Anda memperhatikan tanda-tanda kecil jika teman Anda sedang butuh bantuan tapi mereka tidak mengatakannya?',
    options: [
      { text: 'Tidak, kalau mereka butuh bantuan ya harus bilang.', score: 1 },
      { text: 'Kadang sadar kalau sudah terlihat sangat jelas di wajahnya.', score: 2 },
      { text: 'Biasanya saya bertanya jika merasa ada yang tidak beres.', score: 4 },
      { text: 'Sangat sering, saya peka terhadap kebutuhan orang di sekitar saya.', score: 5 }
    ]
  },
  {
    id: 23,
    category: 'Social Awareness',
    question: 'Seberapa baik Anda memahami norma-norma sosial atau budaya di lingkungan yang baru bagi Anda?',
    options: [
      { text: 'Buruk, saya sering dianggap tidak sopan tanpa sengaja.', score: 1 },
      { text: 'Butuh waktu lama bagi saya untuk menyesuaikan diri.', score: 2 },
      { text: 'Cukup cepat belajar dan menghormati aturan setempat.', score: 4 },
      { text: 'Sangat cepat beradaptasi dan menghargai konteks sosial.', score: 5 }
    ]
  },
  {
    id: 24,
    category: 'Social Awareness',
    question: 'Saat berbicara dengan orang lain, seberapa sering Anda menyesuaikan gaya bicara agar mereka merasa nyaman?',
    options: [
      { text: 'Tidak pernah, saya bicara dengan cara saya sendiri.', score: 1 },
      { text: 'Jarang, saya ingin orang lain yang menyesuaikan diri.', score: 2 },
      { text: 'Seringkali saya menyesuaikan nada dan kata-kata saya.', score: 4 },
      { text: 'Sangat sering, saya sangat mementingkan kenyamanan lawan bicara.', score: 5 }
    ]
  },

  // RELATIONSHIP MANAGEMENT (8 questions)
  {
    id: 25,
    category: 'Relationship Management',
    question: 'Bagaimana cara Anda biasanya menangani perbedaan pendapat yang tajam dengan teman dekat atau pasangan?',
    options: [
      { text: 'Mendiamkan mereka (silent treatment) atau berteriak.', score: 1 },
      { text: 'Berdebat sampai ada yang mengalah atau menang.', score: 2 },
      { text: 'Membicarakannya dengan kepala dingin setelah emosi reda.', score: 4 },
      { text: 'Mendengarkan dulu, mencari kesepahaman, dan solusi bersama.', score: 5 }
    ]
  },
  {
    id: 26,
    category: 'Relationship Management',
    question: 'Seberapa sering Anda memberikan apresiasi atau pujian yang tulus kepada orang lain atas usaha mereka?',
    options: [
      { text: 'Hampir tidak pernah, buat apa memuji hal yang sudah seharusnya.', score: 1 },
      { text: 'Jarang, hanya jika mereka melakukan sesuatu yang luar biasa.', score: 2 },
      { text: 'Sesekali saya memberikan pujian agar mereka senang.', score: 4 },
      { text: 'Sangat sering, saya senang mengakui kontribusi orang lain.', score: 5 }
    ]
  },
  {
    id: 27,
    category: 'Relationship Management',
    question: 'Saat memberikan kritik, seberapa besar usaha Anda agar orang tersebut merasa didukung, bukan diserang?',
    options: [
      { text: 'Saya bicara apa adanya saja, kalau sakit hati ya risiko.', score: 1 },
      { text: 'Saya mencoba halus, tapi seringnya tetap terasa menyakitkan.', score: 2 },
      { text: 'Saya menggunakan teknik kritik yang membangun (sandwich method).', score: 4 },
      { text: 'Sangat hati-hati, fokus saya adalah pertumbuhan mereka.', score: 5 }
    ]
  },
  {
    id: 28,
    category: 'Relationship Management',
    question: 'Seberapa efektif Anda dalam membantu menenangkan teman yang sedang bertengkar atau berselisih?',
    options: [
      { text: 'Buruk, saya malah sering memperkeruh suasana.', score: 1 },
      { text: 'Saya lebih suka tidak ikut campur urusan orang lain.', score: 2 },
      { text: 'Cukup bisa membantu meredakan ketegangan.', score: 4 },
      { text: 'Sangat efektif, saya mampu menjadi mediator yang baik.', score: 5 }
    ]
  },
  {
    id: 29,
    category: 'Relationship Management',
    question: 'Bagaimana cara Anda membangun kembali kepercayaan yang sempat rusak dalam sebuah hubungan?',
    options: [
      { text: 'Mengabaikannya dan berharap waktu yang akan menyembuhkan.', score: 1 },
      { text: 'Hanya meminta maaf sekali tanpa ada perubahan perilaku.', score: 2 },
      { text: 'Menunjukkan perubahan nyata lewat tindakan konsisten.', score: 4 },
      { text: 'Bicara jujur, bertanggung jawab, dan bekerja keras memperbaikinya.', score: 5 }
    ]
  },
  {
    id: 30,
    category: 'Relationship Management',
    question: 'Seberapa sering Anda mencari solusi "win-win" daripada hanya ingin keinginan Anda yang dituruti?',
    options: [
      { text: 'Hampir tidak pernah, saya harus menang.', score: 1 },
      { text: 'Jarang, saya sering merasa kompromi itu merugikan.', score: 2 },
      { text: 'Biasanya saya mencari jalan tengah agar semua senang.', score: 4 },
      { text: 'Sangat sering, kolaborasi adalah kunci bagi saya.', score: 5 }
    ]
  },
  {
    id: 31,
    category: 'Relationship Management',
    question: 'Seberapa terbuka Anda dalam mengkomunikasikan kebutuhan emosional Anda kepada orang terdekat?',
    options: [
      { text: 'Sangat tertutup, saya harap mereka peka sendiri.', score: 1 },
      { text: 'Hanya bicara kalau sudah merasa sangat meledak.', score: 2 },
      { text: 'Cukup terbuka jika merasa suasananya aman.', score: 4 },
      { text: 'Sangat terbuka dan komunikatif tentang apa yang saya butuhkan.', score: 5 }
    ]
  },
  {
    id: 32,
    category: 'Relationship Management',
    question: 'Bagaimana cara Anda menghadapi orang yang bersikap sulit atau kurang kooperatif dalam tim?',
    options: [
      { text: 'Memusuhi mereka atau mengeluh di belakang mereka.', score: 1 },
      { text: 'Menghindari mereka sebisa mungkin.', score: 2 },
      { text: 'Mencoba tetap profesional meskipun tidak nyaman.', score: 4 },
      { text: 'Mengajak bicara pribadi untuk memahami hambatan mereka.', score: 5 }
    ]
  }
]

const EQTest = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0) // 0: intro, 1-N: questions, N+1: result
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [aiFeedback, setAiFeedback] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const handleAnswer = (questionId, score) => {
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
      const finalScore = calculateScore(newAnswers)
      fetchAIFeedback(finalScore.percentage, finalScore.breakdown)
    }
  }

  const fetchAIFeedback = async (percentage, breakdown) => {
    setLoadingAI(true)
    try {
      const feedback = await generateEQFeedback(percentage, breakdown)
      if (feedback) setAiFeedback(feedback)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingAI(false)
    }
  }

  const calculateScore = (currentAnswers = answers) => {
    const categories = ['Self Awareness', 'Self Management', 'Social Awareness', 'Relationship Management']
    const breakdown = {}
    
    categories.forEach(cat => {
      const catQuestions = questions.filter(q => q.category === cat)
      const catTotal = catQuestions.reduce((acc, q) => acc + (currentAnswers[q.id] || 0), 0)
      const catMax = catQuestions.length * 5
      breakdown[cat] = (catTotal / catMax) * 100
    })

    const total = Object.values(currentAnswers).reduce((a, b) => a + b, 0)
    const max = questions.length * 5
    const percentage = (total / max) * 100

    return { total, percentage, breakdown }
  }

  const getAnalysis = (percentage) => {
    if (percentage >= 85) return { label: 'Exceptional', color: 'text-sage-600', desc: 'Anda memiliki kecerdasan emosional yang luar biasa. Anda adalah pemimpin emosional yang alami.' }
    if (percentage >= 70) return { label: 'High', color: 'text-emerald-600', desc: 'EQ Anda sangat baik. Anda mampu mengelola diri dan hubungan dengan sangat efektif.' }
    if (percentage >= 50) return { label: 'Moderate', color: 'text-brand-600', desc: 'EQ Anda rata-rata. Ada beberapa area yang bisa ditingkatkan untuk hubungan yang lebih harmonis.' }
    return { label: 'Developing', color: 'text-coral-600', desc: 'Anda sedang dalam proses mengembangkan kecerdasan emosional. Fokus pada kesadaran diri akan sangat membantu.' }
  }

  const categoryIcons = {
    'Self Awareness': <Brain className="w-5 h-5" />,
    'Self Management': <Target className="w-5 h-5" />,
    'Social Awareness': <Users className="w-5 h-5" />,
    'Relationship Management': <Heart className="w-5 h-5" />
  }

  const scoreInfo = calculateScore()

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center gap-5 lg:mb-6">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all">
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </button>
        <h2 className="text-xl lg:text-3xl font-black text-brand-900">Advanced EQ Assessment</h2>
      </div>

      <div className="flex-1 px-6 py-4">
        <AnimatePresence mode="wait">
          {!showResult && currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <div className="bg-brand-900 rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden">
                <Brain className="w-12 h-12 mb-6 text-brand-300 lg:w-16 lg:h-16" />
                <h3 className="text-2xl lg:text-4xl font-black mb-3 leading-tight">Uji Kecerdasan Emosionalmu</h3>
                <p className="text-brand-200 font-medium text-base lg:text-lg max-w-2xl">Analisis mendalam melalui 32 parameter psikologis untuk membantumu memahami diri dan orang lain dengan lebih baik.</p>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="flex items-start gap-5 p-6 lg:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="bg-brand-50 p-3 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-900 text-lg lg:text-xl">4 Parameter Utama</h4>
                    <p className="text-xs lg:text-sm text-slate-400 font-bold mt-1">Self Awareness, Self Management, Social Awareness, & Relationship Management.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-6 lg:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="bg-brand-50 p-3 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-900 text-lg lg:text-xl">Deep AI Analysis</h4>
                    <p className="text-xs lg:text-sm text-slate-400 font-bold mt-1">Rekomendasi personal berdasarkan profil emosional unikmu.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="w-full bg-brand-900 text-white py-5 lg:py-6 rounded-[2rem] font-black text-lg lg:text-xl shadow-2xl shadow-brand-900/20 hover:scale-[1.02] transition-transform"
              >
                Mulai Assessment (±10 Menit)
              </button>
            </motion.div>
          )}

          {!showResult && currentStep > 0 && currentStep <= questions.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8 max-w-3xl mx-auto py-6 lg:py-10"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-brand-400">
                    Question {currentStep} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-brand-50 rounded-lg text-brand-600">
                      {categoryIcons[questions[currentStep - 1].category]}
                    </div>
                    <span className="text-sm font-black text-brand-900">{questions[currentStep - 1].category}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-black text-brand-900 leading-tight">
                {questions[currentStep - 1].question}
              </h3>

              <div className="grid grid-cols-1 gap-4 lg:gap-5">
                {questions[currentStep - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(questions[currentStep - 1].id, option.score)}
                    className="w-full p-6 lg:p-8 text-left bg-white rounded-[2rem] border-2 border-slate-100 hover:border-brand-900 hover:shadow-xl transition-all group"
                  >
                    <p className="font-bold text-base lg:text-lg text-slate-600 group-hover:text-brand-900">{option.text}</p>
                  </button>
                ))}
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-900"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / questions.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 lg:space-y-8 max-w-5xl mx-auto pb-20"
            >
              <div className="bg-white rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                  <div className="text-center lg:text-left">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 lg:mb-8">
                      <Brain className="w-8 h-8 text-brand-900 lg:w-12 lg:h-12" />
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-black text-brand-900 mb-3 lg:mb-4">Emotional Profile</h3>
                    <div className="text-6xl lg:text-8xl font-black text-brand-900 mb-4 lg:mb-6">
                      {Math.round(scoreInfo.percentage)}%
                    </div>
                    
                    <div className={`inline-block px-5 py-2.5 rounded-full bg-slate-50 font-black text-base lg:text-lg mb-6 lg:mb-8 ${getAnalysis(scoreInfo.percentage).color}`}>
                      {getAnalysis(scoreInfo.percentage).label}
                    </div>

                    <p className="text-slate-500 font-medium text-base lg:text-lg leading-relaxed mb-8 lg:mb-10">
                      {getAnalysis(scoreInfo.percentage).desc}
                    </p>

                    <div className="grid grid-cols-1 gap-3 lg:gap-4">
                      <button onClick={onBack} className="w-full bg-brand-900 text-white py-5 lg:py-6 rounded-[1.5rem] lg:rounded-[2rem] font-black text-base lg:text-lg shadow-xl shadow-brand-900/20 hover:scale-[1.02] transition-transform">
                        Simpan & Kembali
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Parameter Breakdown</h4>
                      <div className="space-y-6">
                        {Object.entries(scoreInfo.breakdown).map(([cat, score]) => (
                          <div key={cat} className="space-y-3">
                            <div className="flex justify-between items-end">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                                  {categoryIcons[cat]}
                                </div>
                                <span className="text-sm font-black text-brand-900">{cat}</span>
                              </div>
                              <span className="text-lg font-black text-brand-900">{Math.round(score)}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-brand-600' : score >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Analysis Section */}
                    <div className="bg-brand-50/50 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 text-left border border-brand-100 relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-4 lg:mb-6">
                        <Zap className="w-5 h-5 text-brand-600 fill-brand-600" />
                        <span className="text-[10px] lg:text-xs font-black text-brand-900 uppercase tracking-widest">AI Recommendations</span>
                      </div>
                      
                      {loadingAI ? (
                        <div className="flex flex-col items-center py-8 lg:py-12 gap-3 lg:gap-4">
                          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                          <p className="text-[10px] lg:text-xs font-bold text-brand-400">Menganalisis profil emosionalmu...</p>
                        </div>
                      ) : aiFeedback ? (
                        <div className="space-y-4 lg:space-y-6">
                          <p className="text-base lg:text-lg font-medium text-brand-900 leading-relaxed italic">
                            "{aiFeedback.feedback}"
                          </p>
                          <div className="grid grid-cols-1 gap-3 lg:gap-4">
                            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-brand-100">
                              <span className="text-[10px] font-black text-sage-600 uppercase tracking-wider block mb-1.5 lg:mb-2">Kekuatan Terbesarmu:</span>
                              <p className="text-[10px] lg:text-xs font-bold text-slate-600 leading-relaxed">{aiFeedback.strength}</p>
                            </div>
                            <div className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-brand-100">
                              <span className="text-[10px] font-black text-coral-600 uppercase tracking-wider block mb-1.5 lg:mb-2">Rekomendasi Pengembangan:</span>
                              <p className="text-[10px] lg:text-xs font-bold text-slate-600 leading-relaxed">{aiFeedback.improvement}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[10px] lg:text-xs font-bold text-brand-400 text-center py-6 lg:py-8">Gagal memuat analisis AI.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EQTest
