import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElephantIcon from './ElephantIcon';

const FloatingElephant = () => {
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const quotes = [
    "Psst.. lagi ngomongin apa nih?",
    "Aku denger semuanya lho! 🐘",
    "Jangan berantem ya, mending ngobrol..",
    "Gajah nggak pernah lupa, tapi gajah pemaaf.",
    "Beli es dawet yuk? Eh fokus.. fokus..",
    "Kalo bingung, tanya aku aja!",
    "Tenang.. ada aku si mediator paling gemoy!",
    "Lagi ngetik apa tuh? Jangan galak-galak ya..",
    "Inget, napas dalam dulu.. 1.. 2.. 3..",
    "Kalo kamu senyum, aku ikutan senyum! 😊",
    "Ciee.. yang lagi berusaha baikan..",
    "Aku tim damai garis keras! 🐘💪",
    "Mau aku bantu cari kata-kata yang manis?",
    "Gak usah gengsi, bilang 'maaf' itu keren lho.",
    "Laper ya? Makan dulu gih biar gak emosian.",
    "Sabar ya, semua masalah ada solusinya kok!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Lebih sering muncul (50% chance setiap 7 detik)
      if (Math.random() > 0.5 && !isHovered) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setMessage(randomQuote);
        setTimeout(() => setMessage(""), 4000); // Muncul sedikit lebih lama
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="fixed bottom-24 right-8 lg:bottom-12 lg:right-12 z-50 pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full mb-4 right-0 bg-white px-4 py-2 rounded-2xl shadow-lg border border-brand-100 text-sm text-brand-600 whitespace-nowrap"
          >
            {message}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-brand-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-auto cursor-pointer group"
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          setMessage(randomQuote);
          setTimeout(() => setMessage(""), 3000);
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-full group-hover:bg-brand-500/20 transition-colors" />
          <div className="bg-white p-3 rounded-full shadow-xl border border-brand-100 relative overflow-hidden">
            <ElephantIcon className="w-12 h-12 text-brand-500" />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingElephant;
