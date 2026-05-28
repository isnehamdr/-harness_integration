import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ziplineImg from "../../../public/images/swimming.jpg";

gsap.registerPlugin(ScrollTrigger);

const ROOMS = [
  {
    id: 1,
    name: "Himalayan Suite",
    type: "Suite · 85 m²",
    desc: "Panoramic mountain views, king bed, private balcony with hot tub.",
    price: "$420",
    tag: "Most Popular",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    id: 2,
    name: "Forest Retreat",
    type: "Deluxe · 60 m²",
    desc: "Nestled among pine trees with floor-to-ceiling glass and a fire pit.",
    price: "$280",
    tag: "New",
    img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80",
  },
  {
    id: 3,
    name: "River View Room",
    type: "Superior · 45 m²",
    desc: "Wake up to the sound of the Trishuli River from your private terrace.",
    price: "$190",
    tag: null,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  },
  {
    id: 4,
    name: "Adventure Loft",
    type: "Loft · 55 m²",
    desc: "Gear storage, drying room, and direct trail access for the explorer.",
    price: "$240",
    tag: "Best Value",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
  },
  {
    id: 5,
    name: "Garden Cottage",
    type: "Cottage · 70 m²",
    desc: "Secluded stone cottage with a private garden, fireplace, and hammock.",
    price: "$320",
    tag: null,
    img: "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=600&q=80",
  },
  {
    id: 6,
    name: "Stargazer Tent",
    type: "Glamping · 30 m²",
    desc: "Luxury canvas tent under open skies with a transparent ceiling panel.",
    price: "$160",
    tag: "Unique",
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
  },
];

