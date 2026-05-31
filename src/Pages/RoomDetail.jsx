

// import React, { useRef, useEffect, useState } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Helmet } from 'react-helmet-async'
// import axios from 'axios'

// gsap.registerPlugin(ScrollTrigger)

// const getBookingUrl = (roomType) =>
//   roomType ? `/booking?room-type=${roomType}` : '/booking'

// // Default amenities data
// const defaultAmenities = [
//   { "icon": "images/icons/view.png", "label": "Ocean Views" },
//   { "icon": "images/icons/bed.png", "label": "Private Beach" },
//   { "icon": "images/icons/pool.png", "label": "Infinity Pool" },
//   { "icon": "images/icons/size.png", "label": "Beachfront Spa" }
// ]

// const RoomDetail = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const [room, setRoom] = useState(null)
//   const [allRooms, setAllRooms] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)

//   const heroRef         = useRef(null)
//   const textRef         = useRef(null)
//   const contentSectionRef = useRef(null)
//   const maskRef         = useRef(null)
//   const contentRef      = useRef(null)
//   const imgurl = import.meta.env.VITE_IMAGE_PATH;
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768)
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/ourrooms/${slug}`
//         );

//         const foundRoom = response.data.data;

//         setRoom({
//           id: foundRoom.id,
//           title: foundRoom.name,
//           slug: foundRoom.slug,
//           description: foundRoom.short_description || 'No description available.',
//           longDescription: foundRoom.long_description || 'No details available.',
//           images: foundRoom.images?.map(img => ({
//             url: img.image,
//             alt: foundRoom.name,
//           })) || [],
//           amenities: foundRoom.meta_data?.amenities || defaultAmenities,
//           tagline: foundRoom.meta_data?.tagline || "Luxury Accommodation",
//           price: foundRoom.price || "Contact for pricing",
//           bookingRoomType: foundRoom.slug,
//           is_featured: foundRoom.is_featured
//         });

//       } catch (error) {
//         console.error(error);
//         setRoom(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoom();
//     window.scrollTo(0, 0);
//   }, [slug]);

//   // Fetch all rooms for related section
//   useEffect(() => {
//     const fetchAllRooms = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/ourrooms`);
//         setAllRooms(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching all rooms:', error);
//         setAllRooms([]);
//       }
//     };
    
//     if (room) {
//       fetchAllRooms();
//     }
//   }, [room]);

//   useEffect(() => {
//     if (!room) return;
    
//     ScrollTrigger.getAll().forEach(t => t.kill())

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         textRef.current,
//         { y: isMobile ? 40 : 80, opacity: 0 },
//         { y: 0, opacity: 1, duration: isMobile ? 0.6 : 1.2, ease: 'power2.out', delay: isMobile ? 0.1 : 0 }
//       )

//       gsap.set(contentSectionRef.current, { yPercent: 100 })

//       ScrollTrigger.create({
//         trigger: heroRef.current,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: isMobile ? 0.3 : 0.8,
//         pin: true,
//         pinSpacing: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           if (contentSectionRef.current) {
//             const progress = isMobile ? Math.min(1, self.progress * 1.2) : self.progress
//             gsap.set(contentSectionRef.current, { yPercent: 100 - progress * 100 })
//           }
//         },
//       })

//       gsap.fromTo(
//         maskRef.current,
//         { scale: isMobile ? 1.1 : 1.2, opacity: 0 },
//         {
//           scale: 1, opacity: 1,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: heroRef.current,
//             start: 'top center',
//             end: 'bottom center',
//             scrub: isMobile ? 0.5 : 1.2,
//           },
//         }
//       )

//       if (contentRef.current?.children.length > 0) {
//         gsap.fromTo(
//           contentRef.current.children,
//           { opacity: 0, y: isMobile ? 30 : 60, scale: isMobile ? 0.98 : 0.95 },
//           {
//             opacity: 1, y: 0, scale: 1,
//             duration: isMobile ? 0.5 : 0.8,
//             stagger: isMobile ? 0.08 : 0.15,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: contentSectionRef.current,
//               start: isMobile ? 'top 70%' : 'top 60%',
//               end:   isMobile ? 'top 40%' : 'top 30%',
//               scrub: isMobile ? 0.3 : 0.5,
//               once:  isMobile,
//             },
//           }
//         )
//       }
//     }, heroRef)

//     return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
//   }, [room, isMobile])

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAA821]"></div>
//           <p className="mt-4 text-stone-600">Loading room details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!room) {
//     return (
//       <>
//         <Helmet>
//           <title>Room Not Found - Harness Zipline &amp; Adventure Resort</title>
//           <link rel="canonical" href="https://www.theharnessnepal.com/rooms" />
//         </Helmet>
//         <div className="flex min-h-screen items-center justify-center px-4 text-center text-stone-500">
//           <div>
//             <p className="text-xl">Room not found.</p>
//             <button onClick={() => navigate('/rooms')} className="mt-4 text-[#FAA821] underline">
//               Back to rooms
//             </button>
//           </div>
//         </div>
//       </>
//     )
//   }

//   const heroImage   = room.images?.[0]?.url || '/images/room7.jpeg'
//   const bookingUrl  = getBookingUrl(room.bookingRoomType)
//   const canonicalUrl = `https://www.theharnessnepal.com/rooms/${room.slug}`
//   const metaDescription = `${room.title} at Harness Zipline & Adventure Resort. ${room.description.substring(0, 150)} Book your stay today.`

//   return (
//     <>
//       <Helmet>
//         <title>{room.title} - Harness Zipline &amp; Adventure Resort | Luxury Accommodation</title>
//         <meta name="description" content={metaDescription} />
//         <link rel="canonical" href={canonicalUrl} />
//         <meta name="keywords" content={`${room.title}, ${room.tagline}, luxury rooms, adventure resort, harness accommodation`} />
//         <meta name="robots" content="index, follow" />
//         <meta property="og:title"       content={`${room.title} - Harness Zipline & Adventure Resort`} />
//         <meta property="og:description" content={room.description.substring(0, 200)} />
//         <meta property="og:image"       content={heroImage} />
//         <meta property="og:url"         content={canonicalUrl} />
//         <meta property="og:type"        content="website" />
//         <meta name="twitter:card"        content="summary_large_image" />
//         <meta name="twitter:title"       content={`${room.title} - Harness Zipline & Adventure Resort`} />
//         <meta name="twitter:description" content={room.description.substring(0, 200)} />
//         <meta name="twitter:image"       content={heroImage} />
//       </Helmet>

//       <div
//         ref={heroRef}
//         className="relative w-full h-screen overflow-hidden bg-black"
//         style={{ zIndex: 1 }}
//       >
//         <img
//           src={`${imgurl}/${heroImage}`}
//           alt={room.title}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 z-10" />

//         <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
//           <div ref={textRef} className="text-center px-4">
//             <p className="mb-3 text-lg font-semibold uppercase tracking-[0.3em] text-[#FAA821]">
//               Accommodation
//             </p>
//             <h1 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold drop-shadow-lg">
//               {room.title}
//             </h1>
//           </div>
//         </div>

//         <div
//           ref={contentSectionRef}
//           className="absolute inset-x-0 bottom-0 z-30 overflow-hidden"
//           style={{ top: 'auto', minHeight: isMobile ? '85vh' : '70vh' }}
//         >
//           <div
//             ref={maskRef}
//             className="absolute inset-0 w-full h-full"
//             style={{ transformOrigin: 'center center' }}
//           >
//             <img src="/images/mask.svg" alt="" aria-hidden="true"
//               className="w-full h-full object-cover object-top invert" />
//           </div>

