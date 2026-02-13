import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Mail, Lock, X, Gift, Pause, Play, Volume2, VolumeX, Feather } from 'lucide-react';

/**
 * ==========================================
 * TYPES
 * ==========================================
 */
interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * ==========================================
 * COMPONENTS
 * ==========================================
 */

// --- COUNTDOWN COMPONENT ---
interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        onComplete();
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-white/90 backdrop-blur-sm w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-lg border-2 border-pink-100 transform transition-transform hover:scale-105">
        <span className="text-2xl md:text-4xl font-serif text-deep-red font-bold">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-white font-sans text-xs md:text-sm uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink via-pink-200 to-rose-gold overflow-hidden relative">
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-white/30"
      >
        <Heart size={100} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 text-white/30"
      >
        <Heart size={120} fill="currentColor" />
      </motion.div>

      <div className="z-10 text-center">
        {/* EDITABLE: Change the waiting message text here */}
        <h1 className="text-4xl md:text-6xl font-script text-white mb-8 drop-shadow-md">
          Something special is coming...
        </h1>
        
        <div className="flex justify-center flex-wrap">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="mt-12">
            {/* EDITABLE: This button skips the countdown. */}
            <button 
                onClick={onComplete}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 ease-out bg-deep-red rounded-full shadow-lg hover:bg-[#60081C] hover:scale-105"
            >
                <span className="relative flex items-center gap-2">
                     <Gift size={20} /> Early Access
                </span>
            </button>
            <p className="text-white/80 text-sm mt-4 italic">Can't wait? Click above!</p>
        </div>
      </div>
    </div>
  );
};

// --- GALLERY COMPONENT ---
// EDITABLE: Update the photo links here.
const photos = [
  { id: '1', url: 'https://picsum.photos/400/500?random=1', caption: 'Our first date' },
  { id: '2', url: 'https://picsum.photos/400/400?random=2', caption: 'Summer vacation' },
  { id: '3', url: 'https://picsum.photos/400/600?random=3', caption: 'That funny face' },
];

const Gallery: React.FC = () => {
  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        {/* EDITABLE: Section Title */}
        <h2 className="text-4xl md:text-5xl font-script text-deep-red mb-4">Our Beautiful Memories</h2>
        <div className="w-24 h-1 bg-rose-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white p-2 transform transition-transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden rounded-lg aspect-w-3 aspect-h-4">
               <img 
                 src={photo.url} 
                 alt={photo.caption}
                 className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- POEM SECTION COMPONENT ---
const PoemSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#FFF0F5] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -left-10 top-20 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-20 w-60 h-60 bg-rose-gold/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl shadow-xl border border-white"
        >
          <div className="flex justify-center mb-6 text-rose-gold">
            <Feather size={40} />
          </div>
          
          {/* EDITABLE: Poem Title */}
          <h2 className="text-3xl md:text-5xl font-script text-deep-red mb-10">A Poem For You</h2>
          
          {/* EDITABLE: Poem Content */}
          <div className="font-serif text-lg md:text-2xl text-gray-800 leading-relaxed italic space-y-6">
            <p>
              "In a world of millions,<br/>
              It is you I see.<br/>
              A guiding star,<br/>
              Shining just for me."
            </p>
            <p>
              "Your smile is the sunrise,<br/>
              Your laugh, the sweetest tune.<br/>
              I love you more than the stars,<br/>
              And deeper than the moon."
            </p>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-rose-gold"></div>
             <span className="font-script text-2xl text-deep-red">Forever Yours</span>
             <div className="h-px w-12 bg-rose-gold"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- MUSIC PLAYER COMPONENT ---
interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // EDITABLE: Music URL
  const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3"; 

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-pink-200 transform scale-90 origin-bottom-right md:scale-100">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      <button 
        onClick={onTogglePlay}
        className="p-2 bg-rose-gold text-white rounded-full hover:bg-deep-red transition-all shadow-md"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <div className="hidden sm:flex flex-col px-2">
        <span className="text-[10px] font-serif text-gray-600 font-bold">Background Music</span>
        <span className="text-[9px] text-gray-400">Romantic Instrumental</span>
      </div>

      <button onClick={toggleMute} className="p-1.5 text-rose-gold hover:text-deep-red transition-colors">
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

/**
 * ==========================================
 * MAIN APP COMPONENT
 * ==========================================
 */

// EDITABLE: Set this date to the actual birthday!
const TARGET_DATE = new Date(Date.now() + 24 * 60 * 60 * 1000); 

const App: React.FC = () => {
  const [isCelebrationStarted, setIsCelebrationStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const handleCountdownComplete = () => {
    setIsCelebrationStarted(true);
    setIsPlaying(true);
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
                 {/* EDITABLE: Subtitle */}
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
                    {/* EDITABLE: Letter Content */}
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
                      {/* EDITABLE: Secret Modal Content */}
                      <h3 className="text-2xl font-script text-deep-red mb-4">Shhh... It's a Secret</h3>
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

// --- RENDER ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);