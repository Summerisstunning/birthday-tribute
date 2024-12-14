'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

const guests = [
  { name: '最帅国仔', description: '永远爱兰兰的好老公' },
  { name: '最棒萌宝', description: '给妈妈带来欢乐的开心果' },
  { name: '神秘嘉宾', description: '特别的生日祝福', videoSrc: '/奶奶视频.MOV' }
]

export function Acknowledgments() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <section id="acknowledgments" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">特别致谢</h2>
          <p className="text-gray-600">感谢所有为兰兰女神送上祝福的人</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {guests.map((guest) => (
            <motion.div
              key={guest.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              onClick={() => guest.videoSrc && setSelectedVideo(guest.videoSrc)}
              className={`bg-pink-50 rounded-xl p-6 text-center ${
                guest.videoSrc ? 'cursor-pointer hover:bg-pink-100' : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{guest.name}</h3>
              <p className="text-gray-600">{guest.description}</p>
              {guest.videoSrc && (
                <div className="mt-4 text-pink-500 text-sm">点击查看视频祝福</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 视频弹窗 */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>

                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full aspect-video"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
