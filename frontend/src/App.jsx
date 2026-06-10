import React from 'react'
import './App.css'

function App() {
  return (
    <div className="dashboard-container">
      <header className="glass-panel header">
        <div className="header-content">
          <h1 className="gradient-text">Welfare Connect</h1>
          <p>AI-Powered Multilingual Chatbot for Scheme Awareness</p>
        </div>
        <div className="status-badge">🟢 System Online</div>
      </header>

      <main className="dashboard-grid">
        <section className="glass-panel analytics-card">
          <h2 className="section-title">📊 Pilot Test Results</h2>
          <div className="stats-grid">
            <div className="stat-box glass-panel-inner">
              <h3>150+</h3>
              <p>Farmers Assisted</p>
            </div>
            <div className="stat-box glass-panel-inner">
              <h3>5</h3>
              <p>Languages Supported</p>
            </div>
            <div className="stat-box glass-panel-inner">
              <h3>98%</h3>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-box glass-panel-inner">
              <h3>&lt; 3s</h3>
              <p>Avg Response Time</p>
            </div>
          </div>
          <div className="chart-container glass-panel-inner">
            <p className="chart-title">Usage by Language</p>
            <div className="chart">
              <div className="bar-wrapper"><div className="bar" style={{height: '80%'}}></div><span>Hindi</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '30%'}}></div><span>English</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '65%'}}></div><span>Marathi</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div><span>Tamil</span></div>
            </div>
          </div>
        </section>

        <section className="glass-panel persona-card">
          <h2 className="section-title">👥 Target Persona</h2>
          <div className="persona-profile glass-panel-inner">
            <div className="avatar">👨🏽‍🌾</div>
            <div className="persona-info">
              <h3>Ramesh Kumar (45)</h3>
              <p className="subtitle">Small-scale farmer from Maharashtra</p>
            </div>
          </div>
          <div className="persona-details glass-panel-inner mt-4">
            <p><strong>Pain Point:</strong> Cannot navigate complex government portals and only speaks local languages.</p>
            <hr />
            <p><strong>Solution:</strong> Uses standard WhatsApp to message our bot and receives instant, accurate guidance in his native language.</p>
          </div>
        </section>

        <section className="glass-panel qr-card flex-center">
          <div className="qr-content text-center">
            <h2 className="section-title">📱 Live Demo</h2>
            <p>Try it out yourself right now!</p>
            <div className="qr-placeholder glass-panel-inner">
              <h3>WhatsApp Sandbox</h3>
              <p className="phone-number">+1 415 523 8886</p>
              <p className="instruction">1. Add number to contacts</p>
              <p className="instruction">2. Send your secret join code</p>
              <p className="instruction">3. Ask a question!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
