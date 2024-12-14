'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, Star, Cake, GraduationCap, Baby, Home, Users, Sparkles } from 'lucide-react'

const timelineEvents = [
  {
    year: 1966,
    title: '兰兰出生',
    description: '一个充满希望的生命降临人间',
    icon: Baby
  },
  {
    year: 1985,
    title: '青春岁月',
    description: '在学习与成长中绽放青春的光彩',
    icon: GraduationCap
  },
  {
    year: 1992,
    title: '为母则刚',
    description: '成为母亲，有了萌萌，开启人生新篇章',
    icon: Heart
  },
  {
    year: 2016,
    title: '勇敢远行',
    description: '第一次独自出国，前往美国，开启人生新视野',
    image: '/美国2.JPG',
    icon: Sparkles
  },
  {
    year: 2025,
    title: '特别纪念',
    description: '感恩59年的点滴与精彩，继续书写美好故事',
    icon: Cake
  },
]

export function Timeline() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null)

  return (
    <section id="timeline" className="py-20 bg-pink-50 relative overflow-hidden">
      {/* 左侧背景图片 */}
      <div className="absolute left-1/4 top-1/2 -translate-x-3/4 -translate-y-1/2 w-64 h-96 opacity-10">
        <Image
          src="/111.jpg"
          alt="Background Left"
          fill
          className="object-cover"
        />
      </div>
      
      {/* 右侧背景图片 */}
      <div className="absolute right-1/4 top-1/2 translate-x-3/4 -translate-y-1/2 w-64 h-96 opacity-10">
        <Image
          src="/222.jpg"
          alt="Background Right"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        >
          兰兰女神的精彩人生
        </motion.h2>

        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200" />

          {/* 事件 */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* 时间点 */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveEvent(activeEvent === index ? null : index)}
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-400 rounded-full cursor-pointer z-10 flex items-center justify-center"
              >
                <event.icon className="w-4 h-4 text-white" />
              </motion.div>

              {/* 内容 */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeEvent === index ? 'auto' : '100px',
                    opacity: 1
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <event.icon className="w-5 h-5 text-pink-500" />
                    <h3 className="text-2xl font-bold text-pink-600">{event.year}</h3>
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{event.title}</h4>
                  <p className="text-gray-600">{event.description}</p>
                  
                  {event.image && activeEvent === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative w-full h-48 mt-4 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