//           <div
//             ref={contentRef}
//             className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10 px-4 pb-16"
//             style={{ paddingTop: isMobile ? '120px' : '208px' }}
//           >
//             <div className="flex flex-col items-center gap-5">
//               <div
//                 className="h-12 w-32"
//                 style={{
//                   backgroundColor:    '#FAA821',
//                   maskImage:          "url('/images/logo.png')",
//                   WebkitMaskImage:    "url('/images/logo.png')",
//                   maskSize:           'contain',
//                   WebkitMaskSize:     'contain',
//                   maskPosition:       'center',
//                   WebkitMaskPosition: 'center',
//                   maskRepeat:         'no-repeat',
//                   WebkitMaskRepeat:   'no-repeat',
//                 }}
//                 role="img" aria-label="Harness logo"
//               />
//               <div className="text-center">
//                 <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
//                 <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-5xl font-bold leading-tight drop-shadow-2xl">
//                   {room.title}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
//               <div className="flex-shrink-0 w-full lg:w-1/2">
//                 <div
//                   className="w-full bg-cover bg-center"
//                   style={{
//                     backgroundImage:    `url(${imgurl}/${heroImage})`,
//                     maskImage:          "url('/images/mask.png')",
//                     WebkitMaskImage:    "url('/images/mask.png')",
//                     maskSize:           'contain',
//                     WebkitMaskSize:     'contain',
//                     maskPosition:       'center',
//                     WebkitMaskPosition: 'center',
//                     maskRepeat:         'no-repeat',
//                     WebkitMaskRepeat:   'no-repeat',
//                     height:             isMobile ? '300px' : '400px',
//                     filter:             'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',
//                   }}
//                 />
//               </div>

//               <div className="flex flex-col justify-center text-left lg:w-1/2 gap-5">
//                 <p className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed">
//                   {room.description}
//                 </p>
//                 <p className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed">
//                   {room.longDescription}
//                 </p>
//                 <Link
//                   to={bookingUrl}
//                   className="self-start inline-flex items-center justify-center bg-[#FAA821] px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f] mt-2"
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="relative w-full overflow-hidden">
//         <div
//           className="relative w-full overflow-hidden"
//           style={{ minHeight: isMobile ? '400px' : 'clamp(480px, 55vw, 800px)' }}
//         >
//           <div
//             className="absolute inset-0 w-full h-full"
//             style={{
//               backgroundImage:    `url('${imgurl}/${heroImage}')`,
//               backgroundSize:     'cover',
//               backgroundPosition: 'center',
//               WebkitMaskImage:    "url('/images/mask4.svg')",
//               maskImage:          "url('/images/mask4.svg')",
//               WebkitMaskSize:     '100% 100%',
//               maskSize:           '100% 100%',
//               WebkitMaskRepeat:   'no-repeat',
//               maskRepeat:         'no-repeat',
//             }}
//           />
//           <div
//             className="absolute inset-0 w-full h-full"
//             style={{
//               backgroundColor:  'rgba(0,0,0,0.45)',
//               WebkitMaskImage:  "url('/images/mask4.svg')",
//               maskImage:        "url('/images/mask4.svg')",
//               WebkitMaskSize:   '100% 100%',
//               maskSize:         '100% 100%',
//               WebkitMaskRepeat: 'no-repeat',
//               maskRepeat:       'no-repeat',
//             }}
//           />
//           <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
//             <h2 className="text-[#FAA821] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl mt-24 sm:mb-12">
//               {room.title}
//             </h2>
//             <p className="text-white text-sm sm:text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md px-4">
//               {room.description}
//             </p>
//             <Link
//               to={bookingUrl}
//               className="mt-8 inline-flex items-center justify-center bg-[#FAA821] px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Amenities Section - FIXED */}
//       <section className="bg-white px-4 py-14 sm:px-8 sm:py-20">
//         <div className="mx-auto max-w-5xl flex flex-col items-center gap-12">
//           <div className="w-full">
//             <p className="text-4xl sm:text-5xl font-semibold uppercase tracking-[0.28em] text-[#FAA821] mb-10 text-center">
//               Amenities
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
//               {room.amenities && room.amenities.length > 0 ? (
//                 room.amenities.map((amenity, index) => (
//                   <div key={`${amenity.label}-${index}`} className="flex flex-col items-center gap-4">
//                     <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
//                       <img
//                         src={`/${amenity.icon}`}
//                         alt={amenity.label}
//                         className="w-full h-full object-contain"
//                         onError={(e) => { 
//                           e.target.src = '/images/icons/fallback.png';
//                           e.target.onerror = null;
//                         }}
//                       />
//                     </div>
//                     <p className="text-stone-700 text-sm sm:text-lg text-center leading-snug tracking-wide">
//                       {amenity.label}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 // Fallback amenities if none exist
//                 defaultAmenities.map((amenity, index) => (
//                   <div key={`${amenity.label}-${index}`} className="flex flex-col items-center gap-4">
//                     <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
//                       <img
//                         src={`/${amenity.icon}`}
//                         alt={amenity.label}
//                         className="w-full h-full object-contain"
//                         onError={(e) => { 
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                     <p className="text-stone-700 text-sm sm:text-lg text-center leading-snug tracking-wide">
//                       {amenity.label}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           <Link
//             to={bookingUrl}
//             className="inline-flex items-center justify-center bg-[#FAA821] px-10 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
//           >
//             Book Now
//           </Link>
//         </div>
//       </section>

