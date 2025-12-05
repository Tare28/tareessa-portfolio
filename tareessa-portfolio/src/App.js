import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
// In your React app
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.herokuapp.com' 
  : 'http://localhost:5000';
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      if (response.data.success) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    }
  };

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Dormitory Management System",
      description: "A comprehensive system for managing student dormitories, room assignments, maintenance requests, and student records with real-time notifications.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      image: "/api/placeholder/300/200",
      features: ["Room Allocation", "Maintenance Tracking", "Student Portal", "Admin Dashboard"],
      status: "Completed"
    },
    {
      id: 2,
      title: "E-Ticket System",
      description: "Modern ticketing platform with secure payment processing, QR code validation, and event management capabilities for various venues.",
      technologies: ["React", "Express", "MySQL", "Stripe API", "QR Code"],
      image: "/api/placeholder/300/200",
      features: ["Online Payments", "Mobile Tickets", "Event Management", "Analytics"],
      status: "In Progress"
    },
    {
      id: 3,
      title: "Food Delivery App",
      description: "Mobile-first food delivery application with real-time order tracking, restaurant partnerships, and seamless user experience.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Stripe"],
      image: "/api/placeholder/300/200",
      features: ["Live Tracking", "Multiple Restaurants", "Order History", "Ratings"],
      status: "Completed"
    },
    {
      id: 4,
      title: "Hotel Management System",
      description: "Complete hotel operations solution including booking management, billing, inventory, and customer relationship management.",
      technologies: ["React", "PHP", "MySQL", "Bootstrap", "REST API"],
      image: "/api/placeholder/300/200",
      features: ["Booking Engine", "Inventory Management", "Billing System", "CRM"],
      status: "Completed"
    }
  ];

  const skills = [
    { name: "JavaScript", level: 90, icon: "💛" },
    { name: "React", level: 85, icon: "⚛️" },
    { name: "Node.js", level: 80, icon: "🟢" },
    { name: "HTML/CSS", level: 95, icon: "🎨" },
    { name: "MySQL", level: 75, icon: "🐬" },
    { name: "MongoDB", level: 70, icon: "🍃" },
    { name: "Python", level: 65, icon: "🐍" },
    { name: "UI/UX Design", level: 75, icon: "✨" }
  ];

  const achievements = [
    { number: "15+", text: "Projects Completed" },
    { number: "2", text: "Years Experience" },
    { number: "10+", text: "Technologies" },
    { number: "100%", text: "Client Satisfaction" }
  ];

  return (
    <div className="app">
      {/* Enhanced Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">
            <div className="logo-icon">💼</div>
            <h2>Taressa</h2>
          </div>
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav ${menuOpen ? 'active' : ''}`}>
            <ul>
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    onClick={() => {setActiveSection(item); setMenuOpen(false);}}
                    className={activeSection === item ? 'active' : ''}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {/* Enhanced Hero Section */}
        <section id="home" className="hero">
          <div className="hero-background">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="welcome-badge">
                  <span>👋 Welcome to my portfolio</span>
                </div>
                <h1>
                  <span className="gradient-text">Tareessa Bizuneh</span>
                </h1>
                <h2>Information Technology Student & Developer</h2>
                <p className="hero-description">
                  Passionate about creating digital solutions that make a difference. 
                  Currently pursuing my degree at Dire Dawa University while building 
                  innovative projects.
                </p>
                <div className="cta-buttons">
                  <a href="#projects" className="btn primary">
                    <span>View My Work</span>
                    <div className="btn-hover-effect"></div>
                  </a>
                  <a href="#contact" className="btn secondary">
                    <span>Let's Connect</span>
                  </a>
                </div>
                <div className="social-links">
                  {['github', 'linkedin', 'twitter'].map(social => (
                    <a key={social} href="#" className={`social-link ${social}`}>
                      <span className={`icon-${social}`}></span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="hero-visual">
                <div className="profile-card">
                  <div className="profile-image">
                    <div className="image-placeholder">
                      <span>📸</span>
                    </div>
                    <div className="profile-status">
                      <div className="status-dot"></div>
                      <span>Available for projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements">
          <div className="container">
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-number">{achievement.number}</div>
                  <div className="achievement-text">{achievement.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">Get to know more about my journey and passion</p>
            </div>
            <div className="about-content">
              <div className="about-text">
                <div className="about-intro">
                  <h3>Transforming Curiosity into Digital Solutions 💻</h3>
                  <p>
                    As an <strong>Information Technology student at Dire Dawa University</strong>, 
                    I've transformed my innate curiosity about technology into a passion for creating 
                    meaningful digital solutions. My journey began with wondering how apps and systems 
                    work, and has evolved into building practical applications that address real-world 
                    challenges.
                  </p>

                  <div className="passion-points">
                    <div className="passion-item">
                      <span className="passion-icon">🚀</span>
                      <div>
                        <strong>Innovation-Driven Development</strong>
                        <p>I thrive on turning complex problems into elegant, user-friendly solutions that enhance everyday experiences.</p>
                      </div>
                    </div>

                    <div className="passion-item">
                      <span className="passion-icon">🔧</span>
                      <div>
                        <strong>Full-Stack Expertise</strong>
                        <p>With experience across frontend and backend technologies, I build comprehensive solutions from concept to deployment.</p>
                      </div>
                    </div>

                    <div className="passion-item">
                      <span className="passion-icon">🌍</span>
                      <div>
                        <strong>Impact-Focused Approach</strong>
                        <p>I believe technology should serve people first—creating connections, solving problems, and improving lives.</p>
                      </div>
                    </div>
                  </div>

                  <p>
                    My portfolio showcases projects that reflect my commitment to 
                    <strong> quality, usability, and innovation</strong>. From dormitory management 
                    systems to e-commerce platforms, each project represents my dedication to 
                    continuous learning and my passion for creating technology that matters.
                  </p>
                </div>
                <div className="about-details">
                  <div className="detail-item">
                    <span className="detail-label">📍 Location</span>
                    <span className="detail-value">Dire Dawa, Ethiopia</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🎓 Education</span>
                    <span className="detail-value">BSc in Information Technology</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">💼 Status</span>
                    <span className="detail-value">Open for Opportunities</span>
                  </div>
                </div>
              </div>
              <div className="education-timeline">
                <h3>Education & Journey</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Dire Dawa University</h4>
                      <p>Bachelor of Science in Information Technology</p>
                      <span className="timeline-date">2021 - Present</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Full-Stack Development</h4>
                      <p>Self-taught modern web technologies</p>
                      <span className="timeline-date">2022 - Present</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Project Development</h4>
                      <p>Built multiple real-world applications</p>
                      <span className="timeline-date">2023 - Present</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" className="projects">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Some of the projects I've worked on</p>
            </div>
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div className="project-status">{project.status}</div>
                    <div className="project-actions">
                      <button className="action-btn">👁️</button>
                      <button className="action-btn">🔗</button>
                    </div>
                  </div>
                  <div className="project-image">
                    <div className="image-placeholder">
                      <span>🖼️ {project.title}</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section id="skills" className="skills">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">Technologies I work with</p>
            </div>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{width: `${skill.level}%`}}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">Let's work together on your next project</p>
            </div>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-card">
                  <h3>Let's Create Something Amazing</h3>
                  <p>
                    I'm always interested in new opportunities, whether it's a 
                    freelance project, internship, or collaboration. Don't hesitate 
                    to reach out!
                  </p>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-icon">📧</div>
                      <div className="contact-text">
                        <span className="contact-label">Email</span>
                        <span className="contact-value">bizutare@gmail.com</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">📱</div>
                      <div className="contact-text">
                        <span className="contact-label">Phone</span>
                        <span className="contact-value">+251 965277911</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">📍</div>
                      <div className="contact-text">
                        <span className="contact-label">Location</span>
                        <span className="contact-value">Dire Dawa, Ethiopia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                {formStatus.success && (
                  <div className="alert alert-success">
                    ✅ Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </div>
                )}
                
                {formStatus.error && (
                  <div className="alert alert-error">
                    ❌ {formStatus.error}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    required 
                    disabled={formStatus.loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email" 
                    required 
                    disabled={formStatus.loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?" 
                    required 
                    disabled={formStatus.loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..." 
                    rows="5" 
                    required 
                    disabled={formStatus.loading}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn primary full-width ${formStatus.loading ? 'loading' : ''}`}
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? (
                    <>
                      <span>Sending...</span>
                      <div className="spinner"></div>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <div className="btn-hover-effect"></div>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">💼</div>
                <h3>Taressa Bizuneh</h3>
              </div>
              <p className="footer-description">
                Information Technology student and passionate developer 
                creating innovative solutions for real-world problems.
              </p>
              <div className="social-links">
                {[
                  { name: 'GitHub', icon: '🐙', url: '#' },
                  { name: 'LinkedIn', icon: '💼', url: '#' },
                  { name: 'Twitter', icon: '🐦', url: '#' },
                  { name: 'Email', icon: '📧', url: '#' }
                ].map(social => (
                  <a key={social.name} href={social.url} className="social-link" title={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Services</h4>
              <ul className="footer-links">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
                <li>System Analysis</li>
                <li>Database Design</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Dire Dawa University<br/>Ethiopia</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>bizutare@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+251 965277911</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} Taressa Bizuneh. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;