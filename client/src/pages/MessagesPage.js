// src/pages/MessagesPage.js
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, GraduationCap, Building, Briefcase, DollarSign, Search } from 'lucide-react';

const MessagesPage = ({ userRole, authToken }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock conversation data based on user role
  const getMockConversations = (role) => {
    switch (role) {
      case 'student':
        return [
          {
            id: 1,
            name: 'Tech Innovations Inc.',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/4F46E5/white?text=TI',
            lastMessage: 'Thanks for your application! When are you available for an interview?',
            timestamp: '2023-06-15T10:30:00Z',
            unread: true
          },
          {
            id: 2,
            name: 'Global Enterprises',
            role: 'business',
            avatar: 'https://placehold.co/100x100/059669/white?text=GE',
            lastMessage: 'We loved your portfolio! Would you be interested in our summer internship?',
            timestamp: '2023-06-14T15:45:00Z',
            unread: false
          }
        ];
      case 'startup':
        return [
          {
            id: 1,
            name: 'Alex Johnson',
            role: 'student',
            avatar: 'https://placehold.co/100x100/DC2626/white?text=AJ',
            lastMessage: 'Hi! I saw your posting and I\'m very interested in the frontend role.',
            timestamp: '2023-06-15T09:20:00Z',
            unread: true
          },
          {
            id: 2,
            name: 'Venture Capital Partners',
            role: 'investor',
            avatar: 'https://placehold.co/100x100/7C3AED/white?text=VCP',
            lastMessage: 'We\'d like to schedule a pitch meeting next week. Are you available?',
            timestamp: '2023-06-13T11:30:00Z',
            unread: false
          }
        ];
      case 'business':
        return [
          {
            id: 1,
            name: 'Sarah Miller',
            role: 'student',
            avatar: 'https://placehold.co/100x100/EA580C/white?text=SM',
            lastMessage: 'Thank you for the internship offer! I have a few questions about the role.',
            timestamp: '2023-06-15T08:15:00Z',
            unread: false
          },
          {
            id: 2,
            name: 'GreenTech Solutions',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/0D9488/white?text=GTS',
            lastMessage: 'We\'re interested in your mentorship program. Can we discuss details?',
            timestamp: '2023-06-12T14:20:00Z',
            unread: false
          }
        ];
      case 'investor':
        return [
          {
            id: 1,
            name: 'AI Healthcare Platform',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/BE123C/white?text=AHP',
            lastMessage: 'Here\'s our updated pitch deck with the latest metrics.',
            timestamp: '2023-06-15T12:00:00Z',
            unread: true
          },
          {
            id: 2,
            name: 'FinTech Innovators',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/0891B2/white?text=FTI',
            lastMessage: 'We\'ve secured our first 10 customers! Revenue is growing 20% MoM.',
            timestamp: '2023-06-10T16:45:00Z',
            unread: false
          }
        ];
      default:
        return [];
    }
  };

  // Mock message history for a conversation
  const getMockMessages = (conversationId) => {
    return [
      {
        id: 1,
        sender: 'other',
        content: 'Hi there! I saw your profile and I think you\'d be a great fit for our team.',
        timestamp: '2023-06-14T10:00:00Z'
      },
      {
        id: 2,
        sender: 'me',
        content: 'Thanks for reaching out! I\'m definitely interested. Can you tell me more about the role?',
        timestamp: '2023-06-14T10:05:00Z'
      },
      {
        id: 3,
        sender: 'other',
        content: 'Of course! We\'re looking for a frontend developer with React experience...',
        timestamp: '2023-06-14T10:10:00Z'
      }
    ];
  };

  useEffect(() => {
    // Simulate API call to fetch conversations
    const fetchConversations = async () => {
      try {
        // In real implementation:
        // const response = await fetch('/api/messages/conversations', {
        //   headers: { Authorization: `Bearer ${authToken}` }
        // });
        // const data = await response.json();
        
        const mockData = getMockConversations(userRole);
        setConversations(mockData);
        
        if (mockData.length > 0) {
          setActiveConversation(mockData[0]);
          setMessages(getMockMessages(mockData[0].id));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userRole, authToken]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(getMockMessages(conversation.id));
    
    // Mark as read
    if (conversation.unread) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversation.id ? { ...conv, unread: false } : conv
        )
      );
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add message to UI immediately (optimistic update)
    const message = {
      id: Date.now(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // In real implementation, send to backend:
    // await fetch('/api/messages/send', {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authToken}`
    //   },
    //   body: JSON.stringify({ 
    //     conversationId: activeConversation.id, 
    //     content: newMessage 
    //   })
    // });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'startup': return <Building className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'investor': return <DollarSign className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading your messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'student' && 'Chat with startups and businesses about opportunities'}
            {userRole === 'startup' && 'Connect with students and investors'}
            {userRole === 'business' && 'Communicate with students and startup partners'}
            {userRole === 'investor' && 'Discuss investment opportunities with startups'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Conversations Sidebar */}
            <div className="w-full md:w-96 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {conversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No conversations yet</h3>
                    <p className="text-gray-500 text-sm">
                      Start a conversation by messaging your matches
                    </p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        activeConversation?.id === conversation.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex items-center">
                        <img 
                          src={conversation.avatar} 
                          alt={conversation.name} 
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                            {conversation.unread && (
                              <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="flex items-center text-xs text-gray-500 mr-2">
                              {getRoleIcon(conversation.role)}
                              <span className="ml-1 capitalize">{conversation.role}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center">
                      <img 
                        src={activeConversation.avatar} 
                        alt={activeConversation.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{activeConversation.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          {getRoleIcon(activeConversation.role)}
                          <span className="ml-1 capitalize">{activeConversation.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'me'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">
                      Choose a conversation from the sidebar to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;