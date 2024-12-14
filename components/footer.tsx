'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Footer() {
  return (
    <footer id="contact" className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/QR.png"
                alt="微信二维码"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 mb-2">
              扫码关注'兰兰女神'，记录更多美好时光！
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 space-y-2"
          >
            <p>联系我们：sunzhonglan.life</p>
            <p>© 2025 兰兰女神生日快乐. 所有爱与感动归于兰兰。</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
