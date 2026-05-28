// import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// const contactCards = [
//   {
//     title: 'Visit Us',
//     value: 'Kusma, Nepal, 33400',
//     description: 'A scenic destination for stays, dining, and memorable events.',
//   },
//   {
//     title: 'Call Us',
//     value: '067-422112',
//     description: 'Reach out for reservations, event planning, or quick inquiries.',
//   },
//   {
//     title: 'Email Us',
//     value: 'theharnessnepal@gmail.com',
//     description: 'Share your travel dates, event ideas, or special requirements.',
//   },
// ]

// const ContactPage = () => {
//   const heroRef = useRef(null)
//   const textRef = useRef(null)
//   const contentSectionRef = useRef(null)
//   const maskRef = useRef(null)
//   const contentRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero Text Animation
//       gsap.fromTo(
//         textRef.current,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: 'power3.out',
//         }
//       )

//       // Slide-up section animation
//       if (contentSectionRef.current) {
//         gsap.set(contentSectionRef.current, {
//           yPercent: 100,
//         })

//         ScrollTrigger.create({
//           trigger: heroRef.current,
//           start: 'top top',
//           end: 'bottom top',
//           scrub: 0.6,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           onUpdate: (self) => {
//             gsap.set(contentSectionRef.current, {
//               yPercent: 100 - self.progress * 100,
//             })
//           },
//         })
//       }

//       // Mask animation
//       if (maskRef.current) {
//         gsap.fromTo(
//           maskRef.current,
//           {
//             scale: 1.15,
//             opacity: 0,
//           },
//           {
//             scale: 1,
//             opacity: 1,
//             duration: 1.2,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: heroRef.current,
//               start: 'top center',
//               end: 'bottom center',
//               scrub: 0.8,
//             },
//           }
//         )
//       }

//       // Content reveal
//       if (contentRef.current?.children?.length) {
//         gsap.fromTo(
//           contentRef.current.children,
//           {
//             opacity: 0,
//             y: 30,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             stagger: 0.1,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: contentRef.current,
//               start: 'top 85%',
//             },
//           }
//         )
//       }
//     })

//     return () => {
//       ctx.revert()
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//     }
//   }, [])

//   return (
//     <div className="overflow-x-hidden bg-[#f8f5ef]">
//       {/* HERO SECTION */}
//       <div
//         ref={heroRef}
//         className="relative w-full h-screen overflow-hidden"
//         style={{ zIndex: 1 }}
//       >
//         {/* Background Image */}
//         <img
//           src="/images/DSC01949.jpeg"
//           alt="Contact Harness"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

//         {/* Hero Content */}
//         <div className="relative z-20 flex h-full items-end justify-center px-4 pb-16 sm:pb-20 lg:pb-24">
//           <div
//             ref={textRef}
//             className="text-center max-w-4xl"
//           >
           

//             <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
//               Let&apos;s plan your stay,
//               <br className="hidden sm:block" />
//               event, or next experience
//             </h2>

//             <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
//               Whether you are booking a room, organizing a celebration,
//               or just exploring what Harness offers, we are here to help
//               you get started.
//             </p>
//           </div>
//         </div>

//         {/* SLIDING CONTENT PANEL */}
//         <div
//           ref={contentSectionRef}
//           className="
//             absolute
//             left-0
//             right-0
//             bottom-0
//             z-30
//             overflow-hidden
//             min-h-[80vh]
//             sm:min-h-[100vh]
//           "
//         >
//           {/* Mask Background */}
//           <div
//             ref={maskRef}
//             className="absolute inset-0 w-full h-full"
//             style={{ transformOrigin: 'center center' }}
//           >
//             <img
//               src="/images/mask.svg"
//               alt=""
//               className="w-full h-full object-cover object-top invert"
//             />
//           </div>

//           {/* Main Content */}
//           <div
//             ref={contentRef}
//             className="
//               relative
//               z-10
//               w-full
//               flex
//               flex-col
//               items-center
//               justify-center
//               gap-10
//               px-4
//               pt-24
//               sm:pt-36
//               lg:pt-44
//               pb-16
//             "
//           >
//             {/* Heading */}
//             <div className="flex flex-col items-center gap-5 text-center pt-12">
//               <button
//                 className="text-white px-8 py-2 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold"
//                 style={{
//                   backgroundColor: '#FAA821',
//                   maskImage: "url('/images/logo.png')",
//                   WebkitMaskImage: "url('/images/logo.png')",
//                   maskSize: 'contain',
//                   WebkitMaskSize: 'cover',
//                   maskPosition: 'center',
//                   WebkitMaskPosition: 'center',
//                   maskRepeat: 'no-repeat',
//                   WebkitMaskRepeat: 'no-repeat',
//                 }}
//               >
//                 Contact Us
//               </button>

//               <div className="text-center">
//                 <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />

//                 <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//                   We&apos;d Love
//                   <br />
//                   To Hear From You
//                 </h2>
//               </div>
//             </div>

