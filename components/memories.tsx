'use client'

import { useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Coffee, Plane, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const categories = [
  {
    id: 'family',
    title: '温馨家庭',
    description: '家人的爱是最温暖的港湾',
    icon: Heart,
    images: [
      '/妈妈.JPG',
      '/爸妈.JPG',
      '/三口.JPG',
      '/奶奶生日.JPG',
      '/9506ac194i404d5abb489d2790cbf96c.JPG',
      '/817aad398k52078d2ea97629780de617.JPG',
      '/a5c2212a2nf6c9819db08cc3e0fd7fd0.JPG',
      '/da5ae5659r0db1d531bb26a1a57f146c.JPG',
    ]
  },
  {
    id: 'daily',
    title: '生活日常',
    description: '平凡生活中的精彩瞬间',
    icon: Coffee,
    images: [
      '/汉堡.JPG',
      '/342fda4d6ma0c168f56e29b2a9aeac8f.JPG',
      '/7b73277a4j5b3a14264b95524d5e2bcd.JPG',
      '/8602351fbkd7980f3baa7bbf6a98feb4.JPG',
      '/d3cc731ackd86d8ef33d8855167add57.JPG',
      '/381fd3576ja7e011c5ed4bae070da237.JPG',
      '/c8c61806fnbfc9fc8c4154850fae0ba6.JPG',
      '/运动.MP4',
    ]
  },
  {
    id: 'travel',
    title: '旅行足迹',
    description: '探索世界的美好记忆',
    icon: Plane,
    images: [
      '/美国.JPG',
      '/美国2.JPG',
      '/4.JPG',
      '/5.JPG',
      '/6.JPG',
      '/7.JPG',
      '/8.JPG',
      '/9.JPG',
      '/10.JPG',
      '/11.JPG',
    ]
  },
  {
    id: 'elegant',
    title: '优雅风采',
    description: '展现独特魅力的精彩时刻',
    icon: Sparkles,
    images: [
      '/古风.JPG',
      '/古风女儿.JPG',
      '/柔软的风.JPG',
      '/12710fdb7h627d1617bff461463ead5f.JPG',
      '/ebf9d8d5du457c735f6c376485b77311.JPG',
      '/ce241fc19k218761bba10cf10afd2be4.JPG',
      '/2e447ee1ftc2e071ec19f7d38bf95518.JPG',
      '/7b428f419tbca605d6233fb43092e298.JPG',
    ]
  }
]

export function Memories() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [isClient, setIsClient] = useState(false)

  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const currentCategory = categories.find(c => c.id === selectedCategory.id)
  const currentImages = currentCategory ? currentCategory.images : []
  const currentImageIndex = selectedImage ? currentImages.indexOf(selectedImage) : -1

  const showNextImage = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setSelectedImage(currentImages[currentImageIndex + 1])
    }
  }

  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(currentImages[currentImageIndex - 1])
    }
  }

  return (
    <section id="memories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          美好回忆
        </motion.h2>

        {/* 分类选择 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
                  selectedCategory.id === category.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pink-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {category.title}
              </motion.button>
            )
          })}
        </div>

        {/* 照片展示区 - 胶卷效果 */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex gap-4 py-4"
            animate={{
              x: [0, -2000],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }
            }}
          >
            {/* 重复两次图片以实现无缝滚动 */}
            {[...selectedCategory.images, ...selectedCategory.images].map((image, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-64 h-48 overflow-hidden rounded-lg">
                  {image.endsWith('.MP4') || image.endsWith('.MOV') ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="text-4xl">🎬</span>
                    </div>
                  ) : (
                    <Image
                      src={image}
                      alt="Memory"
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* 胶卷装饰 */}
                  <div className="absolute top-0 left-0 w-full h-4 bg-black/80 flex justify-between px-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white/50 rounded-full mt-1" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 图片预览模态框 */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full h-[80vh]"
                onClick={e => e.stopPropagation()}
              >
                {selectedImage.endsWith('.MP4') || selectedImage.endsWith('.MOV') ? (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  >
                    <source src={selectedImage} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={selectedImage}
                    alt="Selected memory"
                    fill
                    className="object-contain"
                  />
                )}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                
                {/* Navigation buttons */}
                {!selectedImage.endsWith('.MP4') && !selectedImage.endsWith('.MOV') && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const currentIndex = selectedCategory.images.indexOf(selectedImage)
                        const prevIndex = (currentIndex - 1 + selectedCategory.images.length) % selectedCategory.images.length
                        setSelectedImage(selectedCategory.images[prevIndex])
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const currentIndex = selectedCategory.images.indexOf(selectedImage)
                        const nextIndex = (currentIndex + 1) % selectedCategory.images.length
                        setSelectedImage(selectedCategory.images[nextIndex])
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
