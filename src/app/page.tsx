'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from './utils/gsapInit'
import Image from 'next/image' // Add Image import for fixing img tag
import AnimatedSvgBackground from './components/AnimatedSvgBackground'
import TechStackVisualizer from './components/TechStackVisualizer'
import AnimatedCards from './components/AnimatedCards'
import SectionDivider from './components/SectionDivider'

// Updated Diamond Decoration Component that doesn't rotate by default
const DiamondDecoration = ({ id }: { id: string }) => {
  return (
    <div className="absolute -top-5 -left-5 z-10">
      <svg 
        id={id}
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        className="diamond-svg"
      >
        <defs>
          <linearGradient id={`diamond-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9c2b87" />
            <stop offset="100%" stopColor="#ff7bac" />
          </linearGradient>
        </defs>
        <rect 
          x="5" 
          y="5" 
          width="30" 
          height="30" 
          fill={`url(#diamond-gradient-${id})`} 
          transform="rotate(45 20 20)" 
          filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))"
        />
      </svg>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  
  useEffect(() => {
    // Hero animations
    const heroCtx = gsap.context(() => {
      const tl = gsap.timeline()
      
      // Existing title and description animations
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      
      // Add photo animation
      .from('.manager-photo-container', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      
      // Animate decorative elements
      .from('.manager-photo-deco', {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.5")
      
      // Animate the CEO button
      .from('.ceo-button', {
        y: 20,
        opacity: 0,
        scale: 0.9, 
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.3")
      
      // Sequential text color animation on hover
      const title = document.querySelector('.interactive-title')
      if (title) {
        const letters = title.querySelectorAll('span')
        
        // Add individual letter hover effect
        letters.forEach(letter => {
          letter.addEventListener('mouseenter', () => {
            gsap.to(letter, {
              color: '#facc15', // TailwindCSS yellow-400
              duration: 0.2,
              ease: "power1.out"
            })
          })
          
          letter.addEventListener('mouseleave', () => {
            gsap.to(letter, {
              color: 'white',
              duration: 0.3,
              ease: "power1.out"
            })
          })
        })
      }

      // Animate in the education content
      tl.from('.education-title', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");

      // Stagger in each paragraph
      tl.from('.education-paragraph', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.4");

      // Subtle scroll hint animation
      gsap.fromTo('.education-scroller', 
        { scrollTop: 0 },
        { 
          scrollTop: 30, 
          duration: 1.5, 
          delay: 3,
          ease: "power1.inOut",
          repeat: 1,
          yoyo: true,
          onComplete: () => {
            gsap.to('.education-scroller', {
              scrollTop: 0,
              duration: 0.8
            });
          }
        }
      );
    }, heroRef)
    
    // Features section animations
    const featuresCtx = gsap.context(() => {
      // Prepare feature cards for animation
      gsap.set(".feature-card", {y: 60, opacity: 0})
      
      // Create scroll trigger for feature cards
      ScrollTrigger.batch(".feature-card", {
        onEnter: batch => gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }),
        start: "top 80%",
      })
      
      // Draw SVG icons when they come into view
      gsap.utils.toArray(".feature-icon").forEach(icon => {
        const element = icon as HTMLElement
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => gsap.from(element, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }),
          once: true
        })
      })
      
      // Set up hover animations for each card
      gsap.utils.toArray(".feature-card").forEach((card) => {
        const element = card as HTMLElement
        const diamondSvg = element.querySelector(`.diamond-svg`)
        
        // Create hover animations (only run on desktop devices)
        if (window.matchMedia('(min-width: 768px)').matches) {
          // Initialize rotation to 0
          gsap.set(diamondSvg, { rotation: 0 })
          
          // Create animation for mouseenter
          element.addEventListener('mouseenter', () => {
            // Animate the card
            gsap.to(element, {
              y: -10,
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            })
            
            // Animate the diamond
            gsap.to(diamondSvg, {
              rotation: 360,
              duration: 2,
              ease: "power1.inOut",
              repeat: -1,
              transformOrigin: "center center"
            })
          })
          
          // Create animation for mouseleave
          element.addEventListener('mouseleave', () => {
            // Reset the card
            gsap.to(element, {
              y: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out"
            })
            
            // Stop diamond rotation
            gsap.killTweensOf(diamondSvg)
            gsap.to(diamondSvg, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        }
      })
    }, featuresRef)

    // Smooth SVG animations on scroll
    const decorativeElements = gsap.context(() => {
      // Top-right octagon animation - smooth rotation and movement
      gsap.to('.manager-photo-deco:first-of-type', {
        x: '+=20',
        y: '+=20',
        rotation: 45,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2, // Increased smoothness with higher scrub value
        }
      });
      
      // Bottom-left circle animation - smooth scaling
      gsap.to('.manager-photo-deco:last-of-type', {
        x: '-=15',
        y: '-=10',
        scale: 1.2,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // Very smooth scrubbing
        }
      });
      
      // Dot pattern animation - smooth diagonal movement
      gsap.to('.absolute.-bottom-6.-right-6', {
        x: '+=25',
        y: '-=20',
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=300',
          scrub: 2, // Extra smooth for dot pattern
        }
      });
      
      // Animated dots (white and yellow) - smooth movement in opposite directions
      gsap.to('.animate-pulse:nth-of-type(1)', {
        x: '-=30',
        y: '+=20',
        scale: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom center',
          scrub: 1.8,
        }
      });
      
      gsap.to('.animate-pulse:nth-of-type(2)', {
        x: '+=25',
        y: '-=35',
        scale: 1.2,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom center',
          scrub: 1.3,
        }
      });
      
      // CEO button subtle float animation
      gsap.to('.ceo-button', {
        y: '-=10',
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 2.5, // Extra smooth floating effect
        }
      });
    });

    return () => {
      heroCtx.revert()
      featuresCtx.revert()
      decorativeElements.revert()
    }
  }, [])

  return (
    <>

    
      {/* Animated SVG Background */}
      <AnimatedSvgBackground />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side - Text content */}
            <div className="md:w-[45%] text-left">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-8 text-white whitespace-nowrap overflow-visible">
                <span className="relative inline-block tracking-tight">
                  {/* Innovative - with red underline */}
                  <span className="relative">
                    {"Innovative".split("").map((letter, i) => (
                      <span 
                        key={`innovative-${i}`} 
                        className="inline-block transition-colors duration-300 hover:text-red-500"
                      >
                        {letter}
                      </span>
                    ))}
                    {/* Red underline for "Innovative" */}
                    <span className="absolute bottom-1 left-0 w-full h-1 bg-red-500 opacity-80"></span>
                  </span>
                  {" "}
                  {/* Tech - with blue underline */}
                  <span className="relative mx-1">
                    {"Tech".split("").map((letter, i) => (
                      <span 
                        key={`tech-${i}`} 
                        className="inline-block transition-colors duration-300 hover:text-blue-500"
                      >
                        {letter}
                      </span>
                    ))}
                    {/* Blue underline for "Tech" */}
                    <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500 opacity-80"></span>
                  </span>
                  {" "}
                  {/* Solutions - with green underline */}
                  <span className="relative">
                    {"Solutions".split("").map((letter, i) => (
                      <span 
                        key={`solutions-${i}`} 
                        className="inline-block transition-colors duration-300 hover:text-green-500"
                      >
                        {letter}
                      </span>
                    ))}
                    {/* Green underline for "Solutions" */}
                    <span className="absolute bottom-1 left-0 w-full h-1 bg-green-500 opacity-80"></span>
                  </span>
                </span>
              </h1>
              
              <p className="hero-description text-xl max-w-2xl text-gray-300 mb-6">
                Lovosis Technology delivers cutting-edge solutions to power your business transformation.
              </p>
              
              {/* Four colored cards */}
              <div className="flex space-x-4 mb-8">
                {/* Red card */}
                <div 
                  className="accent-card relative w-14 h-14 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 cursor-pointer transition-transform hover:scale-110"
                  style={{ boxShadow: "0 8px 16px -4px rgba(255, 99, 99, 0.5)" }}
                >
                  <div className="absolute inset-0.5 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16V12" stroke="#FF6363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H12.01" stroke="#FF6363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Blue card */}
                <div 
                  className="accent-card relative w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer transition-transform hover:scale-110"
                  style={{ boxShadow: "0 8px 16px -4px rgba(59, 130, 246, 0.5)" }}
                >
                  <div className="absolute inset-0.5 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7L12 3L4 7V17L12 21L20 17V7Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12L20 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12V21" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12L4 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Green card */}
                <div 
                  className="accent-card relative w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 cursor-pointer transition-transform hover:scale-110"
                  style={{ boxShadow: "0 8px 16px -4px rgba(16, 233, 86, 0.5)" }}
                >
                  <div className="absolute inset-0.5 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#10E956" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="#10E956" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Yellow card */}
                <div 
                  className="accent-card relative w-14 h-14 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 cursor-pointer transition-transform hover:scale-110"
                  style={{ boxShadow: "0 8px 16px -4px rgba(250, 204, 21, 0.5)" }}
                >
                  <div className="absolute inset-0.5 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V4" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 20V21" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 12H4" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M20 12H21" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18.3638 5.63623L17.6564 6.34367" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6.34375 17.6569L5.63631 18.3643" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18.3638 18.364L17.6564 17.6566" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6.34375 6.34344L5.63631 5.636" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#FACC15"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Add call-to-action button */}
              <button className="px-8 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full text-black font-medium hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300 mb-4">
                Discover Our Services
              </button>

              {/* Educational Content Scroller - Updated version */}
              <div className="education-scroller-container relative">
                <div className="education-scroller border-t border-l border-gray-800 rounded-bl-xl pt-5 pl-4 pr-6 max-h-[280px] w-[90%] md:w-[95%] overflow-y-auto custom-scrollbar">
                  <h3 className="text-xl font-semibold text-white mb-3 education-title flex items-center">
                    <span className="animate-pulse inline-block w-2 h-2 bg-accent-cyan rounded-full mr-2"></span>
                  From the CEO&apos;s Desk
                  </h3>
                  
                  <div className="education-content space-y-4 text-gray-300">
                    <p className="text-sm education-paragraph">
                      At Lovosis Technology Pvt. Ltd., we believe technology isn&apos;t just about tools—it&apos;s about transformation. Every line of code, every campaign we launch, and every platform we build is guided by our core mission: to empower businesses through innovation, strategy, and excellence.
                    </p>
                    
                    <p className="text-sm education-paragraph">
                      As the digital world evolves rapidly, our focus remains firm on delivering <span className="text-accent-cyan highlight-text">future-ready solutions</span> that create real impact. Whether it&apos;s building scalable software, optimizing digital visibility through SEO, or launching high-performance marketing campaigns across platforms like Meta and Google, we aim to be more than a service provider—we strive to be your growth partner.
                    </p>
                    
                    <p className="text-sm education-paragraph">
                      We&apos;re proud of the diverse talent and culture of creativity within Lovosis. Our team is not only technically skilled, but also deeply committed to understanding your business needs and driving your vision forward.
                    </p>

                    <p className="text-sm education-paragraph">
                      Thank you for trusting us on your journey toward digital excellence.
                    </p>

                    <p className="text-sm education-paragraph font-medium">
                      Rasheel Ali<br />
                      CEO & Director<br />
                      Lovosis Technology Pvt. Ltd.
                    </p>
                    
                    <div className="pt-2">
                      <a 
                        href="https://www.lovosis.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-accent-cyan hover:text-accent-purple transition-colors duration-300 link-animation"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Visit: www.lovosis.in
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink animate-gradientFlow"></div>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-2 right-4 opacity-60 animate-bounce">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Right side - Manager's photo with vertical rectangle */}
            <div className="md:w-[45%] mt-8 md:mt-0">
              <div className="relative mx-auto">
                {/* Image container with responsive size matching image dimensions */}
                <div className="manager-photo-container relative max-w-md mx-auto overflow-hidden rounded-xl">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink opacity-30 blur-sm rounded-xl"></div>
                  
                  {/* Manager image - with natural dimensions */}
                  <Image 
                    src="/rashidsir.png"
                    alt="Company Manager" 
                    width={500}
                    height={300}
                    className="manager-photo relative w-full object-contain rounded-xl" 
                    style={{ maxHeight: "500px" }}
                  />
                </div>
                
                {/* Updated decorative elements for vertical rectangle */}
                <div className="absolute -top-4 -right-4 w-20 h-20">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20,10 L60,10 L70,20 L70,60 L60,70 L20,70 L10,60 L10,20 Z" stroke="#7bffee" strokeWidth="1.5" fill="none" opacity="0.7" className="manager-photo-deco"/>
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="20" stroke="#ff7bac" strokeWidth="1.5" fill="none" opacity="0.7" className="manager-photo-deco"/>
                  </svg>
                </div>
                
                {/* Add a dot pattern for tech aesthetic */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-40">
                  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="2" fill="#7bffee" />
                    <circle cx="8" cy="24" r="2" fill="#7bffee" />
                    <circle cx="8" cy="40" r="2" fill="#7bffee" />
                    <circle cx="8" cy="56" r="2" fill="#7bffee" />
                    <circle cx="24" cy="8" r="2" fill="#7bffee" />
                    <circle cx="24" cy="24" r="2" fill="#7bffee" />
                    <circle cx="24" cy="40" r="2" fill="#7bffee" />
                    <circle cx="24" cy="56" r="2" fill="#7bffee" />
                    <circle cx="40" cy="8" r="2" fill="#7bffee" />
                    <circle cx="40" cy="24" r="2" fill="#7bffee" />
                    <circle cx="40" cy="40" r="2" fill="#7bffee" />
                    <circle cx="40" cy="56" r="2" fill="#7bffee" />
                    <circle cx="56" cy="8" r="2" fill="#7bffee" />
                    <circle cx="56" cy="24" r="2" fill="#7bffee" />
                    <circle cx="56" cy="40" r="2" fill="#7bffee" />
                    <circle cx="56" cy="56" r="2" fill="#7bffee" />
                  </svg>
                </div>

                {/* CEO & Director Button - Adjusted position */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                  <button className="ceo-button relative group px-6 py-3 bg-black border border-gray-800 rounded-md overflow-hidden">
                    {/* Button background with animated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
                    
                    {/* Animated dots */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse delay-300"></div>
                    
                    {/* Button text content */}
                    <div className="relative flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-white font-medium tracking-wide text-sm">CEO & Director</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Custom Software Development */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-1" />
              <div className="bg-[#7bffee]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#7bffee">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Custom Software Development</h3>
              <p className="text-gray-400">Tailor-made enterprise software solutions built to streamline your operations, enhance productivity, and support long-term growth.</p>
            </div>
            
            {/* Card 2 - Web Development */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-2" />
              <div className="bg-[#b57bff]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#b57bff">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Web Development</h3>
              <p className="text-gray-400">Modern, responsive websites that reflect your brand and support your goals — from corporate sites to custom web apps.</p>
            </div>
            
            {/* Card 3 - Cloud Services */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-3" />
              <div className="bg-[#ff7bac]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#ff7bac">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Cloud Services & DevOps</h3>
              <p className="text-gray-400">Scalable and cost-efficient cloud infrastructure combined with modern DevOps practices to accelerate deployment and increase security.</p>
            </div>
            
            {/* Card 4 - Digital Marketing & SEO */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-4" />
              <div className="bg-[#7bff9e]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#7bff9e">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z M15 7h3m-3 4h2m-8 4h2m-2-4h12M9 7h1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Digital Marketing & SEO</h3>
              <p className="text-gray-400">Drive traffic, boost visibility, and maximize ROI with integrated strategies across SEO, Meta (Facebook/Instagram) Marketing, Google Ads, and content campaigns.</p>
            </div>
            
            {/* Card 5 - Data Analytics */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-5" />
              <div className="bg-[#ffcc7b]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#ffcc7b">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Data Analytics & Business Intelligence</h3>
              <p className="text-gray-400">Gain strategic insights from data with real-time dashboards, forecasting, and data visualization tools that support smart decision-making.</p>
            </div>
            
            {/* Card 6 - Mobile App Development */}
            <div className="feature-card bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative transition-all duration-300">
              <DiamondDecoration id="diamond-6" />
              <div className="bg-[#7ba9ff]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 feature-icon" fill="none" viewBox="0 0 24 24" stroke="#7ba9ff">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Mobile App Development</h3>
              <p className="text-gray-400">Build powerful, cross-platform mobile applications that deliver seamless user experiences using modern, scalable technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Visualizer - reduced bottom padding */}
      <TechStackVisualizer />

      {/* Animated Cards Section - reduced top padding */}
      <AnimatedCards />

      {/* Section Divider */}
      <SectionDivider />
    </>
  )
}
