// import React from 'react'
// import roomData from '../data/roodata.json'

// // Shared mask style
// const maskStyle = {
//   WebkitMaskImage: `url('/images/bg4.png')`,
//   maskImage: `url('/images/bg4.png')`,
//   WebkitMaskSize: '100% 100%',
//   maskSize: '100% 100%',
//   WebkitMaskRepeat: 'no-repeat',
//   maskRepeat: 'no-repeat',
// }

// const VillaCard = ({ villa }) => {
//   const {
//     slug,
//     title,
//     description,
//     images,
//     imageLeft,
//     exploreHref,
//   } = villa

//   // First image
//   const image = images?.[0]?.url || '/images/placeholder.jpg'
//   const imageAlt = images?.[0]?.alt || title

//   return (
//     <div className="flex flex-col md:flex-row items-stretch py-10 md:py-14 gap-6 md:gap-0">

//       {/* ── Image Section ── */}
//       <div
//         className={`flex-shrink-0 w-full md:w-[44%] ${
//           imageLeft ? 'md:order-1' : 'md:order-2'
//         }`}
//       >
//         <a href={exploreHref} className="block">
//           <div className="relative w-full aspect-[4/3] group overflow-hidden">

//             {/* Background Image */}
//             <div
//               className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
//               style={{
//                 backgroundImage: `url('${image}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 ...maskStyle,
//               }}
//             />

//             {/* Overlay */}
//             <div
//               className="absolute inset-0 w-full h-full pointer-events-none"
//               style={{
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 ...maskStyle,
//               }}
//             />
//           </div>
//         </a>
//       </div>

//       {/* ── Content Section ── */}
//       <div
//         className={`
//           relative flex-1 flex flex-col justify-center
//           px-6 md:px-10 lg:px-14 py-6
//           ${imageLeft
//             ? 'md:order-2 items-start text-left'
//             : 'md:order-1 items-end text-right'
//           }
//         `}
//       >
//         <div className="relative z-10">

//           {/* Title */}
//           <h3 className="text-xl md:text-3xl tracking-[0.25em] uppercase text-stone-800 mb-4 leading-snug font-semibold">
//             {title}
//           </h3>

//           {/* Description */}
//           <p className="text-stone-600 text-md md:text-lg leading-relaxed max-w-2xl">
//             {description}
//           </p>

//           {/* Extra Info */}
//           <div
//             className={`mt-5 flex flex-wrap gap-4 text-sm uppercase tracking-wider text-stone-500 ${
//               imageLeft ? '' : 'justify-end'
//             }`}
//           >
//             <span>{villa.capacity}</span>
//             <span>{villa.beds}</span>
//             <span>{villa.size}</span>
//           </div>

//           {/* Explore Button */}
//           <div className={`mt-6 ${imageLeft ? '' : 'flex justify-end'}`}>
//             <a
//               href={exploreHref}
//               className="inline-flex items-center gap-1.5 text-base tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
//             >
//               Explore

//               <svg
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
//               >
//                 <path
//                   d="M3 8h10M9 4l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// const Roomlisting = () => {
//   return (
//     <section className="w-full bg-white py-10">

//       {/* Heading */}
//       <div className="text-center mb-10">
//         <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
//           Accommodation
//         </h2>

//         <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
//       </div>

//       {/* Room Cards */}
//       <div
//         style={{ maxWidth: '1100px' }}
//         className="mx-auto px-5 sm:px-8 md:px-10"
//       >
//         {roomData.rooms.map((villa, index) => (
//           <VillaCard
//             key={villa.id}
//             villa={{
//               ...villa,
//               imageLeft: index % 2 === 0, // Alternate layout automatically
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Roomlisting


// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// // Shared mask style
// const maskStyle = {
//   WebkitMaskImage: `url('/images/bg4.png')`,
//   maskImage: `url('/images/bg4.png')`,
//   WebkitMaskSize: '100% 100%',
//   maskSize: '100% 100%',
//   WebkitMaskRepeat: 'no-repeat',
//   maskRepeat: 'no-repeat',
// }

// const VillaCard = ({ villa, imageLeft }) => {
//   const {
//     slug,
//     title,
//     description,
//     images,
//     exploreHref,
//   } = villa

//   // First image
//   const image = images?.[0]?.url || '/images/placeholder.jpg'
//   const imageAlt = images?.[0]?.alt || title

//   return (
//     <div className="flex flex-col md:flex-row items-stretch py-10 md:py-14 gap-6 md:gap-0">

