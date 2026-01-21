import React from 'react'
import { FileText, CheckCircle, Share2, Coffee, Sparkles, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import ElephantIcon from './ElephantIcon'

const SummaryPage = ({ data, onReset }) => {
  const summary = data || {
    issue: "Komunikasi mengenai pembagian tugas rumah tangga dan waktu berkualitas.",
    resolutions: [
      "Pihak A akan mencoba menyampaikan keluhan dengan lebih tenang menggunakan 'I Message'.",
      "Pihak B akan mendengarkan tanpa memotong pembicaraan minimal 2 menit.",
      "Keduanya sepakat untuk membuat jadwal tugas bersama di akhir pekan."
    ]
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-elephant-50 flex flex-col pb-32 lg:pb-10 lg:px-10">
      {/* Top Banner */}
      <div className="bg-elephant-900 pt-16 pb-24 lg:pt-24 lg:pb-40 px-8 text-center relative overflow-hidden lg:rounded-[4rem] lg:mt-8">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 lg:w-64 lg:h-64 border-4 lg:border-8 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 lg:w-48 lg:h-48 border-4 lg:border-8 border-white rounded-full"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <div className="bg-white/10 backdrop-blur-md w-20 h-20 lg:w-32 lg:h-32 rounded-4xl lg:rounded-[3rem] flex items-center justify-center mx-auto mb-6 lg:mb-10 border border-white/20 shadow-2xl">
            <ElephantIcon className="w-10 h-10 lg:w-16 lg:h-16 text-white" />
          </div>
          <h1 className="text-3xl lg:text-7xl font-black text-white mb-2 lg:mb-4 tracking-tight">The Peace Treaty</h1>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-8 mt-4 lg:mt-6">
            <p className="text-elephant-300 text-sm lg:text-2xl font-black">Relationship Score: {summary.score || 85}%</p>
            <div className="hidden lg:block w-2 h-2 rounded-full bg-white/20"></div>
            <p className="text-elephant-400 text-[10px] lg:text-sm font-black uppercase tracking-[0.3em]">Sentiment: {summary.sentiment || 'Positif'}</p>
          </div>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="px-6 lg:px-0 -mt-12 lg:-mt-24 pb-12 flex-1 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Treaty Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-white rounded-5xl lg:rounded-[4rem] shadow-2xl shadow-elephant-900/10 border border-elephant-100 p-8 lg:p-16 space-y-12 lg:space-y-20"
          >
            {/* Issue Section */}
            <section>
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-2 h-6 lg:h-8 bg-coral-400 rounded-full"></div>
                <h3 className="text-[10px] lg:text-xs font-black text-elephant-400 uppercase tracking-[0.3em]">INTI PERMASALAHAN</h3>
              </div>
              <p className="text-elephant-900 font-black text-xl lg:text-4xl leading-relaxed lg:leading-[1.4]">
                "{summary.issue}"
              </p>
            </section>

            {/* Resolutions */}
            <section>
              <div className="flex items-center gap-3 mb-8 lg:mb-10">
                <div className="w-2 h-6 lg:h-8 bg-sage-400 rounded-full"></div>
                <h3 className="text-[10px] lg:text-xs font-black text-elephant-400 uppercase tracking-[0.3em]">KESEPAKATAN BERSAMA</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {summary.resolutions.map((res, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex gap-5 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] bg-sage-50/50 border border-sage-100 group hover:bg-sage-50 transition-all duration-300"
                  >
                    <div className="mt-1">
                      <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-sage-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm lg:text-xl text-elephant-800 font-bold leading-relaxed">{res}</p>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* Signature Area */}
            <div className="pt-10 lg:pt-16 border-t border-elephant-50 flex justify-between gap-12 lg:gap-24">
              <div className="flex-1 text-center group">
                <div className="h-16 lg:h-24 border-b-2 border-elephant-100 flex items-center justify-center italic text-elephant-300 font-serif text-2xl lg:text-5xl mb-4 group-hover:text-elephant-900 transition-colors">
                  Pihak A
                </div>
                <span className="text-[10px] lg:text-xs font-black text-elephant-300 uppercase tracking-[0.3em]">Tanda Tangan Digital</span>
              </div>
              <div className="flex-1 text-center group">
                <div className="h-16 lg:h-24 border-b-2 border-elephant-100 flex items-center justify-center italic text-elephant-300 font-serif text-2xl lg:text-5xl mb-4 group-hover:text-elephant-900 transition-colors">
                  Pihak B
                </div>
                <span className="text-[10px] lg:text-xs font-black text-elephant-300 uppercase tracking-[0.3em]">Tanda Tangan Digital</span>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area: Strategy & Actions */}
          <div className="lg:w-96 space-y-8">
            {/* Safe Exit Strategy */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-elephant-900 to-elephant-950 p-8 lg:p-10 rounded-5xl lg:rounded-[3rem] text-white shadow-2xl shadow-elephant-900/20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Coffee className="w-6 h-6 text-elephant-300" />
                  </div>
                  <h4 className="font-black text-sm lg:text-base uppercase tracking-widest">Safe Exit Strategy</h4>
                </div>
                <p className="text-elephant-200 text-sm lg:text-base leading-relaxed mb-8 font-bold">
                  Tensi sudah mereda. AI menyarankan Anda untuk lanjut berbicara langsung secara santai. Gunakan kalimat pembuka ini:
                </p>
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 italic text-base lg:text-xl text-white font-bold relative group">
                  <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-400 animate-pulse" />
                  "Terima kasih sudah mau mendengarkan hari ini. Aku sangat menghargai usaha kita untuk bicara lebih baik."
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <motion.button 
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-4 bg-white text-elephant-900 py-6 rounded-[2rem] font-black text-sm lg:text-base shadow-xl shadow-elephant-900/5 border border-elephant-100 hover:bg-elephant-50 transition-all uppercase tracking-[0.2em]"
              >
                <Share2 className="w-5 h-5 lg:w-6 lg:h-6" />
                Download Treaty PDF
              </motion.button>
              <motion.button 
                whileHover={{ y: -4, scale: 1.02, backgroundColor: "#000" }}
                whileTap={{ scale: 0.98 }}
                onClick={onReset}
                className="flex items-center justify-center gap-4 bg-elephant-900 text-white py-6 rounded-[2rem] font-black text-sm lg:text-base shadow-2xl shadow-elephant-900/20 hover:bg-black transition-all uppercase tracking-[0.2em]"
              >
                <Home className="w-5 h-5 lg:w-6 lg:h-6" />
                Back to Home
              </motion.button>
            </div>
            
            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-elephant-100 text-center">
              <ElephantIcon className="w-8 h-8 text-elephant-200 mx-auto mb-4" />
              <p className="text-[10px] font-black text-elephant-300 uppercase tracking-widest">Elephant Room • AI Conflict Resolution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
