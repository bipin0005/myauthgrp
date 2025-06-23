"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Code2,
  Zap,
  Rocket,
  Globe,
  ArrowRight,
  Github,
  Mail,
  Menu,
  X,
  ChevronDown,
  Star,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { submitContactForm } from "./actions/contact"

const teamMembers = [
  {
    id: 1,
    name: "Bipin Khatiwada",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=200&width=200",
    social: "https://github.com/bipin0005",
    website: "https://bipinkhatiwada.com.np",
    skills: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    name: "Anit Shrestha",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=200&width=200",
    social: "https://dribbble.com/anitshrestha",
    website: "https://anitshrestha.com.np",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    name: "Sudip Dahal",
    role: "DevOps Engineer",
    image: "/placeholder.svg?height=200&width=200",
    social: "https://linkedin.com/in/sudip-dahal",
    website: "https://sudipdahal1.com.np",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Mobile Developer",
    image: "/placeholder.svg?height=200&width=200",
    social: "https://github.com/elenarodriguez",
    website: "https://elenarodriguez.dev",
    skills: ["React Native", "Flutter", "Swift"],
  },
]

const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with AI recommendations",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    id: 2,
    title: "Healthcare Dashboard",
    description: "Real-time patient monitoring system",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React", "D3.js", "Node.js"],
    link: "#",
  },
  {
    id: 3,
    title: "Crypto Trading App",
    description: "Mobile-first trading platform with live charts",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React Native", "WebSocket", "Redis"],
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "GPT-powered content creation tool",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Python", "OpenAI", "FastAPI"],
    link: "#",
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Comprehensive social media insights platform",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Vue.js", "Chart.js", "MongoDB"],
    link: "#",
  },
  {
    id: 6,
    title: "IoT Smart Home",
    description: "Connected home automation system",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Arduino", "MQTT", "React"],
    link: "#",
  },
]

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number }>
  >([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  // Initialize interactive particles
  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
    }))
    setParticles(newParticles)
  }, [])

  // Mouse tracking with smooth interpolation
  useEffect(() => {
    let animationId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      setMousePosition({ x: currentX, y: currentY })
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Scroll tracking and parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = [
        { name: "hero", ref: heroRef },
        { name: "about", ref: aboutRef },
        { name: "services", ref: servicesRef },
        { name: "contact", ref: contactRef },
      ]

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.name)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Interactive canvas particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let currentParticles = particles

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles without setState
      currentParticles = currentParticles.map((particle) => {
        // Move towards mouse when close
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          particle.vx += dx * 0.0001
          particle.vy += dy * 0.0001
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = distance < 100 ? "#06b6d4" : "#8b5cf6"
        ctx.globalAlpha = distance < 100 ? 0.8 : 0.3
        ctx.fill()

        // Draw connections
        currentParticles.forEach((otherParticle) => {
          if (particle.id !== otherParticle.id) {
            const dx2 = particle.x - otherParticle.x
            const dy2 = particle.y - otherParticle.y
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

            if (distance2 < 80) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = "#06b6d4"
              ctx.globalAlpha = ((80 - distance2) / 80) * 0.2
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })

        return particle
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [mousePosition, particles])

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        })
        // Reset form by reloading the page or clearing form fields
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Interactive Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />

      {/* Animated Background Layers */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Dynamic Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Mouse Follower Glow with Trail Effect */}
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Interactive Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => scrollToSection(heroRef)}
          >
            MyAuthGrp
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Hero", ref: heroRef, id: "hero" },
              { name: "About", ref: aboutRef, id: "about" },
              { name: "Services", ref: servicesRef, id: "services" },
              { name: "Contact", ref: contactRef, id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref)}
                className={`relative px-4 py-2 transition-all duration-300 hover:text-cyan-400 group ${
                  activeSection === item.id ? "text-cyan-400" : "text-white"
                }`}
              >
                {item.name}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 space-y-2">
            {[
              { name: "Hero", ref: heroRef },
              { name: "About", ref: aboutRef },
              { name: "Services", ref: servicesRef },
              { name: "Contact", ref: contactRef },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* Animated Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer animate-pulse">
                  <Code2 className="h-12 w-12 text-white group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span
                className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default inline-block"
                style={{
                  textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                }}
              >
                MyAuthGrp
              </span>
            </h1>

            <div className="relative mb-8">
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
                We Build the Web of the Future
              </p>
              <div className="absolute -top-2 -left-2">
                <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Star className="h-4 w-4 text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
            </div>

            <p className="text-gray-400 mb-12 max-w-xl mx-auto hover:text-gray-300 transition-colors duration-300">
              Crafting cutting-edge digital experiences with next-generation technologies
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 px-8 py-4 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ripple = document.createElement("div")
                ripple.className = "absolute bg-white/20 rounded-full animate-ping"
                ripple.style.width = ripple.style.height = "100px"
                ripple.style.left = "50%"
                ripple.style.top = "50%"
                ripple.style.transform = "translate(-50%, -50%)"
                e.currentTarget.appendChild(ripple)
                setTimeout(() => ripple.remove(), 600)
              }}
            >
              <span className="relative z-10">See Our Work</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group relative border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-500 transform hover:scale-110 backdrop-blur-sm bg-white/5 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ripple = document.createElement("div")
                ripple.className = "absolute bg-cyan-400/20 rounded-full animate-ping"
                ripple.style.width = ripple.style.height = "100px"
                ripple.style.left = "50%"
                ripple.style.top = "50%"
                ripple.style.transform = "translate(-50%, -50%)"
                e.currentTarget.appendChild(ripple)
                setTimeout(() => ripple.remove(), 600)
              }}
            >
              <span className="relative z-10">Join the Team</span>
              <Rocket className="ml-2 h-5 w-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300 relative z-10" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown
              className="h-8 w-8 text-cyan-400 cursor-pointer hover:text-purple-400 transition-colors duration-300"
              onClick={() => scrollToSection(aboutRef)}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default font-orbitron">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
              A team of passionate developers crafting modern websites & apps with cutting-edge technology and creative
              innovation.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => window.open(member.website, "_blank")}
              >
                <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden">
                  {/* Floating Animation */}
                  <div className="animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    {/* Member Image */}
                    <div className="relative mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Member Info */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 font-orbitron">
                        {member.name}
                      </h3>
                      <p className="text-purple-400 text-sm mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                        {member.role}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-full border border-purple-500/30 group-hover:bg-cyan-600/20 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Social Link */}
                      <a
                        href={member.social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white hover:scale-125 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>

                  {/* Animated Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "25+", label: "Happy Clients" },
              { number: "4", label: "Team Members" },
              { number: "2+", label: "Years Experience" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2 font-orbitron">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default font-orbitron">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Globe className="h-12 w-12" />,
                title: "Website Development",
                description: "Custom websites built with modern frameworks and optimized for performance",
                gradient: "from-blue-500 to-purple-500",
                neonColor: "shadow-blue-500/50",
              },
              {
                icon: <Code2 className="h-12 w-12" />,
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that provide exceptional user experiences",
                gradient: "from-purple-500 to-pink-500",
                neonColor: "shadow-purple-500/50",
              },
              {
                icon: <Rocket className="h-12 w-12" />,
                title: "App Prototyping",
                description: "Rapid prototyping and development of mobile and web applications",
                gradient: "from-cyan-500 to-teal-500",
                neonColor: "shadow-cyan-500/50",
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "SEO & Optimization",
                description: "Performance optimization and search engine visibility improvements",
                gradient: "from-yellow-500 to-orange-500",
                neonColor: "shadow-yellow-500/50",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl hover:border-cyan-400 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${service.neonColor} cursor-pointer overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Neon Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                />

                {/* Icon with Glow */}
                <div
                  className={`relative text-cyan-400 mb-6 group-hover:text-white transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">{service.icon}</div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300 font-orbitron">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm">
                  {service.description}
                </p>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: "2px" }}
                  >
                    <div className="w-full h-full bg-black/90 rounded-2xl" />
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${30 + i * 15}%`,
                        animationDelay: `${i * 300}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default font-orbitron">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcasing our latest projects and digital innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold hover:scale-110 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 font-orbitron">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-full border border-purple-500/30 group-hover:bg-cyan-600/20 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default font-orbitron">
              Let's Build Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 hover:text-white transition-colors duration-500">
              Ready to create something extraordinary? Get in touch with our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-white mb-6 font-orbitron">Send us a message</h3>

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}

              <form action={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-purple-400/50"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-purple-400/50"
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-purple-400/50"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="App Prototyping">App Prototyping</option>
                    <option value="SEO & Optimization">SEO & Optimization</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-purple-400/50 resize-none"
                    placeholder="Tell us about your project..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus.type === "success"}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending Message...
                    </>
                  ) : submitStatus.type === "success" ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Mail className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-500">
                <h3 className="text-2xl font-semibold text-white mb-6 font-orbitron">Get in touch</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">hello@myauthgrp.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Website</p>
                      <p className="text-white">myauthgrp.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500">
                <h3 className="text-xl font-semibold text-white mb-6 font-orbitron">Join our community</h3>

                <div className="flex space-x-4">
                  {[
                    { icon: <Github className="h-6 w-6" />, label: "GitHub", color: "from-gray-600 to-gray-800" },
                    { icon: <Mail className="h-6 w-6" />, label: "Telegram", color: "from-blue-500 to-blue-700" },
                    { icon: <Globe className="h-6 w-6" />, label: "Discord", color: "from-indigo-500 to-purple-600" },
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={`group flex-1 p-4 bg-gradient-to-r ${social.color} rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="group-hover:rotate-12 transition-transform duration-300">{social.icon}</div>
                        <span className="text-sm">{social.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-orbitron">
                MyAuthGrp
              </div>
              <p className="text-gray-400 mb-4">Building the future, one line of code at a time.</p>
              <div className="flex space-x-4">
                {[
                  { icon: <Github className="h-5 w-5" />, href: "#", color: "hover:text-purple-400" },
                  { icon: <Globe className="h-5 w-5" />, href: "#", color: "hover:text-cyan-400" },
                  { icon: <Mail className="h-5 w-5" />, href: "#", color: "hover:text-blue-400" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 font-orbitron">Quick Links</h3>
              <ul className="space-y-2">
                {["About", "Services", "Portfolio", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4 font-orbitron">Services</h3>
              <ul className="space-y-2">
                {["Website Development", "UI/UX Design", "App Prototyping", "SEO & Optimization"].map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} MyAuthGrp. All rights reserved.</p>
            </div>

            {/* Built by Badge */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-400/30">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-white font-semibold">Built by MyAuthGrp</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 group"
        onClick={() => scrollToSection(heroRef)}
      >
        <ArrowRight className="h-6 w-6 text-white -rotate-90 group-hover:scale-125 transition-transform duration-300" />
      </button>
    </div>
  )
}
