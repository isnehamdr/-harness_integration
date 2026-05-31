// import React, { useRef, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Helmet } from 'react-helmet-async'
// import blogsData from '../data/blogsData.json'
// import axios from 'axios'

// gsap.registerPlugin(ScrollTrigger)

// const Blog = () => {
//     const heroRef = useRef(null)
//     const textRef = useRef(null)
//     const contentSectionRef = useRef(null)
//     const maskRef = useRef(null)
//     const contentRef = useRef(null)

//     const [blogs, setblogs] = useState([]);

// useEffect(() => {
//       const fetchblogs = async () => {
//         try {
//           const response = await axios.get("http://127.0.0.1:8000/api/blogs");
//           const data = response.data.data;
//           setblogs(data);
//         } catch (error) {
//           console.error("fetching error", error);
//         }
//       };
//       fetchblogs();
//     }, []);

//     console.log(blogs)

//     useEffect(() => {
//         const ctx = gsap.context(() => {

//             gsap.fromTo(
//                 textRef.current,
//                 { y: 80, opacity: 0 },
//                 { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
//             )

//             gsap.set(contentSectionRef.current, { yPercent: 100 })

//             gsap.to(contentSectionRef.current, {
//                 yPercent: 0,
//                 ease: 'none',
//                 scrollTrigger: {
//                     trigger: heroRef.current,
//                     start: 'top top',
//                     end: '+=120%',
//                     scrub: 1,
//                     pin: heroRef.current,
//                     pinSpacing: true,
//                     anticipatePin: 1,
//                     invalidateOnRefresh: true,
//                 },
//             })

//             gsap.fromTo(
//                 maskRef.current,
//                 {
//                     opacity: 0,
//                     scale: 1.05,
//                     rotate: -4,
//                 },
//                 {
//                     opacity: 1,
//                     scale: 1,
//                     rotate: 0,
//                     ease: 'power2.out',
//                     scrollTrigger: {
//                         trigger: heroRef.current,
//                         start: 'top center',
//                         end: 'bottom top',
//                         scrub: 1,
//                     },
//                 }
//             )

//             const children = contentRef.current?.children

//             if (children?.length > 0) {
//                 gsap.fromTo(
//                     children,
//                     { opacity: 0, y: 50 },
//                     {
//                         opacity: 1,
//                         y: 0,
//                         duration: 0.9,
//                         stagger: 0.12,
//                         ease: 'power3.out',
//                         scrollTrigger: {
//                             trigger: contentSectionRef.current,
//                             start: 'top 72%',
//                         },
//                     }
//                 )
//             }

//             ScrollTrigger.refresh()
//         })

//         const handleResize = () => ScrollTrigger.refresh()
//         window.addEventListener('resize', handleResize)

//         return () => {
//             ctx.revert()
//             window.removeEventListener('resize', handleResize)
//             ScrollTrigger.getAll().forEach((t) => t.kill())
//         }
//     }, [])

//     return (
//         <>
//             {/* SEO TAGS */}
//             <Helmet>
//                 <title>Blog | See Our Latest Updates & Stories</title>
//                 <meta
//                     name="description"
//                     content="Explore our latest blog posts, updates, and stories. Discover insights, experiences, and highlights from our services and hospitality."
//                 />
//                 <link rel="canonical" href="https://www.theharnessnepal.com/blog" />
//             </Helmet>

//             {/* HERO */}
//             <div
//                 ref={heroRef}
//                 className="relative bg-white w-full h-screen overflow-hidden"
//                 style={{ zIndex: 1 }}
//             >
//                 <img
//                     src="/images/about3.jpeg"
//                     alt="Blog"
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/50 z-10" />

//                 <div className="relative z-20 w-full h-full flex items-end justify-center pb-10 lg:pb-20">
//                     <div ref={textRef} className="text-center px-4">
//                         <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
//                             See Our Blog
//                         </h2>
//                     </div>
//                 </div>

//                 <div
//                     ref={contentSectionRef}
//                     className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden"
//                 >
//                     <div
//                         ref={maskRef}
//                         className="absolute inset-0 w-full h-full"
//                     >
//                         <img
//                             src="/images/mask.svg"
//                             alt="arrow" 
//                             className="w-full h-full object-cover object-top invert"
//                         />
//                     </div>

//                     <div
//                         ref={contentRef}
//                         className="relative z-10 w-full min-h-screen flex items-center justify-center mt-10 sm:mt-0"
//                     >
//                         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32 relative z-20 mt-16 sm:mt-20 lg:mt-32">

//                             <div className="w-full relative z-30 sm:mt-12 -mt-48">

//                                 <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
//                                     <button
//                                         className="text-white px-6 sm:px-8 py-2 mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-colors duration-300  relative z-30"
//                                         style={{
//                                             backgroundColor: "#FAA821",
//                                             WebkitMaskImage: "url('/images/logo.png')",
//                                             maskImage: "url('/images/logo.png')",
//                                             WebkitMaskSize: "cover",
//                                             maskSize: "cover",
//                                             WebkitMaskPosition: "center",
//                                             maskPosition: "center",
//                                             WebkitMaskRepeat: "no-repeat",
//                                             maskRepeat: "no-repeat",
//                                         }}
//                                     >
//                                         Blog
//                                     </button>
//                                 </div>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-2 sm:px-4 relative z-30">

//                                     {blogsData.map((post) => (
//                                         <Link
//                                             key={post.id}
//                                             to={`/blog/${post.slug}`}
//                                             className="flex flex-col items-center w-full group transition-transform duration-300"
//                                         >
//                                             <div
//                                                 className="relative w-full cursor-pointer transition-all duration-500 "
//                                                 style={{ height: "clamp(280px,40vw,450px)" }}
//                                             >
//                                                 <img
//                                                     src={post.image}
//                                                     alt={post.alt}
//                                                     className="absolute inset-0 w-full h-full object-cover"
//                                                     style={{
//                                                         WebkitMaskImage: "url('/images/mask.png')",
//                                                         maskImage: "url('/images/mask.png')",
//                                                         WebkitMaskRepeat: "no-repeat",
//                                                         maskRepeat: "no-repeat",
//                                                         WebkitMaskPosition: "center",
//                                                         maskPosition: "center",
//                                                         WebkitMaskSize: "100% 100%",
//                                                         maskSize: "100% 100%",
//                                                     }}
//                                                 />

//                                                 <div
//                                                     className="absolute inset-0 bg-black/0  transition-all duration-500 pointer-events-none"
//                                                     style={{
//                                                         WebkitMaskImage: "url('/images/mask.png')",
//                                                         maskImage: "url('/images/mask.png')",
//                                                         WebkitMaskRepeat: "no-repeat",
//                                                         maskRepeat: "no-repeat",
//                                                         WebkitMaskPosition: "center",
//                                                         maskPosition: "center",
//                                                         WebkitMaskSize: "100% 100%",
//                                                         maskSize: "100% 100%",
//                                                     }}
//                                                 />
//                                             </div>

//                                             <h3 className="text-[#faa821] text-lg sm:text-xl lg:text-2xl font-bold mt-5 text-center transition-colors duration-300 group-hover:text-[#fcb742] px-2">
//                                                 {post.title}
//                                             </h3>
//                                         </Link>
//                                     ))}

//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Blog

import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = 'http://127.0.0.1:8000/storage/'

