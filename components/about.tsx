'use client'

import Image from 'next/image'

const keywords = ['善良', '优雅', '聪慧', '坚持', '温柔']

export function About() {
  return (
    <section id="about" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">兰兰的故事</h2>
          
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-12">
            <Image
              src="/三口.JPG"
              alt="兰兰和家人"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-12">
            兰兰，1966年出生，是家里的灵魂人物。她用温暖与智慧守护着家庭，用行动诠释了母亲、妻子与朋友的多重角色。
            无论何时，她总是笑容明媚，给身边的人带来无尽的温暖与力量。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-6 py-2 bg-white rounded-full shadow-md text-pink-600 font-medium hover:scale-105 transition-transform"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
