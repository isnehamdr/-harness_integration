// import React, { useEffect } from "react";
// import { Helmet } from 'react-helmet-async'

// // Banner Component
// const Banner = () => {
//     return (
//         <div className="w-full relative">
//             <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[90vh]">
//                 <img 
//                     className="w-full h-full object-cover" 
//                     src="images/bunk2.jpeg" 
//                     alt="Harness Nepal Zipline Resort & Adventure booking banner" 
//                 />
//                 <div className="absolute inset-0 bg-black/40"></div>
                
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
//                     <h2 className="text-4xl md:text-5xl lg:text-[100px] mb-4 font-bold">
//                         Book Now
//                     </h2>
//                     <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">
// Harness Nepal Zipline Resort & Adventure                    </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Booking Engine Script Component
// const BookingEngineScript = () => {
//     useEffect(() => {
//         document.querySelectorAll('script[data-booking-engine]').forEach(s => s.remove());
//         document.querySelectorAll('#be-booking-form, #be-search-form').forEach(c => c.innerHTML = '');

//         const scriptContent = `
//             !function(e,n){
//                 var t="bookingengine",o
//                 ="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
//                 if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
//                 !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
//                 a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
//                 ["np-ibe.hopenapi.com","ibe.hopenapi.com","ibe.behopenapi.com"])}}(window, [
//                          ["setContext", "BE-INT-theharnessnepal-com_2026-05-21", "en"],
//             ["embed", "booking-form", {
//                     container: "be-booking-form"
//             }],
//             ["embed", "search-form", {
//                     container: "be-search-form"
//             }]
//                 ]);
//         `;

//         const script = document.createElement("script");
//         script.type = "text/javascript";
//         script.async = true;
//         script.setAttribute("data-booking-engine", "true");
//         script.textContent = scriptContent.trim();
//         document.body.appendChild(script);

//         return () => {
//             if (script.parentNode) script.parentNode.removeChild(script);
//         };
//     }, []);

//     return (
//         <div className="w-full min-h-screen bg-gray-50 py-12">
//             <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
//                 <div className="flex flex-col items-center justify-center">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//                             Select Your Room
//                         </h2>
//                         <p className="text-lg text-gray-600 max-w-2xl">
//                             Choose from our luxurious rooms and suites with stunning mountain views
//                         </p>
//                     </div>
                    
//                     <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//                         <div id="be-booking-form" className="w-full"></div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// // Main Booking Page
// const Booking = () => {
//     useEffect(() => {
//         document.title = "Book Now | Harness Nepal Zipline Resort & Adventure";
//     }, []);

//     return (
//         <>
//             <Helmet>
// <title>Book Now | Harness Nepal Zipline Resort & Adventure</title>
//                 <meta name="description" content="Book your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal. Explore premium rooms, direct reservations, and comfortable hospitality." />
//                 <meta name="keywords" content="Harness Nepal Zipline Resort & Adventure, Yellow Pagoda Pokhara, hotel booking Pokhara, Pokhara hotel reservation, luxury hotel Pokhara, premium rooms Pokhara, Nepal hotel booking" />
                
//                 {/* SINGLE Canonical */}
//                 <link rel="canonical" href="https://hotelyellowpagoda.com/booking" />
                
//                 {/* Open Graph / Facebook */}
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://hotelyellowpagoda.com/booking" />
//                 <meta property="og:title" content="Book Now | Harness Nepal Zipline Resort & Adventure" />
//                 <meta property="og:description" content="Reserve your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal. Enjoy premium accommodation and direct booking convenience." />
//                 <meta property="og:image" content="https://hotelyellowpagoda.com/images/logo.png" />

//                 {/* Twitter */}
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Book Now | Harness Nepal Zipline Resort & Adventure" />
//                 <meta name="twitter:description" content="Reserve your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal. Enjoy premium accommodation and direct booking convenience." />
//                 <meta name="twitter:image" content="https://hotelyellowpagoda.com/images/logo.png" />

//                 {/* JSON-LD Structured Data */}
//                 <script type="application/ld+json">
//                     {JSON.stringify({
//                         "@context": "https://schema.org",
//                         "@type": "WebPage",
//                         "name": "Book Now | Harness Nepal Zipline Resort & Adventure",
//                         "description": "Book your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal",
//                         "url": "https://hotelyellowpagoda.com/booking",
//                         "image": "https://hotelyellowpagoda.com/images/logo.png",
//                         "mainEntity": {
//                             "@type": "Hotel",
//                             "name": "Harness Nepal Zipline Resort & Adventure",
//                             "description": "Hotel offering premium accommodations and hospitality in Pokhara, Nepal",
//                            "address": {
//   "@type": "PostalAddress",
//   "streetAddress": "7 Besisahar - Chame Sadak, Besisahar 3",
//   "addressLocality": "Lamjung",
//   "addressRegion": "Gandaki Province",
//   "postalCode": "3600",
//   "addressCountry": "NP"
// },
//                             "amenities": [
//                                 "Fine Dining Restaurant",
//                                 "Event Venue",
//                                 "Luxury Accommodation",
//                                 "Mountain Views",
//                                 "Premium Service"
//                             ],
//                             "makesOffer": {
//                                 "@type": "Offer",
//                                 "availability": "https://schema.org/InStock",
//                                 "priceCurrency": "NPR",
//                                 "description": "Luxury room bookings available"
//                             }
//                         },
//                         "potentialAction": {
//                             "@type": "ReserveAction",
//                             "target": "https://hotelyellowpagoda.com/booking",
//                             "description": "Book your stay at Harness Nepal Zipline Resort & Adventure"
//                         }
//                     })}
//                 </script>
//             </Helmet>
            