//       <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-10 text-center">
//             <p className="text-lg font-semibold uppercase tracking-[0.28em] text-[#FAA821]">Explore More</p>
//             <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">Other Accommodations</h2>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//             {allRooms
//               .filter((r) => r.slug !== room.slug)
//               .slice(0, 3)
//               .map((relatedRoom) => {
//                 const relatedRoomData = {
//                   id: relatedRoom.id,
//                   slug: relatedRoom.slug,
//                   title: relatedRoom.name,
//                   images: relatedRoom.first_image ? [{ url: relatedRoom.first_image, alt: relatedRoom.name }] : [],
//                   tagline: relatedRoom.meta_data?.tagline || "Luxury Stay",
//                   price: relatedRoom.meta_data?.price || "Contact for pricing",
//                   bookingRoomType: relatedRoom.slug
//                 };
                
//                 const maskStyle = {
//                   WebkitMaskImage: "url('/images/bg2.png')",
//                   maskImage:       "url('/images/bg2.png')",
//                   WebkitMaskSize:  '100% 100%',
//                   maskSize:        '100% 100%',
//                   WebkitMaskRepeat:'no-repeat',
//                   maskRepeat:      'no-repeat',
//                 }
                
//                 return (
//                   <Link key={relatedRoom.id} to={`/rooms/${relatedRoom.slug}`} className="group block">
//                     <div className="relative w-full aspect-[4/3]">
//                       <div
//                         className="absolute inset-0 w-full h-full transition duration-500 group-hover:scale-105"
//                         style={{ backgroundImage: `url('${imgurl}/${relatedRoom.first_image || '/images/placeholder.jpg'}')`, backgroundSize: 'cover', backgroundPosition: 'center', ...maskStyle }}
//                       />
//                       <div
//                         className="absolute inset-0 w-full h-full pointer-events-none"
//                         style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...maskStyle }}
//                       />
//                       <div className="absolute inset-x-0 bottom-0 p-5 z-10">
//                         <p className="text-[11px] uppercase tracking-[0.24em] text-[#FAA821]">{relatedRoomData.tagline}</p>
//                         <h3 className="mt-2 text-xl font-bold text-white">{relatedRoomData.title}</h3>
//                         <p className="mt-1 text-sm text-white/70">{relatedRoomData.price}</p>
//                         <Link
//                           to={getBookingUrl(relatedRoomData.bookingRoomType)}
//                           onClick={(e) => e.stopPropagation()}
//                           className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest text-[#FAA821] border border-[#FAA821] px-4 py-1.5 hover:bg-[#FAA821] hover:text-white transition"
//                         >
//                           Book Now
//                         </Link>
//                       </div>
//                     </div>
//                   </Link>
//                 )
//               })}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default RoomDetail


