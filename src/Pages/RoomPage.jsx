// import React, { useRef, useEffect, useState } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Helmet } from 'react-helmet-async'
// import Roomlayouts from '../Component/Roomlayouts'
// import axios from 'axios'

// gsap.registerPlugin(ScrollTrigger)

// const RoomPage = () => {
//     const heroRef        = useRef(null)
//     const textRef        = useRef(null)
//     const contentSectionRef = useRef(null)
//     const maskRef        = useRef(null)
//     const contentRef     = useRef(null)
//     const [room, setRoom] = useState(null)

//     useEffect(() => {
//         const fetchRoom = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/ourrooms');
//                 const data = response.data.data;
//                 setRoom(data);
//             } catch (error) {
//                 console.error('fetching error', error);
//             }
//         };
//         fetchRoom();
//     }, []);
// console.log(room)

//     useEffect(() => {
//         const ctx = gsap.context(() => {

//             // ── Hero text: animate in immediately on load ──────────
//             gsap.fromTo(
//                 textRef.current,
//                 { y: 60, opacity: 0 },
//                 { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
//             )

//             // ── Content panel slides up on scroll ──────────────────
//             gsap.fromTo(
//                 contentSectionRef.current,
//                 { yPercent: 100 },
//                 {
//                     yPercent: 0,
//                     ease: 'none',
//                     scrollTrigger: {
//                         trigger: heroRef.current,
//                         start: 'top top',
//                         end: 'bottom top',
//                         scrub: 0.8,
//                         pin: heroRef.current,
//                         pinSpacing: true,
//                         invalidateOnRefresh: true,
//                     },
//                 }
//             )

//             // ── Mask SVG: animates in on scroll (RESTORED) ─────────
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

//             // ── Content children: animate in on mount, not on scroll ──
//             const children = Array.from(contentRef.current?.children ?? [])
//             if (children.length > 0) {
//                 gsap.set(children, { opacity: 0, y: 40, scale: 0.97 })
//                 gsap.to(children, {
//                     opacity: 1,
//                     y: 0,
//                     scale: 1,
//                     duration: 0.6,
//                     stagger: 0.08,
//                     ease: 'power2.out',
//                     delay: 0.2,
//                     clearProps: 'all',
//                 })
//             }

//         }, heroRef)

//         return () => ctx.revert()
//     }, [])

//     return (
//         <>
//             <Helmet>
//                 {/* Meta Title */}
//                 <title>Accommodation at Harness Zipline & Adventure Resort</title>
                
//                 {/* Meta Description */}
//                 <meta name="description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
                
//                 {/* Canonical Tag */}
//                 <link rel="canonical" href="https://www.theharnessnepal.com/rooms" />
                
//                 {/* Additional SEO meta tags */}
//                 <meta name="keywords" content="Kusma rooms, Nepal resort accommodation, Harness rooms, igloo room Nepal" />
//                 <meta name="robots" content="index, follow" />
                
//                 {/* Open Graph tags for social media */}
//                 <meta property="og:title" content="Accommodation at Harness Zipline & Adventure Resort" />
//                 <meta property="og:description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
//                 <meta property="og:image" content="/images/room7.jpeg" />
//                 <meta property="og:url" content="https://www.theharnessnepal.com/rooms" />
//                 <meta property="og:type" content="website" />
                
//                 {/* Twitter Card tags */}
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Accommodation at Harness Zipline & Adventure Resort" />
//                 <meta name="twitter:description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
//                 <meta name="twitter:image" content="/images/room7.jpg" />
//             </Helmet>

//             <div
//                 ref={heroRef}
//                 className="relative bg-white w-full h-screen overflow-hidden"
//                 style={{ zIndex: 1 }}
//             >
//                 <img
//                     src="/images/room7.jpg"
//                     alt="About Harness Zipline and Adventure Resort"
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/50 z-10" />

//                 <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
//                     <div ref={textRef} className="text-center px-4">
//                         <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
//                             Accommodation
//                         </h2>
//                         <h2 className="text-[#faa821] max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-6">
//                             Rest in the Heart of Nature
//                         </h2>
//                         <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
//                             Escape the ordinary and immerse yourself in tranquility. Surrounded by lush forests,
//                             melodious bird songs, and fresh mountain air, our sanctuary offers the perfect blend
//                             of comfort and wilderness. Whether you're seeking adventure or peaceful solitude,
//                             nature welcomes you home.
//                         </p>
//                     </div>
//                 </div>

//                 {/* ── CONTENT PANEL ── */}
//                 <div
//                     ref={contentSectionRef}
//                     className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
//                     style={{ top: 'auto' }}
//                 >
//                     {/* Mask SVG — opacity starts at 0, animated by GSAP above */}
//                     <div
//                         ref={maskRef}
//                         className="absolute inset-0 w-full h-full"
//                         style={{ transformOrigin: 'center center', opacity: 0 }}
//                     >
//                         <img
//                             src="/images/mask.svg"
//                             alt="mask"
//                             className="w-full h-full object-cover object-top invert"
//                         />
//                     </div>

