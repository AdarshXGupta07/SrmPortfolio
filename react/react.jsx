import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Code2, Mail, ExternalLink, X, Moon, Sun, ChevronDown, Star, GitFork, Calendar } from 'lucide-react';

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
  const cursorRef = useRef(null);

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-40 p-3 rounded-full backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
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
        <div className="animate-fadeIn">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative px-4">
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute w-96 h-96 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'} blur-3xl -top-48 -left-48 animate-pulse`} />
              <div className={`absolute w-96 h-96 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'} blur-3xl -bottom-48 -right-48 animate-pulse`} style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-float" />
              
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

          {/* About Section */}
          <section id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I design secure, scalable products such as medical data systems (Node.js/SQL) and travel
                    platforms (HTML/CSS/JS), with solid authentication (JWT) for data privacy. Believing in clean
                    code and innovation, I make challenges into impactful, user-centered tech.
                  </p>
                  <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Currently pursuing B.Tech (1st Year) at SRM University, Kattankulanthur. When I'm not coding, 
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
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl" />
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
                Showing {loading ? '...' : projects.length} projects from GitHub and featured work
              </p>
              
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading projects...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, idx) => (
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
            </div>
          </section>

          {/* Contact Section */}
          <section className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
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