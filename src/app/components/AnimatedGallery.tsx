'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit'

// Gallery images with Unsplash URLs (no download needed)
const galleryImages = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#7bffee',
    title: 'AI-Driven Analytics',
    description: 'Machine learning solutions for business intelligence'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#b57bff',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud architecture for enterprise applications'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#ff7bac',
    title: 'Mobile Experience',
    description: 'Cross-platform mobile applications with reactive interfaces'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#ffcc7b',
    title: 'Data Visualization',
    description: 'Interactive dashboards for complex data analysis'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#10e956',
    title: 'Smart IoT Systems',
    description: 'Connected device ecosystems with real-time monitoring'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accent: '#7ba9ff',
    title: 'E-Commerce Solutions',
    description: 'High-conversion online shopping experiences'
  }
];

const AnimatedGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide images
      gsap.set(".gallery-image", { 
        opacity: 0,
        scale: 0.8,
        y: 50 // Reduced from 100 for less dramatic movement
      });
      
      // Title animation
      gsap.from('.gallery-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 90%", // Start earlier
        }
      });
      
      // Create scroll-triggered animations for each image
      const images = document.querySelectorAll('.gallery-image');
      images.forEach((image, index) => {
        // Create timeline for each image
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imagesRef.current,
            start: `top ${85 - index * 5}%`, // Adjusted trigger points
            end: `bottom ${40 + index * 5}%`,
            scrub: 0.8, // Smoother scrubbing
            toggleActions: "play reverse play reverse",
          }
        });
        
        // Simplified animation sequence
        tl.to(image, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
      
      // Reduced parallax effect for images container
      gsap.to(imagesRef.current, {
        y: "-10%", // Reduced from -20%
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Add subtle rotation to images on mouse move
      if (typeof window !== 'undefined') {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 5; // Reduced from 10
          const yPos = (clientY / window.innerHeight - 0.5) * 5;
          
          gsap.to('.gallery-image', {
            rotationY: xPos,
            rotationX: -yPos,
            stagger: 0.05,
            duration: 1,
            ease: 'power1.out'
          });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }, galleryRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={galleryRef} className="py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-70"></div>
        <div className="absolute top-40 left-20 w-60 h-60 rounded-full bg-gradient-to-br from-accent-pink/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-accent-cyan/5 to-transparent blur-3xl"></div>
      </div>
      
      {/* Title - no longer sticky */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="gallery-title text-4xl font-bold mb-2 text-center text-white">Our <span className="text-accent-cyan">Creative</span> Work</h2>
          <p className="gallery-desc text-gray-400 text-center max-w-2xl mx-auto">
            Explore our portfolio of innovative projects
          </p>
        </div>
      </div>
      
      {/* Images container - height reduced */}
      <div ref={imagesRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-image rounded-xl overflow-hidden relative"
              style={{ 
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
                transform: 'perspective(1000px)',
                height: '300px', // Fixed height for consistency
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity'
              }}
            >
              {/* Image */}
              <div 
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${image.imageUrl})`,
                  boxShadow: `inset 0 0 0 2px ${image.accent}30`
                }}
              />
              
              {/* Overlay on hover */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
              >
                <div 
                  className="transform translate-y-4 hover:translate-y-0 transition-transform duration-300 bg-black bg-opacity-70 px-4 py-2 rounded-md text-center"
                  style={{ border: `1px solid ${image.accent}` }}
                >
                  <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </div>
              
              {/* Accent border */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 3px ${image.accent}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedGallery;