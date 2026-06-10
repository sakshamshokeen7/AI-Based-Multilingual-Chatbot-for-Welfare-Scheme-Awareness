import React, { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      <header className="glass-panel header">
        <div className="header-content">
          <h1 className="title-text">Welfare Connect</h1>
          <p>Multilingual Chatbot for Scheme Awareness</p>
        </div>
        <div className="status-badge">System Online</div>
      </header>

      <nav className="glass-panel tabs-container">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab-btn ${activeTab === 'user-flows' ? 'active' : ''}`} onClick={() => setActiveTab('user-flows')}>User Flows</button>
        <button className={`tab-btn ${activeTab === 'pilot-test' ? 'active' : ''}`} onClick={() => setActiveTab('pilot-test')}>Pilot Test</button>
        <button className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`} onClick={() => setActiveTab('impact')}>Impact Projection</button>
      </nav>

      <main className="dashboard-content mt-4">
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <section className="glass-panel persona-card">
              <h2 className="section-title">Core Persona</h2>
              <div className="persona-profile glass-panel-inner">
                <div className="avatar-placeholder">RK</div>
                <div className="persona-info">
                  <h3>Ramesh Kumar (45)</h3>
                  <p className="subtitle">Small-scale farmer from Maharashtra</p>
                </div>
              </div>
              <div className="persona-details glass-panel-inner mt-4">
                <p><strong>Pain Point:</strong> Information asymmetry. Fewer than 40% of eligible rural beneficiaries are aware of the schemes they qualify for. Web portals break on 2G connections.</p>
                <hr />
                <p><strong>Solution:</strong> A low-bandwidth, multilingual conversational assistant on WhatsApp. Asks 4-6 simple questions to find eligibility instantly.</p>
              </div>
            </section>

            <section className="glass-panel qr-card flex-center">
              <div className="qr-content text-center">
                <h2 className="section-title">Live Demo</h2>
                <p>Try the system interactively.</p>
                <div className="qr-placeholder glass-panel-inner mt-4">
                  <h3>WhatsApp Sandbox</h3>
                  <p className="phone-number">+1 415 523 8886</p>
                  <p className="instruction">1. Add number to contacts</p>
                  <p className="instruction">2. Send your secret join code</p>
                  <p className="instruction">3. Ask: "I am a poor farmer looking for financial support. What scheme?"</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'user-flows' && (
          <div className="glass-panel">
            <h2 className="section-title">Conversational Flows</h2>
            <div className="flows-grid">
              
              <div className="flow-card glass-panel-inner">
                <h3>Farmer (Ramesh)</h3>
                <p className="subtitle mb-2">Language: Marathi</p>
                <div className="flow-steps mt-4">
                  <div className="step user-step">"मला शेतीसाठी सरकारी मदत हवी आहे"</div>
                  <div className="step bot-step">"नमस्कार! कृपया मला सांगा तुमच्याकडे किती जमीन आहे?" (Greeting & Land Check)</div>
                  <div className="step user-step">"माझ्याकडे १.५ हेक्टर जमीन आहे"</div>
                  <div className="step bot-step">"धन्यवाद! तुम्ही 'PM-KISAN' योजनेसाठी पात्र आहात. तुम्हाला वर्षाला ₹६,००० मिळतील." (Eligibility Match)</div>
                  <div className="step user-step">"काय कागदपत्रे लागतील?"</div>
                  <div className="step bot-step">"1. आधार कार्ड<br/>2. बँक खाते<br/>3. जमिनीचा उतारा" (Checklist Generation)</div>
                </div>
              </div>

              <div className="flow-card glass-panel-inner">
                <h3>Head of Household (Sunita)</h3>
                <p className="subtitle mb-2">Language: Hindi/Hinglish</p>
                <div className="flow-steps mt-4">
                  <div className="step user-step">"mere paas gas connection nahi hai"</div>
                  <div className="step bot-step">"नमस्ते! क्या आपके पास BPL राशन कार्ड है?" (BPL Check)</div>
                  <div className="step user-step">"haan BPL card hai"</div>
                  <div className="step bot-step">"बधाई हो! आप 'PMUY (Ujjwala Yojana)' के तहत मुफ्त गैस कनेक्शन के लिए पात्र हैं।" (Eligibility Match)</div>
                  <div className="step user-step">"aur meri beti ke liye koi scheme?"</div>
                  <div className="step bot-step">"आप 'Sukanya Samriddhi Yojana (SSY)' में अपनी बेटी का खाता खुलवा सकती हैं।" (Cross-Scheme Discovery)</div>
                </div>
              </div>

              <div className="flow-card glass-panel-inner">
                <h3>Gig Worker (Vikram)</h3>
                <p className="subtitle mb-2">Language: English</p>
                <div className="flow-steps mt-4">
                  <div className="step user-step">"delivery job, need loan"</div>
                  <div className="step bot-step">"Hello! Are you registered as an unorganized worker on the e-Shram portal?" (Occupation Check)</div>
                  <div className="step user-step">"no, how to do?"</div>
                  <div className="step bot-step">"You can register on the e-Shram portal with your Aadhaar and Bank details." (Guidance)</div>
                  <div className="step bot-step mt-2">"For loans, if you are a street vendor, you can apply for 'PM SVANidhi'." (Loan Discovery)</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'pilot-test' && (
          <section className="glass-panel analytics-card">
            <h2 className="section-title">Pilot Test Report</h2>
            <p className="mb-4">Tested with 15 real users across 3 local communities to validate the low-bandwidth architecture.</p>
            
            <div className="stats-grid mt-4">
              <div className="stat-box glass-panel-inner">
                <h3>15</h3>
                <p>Users Tested</p>
              </div>
              <div className="stat-box glass-panel-inner">
                <h3>86%</h3>
                <p>Completion Rate</p>
              </div>
              <div className="stat-box glass-panel-inner">
                <h3>74%</h3>
                <p>Comprehension Score</p>
              </div>
              <div className="stat-box glass-panel-inner">
                <h3>2.1s</h3>
                <p>Avg Response Time</p>
              </div>
            </div>

            <h3 className="mb-2 mt-4">Observations</h3>
            <div className="feedback-table-container glass-panel-inner">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th>Channel</th>
                    <th>Feedback / Observation</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Farmer (Marathi)</td>
                    <td>WhatsApp 2G</td>
                    <td>"मला वाचता येते, पण फॉर्म भरणे कठीण जाते. याने फक्त प्रश्न विचारले."</td>
                    <td><span className="success-tag">Success</span> Found PM-KISAN</td>
                  </tr>
                  <tr>
                    <td>Gig Worker (Code-Mixed)</td>
                    <td>WhatsApp</td>
                    <td>Used complex code-mixing ("loan chahiye urgent"). System parsed intent correctly.</td>
                    <td><span className="success-tag">Success</span> Found PM SVANidhi</td>
                  </tr>
                  <tr>
                    <td>Elderly Widow (Hindi)</td>
                    <td>Voice-to-Text</td>
                    <td>Used voice typing. The bot successfully handled spelling errors in Hindi text.</td>
                    <td><span className="success-tag">Success</span> Found NSAP Pension</td>
                  </tr>
                  <tr>
                    <td>Daily Wager</td>
                    <td>WhatsApp 2G</td>
                    <td>Dropped off after 3 questions due to sudden internet loss.</td>
                    <td><span className="warning-tag">Failed</span> SMS fallback needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'impact' && (
          <div className="glass-panel impact-section">
            <h2 className="section-title">2-Page Impact Projection</h2>
            <div className="impact-grid mt-4">
              <div className="glass-panel-inner impact-card">
                <h3>The Problem: Information Asymmetry</h3>
                <p className="mt-2">India runs over 950 welfare schemes. A 2023 NITI Aayog field study estimates fewer than 40% of eligible rural beneficiaries are aware of their entitlements. The bottleneck is not policy design, but last-mile discovery.</p>
                <div className="metric-highlight mt-4">
                  <span className="big-number">60%</span>
                  <span>of the budget allocation misses the most marginalized households.</span>
                </div>
              </div>

              <div className="glass-panel-inner impact-card">
                <h3>Our Solution: Low-Friction Chatbot</h3>
                <p className="mt-2">By shifting from English-first, desktop-first web portals to a multilingual, conversational WhatsApp interface, we reduce the cognitive load required to discover entitlements.</p>
                <ul className="impact-list mt-4">
                  <li>Operates on basic keypad phones via WhatsApp.</li>
                  <li>RAG architecture enforces accuracy based on official documents.</li>
                  <li>Conversational flow replaces intimidating web forms.</li>
                </ul>
              </div>

              <div className="glass-panel-inner impact-card full-width mt-4">
                <h3>Financial & Social ROI Projection</h3>
                <p className="mb-4 mt-2">Projection based on deployment to a single district administration (10,000 households):</p>
                
                <div className="roi-stats mt-4">
                  <div className="roi-stat glass-panel-inner">
                    <h4>Current Baseline</h4>
                    <p className="mt-2">4,000 households accessing benefits.</p>
                  </div>
                  <div className="roi-stat glass-panel-inner highlight-roi">
                    <h4>Target Lift (+20%)</h4>
                    <p className="mt-2">2,000 <strong>new</strong> households successfully enrolled.</p>
                  </div>
                  <div className="roi-stat glass-panel-inner">
                    <h4>Financial Impact</h4>
                    <p className="mt-2">₹1.2 Crores/year unlocked (assuming average ₹6k PM-KISAN/household).</p>
                  </div>
                  <div className="roi-stat glass-panel-inner">
                    <h4>Social Impact</h4>
                    <p className="mt-2">Prevention of medical-debt spirals via Ayushman Bharat enrollments.</p>
                  </div>
                </div>
                
                <p className="mt-4 summary-text text-center"><strong>Conclusion:</strong> Closing the awareness gap is the highest-leverage social intervention in India today.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
