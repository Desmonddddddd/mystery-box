"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC = "/audio/bg-track.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Browser blocked autoplay — user needs to click again
      });
    }
  }, [isPlaying]);

  // Pulse animation bars
  const bars = [1, 2, 3, 4, 5];

  return (
    <div className="fixed top-20 right-4 z-50 flex items-center gap-3">
      {/* Tagline */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <span className="text-[11px] text-white/40 font-medium tracking-wide uppercase">
              Track of the Day
            </span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-pink-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volume slider — shows on hover */}
      <AnimatePresence>
        {showVolume && isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-pink-500 appearance-none bg-white/20 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
            <span className="text-[10px] text-white/40 font-mono">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={togglePlay}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        className="relative group w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 opacity-90" />

        {/* Animated ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-pink-400/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Icon / Visualizer */}
        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? (
            // Audio bars visualizer
            <div className="flex items-end gap-[2px] h-4">
              {bars.map((bar) => (
                <motion.div
                  key={bar}
                  className="w-[2.5px] bg-white rounded-full"
                  animate={{
                    height: ["3px", `${6 + Math.random() * 10}px`, "3px"],
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: bar * 0.08,
                  }}
                />
              ))}
            </div>
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </div>

        {/* "Click to play" hint on first visit */}
        {!hasInteracted && (
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Mobile tagline — below button */}
      {!hasInteracted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="sm:hidden absolute top-full right-0 mt-1 text-[9px] text-white/30 whitespace-nowrap"
        >
          track of the day
        </motion.p>
      )}
    </div>
  );
}
