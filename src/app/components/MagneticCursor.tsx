'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Check if device has touch capability - disable custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return; // Exit early on touch devices
    }
    
    const cursor = cursorRef.current
    const follower = followerRef.current
    
    if (!cursor || !follower) return
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let followerX = 0
    let followerY = 0
    
    // Hide default cursor
    document.body.style.cursor = 'none'
    
    // Add cursor class to body for CSS fallbacks
    document.body.classList.add('custom-cursor')
    
    // Mouse move event with higher precision
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    // Handle hover states for all interactive elements
    const handleHoverStates = () => {
      // Include ALL interactive elements, especially form fields
      const interactiveElements = document.querySelectorAll(
        'a, button, .feature-card, input, textarea, select, [role="button"], .company-logo, .info-card'
      )
      
      interactiveElements.forEach(element => {
        // Add mouseenter event
        element.addEventListener('mouseenter', () => {
          // Special handling for form inputs
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            // Text cursor for form fields
            gsap.to(cursor, {
              scale: 0.5,
              opacity: 0.8,
              backgroundColor: '#ffffff',
              duration: 0.2
            })
            
            // Show input-specific cursor effect
            gsap.to(follower, {
              scale: 0.8,
              backgroundColor: 'rgba(0, 140, 255, 0.2)',
              opacity: 0.6,
              duration: 0.2
            })
          } else {
            // Regular interactive element effect
            gsap.to(cursor, {
              scale: 1.5,
              opacity: 1,
              duration: 0.3
            })
            
            gsap.to(follower, {
              scale: 2,
              opacity: 0.6,
              duration: 0.3
            })
          }
          
          // If it's a feature card, also rotate its diamond (keep this functionality)
          if (element.classList.contains('feature-card')) {
            const diamondSvg = element.querySelector('.diamond-svg')
            if (diamondSvg) {
              gsap.to(diamondSvg, {
                rotation: 30,
                duration: 0.3,
                ease: "power2.out"
              })
            }
          }
        })
        
        // Add mouseleave event
        element.addEventListener('mouseleave', () => {
          // Reset cursor to default state
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            backgroundColor: '#ffffff',
            duration: 0.3
          })
          
          gsap.to(follower, {
            scale: 1,
            opacity: 0.8,
            backgroundColor: 'rgba(255, 240, 0, 0.8)',
            duration: 0.3
          })
          
          // Reset diamond rotation if it's a feature card
          if (element.classList.contains('feature-card')) {
            const diamondSvg = element.querySelector('.diamond-svg')
            if (diamondSvg) {
              gsap.to(diamondSvg, {
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
              })
            }
          }
        })
      })
    }
    
    // Improved animation loop for smoother cursor following
    const animate = () => {
      // Increased precision for smoother movement
      cursorX += (mouseX - cursorX) * 0.25
      cursorY += (mouseY - cursorY) * 0.25
      
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      
      // Use hardware acceleration with transform3d
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`
      
      requestAnimationFrame(animate)
    }
    
    // Register the MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      handleHoverStates()
    })
    
    // Start observing the document for added nodes
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    
    // Handle cursor when leaving window
    const onMouseLeave = () => {
      cursor.style.opacity = '0'
      follower.style.opacity = '0'
    }
    
    const onMouseEnter = () => {
      cursor.style.opacity = '1'
      follower.style.opacity = '0.8'
    }
    
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    
    // Set up initial hover states
    handleHoverStates()
    
    // Start animation loop
    animate()
    
    // Cleanup
    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.body.style.cursor = ''
      document.body.classList.remove('custom-cursor')
    }
  }, [])
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed w-3 h-3 rounded-full bg-white z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ 
          top: 0, 
          left: 0,
          mixBlendMode: 'difference',
          transition: 'scale 0.3s ease, opacity 0.3s ease, background-color 0.3s ease'
        }}
      ></div>
      <div 
        ref={followerRef} 
        className="fixed w-6 h-6 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ 
          top: 0, 
          left: 0,
          backgroundColor: 'rgba(255, 240, 0, 0.8)',
          filter: 'blur(1px)',
          transition: 'scale 0.3s ease, opacity 0.3s ease, background-color 0.3s ease'
        }}
      ></div>
    </>
  )
}

export default MagneticCursor