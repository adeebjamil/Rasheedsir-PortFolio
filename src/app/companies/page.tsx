'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit'  // Add this named import

export default function Companies() {
  const headerRef = useRef(null)
  const clientsRef = useRef(null)
  
  useEffect(() => {
    // Header animations
    const headerCtx = gsap.context(() => {
      gsap.from('.page-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      gsap.from('.page-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      })
    }, headerRef)
    
    // Clients animations with motion paths
    const clientsCtx = gsap.context(() => {
      // Create motion paths for company logos
      const getRandomPath = (index: number) => {
        const pathData = [
          "M0,0 C50,-20 100,20 150,0 S200,-20 250,0",
          "M0,0 C30,30 60,-30 90,0 S120,30 150,0",
          "M0,0 C40,-10 80,10 120,0 S160,-10 200,0",
          "M0,0 C25,25 50,-25 75,0 S100,25 125,0"
        ];
        return pathData[index % pathData.length];
      };
      
      // Animate company logos along motion paths
      gsap.utils.toArray(".company-logo").forEach((logo, i) => {
        const element = logo as HTMLElement;
        gsap.set(element, { opacity: 0, y: 30 });
        
        // Create sequential reveal animation
        gsap.to(element, {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.1,
          scrollTrigger: {
            trigger: clientsRef.current,
            start: "top 80%",
          }
        });
        
        // Apply subtle floating animation
        gsap.to(logo as HTMLElement, {
          y: "random(-5, 5)",
          x: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
      
      // Create animated path between companies
      gsap.set("#connection-path", { drawSVG: 0 });
      
      ScrollTrigger.create({
        trigger: clientsRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to("#connection-path", {
            drawSVG: "100%",
            duration: 2,
            ease: "power2.inOut"
          });
        }
      });
    }, clientsRef)
    
    return () => {
      headerCtx.revert()
      clientsCtx.revert()
    }
  }, [])

  return (
    <>
      <div ref={headerRef} className="pt-32 pb-16 bg-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0047b3]/20 to-[#00b3a4]/20 opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="page-title text-4xl md:text-5xl font-bold mb-4 text-white">Our Partner Companies</h1>
          <p className="page-subtitle text-xl max-w-3xl mx-auto text-gray-300">
            We're proud to work with leading companies across various industries
          </p>
        </div>
      </div>
      
      <div ref={clientsRef} className="py-16 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Trusted By</h2>
          
          {/* SVG connection path between companies */}
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <path
                id="connection-path"
                d="M100,150 Q250,50 400,150 T700,150 Q850,50 900,250 Q750,350 600,250 T300,250 Q150,350 100,150"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7bffee" />
                  <stop offset="50%" stopColor="#b57bff" />
                  <stop offset="100%" stopColor="#ff7bac" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Company grid with images - expanded to 12 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
            {/* First 8 companies with existing images - UPDATED BACKGROUND */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="company-logo bg-white/10 backdrop-blur-sm border border-gray-800 p-5 rounded-lg shadow-md flex items-center justify-center h-32 hover:border-accent-cyan/50 transition-colors duration-300">
                <img 
                  src={`/company/img${i}.png`}
                  alt={`Partner Company ${i}`}
                  className="max-h-full max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Additional 4 companies - UPDATED BACKGROUND */}
            <div className="company-logo bg-white/10 backdrop-blur-sm border border-gray-800 p-5 rounded-lg shadow-md flex items-center justify-center h-32 hover:border-accent-purple/50 transition-colors duration-300">
              <img 
                src="/company/img9.png"
                alt="Partner Company 9" 
                className="max-h-full max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
              />
            </div>
            
            <div className="company-logo bg-white/10 backdrop-blur-sm border border-gray-800 p-5 rounded-lg shadow-md flex items-center justify-center h-32 hover:border-accent-pink/50 transition-colors duration-300">
              <img 
                src="/company/img10.png" 
                alt="Partner Company 10"
                className="max-h-full max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300 transform rotate-180"
              />
            </div>
            
            <div className="company-logo bg-white/10 backdrop-blur-sm border border-gray-800 p-5 rounded-lg shadow-md flex items-center justify-center h-32 hover:border-accent-cyan/50 transition-colors duration-300">
              <img 
                src="/company/img11.png"
                alt="Partner Company 11"
                className="max-h-full max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300 transform scale-75"
              />
            </div>
            
            <div className="company-logo bg-white/10 backdrop-blur-sm border border-gray-800 p-5 rounded-lg shadow-md flex items-center justify-center h-32 hover:border-accent-purple/50 transition-colors duration-300">
              <img 
                src="/company/img12.png"
                alt="Partner Company 12"
                className="max-h-full max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300 transform scale-90"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}