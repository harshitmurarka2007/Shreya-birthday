import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// EDITABLE: Import must end in .ts
import { CountdownTime } from '../types.ts';
import { Heart, Gift } from 'lucide-react';

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
      {/* Decorative background elements */}
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

export default Countdown;