'use client'

import { useState, useRef, useEffect } from 'react'

const songs = [
  {
    title: '兰兰，妈妈',
    url: '/兰兰，妈妈.mp3'
  },
  {
    title: '兰兰之歌',
    url: '/兰兰之歌.mp3'
  },
  {
    title: '生日快乐音乐',
    url: '/birthdaysong.MP4'
  }
]

export function FloatingMusicPlayer() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMounted(true)
    // 创建音频实例
    audioRef.current = new Audio(songs[currentSongIndex].url)
    
    // 设置事件监听器
    const audio = audioRef.current
    audio.addEventListener('canplay', () => setIsLoading(false))
    audio.addEventListener('waiting', () => setIsLoading(true))
    audio.addEventListener('playing', () => setIsLoading(false))
    audio.addEventListener('ended', playNext)
    audio.addEventListener('error', () => {
      console.error('音频加载失败')
      setIsLoading(false)
      playNext()
    })

    return () => {
      // 清理事件监听器
      if (audio) {
        audio.removeEventListener('canplay', () => setIsLoading(false))
        audio.removeEventListener('waiting', () => setIsLoading(true))
        audio.removeEventListener('playing', () => setIsLoading(false))
        audio.removeEventListener('ended', playNext)
        audio.removeEventListener('error', () => {})
        audio.pause()
      }
    }
  }, [])

  const playSong = async () => {
    if (!audioRef.current) return

    try {
      setIsLoading(true)
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('播放出错:', error)
      setIsPlaying(false)
      // 如果当前歌曲播放失败，尝试播放下一首
      playNext()
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      playSong()
    }
  }

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(nextIndex)
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].url
      if (isPlaying) {
        playSong()
      }
    }
  }

  const playPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length
    setCurrentSongIndex(prevIndex)
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].url
      if (isPlaying) {
        playSong()
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-64 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-between px-4">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="w-8 h-8 flex items-center justify-center">
          {isLoading ? '⏳' : '🎵'}
        </div>
        <span className="text-sm truncate">{songs[currentSongIndex].title}</span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={playPrevious}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isLoading}
        >
          ⏮️
        </button>
        <button
          onClick={togglePlay}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isLoading}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button
          onClick={playNext}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isLoading}
        >
          ⏭️
        </button>
      </div>
    </div>
  )
}
