
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import roomsData from '../data/roodata.json'

// const Roomlayouts = () => {
//   const navigate = useNavigate()

//   // Add error handling and validation
//   const [rooms, setRooms] = useState([])
//   const [sliderStates, setSliderStates] = useState({})

//   useEffect(() => {
//     // Validate and set rooms data
//     if (roomsData && roomsData.rooms && Array.isArray(roomsData.rooms)) {
//       setRooms(roomsData.rooms)
      
//       // Initialize slider states
//       const initialState = {}
//       roomsData.rooms.forEach(room => {
//         if (room.images && room.images.length > 0) {
//           initialState[room.id] = 0
//         }
//       })
//       setSliderStates(initialState)
//     }
//   }, [])

//   const nextSlide = (roomId, imagesLength) => {
//     if (!imagesLength) return
//     setSliderStates(prev => ({ 
//       ...prev, 
//       [roomId]: (prev[roomId] + 1) % imagesLength 
//     }))
//   }

//   const prevSlide = (roomId, imagesLength) => {
//     if (!imagesLength) return
//     setSliderStates(prev => ({ 
//       ...prev, 
//       [roomId]: (prev[roomId] - 1 + imagesLength) % imagesLength 
//     }))
//   }

//   const carouselMaskStyle = {
//     WebkitMaskImage: `url('/images/mask4.svg')`,
//     maskImage: `url('/images/mask4.svg')`,
//     WebkitMaskSize: '100% 100%',
//     maskSize: '100% 100%',
//     WebkitMaskRepeat: 'no-repeat',
//     maskRepeat: 'no-repeat',
//   }

//   const villaCardMaskStyle = {
//     WebkitMaskImage: `url('/images/bg1.png')`,
//     maskImage: `url('/images/bg1.png')`,
//     WebkitMaskSize: '100% 100%',
//     maskSize: '100% 100%',
//     WebkitMaskRepeat: 'no-repeat',
//     maskRepeat: 'no-repeat',
//   }

//   // Carousel Slider Component
//   const CarouselSlider = ({ room }) => {
//     // Safety check
//     if (!room.images || room.images.length === 0) {
//       return (
//         <div className="relative w-full bg-gray-200" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-gray-500">No images available</p>
//           </div>
//         </div>
//       )
//     }

//     const currentImage = room.images[sliderStates[room.id]] || room.images[0]

//     return (
//       <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
//         <img
//           src={currentImage.url}
//           alt={currentImage.alt || room.title}
//           className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
//           style={carouselMaskStyle}
//         />
//         <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...carouselMaskStyle }} />

//         {/* Left Arrow - made more touch-friendly for mobile */}
//         <button
//           onClick={() => prevSlide(room.id, room.images.length)}
//           className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
//           aria-label="Previous image"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>

//         {/* Right Arrow */}
//         <button
//           onClick={() => nextSlide(room.id, room.images.length)}
//           className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
//           aria-label="Next image"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </button>

//         {/* Image counter indicator - helpful for mobile */}
//         {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 text-white px-2 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm">
//           {sliderStates[room.id] + 1} / {room.images.length}
//         </div> */}
//       </div>
//     )
//   }

//   // Villa Card Component
//   const VillaCard = ({ room }) => {
//     const imageUrl = room.images && room.images[0]?.url ? room.images[0].url : '/images/fallback.jpg'

//     const handleExplore = (e) => {
//       e.preventDefault()
//       if (room.slug) {
//         navigate(`/rooms/${room.slug}`)
//       }
//     }

//     return (
//       <div className="flex flex-col md:flex-row items-stretch py-6 sm:py-8 md:py-10 lg:pb-14 gap-6 md:gap-0 px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24">
//         {/* Photo column */}
//         <div className={`w-full md:w-[44%] flex-shrink-0 ${room.imageLeft ? 'md:order-1' : 'md:order-2'} mb-4 md:mb-0`}>
//           <button onClick={handleExplore} className="block w-full text-left group">
//             <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
//               <img
//                 src={imageUrl}
//                 alt={room.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 style={villaCardMaskStyle}
//               />
//               <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 group-hover:bg-black/20" style={{ backgroundColor: 'rgba(0,0,0,0.15)', ...villaCardMaskStyle }} />
//             </div>
//           </button>
//         </div>

//         {/* Text column */}
//         <div className={`relative flex-1 flex flex-col justify-center min-h-[200px] sm:min-h-[240px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 ${room.imageLeft ? 'md:order-2 items-start text-left' : 'md:order-1 items-end text-right'}`}>
//           {/* Background decorative image */}
//           {room.bgImage && (
//             <div 
//               className="absolute bottom-0 inset-x-0 h-full pointer-events-none select-none opacity-50 sm:opacity-70 md:opacity-85" 
//               aria-hidden="true" 
//               style={{ 
//                 backgroundImage: `url('${room.bgImage}')`, 
//                 backgroundRepeat: 'no-repeat', 
//                 backgroundPosition: room.imageLeft ? 'bottom right' : 'bottom left', 
//                 backgroundSize: 'auto 40% sm:auto 50% md:auto 60%',
//               }} 
//             />
//           )}

