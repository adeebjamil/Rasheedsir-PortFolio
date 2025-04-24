'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit'

const TechStackVisualizer = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set(".tech-hexagon", { scale: 0, opacity: 0 })
      gsap.set(".connection-line", { drawSVG: "0%" })
      gsap.set(".tech-label", { opacity: 0, y: 20 })
      gsap.set(".center-pulse", { scale: 0 })
      
      // Create main timeline triggered on scroll
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          toggleActions: "play none none reverse"
        }
      })
      
      // Build the animation sequence
      mainTl
        // Animate in the center hexagon first
        .to(".center-hexagon", {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        })
        // Add the center pulse effect
        .to(".center-pulse", {
          scale: 1,
          opacity: 0.7,
          duration: 1,
          ease: "power2.out"
        }, "-=0.4")
        // Pulsing animation for center
        .to(".center-pulse", {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 0.5
        }, "-=0.2")
        // Animate in the satellite hexagons with stagger
        .to(".satellite-hexagon", {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(1.7)"
        }, "-=2")
        // Draw the connection lines
        .to(".connection-line", {
          drawSVG: "100%",
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.inOut"
        }, "-=1")
        // Fade in the tech labels
        .to(".tech-label", {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out"
        }, "-=1")
        
      // Add hover animations for each technology
      document.querySelectorAll(".tech-group").forEach((group) => {
        const hexagon = group.querySelector(".tech-hexagon")
        const icon = group.querySelector(".tech-icon")
        const label = group.querySelector(".tech-label")
        const connectedLines = document.querySelectorAll(`.connection-line[data-connected="${group.id}"]`)
        
        group.addEventListener("mouseenter", () => {
          // Scale up hexagon
          gsap.to(hexagon, {
            scale: 1.2,
            fill: getComputedStyle(hexagon).stroke,
            fillOpacity: 0.2,
            duration: 0.3
          })
          
          // Scale up icon
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          
          // Highlight label
          gsap.to(label, {
            color: getComputedStyle(hexagon).stroke,
            fontWeight: "bold",
            y: -5,
            duration: 0.3
          })
          
          // Highlight connected lines
          connectedLines.forEach(line => {
            gsap.to(line, {
              strokeWidth: 3,
              opacity: 1,
              duration: 0.3
            })
          })
        })
        
        group.addEventListener("mouseleave", () => {
          // Reset hexagon
          gsap.to(hexagon, {
            scale: 1,
            fill: "none",
            fillOpacity: 0,
            duration: 0.3
          })
          
          // Reset icon
          gsap.to(icon, {
            scale: 1,
            duration: 0.3
          })
          
          // Reset label
          gsap.to(label, {
            color: "white",
            fontWeight: "normal",
            y: 0,
            duration: 0.3
          })
          
          // Reset connected lines
          connectedLines.forEach(line => {
            gsap.to(line, {
              strokeWidth: 1.5,
              opacity: 0.7,
              duration: 0.3
            })
          })
        })
      })
      
      // Floating animation for all hexagons
      gsap.to(".tech-hexagon", {
        y: "-=5",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      })
      
      // Slow rotation for all icons
      gsap.to(".tech-icon", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 20,
        ease: "none",
        repeat: -1
      })
      
      // Data stream animation along paths
      document.querySelectorAll(".connection-line").forEach(line => {
        const length = line.getTotalLength()
        gsap.to(line, {
          strokeDasharray: `5, ${length}`,
          strokeDashoffset: length,
          duration: 10,
          ease: "none",
          repeat: -1
        })
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="pt-28 pb-12 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white">Our <span className="text-accent-cyan">Technology</span> Stack</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          We leverage cutting-edge technologies to deliver innovative solutions
        </p>
      </div>
      
      {/* Main SVG container */}
      <div className="relative max-w-5xl mx-auto h-[600px] md:h-[800px]">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
          {/* Definitions for gradients and filters */}
          <defs>
            {/* Center gradient */}
            <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7bffee" />
              <stop offset="100%" stopColor="#b57bff" />
            </linearGradient>
            
            {/* Tech-specific gradients */}
            <linearGradient id="tech1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7bffee" />
              <stop offset="100%" stopColor="#b57bff" />
            </linearGradient>
            
            <linearGradient id="tech2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7bac" />
              <stop offset="100%" stopColor="#ffcc7b" />
            </linearGradient>
            
            <linearGradient id="tech3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10e956" />
              <stop offset="100%" stopColor="#7bffee" />
            </linearGradient>
            
            <linearGradient id="tech4-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b57bff" />
              <stop offset="100%" stopColor="#ff7bac" />
            </linearGradient>
            
            <linearGradient id="tech5-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffcc7b" />
              <stop offset="100%" stopColor="#10e956" />
            </linearGradient>
            
            <linearGradient id="tech6-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7bffee" />
              <stop offset="100%" stopColor="#ffcc7b" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Connection lines */}
          <g className="connection-lines">
            <path 
              className="connection-line" 
              d="M500,500 L350,300" 
              stroke="url(#tech1-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech1"
            />
            <path 
              className="connection-line" 
              d="M500,500 L650,300" 
              stroke="url(#tech2-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech2"
            />
            <path 
              className="connection-line" 
              d="M500,500 L700,500" 
              stroke="url(#tech3-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech3"
            />
            <path 
              className="connection-line" 
              d="M500,500 L650,700" 
              stroke="url(#tech4-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech4"
            />
            <path 
              className="connection-line" 
              d="M500,500 L350,700" 
              stroke="url(#tech5-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech5"
            />
            <path 
              className="connection-line" 
              d="M500,500 L300,500" 
              stroke="url(#tech6-gradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.7" 
              fill="none"
              data-connected="tech6"
            />
          </g>
          
          {/* Center hexagon */}
          <g className="tech-group" id="center">
            <polygon 
              className="tech-hexagon center-hexagon" 
              points="500,450 550,475 550,525 500,550 450,525 450,475" 
              fill="none" 
              stroke="url(#center-gradient)" 
              strokeWidth="3"
              filter="url(#glow)"
            />
            <circle 
              className="center-pulse" 
              cx="500" 
              cy="500" 
              r="50" 
              fill="url(#center-gradient)" 
              fillOpacity="0.2"
            />
            <text 
              className="tech-label" 
              x="500" 
              y="500" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="white" 
              fontWeight="bold"
              fontSize="18"
            >CORE</text>
          </g>
          
          {/* Technology 1 - Cloud */}
          <g className="tech-group" id="tech1">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="350,250 400,275 400,325 350,350 300,325 300,275" 
              fill="none" 
              stroke="url(#tech1-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(305, 280)">
              <path 
                d="M45,20 C55,20 65,10 65,0 C65,-10 55,-20 45,-20 C45,-30 35,-40 25,-40 C15,-40 5,-30 5,-20 C-5,-30 -25,-20 -25,0 C-25,20 -5,20 5,20 Z"
                fill="#7bffee"
                fillOpacity="0.5"
                transform="scale(0.5)"
              />
            </g>
            <text 
              className="tech-label" 
              x="350" 
              y="380" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >CLOUD</text>
          </g>
          
          {/* Technology 2 - AI */}
          <g className="tech-group" id="tech2">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="650,250 700,275 700,325 650,350 600,325 600,275" 
              fill="none" 
              stroke="url(#tech2-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(620, 280)">
              <path 
                d="M30,0 C20,0 10,-5 10,-15 Q30,-50 60,-15 C60,-5 50,0 40,0 Z"
                fill="#ffcc7b"
                fillOpacity="0.5"
                transform="scale(0.5)"
              />
              <circle cx="30" cy="-5" r="5" fill="#ffcc7b" transform="scale(0.5)" />
              <circle cx="45" cy="-5" r="5" fill="#ffcc7b" transform="scale(0.5)" />
            </g>
            <text 
              className="tech-label" 
              x="650" 
              y="380" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >AI/ML</text>
          </g>
          
          {/* Technology 3 - Mobile */}
          <g className="tech-group" id="tech3">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="700,450 750,475 750,525 700,550 650,525 650,475" 
              fill="none" 
              stroke="url(#tech3-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(670, 490)">
              <rect x="10" y="-30" width="40" height="60" rx="5" stroke="#10e956" strokeWidth="4" fill="none" transform="scale(0.5)" />
              <line x1="30" y1="20" x2="30" y2="20" stroke="#10e956" strokeWidth="4" transform="scale(0.5)" />
            </g>
            <text 
              className="tech-label" 
              x="700" 
              y="580" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >MOBILE</text>
          </g>
          
          {/* Technology 4 - Security */}
          <g className="tech-group" id="tech4">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="650,650 700,675 700,725 650,750 600,725 600,675" 
              fill="none" 
              stroke="url(#tech4-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(620, 685)">
              <path
                d="M30,-25 L50,-5 L50,20 C50,35 30,40 30,40 C30,40 10,35 10,20 L10,-5 Z"
                stroke="#b57bff"
                strokeWidth="3"
                fill="none"
                transform="scale(0.5)"
              />
              <circle cx="30" cy="10" r="8" fill="#b57bff" fillOpacity="0.5" transform="scale(0.5)" />
            </g>
            <text 
              className="tech-label" 
              x="650" 
              y="780" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >SECURITY</text>
          </g>
          
          {/* Technology 5 - Analytics */}
          <g className="tech-group" id="tech5">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="350,650 400,675 400,725 350,750 300,725 300,675" 
              fill="none" 
              stroke="url(#tech5-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(320, 685)">
              <rect x="10" y="-10" width="10" height="40" fill="#ffcc7b" fillOpacity="0.5" transform="scale(0.5)" />
              <rect x="25" y="0" width="10" height="30" fill="#ffcc7b" fillOpacity="0.5" transform="scale(0.5)" />
              <rect x="40" y="-20" width="10" height="50" fill="#ffcc7b" fillOpacity="0.5" transform="scale(0.5)" />
            </g>
            <text 
              className="tech-label" 
              x="350" 
              y="780" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >ANALYTICS</text>
          </g>
          
          {/* Technology 6 - Web */}
          <g className="tech-group" id="tech6">
            <polygon 
              className="tech-hexagon satellite-hexagon" 
              points="300,450 350,475 350,525 300,550 250,525 250,475" 
              fill="none" 
              stroke="url(#tech6-gradient)" 
              strokeWidth="2"
            />
            <g className="tech-icon" transform="translate(275, 490)">
              <path
                d="M0,-10 C0,-20 60,-20 60,-10 L60,10 C60,20 0,20 0,10 Z"
                stroke="#7bffee"
                strokeWidth="3"
                fill="none"
                transform="scale(0.5)"
              />
              <path
                d="M10,0 L50,0 M30,-10 L30,10"
                stroke="#7bffee"
                strokeWidth="2"
                transform="scale(0.5)"
              />
            </g>
            <text 
              className="tech-label" 
              x="300" 
              y="580" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14"
            >WEB</text>
          </g>
        </svg>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-900/5 to-transparent rounded-full"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
    </section>
  )
}

export default TechStackVisualizer