'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import Image component
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const Navbar = () => {
  const pathName = usePathname()
  const navbarRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  
  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled past threshold
      if (currentScrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current + 10) {
        setVisible(false) // Scrolling down - hide navbar
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY <= 0) {
        setVisible(true)  // Scrolling up - show navbar
      }
      
      lastScrollY.current = currentScrollY
    }
    
    // Add scroll event listener with throttling
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll()
          scrollTimer = null
        }, 100)
      }
    }
    
    window.addEventListener('scroll', throttledScroll)
    
    // Initial check
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  // Enhanced navigation CSS classes with scroll state and visibility
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
    scrolled 
      ? 'bg-black/90 backdrop-blur-md shadow-lg py-2' 
      : 'bg-black/50 backdrop-blur-sm py-3'
  } ${
    visible ? 'translate-y-0' : '-translate-y-full'
  }`

  return (
    <nav ref={navbarRef} className={navClasses}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop View - Centered Layout */}
        <div className="hidden md:flex justify-center items-center relative py-2">
          {/* Logo on left side - replaced SVG with Image */}
          <div className="absolute left-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo1.png" 
                alt="Lovosis Logo" 
                width={50} 
                height={50} 
                className="mr-2"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7bffee] to-[#ff7bac] bg-clip-text text-transparent">
                
              </span>
            </Link>
          </div>
          
          {/* Centered Navigation Links */}
          <div className="flex space-x-12">
            <Link href="/" className={`nav-item ${pathName === '/' ? 'text-[#7bffee] font-bold' : 'text-white/80 hover:text-[#7bffee]'} transition duration-300`}>
              Home
            </Link>
            <Link href="/solutions" className={`nav-item ${pathName === '/solutions' ? 'text-[#7bffee] font-bold' : 'text-white/80 hover:text-[#7bffee]'} transition duration-300`}>
              Solutions
            </Link>
            <Link href="/companies" className={`nav-item ${pathName === '/companies' ? 'text-[#7bffee] font-bold' : 'text-white/80 hover:text-[#7bffee]'} transition duration-300`}>
              Companies
            </Link>
            <Link href="/contact" className={`nav-item ${pathName === '/contact' ? 'text-[#7bffee] font-bold' : 'text-white/80 hover:text-[#7bffee]'} transition duration-300`}>
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden flex justify-between items-center py-2">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Lovosis Logo" 
              width={36} 
              height={36} 
              className="mr-2"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#7bffee] to-[#ff7bac] bg-clip-text text-transparent">
              Lovosis
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className={`${pathName === '/' ? 'text-[#7bffee] font-bold' : 'text-white/80'}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/solutions" 
              className={`${pathName === '/solutions' ? 'text-[#7bffee] font-bold' : 'text-white/80'}`}
              onClick={() => setMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link 
              href="/companies" 
              className={`${pathName === '/companies' ? 'text-[#7bffee] font-bold' : 'text-white/80'}`}
              onClick={() => setMenuOpen(false)}
            >
              Companies
            </Link>
            <Link 
              href="/contact" 
              className={`${pathName === '/contact' ? 'text-[#7bffee] font-bold' : 'text-white/80'}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar