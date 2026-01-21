import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  Search, 
  Calendar,
  Filter,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Brain,
  FileText,
  Download,
  Share2,
  PieChart,
  Activity,
  User
} from 'lucide-react'

const TeacherDashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [reports, setReports] = useState([
    { id: 1, type: 'Bullying', student: 'Rizky Amalia', date: '2 jam yang lalu', priority: 'High', summary: 'Terindikasi adanya pengucilan di kelas XII-A berdasarkan pola percakapan Chat Plus.' },
    { id: 2, type: 'Stress Akademik', student: 'Budi Santoso', date: '5 jam yang lalu', priority: 'Medium', summary: 'Kekhawatiran berlebih terhadap ujian masuk universitas. Memerlukan bimbingan karir.' },
    { id: 3, type: 'Masalah Keluarga', student: 'Siti Sarah', date: 'Yesterday', priority: 'Low', summary: 'Mencurahkan masalah komunikasi dengan orang tua. AI memberikan saran mediasi dasar.' }
  ])

  const stats = [
    { label: 'Total Siswa', value: '1,240', icon: <Users className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Laporan Bullying', value: reports.filter(r => r.type === 'Bullying').length.toString(), icon: <ShieldAlert className="w-5 h-5" />, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Sesi Curhat AI', value: '45', icon: <MessageSquare className="w-5 h-5" />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Indeks Kebahagiaan', value: '82%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  const generateReport = () => {
    const students = ['Daffa Ramadhan', 'Aisyah Putri', 'Kevin Sanjaya', 'Tiara Andini']
    const types = ['Bullying', 'Stress Akademik', 'Masalah Keluarga', 'Burnout']
    const priorities = ['High', 'Medium', 'Low']
    const summaries = [
      'Terdeteksi penggunaan kata-kata kasar berulang di grup chat kelas XI-B.',
      'Siswa menunjukkan gejala stress berat menjelang ujian tengah semester.',
      'Perubahan pola perilaku yang signifikan, cenderung menarik diri dari lingkungan sosial.',
      'Mengeluhkan kurangnya waktu istirahat karena jadwal ekstrakurikuler yang padat.'
    ]

    const newReport = {
      id: Date.now(),
      type: types[Math.floor(Math.random() * types.length)],
      student: students[Math.floor(Math.random() * students.length)],
      date: 'Baru saja',
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      summary: summaries[Math.floor(Math.random() * summaries.length)]
    }

    setReports([newReport, ...reports])
  }

  const aiInsights = [
    { title: 'Tren Bullying Mingguan', trend: 'down', value: '-12%', desc: 'Kasus bullying terdeteksi menurun setelah implementasi Class Games minggu lalu.' },
    { title: 'Topik Curhat Terpopuler', trend: 'up', value: 'Akademik', desc: '50% siswa mengeluhkan beban tugas di hari Rabu.' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Dashboard */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-900 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">BK Dashboard</span>
              <span className="text-slate-400 text-xs font-bold">SMA Nusantara Jakarta</span>
            </div>
            <h1 className="text-2xl font-black text-brand-900">Selamat Pagi, Guru BK 👋</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={generateReport}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-900 border border-brand-100 rounded-xl text-sm font-bold hover:bg-brand-100 transition-all"
            >
              <Brain className="w-4 h-4" />
              Simulasi Analisis AI
            </button>
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari siswa atau laporan..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-brand-900 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-900 text-white rounded-xl text-sm font-bold hover:bg-brand-800 transition-all">
              <Download className="w-4 h-4" />
              Export Laporan
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  {stat.icon}
                </div>
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="text-3xl font-black text-brand-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Reports Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit">
              {['overview', 'bullying', 'mental-health', 'academic'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-500 hover:text-brand-900'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* AI Reports List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-brand-900 uppercase tracking-tight">Analisis AI Terbaru</h3>
                <button className="text-xs font-bold text-brand-900 flex items-center gap-1 hover:underline">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {reports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">
                        {report.student.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-brand-900">{report.student}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                            report.type === 'Bullying' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                          }`}>
                            {report.type}
                          </span>
                          <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      report.priority === 'High' ? 'bg-rose-600 text-white' : 
                      report.priority === 'Medium' ? 'bg-amber-500 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                    {report.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-black">
                          AI
                        </div>
                      ))}
                      <span className="pl-4 text-[10px] font-bold text-slate-400 italic">Dianalisis oleh AI Mediator</span>
                    </div>
                    <button className="flex items-center gap-2 text-brand-900 font-black text-xs hover:gap-4 transition-all">
                      Lihat Detail <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-8">
            <div className="bg-brand-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="w-20 h-20" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4">AI Summary</h3>
                <p className="text-brand-200 text-sm font-medium leading-relaxed mb-6">
                  Secara keseluruhan, kesehatan mental siswa minggu ini stabil. Namun, ada peningkatan diskusi mengenai "Kecemasan Ujian" sebesar 15%.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-brand-300 uppercase tracking-widest mb-1">Rekomendasi AI</p>
                    <p className="text-xs font-bold">Lakukan sesi relaksasi singkat sebelum jam pelajaran pertama hari Rabu.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-brand-900 mb-6 uppercase tracking-tight">Indikator AI</h3>
              <div className="space-y-6">
                {aiInsights.map((insight, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{insight.title}</span>
                      <span className={`text-xs font-black ${insight.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {insight.value}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">{insight.desc}</p>
                    <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${insight.trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: '65%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onBack}
              className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 font-black uppercase tracking-widest hover:border-brand-900 hover:text-brand-900 transition-all text-xs"
            >
              Kembali ke Menu Utama
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard