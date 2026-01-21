import { 
  Home, 
  BookOpen, 
  Users, 
  User, 
  MessageCircleHeart,
  Settings,
  Bell,
  Search,
  Zap,
  Heart,
  Gamepad2,
  Building2,
  Briefcase,
  TrendingUp,
  UserCheck,
  FileText,
  LogOut,
  ShieldCheck
} from 'lucide-react'
import ElephantIcon from './ElephantIcon'

const Sidebar = ({ activeView, onNavigate, activeSegment, onSwitchMode }) => {
  const allMenuItems = {
    b2c: [
      { id: 'landing', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
      { id: 'sync', label: 'The Elephant', icon: <MessageCircleHeart className="w-5 h-5" /> },
      { id: 'rel-tests', label: 'Relationship Tests', icon: <Heart className="w-5 h-5" /> },
      { id: 'gender-translator', label: 'Gender Translator', icon: <Zap className="w-5 h-5" /> },
      { id: 'couple-games', label: 'Couple Games', icon: <Gamepad2 className="w-5 h-5" /> },
      { id: 'conflict-history', label: 'Conflict History', icon: <TrendingUp className="w-5 h-5" /> },
      { id: 'curhat', label: 'Curhat Plus', icon: <Users className="w-5 h-5" /> },
    ],
    school: [
      { id: 'landing', label: 'School Hub', icon: <Home className="w-5 h-5" /> },
      { id: 'teacher-dashboard', label: 'Dashboard Guru BK', icon: <ShieldCheck className="w-5 h-5" /> },
      { id: 'curhat', label: 'Curhat Plus (BK)', icon: <Users className="w-5 h-5" /> },
      { id: 'konseling-ai', label: 'Konseling AI', icon: <BookOpen className="w-5 h-5" /> },
      { id: 'anti-bully', label: 'Anti-Bully Bot', icon: <Bell className="w-5 h-5" /> },
      { id: 'study-buddy', label: 'Study Buddy AI', icon: <Search className="w-5 h-5" /> },
      { id: 'sync', label: 'Friendship Mediator', icon: <MessageCircleHeart className="w-5 h-5" /> },
      { id: 'school-games', label: 'Class Games', icon: <Gamepad2 className="w-5 h-5" /> },
      { id: 'eq-test', label: 'EQ Student Test', icon: <Zap className="w-5 h-5" /> },
    ],
    b2b: [
      { id: 'landing', label: 'Office Hub', icon: <Home className="w-5 h-5" /> },
      { id: 'pro-team', label: 'Team Dashboard', icon: <Building2 className="w-5 h-5" /> },
      { id: 'corporate-games', label: 'Corporate Games', icon: <Briefcase className="w-5 h-5" /> },
      { id: 'feedback-reformer', label: 'Feedback Reformer', icon: <UserCheck className="w-5 h-5" /> },
      { id: 'toxic-alert', label: 'Toxic Alert', icon: <Bell className="w-5 h-5" /> },
    ],
    freelance: [
      { id: 'landing', label: 'Client Hub', icon: <Home className="w-5 h-5" /> },
      { id: 'project-sync', label: 'Client Sync', icon: <Briefcase className="w-5 h-5" /> },
      { id: 'feedback-reformer', label: 'Professional Feedback', icon: <FileText className="w-5 h-5" /> },
    ]
  }

  const menuItems = allMenuItems[activeSegment] || []

  return (
    <div className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 h-screen sticky top-0 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-brand-900 p-2.5 rounded-2xl shadow-lg shadow-brand-900/20">
            <ElephantIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-brand-900 tracking-tight">The Elephant</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">In the Room</p>
          </div>
        </div>

        <div className="space-y-1 mb-8">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            {activeSegment === 'b2c' ? 'Personal Tools' : 
             activeSegment === 'school' ? 'School Support' : 
             activeSegment === 'b2b' ? 'Corporate Tools' : 'Freelance Tools'}
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeView === item.id 
                ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-brand-900'
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50">
          <button
            onClick={onSwitchMode}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-brand-900 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Ganti Mode</span>
          </button>
        </div>
      </div>

      <div className="mt-auto p-8 border-t border-slate-50">
        <div className="bg-slate-50 rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5 text-brand-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-brand-900 truncate">Premium User</p>
            <p className="text-[10px] font-bold text-slate-400">Manage Account</p>
          </div>
          <Settings className="w-4 h-4 text-slate-300 cursor-pointer hover:text-brand-900" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
