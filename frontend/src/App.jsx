import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [demoStep, setDemoStep] = useState(0);

  // Animated WhatsApp demo logic
  useEffect(() => {
    if (activeTab === 'overview') {
      let timeouts = [];
      const runDemo = () => {
        setDemoStep(0);
        timeouts.push(setTimeout(() => setDemoStep(1), 600));   // Show user msg
        timeouts.push(setTimeout(() => setDemoStep(2), 1200));  // Show typing indicator
        timeouts.push(setTimeout(() => setDemoStep(3), 3200));  // Show bot reply 1
        timeouts.push(setTimeout(() => setDemoStep(4), 4000));  // Show bot reply 2 (Checklist)
      };
      
      runDemo();
      const interval = setInterval(runDemo, 8000);
      return () => {
        timeouts.forEach(clearTimeout);
        clearInterval(interval);
      };
    }
  }, [activeTab]);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          {/* Tractor Logo */}
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '12px'}}>
            <circle cx="50" cy="50" r="45" fill="#e8a020" opacity="0.15"/>
            <path d="M25 60 L 25 45 L 60 45 L 70 55 L 85 55 L 85 65 L 25 65 Z" fill="#e8a020" />
            <path d="M30 45 L 30 25 L 55 25 L 60 45 Z" stroke="#e8a020" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <path d="M65 45 L 65 30 L 68 30 L 68 45 Z" fill="#e8a020" />
            <circle cx="40" cy="65" r="16" fill="#120d06" stroke="#e8a020" strokeWidth="4" />
            <circle cx="75" cy="65" r="10" fill="#120d06" stroke="#e8a020" strokeWidth="4" />
            <circle cx="40" cy="65" r="4" fill="#e8a020" />
            <circle cx="75" cy="65" r="3" fill="#e8a020" />
            <path d="M15 85 L 85 85" stroke="#25d366" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="header-text-container">
            <h1 className="title-text">Welfare Connect</h1>
            <p className="subtitle-text">Multilingual Chatbot · Rural India Welfare Discovery</p>
          </div>
        </div>
        <div className="status-badge">
          <div className="status-dot"></div>
          System Online
        </div>
      </header>

      <nav className="tabs-container glass-panel">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab-btn ${activeTab === 'user-flows' ? 'active' : ''}`} onClick={() => setActiveTab('user-flows')}>User Flows</button>
        <button className={`tab-btn ${activeTab === 'pilot-test' ? 'active' : ''}`} onClick={() => setActiveTab('pilot-test')}>Pilot Test</button>
        <button className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`} onClick={() => setActiveTab('impact')}>Impact Projection</button>
      </nav>

      <main className="dashboard-content mt-4">
        {/* =====================================================================
            TAB 1: OVERVIEW 
        ====================================================================== */}
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            <section className="glass-panel persona-card">
              <h2 className="section-title">Core Persona</h2>
              <div className="persona-profile glass-panel-inner" style={{position: 'relative'}}>
                {/* Chibi Farmer SVG */}
                <div style={{width:'60px', height:'60px', borderRadius:'50%', background:'var(--inner-bg)', display:'flex', alignItems:'center', justifyContent:'center', border: '2px solid var(--primary)', overflow: 'hidden'}}>
                  <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: '10px'}}>
                    <path d="M25 100 C 25 80, 75 80, 75 100" fill="#c0552a" />
                    <circle cx="50" cy="60" r="22" fill="#ffcd94" />
                    <path d="M35 65 Q 50 55 65 65" stroke="#4a3000" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    <circle cx="41" cy="55" r="3" fill="#1e1509" />
                    <circle cx="59" cy="55" r="3" fill="#1e1509" />
                    <path d="M20 45 C 20 20, 80 20, 80 45 C 80 55, 65 50, 50 50 C 35 50, 20 55, 20 45 Z" fill="#e8a020" />
                    <path d="M75 40 Q 95 50 85 70" stroke="#e8a020" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div className="persona-info">
                  <h3>Ramesh Kumar (45)</h3>
                  <p className="subtitle">Small-scale farmer from Maharashtra</p>
                </div>
              </div>
              
              <div className="missed-counter mt-4 glass-panel-inner">
                <svg className="ring-gauge" viewBox="0 0 100 100" style={{width:'80px', height:'80px'}}>
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-fill amber" cx="50" cy="50" r="40" style={{'--target-offset': '100.48'}} />
                  <text className="ring-text" x="50" y="55">60%</text>
                </svg>
                <div>
                  <h4 style={{color:'var(--text-main)'}}>Schemes Potentially Missed</h4>
                  <p style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>Due to information asymmetry & connectivity barriers.</p>
                </div>
              </div>

              <div className="persona-details glass-panel-inner mt-4">
                <p><strong>Pain Point:</strong> Information asymmetry. Web portals are English-first, desktop-first, and break on 2G connections.</p>
                <hr />
                <p className="solution-border" style={{paddingLeft: '1rem'}}>
                  <strong>Solution:</strong> A low-bandwidth, multilingual conversational assistant on WhatsApp. Asks 4-6 simple questions to find eligibility instantly.
                </p>
              </div>
            </section>

            <section className="glass-panel flex-center" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2 className="section-title text-center" style={{marginBottom:'0.5rem'}}>Live Demo</h2>
              <p className="text-center" style={{color:'var(--text-muted)', marginBottom:'1.5rem'}}>Tap the WhatsApp number to try the Sandbox.</p>
              
              <div className="whatsapp-mock">
                <div className="wa-header">
                  <div className="wa-avatar">WC</div>
                  <div className="wa-contact-info">
                    <div className="wa-name">Welfare Connect</div>
                    <div className="wa-status">online</div>
                  </div>
                </div>
                <div className="wa-chat-bg"></div>
                <div className="wa-messages">
                  
                  {demoStep >= 1 && (
                    <div className="wa-bubble wa-user">
                      I am a poor farmer looking for financial support. What scheme?
                      <span className="wa-timestamp">10:00</span>
                    </div>
                  )}

                  {demoStep === 2 && (
                    <div className="wa-bubble wa-bot">
                      <div className="wa-typing">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  )}

                  {demoStep >= 3 && (
                    <div className="wa-bubble wa-bot">
                      Namaskar! I can help you find government schemes. To check your eligibility, could you please tell me your age?
                      <span className="wa-timestamp">10:00</span>
                    </div>
                  )}

                  {demoStep >= 4 && (
                    <div className="wa-bubble wa-bot">
                      <strong>Example Profile Gathering...</strong>
                      <p style={{fontSize:'0.8rem', marginTop:'4px', color:'rgba(255,255,255,0.7)'}}>Age → Gender → Occupation → Income → Location</p>
                    </div>
                  )}

                </div>
              </div>
              <div className="mt-4 text-center">
                <a href="https://wa.me/14155238886?text=join%20your-secret-code" target="_blank" rel="noreferrer" style={{color:'var(--accent-green)', fontWeight:'bold', textDecoration:'none', fontSize:'1.2rem'}}>
                  +1 415 523 8886
                </a>
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 2: USER FLOWS 
        ====================================================================== */}
        {activeTab === 'user-flows' && (
          <div className="glass-panel">
            <h2 className="section-title">Conversational Flows — 3 Personas</h2>
            <p style={{color:'var(--text-muted)', marginBottom:'1.5rem', fontSize:'0.9rem'}}>
              The bot runs a 5-question interview before switching to RAG-powered scheme retrieval. Conversations below reflect actual database responses.
            </p>
            <div className="flows-grid">

              {/* Persona 1: Farmer */}
              <div className="whatsapp-mock" style={{height:'auto', maxHeight:'600px'}}>
                <div className="wa-header">
                  <div className="wa-avatar" style={{background:'transparent', overflow:'hidden', border: '2px solid #c0552a', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" style={{marginTop: '5px'}}>
                      <path d="M25 100 C 25 80, 75 80, 75 100" fill="#c0552a" />
                      <circle cx="50" cy="60" r="22" fill="#ffcd94" />
                      <path d="M35 65 Q 50 55 65 65" stroke="#4a3000" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <circle cx="41" cy="55" r="3" fill="#1e1509" />
                      <circle cx="59" cy="55" r="3" fill="#1e1509" />
                      <path d="M20 45 C 20 20, 80 20, 80 45 C 80 55, 65 50, 50 50 C 35 50, 20 55, 20 45 Z" fill="#e8a020" />
                      <path d="M75 40 Q 95 50 85 70" stroke="#e8a020" strokeWidth="8" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="wa-contact-info">
                    <div className="wa-name">Farmer (Marathi/Hindi)</div>
                    <div className="wa-status">45 yrs · BPL · Maharashtra</div>
                  </div>
                </div>
                <div className="wa-chat-bg"></div>
                <div className="wa-messages">
                  <div className="wa-bubble wa-user">I am a farmer and I need help finding government schemes</div>
                  <div className="wa-bubble wa-bot">That's great, I can certainly help you! To get started, could you please tell me your age?</div>
                  <div className="wa-bubble wa-user">I am 45 years old</div>
                  <div className="wa-bubble wa-bot">Thank you. And what is your occupation?</div>
                  <div className="wa-bubble wa-user">I am a male farmer, I have 1.5 hectares of land</div>
                  <div className="wa-bubble wa-bot">Got it. What is your approximate annual income, or are you BPL / APL status?</div>
                  <div className="wa-bubble wa-user">My income is below poverty line</div>
                  <div className="wa-bubble wa-bot">Thank you! Which state in India do you reside in?</div>
                  <div className="wa-bubble wa-user">I am from Maharashtra</div>
                  <div className="wa-bubble wa-bot">✅ Thank you! I have successfully gathered your profile. Please reply with 'show schemes' to see your personalized recommendations!</div>
                  <div className="wa-bubble wa-user">show schemes</div>
                  <div className="wa-bubble wa-bot">
                    <strong>1. PM-KISAN</strong> — ₹6,000/yr direct transfer. Eligible: landholding farmer ≤ 2 hectares.<br/><br/>
                    <strong>2. AB-PMJAY</strong> — ₹5 lakh health cover/yr. Eligible: BPL rural household.<br/><br/>
                    📄 <em style={{color:'var(--accent-green)'}}>Download Checklist PDF</em>
                  </div>
                </div>
              </div>

              {/* Persona 2: Woman HoH */}
              <div className="whatsapp-mock" style={{height:'auto', maxHeight:'600px'}}>
                <div className="wa-header">
                  <div className="wa-avatar" style={{background:'transparent', overflow:'hidden', border: '2px solid #e8a020', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" style={{marginTop: '5px'}}>
                      <path d="M20 100 C 20 60, 80 60, 80 100" fill="#d83a56" />
                      <path d="M20 100 C 50 60, 80 80, 80 100" fill="#ffcd94" opacity="0.3" />
                      <circle cx="50" cy="50" r="22" fill="#ffcd94" />
                      <path d="M 28 50 C 28 20, 72 20, 72 50 Z" fill="#1e1509" />
                      <circle cx="25" cy="55" r="8" fill="#1e1509" />
                      <circle cx="50" cy="42" r="3" fill="#d83a56" />
                      <circle cx="41" cy="50" r="3" fill="#1e1509" />
                      <circle cx="59" cy="50" r="3" fill="#1e1509" />
                      <path d="M43 60 Q 50 65 57 60" stroke="#4a3000" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="wa-contact-info">
                    <div className="wa-name">Woman HoH (Tamil)</div>
                    <div className="wa-status">38 yrs · BPL · Tamil Nadu</div>
                  </div>
                </div>
                <div className="wa-chat-bg"></div>
                <div className="wa-messages">
                  <div className="wa-bubble wa-user">என்னிடம் எரிவாயு இணைப்பு இல்லை, ஏதாவது திட்டம் சொல்லுங்கள்</div>
                  <div className="wa-bubble wa-bot">நான் நிச்சயமாக உங்களுக்கு உதவ முடியும். சரியான திட்டத்தைப் பரிந்துரைக்க, தயவுசெய்து உங்கள் வயதைக் கூற முடியுமா?</div>
                  <div className="wa-bubble wa-user">எனக்கு 38 வயது</div>
                  <div className="wa-bubble wa-bot">நன்றி! உங்கள் தொழில் என்ன? நீங்கள் இல்லத்தரசியா அல்லது வேறு ஏதாவது வேலை செய்கிறீர்களா?</div>
                  <div className="wa-bubble wa-user">நான் ஒரு பெண், வீட்டை நிர்வகிக்கிறேன் - BPL கார்டு உள்ளது</div>
                  <div className="wa-bubble wa-bot">புரிந்தது. நீங்கள் BPL / APL பிரிவில் வருகிறீர்களா?</div>
                  <div className="wa-bubble wa-user">நான் BPL பிரிவில் உள்ளேன்</div>
                  <div className="wa-bubble wa-bot">சரி. நீங்கள் எந்த மாநிலத்தில் வசிக்கிறீர்கள்?</div>
                  <div className="wa-bubble wa-user">நான் தமிழ்நாட்டைச் சேர்ந்தவள்</div>
                  <div className="wa-bubble wa-bot">✅ மிக்க நன்றி! உங்களது விவரங்களை நான் வெற்றிகரமாக சேகரித்துவிட்டேன். உங்களுக்கான பரிந்துரைகளைப் பார்க்க 'show schemes' என பதிலளிக்கவும்!</div>
                  <div className="wa-bubble wa-user">show schemes</div>
                  <div className="wa-bubble wa-bot">
                    உங்கள் விவரங்களின்படி (38 வயது பெண், இல்லத்தரசி, BPL, தமிழ்நாடு):<br/><br/>
                    <strong>1. PMUY (Ujjwala Yojana)</strong> — இலவச LPG இணைப்பு. தகுதி: BPL குடும்பத்தைச் சேர்ந்த 18+ வயதுடைய பெண்.<br/><br/>
                    <strong>2. PMAY-G</strong> — கான்கிரீட் வீடு கட்ட நிதியுதவி. தகுதி: சொந்த வீடு இல்லாத BPL குடும்பம்.<br/><br/>
                    📄 <em style={{color:'var(--accent-green)'}}>Download Checklist PDF</em>
                  </div>
                </div>
              </div>

              {/* Persona 3: Gig Worker */}
              <div className="whatsapp-mock" style={{height:'auto', maxHeight:'600px'}}>
                <div className="wa-header">
                  <div className="wa-avatar" style={{background:'transparent', overflow:'hidden', border: '2px solid #25d366', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" style={{marginTop: '5px'}}>
                      <path d="M25 100 C 25 70, 75 70, 75 100" fill="#25d366" />
                      <path d="M30 75 L 70 100" stroke="#120d06" strokeWidth="4" />
                      <circle cx="50" cy="55" r="20" fill="#ffcd94" />
                      <path d="M26 55 C 26 20, 74 20, 74 55 Z" fill="#e8a020" />
                      <path d="M20 55 L 80 55" stroke="#c0552a" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="41" cy="55" r="3" fill="#1e1509" />
                      <circle cx="59" cy="55" r="3" fill="#1e1509" />
                      <path d="M43 65 Q 50 70 57 65" stroke="#4a3000" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="wa-contact-info">
                    <div className="wa-name">Gig Worker (Code-Mixed)</div>
                    <div className="wa-status">28 yrs · ₹8k/mo · Delhi</div>
                  </div>
                </div>
                <div className="wa-chat-bg"></div>
                <div className="wa-messages">
                  <div className="wa-bubble wa-user">delivery job karta hoon, loan chahiye urgent</div>
                  <div className="wa-bubble wa-bot">I can help you find loan schemes! To recommend the right one, may I know your age?</div>
                  <div className="wa-bubble wa-user">28 years old hoon</div>
                  <div className="wa-bubble wa-bot">Got it. Are you a street vendor / gig worker, or do you have a registered business?</div>
                  <div className="wa-bubble wa-user">street vendor / delivery worker hoon, koi registration nahi</div>
                  <div className="wa-bubble wa-bot">Understood. What is your approximate monthly income?</div>
                  <div className="wa-bubble wa-user">around 8000 per month</div>
                  <div className="wa-bubble wa-bot">Thank you. Which city or state are you based in?</div>
                  <div className="wa-bubble wa-user">Delhi mein rehta hoon</div>
                  <div className="wa-bubble wa-bot">✅ Profile complete! Reply 'show schemes'.</div>
                  <div className="wa-bubble wa-user">show schemes</div>
                  <div className="wa-bubble wa-bot">
                    <strong>1. PM SVANidhi</strong> — Working capital loan up to ₹10,000 (no collateral). Eligible: urban street vendors.<br/><br/>
                    <strong>2. e-Shram Registration</strong> — Free NDUW card + ₹2 lakh accident insurance. Eligible: unorganized workers 16–59 yrs.<br/><br/>
                    📄 <em style={{color:'var(--accent-green)'}}>Download Checklist PDF</em>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: PILOT TEST 
        ====================================================================== */}
        {activeTab === 'pilot-test' && (
          <section className="glass-panel analytics-card">
            <h2 className="section-title">Pilot Test Report</h2>
            <p className="mb-4 text-muted">Tested with 12 users — friends, family members, and two community contacts from a nearby village — over 3 days via the Twilio WhatsApp Sandbox.</p>
            
            <div className="stats-grid mt-4">
              <div className="glass-panel-inner ring-stat-container">
                <svg className="ring-gauge" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-fill green" cx="50" cy="50" r="40" style={{'--target-offset': '0'}} />
                  <text className="ring-text" x="50" y="55">12</text>
                </svg>
                <div className="ring-label">Users Tested</div>
              </div>

              <div className="glass-panel-inner ring-stat-container">
                <svg className="ring-gauge" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-fill green" cx="50" cy="50" r="40" style={{'--target-offset': '42.7'}} /> {/* 83% */}
                  <text className="ring-text" x="50" y="55">83%</text>
                </svg>
                <div className="ring-label">Completion Rate</div>
              </div>

              <div className="glass-panel-inner ring-stat-container">
                <svg className="ring-gauge" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-fill amber" cx="50" cy="50" r="40" style={{'--target-offset': '72.8'}} /> {/* 71% */}
                  <text className="ring-text" x="50" y="55">71%</text>
                </svg>
                <div className="ring-label">Comprehension Score</div>
              </div>

              <div className="glass-panel-inner ring-stat-container">
                <svg className="ring-gauge" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-fill green" cx="50" cy="50" r="40" style={{'--target-offset': '10'}} />
                  <text className="ring-text" x="50" y="55">2.7s</text>
                </svg>
                <div className="ring-label">Avg Response Time</div>
              </div>
            </div>

            <div className="pull-quote mt-4 mb-4">
              "मला वाचता येते, पण फॉर्म भरणे कठीण जाते. याने फक्त प्रश्न विचारले."<br/>
              <span style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>(I can read, but filling forms is hard. This just asked questions.)</span>
              <div style={{marginTop:'0.5rem', fontWeight:'bold', color:'var(--primary)', fontSize:'0.85rem'}}>— 45 yr old Farmer (Marathi)</div>
            </div>

            <h3 className="mb-2 mt-4" style={{color:'var(--primary)'}}>Observations (7 sampled sessions)</h3>
            <div className="feedback-table-container glass-panel-inner">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th>Channel</th>
                    <th>Observation</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Farmer, 45 (Marathi)</td>
                    <td>WhatsApp 2G</td>
                    <td>Completed all 5 interview steps in ~4 min.</td>
                    <td><span className="success-tag">Success</span> Found PM-KISAN</td>
                  </tr>
                  <tr>
                    <td>Woman HoH, 38 (Hinglish)</td>
                    <td>WhatsApp</td>
                    <td>Bot understood "BPL card hai" without translation. Surprised the reply came in Hindi.</td>
                    <td><span className="success-tag">Success</span> Found PMUY + SSY</td>
                  </tr>
                  <tr>
                    <td>Gig Worker, 27 (Code-Mixed)</td>
                    <td>WhatsApp</td>
                    <td>"loan chahiye urgent" — inferred occupation from context.</td>
                    <td><span className="success-tag">Success</span> Found PM SVANidhi</td>
                  </tr>
                  <tr>
                    <td>Elderly Widow, 62 (Hindi)</td>
                    <td>Voice-to-Text</td>
                    <td>Transcription had spelling errors ("adhar"). Bot still matched intent.</td>
                    <td><span className="success-tag">Success</span> Found NSAP Pension</td>
                  </tr>
                  <tr>
                    <td>College Student, 21 (English)</td>
                    <td>WhatsApp</td>
                    <td>Looked up schemes for farmer parents. PDF checklist printed successfully.</td>
                    <td><span className="success-tag">Success</span> Found PM-KISAN</td>
                  </tr>
                  <tr>
                    <td>Daily Wager, 34 (Hindi)</td>
                    <td>WhatsApp 2G</td>
                    <td>Dropped off after question 3 due to internet loss. Session reset.</td>
                    <td><span className="warning-tag">Partial</span> No persistence</td>
                  </tr>
                  <tr>
                    <td>Street Vendor, 41 (Bengali)</td>
                    <td>WhatsApp</td>
                    <td>Replied in Bengali via Gemini fallback but checklist had untranslated English terms.</td>
                    <td><span className="warning-tag">Partial</span> Translation gap</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =====================================================================
            TAB 4: IMPACT PROJECTION 
        ====================================================================== */}
        {activeTab === 'impact' && (
          <div className="impact-section">

            {/* PAGE 1: Problem + Solution */}
            <div className="glass-panel" style={{marginBottom: '1.5rem'}}>
              <div style={{marginBottom:'1.5rem'}}>
                <p style={{fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', color:'var(--primary)', marginBottom:'0.4rem'}}>Impact Projection · Page 1 of 2</p>
                <h2 className="section-title" style={{fontSize:'1.8rem', marginBottom:'0.5rem'}}>The Awareness Gap Costs India Crores</h2>
                <p style={{color:'var(--text-muted)', maxWidth:'800px', fontSize:'1.1rem'}}>India operates <strong style={{color:'var(--text-main)'}}>950+ welfare schemes</strong>. The limiting factor is not funding — it is last-mile discovery.</p>
              </div>

              <div className="impact-grid">
                <div className="glass-panel-inner impact-card">
                  <h3>The Problem: Information Asymmetry</h3>
                  <p className="mt-2 text-muted">A NITI Aayog field study estimates fewer than 40% of eligible rural beneficiaries are aware of the schemes they qualify for.</p>
                  
                  <div style={{display:'flex', alignItems:'center', gap:'2rem', marginTop:'2rem'}}>
                    <svg className="donut-chart" viewBox="0 0 100 100" style={{'--pct': 60}}>
                      <circle className="donut-bg" cx="50" cy="50" r="40" />
                      <circle className="donut-segment" cx="50" cy="50" r="40" />
                      <text className="donut-text" x="50" y="55">60%</text>
                    </svg>
                    <p style={{fontWeight:'600', fontSize:'1.1rem', color:'var(--primary)'}}>Of entitled households never claim benefits because they simply don't know.</p>
                  </div>
                </div>

                <div className="glass-panel-inner impact-card">
                  <h3>Why Existing Channels Fail</h3>
                  <ul className="impact-list mt-2">
                    <li><strong>Government portals</strong> require literacy, a smartphone, and stable broadband. They break on 2G.</li>
                    <li><strong>Camp-based drives</strong> are one-time events.</li>
                    <li><strong>Middlemen</strong> charge informal fees and often give incorrect advice.</li>
                    <li><strong>Toll-free helplines</strong> have long wait times and cannot personalise.</li>
                  </ul>
                </div>

                <div className="glass-panel-inner impact-card full-width">
                  <h3>Our Solution: Zero-Friction Conversational Interface</h3>
                  <p className="mt-2 mb-4">A multilingual RAG chatbot on WhatsApp — the platform already on 500M+ Indian phones. A 5-question interview returns a personalised, actionable scheme list.</p>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem'}}>
                    <div className="glass-panel-inner text-center">
                      <div style={{fontSize:'2rem', marginBottom:'0.4rem'}}>🌐</div>
                      <strong style={{color:'var(--primary)'}}>10+ Languages</strong>
                      <p style={{fontSize:'0.82rem', color:'var(--text-muted)', marginTop:'0.3rem'}}>Via Gemini Flash translation</p>
                    </div>
                    <div className="glass-panel-inner text-center">
                      <div style={{fontSize:'2rem', marginBottom:'0.4rem'}}>📡</div>
                      <strong style={{color:'var(--accent-green)'}}>Works on 2G / SMS</strong>
                      <p style={{fontSize:'0.82rem', color:'var(--text-muted)', marginTop:'0.3rem'}}>&lt;300 char concise replies</p>
                    </div>
                    <div className="glass-panel-inner text-center">
                      <div style={{fontSize:'2rem', marginBottom:'0.4rem'}}>🎯</div>
                      <strong style={{color:'var(--accent-terracotta)'}}>RAG Accuracy</strong>
                      <p style={{fontSize:'0.82rem', color:'var(--text-muted)', marginTop:'0.3rem'}}>Grounded in official documents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 2: Economic Math */}
            <div className="glass-panel">
              <p style={{fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', color:'var(--primary)', marginBottom:'0.4rem'}}>Impact Projection · Page 2 of 2</p>
              <h2 className="section-title" style={{fontSize:'1.8rem', marginBottom:'0.5rem'}}>District-Level ROI Mathematics</h2>
              <p style={{color:'var(--text-muted)', marginBottom:'1.5rem', maxWidth:'800px', fontSize:'1.1rem'}}>
                Scenario: A single district with <strong style={{color:'var(--text-main)'}}>10,000 farming households</strong>. This bot targets the unaware population and achieves a <strong style={{color:'var(--text-main)'}}>+20% awareness lift</strong>.
              </p>

              {/* Chalkboard Calculator */}
              <div className="chalkboard-panel mb-4">
                <h4>📐 Step-by-Step Calculation: PM-KISAN</h4>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 0'}}>
                  <div className="text-center">
                    <div style={{fontSize:'2rem', color:'#bbf7d0'}}>10,000</div>
                    <div style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}}>District Farmers</div>
                  </div>
                  <div style={{fontSize:'2rem', color:'var(--primary)'}}>×</div>
                  <div className="text-center">
                    <div style={{fontSize:'2rem', color:'#bbf7d0'}}>20%</div>
                    <div style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}}>Awareness Lift</div>
                  </div>
                  <div style={{fontSize:'2rem', color:'var(--primary)'}}>=</div>
                  <div className="text-center">
                    <div style={{fontSize:'2rem', color:'#bbf7d0'}}>2,000</div>
                    <div style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}}>New Enrolments</div>
                  </div>
                  <div style={{fontSize:'2rem', color:'var(--primary)'}}>×</div>
                  <div className="text-center">
                    <div style={{fontSize:'2rem', color:'#bbf7d0'}}>₹6,000</div>
                    <div style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}}>PM-KISAN/yr</div>
                  </div>
                  <div style={{fontSize:'2rem', color:'var(--primary)'}}>=</div>
                  <div className="text-center" style={{borderBottom:'4px solid var(--accent-green)', paddingBottom:'0.5rem'}}>
                    <div style={{fontSize:'2.5rem', color:'var(--accent-green)', fontWeight:'bold'}}>₹1.2 Cr</div>
                    <div style={{fontSize:'0.9rem', color:'rgba(255,255,255,0.8)'}}>Unlocked per year</div>
                  </div>
                </div>
              </div>

              {/* Multi-scheme table */}
              <h3 style={{marginBottom:'1rem', fontSize:'1.2rem', color:'var(--primary)'}}>Scheme Stacking Value</h3>
              <div className="feedback-table-container glass-panel-inner" style={{marginBottom:'1.5rem'}}>
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>Scheme</th>
                      <th>Benefit per Household</th>
                      <th>20% Lift → New Enrolments</th>
                      <th>Annual Value Unlocked</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>PM-KISAN</strong></td>
                      <td>₹6,000 / yr</td>
                      <td>2,000 HH</td>
                      <td style={{color:'var(--accent-green)', fontWeight:700}}>₹1.20 Crore</td>
                    </tr>
                    <tr>
                      <td><strong>PMUY (Ujjwala)</strong></td>
                      <td>₹1,600 cylinder subsidy</td>
                      <td>800 HH</td>
                      <td style={{color:'var(--accent-green)', fontWeight:700}}>₹0.13 Crore</td>
                    </tr>
                    <tr>
                      <td><strong>Ayushman Bharat</strong></td>
                      <td>₹5 lakh health cover</td>
                      <td>1,200 HH</td>
                      <td style={{color:'var(--accent-green)', fontWeight:700}}>₹600 Cr coverage</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cost + Scale */}
              <div className="impact-grid">
                <div className="glass-panel-inner impact-card">
                  <h3 style={{color:'var(--primary)'}}>Cost vs. Return</h3>
                  <ul className="impact-list mt-4">
                    <li>~₹0.002 per WhatsApp msg</li>
                    <li>~₹0.001 per Gemini API call</li>
                    <li>2,000 users × 10 turns = <strong style={{color:'var(--text-main)'}}>≈ ₹600 total cost</strong></li>
                  </ul>
                  <div className="metric-highlight mt-4" style={{background:'rgba(37,211,102,0.1)', borderLeftColor:'var(--accent-green)'}}>
                    <span className="big-number" style={{color:'var(--accent-green)'}}>2,000×</span>
                    <span>ROI. ₹1.2 Cr return on ₹600 operational cost.</span>
                  </div>
                </div>

                <div className="glass-panel-inner impact-card">
                  <h3 style={{color:'var(--primary)'}}>Scaling to State Level</h3>
                  <p className="mt-2 text-muted">Maharashtra alone has 358 talukas. If deployed state-wide:</p>
                  <div className="metric-highlight mt-4" style={{background:'rgba(232,160,32,0.1)'}}>
                    <span className="big-number">₹429 Cr</span>
                    <span>in PM-KISAN alone unlocked annually across Maharashtra.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  )
}

export default App