//             {/* Contact Cards */}
//             <div className="grid gap-5 sm:gap-6 md:grid-cols-3 max-w-6xl w-full mx-auto">
//               {contactCards.map((card) => (
//                 <div
//                   key={card.title}
//                   className="
//                     rounded-[1.75rem]
//                     border
//                     border-stone-200
//                     bg-white
//                     p-5
//                     sm:p-6
//                     shadow-sm
//                     transition-all
//                     duration-300
//                     hover:-translate-y-2
//                     hover:shadow-xl
//                   "
//                 >
//                   <p className="text-md font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
//                     {card.title}
//                   </p>

//                   <h2 className="mt-4 text-lg sm:text-xl font-bold leading-snug text-stone-900 break-words">
//                     {card.value}
//                   </h2>

//                   <p className="mt-3 text-lg leading-relaxed text-stone-500">
//                     {card.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BELOW CONTENT */}
//       <section className="relative px-4 py-14 sm:px-6 sm:py-20 lg:px-10 bg-[#f8f5ef]">
//         <div className="absolute left-0 top-10 h-64 w-64 opacity-10 sm:h-80 sm:w-80">
//           <img
//             src="/images/bg5.png"
//             alt=""
//             className="h-full w-full object-contain"
//           />
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl">
//           <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
//             {/* FORM */}
//             <div className="rounded-[2rem] bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.08)] sm:p-8">
//               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
//                 Send An Inquiry
//               </p>

//               <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
//                 Tell us what you&apos;re planning
//               </h2>

//               <p className="mt-4 text-sm leading-relaxed text-stone-500 sm:text-base">
//                 Share your dates, group size, or event idea and we&apos;ll
//                 help guide you to the best option at Harness.
//               </p>

//               <form
//                 className="mt-8 grid gap-4 sm:grid-cols-2"
//                 onSubmit={(event) => event.preventDefault()}
//               >
//                 <input
//                   type="text"
//                   placeholder="Your name"
//                   className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone number"
//                   className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
//                 />

//                 <select className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]">
//                   <option>Room Booking</option>
//                   <option>Dining Reservation</option>
//                   <option>Wedding or Celebration</option>
//                   <option>Conference or Retreat</option>
//                   <option>General Inquiry</option>
//                 </select>

//                 <input
//                   type="date"
//                   className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
//                 />

//                 <input
//                   type="number"
//                   min="1"
//                   placeholder="Guests"
//                   className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
//                 />

//                 <textarea
//                   rows="5"
//                   placeholder="Tell us a little more about your plans"
//                   className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm outline-none focus:border-[#FAA821] sm:col-span-2"
//                 />

//                 <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
//                   <a
//                     href="mailto:theharnessnepal@gmail.com"
//                     className="inline-flex items-center justify-center rounded-full bg-[#FAA821] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
//                   >
//                     Email Us Directly
//                   </a>

//                   <a
//                     href="tel:067422112"
//                     className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-stone-800 transition hover:border-[#FAA821] hover:text-[#FAA821]"
//                   >
//                     Call Now
//                   </a>
//                 </div>
//               </form>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="space-y-6">
//               <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
//                 <img
//                   src="/images/room.jpeg"
//                   alt="Harness property"
//                   className="h-[260px] sm:h-[320px] w-full object-cover"
//                 />
//               </div>

//               <div className="rounded-[2rem] bg-[#1f1c18] p-6 text-white sm:p-8">
//                 <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
//                   Why Reach Out
//                 </p>

//                 <h3 className="mt-3 text-2xl font-bold">
//                   We can help with more than just a room
//                 </h3>

//                 <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
//                   <p>
//                     Ask about accommodation, dining, destination events,
//                     team gatherings, or activity planning.
//                   </p>

//                   <p>
//                     We&apos;ll help you match your visit with the right
//                     space, timing, and experience.
//                   </p>

//                   <p>
//                     Harness is best enjoyed when the stay, scenery,
//                     and service all work together.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default ContactPage


import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../Component/Seo'
import { BUSINESS_NAME, CONTACT, buildLocalBusinessSchema } from '../seo/site'

gsap.registerPlugin(ScrollTrigger)

const contactCards = [
  {
    title: 'Visit Us',
    value: CONTACT.address,
    description: 'A scenic destination for stays, dining, and memorable events.',
  },
  {
    title: 'Call Us',
    value: CONTACT.phoneDisplay,
    description: 'Reach out for reservations, event planning, or quick inquiries.',
  },
  {
    title: 'Email Us',
    value: CONTACT.email,
    description: 'Share your travel dates, event ideas, or special requirements.',
  },
]

