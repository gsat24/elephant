import React from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  Users2, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Zap, 
  MessageSquare,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react'

const ProTeamDashboard = ({ onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center gap-6 lg:mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-brand-900 transition-all">
          <ChevronLeft className="w-6 h-6 text-brand-800" />
        </button>
        <div>
          <h2 className="text-2xl lg:text-4xl font-black text-brand-900 leading-tight">Professional Dashboard</h2>
          <p className="text-xs lg:text-base font-bold text-slate-400 uppercase tracking-widest mt-1">Team & Corporate Analysis</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Team Health Overview */}
            <div className="lg:col-span-2 bg-brand-900 rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-brand-300 block mb-4">Team Health Index</span>
                    <h3 className="text-6xl lg:text-8xl font-black">84%</h3>
                  </div>
                  <div className="bg-white/10 p-4 lg:p-6 rounded-[2rem] backdrop-blur-xl border border-white/10">
                    <TrendingUp className="w-8 h-8 lg:w-12 lg:h-12 text-sage-400" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm lg:text-lg font-black">
                    <span className="text-brand-200">Current Morale Status</span>
                    <span className="text-sage-400 uppercase tracking-widest">Good Condition</span>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "84%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-sage-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" 
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            </div>

            {/* Integration Section */}
            <div className="bg-white p-10 lg:p-12 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="bg-brand-50 p-4 rounded-[1.5rem]">
                    <LayoutDashboard className="w-8 h-8 text-brand-900" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-brand-900">Slack Integration</h4>
                    <p className="text-xs font-black text-sage-600 uppercase tracking-widest mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></span>
                      Connected
                    </p>
                  </div>
                </div>
                <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed mb-8">
                  Monitoring 12 active channels for sentiment and toxic behavior analysis.
                </p>
              </div>
              <button className="w-full py-5 bg-slate-50 rounded-2xl text-sm font-black text-brand-900 hover:bg-brand-900 hover:text-white transition-all border border-slate-100">
                Configure Webhooks
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Critical Alerts */}
            <div className="space-y-6">
              <h4 className="text-xl font-black text-brand-900 px-2 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-coral-500" />
                Critical Alerts
              </h4>
              <div className="bg-coral-50 border-2 border-coral-100 p-8 rounded-[2.5rem] flex flex-col gap-6 relative overflow-hidden group">
                <div className="flex gap-4 items-center">
                  <div className="bg-coral-100 p-3 rounded-2xl h-fit">
                    <Zap className="w-6 h-6 text-coral-600" />
                  </div>
                  <h5 className="font-black text-coral-900 text-lg">High Tension Detected</h5>
                </div>
                <p className="text-base text-coral-700 font-medium leading-relaxed">
                  Channel #marketing-ops menunjukkan indikasi konflik kepentingan yang meningkat dalam 24 jam terakhir.
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-coral-200/20 rounded-full -mr-12 -mb-12 blur-2xl group-hover:scale-150 transition-transform"></div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard 
                icon={<Users2 className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />}
                title="Group Mediation"
                value="3 Active Sessions"
                desc="Selesaikan konflik tim secara terarah dengan bantuan AI."
              />
              <StatCard 
                icon={<BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />}
                title="Sentiment Map"
                value="Stable Condition"
                desc="Analisis emosi grup secara real-time dari riwayat chat."
              />
              <StatCard 
                icon={<ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />}
                title="Culture Guard"
                value="System Enabled"
                desc="Blokir otomatis dan peringatan bahasa toxic di tempat kerja."
              />
              <StatCard 
                icon={<MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />}
                title="Anonymous Feedback"
                value="12 New Responses"
                desc="Dengarkan keluhan karyawan tanpa rasa takut akan intimidasi."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value, desc }) => (
  <motion.div 
    whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-brand-900 transition-all h-full flex flex-col justify-between"
  >
    <div>
      <div className="bg-brand-50 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h5 className="text-xs lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{title}</h5>
      <div className="text-xl lg:text-2xl font-black text-brand-900 mb-4 leading-tight">{value}</div>
    </div>
    <p className="text-sm font-bold text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
)

export default ProTeamDashboard
