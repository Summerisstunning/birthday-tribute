'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { ChatDialog } from './chat-dialog'

// 定义粒子类型
type Particle = {
  id: string
  x: number
  y: number
  speedY: number
  speedX: number
  rotation: number
  type: '🌸' | '🎈' | '✨' | '🎉' | '🌟' | '💝' | '🎊' | '💫' | '🦋' | '🌺'
  scale: number
  opacity: number
  amplitude: number // 振幅
  phase: number // 相位
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [particles, setParticles] = useState<Particle[]>([])

  // 创建新粒子
  const createParticle = useCallback((): Particle => {
    const types = ['🌸', '🎈', '✨', '🎉', '🌟', '💝', '🎊', '💫', '🦋', '🌺']
    const startX = Math.random() * windowSize.width
    const startY = windowSize.height + 100

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: startX,
      y: startY,
      speedY: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      type: types[Math.floor(Math.random() * types.length)] as Particle['type'],
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.6 + Math.random() * 0.4,
      amplitude: 30 + Math.random() * 50, // 振幅范围
      phase: Math.random() * Math.PI * 2 // 随机初始相位
    }
  }, [windowSize])

  // 初始化窗口大小
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    setMounted(true)
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 初始化粒子
  useEffect(() => {
    if (!mounted || windowSize.width === 0) return

    const initialParticles = Array.from({ length: 40 }, createParticle)
    setParticles(initialParticles)

    let time = 0
    const interval = setInterval(() => {
      time += 0.05
      setParticles(prev => {
        const updatedParticles = prev.map(p => {
          // 使用正弦函数创建水平摆动效果
          const newX = p.x + Math.sin(time + p.phase) * (p.amplitude / 100)
          // 逐渐增加scale制造膨胀效果
          const scaleIncrease = Math.sin(time + p.phase) * 0.2
          
          return {
            ...p,
            x: newX,
            y: p.y - p.speedY,
            rotation: p.rotation + p.speedY,
            scale: p.scale + scaleIncrease,
            opacity: p.y < windowSize.height * 0.2 ? p.opacity - 0.01 : p.opacity
          }
        })

        const remainingParticles = updatedParticles.filter(
          p => p.y > -100 && p.opacity > 0
        )

        const newParticles = Array.from(
          { length: 40 - remainingParticles.length },
          createParticle
        )

        return [...remainingParticles, ...newParticles]
      })
    }, 30)

    return () => clearInterval(interval)
  }, [mounted, windowSize, createParticle])

  if (!mounted) {
    return (
      <div className="relative h-screen">
        <Image 
          src="/妈妈.JPG" 
          alt="背景" 
          fill 
          objectFit="cover" 
          priority
        />
        <div className="absolute top-96 left-1/2 transform -translate-x-1/2 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center px-8 py-4 rounded-2xl" 
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                color: '#FF1493',
                border: '2px solid rgba(255,255,255,0.5)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3) inset'
              }}>
            兰兰女神生日快乐
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <Image 
        src="/妈妈.JPG" 
        alt="背景" 
        fill 
        objectFit="cover" 
        priority
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            transition: 'transform 0.5s ease-in-out',
            fontSize: '2rem',
            opacity: particle.opacity
          }}
        >
          {particle.type}
        </div>
      ))}

      <div className="absolute top-96 left-1/2 transform -translate-x-1/2 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center px-8 py-4 rounded-2xl" 
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              color: '#FF1493',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
          兰兰女神生日快乐
        </h1>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-lg md:text-2xl text-center max-w-3xl px-4"
           style={{
             textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
           }}>
        今天是兰兰女神的特别日子，这是萌萌宝贝为您精心打造的网站，记录你最耀眼温暖的瞬间，庆祝这用爱编织的59年精彩人生。
      </div>

      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
        <ChatDialog />
      </div>
    </div>
  )
}