const ContactPage = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const contentSectionRef = useRef(null)
  const maskRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      )

      // Slide-up section animation
      if (contentSectionRef.current) {
        gsap.set(contentSectionRef.current, {
          yPercent: 100,
        })

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(contentSectionRef.current, {
              yPercent: 100 - self.progress * 100,
            })
          },
        })
      }

      // Mask animation
      if (maskRef.current) {
        gsap.fromTo(
          maskRef.current,
          {
            scale: 1.15,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.8,
            },
          }
        )
      }

      // Content reveal
      if (contentRef.current?.children?.length) {
        gsap.fromTo(
          contentRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Seo
        title="Contact Harness Zipline Resort in Kusma, Nepal"
        description="Contact Harness Zipline Pvt Ltd in Kusma, Nepal for room bookings, zipline adventures, dining reservations, weddings, conferences, and special events."
        path="/contact"
        image="/images/DSC01949.jpeg"
        keywords="contact Harness Nepal, Kusma resort contact, zipline booking Nepal, Harness phone number, Harness email"
        schema={[buildLocalBusinessSchema({ name: BUSINESS_NAME })]}
      />
    <div className="overflow-x-hidden bg-[#f8f5ef]">
      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Background Image */}
        <img
          src="/images/DSC01949.jpeg"
          alt="Contact Harness"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full items-end justify-center px-4 pb-16 sm:pb-20 lg:pb-24">
          <div
            ref={textRef}
            className="text-center max-w-4xl"
          >
           

            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              Let&apos;s plan your stay,
              <br className="hidden sm:block" />
              event, or next experience
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base lg:text-xl leading-relaxed text-white/85">
              Whether you are booking a room, organizing a celebration,
              or just exploring what Harness offers, we are here to help
              you get started.
            </p>
          </div>
        </div>

        {/* SLIDING CONTENT PANEL */}
        <div
          ref={contentSectionRef}
          className="
            absolute
            left-0
            right-0
            bottom-0
            z-30
            overflow-hidden
            min-h-[80vh]
            sm:min-h-[100vh]
          "
        >
          {/* Mask Background */}
          <div
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{ transformOrigin: 'center center' }}
          >
            <img
              src="/images/mask.svg"
              alt="mask"
              className="w-full h-full object-cover object-top invert"
            />
          </div>

          {/* Main Content */}
          <div
            ref={contentRef}
            className="
              relative
              z-10
              w-full
              flex
              flex-col
              items-center
              justify-center
              gap-10
              px-4
              pt-24
              sm:pt-36
              lg:pt-44
              pb-16
            "
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-5 text-center pt-12">
              <button
                className="text-white px-8 py-2 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold"
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
                Contact Us
              </button>

              <div className="text-center">
                <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />

                <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  We&apos;d Love
                  <br />
                  To Hear From You
                </h2>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-5 sm:gap-6 md:grid-cols-3 max-w-6xl w-full mx-auto">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="
                    rounded-[1.75rem]
                    border
                    border-stone-200
                    bg-white
                    p-5
                    sm:p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  <p className="text-md font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-lg sm:text-xl font-bold leading-snug text-stone-900 break-words">
                    {card.value}
                  </h2>

                  <p className="mt-3 text-lg leading-relaxed text-stone-500">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BELOW CONTENT */}
      <section className="relative px-4 py-14 sm:px-6 sm:py-20 lg:px-10 bg-[#f8f5ef]">
        <div className="absolute left-0 top-10 h-64 w-64 opacity-10 sm:h-80 sm:w-80">
          <img
            src="/images/bg5.png"
            alt="background"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            {/* FORM */}
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
                Send An Inquiry
              </p>

              <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
                Tell us what you&apos;re planning
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-stone-500 sm:text-base">
                Share your dates, group size, or event idea and we&apos;ll
                help guide you to the best option at Harness.
              </p>

              <form
                className="mt-8 grid gap-4 sm:grid-cols-2"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
                />

                <select className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]">
                  <option>Room Booking</option>
                  <option>Dining Reservation</option>
                  <option>Wedding or Celebration</option>
                  <option>Conference or Retreat</option>
                  <option>General Inquiry</option>
                </select>

                <input
                  type="date"
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Guests"
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#FAA821]"
                />

                <textarea
                  rows="5"
                  placeholder="Tell us a little more about your plans"
                  className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm outline-none focus:border-[#FAA821] sm:col-span-2"
                />

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#FAA821] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#e8960f]"
                  >
                    Email Us Directly
                  </a>

                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-stone-800 transition hover:border-[#FAA821] hover:text-[#FAA821]"
                  >
                    Call Now
                  </a>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
                <img
                  src="/images/room.jpeg"
                  alt="Harness property"
                  className="h-[260px] sm:h-[320px] w-full object-cover"
                />
              </div>

              <div className="rounded-[2rem] bg-[#1f1c18] p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FAA821]">
                  Why Reach Out
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  We can help with more than just a room
                </h3>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
                  <p>
                    Ask about accommodation, dining, destination events,
                    team gatherings, or activity planning.
                  </p>

                  <p>
                    We&apos;ll help you match your visit with the right
                    space, timing, and experience.
                  </p>

                  <p>
                    Harness is best enjoyed when the stay, scenery,
                    and service all work together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default ContactPage
