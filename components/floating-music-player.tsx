'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const togglePlay = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className={`fixed bottom-8 right-8 z-50 ${
        isMinimized ? 'w-12 h-12' : 'w-64 h-16'
      } bg-white rounded-full shadow-lg flex items-center justify-between px-4 cursor-pointer`}
      onClick={() => !isMinimized && togglePlay()}
    >
      <audio id="bgMusic" src="/birthdaysong.MP4" loop />
      
      {!isMinimized && (
        <>
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              className="w-8 h-8 flex items-center justify-center"
            >
              🎵
            </motion.div>
            <span className="text-sm">生日快乐音乐</span>
          </div>
          <button className="text-2xl" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </>
      )}
      
      <button
        className={`absolute ${isMinimized ? 'inset-0' : 'top-0 right-0'} w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs`}
        onClick={(e) => {
          e.stopPropagation()
          setIsMinimized(!isMinimized)
        }}
      >
        {isMinimized ? '↗️' : '↙️'}
      </button>
    </motion.div>
  )
}
