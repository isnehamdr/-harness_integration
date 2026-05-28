import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Room data for the slider
const rooms = [
  {
    id: 1,
    title: 'IGLOO SUITE',
    subtitle: "Nepal's First Igloo Experience",
    image: '/images/tent.jpg',
    description: 'Luxury dome with transparent ceiling for stargazing'
  },
  {
    id: 2,
    title: 'DELUXE VILLA',
    subtitle: 'Private Pool & Garden View',
    image: '/images/room1.jpg',
    description: 'Spacious villa with modern amenities and private garden'
  },
  {
    id: 3,
    title: 'ZIPLINE CABIN',
    subtitle: 'Adventure Awaits',
    image: '/images/room3.jpg',
    description: 'Treehouse style cabin with direct zipline access'
  },
  {
    id: 4,
    title: 'WELLNESS RETREAT',
    subtitle: 'Spa & Meditation',
    image: '/images/room5.jpg',
    description: 'Healing space with private yoga deck and spa tub'
  }
];

const About = () => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef(null);
  const [currentRoom, setCurrentRoom] = useState(rooms[0]);

  // Navigation functions
  const goToSlide = (index, direction = 'next') => {
    if (isAnimatingRef.current) return;
    if (index < 0) index = rooms.length - 1;
    if (index >= rooms.length) index = 0;
    if (currentIndexRef.current === index) return;

    isAnimatingRef.current = true;
    const nextRoom = rooms[index];

    // Create timeline for smooth transitions
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = index;
        setCurrentRoom(nextRoom);
        isAnimatingRef.current = false;
        resetAutoPlay();
      }
    });

    // Animate out current content
    tl.to(subtitleRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, 0);

    tl.to(titleRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, 0);

    tl.to(descriptionRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, 0);

    // Animate out background image
    tl.to(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

    // Update content and animate in
    tl.call(() => {
      if (subtitleRef.current) subtitleRef.current.textContent = nextRoom.subtitle;
      if (titleRef.current) titleRef.current.textContent = nextRoom.title;
      if (descriptionRef.current) descriptionRef.current.textContent = nextRoom.description;
      if (imageRef.current) {
        imageRef.current.style.backgroundImage = `url(${nextRoom.image})`;
      }
    });

    // Animate in new content
    tl.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.3);

    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.35);

    tl.to(descriptionRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.4);

    // Animate in new background image
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 0.2);
  };

  const nextSlide = () => {
    goToSlide(currentIndexRef.current + 1, 'next');
  };

  const prevSlide = () => {
    goToSlide(currentIndexRef.current - 1, 'prev');
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (!isAnimatingRef.current) {
        nextSlide();
      }
    }, 5000);
  };

  // Setup initial state
  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative -mt-4 z-50 flex flex-col bg-white">
      {/* First Section - with text content */}
      <div
        className="w-full min-h-[70vh] sm:min-h-screen mt-4 flex items-center flex-col justify-center"
        style={{
          backgroundColor: "#FAA821",
          maskImage: "url('/images/mask3.svg')",
          WebkitMaskImage: "url('/images/mask3.svg')",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskPosition: "top",
          WebkitMaskPosition: "top",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1b6934] font-bold leading-tight mb-4 drop-shadow-2xl">
            Stay in Our Unique and Scenic Rooms
          </h2>

          <div className="rounded-lg p-6 backdrop-blur-sm">
            <p className="text-white text-lg sm:text-xl tracking-wide max-w-3xl mx-auto leading-relaxed">
              Experience the perfect balance of adventure and relaxation at our resort. After an exciting day of
              ziplining and outdoor activities, unwind in beautifully designed rooms surrounded by breathtaking
              natural views.

              Discover Nepal’s first-ever igloo-style rooms, offering a cozy yet luxurious stay that blends modern
              comfort with a one-of-a-kind experience.
            </p>
          </div>
        </div>


      </div>
      {/* Second Section - Slider with Content at Bottom */}
      <div
        className="w-full min-h-[70vh] sm:min-h-screen relative flex -mt-36 items-end justify-center overflow-hidden"
        style={{
          backgroundColor: "#FAA821",
          maskImage: "url('/images/mask3.svg')",
          WebkitMaskImage: "url('/images/mask3.svg')",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {/* Background Image that slides */}
        <div
          ref={imageRef}
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: `url(${currentRoom.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Fixed Content Container - All content at bottom */}
        <div className="relative w-full z-10 px-8 pb-8 md:px-32 md:pb-12">
          {/* Title Section - Bottom Left */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <span
                ref={subtitleRef}
                className="text-[#FAA821] text-sm md:text-base font-semibold tracking-wider uppercase bg-black/50 px-3 py-1 rounded-full inline-block"
              >
                {currentRoom.subtitle}
              </span>
              <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
              >
                {currentRoom.title}
              </h2>
              <p
                ref={descriptionRef}
                className="text-white/90 text-base md:text-lg max-w-md leading-relaxed hidden sm:block"
              >
                {currentRoom.description}
              </p>
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="group w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-[#FAA821] transition-all duration-300 flex items-center justify-center border border-white/30 hover:border-transparent shadow-lg"
                aria-label="Previous room"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-[#1b6934] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="group w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-[#FAA821] transition-all duration-300 flex items-center justify-center border border-white/30 hover:border-transparent shadow-lg"
                aria-label="Next room"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-[#1b6934] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slide Indicator Dots - Bottom Center Below Content */}
          <div className="flex justify-center gap-2 mt-6">
            {rooms.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  const direction = dotIdx > currentIndexRef.current ? 'next' : 'prev';
                  goToSlide(dotIdx, direction);
                }}
                className={`transition-all duration-300 rounded-full ${currentIndexRef.current === dotIdx
                    ? 'w-8 h-2 bg-[#FAA821]'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                  }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;