//       {/* ── Image Section ── */}
//       <div
//         className={`flex-shrink-0 w-full md:w-[44%] ${
//           imageLeft ? 'md:order-1' : 'md:order-2'
//         }`}
//       >
//         <Link to={exploreHref} className="block">
//           <div className="relative w-full aspect-[4/3] group overflow-hidden">

//             {/* Background Image */}
//             <div
//               className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
//               style={{
//                 backgroundImage: `url('${image}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 ...maskStyle,
//               }}
//             />

//             {/* Overlay */}
//             <div
//               className="absolute inset-0 w-full h-full pointer-events-none"
//               style={{
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 ...maskStyle,
//               }}
//             />
//           </div>
//         </Link>
//       </div>

//       {/* ── Content Section ── */}
//       <div
//         className={`
//           relative flex-1 flex flex-col justify-center
//           px-6 md:px-10 lg:px-14 py-6
//           ${imageLeft
//             ? 'md:order-2 items-start text-left'
//             : 'md:order-1 items-end text-right'
//           }
//         `}
//       >
//         <div className="relative z-10">

//           {/* Title */}
//           <h3 className="text-xl md:text-3xl tracking-[0.25em] uppercase text-stone-800 mb-4 leading-snug font-semibold">
//             {title}
//           </h3>

//           {/* Description */}
//           <p className="text-stone-600 text-md md:text-lg leading-relaxed max-w-2xl">
//             {description}
//           </p>

//           {/* Extra Info */}
//           <div
//             className={`mt-5 flex flex-wrap gap-4 text-sm uppercase tracking-wider text-stone-500 ${
//               imageLeft ? '' : 'justify-end'
//             }`}
//           >
//             {villa.capacity && <span>{villa.capacity}</span>}
//             {villa.beds && <span>{villa.beds}</span>}
//             {villa.size && <span>{villa.size}</span>}
//           </div>

//           {/* Explore Button */}
//           <div className={`mt-6 ${imageLeft ? '' : 'flex justify-end'}`}>
//             <Link
//               to={exploreHref}
//               className="inline-flex items-center gap-1.5 text-base tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
//             >
//               Explore

//               <svg
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
//               >
//                 <path
//                   d="M3 8h10M9 4l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </Link>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// const Roomlisting = () => {
//   const [rooms, setRooms] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/ourrooms');
//         const data = response.data.data;
//         // Filter only archived rooms
//         const archivedRooms = data.filter(room => room.is_archived === true);
        
//         // Transform API data to match expected format
//      const transformedRooms = archivedRooms.map(room => ({
//   id: room.id,
//   title: room.name,
//   slug: room.slug,

//   description: room.short_description || 'No description available.',
//   longDescription: room.long_description || 'No details available.',

//   images: room.images?.map(img => ({
//     url: img.image,
//     alt: room.name
//   })) || [],

//   capacity: room.meta_data?.capacity || "2 Adults",
//   beds: room.meta_data?.beds || "1 King Bed",
//   size: room.meta_data?.size || "350 sq ft",

//   amenities: room.meta_data?.amenities || [],
//   exploreHref: `/rooms/${room.slug}`,
//   is_featured: room.is_featured
// }));
        
//         setRooms(transformedRooms);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchRooms();
//   }, []);

//   if (loading) {
//     return (
//       <section className="w-full bg-white py-10">
//         <div className="text-center mb-10">
//           <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
//             Accommodation
//           </h2>
//           <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
//         </div>
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FAA821]"></div>
//             <p className="mt-4 text-stone-600">Loading accommodations...</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (rooms.length === 0) {
//     return (
//       <section className="w-full bg-white py-10">
//         <div className="text-center mb-10">
//           <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
//             Accommodation
//           </h2>
//           <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
//         </div>
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <p className="text-stone-500 text-lg">No accommodations available at this time.</p>
//             <p className="text-stone-400 mt-2">Please check back later for new listings.</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="w-full bg-white py-10">

//       {/* Heading */}
//       <div className="text-center mb-10">
//         <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
//           Accommodation
//         </h2>

//         <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
//       </div>

//       {/* Room Cards */}
//       <div
//         style={{ maxWidth: '1100px' }}
//         className="mx-auto px-5 sm:px-8 md:px-10"
//       >
//         {rooms.map((villa, index) => (
//           <VillaCard
//             key={villa.id}
//             villa={villa}
//             imageLeft={index % 2 === 0} // Alternate layout automatically
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Roomlisting

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const imgurl = import.meta.env.VITE_IMAGE_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shared mask style
const maskStyle = {
  WebkitMaskImage: `url('/images/bg4.png')`,
  maskImage: `url('/images/bg4.png')`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
}

