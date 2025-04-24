'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Footer = () => {
  const footerRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom"
        }
      })
    }, footerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-800 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-item">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-accent-blue to-accent-pink bg-clip-text text-transparent">Lovosis Technology</h3>
            <p className="text-white/60">
              Providing innovative technology solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Twitter icon with correct link */}
              <a href="https://twitter.com/RasheedAli8787" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-cyan/20 hover:text-accent-cyan transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              {/* LinkedIn icon with correct link */}
              <a href="https://www.linkedin.com/in/rasheed-ali-601798304" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-purple/20 hover:text-accent-purple transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-accent-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <a href="/" className="text-white/60 hover:text-accent-blue transition duration-300">Home</a>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-accent-cyan mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <a href="/solutions" className="text-white/60 hover:text-accent-cyan transition duration-300">Solutions</a>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-accent-purple mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <a href="/companies" className="text-white/60 hover:text-accent-purple transition duration-300">Companies</a>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-accent-pink mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <a href="/contact" className="text-white/60 hover:text-accent-pink transition duration-300">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-accent-cyan mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/60 text-sm">
                  NO 4 3<sup>rd</sup> Floor 1<sup>st</sup> Main, Singapura Garden<br/>
                  Abbigere, Chikkabanavara<br/>
                  Bangalore North, Bangalore Rural<br/>
                  -560090, Karnataka
                </span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-purple mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:lovosisr@gmail.com" className="text-white/60 hover:text-accent-purple transition duration-300">
                  lovosisr@gmail.com
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-pink mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919747745544" className="text-white/60 hover:text-accent-pink transition duration-300">
                  +919747745544
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-blue mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href="https://www.lovosis.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent-blue transition duration-300">
                  www.lovosis.in
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-item border-t border-gray-800 mt-8 pt-8 text-center text-white/40">
          <p>© {new Date().getFullYear()} Lovosis Technology Private Limited. All rights reserved.</p>
        </div>
      </div>
      
      {/* Background floating elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-blue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-10 right-10 w-48 h-48 bg-accent-pink/5 rounded-full filter blur-3xl"></div>
    </footer>
  )
}

export default Footer