import React, { useState } from 'react';
import ChatModal from '../ChatModal/ChatModal';
import './FloatingChatButton.css';

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button 
        className="floating-chat-button"
        onClick={toggleChat}
        aria-label="Open chat assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      
      {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default FloatingChatButton;