//             <div className="w-full overflow-hidden">
//                 <Banner />
//                 <BookingEngineScript />
//             </div>
//         </>
//     );
// };

// export default Booking;



import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// ── Banner ─────────────────────────────────────────────────────────────────
const Banner = () => (
  <div className="w-full relative">
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[90vh]">
      <img
        className="w-full h-full object-cover"
        src="images/bunk2.jpeg"
        alt="Harness Nepal Zipline Resort & Adventure booking banner"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-[100px] mb-4 font-bold">
          Book Now
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">
          Harness Nepal Zipline Resort &amp; Adventure
        </p>
      </div>
    </div>
  </div>
)

// ── Booking engine + room selection ───────────────────────────────────────
const BookingSection = () => {
  // Read ?room-type=XXXXXXX from the URL if present
  const { search } = useLocation()
  const roomType = new URLSearchParams(search).get('room-type')

  useEffect(() => {
    // Clean up any previous instance so re-navigation / HMR is safe
    document.querySelectorAll('script[data-booking-engine]').forEach(s => s.remove())
    document.querySelectorAll('#be-booking-form, #be-search-form').forEach(el => (el.innerHTML = ''))
    if (window.bookingengine) delete window.bookingengine

    // Build the embed command: pre-select room if a room-type param was supplied
    const embedOptions = roomType
      ? { container: 'be-booking-form', roomType }
      : { container: 'be-booking-form' }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.setAttribute('data-booking-engine', 'true')
    script.textContent = `
      !function(e,n){
        var t="bookingengine",o="integration",i=e[t]=e[t]||{},
            a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
        if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){
          a[c]=!0;
          var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
          !function n(i){
            if(0!==i.length){
              var a=l.createElement("script");
              a.type="text/javascript";a.async=!0;
              a.src="https://"+i[0]+"/integration/loader.js";
              a.onerror=a.onload=function(n,i){return function(){
                e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())
              }}(a,(function(){n(i.slice(1,i.length))}));
              g.appendChild(a);
            }
          }(["np-ibe.hopenapi.com","ibe.hopenapi.com","ibe.behopenapi.com"]);
        }
      }(window, [
        ["setContext", "BE-INT-theharnessnepal-com_2026-05-21", "en"],
        ["embed", "booking-form", ${JSON.stringify(embedOptions)}],
        ["embed", "search-form",  { "container": "be-search-form" }]
      ]);
    `
    document.body.appendChild(script)

    return () => {
      script.parentNode?.removeChild(script)
      if (window.bookingengine) delete window.bookingengine
    }
  }, [roomType]) // re-run if the room-type param changes

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {roomType ? 'Complete Your Booking' : 'Select Your Room'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {roomType
                ? 'Confirm your dates and details below to secure your stay.'
                : 'Choose from our rooms and suites with stunning mountain views.'}
            </p>
          </div>

          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div id="be-booking-form" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
const Booking = () => (
  <>
    <Helmet>
      <title>Book Now | Harness Nepal Zipline Resort &amp; Adventure</title>
      <meta name="description" content="Book your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal. Explore premium rooms, direct reservations, and comfortable hospitality." />
      <meta name="keywords" content="Harness Nepal Zipline Resort, hotel booking Pokhara, Pokhara hotel reservation, luxury hotel Nepal" />
      <link rel="canonical" href="https://www.theharnessnepal.com/booking" />
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content="https://www.theharnessnepal.com/booking" />
      <meta property="og:title"       content="Book Now | Harness Nepal Zipline Resort & Adventure" />
      <meta property="og:description" content="Reserve your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal." />
      <meta property="og:image"       content="https://www.theharnessnepal.com/images/logo.png" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content="Book Now | Harness Nepal Zipline Resort & Adventure" />
      <meta name="twitter:description" content="Reserve your stay at Harness Nepal Zipline Resort & Adventure in Pokhara, Nepal." />
      <meta name="twitter:image"       content="https://www.theharnessnepal.com/images/logo.png" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Book Now | Harness Nepal Zipline Resort & Adventure',
          url: 'https://www.theharnessnepal.com/booking',
          mainEntity: {
            '@type': 'Hotel',
            name: 'Harness Nepal Zipline Resort & Adventure',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '7 Besisahar - Chame Sadak, Besisahar 3',
              addressLocality: 'Lamjung',
              addressRegion: 'Gandaki Province',
              postalCode: '3600',
              addressCountry: 'NP',
            },
          },
        })}
      </script>
    </Helmet>

    <div className="w-full overflow-hidden">
      <Banner />
      <BookingSection />
    </div>
  </>
)

export default Booking