//                     <div
//                         ref={contentRef}
//                         className="relative z-10 w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 pt-10 sm:pt-24 lg:pt-40 pb-10 sm:pb-16 gap-8 sm:gap-12"
//                     >
//                         {/* Decorative bg5 */}
//                         <div className="absolute top-0 right-0 mt-20 sm:mt-8 w-[180px] sm:w-[260px] lg:w-[380px] opacity-60 pointer-events-none select-none">
//                             <img
//                                 src="/images/bg5.png"
//                                 alt="background"
//                                 className="w-full h-auto object-contain"
//                             />
//                         </div>

//                         {/* Badge + Title */}
//                         <div className="mt-20 flex flex-col items-center text-center w-full max-w-5xl gap-3 sm:gap-4">
//                             <button
//                                 className="text-white px-8 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold"
//                                 style={{
//                                     backgroundColor: '#FAA821',
//                                     maskImage: "url('/images/logo.png')",
//                                     WebkitMaskImage: "url('/images/logo.png')",
//                                     maskSize: 'contain',
//                                     WebkitMaskSize: 'cover',
//                                     maskPosition: 'center',
//                                     WebkitMaskPosition: 'center',
//                                     maskRepeat: 'no-repeat',
//                                     WebkitMaskRepeat: 'no-repeat',
//                                 }}
//                             >
//                                 Accommodation
//                             </button>

//                             <div className="w-10 h-px bg-[#FAA821] mx-auto" />

//                             <h2 className="text-[#faa821] text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
//                                 Nepal's Premier<br className="hidden sm:block" /> Stay Experience
//                             </h2>
//                         </div>

//                         {/* Two-column: text left, image right */}
//                         <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
//                             <div className="w-full lg:w-1/2 flex flex-col gap-5">
//                                 <p className="text-black/80 text-sm sm:text-base lg:text-xl tracking-wide leading-relaxed">
//                                     Founded with a vision to create unforgettable experiences, Harness Zipline
//                                     and Adventure Resort has evolved into a sanctuary for those who crave both
//                                     excitement and serenity. Far away from the everyday, our resort is a true
//                                     wonderland of nature and thrill.
//                                 </p>
//                                 <p className="text-black/80 text-sm sm:text-base lg:text-xl tracking-wide leading-relaxed">
//                                     From soaring through the treetops on exhilarating ziplines to unwinding in
//                                     the tranquil beauty of nature, we offer an escape like no other. We take
//                                     pride in offering Nepal's first-ever igloo rooms — a lavish retreat that
//                                     seamlessly integrates adventure with modern comforts.
//                                 </p>
//                             </div>

//                             <div className="w-full lg:w-1/2">
//                                 <img
//                                     src="/images/room7.jpg"
//                                     alt="Accommodation at Harness Resort"
//                                     className="w-full object-cover"
//                                     style={{
//                                         height: 'clamp(200px, 48vw, 420px)',
//                                         maskImage: "url('/images/mask.png')",
//                                         WebkitMaskImage: "url('/images/mask.png')",
//                                         maskSize: 'contain',
//                                         WebkitMaskSize: 'contain',
//                                         maskPosition: 'center',
//                                         WebkitMaskPosition: 'center',
//                                         maskRepeat: 'no-repeat',
//                                         WebkitMaskRepeat: 'no-repeat',
//                                         filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Roomlayouts />
//         </>
//     )
// }

// export default RoomPage


