import React from 'react'
import { motion } from 'framer-motion'
import { Heart, BookOpen, Building2, Briefcase, ArrowRight } from 'lucide-react'
import ElephantIcon from './ElephantIcon'

const CategorySelector = ({ onSelect }) => {
  const categories = [
    { 
      id: 'b2c', 
      label: 'Personal', 
      desc: 'Selesaikan konflik personal & asmara', 
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50'
    },
    { 
      id: 'school', 
      label: 'School', 
      desc: 'Teman curhat & solusi masalah sekolah', 
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50'
    },
    { 
      id: 'b2b', 
      label: 'Corporate', 
      desc: 'Bangun lingkungan kerja anti-toxic', 
      icon: <Building2 className="w-8 h-8" />,
      color: 'bg-brand-900',
      lightColor: 'bg-brand-50'
    },
    { 
      id: 'freelance', 
      label: 'Freelance', 
      desc: 'Kendalikan hubungan klien profesional', 
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50'
    }
  ]

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col items-center justify-start md:justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto py-12 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="bg-brand-900 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl shadow-brand-900/20">
            <ElephantIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-brand-900 mb-2 md:mb-4 tracking-tight">The Elephant in the Room</h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm max-w-md mx-auto px-4">Pilih mode aplikasi yang sesuai dengan kebutuhanmu saat ini.</p>
        </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl w-full">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(cat.id)}
            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 transition-all border border-slate-100 group text-left relative overflow-hidden"
          >
            <div className={`${cat.lightColor} w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
              <div className="text-brand-900 scale-75 md:scale-100">{cat.icon}</div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-brand-900 mb-2">{cat.label}</h3>
            <p className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed mb-6 md:mb-8">{cat.desc}</p>
            
            <div className="flex items-center gap-2 text-brand-900 font-black text-sm group-hover:gap-4 transition-all">
              Buka Aplikasi <ArrowRight className="w-4 h-4" />
            </div>

            <div className={`absolute top-0 right-0 w-24 h-24 ${cat.color} opacity-[0.03] rounded-bl-full`}></div>
          </motion.button>
        ))}
      </div>

      <p className="mt-12 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        © 2026 THE ELEPHANT IN THE ROOM • MEDIATOR AI
      </p>
      </div>
    </div>
  )
}

export default CategorySelector
