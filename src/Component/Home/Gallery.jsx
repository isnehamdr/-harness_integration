import React, { useEffect, useRef } from "react"
import gsap from "gsap"

const Gallery = () => {
  const galleryRef = useRef(null)

  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={galleryRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Our Gallery
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Explore moments of adventure, comfort, and unforgettable experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-item overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery