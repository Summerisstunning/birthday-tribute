'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { ChatDialog } from './chat-dialog'

// 预定义的颜色数组，避免随机生成
const BALLOON_COLORS = [
  '#FF6B6B', // 红色
  '#4ECDC4', // 青色
  '#45B7D1', // 蓝色
  '#96CEB4', // 绿色
  '#FFEEAD', // 黄色
  '#FF9999', // 粉色
  '#99B898', // 深绿
  '#E84A5F', // 深红
  '#FF847C', // 珊瑚色
  '#A8E6CF'  // 薄荷色
]

export function HeroSection() {
  const ref = useRef(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsClient(true)
    // 预加载音频
    if (audioRef.current) {
      audioRef.current.preload = 'metadata'
      audioRef.current.onloadedmetadata = () => setIsAudioLoaded(true)
    }
  }, [])

  if (!isClient) {
    return null
  }

  const leftBalloons = Array(5).fill(0).map((_, i) => ({
    x: -100 - (i * 50),
    color: BALLOON_COLORS[i]
  }))

  const rightBalloons = Array(5).fill(0).map((_, i) => ({
    x: 100 + (i * 50),
    color: BALLOON_COLORS[i + 5]
  }))

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* 背景图片使用 Next.js Image 组件优化加载 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt="Birthday background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC0zLyovLi0/PURBTD9NQUN9bjxNf4V1hXyFj5GQkf+PsZCNkYH/2wBDARUXFx4aHR4eHUGBQYFBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-3xl mx-4 text-center"
      >
        <div className="relative">
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-2xl">
            🎀
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            兰兰女神生日快乐
          </motion.h1>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-2xl">
            🎀
          </div>
          
          {/* 优化音频加载 */}
          <audio 
            ref={audioRef}
            controls 
            className={`mx-auto transition-opacity duration-300 ${isAudioLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/birthdaysong.MP4" type="video/mp4" />
            您的浏览器不支持音频播放。
          </audio>
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xl">
            ✨
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-shadow"
      >
        今天是兰兰女神的特别日子，这是萌萌宝贝为您精心打造的网站，记录您最耀眼的瞬间，感恩您用爱编织的59年精彩人生。
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 flex justify-center"
      >
        <ChatDialog />
      </motion.div>

      {/* 优化气球动画性能 */}
      {leftBalloons.map((balloon, i) => (
        <motion.div
          key={`left-${i}`}
          className="absolute text-[5rem] will-change-transform"
          initial={{ 
            x: balloon.x,
            y: Math.random() * 100 + 100
          }}
          animate={{ 
            y: [null, -800],
            x: [null, balloon.x - 50]
          }}
          transition={{ 
            duration: 15 + (i * 2),
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            color: balloon.color,
            left: '50%',
            bottom: '-100px',
          }}
        >
          🎈
        </motion.div>
      ))}

      {rightBalloons.map((balloon, i) => (
        <motion.div
          key={`right-${i}`}
          className="absolute text-[5rem] will-change-transform"
          initial={{ 
            x: balloon.x,
            y: Math.random() * 100 + 100
          }}
          animate={{ 
            y: [null, -800],
            x: [null, balloon.x + 50]
          }}
          transition={{ 
            duration: 15 + (i * 2),
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            color: balloon.color,
            left: '50%',
            bottom: '-100px',
          }}
        >
          🎈
        </motion.div>
      ))}
    </motion.section>
  )
}
