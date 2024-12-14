'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于兰兰' },
  { id: 'wishes', label: '生日祝福' },
  { id: 'timeline', label: '时间线' },
  { id: 'memories', label: '女神回忆' },
  { id: 'acknowledgments', label: '致谢' },
  { id: 'contact', label: '联系我们' },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-pink-600"
          >
            献给我们永远的女神——兰兰！
          </motion.span>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