import React, { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import parse from 'html-react-parser'

gsap.registerPlugin(ScrollTrigger)

const getBookingUrl = (roomType) =>
  roomType ? `/booking?room-type=${roomType}` : '/booking'

// Default amenities data
const defaultAmenities = [
  { "icon": "images/icons/view.png", "label": "Ocean Views" },
  { "icon": "images/icons/bed.png", "label": "Private Beach" },
  { "icon": "images/icons/pool.png", "label": "Infinity Pool" },
  { "icon": "images/icons/size.png", "label": "Beachfront Spa" }
]

const RoomDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [allRooms, setAllRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const heroRef         = useRef(null)
  const textRef         = useRef(null)
  const contentSectionRef = useRef(null)
  const maskRef         = useRef(null)
  const contentRef      = useRef(null)
  const imgurl = import.meta.env.VITE_IMAGE_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/ourrooms/${slug}`
        );

        const foundRoom = response.data.data;

        setRoom({
          id: foundRoom.id,
          title: foundRoom.name,
          slug: foundRoom.slug,
          description: foundRoom.short_description || 'No description available.',
          longDescription: foundRoom.long_description || 'No details available.',
          images: foundRoom.images?.map(img => ({
            url: img.image,
            alt: foundRoom.name,
          })) || [],
          amenities: foundRoom.meta_data?.amenities || defaultAmenities,
          tagline: foundRoom.meta_data?.tagline || "Luxury Accommodation",
          price: foundRoom.price || "Contact for pricing",
          bookingRoomType: foundRoom.slug,
          is_featured: foundRoom.is_featured
        });

      } catch (error) {
        console.error(error);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch all rooms for related section
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ourrooms`);
        setAllRooms(response.data.data || []);
      } catch (error) {
        console.error('Error fetching all rooms:', error);
        setAllRooms([]);
      }
    };
    
    if (room) {
      fetchAllRooms();
    }
  }, [room]);

  useEffect(() => {
    if (!room) return;
    
    ScrollTrigger.getAll().forEach(t => t.kill())

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: isMobile ? 40 : 80, opacity: 0 },
        { y: 0, opacity: 1, duration: isMobile ? 0.6 : 1.2, ease: 'power2.out', delay: isMobile ? 0.1 : 0 }
      )

      gsap.set(contentSectionRef.current, { yPercent: 100 })

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: isMobile ? 0.3 : 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (contentSectionRef.current) {
            const progress = isMobile ? Math.min(1, self.progress * 1.2) : self.progress
            gsap.set(contentSectionRef.current, { yPercent: 100 - progress * 100 })
          }
        },
      })

      gsap.fromTo(
        maskRef.current,
        { scale: isMobile ? 1.1 : 1.2, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: isMobile ? 0.5 : 1.2,
          },
        }
      )

      if (contentRef.current?.children.length > 0) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: isMobile ? 30 : 60, scale: isMobile ? 0.98 : 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: isMobile ? 0.5 : 0.8,
            stagger: isMobile ? 0.08 : 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: isMobile ? 'top 70%' : 'top 60%',
              end:   isMobile ? 'top 40%' : 'top 30%',
              scrub: isMobile ? 0.3 : 0.5,
              once:  isMobile,
            },
          }
        )
      }
    }, heroRef)

    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [room, isMobile])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAA821]"></div>
          <p className="mt-4 text-stone-600">Loading room details...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <>
        <Helmet>
          <title>Room Not Found - Harness Zipline &amp; Adventure Resort</title>
          <link rel="canonical" href="https://www.theharnessnepal.com/rooms" />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center px-4 text-center text-stone-500">
          <div>
            <p className="text-xl">Room not found.</p>
            <button onClick={() => navigate('/rooms')} className="mt-4 text-[#FAA821] underline">
              Back to rooms
            </button>
          </div>
        </div>
      </>
    )
  }

  const heroImage   = room.images?.[0]?.url || '/images/room7.jpeg'
  const bookingUrl  = getBookingUrl(room.bookingRoomType)
  const canonicalUrl = `https://www.theharnessnepal.com/rooms/${room.slug}`
  const metaDescription = `${room.title} at Harness Zipline & Adventure Resort. ${room.description.substring(0, 150)} Book your stay today.`

  return (
    <>
      <Helmet>
        <title>{room.title} - Harness Zipline &amp; Adventure Resort | Luxury Accommodation</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={`${room.title}, ${room.tagline}, luxury rooms, adventure resort, harness accommodation`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title"       content={`${room.title} - Harness Zipline & Adventure Resort`} />
        <meta property="og:description" content={room.description.substring(0, 200)} />
        <meta property="og:image"       content={heroImage} />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:type"        content="website" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${room.title} - Harness Zipline & Adventure Resort`} />
        <meta name="twitter:description" content={room.description.substring(0, 200)} />
        <meta name="twitter:image"       content={heroImage} />
      </Helmet>

      <div
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black"
        style={{ zIndex: 1 }}
      >
        <img
          src={`${imgurl}/${heroImage}`}
          alt={room.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
          <div ref={textRef} className="text-center px-4">
            <p className="mb-3 text-lg font-semibold uppercase tracking-[0.3em] text-[#FAA821]">
              Accommodation
            </p>
            <h1 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold drop-shadow-lg">
              {room.title}
            </h1>
          </div>
        </div>

        <div
          ref={contentSectionRef}
          className="absolute inset-x-0 bottom-0 z-30 overflow-hidden"
          style={{ top: 'auto', minHeight: isMobile ? '85vh' : '70vh' }}
        >
          <div
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{ transformOrigin: 'center center' }}
          >
            <img src="/images/mask.svg" alt="" aria-hidden="true"
              className="w-full h-full object-cover object-top invert" />
          </div>

          <div
            ref={contentRef}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10 px-4 pb-16"
            style={{ paddingTop: isMobile ? '120px' : '208px' }}
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className="h-12 w-32"
                style={{
                  backgroundColor:    '#FAA821',
                  maskImage:          "url('/images/logo.png')",
                  WebkitMaskImage:    "url('/images/logo.png')",
                  maskSize:           'contain',
                  WebkitMaskSize:     'contain',
                  maskPosition:       'center',
                  WebkitMaskPosition: 'center',
                  maskRepeat:         'no-repeat',
                  WebkitMaskRepeat:   'no-repeat',
                }}
                role="img" aria-label="Harness logo"
              />
              <div className="text-center">
                <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
                <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-5xl font-bold leading-tight drop-shadow-2xl">
                  {room.title}
                </h2>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <div
                  className="w-full bg-cover bg-center"
                  style={{
                    backgroundImage:    `url(${imgurl}/${heroImage})`,
                    maskImage:          "url('/images/mask.png')",
                    WebkitMaskImage:    "url('/images/mask.png')",
                    maskSize:           'contain',
                    WebkitMaskSize:     'contain',
                    maskPosition:       'center',
                    WebkitMaskPosition: 'center',
                    maskRepeat:         'no-repeat',
                    WebkitMaskRepeat:   'no-repeat',
                    height:             isMobile ? '300px' : '480px',
                    filter:             'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',
                  }}
                />
              </div>

              <div className="flex flex-col justify-center text-left lg:w-1/2 gap-5">
                <p className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed">
                  {room.description}
                </p>
                <div className="text-black/90 text-base sm:text-xl tracking-wide leading-relaxed prose prose-lg max-w-none">
                  {parse(room.longDescription, {
                    replace: (node) => {
                      // Optional: Add custom styling for specific elements
                      if (node.name === 'a') {
                        node.attribs.class = `${node.attribs.class || ''} text-[#FAA821] hover:underline`.trim();
                      }
                      if (node.name === 'ul' || node.name === 'ol') {
                        node.attribs.class = `${node.attribs.class || ''} list-inside space-y-2`.trim();
                      }
                      if (node.name === 'li') {
                        node.attribs.class = `${node.attribs.class || ''} text-black/80`.trim();
                      }
                      if (node.name === 'h3') {
                        node.attribs.class = `${node.attribs.class || ''} text-xl font-semibold text-[#FAA821] mt-4 mb-2`.trim();
                      }
                    }
                  })}
                </div>
                <Link
                  to={bookingUrl}
                  className="self-start inline-flex items-center justify-center bg-[#FAA821] px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f] mt-2"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative w-full overflow-hidden">
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: isMobile ? '400px' : 'clamp(480px, 55vw, 800px)' }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage:    `url('${imgurl}/${heroImage}')`,
              backgroundSize:     'cover',
              backgroundPosition: 'center',
              WebkitMaskImage:    "url('/images/mask4.svg')",
              maskImage:          "url('/images/mask4.svg')",
              WebkitMaskSize:     '100% 100%',
              maskSize:           '100% 100%',
              WebkitMaskRepeat:   'no-repeat',
              maskRepeat:         'no-repeat',
            }}
          />
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundColor:  'rgba(0,0,0,0.45)',
              WebkitMaskImage:  "url('/images/mask4.svg')",
              maskImage:        "url('/images/mask4.svg')",
              WebkitMaskSize:   '100% 100%',
              maskSize:         '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat:       'no-repeat',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
            <h2 className="text-[#FAA821] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl mt-24 sm:mb-12">
              {room.title}
            </h2>
            <p className="text-white text-sm sm:text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md px-4">
              {room.description}
            </p>
            <Link
              to={bookingUrl}
              className="mt-8 inline-flex items-center justify-center bg-[#FAA821] px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section - FIXED */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-12">
          <div className="w-full">
            <p className="text-4xl sm:text-5xl font-semibold uppercase tracking-[0.28em] text-[#FAA821] mb-10 text-center">
              Amenities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {room.amenities && room.amenities.length > 0 ? (
                room.amenities.map((amenity, index) => (
                  <div key={`${amenity.label}-${index}`} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
                      <img
                        src={`/${amenity.icon}`}
                        alt={amenity.label}
                        className="w-full h-full object-contain"
                        onError={(e) => { 
                          e.target.src = '/images/icons/fallback.png';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <p className="text-stone-700 text-sm sm:text-lg text-center leading-snug tracking-wide">
                      {amenity.label}
                    </p>
                  </div>
                ))
              ) : (
                // Fallback amenities if none exist
                defaultAmenities.map((amenity, index) => (
                  <div key={`${amenity.label}-${index}`} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
                      <img
                        src={`/${amenity.icon}`}
                        alt={amenity.label}
                        className="w-full h-full object-contain"
                        onError={(e) => { 
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <p className="text-stone-700 text-sm sm:text-lg text-center leading-snug tracking-wide">
                      {amenity.label}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to={bookingUrl}
            className="inline-flex items-center justify-center bg-[#FAA821] px-10 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
          >
            Book Now
          </Link>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-lg font-semibold uppercase tracking-[0.28em] text-[#FAA821]">Explore More</p>
            <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">Other Accommodations</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allRooms
              .filter((r) => r.slug !== room.slug)
              .slice(0, 3)
              .map((relatedRoom) => {
                const relatedRoomData = {
                  id: relatedRoom.id,
                  slug: relatedRoom.slug,
                  title: relatedRoom.name,
                  images: relatedRoom.first_image ? [{ url: relatedRoom.first_image, alt: relatedRoom.name }] : [],
                  tagline: relatedRoom.meta_data?.tagline || "Luxury Stay",
                  price: relatedRoom.meta_data?.price || "Contact for pricing",
                  bookingRoomType: relatedRoom.slug
                };
                
                const maskStyle = {
                  WebkitMaskImage: "url('/images/bg2.png')",
                  maskImage:       "url('/images/bg2.png')",
                  WebkitMaskSize:  '100% 100%',
                  maskSize:        '100% 100%',
                  WebkitMaskRepeat:'no-repeat',
                  maskRepeat:      'no-repeat',
                }
                
                return (
                  <Link key={relatedRoom.id} to={`/rooms/${relatedRoom.slug}`} className="group block">
                    <div className="relative w-full aspect-[4/3]">
                      <div
                        className="absolute inset-0 w-full h-full transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${imgurl}/${relatedRoom.first_image || '/images/placeholder.jpg'}')`, backgroundSize: 'cover', backgroundPosition: 'center', ...maskStyle }}
                      />
                      <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...maskStyle }}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#FAA821]">{relatedRoomData.tagline}</p>
                        <h3 className="mt-2 text-xl font-bold text-white">{relatedRoomData.title}</h3>
                        <p className="mt-1 text-sm text-white/70">{relatedRoomData.price}</p>
                        <Link
                          to={getBookingUrl(relatedRoomData.bookingRoomType)}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest text-[#FAA821] border border-[#FAA821] px-4 py-1.5 hover:bg-[#FAA821] hover:text-white transition"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

export default RoomDetail