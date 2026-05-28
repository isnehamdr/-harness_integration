import React from 'react'
import { Link } from 'react-router-dom'
import { servicesData } from '../../data/servicesData'

const Services = () => {
    return (
        <div className="w-full h-full py-12 flex flex-col items-center justify-center px-6 text-center">
            <button
                className="text-white px-8 py-2 mb-4 text-sm uppercase tracking-widest font-semibold transition-colors duration-300"
                style={{
                    backgroundColor: "#FAA821",
                    maskImage: "url('/images/logo.png')",
                    WebkitMaskImage: "url('/images/logo.png')",
                    maskSize: "contain",
                    WebkitMaskSize: "cover",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                }}
            >
                <h3>Experiences</h3>
            </button>

            <h2 className="text-[#faa821] text-2xl sm:text-3xl text-center md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-2xl">
                Experiences the best service
            </h2>

            <p className="text-black/90 text-lg sm:text-xl tracking-wide max-w-2xl leading-relaxed mb-6 drop-shadow-lg">
                Step into a place where every moment becomes an experience. From dining above breathtaking landscapes to celebrating life's
                biggest occasions and hosting meaningful events, Harness offers the perfect setting for adventure, connection, and unforgettable memories.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 mt-8 max-w-7xl">
                {servicesData.map((service) => (
                    <Link key={service.id} to={`/services/${service.slug}`} className="flex flex-col items-center w-full group">
                        <div
                            className="bg-cover bg-center relative w-full h-[400px] sm:h-[500px] md:h-[400px] transition duration-500 group-hover:scale-[1.02]"
                            style={{
                                backgroundImage: `url(${service.image})`,
                                maskImage: "url('/images/mask.png')",
                                WebkitMaskImage: "url('/images/mask.png')",
                                maskSize: "contain",
                                WebkitMaskSize: "contain",
                                maskPosition: "center",
                                WebkitMaskPosition: "center",
                                maskRepeat: "no-repeat",
                                WebkitMaskRepeat: "no-repeat",
                                maxWidth: "100%",
                            }}
                        />

                        <h3 className="text-[#faa821] text-xl md:text-2xl font-bold mt-6 text-center">
                            {service.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Services
