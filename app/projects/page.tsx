"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const allProjects = [
  {
    id: 1,
    title: "Pakenham Project",
    description: "Custom web solution with modern design and functionality. Built with attention to detail and optimized for performance.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://pakenham.myauthdev.com",
  },
  {
    id: 2,
    title: "Project One",
    description: "Dynamic web application with interactive features and seamless user interactions.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://p1.myauthdev.com",
  },
  {
    id: 3,
    title: "Project Two",
    description: "Responsive web platform with seamless user experience and modern architecture.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "https://p2.myauthdev.com",
  },
  {
    id: 4,
    title: "Project Three",
    description: "Full-stack application with real-time capabilities and robust backend.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React", "Firebase", "Tailwind CSS"],
    link: "https://p3.myauthdev.com",
  },
  {
    id: 5,
    title: "Project Four",
    description: "Modern web solution with cutting-edge technology and intuitive design.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Vue.js", "Express", "MySQL"],
    link: "https://p4.myauthdev.com",
  },
  {
    id: 6,
    title: "Project Five",
    description: "Scalable web platform with advanced features and optimized performance.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://p5.myauthdev.com",
  },
  {
    id: 7,
    title: "Project Six",
    description: "Enterprise-grade web application built for reliability and scale.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React", "GraphQL", "AWS"],
    link: "https://p6.myauthdev.com",
  },
  {
    id: 8,
    title: "Project Seven",
    description: "High-performance web solution with modern infrastructure.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "Redis", "Docker"],
    link: "https://p7.myauthdev.com",
  },
  {
    id: 9,
    title: "Project Eight",
    description: "Innovative digital platform with creative solutions.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://p8.myauthdev.com",
  },
  {
    id: 10,
    title: "Project Ten",
    description: "Comprehensive web ecosystem with integrated features.",
    image: "/placeholder.svg?height=300&width=400",
    tech: ["Next.js", "Supabase", "Tailwind CSS"],
    link: "https://p10.myauthdev.com",
  },
]

export default function ProjectsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 transition-all duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
          }}
        />
      </div>

      {/* Animated Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 backdrop-blur-md bg-black/20 border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-orbitron">
              MyAuthGrp
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
              <Code className="h-4 w-4" />
              Our Work
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              All Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our complete portfolio of web development projects. Each project represents our commitment to quality and innovation.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
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
                    <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold flex items-center gap-2">
                      Visit Site
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Project Number Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center font-bold text-white text-sm">
                    {String(project.id).padStart(2, "0")}
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              </a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">
                Want to Work With Us?
              </h2>
              <p className="text-gray-400 mb-6">
                Let&apos;s build something amazing together
              </p>
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} MyAuthGrp. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
