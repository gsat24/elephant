import { useState } from 'react'
import { 
  Bell, 
  Home, 
  FileText, 
  Users2, 
  User, 
  ChevronRight,
  MessageCircleHeart,
  Briefcase,
  UserCheck,
  Zap,
  Flame,
  UserCircle2,
  MessageSquareText,
  Building2,
  TrendingUp,
  Heart,
  BookOpen,
  Users,
  Gamepad2,
  ArrowRight,
  LogOut,
  ChevronDown,
  LayoutGrid,
  ShieldCheck,
  Lock
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ElephantIcon from './ElephantIcon'

const LandingPage = ({ onNavigate, activeSegment, onSwitchMode }) => {
  const [showAllTools, setShowAllTools] = useState(false)

  const segments = [
    { id: 'b2c', label: 'Personal', icon: <Heart className="w-4 h-4" /> },
    { id: 'school', label: 'School', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'b2b', label: 'Corporate', icon: <Building2 className="w-4 h-4" /> },
    { id: 'freelance', label: 'Freelance', icon: <Briefcase className="w-4 h-4" /> }
  ]

  const handleComingSoon = (feature) => {
    alert(`${feature} akan segera hadir! Kami sedang menyiapkan AI terbaik untuk fitur ini.`)
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header - Mobile Only */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4 flex justify-between items-center lg:hidden"
      >
        <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">
          <ElephantIcon className="w-5 h-5 text-brand-800" />
        </div>
        <button 
          onClick={onSwitchMode}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-600"
        >
          Ganti Mode
        </button>
        <div className="relative">
          <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">
            <Bell className="w-5 h-5 text-brand-800" />
          </div>
        </div>
      </motion.div>

      {/* Greeting Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 py-4 lg:py-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6"
      >
        <div>
          <h1 className="text-2xl lg:text-4xl font-black text-brand-900 tracking-tight">
            {activeSegment === 'b2c' ? 'Personal Mediator' : 
             activeSegment === 'school' ? 'School Support' :
             activeSegment === 'b2b' ? 'Corporate Mediator' : 
             'Freelance Manager'}
          </h1>
          <p className="text-slate-400 font-bold text-xs lg:text-lg mt-3 lg:mt-4">
            {activeSegment === 'b2c' ? 'Selesaikan konflik personal dengan AI.' : 
             activeSegment === 'school' ? 'Teman curhat dan solusi masalah sekolahmu.' :
             activeSegment === 'b2b' ? 'Bangun lingkungan kerja anti-toxic.' : 
             'Kendalikan hubungan klien secara profesional.'}
          </p>
        </div>

        {/* Desktop Switch Mode Button */}
        <div className="hidden lg:block">
          <button
            onClick={onSwitchMode}
            className="flex items-center gap-4 px-8 py-4 bg-white rounded-[2rem] text-sm font-black uppercase tracking-wider text-slate-400 hover:text-brand-900 hover:bg-slate-50 transition-all border border-slate-100 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Ganti Mode Aplikasi
          </button>
        </div>
      </motion.div>

      {/* EQ Tools Section - Now Landscape & At Top */}
      <div className="px-6 py-4 lg:px-0 mt-4 lg:mt-6">
        <div className="bg-brand-900 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-2xl shadow-brand-900/20 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-6 lg:mb-10">
              <div className="lg:max-w-md">
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <span className="bg-white/10 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20">
                    EQ Tools
                  </span>
                  <button 
                    onClick={() => setShowAllTools(!showAllTools)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-[9px] lg:text-[10px] font-black uppercase tracking-wider text-white transition-all"
                  >
                    {showAllTools ? 'Hide All' : 'View All'}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAllTools ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <h2 className="text-lg lg:text-2xl font-black text-white leading-tight">Tingkatkan kecerdasan emosional</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 flex-1">
                <ToolButton 
                  onClick={() => onNavigate('eq-test')}
                  icon={<Flame className="w-5 h-5 text-coral-400 lg:w-6 lg:h-6" />} 
                  label="EQ Test" 
                  desc="Cek Skor Emosional"
                />
                <ToolButton 
                  onClick={() => onNavigate('toxic-test')}
                  icon={<Zap className="w-5 h-5 text-rose-400 lg:w-6 lg:h-6" />} 
                  label="Toxic Test" 
                  desc="Cek Level Toxicity-mu"
                />
                <ToolButton 
                  onClick={() => onNavigate('problem-solving')}
                  icon={<LayoutGrid className="w-5 h-5 text-blue-400 lg:w-6 lg:h-6" />} 
                  label="Problem Solving" 
                  desc="Tes Solusi Masalah"
                />
              </div>
            </div>

            {/* Expanded Tool List */}
            <AnimatePresence>
              {showAllTools && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 lg:pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <ToolButton 
                      onClick={() => onNavigate('self-improvement')}
                      icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-400 lg:w-5 lg:h-5" />} 
                      label="Self Improvement" 
                      desc="Program & Quiz Harian"
                    />
                    <ToolButton 
                      onClick={() => onNavigate('rel-tests')}
                      icon={<Heart className="w-3.5 h-3.5 text-brand-300 lg:w-5 lg:h-5" />} 
                      label="Relationship" 
                      desc="Love & Compatibility"
                    />
                    <ToolButton 
                      onClick={() => onNavigate('comm-practice')}
                      icon={<UserCircle2 className="w-3.5 h-3.5 text-sage-400 lg:w-5 lg:h-5" />} 
                      label="Comm Practice" 
                      desc="Latihan Komunikasi AI"
                    />
                    <ToolButton 
                      onClick={() => handleComingSoon('Personality Deep Dive')}
                      icon={<LayoutGrid className="w-3.5 h-3.5 text-purple-400 lg:w-5 lg:h-5" />} 
                      label="Personality" 
                      desc="Analisis Karakter Mendalam"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-[100px] group-hover:scale-125 transition-transform duration-1000 pointer-events-none"></div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:gap-12 mt-8 lg:mt-16">
        {/* Features & Trending */}
        <div className="flex-1 lg:py-4">
          {/* Dynamic Features Based on Segment */}
          <div className="px-6 lg:px-0 py-4">
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              <h3 className="text-xl lg:text-2xl font-black text-brand-900 tracking-tight">
                Layanan {segments.find(s => s.id === activeSegment)?.label || ''}
              </h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSegment}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
              >
                {activeSegment === 'b2c' && (
                  <>
                    <FeatureCard 
                      onClick={() => onNavigate('sync')}
                      icon={<MessageCircleHeart className="w-6 h-6 text-brand-900" />}
                      title="The Elephant"
                      subtitle="Mediator AI Pasangan"
                      tag="Core"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('couple-games')}
                      icon={<Gamepad2 className="w-6 h-6 text-brand-900" />}
                      title="Couple Games"
                      subtitle="Truth, Dare, & Quiz"
                      tag="Fun"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('gender-translator')}
                      icon={<Zap className="w-6 h-6 text-brand-900" />}
                      title="Gender Translator"
                      subtitle="Terjemahkan 'Terserah'"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('conflict-history')}
                      icon={<TrendingUp className="w-6 h-6 text-brand-900" />}
                      title="Conflict History"
                      subtitle="Analisis Tren Konflik"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('curhat')}
                      icon={<Users2 className="w-6 h-6 text-brand-900" />}
                      title="Curhat Plus"
                      subtitle="Dukungan Emosional AI"
                    />
                  </>
                )}

                {activeSegment === 'school' && (
                  <>
                    <FeatureCard 
                      onClick={() => onNavigate('curhat')}
                      icon={<Users2 className="w-6 h-6 text-brand-900" />}
                      title="Curhat Plus (BK)"
                      subtitle="Teman Cerita Masalah Sekolah"
                      tag="Popular"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('konseling-ai')}
                      icon={<BookOpen className="w-6 h-6 text-brand-900" />}
                      title="Konseling AI"
                      subtitle="Bimbingan Karir & Akademik"
                      tag="New"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('sync')}
                      icon={<MessageCircleHeart className="w-6 h-6 text-brand-900" />}
                      title="Friendship Mediator"
                      subtitle="Mediasi Konflik Pertemanan"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('school-games')}
                      icon={<Gamepad2 className="w-6 h-6 text-brand-900" />}
                      title="School Games"
                      subtitle="Stress Games, Trivia, & Fun"
                      tag="Fun"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('anti-bully')}
                      icon={<Bell className="w-6 h-6 text-brand-900" />}
                      title="Anti-Bully Bot"
                      subtitle="Lapor & Solusi Bullying"
                      tag="Safe"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('study-buddy')}
                      icon={<Users className="w-6 h-6 text-brand-900" />}
                      title="Study Buddy"
                      subtitle="Cari Teman Belajar Sesuai EQ"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('teacher-dashboard')}
                      icon={<ShieldCheck className="w-6 h-6 text-brand-900" />}
                      title="Dashboard Guru BK"
                      subtitle="Analisis Laporan & Statistik AI"
                      tag="Teacher Only"
                    />
                  </>
                )}

                {activeSegment === 'b2b' && (
                  <>
                    <FeatureCard 
                      onClick={() => onNavigate('pro-team')}
                      icon={<Building2 className="w-6 h-6 text-brand-900" />}
                      title="Team Dashboard"
                      subtitle="Analisis Kesehatan Tim"
                      tag="Pro"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('corporate-games')}
                      icon={<Gamepad2 className="w-6 h-6 text-brand-900" />}
                      title="Team Games"
                      subtitle="Ice Breaking & Trivia"
                      tag="Fun"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('feedback-reformer')}
                      icon={<UserCheck className="w-6 h-6 text-brand-900" />}
                      title="Feedback Reformer"
                      subtitle="Ubah Komplain Jadi Saran"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('toxic-alert')}
                      icon={<Bell className="w-6 h-6 text-brand-900" />}
                      title="Toxic Alert"
                      subtitle="Deteksi Dini Red Flags"
                    />
                  </>
                )}

                {activeSegment === 'freelance' && (
                  <>
                    <FeatureCard 
                      onClick={() => onNavigate('project-sync')}
                      icon={<Briefcase className="w-6 h-6 text-brand-900" />}
                      title="Client Sync"
                      subtitle="Kelola Ekspektasi Klien"
                      tag="Biz"
                    />
                    <FeatureCard 
                      onClick={() => onNavigate('feedback-reformer')}
                      icon={<FileText className="w-6 h-6 text-brand-900" />}
                      title="Professional Feedback"
                      subtitle="Ubah Kritik Klien Jadi Solusi"
                    />
                    <FeatureCard 
                      onClick={() => handleComingSoon('Contract Mediator')}
                      icon={<FileText className="w-6 h-6 text-brand-900" />}
                      title="Contract Mediator"
                      subtitle="Negosiasi Syarat & Ketentuan"
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trending Discussions */}
          <div className="px-6 lg:px-0 py-4 mt-8 lg:mt-12">
            <h3 className="text-xl lg:text-2xl font-black text-brand-900 tracking-tight mb-6 lg:mb-8">Trending Discussions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 flex items-center gap-4 lg:gap-6 hover:border-brand-900 transition-all cursor-pointer shadow-sm group">
                <div className="bg-brand-50 p-4 lg:p-5 rounded-2xl group-hover:scale-110 transition-transform">
                  <MessageSquareText className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />
                </div>
                <div className="flex-1">
                  <h5 className="text-base lg:text-lg font-black text-brand-900">Cara menghadapi bos toxic?</h5>
                  <p className="text-xs lg:text-sm text-slate-400 font-bold">1.2k members discussing</p>
                </div>
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-slate-300" />
              </div>
              <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 flex items-center gap-4 lg:gap-6 hover:border-brand-900 transition-all cursor-pointer shadow-sm group">
                <div className="bg-brand-50 p-4 lg:p-5 rounded-2xl group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-coral-500" />
                </div>
                <div className="flex-1">
                  <h5 className="text-base lg:text-lg font-black text-brand-900">Membangun trust setelah konflik</h5>
                  <p className="text-xs lg:text-sm text-slate-400 font-bold">850 members discussing</p>
                </div>
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden on Desktop */}
      <div className="fixed bottom-8 left-6 right-6 z-50 lg:hidden">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-2xl shadow-brand-900/10 border border-white/50 flex justify-between items-center relative">
          <button 
            onClick={() => onNavigate('landing')}
            className={`p-4 rounded-2xl transition-all ${activeSegment ? 'text-brand-900 bg-brand-50' : 'text-slate-300'}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => onNavigate('konseling-ai')}
            className="p-4 text-slate-300 hover:text-brand-400 transition-all"
          >
            <BookOpen className="w-6 h-6" />
          </button>
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <motion.button 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('sync')}
              className="bg-brand-900 text-white p-5 rounded-full shadow-2xl shadow-brand-900/40 border-4 border-[#F8FAFC]"
            >
              <ElephantIcon className="w-7 h-7" />
            </motion.button>
          </div>

          <button 
            onClick={() => onNavigate('curhat')}
            className="p-4 text-slate-300 hover:text-brand-400 transition-all"
          >
            <Users className="w-6 h-6" />
          </button>
          <button 
            onClick={() => onSwitchMode()}
            className="p-4 text-slate-300 hover:text-brand-400 transition-all"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

const ToolButton = ({ icon, label, desc, onClick, showFull = true }) => (
     <button 
       onClick={onClick}
       className="bg-white/10 hover:bg-white/20 p-4 lg:p-6 rounded-[2rem] flex flex-col items-center text-center gap-3 transition-all border border-white/20 group w-full"
     >
       <div className="transition-transform group-hover:scale-110 bg-white/20 p-3 lg:p-4 rounded-2xl shrink-0">
         {icon}
       </div>
       {showFull && (
         <div className="flex flex-col items-center w-full">
           <p className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider mb-1">{label}</p>
           <p className="text-[11px] lg:text-xs font-bold text-brand-200 leading-tight">{desc}</p>
         </div>
       )}
     </button>
   )
  
  const FeatureCard = ({ icon, title, subtitle, tag, onClick }) => (
    <motion.div 
      whileHover={{ y: -4, shadow: "0 15px 20px -5px rgb(0 0 0 / 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[11rem] lg:min-h-[13rem] cursor-pointer relative overflow-hidden group transition-all duration-300"
    >
      {tag && (
        <div className="absolute top-4 right-4 lg:top-5 lg:right-5">
          <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
            {tag}
          </span>
        </div>
      )}
  
      <div>
        <div className="flex justify-between items-start mb-3 lg:mb-4">
          <div className="bg-brand-50 p-2.5 lg:p-3 rounded-xl transition-transform group-hover:scale-110 duration-500">
            {icon}
          </div>
        </div>
        <h4 className="text-sm lg:text-base font-black text-brand-900 leading-tight mb-1">{title}</h4>
        <p className="text-[10px] lg:text-xs font-bold text-slate-400 leading-snug">{subtitle}</p>
      </div>
      
      <div className="flex justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-2 text-brand-900 font-black text-[9px] lg:text-[10px] uppercase tracking-wider">
          Explore <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        </div>
      </div>
    </motion.div>
  )

export default LandingPage
