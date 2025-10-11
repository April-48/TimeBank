import React, { useState, useEffect } from 'react'
import { Send, Paperclip, Clock, User, Bot } from 'lucide-react'

const MessageThread = ({ threadId, participants, taskTitle, onSendMessage, messages = [] }) => {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsTyping(true)
    try {
      await onSendMessage(threadId, newMessage.trim())
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const groupMessagesByDate = (messages) => {
    const groups = {}
    messages.forEach(message => {
      const date = new Date(message.created_at).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    return groups
  }

  const messageGroups = groupMessagesByDate(sortedMessages)

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      {/* Thread Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{taskTitle}</h3>
            <p className="text-sm text-gray-500">
              {participants.map(p => p.name).join(', ')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {participants.map((participant, index) => (
              <div key={index} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {participant.name.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, messages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Messages for this date */}
            {messages.map((message, index) => {
              const isSystem = message.is_system
              const isLastInGroup = index === messages.length - 1 || 
                messages[index + 1].sender_id !== message.sender_id

              if (isSystem) {
                return (
                  <div key={message.id} className="flex justify-center my-2">
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Bot className="w-3 h-3" />
                      <span>{message.content}</span>
                      <Clock className="w-3 h-3" />
                    </div>
                  </div>
                )
              }

              return (
                <div key={message.id} className={`flex ${message.sender_id === 'current_user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${message.sender_id === 'current_user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.sender_id === 'current_user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        message.sender_id === 'current_user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {message.sender_id === 'current_user' ? 'You' : message.sender_name?.charAt(0) || 'U'}
                      </div>

                      {/* Message Bubble */}
                      <div className={`flex flex-col ${message.sender_id === 'current_user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2 rounded-2xl ${
                          message.sender_id === 'current_user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          
                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs opacity-80">
                                  <Paperclip className="w-3 h-3" />
                                  <span>{attachment.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        {isLastInGroup && (
                          <span className="text-xs text-gray-500 mt-1 px-2">
                            {formatMessageTime(message.created_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isTyping}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageThread
