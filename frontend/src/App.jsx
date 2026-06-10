import React from 'react';
import './App.css';

function App() {
  const handleDemoClick = () => {
    alert("This will connect to the Twilio Sandbox live demo link!");
  };

  return (
    <div className="app-container">
      <header className="glass-nav">
        <h1>NSS Open Projects 2026</h1>
        <nav className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#personas">User Flows</a>
          <a href="#impact">Impact Report</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2>AI Multilingual Chatbot</h2>
            <p>
              Bridging the awareness gap for government welfare schemes through an intuitive, 
              low-bandwidth WhatsApp assistant powered by Google Gemini.
            </p>
            <button className="cta-button" onClick={handleDemoClick}>
              Try Live Demo
            </button>
          </div>
          
          <div className="hero-graphics">
            <div className="glass-card">
              <p className="bot-msg">नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p>
              <p className="user-msg">Aadhaar card kho gaya hai</p>
              <p className="bot-msg">कृपया चिंता न करें। आप डुप्लीकेट आधार के लिए आवेदन कर सकते हैं...</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
