"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { About } from '@/components/about'
import { BirthdayWishes } from '@/components/birthday-wishes'
import { Timeline } from '@/components/timeline'
import { Memories } from '@/components/memories'
import { Acknowledgments } from '@/components/acknowledgments'
import { Footer } from '@/components/footer'
import { FloatingMusicPlayer } from '@/components/floating-music-player'

import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'

export default function HomePage() {
  const { toast } = useToast()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Navbar />
      <HeroSection />
      <About />
      <BirthdayWishes />
      <Timeline />
      <Memories />
      <Acknowledgments />
      <Footer />
      <FloatingMusicPlayer />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl"
          >
            Beautifully designed components <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </motion.h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. And Next.js 13 Ready.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast({ title: "Hello!", description: "This is a toast notification" })}
            className={buttonVariants()}
          >
            Show Toast
          </motion.button>
        </div>
        <Toaster />
      </section>
    </main>
  )
}
