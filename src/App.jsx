import React, { useState } from 'react';
import { Lock, Trash2, X, MessageSquare, CheckCircle, ChevronRight } from 'lucide-react';

/**
 * Professional Personal Portfolio Website: Siddhant Patil
 * Features: About, Skills, Projects, Contact, Admin Dashboard
 * Note: This version uses Local State instead of Firebase for easy local execution.
 */

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Admin & Message States (Local State)
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Project Data
  const projects = [
    {
      id: 1,
      title: "Local Business Website",
      description: "A comprehensive solution for local vendors to showcase services and handle customer inquiries efficiently.",
      tech: ["HTML", "CSS", "JS"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Lead Capture System",
      description: "A robust system designed to capture and validate user leads securely with a focus on UI flow.",
      tech: ["React", "Node.js"],
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2026&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Interactive Dashboard",
      description: "A modern, responsive administrative dashboard focusing on data visualization and clean user flow.",
      tech: ["Tailwind", "React"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const skills = [
    "HTML5", "CSS3", "JavaScript (ES6+)", "React", 
    "Responsive Design", "UI Layouts", "Bootstrap", "Git"
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const newMessage = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: new Date()
    };

    // Simulate network delay
    setTimeout(() => {
      setMessages([newMessage, ...messages]);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      e.target.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 800);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === 'patil123') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Incorrect password. Try "patil123"');
    }
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          color: #1a1a1a;
          line-height: 1.6;
          background-color: #ffffff;
          overflow-x: hidden;
        }

        header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 1rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
        }

        .logo { font-size: 1.5rem; font-weight: 800; cursor: pointer; }
        .logo span { color: #2563EB; }

        nav ul { display: flex; list-style: none; gap: 2rem; }
        nav button {
          background: none; border: none; font-size: 1rem;
          font-weight: 500; cursor: pointer; color: #666;
          transition: color 0.3s; padding: 0.5rem 0;
        }
        nav button:hover, nav button.active { color: #2563EB; }

        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 5% 10%;
          gap: 4rem;
          margin-top: 60px;
        }
        .hero-title { font-size: 4rem; line-height: 1.1; font-weight: 800; margin-bottom: 2rem; }
        .hero-title .highlight { color: #2563EB; display: block; }

        .btn-primary {
          background: #2563EB; color: white; padding: 1rem 2rem;
          border-radius: 8px; border: none; font-weight: 600;
          cursor: pointer; transition: 0.2s; display: inline-flex;
          align-items: center; gap: 0.5rem; justify-content: center;
        }
        .btn-primary:hover { transform: translateY(-2px); background: #1d4ed8; }
        .btn-secondary {
          background: #f3f4f6; color: #1a1a1a; padding: 1rem 2rem;
          border-radius: 8px; border: none; font-weight: 600; cursor: pointer;
        }

        .profile-circle {
          width: 380px; height: 380px; border-radius: 50%;
          background: #eff6ff; border: 1px solid #2563EB;
          display: flex; justify-content: center; align-items: center;
          padding: 12px;
        }
        .profile-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

        section { padding: 80px 10%; }
        .section-title { font-size: 2.5rem; margin-bottom: 3.5rem; position: relative; }
        .section-title::after {
          content: ''; position: absolute; bottom: -12px; left: 0; width: 60px; height: 5px;
          background: #2563EB; border-radius: 2px;
        }

        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem; }
        .skill-card {
          padding: 1.5rem; background: #f9fafb; border-radius: 12px;
          font-weight: 600; text-align: center; border: 1px solid transparent; transition: 0.3s;
        }
        .skill-card:hover { transform: translateY(-5px); border-color: #2563EB; background: #fff; }

        .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; }
        .project-card { background: white; border: 1px solid #eee; border-radius: 20px; overflow: hidden; transition: 0.3s; }
        .project-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .project-image { height: 220px; width: 100%; object-fit: cover; }
        .project-info { padding: 2rem; }
        .tag { font-size: 0.75rem; background: #dbeafe; padding: 0.35rem 0.85rem; border-radius: 20px; color: #2563EB; font-weight: 600; margin-right: 8px; }

        .contact-container { max-width: 650px; background: #f9fafb; padding: 3rem; border-radius: 24px; }
        input, textarea { width: 100%; padding: 1.1rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; font-family: inherit; margin-bottom: 1.5rem; }
        
        .admin-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
          z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .admin-modal {
          background: white; border-radius: 20px; width: 100%; max-width: 800px;
          max-height: 90vh; overflow-y: auto; padding: 2.5rem; position: relative;
        }
        .message-row {
          padding: 1.5rem; border-bottom: 1px solid #f0f0f0; display: flex;
          justify-content: space-between; align-items: flex-start; gap: 1rem;
        }

        .menu-toggle { display: none; background: none; border: none; cursor: pointer; }

        @media (max-width: 768px) {
          .menu-toggle { display: block; }
          nav { display: none; }
          nav.open { 
            display: block; position: absolute; top: 70px; left: 0; width: 100%; 
            background: white; padding: 2rem; border-bottom: 1px solid #eee;
          }
          nav.open ul { flex-direction: column; gap: 1rem; }
          .hero-title { font-size: 2.8rem; }
          .hero { flex-direction: column-reverse; text-align: center; }
          .profile-circle { width: 280px; height: 280px; }
          section { padding: 60px 5%; }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="logo" onClick={() => handleNavClick('home')}>
          Siddhant<span>.</span>
        </div>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : '☰'}
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li><button className={activeSection === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</button></li>
            <li><button className={activeSection === 'projects' ? 'active' : ''} onClick={() => handleNavClick('projects')}>Projects</button></li>
            <li><button className={activeSection === 'skills' ? 'active' : ''} onClick={() => handleNavClick('skills')}>Skills</button></li>
            <li><button className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About</button></li>
            <li><button className={activeSection === 'contact' ? 'active' : ''} onClick={() => handleNavClick('contact')}>Contact</button></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-tagline">Hey, I'm Siddhant Patil 👋🏻</p>
            <h1 className="hero-title">
              <span className="highlight">Web</span> Developer
            </h1>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem', color: '#444', maxWidth: '600px' }}>
              I build modern, high-performance web applications with a focus on 
              seamless user experiences and clean code architecture.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" onClick={() => handleNavClick('contact')}>Get In Touch</button>
              <button className="btn-secondary" onClick={() => handleNavClick('projects')}>View Work</button>
            </div>
          </div>
          <div className="profile-circle">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop" alt="Profile" className="profile-img" />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="project-grid">
            {projects.map(p => (
              <article key={p.id} className="project-card">
                <img src={p.image} alt={p.title} className="project-image" />
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p style={{ margin: '1rem 0', color: '#666' }}>{p.description}</p>
                  <div>
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="section-title">Expertise</h2>
          <div className="skills-grid">
            {skills.map(skill => <div key={skill} className="skill-card">{skill}</div>)}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-container">
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h3>Message Sent!</h3>
                <p>I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <textarea name="message" rows="5" placeholder="Your message..." required></textarea>
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 10%', textAlign: 'center', borderTop: '1px solid #eee' }}>
        <p style={{ fontWeight: '800', fontSize: '1.2rem' }}>Siddhant Patil</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>LinkedIn</a>
          <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>GitHub</a>
          <button 
            onClick={() => setShowAdminLogin(true)}
            style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Lock size={12} /> Admin
          </button>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showAdminLogin && !isAdminLoggedIn && (
        <div className="admin-overlay">
          <div className="admin-modal" style={{ maxWidth: '400px' }}>
            <button onClick={() => setShowAdminLogin(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>Admin Portal</h2>
            <form onSubmit={handleAdminLogin}>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                autoFocus
              />
              {loginError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{loginError}</p>}
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Access Dashboard</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {showAdminLogin && isAdminLoggedIn && (
        <div className="admin-overlay">
          <div className="admin-modal">
            <button onClick={() => setShowAdminLogin(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
              <MessageSquare color="#2563EB" />
              <h2 style={{ margin: 0 }}>Inquiries ({messages.length})</h2>
            </div>

            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                <p>No inquiries yet. Test the contact form to see messages here!</p>
              </div>
            ) : (
              <div style={{ background: '#f9fafb', borderRadius: '15px' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="message-row">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '700' }}>{msg.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{msg.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p style={{ color: '#2563EB', fontSize: '0.9rem' }}>{msg.email}</p>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{msg.message}</p>
                    </div>
                    <button onClick={() => deleteMessage(msg.id)} style={{ background: '#fee2e2', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button className="btn-secondary" onClick={() => setIsAdminLoggedIn(false)}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { width: '100%', minHeight: '100vh' }
};

export default App;