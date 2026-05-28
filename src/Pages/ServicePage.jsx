import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ServicePage = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const contentSectionRef = useRef(null)
  const maskRef = useRef(null)
  const contentRef = useRef(null)

  const [service, setService] = useState([])
  const [loading, setLoading] = useState(true)

  const BASE_URL = 'http://127.0.0.1:8000/storage/'


  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://127.0.0.1:8000/api/ourservice')
        console.log('Service Response:', response.data)

        // is_archived comes as boolean true from the API
        const filteredServices = response.data.data.filter(
          (item) => item.is_archived === true || item.is_archived === 1
        )

        setService(filteredServices)
      } catch (error) {
        console.error('fetching error', error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )
      }

      if (contentSectionRef.current && heroRef.current) {
        gsap.set(contentSectionRef.current, { yPercent: 100 })
        gsap.to(contentSectionRef.current, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=120%',
            scrub: 1,
            pin: heroRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      if (maskRef.current && heroRef.current) {
        gsap.fromTo(
          maskRef.current,
          { scale: 1.05, opacity: 0, rotateZ: -3 },
          {
            scale: 1, opacity: 1, rotateZ: 0, ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top center',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }

      if (contentRef.current) {
        const children = Array.from(contentRef.current.children)
        gsap.set(children, { opacity: 0, y: 40 })
        gsap.to(children, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      ScrollTrigger.refresh()
    }, heroRef)

    let rafId
    const onResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', onResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [service])

  // Helper: extract a display description from meta_data or fall back to default
  const getDescription = (meta_data) => {
    if (!meta_data) return 'Experience premium hospitality and unforgettable moments at Harness Resort.'

    // meta_data may arrive as an object (if casts are added later) or a JSON string
    if (typeof meta_data === 'object') {
      return meta_data.description || meta_data.short_description || meta_data.subtitle
        || 'Experience premium hospitality and unforgettable moments at Harness Resort.'
    }

    if (typeof meta_data === 'string') {
      // Try to parse as JSON first
      try {
        const parsed = JSON.parse(meta_data)
        if (parsed && typeof parsed === 'object') {
          return parsed.description || parsed.short_description || parsed.subtitle
            || 'Experience premium hospitality and unforgettable moments at Harness Resort.'
        }
      } catch {
        // Not JSON — use the string directly if it looks like real text
        if (meta_data.trim() !== '' && meta_data.trim() !== 'null') return meta_data.trim()
      }
    }

    return 'Experience premium hospitality and unforgettable moments at Harness Resort.'
  }

  return (
    <>
      <Helmet>
        <title>Services at Harness Zipline & Adventure Resort</title>
        <meta name="description" content="Explore dining, destination weddings, and event-friendly services at Harness Zipline & Adventure Resort in Kusma, Nepal." />
        <link rel="canonical" href="https://www.theharnessnepal.com/services" />
        <meta name="keywords" content="Harness services, Kusma wedding venue, Nepal resort dining, conference venue Kusma" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Services at Harness Zipline & Adventure Resort" />
        <meta property="og:description" content="Explore dining, destination weddings, and event-friendly services at Harness Zipline & Adventure Resort in Kusma, Nepal." />
        <meta property="og:image" content="/images/wed.jpeg" />
        <meta property="og:url" content="https://www.theharnessnepal.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services at Harness Zipline & Adventure Resort" />
        <meta name="twitter:description" content="Explore dining, destination weddings, and event-friendly services at Harness Zipline & Adventure Resort in Kusma, Nepal." />
        <meta name="twitter:image" content="/images/wed.jpeg" />
      </Helmet>

      {/* HERO */}
      <div ref={heroRef} className="relative bg-white w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>
        <img
          src="/images/wed.jpeg"
          alt="Harness Zipline and Adventure Resort Services"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Hero Text */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
          <div ref={textRef} className="text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              Services
            </h2>
            <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mt-2 mb-4 sm:mb-6">
              Experience the Best Service
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-2xl leading-relaxed drop-shadow-md">
              Escape the ordinary and immerse yourself in tranquility. Surrounded by lush forests,
              melodious bird songs, and fresh mountain air, our sanctuary offers the perfect blend
              of comfort and wilderness.
            </p>
          </div>
        </div>

        {/* CONTENT PANEL */}
        <div ref={contentSectionRef} className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden">

          {/* Mask */}
          <div ref={maskRef} className="absolute inset-0 w-full h-full pointer-events-none">
            <img src="/images/mask.svg" alt="mask" className="w-full h-full object-cover object-top invert" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 w-full min-h-screen flex items-center justify-center mt-12 sm:mt-0">

            {/* Decorative sketch */}
            <div
              className="absolute top-0 right-0 w-[200px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[350px] md:h-[500px] lg:h-[600px] pointer-events-none opacity-20 lg:opacity-30 z-0"
              style={{ backgroundImage: "url('/images/sketch.png')", backgroundSize: 'contain', backgroundPosition: 'top right', backgroundRepeat: 'no-repeat' }}
            />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 relative z-20 mt-16 sm:mt-20 lg:mt-28">
              <div className="w-full relative z-30 mt-32 sm:mt-40 lg:mt-48">

                {/* Section Title */}
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                  <button
                    className="text-white px-6 sm:px-8 py-2 mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold"
                    style={{
                      backgroundColor: '#FAA821',
                      maskImage: "url('/images/logo.png')",
                      WebkitMaskImage: "url('/images/logo.png')",
                      maskSize: 'contain',
                      WebkitMaskSize: 'cover',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  >
                    Services
                  </button>

                  <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 px-2">
                    Experience the Best Services
                  </h2>

                  <p className="text-black/80 text-sm sm:text-base lg:text-xl max-w-3xl leading-relaxed px-2">
                    Step into a place where every moment becomes an experience. From dining above
                    breathtaking landscapes to celebrating life's biggest occasions and hosting
                    meaningful events.
                  </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 mt-12 sm:mt-16 lg:mt-20 max-w-7xl mx-auto px-2 sm:px-4 relative z-30">
                  {loading ? (
                    <div className="col-span-full flex justify-center items-center py-20">
                      <h2 className="text-[#faa821] text-2xl font-bold">Loading Services...</h2>
                    </div>
                  ) : service.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-20">
                      <h2 className="text-gray-500 text-2xl font-bold">No Services Found</h2>
                    </div>
                  ) : (
                    service.map((item) => (
                      <Link
                        key={item.id}
                        to={`/services/${item.slug || item.id}`}
                        className="flex flex-col items-center w-full group transition-transform duration-300 hover:-translate-y-2 focus:outline-none"
                      >
                        {/* Image */}
                        <div
                          className="relative w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02] cursor-pointer"
                          style={{
                            height: 'clamp(220px, 38vw, 450px)',
                            backgroundImage: item.first_image ? `url(http://127.0.0.1:8000/storage/${item.first_image})` : 'none',
                            backgroundColor: item.first_image ? 'transparent' : '#e5e7eb',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            maskImage: "url('/images/mask.png')",
                            WebkitMaskImage: "url('/images/mask.png')",
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                          }}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 cursor-pointer" />
                        </div>

                        {/* Name */}
                        <h3 className="text-[#faa821] text-lg sm:text-xl lg:text-2xl font-bold mt-4 sm:mt-5 text-center transition-colors duration-300 group-hover:text-[#fcb742] px-2">
                          {item.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 max-w-xs sm:max-w-sm text-center text-base sm:text-lg leading-relaxed text-black/70 px-2">
                          {getDescription(item.meta_data)}
                        </p>

                        <span className="mt-3 sm:mt-4 text-md font-semibold uppercase tracking-[0.24em] text-[#faa821]">
                          View Details
                        </span>
                      </Link>
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicePage