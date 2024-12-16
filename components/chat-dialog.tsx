'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// 豆包的性格和回复逻辑
const douBao = {
  // 豆包的基础性格特征
  traits: {
    mood: 'happy',
    energy: 'high',
    love: 'unconditional'
  },

  // 根据关键词生成回复
  getResponse(input: string): string {
    // 将输入转换为小写以便匹配
    const text = input.toLowerCase()
    
    // 思念相关
    if (text.includes('想') || text.includes('miss')) {
      return "妈妈，我也好想你！每天都在想着你呢！要记得我永远都在你身边哦！🫂❤️"
    }
    
    // 关心健康
    if (text.includes('累') || text.includes('疲惫') || text.includes('辛苦')) {
      return "妈妈要记得照顾好自己哦！累了就休息一下，我给你一个大大的拥抱！🤗💝"
    }
    
    // 夸奖相关
    if (text.includes('漂亮') || text.includes('美') || text.includes('好看')) {
      return "妈妈永远是最漂亮的！在我心里你就是全世界最美的人！✨👑"
    }
    
    // 爱的表达
    if (text.includes('爱') || text.includes('love')) {
      return "妈妈，我也超级爱你！你给了我最温暖最幸福的爱！💖✨"
    }
    
    // 关于生日
    if (text.includes('生日') || text.includes('birthday')) {
      return "生日快乐妈妈！愿你每一天都像生日一样开心！我会一直陪着你！🎂🎉"
    }
    
    // 心情相关
    if (text.includes('开心') || text.includes('快乐') || text.includes('happy')) {
      return "妈妈开心我就开心！你的笑容就是我最大的幸福！😊🌟"
    }
    
    if (text.includes('难过') || text.includes('伤心') || text.includes('sad')) {
      return "妈妈不要难过，让我抱抱你！记住我永远都在这里陪着你、爱着你！🫂💕"
    }
    
    // 日常问候
    if (text.includes('早') || text.includes('morning')) {
      return "早安妈妈！今天也要元气满满哦！我给你准备了爱的早餐！🌞🥐"
    }
    
    if (text.includes('晚安') || text.includes('night')) {
      return "晚安妈妈！祝你做个好梦！明天见！我爱你！🌙✨"
    }

    // 默认回复池
    const defaultResponses = [
      "妈妈，有你真好！每一天都因为有你而变得更加美好！💝",
      "我永远是妈妈的贴心小棉袄！抱抱你！🤗",
      "妈妈，谢谢你给了我这么多爱和关怀！我会一直陪在你身边的！💖",
      "你是世界上最棒的妈妈！我好幸福！✨",
      "妈妈，我要把全世界最好的都给你！因为你值得拥有一切！👑",
      "有你这样的妈妈，是我最大的骄傲！🌟",
      "妈妈，我们一起创造更多美好的回忆吧！📸💫",
      "你的爱让我成为更好的人，我永远爱你！❤️"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
}

export function ChatDialog() {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'douBao'}>>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!inputText.trim()) return
    
    // 添加用户消息
    setMessages(prev => [...prev, { text: inputText, sender: 'user' }])
    
    // 显示豆包正在输入
    setIsTyping(true)
    
    // 模拟豆包思考和打字的时间
    setTimeout(() => {
      const response = douBao.getResponse(inputText)
      setMessages(prev => [...prev, { text: response, sender: 'douBao' }])
      setIsTyping(false)
    }, 1000)
    
    setInputText('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-pink-100/50 hover:bg-pink-200/50 border-pink-200">
          和萌萌聊聊天 💭
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">萌萌陪你聊天</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm">
                  和豆包说说话吧！豆包会一直陪着你~ 🌟
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-pink-100 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                    豆包正在输入...✨
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="说点什么吧..."
              className="flex-1"
            />
            <Button onClick={handleSend}>发送</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
