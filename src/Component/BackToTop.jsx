import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaCalendarCheck } from 'react-icons/fa'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

      {/* Book Now Button */}
      <a
        href="/booking"
        className="lg:hidden block flex items-center gap-2 bg-[#FAA821] hover:bg-[#e69512] text-white px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
      >
        <FaCalendarCheck size={18} />
        <span>Book Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9857642211"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Back To Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="relative w-20 h-16 flex cursor-pointer items-center justify-center transition-all duration-300 hover:scale-110"
        >
          {/* Outline Layer */}
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundColor: 'white',
              maskImage: "url('/images/logo.png')",
              WebkitMaskImage: "url('/images/logo.png')",
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          />

          {/* Main Shape */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#FAA821',
              maskImage: "url('/images/logo.png')",
              WebkitMaskImage: "url('/images/logo.png')",
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          />

          {/* Text */}
          <span className="relative text-[12px] font-bold mt-2 text-[#1b6934] text-center leading-tight px-1">
            Back to Top
          </span>
        </button>
      )}
    </div>
  )
}

export default BackToTop