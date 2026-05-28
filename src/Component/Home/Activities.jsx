import React, { useState, useCallback } from 'react';

const activities = [
    { id: 1, title: "Classic Zipline", image: "/images/zipline.jpg" },
    { id: 2, title: "River Rafting", image: "/images/rafting.jpg" },
    { id: 3, title: "Giant Swing", image: "/images/swing.webp" },
    { id: 4, title: "Cycling", image: "/images/cycling.jpg" },
    { id: 5, title: "Superman Zipline", image: "/images/zipline2.jpg" },
];

const VISIBLE_COUNTS = {
    xl: 3,  // ≥1024px
    md: 2,  // ≥640px
    sm: 1,  // <640px
};

const Activities = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getVisibleCount = () => {
        if (typeof window === 'undefined') return VISIBLE_COUNTS.xl;
        if (window.innerWidth >= 1024) return VISIBLE_COUNTS.xl;
        if (window.innerWidth >= 640) return VISIBLE_COUNTS.md;
        return VISIBLE_COUNTS.sm;
    };

    const [visibleCount, setVisibleCount] = React.useState(getVisibleCount);

    React.useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = activities.length - visibleCount;

    const prev = useCallback(() => {
        setCurrentIndex((i) => (i === 0 ? maxIndex : i - 1));
    }, [maxIndex]);

    const next = useCallback(() => {
        setCurrentIndex((i) => (i === maxIndex ? 0 : i + 1));
    }, [maxIndex]);

    // Clamp index when visibleCount changes
    React.useEffect(() => {
        setCurrentIndex((i) => Math.min(i, Math.max(0, activities.length - visibleCount)));
    }, [visibleCount]);

    const translatePercent = -(currentIndex * (100 / visibleCount));

    return (
        <div className="relative w-full z-10 flex flex-col">
            <div
                className="w-full flex items-center justify-center p-4 sm:p-8"
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
                <div className="text-center w-full max-w-[1200px] mx-auto py-12 sm:py-24">

                    {/* Logo badge */}
                    <button
                        className="text-[#FAA821] px-8 py-2 mb-3 text-sm uppercase tracking-widest font-semibold"
                        style={{
                            backgroundColor: "white",
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
                        <h3>Activities</h3>
                    </button>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1b6934] font-bold leading-tight mb-8 drop-shadow-2xl">
                        Make your trip worth
                    </h2>

                    {/* Carousel wrapper */}
                    <div className="relative">
                        {/* Prev button */}
                        <button
                            onClick={prev}
                            aria-label="Previous activity"
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1b6934] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#145227] active:scale-95 transition-all duration-200 -translate-x-2 sm:-translate-x-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Track */}
                        <div className="overflow-hidden mx-6 sm:mx-10">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(${translatePercent}%)`,
                                }}
                            >
                                {activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex-shrink-0 flex flex-col items-center px-2 sm:px-4"
                                        style={{ width: `${100 / visibleCount}%` }}
                                    >
                                        {/* Image */}
                                        <div
                                            className="bg-cover bg-center w-full"
                                            style={{
                                                backgroundImage: `url(${activity.image})`,
                                                maskImage: "url('/images/mask.png')",
                                                WebkitMaskImage: "url('/images/mask.png')",
                                                maskSize: "contain",
                                                WebkitMaskSize: "contain",
                                                maskPosition: "center",
                                                WebkitMaskPosition: "center",
                                                maskRepeat: "no-repeat",
                                                WebkitMaskRepeat: "no-repeat",
                                                aspectRatio: "350 / 400",
                                                maxWidth: "350px",
                                                margin: "0 auto",
                                            }}
                                        />
                                        <h3 className="text-[#1b6934] text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 text-center">
                                            {activity.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next button */}
                        <button
                            onClick={next}
                            aria-label="Next activity"
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1b6934] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#145227] active:scale-95 transition-all duration-200 translate-x-2 sm:translate-x-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${
                                    i === currentIndex
                                        ? 'bg-[#1b6934] w-6 h-3'
                                        : 'bg-[#1b6934]/40 w-3 h-3'
                                }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Activities;