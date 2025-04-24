'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit'

const SectionDivider = () => {
  const dividerRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the wave path
      gsap.set(".divider-path", { drawSVG: "0%" })
      
      ScrollTrigger.create({
        trigger: dividerRef.current,
        start: "top 80%",
        onEnter: () => {
          // Animate the wave drawing
          gsap.to(".divider-path", {
            drawSVG: "100%",
            duration: 1.5,
            ease: "power2.inOut"
          })
          
          // Animate diamond shapes appearing
          gsap.to(".divider-diamond", {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)"
          })
          
          // Start floating animation
          gsap.to(".divider-float", {
            y: "-8px",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
              each: 0.2,
              from: "random"
            }
          })
        },
        once: true
      })
      
      // Set up interactive glow effect
      const glowElements = document.querySelectorAll(".interactive-glow")
      
      glowElements.forEach(element => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            scale: 1.2,
            filter: "drop-shadow(0 0 5px rgba(255, 240, 0, 0.8))",
            duration: 0.3
          })
        })
        
        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            scale: 1,
            filter: "none",
            duration: 0.3
          })
        })
      })
    }, dividerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <div ref={dividerRef} className="relative h-40 md:h-60 py-10 overflow-hidden bg-black">
      <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute top-0 left-0 w-full">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7bffee" />
            <stop offset="50%" stopColor="#b57bff" />
            <stop offset="100%" stopColor="#ff7bac" />
          </linearGradient>
        </defs>
        
        {/* Main divider wave path */}
        <path 
          className="divider-path"
          d="M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 L1200,200 L0,200 Z" 
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="black"
        />
        
        {/* Diamonds along the path */}
        {[...Array(6)].map((_, i) => (
          <g key={i} className="divider-diamond divider-float" opacity="0" scale="0" transform={`translate(${180 + i*170}, ${i % 2 === 0 ? 80 : 120})`}>
            <rect 
              width="16" 
              height="16" 
              className="interactive-glow" 
              fill={i % 3 === 0 ? "#7bffee" : i % 3 === 1 ? "#b57bff" : "#ff7bac"} 
              transform="rotate(45 8 8)" 
            />
          </g>
        ))}
        
        {/* Decorative circles */}
        {[...Array(8)].map((_, i) => (
          <circle 
            key={i}
            className="divider-float"
            cx={100 + i * 150} 
            cy={i % 2 === 0 ? 60 : 140} 
            r={3 + (i % 3)} // Use deterministic values based on index
            fill={i % 4 === 0 ? "#7bffee" : i % 4 === 1 ? "#b57bff" : i % 4 === 2 ? "#ff7bac" : "#10e956"}
          />
        ))}
        
        {/* Add gradient overlay for depth */}
        <rect x="0" y="160" width="1200" height="40" fill="url(#fade-gradient)" opacity="0.8" />
        <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </svg>
    </div>
  )
}

export default SectionDivider