import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  MessageCircle,
  Send,
  Paperclip,
  Image,
  Search,
  MoreVertical,
  Clock
} from 'lucide-react'

const Messages = () => {
  const { threadId } = useParams()
  const [selectedThread, setSelectedThread] = useState(threadId || '1')
  const [messageInput, setMessageInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const threads = [
    {
      id: '1',
      taskTitle: 'Build a responsive website',
      taskId: 101,
      partner: {
        name: 'Li Student',
        avatar: 'L',
        online: true
      },
      lastMessage: 'Great! I will start working on it tomorrow',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      updatedAt: '2024-01-20 10:30'
    },
    {
      id: '2',
      taskTitle: 'Logo design for startup',
      taskId: 102,
      partner: {
        name: 'Wang Student',
        avatar: 'W',
        online: false
      },
      lastMessage: 'Here are the initial concepts',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      updatedAt: '2024-01-19 15:45'
    },
    {
      id: '3',
      taskTitle: 'Python data analysis',
      taskId: 103,
      partner: {
        name: 'Chen Student',
        avatar: 'C',
        online: true
      },
      lastMessage: 'The analysis is complete!',
      lastMessageTime: 'Jan 18',
      unreadCount: 0,
      updatedAt: '2024-01-18 18:00'
    }
  ]

  const messages = {
    '1': [
      {
        id: 1,
        sender: 'partner',
        content: 'Hi! Thank you for accepting my proposal. I have a few questions about the project requirements.',
        timestamp: '2024-01-20 09:15',
        type: 'text'
      },
      {
        id: 2,
        sender: 'me',
        content: 'Sure! What would you like to know?',
        timestamp: '2024-01-20 09:20',
        type: 'text'
      },
      {
        id: 3,
        sender: 'partner',
        content: 'What color scheme would you prefer for the website?',
        timestamp: '2024-01-20 09:25',
        type: 'text'
      },
      {
        id: 4,
        sender: 'me',
        content: 'I would like a modern blue and white theme, similar to professional tech companies.',
        timestamp: '2024-01-20 09:30',
        type: 'text'
      },
      {
        id: 5,
        sender: 'system',
        content: 'Contract has been created and activated. Payment of 48 TC is in escrow.',
        timestamp: '2024-01-20 10:00',
        type: 'system'
      },
      {
        id: 6,
        sender: 'partner',
        content: 'Perfect! I can start working on it immediately. Should be done by next week.',
        timestamp: '2024-01-20 10:30',
        type: 'text'
      }
    ],
    '2': [
      {
        id: 1,
        sender: 'partner',
        content: 'Hello! Excited to work on your logo design.',
        timestamp: '2024-01-19 10:00',
        type: 'text'
      },
      {
        id: 2,
        sender: 'me',
        content: 'Great! Looking forward to seeing your concepts.',
        timestamp: '2024-01-19 10:15',
        type: 'text'
      },
      {
        id: 3,
        sender: 'partner',
        content: 'Here are the initial concepts',
        timestamp: '2024-01-19 15:45',
        type: 'text'
      }
    ],
    '3': []
  }

  const currentThread = threads.find(t => t.id === selectedThread)
  const currentMessages = messages[selectedThread] || []

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    console.log('Sending message:', messageInput)
    setMessageInput('')
  }

  const filteredThreads = threads.filter(thread =>
    thread.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow">
      {/* Thread List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campus-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.map(thread => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread.id)}
              className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                selectedThread === thread.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium">{thread.partner.avatar}</span>
                  </div>
                  {thread.partner.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900 truncate">{thread.partner.name}</p>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{thread.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">{thread.taskTitle}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
                    {thread.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {filteredThreads.length === 0 && (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {currentThread ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{currentThread.partner.name}</h3>
                <p className="text-sm text-gray-600">{currentThread.taskTitle}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
                </div>
              ) : (
                currentMessages.map(message => {
                  if (message.type === 'system') {
                    return (
                      <div key={message.id} className="flex justify-center">
                        <div className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full max-w-md text-center">
                          {message.content}
                        </div>
                      </div>
                    )
                  }

                  const isMe = message.sender === 'me'
                  return (
                    <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg px-4 py-2 ${
                          isMe 
                            ? 'bg-campus-blue text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                          isMe ? 'justify-end' : 'justify-start'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campus-blue focus:border-transparent resize-none"
                    rows="2"
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="bg-campus-blue hover:bg-campus-purple text-white p-3 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages

