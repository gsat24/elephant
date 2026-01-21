import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import SyncSession from './components/SyncSession'
import ChatSession from './components/ChatSession'
import SummaryPage from './components/SummaryPage'
import EQTest from './components/EQTest'
import CommPractice from './components/CommPractice'
import ProTeamDashboard from './components/ProTeamDashboard'
import CoupleGames from './components/CoupleGames'
import CorporateGames from './components/CorporateGames'
import CurhatPlus from './components/CurhatPlus'
import KonselingAI from './components/KonselingAI'
import AntiBullyBot from './components/AntiBullyBot'
import StudyBuddy from './components/StudyBuddy'
import GenderTranslator from './components/GenderTranslator'
import ConflictHistory from './components/ConflictHistory'
import FeedbackReformer from './components/FeedbackReformer'
import ToxicAlert from './components/ToxicAlert'
import ProjectSync from './components/ProjectSync'
import RelationshipTests from './components/RelationshipTests'
import ToxicTest from './components/ToxicTest'
import ProblemSolvingTest from './components/ProblemSolvingTest'
import SelfImprovement from './components/SelfImprovement'
import SchoolGames from './components/SchoolGames'
import TeacherDashboard from './components/TeacherDashboard'
import FloatingElephant from './components/FloatingElephant'
import Sidebar from './components/Sidebar'
import CategorySelector from './components/CategorySelector'
import { Bell, Search, User, ShieldCheck, Lock } from 'lucide-react'

// Force refresh - Elephant Mediator App
function App() {
  const [view, setView] = useState('landing')
  const [activeSegment, setActiveSegment] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSchoolCodeValid, setIsSchoolCodeValid] = useState(false)
  const [showSchoolCodeModal, setShowSchoolCodeModal] = useState(false)
  const [pendingView, setPendingView] = useState(null)
  const [schoolCode, setSchoolCode] = useState('')

  useEffect(() => {
    console.log("App Component Mounted - Safari Check");
  }, []);

  const navigateTo = (newView, data = null) => {
    // Check if navigating to school features and code is not valid
    const schoolFeatures = ['curhat', 'konseling-ai', 'anti-bully', 'study-buddy', 'school-games', 'teacher-dashboard', 'sync']
    
    if (activeSegment === 'school' && schoolFeatures.includes(newView) && !isSchoolCodeValid) {
      setPendingView({ view: newView, data })
      setShowSchoolCodeModal(true)
      return
    }

    setIsLoading(true)
    // Simulate loading for better UX feedback
    setTimeout(() => {
      setView(newView)
      if (data) setSessionData(data)
      window.scrollTo(0, 0)
      setIsLoading(false)
    }, 400)
  }

  const validateSchoolCode = () => {
    if (schoolCode.length === 6) {
      setIsSchoolCodeValid(true)
      setShowSchoolCodeModal(false)
      if (pendingView) {
        navigateTo(pendingView.view, pendingView.data)
      }
    } else {
      alert("Kode Sekolah harus 6 karakter!")
    }
  }

  // If no segment selected, show selector
  if (!activeSegment) {
    return <CategorySelector onSelect={(seg) => setActiveSegment(seg)} />
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-brand-900 font-sans flex">
      {/* School Code Modal */}
      {showSchoolCodeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Lock className="w-32 h-32 text-brand-900" />
            </div>

            <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10">
              <ShieldCheck className="w-8 h-8 text-brand-900" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-brand-900 mb-2">Akses Terbatas</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                Silakan masukkan 6 digit Kode Sekolah untuk mengakses fitur School Support ini.
              </p>

              <div className="space-y-6">
                <input
                  type="text"
                  maxLength={6}
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                  placeholder="CONTOH: SCH123"
                  className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black tracking-[0.3em] text-center focus:outline-none focus:border-brand-900 focus:ring-4 focus:ring-brand-900/5 transition-all"
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSchoolCodeModal(false)}
                    className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all uppercase tracking-wider text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={validateSchoolCode}
                    className="flex-[2] py-5 bg-brand-900 hover:bg-brand-800 text-white font-black rounded-2xl transition-all shadow-xl shadow-brand-900/20 uppercase tracking-wider text-sm"
                  >
                    Verifikasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar for Desktop */}
      <Sidebar 
        activeView={view} 
        onNavigate={navigateTo} 
        activeSegment={activeSegment}
        onSwitchMode={() => setActiveSegment(null)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-10 py-6 bg-[#F8FAFC]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tools, analytics, or tips..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-brand-900 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-brand-50 rounded-xl flex items-center gap-2 border border-brand-100">
              <div className={`w-2 h-2 rounded-full ${
                activeSegment === 'b2c' ? 'bg-rose-500' : 
                activeSegment === 'school' ? 'bg-blue-500' : 
                activeSegment === 'b2b' ? 'bg-brand-900' : 'bg-amber-500'
              }`}></div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-900">
                {activeSegment === 'b2c' ? 'Personal Mode' : 
                 activeSegment === 'school' ? 'School Mode' : 
                 activeSegment === 'b2b' ? 'Corporate Mode' : 'Freelance Mode'}
              </span>
            </div>

            <button className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-brand-900 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-3 pl-2 pr-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:border-brand-900 transition-all">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 font-black">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-brand-900">User Profile</p>
                <p className="text-[10px] font-bold text-slate-400">Pro Member</p>
              </div>
            </button>
          </div>
        </div>

        {/* View Content */}
        <main className="flex-1 overflow-x-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F8FAFC]/50 backdrop-blur-sm transition-all">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-900 rounded-full animate-spin"></div>
                <p className="text-xs font-black text-brand-900 uppercase tracking-widest animate-pulse">Memuat...</p>
              </div>
            </div>
          )}
          {view === 'landing' && (
            <LandingPage 
              onNavigate={navigateTo} 
              activeSegment={activeSegment} 
              onSwitchMode={() => setActiveSegment(null)}
            />
          )}
          {view === 'sync' && <SyncSession onJoined={(role, code) => navigateTo('chat', { role, code })} onBack={() => navigateTo('landing')} />}
          {view === 'chat' && <ChatSession role={sessionData?.role || 'A'} roomCode={sessionData?.code} onEnd={(summary) => navigateTo('summary', summary)} />}
          {view === 'summary' && <SummaryPage data={sessionData} onReset={() => navigateTo('landing')} />}
          {view === 'eq-test' && <EQTest onBack={() => navigateTo('landing')} />}
          {view === 'comm-practice' && <CommPractice onBack={() => navigateTo('landing')} />}
          {view === 'pro-team' && <ProTeamDashboard onBack={() => navigateTo('landing')} />}
          {view === 'couple-games' && <CoupleGames onBack={() => navigateTo('landing')} />}
          {view === 'corporate-games' && <CorporateGames onBack={() => navigateTo('landing')} />}
          {view === 'curhat' && <CurhatPlus onBack={() => navigateTo('landing')} />}
          {view === 'konseling-ai' && <KonselingAI onBack={() => navigateTo('landing')} />}
          {view === 'anti-bully' && <AntiBullyBot onBack={() => navigateTo('landing')} />}
          {view === 'study-buddy' && <StudyBuddy onBack={() => navigateTo('landing')} />}
          {view === 'gender-translator' && <GenderTranslator onBack={() => navigateTo('landing')} />}
          {view === 'conflict-history' && <ConflictHistory onBack={() => navigateTo('landing')} />}
          {view === 'feedback-reformer' && <FeedbackReformer onBack={() => navigateTo('landing')} />}
          {view === 'toxic-alert' && <ToxicAlert onBack={() => navigateTo('landing')} />}
          {view === 'project-sync' && <ProjectSync onBack={() => navigateTo('landing')} />}
          {view === 'rel-tests' && <RelationshipTests onBack={() => navigateTo('landing')} />}
          {view === 'toxic-test' && <ToxicTest onBack={() => navigateTo('landing')} />}
          {view === 'problem-solving' && <ProblemSolvingTest onBack={() => navigateTo('landing')} />}
          {view === 'self-improvement' && <SelfImprovement onBack={() => navigateTo('landing')} />}
          {view === 'school-games' && <SchoolGames onBack={() => navigateTo('landing')} />}
          {view === 'teacher-dashboard' && <TeacherDashboard onBack={() => navigateTo('landing')} />}
        </main>
        
        {/* The Elephant Mascot */}
        <FloatingElephant />
      </div>
    </div>
  )
}

export default App