//           <div className="relative z-10 w-full">
        

//             <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-3xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-800 mb-2 sm:mb-3 md:mb-4 leading-snug font-semibold">
//               {room.title}
//             </h3>

//             <p className="text-stone-600 text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed font-normal max-w-xl">
//               {room.description}
//             </p>

           

//             <div className={`mt-4 sm:mt-5 md:mt-6 ${room.imageLeft ? '' : 'flex justify-end'}`}>
//               <button
//                 onClick={handleExplore}
//                 className="inline-flex items-center cursor-pointer gap-1.5 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
//               >
//                 Explore
//                 <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform duration-200">
//                   <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Loading state
//   if (rooms.length === 0) {
//     return (
//       <div className="w-full min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FAA821]"></div>
//           <p className="mt-4 text-stone-600">Loading accommodations...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full overflow-x-hidden">
//       {rooms.map((room, index) => (
//         <React.Fragment key={room.id}>
//           <CarouselSlider room={room} />
//           <VillaCard room={room} />
//           {/* Add subtle divider between rooms except after last */}
//           {index < rooms.length - 1 && (
//             <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6 md:my-8">
//               <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
//             </div>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   )
// }

// export default Roomlayouts

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Roomlayouts = ({ rooms: propRooms }) => {
//   const navigate = useNavigate()
//   const [rooms, setRooms] = useState([])
//   const [sliderStates, setSliderStates] = useState({})

//   useEffect(() => {
//     // Transform the API data to match the expected format
//     if (propRooms && propRooms.length > 0) {
//       const transformedRooms = propRooms.map(room => ({
//         id: room.id,
//         title: room.name,
//         slug: room.slug,
//         description: room.meta_data?.description || `${room.name} - Experience luxury and comfort at Harness Zipline & Adventure Resort.`,
//         longDescription: room.meta_data?.long_description || `Our ${room.name} offer the perfect blend of comfort and adventure.`,
//         images: room.first_image ? [{ url: room.first_image, alt: room.name }] : [],
//         amenities: room.meta_data?.amenities || [],
//         imageLeft: false,
//         bookingRoomType: room.slug,
//         bgImage: room.meta_data?.bgImage || null,
//         capacity: room.meta_data?.capacity || "2 Guests",
//         beds: room.meta_data?.beds || "1 Bed",
//         size: room.meta_data?.size || "300 sq ft"
//       }))
//       setRooms(transformedRooms)
      
//       // Initialize slider states
//       const initialState = {}
//       transformedRooms.forEach(room => {
//         if (room.images && room.images.length > 0) {
//           initialState[room.id] = 0
//         }
//       })
//       setSliderStates(initialState)
//     }
//   }, [propRooms])

//   const nextSlide = (roomId, imagesLength) => {
//     if (!imagesLength) return
//     setSliderStates(prev => ({ 
//       ...prev, 
//       [roomId]: (prev[roomId] + 1) % imagesLength 
//     }))
//   }

//   const prevSlide = (roomId, imagesLength) => {
//     if (!imagesLength) return
//     setSliderStates(prev => ({ 
//       ...prev, 
//       [roomId]: (prev[roomId] - 1 + imagesLength) % imagesLength 
//     }))
//   }

//   const carouselMaskStyle = {
//     WebkitMaskImage: `url('/images/mask4.svg')`,
//     maskImage: `url('/images/mask4.svg')`,
//     WebkitMaskSize: '100% 100%',
//     maskSize: '100% 100%',
//     WebkitMaskRepeat: 'no-repeat',
//     maskRepeat: 'no-repeat',
//   }

//   const villaCardMaskStyle = {
//     WebkitMaskImage: `url('/images/bg1.png')`,
//     maskImage: `url('/images/bg1.png')`,
//     WebkitMaskSize: '100% 100%',
//     maskSize: '100% 100%',
//     WebkitMaskRepeat: 'no-repeat',
//     maskRepeat: 'no-repeat',
//   }

//   // Carousel Slider Component
//   const CarouselSlider = ({ room }) => {
//     if (!room.images || room.images.length === 0) {
//       return (
//         <div className="relative w-full bg-gray-200" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-gray-500">No images available</p>
//           </div>
//         </div>
//       )
//     }

//     const currentImage = room.images[sliderStates[room.id]] || room.images[0]

//     return (
//       <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
//         <img
//           src={currentImage.url}
//           alt={currentImage.alt || room.title}
//           className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
//           style={carouselMaskStyle}
//         />
//         <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...carouselMaskStyle }} />

//         <button
//           onClick={() => prevSlide(room.id, room.images.length)}
//           className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
//           aria-label="Previous image"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>

//         <button
//           onClick={() => nextSlide(room.id, room.images.length)}
//           className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
//           aria-label="Next image"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </button>
//       </div>
//     )
//   }

//   // Villa Card Component
//   const VillaCard = ({ room, index }) => {
//     const imageUrl = room.images && room.images[0]?.url ? room.images[0].url : '/images/fallback.jpg'
//     const imageLeft = index % 2 === 0

//     const handleExplore = (e) => {
//       e.preventDefault()
//       if (room.slug) {
//         navigate(`/rooms/${room.slug}`)
//       }
//     }

//     return (
//       <div className="flex flex-col md:flex-row items-stretch py-6 sm:py-8 md:py-10 lg:pb-14 gap-6 md:gap-0 px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24">
//         <div className={`w-full md:w-[44%] flex-shrink-0 ${imageLeft ? 'md:order-1' : 'md:order-2'} mb-4 md:mb-0`}>
//           <button onClick={handleExplore} className="block w-full text-left group">
//             <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
//               <img
//                 src={imageUrl}
//                 alt={room.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 style={villaCardMaskStyle}
//               />
//               <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 group-hover:bg-black/20" style={{ backgroundColor: 'rgba(0,0,0,0.15)', ...villaCardMaskStyle }} />
//             </div>
//           </button>
//         </div>

//         <div className={`relative flex-1 flex flex-col justify-center min-h-[200px] sm:min-h-[240px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 ${imageLeft ? 'md:order-2 items-start text-left' : 'md:order-1 items-end text-right'}`}>
//           {room.bgImage && (
//             <div 
//               className="absolute bottom-0 inset-x-0 h-full pointer-events-none select-none opacity-50 sm:opacity-70 md:opacity-85" 
//               aria-hidden="true" 
//               style={{ 
//                 backgroundImage: `url('${room.bgImage}')`, 
//                 backgroundRepeat: 'no-repeat', 
//                 backgroundPosition: imageLeft ? 'bottom right' : 'bottom left', 
//                 backgroundSize: 'auto 40% sm:auto 50% md:auto 60%',
//               }} 
//             />
//           )}

//           <div className="relative z-10 w-full">
//             <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-3xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-800 mb-2 sm:mb-3 md:mb-4 leading-snug font-semibold">
//               {room.title}
//             </h3>

//             <p className="text-stone-600 text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed font-normal max-w-xl">
//               {room.description}
//             </p>

//             <div className={`mt-4 sm:mt-5 md:mt-6 ${imageLeft ? '' : 'flex justify-end'}`}>
//               <button
//                 onClick={handleExplore}
//                 className="inline-flex items-center cursor-pointer gap-1.5 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
//               >
//                 Explore
//                 <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform duration-200">
//                   <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!propRooms || propRooms.length === 0) {
//     return (
//       <div className="w-full min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FAA821]"></div>
//           <p className="mt-4 text-stone-600">Loading accommodations...</p>
//         </div>
//       </div>
//     )
//   }

//   if (rooms.length === 0 && propRooms.length === 0) {
//     return (
//       <div className="w-full min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-stone-500">No accommodations available at this time.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full overflow-x-hidden">
//       {rooms.map((room, index) => (
//         <React.Fragment key={room.id}>
//           <CarouselSlider room={room} />
//           <VillaCard room={room} index={index} />
//           {index < rooms.length - 1 && (
//             <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6 md:my-8">
//               <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
//             </div>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   )
// }

// export default Roomlayouts
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://127.0.0.1:8000'

const Roomlayouts = ({ rooms: propRooms }) => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [sliderStates, setSliderStates] = useState({})

  useEffect(() => {
    if (propRooms && propRooms.length > 0) {
      // Filter only archived rooms before transforming
      const archivedRooms = propRooms.filter(room => room.is_archived === true)

      const transformedRooms = archivedRooms.map(room => {
        // Resolve first_image URL
        const firstImageUrl = room.first_image
          ? (room.first_image.startsWith('http') ? room.first_image : `${BASE_URL}${room.first_image}`)
          : null

        // Resolve all images
        const images = room.images?.map(img => ({
          url: img.image.startsWith('http') ? img.image : `${BASE_URL}${img.image}`,
          alt: room.name,
        })) || (firstImageUrl ? [{ url: firstImageUrl, alt: room.name }] : [])

        return {
          id: room.id,
          title: room.name,
          slug: room.slug,
          description: room.meta_data?.description || room.short_description || `${room.name} - Experience luxury and comfort at Harness Zipline & Adventure Resort.`,
          longDescription: room.meta_data?.long_description || room.long_description || `Our ${room.name} offer the perfect blend of comfort and adventure.`,
          images,
          amenities: room.meta_data?.amenities || [],
          imageLeft: false,
          bookingRoomType: room.slug,
          bgImage: room.meta_data?.bgImage || null,
          capacity: room.meta_data?.capacity || "2 Guests",
          beds: room.meta_data?.beds || "1 Bed",
          size: room.meta_data?.size || "300 sq ft",
        }
      })

      setRooms(transformedRooms)

      const initialState = {}
      transformedRooms.forEach(room => {
        initialState[room.id] = 0
      })
      setSliderStates(initialState)
    }
  }, [propRooms])

  const nextSlide = (roomId, imagesLength) => {
    if (!imagesLength) return
    setSliderStates(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % imagesLength,
    }))
  }

  const prevSlide = (roomId, imagesLength) => {
    if (!imagesLength) return
    setSliderStates(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + imagesLength) % imagesLength,
    }))
  }

  const carouselMaskStyle = {
    WebkitMaskImage: `url('/images/mask4.svg')`,
    maskImage: `url('/images/mask4.svg')`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }

  const villaCardMaskStyle = {
    WebkitMaskImage: `url('/images/bg1.png')`,
    maskImage: `url('/images/bg1.png')`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }

  const CarouselSlider = ({ room }) => {
    if (!room.images || room.images.length === 0) {
      return (
        <div className="relative w-full bg-gray-200" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      )
    }

    const currentIndex = sliderStates[room.id] ?? 0
    const currentImage = room.images[currentIndex] || room.images[0]

    return (
      <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(280px, 55vw, 900px)' }}>
        <img
          src={currentImage.url}
          alt={currentImage.alt || room.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={carouselMaskStyle}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...carouselMaskStyle }}
        />

        <button
          onClick={() => prevSlide(room.id, room.images.length)}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={() => nextSlide(room.id, room.images.length)}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FAA821] group min-w-[32px] min-h-[32px]"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    )
  }

  const VillaCard = ({ room, index }) => {
    const imageUrl = room.images?.[0]?.url || '/images/fallback.jpg'
    const imageLeft = index % 2 === 0

    const handleExplore = (e) => {
      e.preventDefault()
      if (room.slug) {
        navigate(`/rooms/${room.slug}`)
      }
    }

    return (
      <div className="flex flex-col md:flex-row items-stretch py-6 sm:py-8 md:py-10 lg:pb-14 gap-6 md:gap-0 px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24">
        <div className={`w-full md:w-[44%] flex-shrink-0 ${imageLeft ? 'md:order-1' : 'md:order-2'} mb-4 md:mb-0`}>
          <button onClick={handleExplore} className="block w-full text-left group">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={imageUrl}
                alt={room.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={villaCardMaskStyle}
              />
              <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 group-hover:bg-black/20"
                style={{ backgroundColor: 'rgba(0,0,0,0.15)', ...villaCardMaskStyle }}
              />
            </div>
          </button>
        </div>

        <div className={`relative flex-1 flex flex-col justify-center min-h-[200px] sm:min-h-[240px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 ${imageLeft ? 'md:order-2 items-start text-left' : 'md:order-1 items-end text-right'}`}>
          {room.bgImage && (
            <div
              className="absolute bottom-0 inset-x-0 h-full pointer-events-none select-none opacity-50 sm:opacity-70 md:opacity-85"
              aria-hidden="true"
              style={{
                backgroundImage: `url('${room.bgImage}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: imageLeft ? 'bottom right' : 'bottom left',
                backgroundSize: 'auto 40% sm:auto 50% md:auto 60%',
              }}
            />
          )}

          <div className="relative z-10 w-full">
            <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-3xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-800 mb-2 sm:mb-3 md:mb-4 leading-snug font-semibold">
              {room.title}
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed font-normal max-w-xl">
              {room.description}
            </p>

            <div className={`mt-4 sm:mt-5 md:mt-6 ${imageLeft ? '' : 'flex justify-end'}`}>
              <button
                onClick={handleExplore}
                className="inline-flex items-center cursor-pointer gap-1.5 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
              >
                Explore
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loader if propRooms hasn't arrived yet
  if (!propRooms || propRooms.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FAA821]"></div>
          <p className="mt-4 text-stone-600">Loading accommodations...</p>
        </div>
      </div>
    )
  }

  // propRooms arrived but none are archived
  if (rooms.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500">No accommodations available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      {rooms.map((room, index) => (
        <React.Fragment key={room.id}>
          <CarouselSlider room={room} />
          <VillaCard room={room} index={index} />
          {index < rooms.length - 1 && (
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6 md:my-8">
              <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Roomlayouts