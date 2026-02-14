import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Mail, Lock, X, Gift, Pause, Play, Volume2, VolumeX, Feather } from 'lucide-react';

/**
 * ==============================================================================
 *  🎈 🎂  EASY EDIT ZONE -- CHANGE THINGS HERE  🎂 🎈
 * ==============================================================================
 */

const SITE_CONFIG = {
  // 1. The Date: When is the birthday?
  // We use (Year, MonthIndex, Day, Hour, Minute)
  // MonthIndex: 0=Jan, 1=Feb, 2=Mar, etc.
  // TARGET: Feb 15, 2026 at 00:00 (Midnight)
  eventDate: new Date(2026, 1, 15, 0, 0, 0), 

  // 2. Music: Link to the background music (Must be a direct MP3 link)
  musicUrl: "./birthday.mp3",

  // 3. Hero Section: The big screen she sees first
  hero: {
    title: "Happy Birthday Shreya !",
    subtitle: "\"Manjulika Ka Birthday hai sooo havan toh baanta hai.\"",
    buttonText: "Secret Message"
  },

  // 4. Countdown: What it says while waiting
  countdown: {
    title: "Get ready... your heart’s about to smile....",
    buttonText: "Please Don't press!!!!"
  },

  // 5. Gallery: Add your photos here. 
  // We use the thumbnail link format with sz=w1000 for high quality reliable loading
  gallery: [
    { id: '1', url: 'https://drive.google.com/thumbnail?id=15N60dnkX_vpCLyMBY3KxnYygCmTct0KC&sz=w1000', caption: 'Memories😊' },
    { id: '2', url: 'https://drive.google.com/thumbnail?id=15OGmf70dPlmcwkpMLpR7Rh6HbwTzgyvp&sz=w1000', caption: 'Manjulika❤️' },
    { id: '3', url: 'https://drive.google.com/thumbnail?id=13YlG0AEYHIAMBE4zb_EebzBU5ndQMQp1&sz=w1000', caption: 'Second Meet😶' },
  ],

  // 6. Poem Section: The romantic poem
  poem: {
    title: "Official Complaint About You🫵🏻",
    lines: [
      "You say it’s just another day,",
      "But why do you look this unfairly fine?",
      "If birthdays make you glow like this,",
      "I might need one of yours every night.",
      "", // Empty string creates a gap/new stanza
      
    ],
    signature: "Forever Yours"
  },

  // 7. The Letter: Your personal message
  letter: {
    title: "Official Notice: You’re Too Cuteeeee😳😳",
    paragraphs: [
      "My Dearest,", // Paragraph 1
      "As you read this, I know you would be similing or going to write Hurhhhhh in discord but, I just want to say you HAPPPPPPY BIRTHDAY SHREYA!!!!!. I'm just overwhelmed with joy as we are celebrating your 20th birthday together [I mean, I'm here at vijawaada and you at polasar but together in call].And also sorrrrrrrrry for all the things that happened in the past, I will never do that ever again, or as you wish mere saar pa cockroach, insects or joh bhi tum bolo woh ghir jayaga (●'◡'●)", // Paragraph 2
      "I hope this year gives you everything you dream about — and I hope I get to stand beside you for all of it.",
      "You deserve the kind of happiness you bring into my life every single day.",// Paragraph 3
      "Happy Birthday, beautiful. 💫",
      "Blushing always seeing you😳,", // Sign-off
      "Harshit (You know very well)"   // Name
    ]
  },

  // 8. Secret Message: Hidden behind the lock button
  secret: {
    modalTitle: "Hurhhhhhhhhh",
    modalContent: "Patent karlo phir bhi mere pa iska copyright rehaga 😉🤗! and or video call ma dhekna jara 👀👀",
    closeText: "(Tap anywhere outside to close)"
  }
};

