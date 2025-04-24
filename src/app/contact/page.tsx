'use client'
import { useEffect, useRef, useState, FormEvent } from 'react'
import gsap from 'gsap'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const headerRef = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef(null)
  
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_company: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
    loading: false
  })

  const [emailJsStatus, setEmailJsStatus] = useState('idle')
  
  useEffect(() => {
    if (emailJsStatus === 'success') {
      console.log('Email sent successfully')
    }
  }, [emailJsStatus])

  useEffect(() => {
    // Check EmailJS configuration
    const checkEmailJs = async () => {
      console.log("📧 Checking EmailJS configuration...");
      try {
        // Verify environment variables exist
        if (
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        ) {
          console.log(`📧 EmailJS config found:
            - Service ID: ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID.substring(0, 3)}...
            - Template ID: ${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID.substring(0, 3)}...
            - Public Key: ${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.substring(0, 3)}...`);
          
          // Initialize EmailJS
          emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
          console.log("✅ EmailJS initialized successfully!");
          setEmailJsStatus('success');
        } else {
          console.warn("⚠️ EmailJS configuration incomplete. Missing environment variables.");
          setEmailJsStatus('error');
        }
      } catch (error) {
        console.error("❌ EmailJS initialization error:", error);
        setEmailJsStatus('error');
      }
    };
    
    checkEmailJs();

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
    
    // Form animations
    const formCtx = gsap.context(() => {
      gsap.from('.form-element', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      })
    }, formRef)
    
    // Info animations
    const infoCtx = gsap.context(() => {
      gsap.from('.info-card', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3
      })
    }, infoRef)
    
    return () => {
      headerCtx.revert()
      formCtx.revert()
      infoCtx.revert()
    }
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Set loading state
    setFormStatus(prev => ({ ...prev, loading: true }))
    console.log("📨 Form submitted, preparing to send email...");
    console.log("📨 Form data:", JSON.stringify({
      name: formData.user_name,
      email: formData.user_email,
      company: formData.user_company,
      messageLength: formData.message.length
    }, null, 2));
    
    try {
      console.log("📨 Sending email via EmailJS...");
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      
      console.log("✅ Email successfully sent!", result);
      console.table({
        "Status": result.status,
        "Text": result.text,
        "Recipient": formData.user_email,
        "Sender": formData.user_name,
        "Time": new Date().toISOString()
      });
      
      // Success state with emoji
      setFormStatus({
        submitted: true,
        success: true,
        message: '✅ Thank you for your message! We will get back to you soon.',
        loading: false
      })
      
      // Reset form
      setFormData({ user_name: '', user_email: '', user_company: '', message: '' })
      
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      console.table({
        "Error": error instanceof Error ? error.message : String(error),
        "Time": new Date().toISOString(),
        "Form Data": JSON.stringify(formData)
      });
      
      // Error state with emoji
      setFormStatus({
        submitted: true,
        success: false,
        message: '❌ Oops! Something went wrong. Please try again later or contact us directly.',
        loading: false
      })
    }
  }

  return (
    <>
      <div ref={headerRef} className="pt-32 pb-16 bg-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="page-title text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="page-subtitle text-xl max-w-3xl mx-auto text-white/80">
            Get in touch with our team to discuss how we can help your business grow
          </p>
        </div>
      </div>
      
      <div className="py-16 max-w-7xl mx-auto px-6">
        {/* Fix the grid layout structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form column - removed duplicate div */}
          <div ref={divRef} className="bg-black-card border border-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
            
            {formStatus.submitted ? (
              <div className={`p-4 rounded-md ${formStatus.success ? 'bg-accent-green/20 text-accent-green' : 'bg-red-900/20 text-red-400'}`}>
                {formStatus.message}
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4 form-element">
                  <label htmlFor="name" className="block text-white/80 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-700 bg-black/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue placeholder-gray-500"
                    required
                  />
                </div>
                
                <div className="mb-4 form-element">
                  <label htmlFor="email" className="block text-white/80 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-700 bg-black/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue placeholder-gray-500"
                    required
                  />
                </div>
                
                <div className="mb-4 form-element">
                  <label htmlFor="company" className="block text-white/80 font-medium mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="user_company"
                    value={formData.user_company}
                    onChange={handleChange}
                    placeholder="Enter your company name (optional)"
                    className="w-full px-4 py-2 border border-gray-700 bg-black/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue placeholder-gray-500"
                  />
                </div>
                
                <div className="mb-6 form-element">
                  <label htmlFor="message" className="block text-white/80 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                    className="w-full px-4 py-2 border border-gray-700 bg-black/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue placeholder-gray-500"
                    required
                  />
                </div>
                
                {/* Enhanced send button with arrow icon */}
                <div className="form-element flex items-center justify-between mt-8">
                  <button 
                    type="submit" 
                    className="relative bg-gradient-to-r from-accent-blue to-accent-purple text-white py-3 px-8 rounded-md hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 font-medium flex items-center justify-center group overflow-hidden"
                    disabled={formStatus.loading}
                  >
                    {/* Button background shine effect */}
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                    
                    {formStatus.loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  
                  {/* Security note */}
                  <span className="text-gray-500 text-sm">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure form
                  </span>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact info column - updated */}
          <div ref={infoRef} className="flex flex-col justify-center">
            <div className="info-card bg-black-card border border-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex items-start">
                <div className="bg-accent-blue/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                  <p className="text-white/60">+919747745544</p>
                </div>
              </div>
            </div>
            
            <div className="info-card bg-black-card border border-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex items-start">
                <div className="bg-accent-pink/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                  <p className="text-white/60">lovosisr@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="info-card bg-black-card border border-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start">
                <div className="bg-accent-purple/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Office</h3>
                  <p className="text-white/60">
                    NO 4 3rd Floor 1st Main, Singapura<br />
                    Garden Abbigere, Chikkabanavara,<br />
                    Bangalore North, Bangalore Rural<br />
                    -560090, Karnataka
                  </p>
                </div>
              </div>
            </div>
            
            <div className="info-card bg-black-card border border-gray-800 p-6 rounded-lg shadow-lg mt-6">
              <div className="flex items-start">
                <div className="bg-accent-cyan/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Website</h3>
                  <a 
                    href="https://www.lovosis.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-accent-cyan transition-colors duration-300"
                  >
                    www.lovosis.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}