import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'
import Roomlayouts from '../Component/Roomlayouts'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const RoomPage = () => {
    const heroRef        = useRef(null)
    const textRef        = useRef(null)
    const contentSectionRef = useRef(null)
    const maskRef        = useRef(null)
    const contentRef     = useRef(null)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ourrooms');
                const data = response.data.data;
                // Filter only archived rooms
                const archivedRooms = data.filter(room => room.is_archived === true);
                setRooms(archivedRooms);
            } catch (error) {
                console.error('fetching error', error);
            }
        };
        fetchRoom();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Hero text: animate in immediately on load ──────────
            gsap.fromTo(
                textRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
            )

            // ── Content panel slides up on scroll ──────────────────
            gsap.fromTo(
                contentSectionRef.current,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.8,
                        pin: heroRef.current,
                        pinSpacing: true,
                        invalidateOnRefresh: true,
                    },
                }
            )

            // ── Mask SVG: animates in on scroll (RESTORED) ─────────
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

            // ── Content children: animate in on mount, not on scroll ──
            const children = Array.from(contentRef.current?.children ?? [])
            if (children.length > 0) {
                gsap.set(children, { opacity: 0, y: 40, scale: 0.97 })
                gsap.to(children, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power2.out',
                    delay: 0.2,
                    clearProps: 'all',
                })
            }

        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <>
            <Helmet>
                {/* Meta Title */}
                <title>Accommodation at Harness Zipline & Adventure Resort</title>
                
                {/* Meta Description */}
                <meta name="description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
                
                {/* Canonical Tag */}
                <link rel="canonical" href="https://www.theharnessnepal.com/rooms" />
                
                {/* Additional SEO meta tags */}
                <meta name="keywords" content="Kusma rooms, Nepal resort accommodation, Harness rooms, igloo room Nepal" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph tags for social media */}
                <meta property="og:title" content="Accommodation at Harness Zipline & Adventure Resort" />
                <meta property="og:description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
                <meta property="og:image" content="/images/room7.jpeg" />
                <meta property="og:url" content="https://www.theharnessnepal.com/rooms" />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Accommodation at Harness Zipline & Adventure Resort" />
                <meta name="twitter:description" content="Book rooms and unique stays at Harness Zipline & Adventure Resort in Kusma, Nepal, including scenic accommodation for adventure-filled getaways." />
                <meta name="twitter:image" content="/images/room7.jpg" />
            </Helmet>

            <div
                ref={heroRef}
                className="relative bg-white w-full h-screen overflow-hidden"
                style={{ zIndex: 1 }}
            >
                <img
                    src="/images/room7.jpg"
                    alt="About Harness Zipline and Adventure Resort"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 z-10" />

                <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
                    <div ref={textRef} className="text-center px-4">
                        <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                            Accommodation
                        </h2>
                        <h2 className="text-[#faa821] max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-6">
                            Rest in the Heart of Nature
                        </h2>
                        <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
                            Escape the ordinary and immerse yourself in tranquility. Surrounded by lush forests,
                            melodious bird songs, and fresh mountain air, our sanctuary offers the perfect blend
                            of comfort and wilderness. Whether you're seeking adventure or peaceful solitude,
                            nature welcomes you home.
                        </p>
                    </div>
                </div>

                {/* ── CONTENT PANEL ── */}
                <div
                    ref={contentSectionRef}
                    className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
                    style={{ top: 'auto' }}
                >
                    {/* Mask SVG — opacity starts at 0, animated by GSAP above */}
                    <div
                        ref={maskRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ transformOrigin: 'center center', opacity: 0 }}
                    >
                        <img
                            src="/images/mask.svg"
                            alt="mask"
                            className="w-full h-full object-cover object-top invert"
                        />
                    </div>

                    <div
                        ref={contentRef}
                        className="relative z-10 w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 pt-10 sm:pt-24 lg:pt-40 pb-10 sm:pb-16 gap-8 sm:gap-12"
                    >
                        {/* Decorative bg5 */}
                        <div className="absolute top-0 right-0 mt-20 sm:mt-8 w-[180px] sm:w-[260px] lg:w-[380px] opacity-60 pointer-events-none select-none">
                            <img
                                src="/images/bg5.png"
                                alt="background"
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        {/* Badge + Title */}
                        <div className="mt-20 flex flex-col items-center text-center w-full max-w-5xl gap-3 sm:gap-4">
                            <button
                                className="text-white px-8 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold"
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
                                Accommodation
                            </button>

                            <div className="w-10 h-px bg-[#FAA821] mx-auto" />

                            <h2 className="text-[#faa821] text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                Nepal's Premier<br className="hidden sm:block" /> Stay Experience
                            </h2>
                        </div>

                        {/* Two-column: text left, image right */}
                        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
                            <div className="w-full lg:w-1/2 flex flex-col gap-5">
                                <p className="text-black/80 text-sm sm:text-base lg:text-xl tracking-wide leading-relaxed">
                                    Founded with a vision to create unforgettable experiences, Harness Zipline
                                    and Adventure Resort has evolved into a sanctuary for those who crave both
                                    excitement and serenity. Far away from the everyday, our resort is a true
                                    wonderland of nature and thrill.
                                </p>
                                <p className="text-black/80 text-sm sm:text-base lg:text-xl tracking-wide leading-relaxed">
                                    From soaring through the treetops on exhilarating ziplines to unwinding in
                                    the tranquil beauty of nature, we offer an escape like no other. We take
                                    pride in offering Nepal's first-ever igloo rooms — a lavish retreat that
                                    seamlessly integrates adventure with modern comforts.
                                </p>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <img
                                    src="/images/room7.jpg"
                                    alt="Accommodation at Harness Resort"
                                    className="w-full object-cover"
                                    style={{
                                        height: 'clamp(200px, 48vw, 420px)',
                                        maskImage: "url('/images/mask.png')",
                                        WebkitMaskImage: "url('/images/mask.png')",
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pass the filtered rooms to Roomlayouts */}
            <Roomlayouts rooms={rooms} />
        </>
    )
}

export default RoomPage