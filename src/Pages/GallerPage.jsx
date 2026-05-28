import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../Component/Seo'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const GalleryPage = () => {
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const contentSectionRef = useRef(null)
    const maskRef = useRef(null)
    const contentRef = useRef(null)
    const sliderContainerRef = useRef(null)

    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [gallery, setGallery] = useState([])

    // Fetch Gallery
    useEffect(() => {
        const fetchgallery = async () => {
            try {
                setIsLoading(true)

                const response = await axios.get(
                    'http://127.0.0.1:8000/api/galleries'
                )

                // Only archived galleries
                const filteredGallery = response.data.filter(
                    (item) => item.is_archived === 1
                )

                setGallery(filteredGallery)
            } catch (error) {
                console.error('fetching error', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchgallery()
    }, [])

    console.log('gallery', gallery)

    // Responsive
    useEffect(() => {
        let timeoutId

        const checkScreenSize = () => {
            if (timeoutId) clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 640)
            }, 150)
        }

        checkScreenSize()

        window.addEventListener('resize', checkScreenSize)

        return () => {
            window.removeEventListener('resize', checkScreenSize)

            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [])

    // Slider
    const nextSlide = useCallback(() => {
        if (gallery.length === 0) return

        setCurrentSlide((prev) => (prev + 1) % gallery.length)
    }, [gallery.length])

    const prevSlide = useCallback(() => {
        if (gallery.length === 0) return

        setCurrentSlide(
            (prev) => (prev - 1 + gallery.length) % gallery.length
        )
    }, [gallery.length])

    // GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )

            gsap.fromTo(
                contentSectionRef.current,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=120%',
                        scrub: 0.5,
                        pin: true,
                        anticipatePin: 1,
                    },
                }
            )

            gsap.fromTo(
                maskRef.current,
                { opacity: 0, scale: 1.1 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top center',
                        end: 'bottom top',
                        scrub: 0.5,
                    },
                }
            )

            if (contentRef.current?.children.length > 0 && !isMobile) {
                gsap.fromTo(
                    contentRef.current.children,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                            once: true,
                        },
                    }
                )
            }

            if (sliderContainerRef.current && isMobile) {
                gsap.fromTo(
                    sliderContainerRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sliderContainerRef.current,
                            start: 'top 90%',
                            once: true,
                        },
                    }
                )
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            ctx.revert()
        }
    }, [isMobile, gallery])

    // Image Load
    const handleImageLoad = useCallback((id) => {
        setImagesLoaded((prev) => ({
            ...prev,
            [id]: true,
        }))
    }, [])

    // Desktop Grid
    const renderGrid = useMemo(
        () => () => (
            <div
                ref={contentRef}
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    sm:gap-6
                    mt-14
                    lg:mt-20
                "
            >
                {gallery.map((service) => (
                    <div
                        key={service.id}
                        className="
                            group
                            relative
                            transition-transform
                            duration-300
                            hover:-translate-y-2
                        "
                    >
                        <div
                            className="
                                relative
                                w-full
                                overflow-hidden
                                transition-all
                                duration-300
                                group-hover:scale-[1.02]
                                cursor-pointer
                            "
                            style={{
                                aspectRatio: '4/5',
                                minHeight: '300px',
                            }}
                        >
                            <img
                                src={`http://127.0.0.1:8000/storage/${service.images?.[0]?.path}`}
                                alt={service.name}
                                loading="lazy"
                                className={`
                                    absolute inset-0 w-full h-full object-cover
                                    transition-opacity duration-300
                                    ${
                                        imagesLoaded[service.id]
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                `}
                                style={{
                                    maskImage: "url('/images/mask.png')",
                                    WebkitMaskImage:
                                        "url('/images/mask.png')",
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskPosition: 'center',
                                    WebkitMaskPosition: 'center',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                }}
                                onLoad={() =>
                                    handleImageLoad(service.id)
                                }
                            />

                            {!imagesLoaded[service.id] && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            )}
                        </div>

                        <p className="text-center mt-4 text-[#faa821] font-semibold">
                            {service.name}
                        </p>
                    </div>
                ))}
            </div>
        ),
        [gallery, imagesLoaded, handleImageLoad]
    )

    // Mobile Slider
    const renderSlider = useMemo(
        () => () => (
            <div
                ref={sliderContainerRef}
                className="mt-10 sm:mt-14 lg:mt-20 px-2"
            >
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                        >
                            {gallery.map((service) => (
                                <div
                                    key={service.id}
                                    className="w-full flex-shrink-0 px-2"
                                >
                                    <div
                                        className="
                                            relative
                                            w-full
                                            overflow-hidden
                                            transition-all
                                            duration-300
                                            cursor-pointer
                                            mx-auto
                                        "
                                        style={{
                                            aspectRatio: '4/5',
                                            maxWidth: '320px',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${service.images?.[0]?.path}`}
                                            alt={service.name}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{
                                                maskImage:
                                                    "url('/images/mask.png')",
                                                WebkitMaskImage:
                                                    "url('/images/mask.png')",
                                                maskSize: 'contain',
                                                WebkitMaskSize: 'contain',
                                                maskPosition: 'center',
                                                WebkitMaskPosition:
                                                    'center',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskRepeat:
                                                    'no-repeat',
                                            }}
                                        />
                                    </div>

                                    <p className="text-center text-gray-600 text-sm mt-3 font-medium">
                                        {service.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev */}
                    <button
                        onClick={prevSlide}
                        className="
                            absolute
                            left-0
                            top-1/2
                            -translate-y-1/2
                            bg-white/80
                            hover:bg-white
                            text-[#faa821]
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            shadow-lg
                            z-10
                        "
                    >
                        ‹
                    </button>

                    {/* Next */}
                    <button
                        onClick={nextSlide}
                        className="
                            absolute
                            right-0
                            top-1/2
                            -translate-y-1/2
                            bg-white/80
                            hover:bg-white
                            text-[#faa821]
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            shadow-lg
                            z-10
                        "
                    >
                        ›
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {gallery.map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setCurrentSlide(index)
                                }
                                className={`
                                    rounded-full
                                    transition-all
                                    duration-200
                                    ${
                                        currentSlide === index
                                            ? 'w-8 h-2 bg-[#faa821]'
                                            : 'w-2 h-2 bg-gray-300'
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        ),
        [gallery, currentSlide, nextSlide, prevSlide]
    )

    return (
        <>
            <Seo
                title="Harness Zipline Resort Gallery | Kusma Adventure Views"
                description="Browse the Harness Zipline & Adventure Resort gallery and explore scenic rooms, guest moments, event spaces, and outdoor experiences in Kusma, Nepal."
                path="/gallery"
                image="/images/gallery.jpeg"
                keywords="Harness gallery, Kusma resort photos, zipline Nepal images, adventure resort gallery"
            />

            <div className="relative bg-white w-full min-h-screen overflow-x-hidden">
                <section
                    ref={heroRef}
                    className="relative w-full h-screen overflow-hidden"
                >
                    <img
                        src="/images/gallery.jpeg"
                        alt="Gallery Hero"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50 z-10" />

                    <div className="relative z-20 w-full h-full flex items-end justify-center pb-16 lg:pb-24">
                        <div ref={textRef} className="text-center px-4">
                            <h1
                                className="
                                text-white
                                text-3xl
                                sm:text-4xl
                                md:text-5xl
                                lg:text-6xl
                                font-bold
                                leading-tight
                                drop-shadow-lg
                                max-w-4xl
                                mx-auto
                            "
                            >
                                Harness Zipline and Adventure Resort
                                Gallery
                            </h1>
                        </div>
                    </div>

                    <div
                        ref={contentSectionRef}
                        className="absolute inset-x-0 bottom-0 z-30"
                    >
                        <div
                            ref={maskRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        >
                            <img
                                src="/images/mask.svg"
                                alt="background"
                                className="w-full h-full object-cover object-top invert"
                            />
                        </div>

                        <div className="relative z-10 bg-transparent">
                            <div
                                className="
                                    absolute
                                    top-0
                                    right-0
                                    w-[200px]
                                    sm:w-[300px]
                                    md:w-[400px]
                                    pointer-events-none
                                    opacity-5
                                    sm:opacity-10
                                    z-0
                                "
                                style={{
                                    backgroundImage:
                                        "url('/images/sketch.png')",
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'top right',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            />

                            <div
                                className="
                                    relative
                                    z-20
                                    w-full
                                    max-w-7xl
                                    mx-auto
                                    px-4
                                    sm:px-6
                                    lg:px-10
                                    py-16
                                    sm:py-20
                                    lg:py-32
                                "
                            >
                                <div className="w-full relative z-30 mt-20 lg:mt-48">
                                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                                        <div
                                            className="
                                                text-white
                                                px-5
                                                sm:px-8
                                                py-1.5
                                                sm:py-2
                                                mb-4
                                                sm:mb-5
                                                text-[10px]
                                                sm:text-xs
                                                uppercase
                                                tracking-[0.2em]
                                                sm:tracking-[0.3em]
                                                font-semibold
                                            "
                                            style={{
                                                backgroundColor:
                                                    '#FAA821',
                                            }}
                                        >
                                            Photo
                                        </div>

                                        <h2
                                            className="
                                            text-[#faa821]
                                            text-xl
                                            sm:text-2xl
                                            md:text-3xl
                                            lg:text-4xl
                                            xl:text-5xl
                                            font-bold
                                            leading-tight
                                            mb-5
                                            sm:mb-6
                                            px-2
                                        "
                                        >
                                            Memories created by the
                                            Guest Experience
                                        </h2>
                                    </div>

                                    {isLoading ? (
                                        <div className="text-center mt-20 text-[#faa821] text-xl font-semibold">
                                            Loading Gallery...
                                        </div>
                                    ) : gallery.length === 0 ? (
                                        <div className="text-center mt-20 text-gray-500 text-lg">
                                            No Gallery Found
                                        </div>
                                    ) : isMobile ? (
                                        renderSlider()
                                    ) : (
                                        renderGrid()
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GalleryPage