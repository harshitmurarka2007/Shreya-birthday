import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Mail, Lock, X } from 'lucide-react';

// EDITABLE: Imports must end in .tsx or .ts for GitHub Pages to find them
import Countdown from './components/Countdown.tsx';
import Gallery from './components/Gallery.tsx';
import PoemSection from './components/PoemSection.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';

// EDITABLE: Set this date to the actual birthday!
// Format: YYYY-MM-DDT00:00:00
// Example: new Date('2024-10-25T00:00:00')
const TARGET_DATE = new Date(Date.now() + 24 * 60 * 60 * 1000); 

const App: React.FC = () => {
  const [isCelebrationStarted, setIsCelebrationStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const handleCountdownComplete = () => {
    setIsCelebrationStarted(true);
    setIsPlaying(true); // Attempt to auto-play music on interaction
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#B76E79', '#FFD1DC', '#FFF']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#B76E79', '#FFD1DC', '#FFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="font-sans text-gray-800 bg-[#FFF0F5] min-h-screen">
      <AnimatePresence mode='wait'>
        {!isCelebrationStarted ? (
          <motion.div
            key="countdown"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
          >
            <Countdown targetDate={TARGET_DATE} onComplete={handleCountdownComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            {/* Hero Section */}
            <header className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/20 to-transparent z-0"></div>
               <motion.div 
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="z-10 flex flex-col items-center"
               >
                 {/* EDITABLE: Main Headline */}
                 <h1 className="text-6xl md:text-8xl font-script text-deep-red mb-6 drop-shadow-sm">
                   Happy Birthday!
                 </h1>
                 {/* EDITABLE: Subtitle / Quote */}
                 <p className="text-xl md:text-2xl font-serif text-gray-700 italic max-w-2xl mx-auto mb-8">
                   "To the world you may be one person; but to one person you may be the world."
                 </p>
                 
                 <div className="animate-bounce mb-8">
                    <Heart className="mx-auto text-rose-gold" size={40} fill="currentColor" />
                 </div>

                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSecretMessage(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-rose-gold text-rose-gold rounded-full shadow-lg hover:bg-rose-gold hover:text-white transition-all duration-300 font-serif italic"
                 >
                    <Lock size={18} />
                    <span>Secret Message</span>
                 </motion.button>
               </motion.div>
               
               {/* Background floating elements */}
               <div className="absolute top-10 left-10 text-rose-gold/20 animate-float"><Stars size={60} /></div>
               <div className="absolute bottom-20 right-10 text-rose-gold/20 animate-float" style={{ animationDelay: '1s' }}><Heart size={80} /></div>
            </header>

            {/* Content Sections */}
            <Gallery />
            
            <PoemSection />

            <section className="py-20 px-4 bg-white">
              <div className="max-w-4xl mx-auto text-center">
                 <div className="mb-8 flex justify-center text-rose-gold">
                   <Mail size={48} />
                 </div>
                 {/* EDITABLE: Letter Section Title */}
                 <h2 className="text-4xl font-serif text-gray-800 mb-8">My Letter To You</h2>
                 <div className="bg-[#fffdf0] p-8 md:p-12 rounded-lg shadow-inner border border-stone-200 mx-auto max-w-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* EDITABLE: The main birthday letter text. Use <br/> for line breaks. */}
                    <p className="font-serif text-lg leading-loose text-gray-700 italic">
                      My Dearest,<br/><br/>
                      As you read this, I hope you realize how incredibly special you are to me. 
                      Every day with you feels like a celebration. I built this little corner of the internet 
                      just to show a fraction of the love I hold for you.<br/><br/>
                      May this year bring you as much joy as you bring into my life.<br/><br/>
                      Love always,<br/>
                      [Your Name]
                    </p>
                 </div>
              </div>
            </section>

            <footer className="py-10 text-center text-gray-500 text-sm">
              <p>Made with ❤️ for you</p>
            </footer>

            <MusicPlayer isPlaying={isPlaying} onTogglePlay={() => setIsPlaying(!isPlaying)} />

            {/* Secret Message Modal */}
            <AnimatePresence>
              {showSecretMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowSecretMessage(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border-4 border-double border-rose-gold"
                  >
                    <button 
                      onClick={() => setShowSecretMessage(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-deep-red">
                        <Lock size={32} />
                      </div>
                      {/* EDITABLE: Secret Modal Title */}
                      <h3 className="text-2xl font-script text-deep-red mb-4">Shhh... It's a Secret</h3>
                      {/* EDITABLE: Secret Modal Content */}
                      <p className="font-serif text-lg text-gray-700 italic leading-relaxed">
                        "If you are reading this, I have a little surprise waiting for you. 
                        Check the pocket of my blue jacket... I think you'll like what you find there!"
                      </p>
                      <div className="mt-6 text-sm text-gray-400 font-sans">
                        (Tap anywhere outside to close)
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;