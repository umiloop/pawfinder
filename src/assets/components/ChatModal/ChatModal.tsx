import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../../../services/GeminiService';
import ReactMarkdown from 'react-markdown';
import './Chatmodal.css';

interface ChatModalProps {
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage = "Hello! I'm Paw Finder's assistant. How can I help you with pet adoption today?";
    setMessages([{
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
      isTyping: false
    }]);
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateTyping = (text: string, sender: 'user' | 'bot') => {
    const message: Message = {
      text: '',
      sender,
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, message]);
    
    let currentText = '';
    const typingSpeed = 15; // Faster typing speed (15ms)
    
    const typeNextChar = () => {
      if (currentText.length < text.length) {
        currentText += text[currentText.length];
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...message,
            text: currentText,
            isTyping: true
          };
          return newMessages;
        });
        setTimeout(typeNextChar, typingSpeed);
      } else {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...message,
            text: currentText,
            isTyping: false
          };
          return newMessages;
        });
      }
    };
    
    typeNextChar();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetchGeminiResponse(input);
      simulateTyping(response, 'bot');
    } catch (error) {
      console.error('Error fetching response:', error);
      simulateTyping("I'm sorry, I couldn't process your request at the moment. Please try again later.", 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      return await GeminiService.getChatResponse(prompt);
    } catch (error) {
      console.error('Error fetching response:', error);
      throw error;
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-container" onClick={e => e.stopPropagation()}>
        <div className="chat-modal-header">
          <div className="chat-header-content">
            <div className="chat-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"></path>
                <path d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                <path d="M12 15c-2.761 0-5 2.239-5 5"></path>
                <path d="M12 15c2.761 0 5 2.239 5 5"></path>
              </svg>
            </div>
            <div className="chat-title">
              <h3>Paw Finder Assistant</h3>
              <span className="chat-status">Online</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.sender === 'bot' && (
                <div className="bot-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"></path>
                    <path d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                    <path d="M12 15c-2.761 0-5 2.239-5 5"></path>
                    <path d="M12 15c2.761 0 5 2.239 5 5"></path>
                  </svg>
                </div>
              )}
              <div className="message-bubble">
                <div className="message-content">
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                  {msg.isTyping && <span className="typing-cursor">|</span>}
                </div>
                <div className="message-timestamp">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="bot-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"></path>
                  <path d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                  <path d="M12 15c-2.761 0-5 2.239-5 5"></path>
                  <path d="M12 15c2.761 0 5 2.239 5 5"></path>
                </svg>
              </div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
            ref={inputRef}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;