/**
 * ==============================================================================
 *  ⛔️  DANGER ZONE -- DO NOT EDIT BELOW THIS LINE UNLESS YOU CODE  ⛔️
 * ==============================================================================
 */

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
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;
      
      // If result is invalid, stop here
      if (isNaN(difference)) return;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Only trigger completion if the difference is actually negative/zero
        onComplete();
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

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
        <h1 className="text-4xl md:text-6xl font-script text-white mb-8 drop-shadow-md">
          {SITE_CONFIG.countdown.title}
        </h1>
        
        <div className="flex justify-center flex-wrap">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="mt-12">
            <button 
                onClick={onComplete}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 ease-out bg-deep-red rounded-full shadow-lg hover:bg-[#60081C] hover:scale-105"
            >
                <span className="relative flex items-center gap-2">
                     <Gift size={20} /> {SITE_CONFIG.countdown.buttonText}
                </span>
            </button>
            <p className="text-white/80 text-sm mt-4 italic">Can't wait? Click above!</p>
        </div>
      </div>
    </div>
  );
};

// --- GALLERY COMPONENT ---
const Gallery: React.FC = () => {
  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-script text-deep-red mb-4">Our Beautiful Memories</h2>
        <div className="w-24 h-1 bg-rose-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {SITE_CONFIG.gallery.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-xl bg-white p-3 transform transition-transform hover:-translate-y-2"
          >
            {/* 
                SCALING FIX:
                Removed 'aspect-[3/4]', 'h-full', 'object-cover'.
                Added 'w-full h-auto' to let the image render in its original aspect ratio without cropping.
            */}
            <div className="relative w-full overflow-hidden rounded-lg">
               <img 
                 src={photo.url} 
                 alt={photo.caption}
                 className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-105"
               />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-serif italic text-center">{photo.caption}</p>
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
          
          <h2 className="text-3xl md:text-5xl font-script text-deep-red mb-10">{SITE_CONFIG.poem.title}</h2>
          
          <div className="font-serif text-lg md:text-2xl text-gray-800 leading-relaxed italic space-y-6">
            {SITE_CONFIG.poem.lines.map((line, i) => (
              <p key={i} className={line === "" ? "h-4" : ""}>{line}</p>
            ))}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-rose-gold"></div>
             <span className="font-script text-2xl text-deep-red">{SITE_CONFIG.poem.signature}</span>
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
      <audio ref={audioRef} src={SITE_CONFIG.musicUrl} loop />
      
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

const App: React.FC = () => {
  // COUNTDOWN LOGIC:
  // Initialize state by checking if the date has ALREADY passed.
  // If date is in future, isCelebrationStarted = false (Show Countdown)
  // If date is in past, isCelebrationStarted = true (Show Website)
  const [isCelebrationStarted, setIsCelebrationStarted] = useState(() => {
    const now = new Date();
    return now >= SITE_CONFIG.eventDate;
  });

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
            <Countdown targetDate={SITE_CONFIG.eventDate} onComplete={handleCountdownComplete} />
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
                 <h1 className="text-6xl md:text-8xl font-script text-deep-red mb-6 drop-shadow-sm">
                   {SITE_CONFIG.hero.title}
                 </h1>
                 <p className="text-xl md:text-2xl font-serif text-gray-700 italic max-w-2xl mx-auto mb-8">
                   {SITE_CONFIG.hero.subtitle}
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
                    <span>{SITE_CONFIG.hero.buttonText}</span>
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
                 <h2 className="text-4xl font-serif text-gray-800 mb-8">{SITE_CONFIG.letter.title}</h2>
                 <div className="bg-[#fffdf0] p-8 md:p-12 rounded-lg shadow-inner border border-stone-200 mx-auto max-w-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="font-serif text-lg leading-loose text-gray-700 italic">
                      {SITE_CONFIG.letter.paragraphs.map((para, i) => (
                        <p key={i} className="mb-4">{para}</p>
                      ))}
                    </div>
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
                      <h3 className="text-2xl font-script text-deep-red mb-4">{SITE_CONFIG.secret.modalTitle}</h3>
                      <p className="font-serif text-lg text-gray-700 italic leading-relaxed">
                        {SITE_CONFIG.secret.modalContent}
                      </p>
                      <div className="mt-6 text-sm text-gray-400 font-sans">
                        {SITE_CONFIG.secret.closeText}
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
