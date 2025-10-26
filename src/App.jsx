import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Code2, Mail, ExternalLink, X, Moon, Sun, ChevronDown, Star, GitFork, Calendar, Award, Upload, Download, Plus, Eye } from 'lucide-react';

const PortfolioWebsite = () => {
  const [showTrain, setShowTrain] = useState(true);
  const [trainStopped, setStopped] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [showLeetCode, setShowLeetCode] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [projectsToShow, setProjectsToShow] = useState(6);
  const [certificatesToShow, setCertificatesToShow] = useState(6);
  const cursorRef = useRef(null);

  // Navigation state and sections
  const [activeSection, setActiveSection] = useState('about');
  const [showNav, setShowNav] = useState(false);
  const navSections = [
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'ecurricular', label: 'E-Curricular', icon: '📚' },
    { id: 'hackerrank', label: 'HackerRank', icon: '🏆' },
    { id: 'nptel', label: 'NPTEL', icon: '🎓' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  // Featured projects from resume
  const featuredProjects = [
    {
      id: 'featured-1',
      name: 'Medical Data Management System',
      description: 'Built a secure medical data management system with user authentication, enabling efficient patient record storage and retrieval using Node.js, SQL, and REST APIs.',
      language: 'Node.js',
      tech: ['Node.js', 'SQL', 'REST APIs', 'JWT'],
      isFeatured: true
    },
    {
      id: 'featured-2',
      name: 'Travel Guide Web App',
      description: 'Created a tourist-friendly platform with real-time location insights using HTML5, CSS3, and JavaScript for seamless frontend interaction.',
      language: 'JavaScript',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Geolocation API'],
      isFeatured: true
    },
    {
      id: 'featured-3',
      name: 'Authentication System',
      description: 'Engineered a secure user authentication system for projects using Node.js and JWT, ensuring data privacy and role-based access control.',
      language: 'Node.js',
      tech: ['Node.js', 'JWT', 'Bcrypt', 'Express'],
      isFeatured: true
    }
  ];

  // Sample certificates data - replace with your actual certificates
  const initialCertificates = [
    {
      id: 'cert-1',
      title: 'Your First Certificate',
      issuer: 'Your Institution',
      date: '2024-01-01',
      description: 'Replace this with your actual certificate details',
      imageUrl: '/assets/certificates/cert-1.jpg',
      credentialUrl: '#',
      skills: ['Professional Certificate']
    },
    {
      id: 'cert-2',
      title: 'Your Second Certificate',
      issuer: 'Your Institution',
      date: '2024-01-01',
      description: 'Replace this with your actual certificate details',
      imageUrl: '/assets/certificates/cert-2.jpg',
      credentialUrl: '#',
      skills: ['Professional Certificate']
    },
    {
      id: 'cert-3',
      title: 'Your Third Certificate',
      issuer: 'Your Institution',
      date: '2024-01-01',
      description: 'Replace this with your actual certificate details',
      imageUrl: '/assets/certificates/cert-3.jpg',
      credentialUrl: '#',
      skills: ['Professional Certificate']
    },
    {
      id: 'cert-4',
      title: 'Your Fourth Certificate',
      issuer: 'Your Institution',
      date: '2024-01-01',
      description: 'Replace this with your actual certificate details',
      imageUrl: '/assets/certificates/cert-4.jpg',
      credentialUrl: '#',
      skills: ['Professional Certificate']
    }
  ];

  // Initialize certificates state
  useEffect(() => {
    setCertificates(initialCertificates);
  }, []);

  useEffect(() => {
    const saved = window.savedTheme || 'dark';
    setDarkMode(saved === 'dark');
  }, []);

  useEffect(() => {
    window.savedTheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStopped(true), 2000);
    const timer2 = setTimeout(() => {
      setShowTrain(false);
      setShowContent(true);
    }, 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Fetch GitHub Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/AdarshXGupta07/repos?sort=updated&per_page=100');
        const data = await response.json();

        const githubProjects = data
          .filter(repo => !repo.fork)
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            html_url: repo.html_url,
            homepage: repo.homepage,
            updated_at: repo.updated_at,
            topics: repo.topics || []
          }));

        const allProjects = [...featuredProjects, ...githubProjects];
        setProjects(allProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(featuredProjects);
        setLoading(false);
      }
    };

    // Fetch LeetCode Stats
    const fetchLeetCodeStats = async () => {
      try {
        // Using LeetCode API via proxy to avoid CORS
        const response = await fetch('https://api.leetcodestats.xyz/user/AdarshXGupta07');
        const data = await response.json();
        setLeetcodeStats(data);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        // Fallback data
        setLeetcodeStats({
          totalSolved: 50,
          easySolved: 30,
          mediumSolved: 15,
          hardSolved: 5,
          ranking: 100000,
          acceptanceRate: 75.5
        });
      }
    };

    if (showContent) {
      fetchProjects();
      fetchLeetCodeStats();
    }
  }, [showContent]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const portfolioCards = [
    { name: 'Jane Portfolio', blur: true },
    { name: 'John Dev', blur: true },
    { name: 'Adarsh Gupta', blur: false, isMain: true },
    { name: 'Sarah Code', blur: true },
    { name: 'Mike Tech', blur: true },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80; // larger nav height
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveSection(id);
    setShowNav(false);
  };

  // Active section tracking
  useEffect(() => {
    const onScroll = () => {
      const navHeight = 100; // padding for larger nav
      let current = 'about';
      navSections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - navHeight;
          if (window.scrollY >= top) current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Certificate functions
  const handleCertificateUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Find the next available certificate number
      const existingIds = certificates.map(cert => parseInt(cert.id.split('-')[1])).filter(id => !isNaN(id));
      const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : certificates.length + 1;

      // Create a more descriptive title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      const title = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      const newCertificate = {
        id: `cert-${nextId}`,
        title: title,
        issuer: 'Self-uploaded',
        date: new Date().toISOString().split('T')[0],
        description: `Certificate: ${title}`,
        imageUrl: URL.createObjectURL(file),
        credentialUrl: '#',
        skills: ['Professional Certificate']
      };

      // Add to display immediately
      setCertificates(prev => [...prev, newCertificate]);

      // Show success message
      alert(`Certificate "${title}" uploaded successfully!\n\nTo make it permanent:\n1. Save the file as "cert-${nextId}.png"\n2. Place it in: public/assets/certificates/\n3. Refresh the page`);

      // Reset the input
      event.target.value = '';
    }
  };

  const deleteCertificate = (certId) => {
    setCertificates(prev => prev.filter(cert => cert.id !== certId));
  };

  // Show more functions
  const showMoreProjects = () => {
    setProjectsToShow(prev => prev + 6);
  };

  const showMoreCertificates = () => {
    setCertificatesToShow(prev => prev + 6);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500 overflow-x-hidden`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <div
          className={`rounded-full bg-white ${cursorHover ? 'w-12 h-12' : 'w-6 h-6'}`}
          style={{ transition: 'all 0.2s ease-out' }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-lg border-b ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="w-full px-6">
          <div className="h-20 flex items-center justify-between relative">
            {/* Left: Logo */}
            <div className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">AG</div>

            {/* Center: Desktop Nav (absolute centered) */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`group relative px-5 py-3 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300 ${
                    activeSection === s.id
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                      : darkMode
                        ? 'text-gray-200 hover:text-white'
                        : 'text-gray-800 hover:text-gray-900'
                  } ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} hover:shadow-md`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <span className="mr-2">{s.icon}</span>
                  <span>{s.label}</span>
                  <span className={`block h-0.5 mt-1 rounded origin-left transition-transform duration-300 ${
                    activeSection === s.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></span>
                </button>
              ))}
            </div>

            {/* Right: Mobile hamburger */}
            <button
              className={`md:hidden p-3 rounded-md ${darkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setShowNav(!showNav)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {showNav ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {showNav && (
            <div className={`md:hidden border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="px-2 py-2 space-y-1">
                {navSections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full text-left px-4 py-3 rounded-md ${
                      activeSection === s.id
                        ? 'text-purple-400 bg-purple-400/10'
                        : darkMode
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Train Animation */}
      {showTrain && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50">
          <div
            className={`flex gap-8 ${trainStopped ? '' : 'animate-train'}`}
            style={{
              animation: trainStopped ? 'none' : 'train 2s ease-in-out',
            }}
          >
            {portfolioCards.map((card, idx) => (
              <div
                key={idx}
                className={`
                  w-64 h-80 rounded-2xl p-6 flex flex-col items-center justify-center
                  backdrop-blur-xl border-2
                  ${card.blur ? 'blur-sm opacity-40 scale-90' : 'blur-0 opacity-100 scale-110'}
                  ${card.isMain ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400' : 'bg-white/10 border-white/20'}
                  transition-all duration-1000
                `}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white">{card.name}</h3>
                <p className="text-sm text-white/70 mt-2">Developer Portfolio</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="animate-fadeIn pt-20">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative px-4">
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute w-96 h-96 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'} blur-3xl -top-48 -left-48 animate-pulse`} />
              <div className={`absolute w-96 h-96 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'} blur-3xl -bottom-48 -right-48 animate-pulse`} style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-float flex items-center justify-center overflow-hidden border-2 border-purple-400/30">
                <img
                  src="/assets/certificates/pfp2.jpg"
                  alt="Adarsh Gupta - Profile Photo"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110 cursor-pointer"
                  onClick={() => setSelectedImage({
                    src: '/assets/certificates/pfp2.jpg',
                    alt: 'Adarsh Gupta - Profile Photo',
                    title: 'Profile Photo'
                  })}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex flex-col items-center justify-center hidden">
                  <span className="text-2xl">👨‍💻</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-slideUp">
                Adarsh Gupta
              </h1>

              <p className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} animate-slideUp`} style={{ animationDelay: '0.2s' }}>
                Full Stack Developer | Problem Solver | Tech Enthusiast
              </p>

              <div className="flex gap-6 justify-center mb-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                <a
                  href="https://github.com/AdarshXGupta07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 hover:scale-110`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adarsh-gupta-a75b05331/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 hover:scale-110`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setShowLeetCode(true)}
                  className={`p-4 rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 hover:scale-110`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Code2 className="w-6 h-6" />
                </button>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap gap-4 justify-center animate-slideUp" style={{ animationDelay: '0.6s' }}>
                <a
                  href="/assets/certificates/resume.pdf"
                  download
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'} transition-all duration-300 hover:scale-105 shadow-lg`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Download className="w-5 h-5" /> Download Resume
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 hover:scale-105`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Mail className="w-5 h-5" /> Hire Me
                </button>
              </div>

              <button
                onClick={() => scrollToSection('projects')}
                className="animate-bounce mt-8"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <ChevronDown className="w-8 h-8 mx-auto" />
              </button>
            </div>
          </section>

          

          {/* Skills Section */}
          <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Skills</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  'HTML5','CSS3','JavaScript','TypeScript','React','Node.js','Express','Next.js','Tailwind CSS','Framer Motion',
                  'Git & GitHub','REST APIs','JWT','SQL','MongoDB'
                ].map((skill) => (
                  <div key={skill} className={`${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center hover:shadow-lg transition-all`}>
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  I am mastering frontend development and databases, with a basic understanding of backend concepts. I focus on building clean, responsive, and interactive user interfaces, aiming to grow into full-stack development soon. Believing in clean code and innovation, I make challenges into impactful, user-centered tech.
</p>

                  <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Currently pursuing B.Tech (2nd Year) at SRM University, Kattankulanthur. When I'm not coding,
                    you'll find me solving algorithmic challenges on LeetCode, contributing to open-source projects,
                    or exploring the latest tech trends.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    {['Node.js', 'Python', 'Java', 'C/C++', 'JavaScript', 'HTML5', 'CSS3', 'SQL', 'REST APIs', 'JWT'].map(skill => (
                      <span
                        key={skill}
                        className={`px-4 py-2 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'} font-medium`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-purple-400/30">
                      <img
                        src="/assets/certificates/pfp2.jpg"
                        alt="Adarsh Gupta - Profile Photo"
                        className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        onClick={() => setSelectedImage({
                          src: '/assets/certificates/pfp2.jpg',
                          alt: 'Adarsh Gupta - Profile Photo',
                          title: 'Profile Photo'
                        })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex flex-col items-center justify-center hidden">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                          <span className="text-2xl">👨‍💻</span>
                        </div>
                        <span className="text-white text-lg font-semibold">Profile Photo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                My Projects
              </h2>
              <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {loading ? '...' : Math.min(projectsToShow, projects.length)} of {projects.length} projects from GitHub and featured work
              </p>

              {loading ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading projects...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.slice(0, projectsToShow).map((project, idx) => (
                    <div
                      key={project.id || idx}
                      className={`
                        ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}
                        rounded-2xl p-6 cursor-pointer transition-all duration-300
                        hover:scale-105 hover:shadow-2xl border
                        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
                        ${project.isFeatured ? 'ring-2 ring-purple-500/50' : ''}
                        animate-slideUp
                      `}
                      style={{ animationDelay: `${Math.min(idx * 0.05, 1)}s` }}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={() => setCursorHover(true)}
                      onMouseLeave={() => setCursorHover(false)}
                    >
                      {project.isFeatured && (
                        <div className="mb-3">
                          <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <Github className="w-8 h-8 text-purple-400" />
                        <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                          {project.language || 'Code'}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-3 min-h-[3.5rem]`}>
                        {project.description || 'A coding project by Adarsh'}
                      </p>

                      {/* GitHub Stats */}
                      {!project.isFeatured && (
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Star className="w-4 h-4" /> {project.stargazers_count || 0}
                            </span>
                            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <GitFork className="w-4 h-4" /> {project.forks_count || 0}
                            </span>
                          </div>
                          {project.updated_at && (
                            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              <Calendar className="w-3 h-3" />
                              {formatDate(project.updated_at)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Technologies */}
                      {project.tech && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* GitHub Topics */}
                      {project.topics && project.topics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.topics.slice(0, 3).map(topic => (
                            <span
                              key={topic}
                              className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Show More Projects */}
              {projects.length > projectsToShow && (
                <div className="text-center mt-12">
                  <button
                    onClick={showMoreProjects}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} transition-all duration-300 hover:scale-105 shadow-lg`}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <Github className="w-5 h-5" />
                    Show More Projects ({projects.length - projectsToShow} remaining)
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Navigation to Certificates */}
              <div className="text-center mt-12">
                <button
                  onClick={() => scrollToSection('certificates')}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 hover:scale-105`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Award className="w-5 h-5" />
                  View My Certificates
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          

          {/* Certificates Section */}
          <section id="certificates" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                My Certificates
              </h2>
              <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Professional certifications and achievements ({Math.min(certificatesToShow, certificates.length)} of {certificates.length} shown)
              </p>

              {/* Upload Button */}
              <div className="mb-12 text-center">
                <label className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg`}>
                  <Upload className="w-6 h-6" />
                  <span className="font-semibold">Upload New Certificate</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCertificateUpload}
                    className="hidden"
                  />
                </label>
                <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Click to select and upload a certificate image
                </p>
              </div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.slice(0, certificatesToShow).map((cert, idx) => (
                  <div
                    key={cert.id}
                    className={`
                      ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}
                      rounded-2xl p-6 cursor-pointer transition-all duration-300
                      hover:scale-105 hover:shadow-2xl border
                      ${darkMode ? 'border-gray-700' : 'border-gray-200'}
                      animate-slideUp
                    `}
                    style={{ animationDelay: `${Math.min(idx * 0.05, 1)}s` }}
                    onClick={() => setSelectedCertificate(cert)}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Award className="w-8 h-8 text-purple-400" />
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCertificate(cert.id);
                          }}
                          className={`p-2 rounded-full ${darkMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-600'}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex flex-col items-center justify-center hidden">
                        <Award className="w-16 h-16 text-white/50 mb-2" />
                        <span className="text-white/70 text-sm text-center px-4">
                          Add {cert.title}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{cert.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      {cert.issuer}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
                      {formatDate(cert.date)}
                    </p>

                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 min-h-[2.5rem] mb-4`}>
                      {cert.description}
                    </p>

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.slice(0, 3).map(skill => (
                          <span
                            key={skill}
                            className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show More Certificates */}
              {certificates.length > certificatesToShow && (
                <div className="text-center mt-12">
                  <button
                    onClick={showMoreCertificates}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} transition-all duration-300 hover:scale-105 shadow-lg`}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <Award className="w-5 h-5" />
                    Show More Certificates ({certificates.length - certificatesToShow} remaining)
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* E-Curricular Activities Section */}
          <section id="ecurricular" className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                E-Curricular Activities
              </h2>
              <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Extracurricular activities and achievements that showcase my diverse interests and skills beyond academics
              </p>

              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-purple-400">Leadership & Organization</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Active participant in tech clubs and student organizations, organizing coding workshops and hackathons.
                      </p>
                    </div>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-purple-400">Community Service</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Volunteered for educational outreach programs and mentored junior students in programming.
                      </p>
                    </div>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-purple-400">Creative Projects</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Developed personal projects and contributed to open-source initiatives in my free time.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                      <div className="relative w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-purple-400/30">
                        <img
                          src="/assets/certificates/ec.jpg"
                          alt="E-Curricular Activities"
                          className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                          onClick={() => setSelectedImage({
                            src: '/assets/certificates/ec.jpg',
                            alt: 'E-Curricular Activities',
                            title: 'E-Curricular Activities'
                          })}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex flex-col items-center justify-center hidden">
                          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <span className="text-2xl">📚</span>
                          </div>
                          <span className="text-white text-lg font-semibold">E-Curricular Activities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HackerRank Achievements Section */}
          <section id="hackerrank" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                HackerRank Achievements
              </h2>
              <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Competitive programming achievements and problem-solving skills demonstrated on HackerRank platform
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                    <h3 className="text-xl font-bold mb-3 text-green-400">Problem Solving</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Successfully solved complex algorithmic challenges across multiple programming domains.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>Arrays</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>Strings</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>Dynamic Programming</span>
                    </div>
                  </div>
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                    <h3 className="text-xl font-bold mb-3 text-green-400">Skill Badges</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Earned multiple skill badges demonstrating proficiency in various programming languages and concepts.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>Python</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>Java</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>C++</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-full h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center overflow-hidden border border-green-400/30">
                      <img
                        src="/assets/certificates/hr1.jpg"
                        alt="HackerRank Achievement 1"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        onClick={() => setSelectedImage({
                          src: '/assets/certificates/hr1.jpg',
                          alt: 'HackerRank Achievement 1',
                          title: 'HackerRank Achievement 1'
                        })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex flex-col items-center justify-center hidden">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                          <span className="text-xl">🏆</span>
                        </div>
                        <span className="text-white font-semibold text-center">Achievement 1</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center overflow-hidden border border-blue-400/30">
                      <img
                        src="/assets/certificates/hr2.jpg"
                        alt="HackerRank Achievement 2"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        onClick={() => setSelectedImage({
                          src: '/assets/certificates/hr2.jpg',
                          alt: 'HackerRank Achievement 2',
                          title: 'HackerRank Achievement 2'
                        })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex flex-col items-center justify-center hidden">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                          <span className="text-xl">🏆</span>
                        </div>
                        <span className="text-white font-semibold text-center">Achievement 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NPTEL Progress Section */}
          <section id="nptel" className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                NPTEL Progress
              </h2>
              <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Continuous learning through NPTEL courses and certifications in various technical domains
              </p>

              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-orange-400">Course Completion</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Successfully completed multiple NPTEL courses with excellent scores and practical understanding.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>Data Structures</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>Algorithms</span>
                      </div>
                    </div>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-orange-400">Skill Enhancement</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Enhanced technical skills through structured learning and industry-relevant coursework.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'}`}>Machine Learning</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'}`}>Web Development</span>
                      </div>
                    </div>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300`}>
                      <h3 className="text-xl font-bold mb-3 text-orange-400">Certification</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Earned NPTEL certificates validating expertise in various technical subjects and methodologies.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                      <div className="relative w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-orange-400/30">
                        <img
                          src="/assets/certificates/nptel.jpg"
                          alt="NPTEL Progress"
                          className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                          onClick={() => setSelectedImage({
                            src: '/assets/certificates/nptel.jpg',
                            alt: 'NPTEL Progress',
                            title: 'NPTEL Progress'
                          })}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex flex-col items-center justify-center hidden">
                          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <span className="text-2xl">🎓</span>
                          </div>
                          <span className="text-white text-lg font-semibold">NPTEL Progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Let's Connect
              </h2>
              <p className={`text-lg mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always open to new opportunities and collaborations. Feel free to reach out at{' '}
                <a href="mailto:adarxxxshgupta@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                  adarxxxshgupta@gmail.com
                </a>
              </p>
              <div className="flex gap-6 justify-center">
                <a
                  href="mailto:adarxxxshgupta@gmail.com"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Mail className="w-5 h-5 inline mr-2" />
                  Get In Touch
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Full Size Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex flex-col items-center justify-center hidden">
                <Eye className="w-24 h-24 text-white/50 mb-4" />
                <span className="text-white/70 text-lg text-center px-6">
                  {selectedImage.title}
                </span>
                <span className="text-white/50 text-sm text-center px-6 mt-2">
                  Image not available
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedImage.src;
                  link.download = `${selectedImage.title}.jpg`;
                  link.click();
                }}
                className={`flex-1 px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg font-medium transition-all duration-300 text-center`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold">{selectedProject.name}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedProject.description || 'No description available'}
            </p>

            {/* Project Details */}
            <div className="space-y-4 mb-6">
              {selectedProject.language && (
                <div>
                  <span className="font-semibold">Primary Language:</span> {selectedProject.language}
                </div>
              )}
              {selectedProject.stargazers_count !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Stars:</span>
                  <Star className="w-4 h-4 text-yellow-400" /> {selectedProject.stargazers_count}
                </div>
              )}
              {selectedProject.forks_count !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Forks:</span>
                  <GitFork className="w-4 h-4 text-gray-400" /> {selectedProject.forks_count}
                </div>
              )}
              {selectedProject.updated_at && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Last Updated:</span>
                  <Calendar className="w-4 h-4 text-gray-400" /> {formatDate(selectedProject.updated_at)}
                </div>
              )}
            </div>

            {selectedProject.tech && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {selectedProject.html_url && (
                <a
                  href={selectedProject.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Github className="w-5 h-5 inline mr-2" />
                  View on GitHub
                </a>
              )}
              {selectedProject.isFeatured && (
                <div className={`flex-1 px-6 py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg font-medium text-center flex items-center justify-center`}>
                  <span className="text-sm">Featured Project</span>
                </div>
              )}
              {selectedProject.homepage && (
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg font-medium transition-all duration-300 text-center`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <ExternalLink className="w-5 h-5 inline mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LeetCode Stats Modal */}
      {showLeetCode && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowLeetCode(false)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold">LeetCode Stats</h3>
              <button
                onClick={() => setShowLeetCode(false)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {leetcodeStats ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                    <Code2 className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">AdarshXGupta07</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>LeetCode Profile</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold text-green-500">{leetcodeStats.totalSolved || 0}</div>
                    <div className="text-sm">Total Solved</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold">{leetcodeStats.ranking || 'N/A'}</div>
                    <div className="text-sm">Ranking</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold text-green-400">{leetcodeStats.easySolved || 0}</div>
                    <div className="text-sm">Easy</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold text-yellow-500">{leetcodeStats.mediumSolved || 0}</div>
                    <div className="text-sm">Medium</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold text-red-500">{leetcodeStats.hardSolved || 0}</div>
                    <div className="text-sm">Hard</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-2xl font-bold">{leetcodeStats.acceptanceRate ? `${leetcodeStats.acceptanceRate}%` : 'N/A'}</div>
                    <div className="text-sm">Acceptance</div>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/AdarshXGupta07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg font-medium text-center hover:shadow-lg transition-all duration-300"
                >
                  View Full Profile
                </a>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading LeetCode stats...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold">{selectedCertificate.title}</h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={selectedCertificate.imageUrl}
                alt={selectedCertificate.title}
                className="w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex flex-col items-center justify-center hidden">
                <Award className="w-24 h-24 text-white/50 mb-4" />
                <span className="text-white/70 text-lg text-center px-6">
                  Add {selectedCertificate.title}
                </span>
                <span className="text-white/50 text-sm text-center px-6 mt-2">
                  Place your certificate image in: public/assets/certificates/
                </span>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Issued by:</span> {selectedCertificate.issuer}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Date:</span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatDate(selectedCertificate.date)}
                </div>
                {selectedCertificate.credentialUrl && selectedCertificate.credentialUrl !== '#' && (
                  <div>
                    <span className="font-semibold">Credential:</span>{' '}
                    <a
                      href={selectedCertificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      View Credential
                    </a>
                  </div>
                )}
              </div>

              {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map(skill => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedCertificate.description}
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedCertificate.imageUrl;
                  link.download = `${selectedCertificate.title}-certificate.jpg`;
                  link.click();
                }}
                className={`flex-1 px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg font-medium transition-all duration-300 text-center`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download
              </button>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes train {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;
