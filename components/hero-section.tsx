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
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // 或者返回一个加载占位符
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 背景图片 */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="relative h-screen w-full">
          <Image
            src="/妈妈.JPG"
            alt="兰兰女神"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>
      </motion.div>

      {/* 内容 */}
      <div className="relative z-10 text-center text-white px-4 mt-64">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg"
        >
          兰兰女神的专属生日纪念
        </motion.h1>

        {/* 音乐播放器 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 relative"
        >
          <div className="relative mx-auto w-fit p-6 rounded-lg bg-gradient-to-r from-pink-200/30 to-purple-200/30 backdrop-blur-sm border border-white/20">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl">
              🎂
            </div>
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-2xl">
              🎀
            </div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-2xl">
              🎀
            </div>
            <audio controls className="mx-auto">
              <source src="/birthdaysong.MP4" type="video/mp4" />
              Your browser does not support the audio element.
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

        {/* 左侧气球 */}
        {leftBalloons.map((balloon, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute text-[5rem]"
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
              color: balloon.color
            }}
          >
            🎈
          </motion.div>
        ))}

        {/* 右侧气球 */}
        {rightBalloons.map((balloon, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute text-[5rem]"
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
              color: balloon.color
            }}
          >
            🎈
          </motion.div>
        ))}
      </div>

      {/* 向下滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white text-lg">向下滚动探索更多 ↓</span>
      </motion.div>
    </motion.section>
  )
}

// Force rebuild - 2024-12-16 11:51
