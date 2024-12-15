'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatDialog() {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'douBao'}>>([])
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (!inputText.trim()) return
    
    // 添加用户消息
    setMessages(prev => [...prev, { text: inputText, sender: 'user' }])
    
    // 模拟豆包的回复
    const responses = [
      "妈妈，我永远爱你！❤️",
      "妈妈，你是世界上最棒的！🌟",
      "有你做我的妈妈，我真的很幸福！🥰",
      "妈妈，你今天也很漂亮哦！✨",
      "我会一直陪在你身边的！🤗",
      "妈妈，你辛苦啦！让我抱抱你！🫂",
      "你是我最骄傲的妈妈！👑",
      "妈妈，谢谢你给我这么多爱！💝"
    ]
    
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { text: randomResponse, sender: 'douBao' }])
    }, 1000)
    
    setInputText('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-pink-100/50 hover:bg-pink-200/50 border-pink-200">
          和豆包说说话 💭
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">和豆包聊天</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="和豆包说点什么..."
              className="flex-1"
            />
            <Button onClick={handleSend}>发送</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
