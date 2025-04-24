'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit'

// Updated project data with real projects
const projects = [
  {
    id: 1,
    title: "ChenArabia E-commerce",
    description: "A thriving E-commerce company and platform in Dubai, fully managed and maintained by our team.",
    color: "#7bffee", // Keeping your existing cyan color
    url: "https://chenarabia.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 2,
    title: "NexMedia News Platform",
    description: "A successful News & Media platform, hosted and operated under our company's management.",
    color: "#b57bff", // Keeping your existing purple color
    url: "https://nexmedia.live/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875-1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875-1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "UAE Travel Platform",
    description: "A flourishing travel platform based in Dubai, showcasing our expertise in the tourism and hospitality tech space.",
    color: "#ff7bac", // Keeping your existing pink color
    url: "https://travelplatformuae.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
        <path d="M12 21.7C9.3 20 4 16.5 4 10.3 4 6.4 7.3 3 12 3s8 3.4 8 7.3c0 6.2-5.3 9.7-8 11.4z" />
        <path d="M10 10 L14 10 L14 14 L10 14 Z" fill="black" />
        <path d="M12 3v18" strokeWidth="1" stroke="black" />
        <path d="M4.5 12h15" strokeWidth="1" stroke="black" />
      </svg>
    )
  }
];

const AnimatedCards = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".project-card", { 
        opacity: 0,
        y: 50,
        scale: 0.95
      });
      
      gsap.set(".card-icon", {
        scale: 0.9,
        opacity: 0.8,
        rotation: -5
      });

      // Scroll-triggered entrance animation
      ScrollTrigger.batch(".project-card", {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out"
        }),
        start: "top 85%"
      });
      
      // Set up hover animations
      document.querySelectorAll(".project-card").forEach((card) => {
        const cardElement = card as HTMLElement;
        const iconWrapper = cardElement.querySelector(".icon-wrapper");
        const iconElement = cardElement.querySelector(".card-icon");
        const highlight = cardElement.querySelector(".card-glow");
        const content = cardElement.querySelector(".card-content");
        
        // Create card hover animation
        cardElement.addEventListener("mouseenter", () => {
          // Card animation
          gsap.to(cardElement, {
            y: -15,
            scale: 1.02,
            boxShadow: "0 20px 30px rgba(0,0,0,0.3)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Icon animation
          gsap.to(iconElement, {
            scale: 1.1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
          
          // Icon wrapper animation
          gsap.to(iconWrapper, {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            duration: 0.3
          });
          
          // Highlight glow
          gsap.to(highlight, {
            opacity: 0.8,
            scale: 1.1,
            duration: 0.5
          });
          
          // Content animation
          gsap.to(content, {
            y: -5,
            duration: 0.3
          });
        });
        
        // Create leave animation
        cardElement.addEventListener("mouseleave", () => {
          // Card animation
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.4, 
            ease: "power2.out"
          });
          
          // Icon animation
          gsap.to(iconElement, {
            scale: 0.9,
            opacity: 0.8,
            rotation: -5,
            duration: 0.3
          });
          
          // Icon wrapper animation
          gsap.to(iconWrapper, {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.3
          });
          
          // Highlight glow
          gsap.to(highlight, {
            opacity: 0,
            scale: 1,
            duration: 0.4
          });
          
          // Content animation
          gsap.to(content, {
            y: 0,
            duration: 0.3
          });
        });
      });
    }, cardsRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={cardsRef} className="pt-12 pb-24 relative bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent-pink/5 to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-tr from-accent-cyan/5 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Featured <span className="text-accent-cyan">Projects</span></h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">Our expert team delivers innovative solutions using cutting-edge technologies tailored to your business needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card bg-black-card rounded-xl overflow-hidden border border-gray-800 relative transition-all duration-300"
            >
              {/* Card glow effect */}
              <div 
                className="card-glow absolute inset-0 opacity-0 blur-xl z-0"
                style={{ 
                  background: `radial-gradient(circle at center, ${project.color}20 0%, transparent 70%)`,
                }}
              ></div>
              
              <div className="p-8 relative z-10">
                {/* Icon with background */}
                <div 
                  className="icon-wrapper w-16 h-16 mb-6 rounded-lg flex items-center justify-center bg-black-accent border border-gray-800 transition-all duration-300"
                  style={{ color: project.color }}
                >
                  <div className="card-icon">
                    {project.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="card-content">
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-5">{project.description}</p>
                  
                  {/* View button - updated with links */}
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-transform hover:translate-x-1" 
                    style={{ color: project.color }}
                  >
                    <span>Explore Project</span>
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current">
                      <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCards;