// import React, { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import About2 from '../Component/About2'
// import Roomlisting from '../Component/Roomlisting'

// gsap.registerPlugin(ScrollTrigger)

// const AboutPage = () => {
//     const heroRef = useRef(null)
//     const textRef = useRef(null)
//     const contentSectionRef = useRef(null)
//     const maskRef = useRef(null)
//     const contentRef = useRef(null)

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             // ── Hero entrance animation ──────────────────────────────
//             gsap.fromTo(
//                 textRef.current,
//                 { y: 80, opacity: 0 },
//                 { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
//             )

//             // ── Content section: scroll-over the hero ───────────────
//             gsap.fromTo(
//                 contentSectionRef.current,
//                 { yPercent: 100 },
//                 {
//                     yPercent: 0,
//                     ease: 'power2.out',
//                     scrollTrigger: {
//                         trigger: heroRef.current,
//                         start: 'top top',
//                         end: 'bottom top',
//                         scrub: 0.8,
//                         pin: heroRef.current,
//                         pinSpacing: true,
//                     },
//                 }
//             )

//             // ── Mask SVG animation ───────────────────────────────────
//             gsap.fromTo(
//                 maskRef.current,
//                 { scale: 1, opacity: 0, rotateZ: -5 },
//                 {
//                     scale: 1,
//                     opacity: 1,
//                     rotateZ: 0,
//                     duration: 1.5,
//                     ease: 'back.out(0.5)',
//                     scrollTrigger: {
//                         trigger: heroRef.current,
//                         start: 'top center',
//                         end: 'bottom top',
//                         scrub: 1.2,
//                     },
//                 }
//             )

//             // ── Content children with stagger ────────────────────────
//             if (contentRef.current && contentRef.current.children.length > 0) {
//                 gsap.fromTo(
//                     contentRef.current.children,
//                     { opacity: 0, y: 60, scale: 0.95 },
//                     {
//                         opacity: 1,
//                         y: 0,
//                         scale: 1,
//                         duration: 0.8,
//                         stagger: 0.15,
//                         ease: 'elastic.out(0.6, 0.5)',
//                         scrollTrigger: {
//                             trigger: contentSectionRef.current,
//                             start: 'top 60%',
//                             end: 'top 30%',
//                             scrub: 0.5,
//                         },
//                     }
//                 )
//             }
//         })

//         return () => ctx.revert()
//     }, [])

//     return (
//         <>
//             {/* ── HERO ─────────────────────────────────────────────── */}
//             <div
//                 ref={heroRef}
//                 className="relative bg-white w-full h-screen overflow-hidden"
//                 style={{ zIndex: 1 }}
//             >
//                 {/* Background Image */}
//                 <img
//                     src="/images/about2.jpeg"
//                     alt="About Harness Zipline and Adventure Resort"
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                 />

          
//                 {/* Dark Overlay */}
//                 <div className="absolute inset-0 bg-black/50 z-10"></div>
            

//                 {/* Hero Text */}
//                 <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
//                     <div ref={textRef} className="text-center px-4">
//                         <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
//                             About Us
//                         </h2>
//                     </div>
//                 </div>

//                 {/* Gold Divider */}

//                 {/* ── CONTENT — slides up over the hero on scroll ── */}
//                 <div
//                     ref={contentSectionRef}
//                     className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
//                     style={{ top: 'auto' }}
//                 >
//                     {/* Mask SVG background */}
//                     <div
//                         ref={maskRef}
//                         className="absolute inset-0 w-full h-full"
//                         style={{ transformOrigin: 'center center' }}
//                     >
//                         <img
//                             src="/images/mask.svg"
//                             alt=""
//                             className="w-full h-full object-cover object-top invert"
//                         />
//                     </div>

//                     {/* ── Keemala-style centered layout: title + image left / text right ── */}
//                     <div
//                         ref={contentRef}
//                         className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10 px-4 pt-52 sm:pt-52 pb-16"
//                     >
//                         <div className=" flex flex-col items-center gap-5">

//                             {/* Logo badge (centered) */}
//                             <button
//                                 className="text-white px-8 py-2 text-sm uppercase tracking-widest font-semibold"
//                                 style={{
//                                     backgroundColor: "#FAA821",
//                                     maskImage: "url('/images/logo.png')",
//                                     WebkitMaskImage: "url('/images/logo.png')",
//                                     maskSize: "contain",
//                                     WebkitMaskSize: "cover",
//                                     maskPosition: "center",
//                                     WebkitMaskPosition: "center",
//                                     maskRepeat: "no-repeat",
//                                     WebkitMaskRepeat: "no-repeat",
//                                 }}
//                             >
//                                 <h3>Our Story</h3>
//                             </button>

//                             {/* Title (centered) */}
//                             <div className="text-center">
//                                 <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
//                                 <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-2xl text-center">
//                                     Nepal's Premier<br />Adventure Destination
//                                 </h2>
                               
//                             </div>

//                            </div>  {/* Below title: image (left) + paragraphs (right) */}
//                             <div className=" flex flex-col lg:flex-row items-center justify-center gap-12 mt-6 max-w-6xl mx-auto">
//                                 <div className="flex-shrink-0 w-full lg:w-1/2">
//                                     <div
//                                         className="bg-cover bg-center relative w-full rounded-sm"
//                                         style={{
//                                             backgroundImage: `url(/images/about3.jpeg)`,
//                                             maskImage: "url('/images/mask.png')",
//                                             WebkitMaskImage: "url('/images/mask.png')",
//                                             maskSize: "contain",
//                                             WebkitMaskSize: "contain",
//                                             maskPosition: "center",
//                                             WebkitMaskPosition: "center",
//                                             maskRepeat: "no-repeat",
//                                             WebkitMaskRepeat: "no-repeat",
//                                             height: "400px",
//                                             maxWidth: "100%",
//                                             filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',
//                                         }}
//                                     ></div>
//                                 </div>

