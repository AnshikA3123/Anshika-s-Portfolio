"use client"

import { useEffect, useState } from "react"

export default function AnimatedPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [skillsAnimated, setSkillsAnimated] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const texts = ["ANSHIKA TOMAR", "SOFTWARE ENGINEER", "AI ENTHUSIAST", "WEB DEVELOPER"]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typeWriter = () => {
      const currentText = texts[textIndex]

      if (isDeleting) {
        setTypewriterText(currentText.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypewriterText(currentText.substring(0, charIndex + 1))
        charIndex++
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500
      }

      setTimeout(typeWriter, typeSpeed)
    }

    if (!isLoading) {
      setTimeout(typeWriter, 1000)
    }
  }, [isLoading])

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      // Update active section
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: "C Language", percentage: 83 },
    { name: "C++ Language", percentage: 76 },
    { name: "Python", percentage: 81 },
    { name: "Java", percentage: 78 },
    { name: "HTML", percentage: 90 },
    { name: "CSS", percentage: 73 },
    { name: "JavaScript", percentage: 74 },
    { name: "Data Structures & Algorithms", percentage: 78 },
    { name: "OOP", percentage: 74 },
    { name: "Software Engineering", percentage: 85 },
    { name: "Operating System", percentage: 80 },
    { name: "MySQL", percentage: 82 },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-600 via-purple-900 to-indigo-900 flex flex-col items-center justify-center z-50">
        <div className="relative w-24 h-24 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
              style={{
                borderTopColor: `hsl(${i * 60}, 80%, 60%)`,
                animationDelay: `${i * 50}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
        <div className="text-white text-lg font-light opacity-80">Loading Portfolio...</div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-600 via-purple-900 to-indigo-900 opacity-80 animate-pulse" />
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-pink-500/10 to-purple-500/10" />

      {/* Particles Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          activeSection !== "home" ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=50&width=50&text=Logo"
                alt="Logo"
                className="w-12 h-12 rounded-full hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-pink-400 hover:-translate-y-1 ${
                    activeSection === section ? "text-pink-400" : "text-white"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col space-y-1 p-2">
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10">
              <div className="flex flex-col space-y-4 p-6">
                {["home", "about", "skills", "projects", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
              <div className="text-2xl md:text-4xl text-green-300/80 mb-4">
                <em>I am</em>
              </div>
              <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 bg-clip-text text-transparent">
                <em>
                  {typewriterText}
                  <span className="animate-pulse">|</span>
                </em>
              </div>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              I'm a software engineer with a passion for building intelligent and efficient solutions. With a
              specialization in Artificial Intelligence and Machine Learning, I explore the intersection of AI and web
              development, creating projects that blend innovation with functionality.
            </p>

            <button
              onClick={() => scrollToSection("about")}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25"
            >
              <span className="relative z-10">MORE ABOUT ME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=400&text=Profile"
              alt="Profile"
              className="w-full max-w-md mx-auto rounded-3xl shadow-2xl shadow-pink-500/20 animate-float hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl opacity-20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Scroll Arrow */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=400&width=400&text=About"
                alt="About"
                className="w-full rounded-3xl shadow-2xl shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I'm Anshika Tomar, a second-year B.Tech student with a passion for technology and innovation. As a
                software engineer and web developer, I love turning ideas into functional and user-friendly digital
                experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With a specialization in Artificial Intelligence and Machine Learning (AI & ML), I'm constantly
                exploring how intelligent systems can enhance problem-solving and efficiency. From building dynamic web
                applications to working on AI-driven projects, I enjoy blending creativity with logic to develop
                impactful solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, I'm usually learning about the latest tech trends, experimenting with new tools, or
                brainstorming my next project. I believe in continuous learning and enjoy collaborating with like-minded
                individuals to push the boundaries of what technology can achieve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            My Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-pink-400/30 transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-pink-400 font-bold">{skill.percentage}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: skillsAnimated ? `${skill.percentage}%` : "0%" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6 bg-purple-900/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">My Projects</h2>
            <p className="text-xl text-purple-800 max-w-3xl mx-auto">
              <strong>Explore some of my recent work combining AI and web development.</strong>
            </p>
          </div>

          <div className="space-y-16">
            {/* Project 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-pink-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Store Revenue & Stock Prediction System SYSMART (Inspired by Walmart)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Built a smart retail analytics system using machine learning to predict product stock levels, forecast
                  revenue, and identify profitable inventory patterns. The model helps optimize stock management and
                  increase overall profitability.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Python", "Data Analytics"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-medium text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/placeholder.svg?height=300&width=400&text=SYSMART Project"
                  alt="SYSMART Project"
                  className="w-full rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300" />
              </div>
            </div>

            {/* Project 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-pink-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="relative group md:order-1">
                <img
                  src="/placeholder.svg?height=300&width=400&text=Hospital Management"
                  alt="Hospital Management System"
                  className="w-full rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="space-y-6 md:order-2">
                <h3 className="text-2xl font-bold text-white">
                  Hospital Management System (OOPs-Based Desktop Application)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  A fully functional hospital management system built using core Object-Oriented Programming principles.
                  The application streamlines hospital operations by managing patient records, department details,
                  doctor and staff information, room allocation, appointments, and billing—all in a single integrated
                  system.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Java", "OOP", "Desktop App"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-sm font-medium text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">Contact</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-lg text-green-300 leading-relaxed">
                Let's Connect! <br />
                I'm always open to discussing new projects, creative ideas, or potential collaborations. Whether it's
                AI, web development, or something entirely unique — I'm all ears!
                <br />
                Drop me a message, and I'll get back to you as soon as possible. I believe great things start with a
                simple hello.
              </p>

              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-green-300 text-lg font-medium">anshikatomar891@gmail.com</span>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <form className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="w-full bg-transparent border-b-2 border-purple-500/50 pb-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none transition-colors duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    className="w-full bg-transparent border-b-2 border-purple-500/50 pb-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none transition-colors duration-300"
                  />
                  <input
                    type="text"
                    placeholder="Subject*"
                    className="w-full bg-transparent border-b-2 border-purple-500/50 pb-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none transition-colors duration-300"
                  />
                  <textarea
                    placeholder="Message*"
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-purple-500/50 pb-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <img
            src="/placeholder.svg?height=80&width=80&text=Logo"
            alt="Footer Logo"
            className="w-20 h-20 mx-auto rounded-full hover:scale-110 transition-transform duration-300"
          />

          <div className="flex justify-center space-x-6">
            {[
              { icon: "📧", label: "Email" },
              { icon: "📷", label: "Instagram" },
              { icon: "💼", label: "LinkedIn" },
            ].map((social, index) => (
              <button
                key={index}
                className="w-14 h-14 bg-white/5 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/10 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all duration-300 hover:scale-110"
              >
                <span className="text-2xl">{social.icon}</span>jm
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25 z-30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Trigger skills animation when section is visible */}
      <div
        ref={(el) => {
          if (el && !skillsAnimated) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  setSkillsAnimated(true)
                }
              },
              { threshold: 0.3 },
            )
            observer.observe(el)
          }
        }}
        className="absolute"
        style={{ top: "50%" }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
