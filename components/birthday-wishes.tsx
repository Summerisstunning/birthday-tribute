'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Tv, Mic, Rocket, Laugh } from 'lucide-react'
import { useState, useRef } from 'react'

const audioMessages = [
  {
    name: '周星驰',
    file: '/周星驰.mp3',
    icon: Laugh,
    description: '星爷送来的独特祝福'
  },
  {
    name: '央视主持人',
    file: '/央视.mp3',
    icon: Tv,
    description: '来自央视的专业祝福'
  },
  {
    name: '郭德纲',
    file: '/郭德纲.mp3',
    icon: Mic,
    description: '德云社的相声祝福'
  },
  {
    name: '雷军',
    file: '/雷军.mp3',
    icon: Rocket,
    description: '科技大佬的祝福'
  }
]

export function BirthdayWishes() {
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const togglePlay = (file: string) => {
    if (playing === file) {
      audioRefs.current[file].pause()
      setPlaying(null)
    } else {
      if (playing) {
        audioRefs.current[playing].pause()
      }
      audioRefs.current[file].play()
      setPlaying(file)
    }
  }

  return (
    <section id="wishes" className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">满满的祝福只为兰兰女神</h2>
          <p className="text-gray-600">来自各界名人的真挚祝福</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {audioMessages.map((message) => {
            const Icon = message.icon
            return (
              <motion.div
                key={message.file}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{message.name}</h3>
                    <p className="text-gray-600">{message.description}</p>
                  </div>
                  <button
                    onClick={() => togglePlay(message.file)}
                    className="w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    {playing === message.file ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[message.file] = el
                  }}
                  src={message.file}
                  onEnded={() => setPlaying(null)}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