const Blog = () => {
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const contentSectionRef = useRef(null)
    const maskRef = useRef(null)
    const contentRef = useRef(null)

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const imgurl = import.meta.env.VITE_IMAGE_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // ── Fetch & filter blogs ─────────────────────────────────────────
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/blogs`)
                const data = response.data.data

                // Keep only archived (published) entries
                const published = Array.isArray(data)
                    ? data.filter((item) => item.is_archived === true || item.is_archived === 1)
                    : []

                setBlogs(published)
            } catch (error) {
                console.error('Blog fetch error:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    // ── GSAP animations ──────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(
                textRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            )

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

            gsap.fromTo(
                maskRef.current,
                { opacity: 0, scale: 1.05, rotate: -4 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top center',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            )

            const children = contentRef.current?.children
            if (children?.length > 0) {
                gsap.fromTo(
                    children,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentSectionRef.current,
                            start: 'top 72%',
                        },
                    }
                )
            }

            ScrollTrigger.refresh()
        })

        const handleResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', handleResize)

        return () => {
            ctx.revert()
            window.removeEventListener('resize', handleResize)
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [blogs]) // re-run once blogs are loaded so children exist in DOM

    return (
        <>
            <Helmet>
                <title>Blog | See Our Latest Updates & Stories</title>
                <meta
                    name="description"
                    content="Explore our latest blog posts, updates, and stories. Discover insights, experiences, and highlights from our services and hospitality."
                />
                <link rel="canonical" href="https://www.theharnessnepal.com/blog" />
            </Helmet>

            {/* HERO */}
            <div
                ref={heroRef}
                className="relative bg-white w-full h-screen overflow-hidden"
                style={{ zIndex: 1 }}
            >
                <img
                    src="/images/about3.jpeg"
                    alt="Blog"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 z-10" />

                <div className="relative z-20 w-full h-full flex items-end justify-center pb-10 lg:pb-20">
                    <div ref={textRef} className="text-center px-4">
                        <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                            See Our Blog
                        </h2>
                    </div>
                </div>

                <div
                    ref={contentSectionRef}
                    className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden"
                >
                    <div ref={maskRef} className="absolute inset-0 w-full h-full">
                        <img
                            src="/images/mask.svg"
                            alt="mask"
                            className="w-full h-full object-cover object-top invert"
                        />
                    </div>

                    <div
                        ref={contentRef}
                        className="relative z-10 w-full min-h-screen flex items-center justify-center mt-10 sm:mt-0"
                    >
                        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32 relative z-20 mt-16 sm:mt-20 lg:mt-32">

                            <div className="w-full relative z-30 sm:mt-12 -mt-48">

                                <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                                    <button
                                        className="text-white px-6 sm:px-8 py-2 mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-colors duration-300 relative z-30"
                                        style={{
                                            backgroundColor: '#FAA821',
                                            WebkitMaskImage: "url('/images/logo.png')",
                                            maskImage: "url('/images/logo.png')",
                                            WebkitMaskSize: 'cover',
                                            maskSize: 'cover',
                                            WebkitMaskPosition: 'center',
                                            maskPosition: 'center',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskRepeat: 'no-repeat',
                                        }}
                                    >
                                        Blog
                                    </button>
                                </div>

                                {/* ── Blog Grid ── */}
                                {loading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <div className="w-10 h-10 border-2 border-[#FAA821] border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : blogs.length === 0 ? (
                                    <p className="text-center text-black/60 py-20 text-lg">
                                        No blog posts available.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-2 sm:px-4 relative z-30">
                                        {blogs.map((post) => (
                                            <Link
                                                key={post.id}
                                                to={`/blog/${post.slug}`}
                                                className="flex flex-col items-center w-full group transition-transform duration-300"
                                            >
                                                <div
                                                    className="relative w-full cursor-pointer transition-all duration-500"
                                                    style={{ height: 'clamp(280px,40vw,450px)' }}
                                                >
                                                    <img
                                                        src={`${imgurl}/${post.image}`}
                                                        alt={post.name}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                        style={{
                                                            WebkitMaskImage: "url('/images/mask.png')",
                                                            maskImage: "url('/images/mask.png')",
                                                            WebkitMaskRepeat: 'no-repeat',
                                                            maskRepeat: 'no-repeat',
                                                            WebkitMaskPosition: 'center',
                                                            maskPosition: 'center',
                                                            WebkitMaskSize: '100% 100%',
                                                            maskSize: '100% 100%',
                                                        }}
                                                    />

                                                    <div
                                                        className="absolute inset-0 bg-black/0 transition-all duration-500 pointer-events-none"
                                                        style={{
                                                            WebkitMaskImage: "url('/images/mask.png')",
                                                            maskImage: "url('/images/mask.png')",
                                                            WebkitMaskRepeat: 'no-repeat',
                                                            maskRepeat: 'no-repeat',
                                                            WebkitMaskPosition: 'center',
                                                            maskPosition: 'center',
                                                            WebkitMaskSize: '100% 100%',
                                                            maskSize: '100% 100%',
                                                        }}
                                                    />
                                                </div>

                                                <h3 className="text-[#faa821] text-lg sm:text-xl lg:text-2xl font-bold mt-5 text-center transition-colors duration-300 group-hover:text-[#fcb742] px-2">
                                                    {post.name}
                                                </h3>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog