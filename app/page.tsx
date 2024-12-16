"use client";
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

// Force rebuild - 2024-12-16
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
      <Toaster />
    </main>
  )
}