export default function Extra() {
  const containerRef  = useRef(null);
  const imgRef        = useRef(null);
  const vigRef        = useRef(null);
  const h1Ref         = useRef(null);
  const pRef          = useRef(null);
  const revealRef     = useRef(null);
  const progressRef   = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    // Explicitly set all initial states so nothing is visible before GSAP fires
    gsap.set(vigRef.current,        { opacity: 0 });
    gsap.set(h1Ref.current,         { opacity: 0, y: 30 });
    gsap.set(pRef.current,          { opacity: 0 });
    gsap.set(revealRef.current,     { opacity: 0 });
    gsap.set(".rooms-heading",      { opacity: 0, y: 24 });
    gsap.set(".room-card",          { opacity: 0, y: 32 });
    gsap.set(".rooms-cta",          { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      // Single scrubbed timeline — all animations tied to scroll progress (0–1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = self.progress * 100 + "%";
            }
            // Enable pointer events on reveal panel once it's visible
            if (revealRef.current) {
              revealRef.current.style.pointerEvents =
                self.progress > 0.82 ? "auto" : "none";
            }
          },
        },
      });

      tl
        // 0–0.75 : zoom hero image
        .to(imgRef.current,        { scale: 4, ease: "none" },                        "<")
        // fade in vignette
        .to(vigRef.current,        { opacity: 1, duration: 0.25 },                    0)
        // reveal headline
        .to(h1Ref.current,         { opacity: 1, y: 0, duration: 0.15 },              0.08)
        .to(pRef.current,          { opacity: 1, duration: 0.1 },                     0.12)
        // hide scroll hint early
        .to(scrollHintRef.current, { opacity: 0, duration: 0.08 },                    0.05)
        // fade headline out
        .to(h1Ref.current,         { opacity: 0, y: -20, duration: 0.12 },            0.38)
        .to(pRef.current,          { opacity: 0, duration: 0.1 },                     0.38)
        // reveal panel fades in
        .to(revealRef.current,     { opacity: 1, duration: 0.15, ease: "power2.out" },0.55)
        // heading
        .to(".rooms-heading",      { opacity: 1, y: 0, duration: 0.12 },              0.62)
        // cards stagger
        .to(".room-card",          {
            opacity: 1, y: 0,
            duration: 0.1,
            stagger: { each: 0.04, from: "start" },
          },                                                                           0.68)
        // cta
        .to(".rooms-cta",          { opacity: 1, y: 0, duration: 0.1 },               0.88);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        html { scroll-behavior: auto; }

        .hero-img {
          transform-origin: center center;
          will-change: transform;
        }

        /* Reveal panel sits over everything, scrollable within sticky viewport */
        .reveal-panel {
          position: absolute;
          inset: 0;
          z-index: 20;
          background: #0a100d;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: none;
        }

        .room-card-inner {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.28s ease, border-color 0.28s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .room-card-inner:hover {
          transform: translateY(-4px);
          border-color: rgba(74,222,128,0.38);
        }
        .room-img-wrap {
          overflow: hidden;
          height: 180px;
          flex-shrink: 0;
        }
        .room-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .room-card-inner:hover .room-img-wrap img {
          transform: scale(1.06);
        }

        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(6px); }
        }
        .scroll-arrow { animation: bounce 1.5s ease-in-out infinite; }
      `}</style>

      {/* 400 vh scroll driver */}
      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a100d]">

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-[3px] z-30 bg-gradient-to-r from-green-400 to-green-200"
            style={{ width: "0%" }}
          />

          {/* Hero image */}
          <img
            ref={imgRef}
            src={ziplineImg}
            alt="Adventure resort"
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />

          {/* Vignette */}
          <div
            ref={vigRef}
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.78) 100%)",
            }}
          />

          {/* Headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-white text-center px-4">
            <h1
              ref={h1Ref}
              className="font-serif text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl"
            >
              Feel the Rush
            </h1>
            <p
              ref={pRef}
              className="mt-4 text-sm md:text-base uppercase tracking-[0.22em] text-white/80 drop-shadow-lg"
            >
              Scroll to dive deeper
            </p>
          </div>

          {/* ── Reveal panel ── */}
          <div ref={revealRef} className="reveal-panel">

            {/* Grid texture */}
            <div
              className="sticky top-0 pointer-events-none"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.03,
                backgroundImage:
                  "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 text-white px-6 py-16 max-w-6xl mx-auto">

              {/* Heading */}
              <div className="rooms-heading text-center mb-12">
                <span className="inline-block text-green-400 text-xs uppercase tracking-[0.22em] border border-green-400/40 bg-green-400/10 px-4 py-1.5 rounded-full mb-5">
                  ✦ Where You Stay
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                  Choose Your{" "}
                  <span className="text-green-400">Sanctuary</span>
                </h2>
                <p className="mt-4 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
                  Six distinct escapes — from riverside perches to glamping under the stars.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                {ROOMS.map((room) => (
                  <div key={room.id} className="room-card" style={{ height: "100%" }}>
                    <div className="room-card-inner">
                      <div className="room-img-wrap">
                        <img src={room.img} alt={room.name} loading="lazy" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
                            {room.type}
                          </span>
                          {room.tag && (
                            <span className="text-[0.6rem] uppercase tracking-[0.15em] bg-green-400/15 text-green-400 border border-green-400/30 px-2 py-0.5 rounded-full">
                              {room.tag}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                          {room.name}
                        </h3>

                        <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1">
                          {room.desc}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <span className="text-green-400 font-bold text-lg font-serif">
                              {room.price}
                            </span>
                            <span className="text-white/30 text-xs ml-1">/ night</span>
                          </div>
                          <button className="text-xs uppercase tracking-[0.1em] font-semibold text-[#0a100d] bg-green-400 hover:bg-green-300 active:scale-95 transition-all px-4 py-2 rounded-full">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="rooms-cta text-center pb-10">
                <p className="text-white/35 text-sm mb-4">
                  All rooms include breakfast, WiFi, and trail access.
                </p>
                <button className="border border-green-400/50 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-semibold text-sm uppercase tracking-[0.12em] px-10 py-4 rounded-full transition-all">
                  View All Packages →
                </button>
              </div>

            </div>
          </div>

          {/* Scroll hint */}
          <div
            ref={scrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[25] flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.22em]">Scroll</span>
            <div
              className="scroll-arrow w-4 h-4"
              style={{
                borderRight: "1.5px solid rgba(255,255,255,0.5)",
                borderBottom: "1.5px solid rgba(255,255,255,0.5)",
                transform: "rotate(45deg)",
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}