const VillaCard = ({ villa, imageLeft }) => {
  const {
    slug,
    title,
    description,
    images,
    exploreHref,
  } = villa

  const image = images?.[0]?.url || '/images/placeholder.jpg'
  const imageAlt = images?.[0]?.alt || title

  return (
    <div className="flex flex-col md:flex-row items-stretch py-10 md:py-14 gap-6 md:gap-0">

      {/* ── Image Section ── */}
      <div
        className={`flex-shrink-0 w-full md:w-[44%] ${
          imageLeft ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <Link to={exploreHref} className="block">
          <div className="relative w-full aspect-[4/3] group overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...maskStyle,
              }}
            />
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                backgroundColor: 'rgba(0,0,0,0.35)',
                ...maskStyle,
              }}
            />
          </div>
        </Link>
      </div>

      {/* ── Content Section ── */}
      <div
        className={`
          relative flex-1 flex flex-col justify-center
          px-6 md:px-10 lg:px-14 py-6
          ${imageLeft
            ? 'md:order-2 items-start text-left'
            : 'md:order-1 items-end text-right'
          }
        `}
      >
        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl tracking-[0.25em] uppercase text-stone-800 mb-4 leading-snug font-semibold">
            {title}
          </h3>

          <p className="text-stone-600 text-md md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>

          <div
            className={`mt-5 flex flex-wrap gap-4 text-sm uppercase tracking-wider text-stone-500 ${
              imageLeft ? '' : 'justify-end'
            }`}
          >
            {villa.capacity && <span>{villa.capacity}</span>}
            {villa.beds && <span>{villa.beds}</span>}
            {villa.size && <span>{villa.size}</span>}
          </div>

          <div className={`mt-6 ${imageLeft ? '' : 'flex justify-end'}`}>
            <Link
              to={exploreHref}
              className="inline-flex items-center gap-1.5 text-base tracking-[0.22em] uppercase font-semibold text-stone-600 border-b border-stone-400 pb-px hover:text-stone-900 hover:border-stone-700 transition-colors duration-200 group"
            >
              Explore
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const Roomlisting = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ourrooms`)
        const data = response.data.data

        // Show only archived rooms
        const archivedRooms = data.filter(room => room.is_archived === true)

        const transformedRooms = archivedRooms.map(room => ({
          id: room.id,
          title: room.name,
          slug: room.slug,
          description: room.short_description || 'No description available.',
          longDescription: room.long_description || 'No details available.',

          // Prepend BASE_URL so relative paths like /rooms/xyz.jpg become full URLs
          images: room.images?.map(img => ({
            url: img.image.startsWith('http') ? img.image : `${imgurl}/${img.image}`,
            alt: room.name,
          })) || [],

          capacity: room.meta_data?.capacity || null,
          beds: room.meta_data?.beds || null,
          size: room.meta_data?.size || null,
          amenities: room.meta_data?.amenities || [],
          exploreHref: `/rooms/${room.slug}`,
          is_featured: room.is_featured,
        }))

        setRooms(transformedRooms)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  console.log('Rooms:', rooms)

  if (loading) {
    return (
      <section className="w-full bg-white py-10">
        <div className="text-center mb-10">
          <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Accommodation
          </h2>
          <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#FAA821]"></div>
            <p className="mt-4 text-stone-600">Loading accommodations...</p>
          </div>
        </div>
      </section>
    )
  }

  if (rooms.length === 0) {
    return (
      <section className="w-full bg-white py-10">
        <div className="text-center mb-10">
          <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Accommodation
          </h2>
          <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-stone-500 text-lg">No accommodations available at this time.</p>
            <p className="text-stone-400 mt-2">Please check back later for new listings.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white py-10">
      <div className="text-center mb-10">
        <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Accommodation
        </h2>
        <div className="w-10 h-px bg-[#FAA821] mt-3 mx-auto" />
      </div>

      <div
        style={{ maxWidth: '1100px' }}
        className="mx-auto px-5 sm:px-8 md:px-10"
      >
        {rooms.map((villa, index) => (
          <VillaCard
            key={villa.id}
            villa={villa}
            imageLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  )
}

export default Roomlisting