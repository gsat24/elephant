import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  ChevronLeft, 
  Heart, 
  MessageSquare, 
  Users, 
  Zap, 
  Sparkles, 
  ArrowRight
} from 'lucide-react'

// Communication Style Questions (15 questions)
const commStyleQuestions = [
  {
    id: 1,
    question: "Ketika seseorang memotong pembicaraan Anda di depan umum, reaksi spontan Anda adalah...",
    options: [
      { text: "Berhenti bicara sepenuhnya dan merasa kecil hati.", type: "Passive" },
      { text: "Memotong balik dengan suara lebih keras: 'Tunggu, saya belum selesai!'", type: "Aggressive" },
      { text: "Menunggu jeda sejenak, lalu berkata tenang: 'Boleh saya selesaikan dulu poin saya?'", type: "Assertive" },
      { text: "Menghela napas panjang dan memutar mata agar orang lain melihat ketidaksenangan Anda.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 2,
    question: "Atasan memberikan tugas tambahan yang sangat mendesak saat jam kerja hampir habis. Anda...",
    options: [
      { text: "Menerimanya tanpa mengeluh, meskipun Anda harus membatalkan janji pribadi.", type: "Passive" },
      { text: "Marah-marah di meja kerja agar atasan tahu Anda tidak suka, tapi tetap mengerjakannya.", type: "Passive-Aggressive" },
      { text: "Menjelaskan beban kerja Anda saat ini dan menawarkan untuk menyelesaikannya besok pagi.", type: "Assertive" },
      { text: "Langsung menolak dengan nada ketus: 'Ini bukan jam kerja saya lagi!'", type: "Aggressive" }
    ]
  },
  {
    id: 3,
    question: "Teman meminjam uang dan sudah lewat jatuh tempo. Cara Anda menagihnya adalah...",
    options: [
      { text: "Tidak pernah menagih karena takut merusak pertemanan.", type: "Passive" },
      { text: "Membuat status di media sosial tentang orang yang lupa hutang.", type: "Passive-Aggressive" },
      { text: "Mengirim pesan langsung: 'Hai, mau ingetin soal yang kemarin, bisa dikirim kapan ya?'", type: "Assertive" },
      { text: "Menelpon berkali-kali dan membentaknya agar segera membayar.", type: "Aggressive" }
    ]
  },
  {
    id: 4,
    question: "Dalam diskusi kelompok, pendapat Anda ditolak mentah-mentah. Anda akan...",
    options: [
      { text: "Diam dan tidak akan memberikan pendapat lagi selama diskusi.", type: "Passive" },
      { text: "Mencari kelemahan pendapat orang lain untuk menjatuhkan mereka.", type: "Aggressive" },
      { text: "Bertanya bagian mana yang kurang tepat agar bisa memperbaikinya.", type: "Assertive" },
      { text: "Setuju di depan mereka, tapi membicarakan keburukan ide tersebut di belakang.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 5,
    question: "Pasangan lupa merayakan hari jadi kalian. Respon Anda...",
    options: [
      { text: "Pura-pura tidak apa-apa, tapi menangis sendirian di kamar.", type: "Passive" },
      { text: "Memberikan 'silent treatment' (mendiamkan) selama beberapa hari ke depan.", type: "Passive-Aggressive" },
      { text: "Mengajaknya bicara jujur bahwa Anda kecewa dan ingin merayakannya lain waktu.", type: "Assertive" },
      { text: "Memaki dan mengungkit semua kesalahan masa lalunya.", type: "Aggressive" }
    ]
  },
  {
    id: 6,
    question: "Seorang pelayan restoran salah membawa pesanan Anda. Anda akan...",
    options: [
      { text: "Tetap memakannya karena tidak enak menegur.", type: "Passive" },
      { text: "Memanggil manajer dan menuntut kompensasi dengan suara keras.", type: "Aggressive" },
      { text: "Memanggil pelayan dengan sopan dan meminta pesanan yang benar.", type: "Assertive" },
      { text: "Memakan makanannya tapi meninggalkan tip yang sangat kecil dan review buruk.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 7,
    question: "Anda merasa rekan kerja tidak melakukan bagiannya dengan adil. Anda...",
    options: [
      { text: "Mengerjakan bagian mereka juga agar proyek cepat selesai.", type: "Passive" },
      { text: "Sengaja memperlambat pekerjaan Anda agar dia juga tertekan.", type: "Passive-Aggressive" },
      { text: "Mengajaknya berdiskusi untuk membagi ulang tugas secara transparan.", type: "Assertive" },
      { text: "Melaporkannya ke atasan tanpa bicara dulu dengannya.", type: "Aggressive" }
    ]
  },
  {
    id: 8,
    question: "Seseorang menyerobot antrean Anda di supermarket. Anda...",
    options: [
      { text: "Membiarkannya saja karena malas berdebat.", type: "Passive" },
      { text: "Mendorongnya kembali ke belakang dengan kasar.", type: "Aggressive" },
      { text: "Menegur dengan sopan: 'Maaf, saya sudah mengantre di sini sebelumnya.'", type: "Assertive" },
      { text: "Menyindir dengan keras agar orang di sekitar mendengar betapa tidak sopannya dia.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 9,
    question: "Bagaimana cara Anda memberikan kritik kepada orang lain?",
    options: [
      { text: "Menyampaikannya secara langsung, fokus pada perilaku, bukan orangnya.", type: "Assertive" },
      { text: "Tidak berani memberikan kritik meskipun itu penting.", type: "Passive" },
      { text: "Menggunakan kata-kata yang tajam untuk menjatuhkan mentalnya.", type: "Aggressive" },
      { text: "Memberikan pujian palsu yang diikuti dengan sindiran halus.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 10,
    question: "Ketika Anda melakukan kesalahan besar, Anda cenderung...",
    options: [
      { text: "Menyalahkan keadaan atau orang lain agar Anda tidak terlihat buruk.", type: "Aggressive" },
      { text: "Mengakui kesalahan, meminta maaf, dan mencari solusi.", type: "Assertive" },
      { text: "Terus-menerus meminta maaf secara berlebihan dan merasa sangat bersalah.", type: "Passive" },
      { text: "Bersembunyi dari masalah dan berharap orang lain akan melupakannya.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 11,
    question: "Seseorang terus-menerus menanyakan hal pribadi yang membuat Anda risih. Anda...",
    options: [
      { text: "Menjawab seadanya dengan nada malas sambil berharap dia mengerti.", type: "Passive" },
      { text: "Membentaknya: 'Bisa nggak jangan urusin hidup orang lain?!'", type: "Aggressive" },
      { text: "Berkata jujur: 'Maaf, saya kurang nyaman membahas hal itu sekarang.'", type: "Assertive" },
      { text: "Menjawab dengan sarkasme tajam agar dia merasa bodoh.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 12,
    question: "Anda merasa diabaikan dalam sebuah percakapan kelompok. Apa yang Anda lakukan?",
    options: [
      { text: "Menarik diri dari kelompok dan tidak mau bicara lagi selamanya.", type: "Passive" },
      { text: "Sengaja menjatuhkan barang atau berbuat gaduh agar diperhatikan.", type: "Passive-Aggressive" },
      { text: "Menunggu momen yang pas lalu masuk kembali dengan topik menarik.", type: "Assertive" },
      { text: "Langsung protes: 'Kalian dengerin saya nggak sih?!'", type: "Aggressive" }
    ]
  },
  {
    id: 13,
    question: "Teman satu tim mengklaim hasil kerja Anda sebagai miliknya. Respon Anda...",
    options: [
      { text: "Membiarkannya karena takut menciptakan konflik di tim.", type: "Passive" },
      { text: "Mengonfrontasinya di depan umum agar dia malu.", type: "Aggressive" },
      { text: "Mengajaknya bicara empat mata dan meluruskan fakta secara profesional.", type: "Assertive" },
      { text: "Bekerja secara asal-asalan di proyek berikutnya untuk membalas dendam.", type: "Passive-Aggressive" }
    ]
  },
  {
    id: 14,
    question: "Bagaimana cara Anda menolak ajakan kumpul teman saat Anda sedang lelah?",
    options: [
      { text: "Mengatakan 'iya' padahal sangat terpaksa dan mengeluh sepanjang acara.", type: "Passive" },
      { text: "Tidak membalas pesannya sama sekali (ghosting).", type: "Passive-Aggressive" },
      { text: "Menolak dengan jujur bahwa Anda sedang butuh istirahat.", type: "Assertive" },
      { text: "Marah-marah karena merasa mereka tidak mengerti kesibukan Anda.", type: "Aggressive" }
    ]
  },
  {
    id: 15,
    question: "Ketika merasa sangat marah, Anda cenderung...",
    options: [
      { text: "Meledak-ledak dan mengatakan hal yang menyakitkan.", type: "Aggressive" },
      { text: "Mengambil waktu untuk tenang, lalu menyampaikan alasan kemarahan.", type: "Assertive" },
      { text: "Memendamnya sampai Anda merasa pusing atau sakit fisik.", type: "Passive" },
      { text: "Melakukan sabotase kecil terhadap hal yang membuat Anda marah.", type: "Passive-Aggressive" }
    ]
  }
]

// Love Language Questions (20 questions)
const loveLanguageQuestions = [
  {
    id: 1,
    question: "Anda merasa paling dicintai ketika pasangan...",
    options: [
      { text: "Menulis surat cinta atau mengirim pesan 'Semangat ya hari ini!'.", type: "Words of Affirmation" },
      { text: "Memberikan hadiah kecil yang sudah lama Anda inginkan.", type: "Receiving Gifts" }
    ]
  },
  {
    id: 2,
    question: "Mana yang lebih membuat Anda tersenyum lebar?",
    options: [
      { text: "Pasangan membantu Anda membereskan rumah tanpa diminta.", type: "Acts of Service" },
      { text: "Duduk berdua di taman sambil mengobrol tanpa gangguan HP.", type: "Quality Time" }
    ]
  },
  {
    id: 3,
    question: "Dalam hubungan, sentuhan fisik bagi Anda adalah...",
    options: [
      { text: "Sangat penting, seperti pelukan hangat saat pulang kerja.", type: "Physical Touch" },
      { text: "Biasa saja, saya lebih suka mendengar pujian darinya.", type: "Words of Affirmation" }
    ]
  },
  {
    id: 4,
    question: "Hadiah ulang tahun ideal bagi Anda adalah...",
    options: [
      { text: "Sesuatu yang bermakna dan dibungkus dengan cantik.", type: "Receiving Gifts" },
      { text: "Tiket liburan berdua untuk menghabiskan waktu bersama.", type: "Quality Time" }
    ]
  },
  {
    id: 5,
    question: "Pasangan menunjukkan kasih sayangnya dengan cara...",
    options: [
      { text: "Memijat bahu Anda setelah hari yang melelahkan.", type: "Physical Touch" },
      { text: "Menyelesaikan urusan administrasi Anda yang membosankan.", type: "Acts of Service" }
    ]
  },
  {
    id: 6,
    question: "Anda merasa dihargai saat pasangan berkata...",
    options: [
      { text: "'Aku bangga banget sama pencapaian kamu hari ini.'", type: "Words of Affirmation" },
      { text: "'Aku sudah pesankan makanan favorit kamu buat makan malam.'", type: "Acts of Service" }
    ]
  },
  {
    id: 7,
    question: "Aktivitas mana yang paling Anda nantikan di akhir pekan?",
    options: [
      { text: "Jalan-jalan sore sambil bergandengan tangan.", type: "Physical Touch" },
      { text: "Maraton film berdua sambil fokus pada satu sama lain.", type: "Quality Time" }
    ]
  },
  {
    id: 8,
    question: "Hadiah kejutan di hari biasa membuat Anda merasa...",
    options: [
      { text: "Sangat spesial karena dia memikirkan saya.", type: "Receiving Gifts" },
      { text: "Senang, tapi saya lebih senang kalau dia bantu cuci mobil saya.", type: "Acts of Service" }
    ]
  },
  {
    id: 9,
    question: "Ketika Anda sedih, Anda paling butuh...",
    options: [
      { text: "Pelukan erat tanpa perlu berkata apa-apa.", type: "Physical Touch" },
      { text: "Kata-kata penguatan yang menenangkan hati.", type: "Words of Affirmation" }
    ]
  },
  {
    id: 10,
    question: "Mana yang paling membuktikan cinta pasangan?",
    options: [
      { text: "Dia meluangkan waktu khusus untuk kencan mingguan.", type: "Quality Time" },
      { text: "Dia ingat membelikan barang yang pernah Anda sebutkan sepintas.", type: "Receiving Gifts" }
    ]
  },
  {
    id: 11,
    question: "Bahasa cinta yang paling membuat Anda merasa 'penuh' adalah...",
    options: [
      { text: "Dukungan verbal yang tulus setiap hari.", type: "Words of Affirmation" },
      { text: "Bantuan nyata dalam tugas-tugas harian saya.", type: "Acts of Service" }
    ]
  },
  {
    id: 12,
    question: "Anda merasa paling terhubung dengan pasangan saat...",
    options: [
      { text: "Berbagi hobi yang sama selama berjam-jam.", type: "Quality Time" },
      { text: "Saling bersentuhan atau berdekatan secara fisik.", type: "Physical Touch" }
    ]
  },
  {
    id: 13,
    question: "Hadiah buatan tangan bagi Anda terasa...",
    options: [
      { text: "Sangat berharga karena ada usaha di dalamnya.", type: "Receiving Gifts" },
      { text: "Bagus, tapi saya lebih suka kalau dia bantu masak makan malam.", type: "Acts of Service" }
    ]
  },
  {
    id: 14,
    question: "Kritik yang disampaikan dengan lembut tetap terasa...",
    options: [
      { text: "Menyakitkan karena saya butuh afirmasi positif.", type: "Words of Affirmation" },
      { text: "Bisa diterima, asal dia tetap meluangkan waktu buat saya.", type: "Quality Time" }
    ]
  },
  {
    id: 15,
    question: "Apa yang paling Anda rindukan saat jauh dari pasangan?",
    options: [
      { text: "Kehadiran fisiknya dan sentuhannya.", type: "Physical Touch" },
      { text: "Obrolan mendalam yang biasa kami lakukan.", type: "Quality Time" }
    ]
  },
  {
    id: 16,
    question: "Anda merasa paling didukung saat pasangan...",
    options: [
      { text: "Mengambil alih pekerjaan rumah saat Anda sibuk.", type: "Acts of Service" },
      { text: "Memberikan barang kecil yang mengingatkan Anda padanya.", type: "Receiving Gifts" }
    ]
  },
  {
    id: 17,
    question: "Mana yang lebih Anda hargai?",
    options: [
      { text: "Pujian tulus tentang penampilan atau karakter Anda.", type: "Words of Affirmation" },
      { text: "Pelukan lama yang terasa menenangkan.", type: "Physical Touch" }
    ]
  },
  {
    id: 18,
    question: "Momen kencan ideal bagi Anda adalah...",
    options: [
      { text: "Pergi makan malam romantis berdua saja.", type: "Quality Time" },
      { text: "Pasangan membelikan bunga atau cokelat favorit.", type: "Receiving Gifts" }
    ]
  },
  {
    id: 19,
    question: "Bahasa cinta mana yang paling sulit Anda lupakan jika tidak terpenuhi?",
    options: [
      { text: "Kata-kata kasar atau kritik yang tajam.", type: "Words of Affirmation" },
      { text: "Janji bantuan yang tidak ditepati.", type: "Acts of Service" }
    ]
  },
  {
    id: 20,
    question: "Anda merasa dicintai ketika pasangan...",
    options: [
      { text: "Menyentuh tangan atau rambut Anda secara spontan.", type: "Physical Touch" },
      { text: "Mendengarkan keluh kesah Anda dengan penuh perhatian.", type: "Quality Time" }
    ]
  }
]

// Couple Compatibility Questions (15 questions)
const coupleSyncQuestions = [
  {
    id: 1,
    question: "Bagaimana pandangan Anda tentang pembagian keuangan dalam rumah tangga?",
    options: [
      { text: "Semua penghasilan digabung dalam satu rekening bersama.", type: "Unified" },
      { text: "Masing-masing punya rekening sendiri, tapi ada uang kas bersama.", type: "Hybrid" },
      { text: "Sepenuhnya terpisah, masing-masing bayar kebutuhan masing-masing.", type: "Independent" },
      { text: "Satu orang yang memegang kendali penuh atas semua keuangan.", type: "Controlled" }
    ]
  },
  {
    id: 2,
    question: "Jika ada konflik besar, cara terbaik menyelesaikannya adalah...",
    options: [
      { text: "Langsung dibicarakan sampai tuntas saat itu juga.", type: "Direct" },
      { text: "Diam dulu masing-masing sampai kepala dingin, baru bicara.", type: "Cooling-off" },
      { text: "Menghindari perdebatan dan berharap masalah hilang sendiri.", type: "Avoidant" },
      { text: "Melibatkan pihak ketiga (orang tua/teman) untuk menengahi.", type: "Mediated" }
    ]
  },
  {
    id: 3,
    question: "Apa prioritas utama Anda dalam 5 tahun ke depan?",
    options: [
      { text: "Karier dan pencapaian finansial yang setinggi-tingginya.", type: "Career" },
      { text: "Membangun keluarga dan fokus pada perkembangan anak.", type: "Family" },
      { text: "Kebebasan untuk traveling dan menikmati hidup.", type: "Lifestyle" },
      { text: "Pengembangan diri, pendidikan, atau spiritualitas.", type: "Growth" }
    ]
  },
  {
    id: 4,
    question: "Seberapa penting keterlibatan keluarga besar dalam hubungan kalian?",
    options: [
      { text: "Sangat penting, keputusan besar harus melibatkan orang tua.", type: "Traditional" },
      { text: "Penting untuk silaturahmi, tapi keputusan ada di tangan kami.", type: "Balanced" },
      { text: "Keluarga besar tidak boleh ikut campur urusan internal kami.", type: "Private" },
      { text: "Kami lebih suka menjaga jarak dari keluarga besar masing-masing.", type: "Distanced" }
    ]
  },
  {
    id: 5,
    question: "Bagaimana Anda membayangkan pembagian tugas domestik (rumah tangga)?",
    options: [
      { text: "Dibagi secara adil berdasarkan kesepakatan bersama.", type: "Equal" },
      { text: "Mengikuti peran tradisional (suami bekerja, istri di rumah).", type: "Traditional" },
      { text: "Siapa yang punya waktu luang lebih banyak, dia yang mengerjakan.", type: "Flexible" },
      { text: "Menggunakan jasa asisten rumah tangga untuk semuanya.", type: "Outsourced" }
    ]
  },
  {
    id: 6,
    question: "Dalam mendidik anak nantinya, gaya mana yang Anda pilih?",
    options: [
      { text: "Disiplin ketat dan mengutamakan prestasi akademis.", type: "Authoritative" },
      { text: "Bebas dan demokratis, membiarkan anak memilih jalannya.", type: "Permissive" },
      { text: "Fokus pada nilai-nilai agama dan moral yang kuat.", type: "Religious" },
      { text: "Menyeimbangkan antara kebebasan dan tanggung jawab.", type: "Balanced" }
    ]
  },
  {
    id: 7,
    question: "Bagaimana cara Anda menghabiskan waktu luang yang ideal?",
    options: [
      { text: "Bersantai di rumah saja, nonton film atau baca buku.", type: "Introvert" },
      { text: "Pergi keluar, bertemu teman-teman, dan bersosialisasi.", type: "Extrovert" },
      { text: "Melakukan aktivitas produktif atau hobi yang serius.", type: "Productive" },
      { text: "Mencoba hal-hal baru yang memacu adrenalin.", type: "Adventurous" }
    ]
  },
  {
    id: 8,
    question: "Jika pasangan harus pindah kota karena pekerjaan, Anda akan...",
    options: [
      { text: "Ikut pindah tanpa ragu demi keutuhan hubungan.", type: "Sacrificial" },
      { text: "Menjalani LDR (hubungan jarak jauh) sampai waktu tertentu.", type: "Independent" },
      { text: "Meminta pasangan menolak tawaran tersebut demi karier Anda.", type: "Assertive" },
      { text: "Mengevaluasi kembali kelanjutan hubungan tersebut.", type: "Critical" }
    ]
  },
  {
    id: 9,
    question: "Seberapa terbuka Anda soal masa lalu kepada pasangan?",
    options: [
      { text: "Sangat terbuka, tidak ada rahasia sama sekali.", type: "Transparent" },
      { text: "Hanya menceritakan hal-hal yang relevan dengan masa depan.", type: "Selective" },
      { text: "Masa lalu adalah urusan masing-masing, tidak perlu dibahas.", type: "Private" },
      { text: "Tergantung seberapa dalam hubungan ini berjalan.", type: "Cautious" }
    ]
  },
  {
    id: 10,
    question: "Apa makna 'kesetiaan' bagi Anda?",
    options: [
      { text: "Tidak ada hubungan emosional atau fisik dengan orang lain.", type: "Absolute" },
      { text: "Selama masih berkomitmen pada visi masa depan bersama.", type: "Visionary" },
      { text: "Kejujuran penuh dalam setiap tindakan dan perasaan.", type: "Honest" },
      { text: "Menjaga martabat pasangan di depan orang lain.", type: "Respectful" }
    ]
  },
  {
    id: 11,
    question: "Bagaimana Anda memandang peran agama atau spiritualitas dalam hubungan?",
    options: [
      { text: "Sangat krusial, harus menjadi fondasi utama kehidupan.", type: "Fundamental" },
      { text: "Penting sebagai panduan moral, tapi tidak kaku.", type: "Moderate" },
      { text: "Urusan pribadi masing-masing, tidak perlu disatukan.", type: "Personal" },
      { text: "Tidak terlalu penting bagi keberlangsungan hubungan kami.", type: "Secular" }
    ]
  },
  {
    id: 12,
    question: "Dalam hal bersosialisasi dengan teman, Anda lebih suka...",
    options: [
      { text: "Selalu pergi bersama pasangan ke setiap acara teman.", type: "Codependent" },
      { text: "Punya waktu khusus untuk teman masing-masing tanpa pasangan.", type: "Independent" },
      { text: "Hanya sesekali membawa pasangan jika acaranya cocok.", type: "Balanced" },
      { text: "Lebih suka tidak terlalu sering kumpul dengan teman.", type: "Private" }
    ]
  },
  {
    id: 13,
    question: "Apa reaksi Anda jika pasangan memiliki hobi yang sangat mahal?",
    options: [
      { text: "Mendukung sepenuhnya selama dia bahagia.", type: "Supportive" },
      { text: "Melarang karena itu pemborosan yang tidak perlu.", type: "Restrictive" },
      { text: "Meminta dia menyeimbangkan dengan tabungan bersama.", type: "Negotiated" },
      { text: "Tidak peduli selama dia memakai uang pribadinya.", type: "Indifferent" }
    ]
  },
  {
    id: 14,
    question: "Seberapa sering Anda merasa perlu untuk 'me time' (waktu sendirian)?",
    options: [
      { text: "Sering, saya butuh banyak ruang untuk diri sendiri.", type: "High" },
      { text: "Sesekali saja saat merasa sangat lelah.", type: "Moderate" },
      { text: "Hampir tidak pernah, saya lebih suka selalu bersama.", type: "Low" },
      { text: "Tergantung pada kesibukan dan tingkat stres.", type: "Variable" }
    ]
  },
  {
    id: 15,
    question: "Bagaimana pandangan Anda tentang masa pensiun yang ideal?",
    options: [
      { text: "Hidup tenang di desa atau kota kecil yang damai.", type: "Serene" },
      { text: "Tetap aktif berbisnis atau melakukan kegiatan sosial.", type: "Active" },
      { text: "Traveling keliling dunia menikmati masa tua.", type: "Adventurous" },
      { text: "Dekat dengan anak cucu dan fokus pada keluarga.", type: "Family-oriented" }
    ]
  }
]

const testTypes = [
  {
    id: 'love-language',
    title: 'Love Language Test',
    desc: 'Cari tahu bagaimana Anda ingin dicintai dan mencintai.',
    icon: <Heart className="w-6 h-6 text-coral-500" />,
    color: 'bg-coral-50',
    questions: loveLanguageQuestions
  },
  {
    id: 'comm-style',
    title: 'Communication Style',
    desc: 'Apakah Anda tipe Asertif, Pasif, atau Agresif?',
    icon: <MessageSquare className="w-6 h-6 text-brand-500" />,
    color: 'bg-brand-50',
    questions: commStyleQuestions
  },
  {
    id: 'couple-sync',
    title: 'Couple Compatibility',
    desc: 'Seberapa sejalan visi Anda dengan pasangan?',
    icon: <Users className="w-6 h-6 text-sage-500" />,
    color: 'bg-sage-50',
    questions: coupleSyncQuestions
  }
]

const RelationshipTests = ({ onBack }) => {
  const [activeTest, setActiveTest] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const handleStartTest = (test) => {
    setActiveTest(test)
    setCurrentStep(0)
    setAnswers([])
    setShowResult(false)
  }

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)
    
    if (currentStep < activeTest.questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateResult = () => {
    const counts = {}
    answers.forEach(type => {
      counts[type] = (counts[type] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center gap-4 lg:pt-12 lg:mb-6">
        <button 
          onClick={activeTest ? () => setActiveTest(null) : onBack} 
          className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-brand-800" />
        </button>
        <h2 className="text-xl lg:text-2xl font-black text-brand-900">
          {activeTest ? activeTest.title : 'Relationship Tests'}
        </h2>
      </div>

      <div className="flex-1 px-6 py-4">
        <AnimatePresence mode="wait">
          {!activeTest ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-brand-900 rounded-3xl lg:rounded-[3rem] p-8 lg:p-12 text-white relative overflow-hidden mb-6 group shadow-xl shadow-brand-900/20">
                <div className="relative z-10 lg:max-w-2xl">
                  <Sparkles className="w-10 h-10 lg:w-16 lg:h-16 mb-6 text-brand-300" />
                  <h3 className="text-2xl lg:text-4xl font-black mb-4">Pahami Dirimu & Pasangan</h3>
                  <p className="text-brand-200 text-sm lg:text-lg font-medium leading-relaxed">
                    Kumpulan tes psikologi yang dirancang secara analitis untuk membantu Anda membangun hubungan yang lebih kuat, sehat, dan penuh pengertian.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {testTypes.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => handleStartTest(test)}
                    className="w-full p-6 lg:p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-start gap-6 hover:border-brand-900 hover:shadow-xl hover:shadow-brand-900/5 transition-all group text-left"
                  >
                    <div className={`${test.color} p-4 rounded-xl transition-transform group-hover:scale-110`}>
                      {React.cloneElement(test.icon, { className: "w-6 h-6 lg:w-8 lg:h-8" })}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg lg:text-xl font-black text-brand-900 mb-2">{test.title}</h4>
                      <p className="text-xs lg:text-sm text-slate-400 font-bold leading-relaxed">{test.desc}</p>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="p-2 bg-brand-50 rounded-full text-brand-900 opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-100 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="text-center lg:text-left">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-coral-50 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 lg:mb-8">
                      <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-coral-500 fill-coral-500" />
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-black text-brand-900 mb-3">Hasil Test Anda</h3>
                    <p className="text-slate-500 font-bold text-xs lg:text-base mb-6 lg:mb-8">
                      Berdasarkan jawaban Anda, berikut adalah profil dominan Anda dalam <span className="text-brand-900">{activeTest.title}</span>.
                    </p>

                    <div className="bg-brand-50 p-6 lg:p-8 rounded-3xl text-left border border-brand-100 mb-6 lg:mb-8">
                      <h4 className="font-black text-brand-900 text-base lg:text-lg mb-2 flex items-center gap-3">
                        <Zap className="w-4 h-4 text-brand-600" />
                        Apa artinya ini?
                      </h4>
                      <p className="text-xs lg:text-sm text-slate-600 font-medium leading-relaxed">
                        Hasil utama Anda adalah <span className="font-black text-brand-900 uppercase tracking-wider">{calculateResult()[0][0]}</span>. 
                        Gunakan hasil ini untuk lebih memahami pola komunikasi dan kebutuhan emosional Anda dalam hubungan!
                      </p>
                    </div>

                    <button 
                      onClick={() => setActiveTest(null)}
                      className="w-full bg-brand-900 text-white py-4 lg:py-5 rounded-2xl font-black shadow-xl shadow-brand-900/20 hover:scale-[1.02] transition-transform text-sm lg:text-base"
                    >
                      Ambil Tes Lainnya
                    </button>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    {calculateResult().map(([type, count], idx) => (
                      <div key={type} className="relative bg-slate-50 p-4 lg:p-6 rounded-2xl border border-slate-100">
                        <div className="flex justify-between text-[10px] lg:text-xs font-black uppercase mb-2 lg:mb-3 tracking-widest">
                          <span className={idx === 0 ? 'text-brand-900' : 'text-slate-400'}>{type}</span>
                          <span className={idx === 0 ? 'text-brand-900' : 'text-slate-400'}>{Math.round((count / answers.length) * 100)}%</span>
                        </div>
                        <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                          <motion.div 
                            className={`h-full ${idx === 0 ? 'bg-brand-900' : 'bg-slate-300'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / answers.length) * 100}%` }}
                            transition={{ delay: idx * 0.1, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-8 lg:space-y-12 py-6 lg:py-8"
            >
              <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-brand-400">
                    Question {currentStep + 1} / {activeTest.questions.length}
                  </span>
                  <span className="text-[10px] lg:text-xs font-black text-brand-900">
                    {Math.round(((currentStep + 1) / activeTest.questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="flex gap-1 h-1.5 lg:h-2">
                  {[...Array(activeTest.questions.length)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-brand-900' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>

              <h3 className="text-xl lg:text-3xl font-black text-brand-900 leading-tight lg:text-center px-4">
                {activeTest.questions[currentStep].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 px-4">
                {activeTest.questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-6 lg:p-8 text-left bg-white rounded-2xl lg:rounded-3xl border-2 border-slate-100 hover:border-brand-900 hover:bg-brand-50/30 hover:shadow-lg transition-all group flex items-center justify-between"
                  >
                    <p className="font-bold text-slate-600 group-hover:text-brand-900 text-sm lg:text-lg pr-4">{option.text}</p>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-slate-200 group-hover:border-brand-900 group-hover:bg-brand-900 flex-shrink-0 flex items-center justify-center transition-all">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RelationshipTests