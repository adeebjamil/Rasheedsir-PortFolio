'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const AnimatedShapes = () => {
  const shapesRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle animation
      gsap.set(".circle", { opacity: 0, scale: 0 })
      gsap.to(".circle", {
        opacity: 1, 
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.2
      })
      
      // Diamond animation
      gsap.set(".diamond", { opacity: 0, rotation: 45, scale: 0 })
      gsap.to(".diamond", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5
      })
      
      // Floating animation for all shapes
      gsap.to(".floating", {
        y: "-15px",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      })

      // Rotation for flower shape
      gsap.to(".flower", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 20,
        ease: "none",
        repeat: -1
      })
    }, shapesRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={shapesRef} className="shapes-container fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Circle */}
      <div className="circle floating absolute top-20 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-accent-pink to-accent-blue"></div>
      
      {/* Flower Shape */}
      <div className="flower absolute top-[20%] left-[10%]">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10C60 37.6 82.4 60 110 60C82.4 60 60 82.4 60 110C60 82.4 37.6 60 10 60C37.6 60 60 37.6 60 10Z" fill="url(#flower-gradient)"/>
          <defs>
            <linearGradient id="flower-gradient" x1="10" y1="60" x2="110" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7BAC"/>
              <stop offset="1" stopColor="#7BFFEE"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Diamond */}
      <div className="diamond floating absolute bottom-[15%] right-[15%] w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-blue"></div>
      
      {/* Hourglass Shape */}
      <div className="floating absolute left-[15%] bottom-[25%]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10H70L40 40L70 70H10L40 40L10 10Z" fill="url(#hourglass-gradient)"/>
          <defs>
            <linearGradient id="hourglass-gradient" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B57BFF"/>
              <stop offset="1" stopColor="#7BFFEE"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Small Circle */}
      <div className="circle floating absolute top-[40%] right-[5%] w-16 h-16 rounded-full bg-gradient-to-r from-accent-green to-accent-blue"></div>
    </div>
  )
}

export default AnimatedShapes