//                                 <div className=" flex flex-col justify-center text-left lg:w-1/2">
//                                     <p className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed mb-5">
//                                         Founded with a vision to create unforgettable experiences, Harness Zipline and Adventure Resort has evolved into a sanctuary for those who crave both excitement and serenity. Far away from the everyday, our resort is a true wonderland of nature and thrill.
//                                     </p>

//                                     <p className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed mb-8">
//                                         From soaring through the treetops on exhilarating ziplines to unwinding in the tranquil beauty of nature, we offer an escape like no other. We take pride in offering Nepal's first-ever igloo rooms — a lavish retreat that seamlessly integrates adventure with modern comforts, with a variety of activities and experiences for every kind of guest.
//                                     </p>

                                  
//                                 </div>
                           

//                         </div>
//                     </div>
//                 </div>
//             </div>

//            <About2/>
//            <Roomlisting/>
//         </>
//     )
// }

// export default AboutPage


import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'

import About2 from '../Component/About2'
import Roomlisting from '../Component/Roomlisting'

gsap.registerPlugin(ScrollTrigger)



const AboutPage = () => {
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const contentSectionRef = useRef(null)
    const maskRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(
                textRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )

            gsap.fromTo(
                contentSectionRef.current,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.8,
                        pin: heroRef.current,
                        pinSpacing: true,
                    },
                }
            )

            gsap.fromTo(
                maskRef.current,
                { scale: 1, opacity: 0, rotateZ: -5 },
                {
                    scale: 1,
                    opacity: 1,
                    rotateZ: 0,
                    duration: 1.5,
                    ease: 'back.out(0.5)',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top center',
                        end: 'bottom top',
                        scrub: 1.2,
                    },
                }
            )

            if (contentRef.current && contentRef.current.children.length > 0) {
                gsap.fromTo(
                    contentRef.current.children,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'elastic.out(0.6, 0.5)',
                        scrollTrigger: {
                            trigger: contentSectionRef.current,
                            start: 'top 60%',
                            end: 'top 30%',
                            scrub: 0.5,
                        },
                    }
                )
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <>
            {/* SEO META TAGS */}
            <Helmet>
                <title>About Harness Zipline & Adventure Resort in Kusma</title>

                <meta
                    name="description"
                    content="Learn about Harness Zipline & Adventure Resort in Kusma, Nepal and discover our story, scenic stays, outdoor experiences, and destination hospitality."
                />

                <link rel="canonical" href="https://www.theharnessnepal.com/about" />

                {/* Open Graph */}
                <meta property="og:title" content="About Us | Harness Zipline & Adventure Resort" />
                <meta
                    property="og:description"
                    content="Experience Nepal’s premier adventure resort blending nature, luxury, and thrilling activities."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.theharnessnepal.com/about" />
            </Helmet>

            {/* HERO SECTION */}
            <div
                ref={heroRef}
                className="relative bg-white w-full h-screen overflow-hidden"
            >
                {/* Background Image */}
                <img
                    src="/images/about2.jpeg"
                    alt="About Harness Zipline and Adventure Resort"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                {/* Hero Text */}
                <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
                    <div ref={textRef} className="text-center px-4">
                        <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                            About Us
                        </h2>
                    </div>
                </div>

                {/* CONTENT SECTION */}
                <div
                    ref={contentSectionRef}
                    className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
                >
                    {/* Mask Background */}
                    <div
                        ref={maskRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ transformOrigin: 'center center' }}
                    >
                        <img
                            src="/images/mask.svg"
                            alt="mask background"
                            className="w-full h-full object-cover object-top invert"
                        />
                    </div>

                    {/* CONTENT */}
                    <div
                        ref={contentRef}
                        className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10 px-4 pt-52 pb-16"
                    >
                        {/* Title Section */}
                        <div className="flex flex-col items-center gap-5">

                            <button
                                className="text-white px-8 py-2 text-sm uppercase tracking-widest font-semibold"
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
                                <h3>Our Story</h3>
                            </button>

                            <div className="text-center">
                                <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
                                <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
                                    Nepal's Premier<br />Adventure Destination
                                </h2>
                            </div>
                        </div>

                        {/* Image + Text */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-6 max-w-6xl mx-auto">

                            {/* Image */}
                            <div className="flex-shrink-0 w-full lg:w-1/2">
                                <div
                                    className="bg-cover bg-center w-full rounded-sm"
                                    style={{
                                        backgroundImage: `url(/images/about3.jpeg)`,
                                        maskImage: "url('/images/mask.png')",
                                        WebkitMaskImage: "url('/images/mask.png')",
                                        maskSize: "contain",
                                        WebkitMaskSize: "contain",
                                        maskPosition: "center",
                                        WebkitMaskPosition: "center",
                                        maskRepeat: "no-repeat",
                                        WebkitMaskRepeat: "no-repeat",
                                        height: "400px",
                                        filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',
                                    }}
                                />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center text-left lg:w-1/2">
                                <p className="text-black/90 text-base sm:text-xl leading-relaxed mb-5">
                                    Founded with a vision to create unforgettable experiences, Harness Zipline and Adventure Resort has evolved into a sanctuary for those who crave both excitement and serenity.
                                </p>

                                <p className="text-black/90 text-base sm:text-xl leading-relaxed mb-8">
                                    From thrilling ziplines to peaceful nature escapes, we offer a perfect balance of adventure and luxury hospitality in Nepal.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* EXTRA SECTIONS */}
            <About2 />
            <Roomlisting />
        </>
    )
}

export default AboutPage
