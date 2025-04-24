'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit' // Import ScrollTrigger from your gsapInit file

const AnimatedSvgBackground = () => {
  const svgRef = useRef(null)
  const ballRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simpler path animations (without DrawSVG)
      gsap.set(".path-draw", { 
        strokeDasharray: function(i, el) {
          return el.getTotalLength ? el.getTotalLength() : 1000;
        },
        strokeDashoffset: function(i, el) {
          return el.getTotalLength ? el.getTotalLength() : 1000;
        }
      })
      gsap.to(".path-draw", {
        strokeDashoffset: 0,
        duration: 3,
        stagger: 0.2,
        ease: "power2.inOut",
      })
      
      // Simple opacity transitions instead of MorphSVG
      gsap.set("#shape2, #shape3", { opacity: 0, position: "absolute" })
      
      const morphTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      })
      
      morphTimeline
        .to("#shape1", { opacity: 0, duration: 1 })
        .to("#shape2", { opacity: 1, duration: 1 }, "-=0.5")
        .to("#shape2", { opacity: 0, duration: 1 }, "+=1")
        .to("#shape3", { opacity: 1, duration: 1 }, "-=0.5")
        .to("#shape3", { opacity: 0, duration: 1 }, "+=1")
        .to("#shape1", { opacity: 1, duration: 1 }, "-=0.5")
        
      // Simple movement animation instead of MotionPath
      if (ballRef.current) {
        gsap.to(ballRef.current, {
          x: "random(100, 300)",
          y: "random(100, 300)",
          duration: 10,
          repeat: -1,
          repeatRefresh: true,
          ease: "sine.inOut"
        })
      }
      
      // Scroll trigger animations
      ScrollTrigger.batch(".svg-element", {
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1, 
          scale: 1, 
          stagger: 0.1, 
          duration: 1,
          ease: "back.out(1.7)"
        }),
        start: "top bottom-=100",
      })
    }, svgRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <div ref={svgRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main SVG container */}
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* Background gradients */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#03001e" />
            <stop offset="35%" stopColor="#030027" />
            <stop offset="100%" stopColor="#010016" />
          </linearGradient>
          
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7bffee" />
            <stop offset="50%" stopColor="#b57bff" />
            <stop offset="100%" stopColor="#ff7bac" />
          </linearGradient>
        </defs>
        
        {/* Background rectangle */}
        <rect width="100%" height="100%" fill="url(#bg-gradient)" />
        
        {/* Grid pattern */}
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="none" />
          <path d="M 60 0 L 0 0 0 60" stroke="#ffffff10" strokeWidth="0.5" fill="none" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* DrawSVG animated paths */}
        <path 
          className="path-draw" 
          d="M100,300 Q450,100 800,400 T1500,300" 
          stroke="url(#path-gradient)" 
          strokeWidth="2" 
          fill="none"
        />
        
        <path 
          className="path-draw" 
          d="M200,800 C400,500 800,900 1200,600 S1600,700 1800,500" 
          stroke="url(#path-gradient)" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Morphing shapes */}
        <g transform="translate(960, 540)">
          <path 
            id="shape1" 
            className="svg-element" 
            d="M-80,-80 L80,-80 L80,80 L-80,80 Z" 
            fill="#7bffee30" 
            opacity="0.5"
          />
          <path 
            id="shape2" 
            d="M0,-100 L86.6,-50 L86.6,50 L0,100 L-86.6,50 L-86.6,-50 Z" 
            fill="#b57bff30"
            opacity="0" 
          />
          <path 
            id="shape3" 
            d="M0,-100 C55,-100 100,-55 100,0 C100,55 55,100 0,100 C-55,100 -100,55 -100,0 C-100,-55 -55,-100 0,-100 Z" 
            fill="#ff7bac30"
            opacity="0" 
          />
        </g>
        
        {/* Motion path for the ball */}
        <path 
          id="motionPath" 
          d="M100,100 Q480,40 960,200 T1820,100 Q1700,540 960,700 T100,980" 
          stroke="#ffffff10" 
          strokeWidth="1" 
          fill="none"
        />
        
        {/* Scattered SVG elements with scroll triggers */}
        <circle className="svg-element" cx="300" cy="200" r="20" fill="#7bffee40" opacity="0" scale="0" />
        <circle className="svg-element" cx="1600" cy="700" r="40" fill="#ff7bac40" opacity="0" scale="0" />
        <circle className="svg-element" cx="1200" cy="400" r="30" fill="#b57bff40" opacity="0" scale="0" />
        <circle className="svg-element" cx="500" cy="800" r="25" fill="#7bffee40" opacity="0" scale="0" />
      </svg>
      
      {/* Ball for motion path */}
      <div ref={ballRef} className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#7bffee] to-[#ff7bac] shadow-lg shadow-cyan-500/40" style={{ transform: 'translate(-50%, -50%)' }} />
    </div>
  )
}

export default AnimatedSvgBackground