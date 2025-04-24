'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '../utils/gsapInit' 
import AnimatedGallery from '../components/AnimatedGallery'

export default function Solutions() {
  const headerRef = useRef(null)
  const solutionsRef = useRef(null)
  const codeIconRef = useRef(null)
  const dbIconRef = useRef(null)
  const cloudIconRef = useRef(null)
  const aiIconRef = useRef(null)

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
    
    // Solutions animations with scroll effects
    const solutionsCtx = gsap.context(() => {
      // Prepare elements
      gsap.set(".solution-card", { y: 60, opacity: 0 })
      
      // Animate cards on scroll
      ScrollTrigger.batch(".solution-card", {
        onEnter: batch => gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }),
        start: "top 80%",
      })
      
      // Code icon animation (using DrawSVG)
      if (codeIconRef.current) {
        const codeTl = gsap.timeline({
          scrollTrigger: {
            trigger: codeIconRef.current,
            start: "top 70%",
          }
        });
        
        codeTl
          .set(".code-line", { drawSVG: 0 })
          .to(".code-line", {
            drawSVG: "100%",
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.inOut"
          });
      }
      
      // Database icon animation (morphing)
      if (dbIconRef.current) {
        const dbTl = gsap.timeline({
          scrollTrigger: {
            trigger: dbIconRef.current,
            start: "top 70%",
          }
        });
        
        dbTl
          .set("#db-circle", { scale: 0, transformOrigin: "center" })
          .to("#db-circle", {
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          })
          .from("#db-lines", {
            scaleY: 0,
            transformOrigin: "center",
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.4");
      }

      // Cloud icon animation
      if (cloudIconRef.current) {
        const cloudTl = gsap.timeline({
          scrollTrigger: {
            trigger: cloudIconRef.current,
            start: "top 70%",
          }
        });

        cloudTl
          .to("#cloud-path", {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut"
          })
          .to("#server-1, #server-2, #server-3", {
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
          }, "-=1")
          .to("#conn-1", {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.8")
          .to("#pulse-circle", {
            r: 10,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.6");
      }

      // AI icon animation
      if (aiIconRef.current) {
        const aiTl = gsap.timeline({
          scrollTrigger: {
            trigger: aiIconRef.current,
            start: "top 70%",
          }
        });

        aiTl
          // Animate the brain outline drawing
          .set("#brain-path", { drawSVG: 0 })
          .to("#brain-path", {
            drawSVG: "100%",
            duration: 1.5,
            ease: "power2.inOut"
          })
          // Animate connection nodes appearing
          .to(".ai-node", {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.7)"
          }, "-=1")
          // Animate connections between nodes
          .to(".ai-connection", {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut"
          }, "-=1")
          // Add pulse effect
          .to(".ai-node", {
            boxShadow: "0 0 8px #ffcc7b",
            repeat: -1,
            yoyo: true,
            duration: 1
          });
      }

      // Add hover animations to solution cards
      document.querySelectorAll(".solution-card").forEach((card) => {
        const heading = card.querySelector("h3");
        const tags = card.querySelectorAll(".flex span");
        const iconContainer = card.querySelector(".h-60");
        
        // Card hover animations
        card.addEventListener("mouseenter", () => {
          // Lift card and add shadow
          gsap.to(card, {
            y: -10,
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Animate heading with subtle glow
          gsap.to(heading, {
            color: "white",
            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            scale: 1.02,
            duration: 0.3,
            transformOrigin: "left",
            ease: "power2.out"
          });
          
          // Animate tags with staggered scale effect
          gsap.to(tags, {
            scale: 1.1,
            duration: 0.2,
            stagger: 0.05,
            ease: "back.out(1.5)"
          });
          
          // Add subtle pulse to icon container
          gsap.to(iconContainer, {
            backgroundColor: "rgba(30, 30, 60, 0.8)",
            duration: 0.3
          });
          
          // Add border glow based on the card's accent color
          let glowColor = "#7bffee"; // Default cyan
          
          // Determine color from tag
          const tagElement = card.querySelector(".flex span") as HTMLElement;
          const tagColor = tagElement?.style.color || 
                          (tagElement ? window.getComputedStyle(tagElement).color : "");
          
          if (tagColor.includes("255, 204, 123")) glowColor = "#ffcc7b"; // Gold
          else if (tagColor.includes("181, 123, 255")) glowColor = "#b57bff"; // Purple
          else if (tagColor.includes("16, 233, 86")) glowColor = "#10e956"; // Green
          
          // Apply border glow
          gsap.to(card, {
            boxShadow: `0 0 15px ${glowColor}33, 0 20px 30px rgba(0, 0, 0, 0.3)`,
            border: `1px solid ${glowColor}66`,
            duration: 0.3
          });
        });
        
        // Reset animations on mouse leave
        card.addEventListener("mouseleave", () => {
          // Reset card position and shadow
          gsap.to(card, {
            y: 0,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgb(31 41 55)", // Reset to gray-800
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Reset heading style
          gsap.to(heading, {
            color: "white",
            textShadow: "none",
            scale: 1,
            duration: 0.3
          });
          
          // Reset tags
          gsap.to(tags, {
            scale: 1,
            duration: 0.2,
            stagger: 0.03
          });
          
          // Reset icon container
          gsap.to(iconContainer, {
            backgroundColor: "rgba(26, 26, 46, 1)", // Reset to original color
            duration: 0.3
          });
        });
      });

      // Add interactive text typing effect on click for headings
      document.querySelectorAll(".solution-card h3").forEach((heading) => {
        (heading as HTMLElement).style.cursor = "pointer";
        
        heading.addEventListener("click", () => {
          const originalText = heading.textContent;
          const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
          
          // Save original content
          if (!(heading as HTMLElement).dataset.originalText) {
            (heading as HTMLElement).dataset.originalText = originalText ?? '';
          }
          
          // Start typing effect
          let progress = 0;
          const interval = setInterval(() => {
            // Create scrambled text
            let scrambledText = "";
            if (!originalText) return;
            for (let i = 0; i < originalText.length; i++) {
              if (i < progress) {
                scrambledText += originalText[i];
              } else {
                scrambledText += chars[Math.floor(Math.random() * chars.length)];
              }
            }
            
            // Update heading text
            heading.textContent = scrambledText;
            
            // Increase progress
            progress++;
            
            // End animation when complete
            if (progress > originalText.length) {
              heading.textContent = originalText;
              clearInterval(interval);
            }
          }, 40);
        });
      });

      // Add floating animation to tags
      gsap.to(".solution-card .flex span", {
        y: "-3px",
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, solutionsRef)
    
    return () => {
      headerCtx.revert()
      solutionsCtx.revert()
    }
  }, [])

  return (
    <>
      <div ref={headerRef} className="pt-32 pb-16 bg-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0d00b3]/20 to-[#1800ff]/10 opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="page-title text-4xl md:text-5xl font-bold mb-4 text-white">Our Solutions</h1>
        </div>
      </div>
      
      <div ref={solutionsRef} className="py-16 max-w-7xl mx-auto px-6">
        {/* Maintain your grid container for a 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="solution-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="h-60 bg-[#1a1a2e] relative flex items-center justify-center p-8">
              {/* Keep existing Code icon with DrawSVG animation */}
              <svg ref={codeIconRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="code-line" d="M30 40 L10 60 L30 80" stroke="#7bffee" strokeWidth="4" fill="none" />
                <path className="code-line" d="M90 40 L110 60 L90 80" stroke="#7bffee" strokeWidth="4" fill="none" />
                <path className="code-line" d="M50 30 L70 90" stroke="#7bffee" strokeWidth="4" fill="none" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-white">Custom Software Development</h3>
              <p className="text-gray-400 mb-6">
                We design and develop scalable, secure, and customized software tailored to meet your business goals. From enterprise applications to customer-facing solutions, our team ensures your technology works for you.
              </p>
              <div className="flex space-x-2">
                <span className="bg-[#7bffee]/10 text-[#7bffee] text-sm px-3 py-1 rounded-full">Scalable</span>
                <span className="bg-[#7bffee]/10 text-[#7bffee] text-sm px-3 py-1 rounded-full">Secure</span>
                <span className="bg-[#7bffee]/10 text-[#7bffee] text-sm px-3 py-1 rounded-full">Tailored</span>
              </div>
            </div>
          </div>
          
          <div className="solution-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="h-60 bg-[#1a1a2e] relative flex items-center justify-center p-8">
              {/* Keep existing Database icon with MorphSVG animation */}
              <svg ref={dbIconRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="db-circle" cx="60" cy="60" r="40" fill="#10e956" fillOpacity="0.2" />
                <g id="db-lines">
                  <rect x="30" y="40" width="60" height="5" rx="2" fill="#10e956" />
                  <rect x="30" y="60" width="60" height="5" rx="2" fill="#10e956" />
                  <rect x="30" y="80" width="60" height="5" rx="2" fill="#10e956" />
                </g>
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-white">Data Analytics & Business Intelligence</h3>
              <p className="text-gray-400 mb-6">
                Make data your superpower. Our advanced analytics and BI services help you turn raw data into actionable insights, empowering smarter decisions and better business outcomes.
              </p>
              <div className="flex space-x-2">
                <span className="bg-[#10e956]/10 text-[#10e956] text-sm px-3 py-1 rounded-full">Real-time</span>
                <span className="bg-[#10e956]/10 text-[#10e956] text-sm px-3 py-1 rounded-full">Predictive</span>
                <span className="bg-[#10e956]/10 text-[#10e956] text-sm px-3 py-1 rounded-full">Visualized</span>
              </div>
            </div>
          </div>

          <div className="solution-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="h-60 bg-[#1a1a2e] relative flex items-center justify-center p-8">
              {/* Keep existing Cloud infrastructure icon with animation */}
              <svg ref={cloudIconRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  id="cloud-path" 
                  d="M90,70 C100,70 110,60 110,50 C110,40 100,30 90,30 C90,20 80,10 70,10 C60,10 50,20 50,30 C40,20 20,30 20,50 C20,70 40,70 50,70 Z" 
                  fill="#b57bff" 
                  fillOpacity="0.2" 
                  stroke="#b57bff" 
                  strokeWidth="2" 
                  strokeDasharray="190"
                  strokeDashoffset="190"
                />
                <g id="cloud-servers">
                  <rect id="server-1" x="40" y="80" width="40" height="6" rx="1" fill="#b57bff" opacity="0" />
                  <rect id="server-2" x="40" y="90" width="40" height="6" rx="1" fill="#b57bff" opacity="0" />
                  <rect id="server-3" x="40" y="100" width="40" height="6" rx="1" fill="#b57bff" opacity="0" />
                </g>
                <g id="cloud-connections">
                  <line id="conn-1" x1="60" y1="60" x2="60" y2="80" stroke="#b57bff" strokeWidth="2" strokeDasharray="20" strokeDashoffset="20" />
                  <circle id="pulse-circle" cx="60" cy="70" r="0" fill="#b57bff" fillOpacity="0.4" />
                </g>
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-white">Cloud Infrastructure & DevOps</h3>
              <p className="text-gray-400 mb-6">
                We provide robust DevOps and cloud solutions that support multi-cloud environments. Automate workflows, scale efficiently, and optimize your operations with Lovosis.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#b57bff]/10 text-[#b57bff] text-sm px-3 py-1 rounded-full">Multi-cloud</span>
                <span className="bg-[#b57bff]/10 text-[#b57bff] text-sm px-3 py-1 rounded-full">Scalable</span>
                <span className="bg-[#b57bff]/10 text-[#b57bff] text-sm px-3 py-1 rounded-full">Automated</span>
              </div>
            </div>
          </div>

          <div className="solution-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="h-60 bg-[#1a1a2e] relative flex items-center justify-center p-8">
              {/* Keep existing AI & ML icon with animation */}
              <svg ref={aiIconRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Brain outline */}
                <path 
                  id="brain-path" 
                  d="M60,30 C40,30 25,40 25,60 C25,75 35,85 50,85 C55,85 60,83 60,83 C60,83 65,85 70,85 C85,85 95,75 95,60 C95,40 80,30 60,30 Z M40,50 C40,50 45,45 50,45 M50,45 C50,45 55,45 60,50 M60,50 C60,50 65,45 70,45 M70,45 C70,45 75,45 80,50 M40,70 C40,70 45,75 50,75 M50,75 C50,75 55,75 60,70 M60,70 C60,70 65,75 70,75 M70,75 C70,75 75,75 80,70" 
                  stroke="#ffcc7b" 
                  strokeWidth="2" 
                  fill="none" 
                />
                
                {/* AI Network Nodes */}
                <g id="ai-nodes">
                  <circle className="ai-node" cx="45" cy="45" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="60" cy="40" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="75" cy="45" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="45" cy="75" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="60" cy="80" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="75" cy="75" r="4" fill="#ffcc7b" opacity="0" scale="0" />
                  <circle className="ai-node" cx="60" cy="60" r="5" fill="#ffcc7b" opacity="0" scale="0" />
                </g>
                
                {/* Connections between nodes */}
                <g id="ai-connections">
                  <line className="ai-connection" x1="45" y1="45" x2="60" y2="40" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="40" x2="75" y2="45" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="45" y1="75" x2="60" y2="80" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="80" x2="75" y2="75" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="60" x2="45" y2="45" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="60" x2="75" y2="45" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="60" x2="45" y2="75" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                  <line className="ai-connection" x1="60" y1="60" x2="75" y2="75" stroke="#ffcc7b" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" />
                </g>
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-white">AI & Machine Learning</h3>
              <p className="text-gray-400 mb-6">
                Drive innovation with our AI/ML solutions. From predictive analytics to intelligent automation, we help you harness AI to boost efficiency and customer engagement.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#ffcc7b]/10 text-[#ffcc7b] text-sm px-3 py-1 rounded-full">Intelligent</span>
                <span className="bg-[#ffcc7b]/10 text-[#ffcc7b] text-sm px-3 py-1 rounded-full">Adaptive</span>
                <span className="bg-[#ffcc7b]/10 text-[#ffcc7b] text-sm px-3 py-1 rounded-full">Predictive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatedGallery />
    </>
  )
}