import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const ActivityPage = () => {
    const navigate = useNavigate();

    const heroRef = useRef(null);
    const textRef = useRef(null);
    const contentSectionRef = useRef(null);
    const maskRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);
    const servicesGridRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activity, setActivity] = useState([]);

    // Navigate
    const handleCardClick = (slug) => {
        navigate(`/activities/${slug}`);
    };

    // Fetch Activities
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/activities"
                );

                // Show only archived activities
                const filteredActivities = response.data.data.filter(
                    (item) => item.is_archived === 1
                );

                setActivity(filteredActivities);
            } catch (error) {
                console.error("Fetching error:", error);
            }
        };

        fetchActivity();
    }, []);

    console.log(activity);
    // Check mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);

        return () =>
            window.removeEventListener("resize", checkMobile);
    }, []);

    // Auto Slider
    useEffect(() => {
        if (!isMobile || activity.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(
                (prev) => (prev + 1) % activity.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobile, activity.length]);

    const nextSlide = () => {
        setCurrentSlide(
            (prev) => (prev + 1) % activity.length
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) =>
                (prev - 1 + activity.length) %
                activity.length
        );
    };

    // GSAP Animations
    useEffect(() => {
        ScrollTrigger.getAll().forEach((trigger) =>
            trigger.kill()
        );

        const ctx = gsap.context(() => {
            if (textRef.current) {
                gsap.fromTo(
                    textRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: 0.2,
                    }
                );
            }

            if (contentSectionRef.current) {
                gsap.set(contentSectionRef.current, {
                    yPercent: 100,
                });

                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (contentSectionRef.current) {
                            gsap.set(
                                contentSectionRef.current,
                                {
                                    yPercent:
                                        100 -
                                        self.progress * 100,
                                }
                            );
                        }
                    },
                });
            }

            if (maskRef.current) {
                gsap.fromTo(
                    maskRef.current,
                    { scale: 1.2, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: "top center",
                            end: "bottom center",
                            scrub: 0.8,
                        },
                    }
                );
            }

            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger:
                                contentSectionRef.current,
                            start: "top 80%",
                            end: "top 60%",
                            scrub: 0.3,
                            once: true,
                        },
                    }
                );
            }

            if (servicesGridRef.current) {
                setTimeout(() => {
                    const elements = isMobile
                        ? document.querySelectorAll(
                              ".service-card"
                          )
                        : servicesGridRef.current.children;

                    if (
                        elements &&
                        elements.length > 0
                    ) {
                        gsap.fromTo(
                            elements,
                            {
                                opacity: 0,
                                y: 30,
                                scale: 0.95,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.5,
                                stagger: 0.08,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger:
                                        servicesGridRef.current,
                                    start: "top 85%",
                                    once: true,
                                },
                            }
                        );
                    }
                }, 100);
            }
        }, heroRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) =>
                trigger.kill()
            );
        };
    }, [isMobile]);

    // Card Component
    const ServiceCard = ({ service }) => (
        <div
            className="service-card flex flex-col items-center w-full group transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() =>
                handleCardClick(service.slug)
            }
        >
            <div
                className="relative w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                style={{
                    height:
                        "clamp(300px, 35vw, 450px)",
                    backgroundImage: `url(http://127.0.0.1:8000/storage/${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    maskImage:
                        "url('/images/mask.png')",
                    WebkitMaskImage:
                        "url('/images/mask.png')",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        View Details
                    </span>
                </div>
            </div>

            <h3 className="text-[#faa821] text-xl lg:text-2xl font-bold mt-6 text-center transition-colors duration-300 group-hover:text-[#fcb742] px-2">
                {service.name}
            </h3>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>
                    Activities - Harness Zipline &
                    Adventure Resort
                </title>
            </Helmet>

            <div>
                <div
                    ref={heroRef}
                    className="relative bg-white w-full h-screen overflow-hidden"
                >
                    <img
                        src="/images/swing.webp"
                        alt="Activities"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50 z-10"></div>

                    <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
                        <div
                            ref={textRef}
                            className="text-center px-4"
                        >
                            <h2 className="text-white text-4xl lg:text-6xl font-bold">
                                Activities
                            </h2>

                            <h2 className="text-[#faa821] text-3xl font-bold mt-6">
                                Experience and kill the
                                fear
                            </h2>
                        </div>
                    </div>

                    <div
                        ref={contentSectionRef}
                        className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden"
                    >
                        <div
                            ref={maskRef}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img
                                src="/images/mask.svg"
                                alt="mask"
                                className="w-full h-full object-cover object-top invert"
                            />
                        </div>

                        <div
                            ref={contentRef}
                            className="relative z-10 w-full min-h-screen flex items-center justify-center"
                        >
                            <div className="w-full max-w-7xl mx-auto px-4 py-20 relative z-20 mt-32">
                                <div className="w-full relative z-30 mt-48">
                                    <div
                                        ref={headerRef}
                                        className="flex flex-col items-center justify-center text-center"
                                    >
                                        <h2 className="text-[#faa821] text-4xl lg:text-5xl font-bold mb-6">
                                            Experience the
                                            Best Activities
                                        </h2>
                                    </div>

                                    {isMobile ? (
                                        <div
                                            ref={
                                                servicesGridRef
                                            }
                                            className="w-full mt-16 relative z-30"
                                        >
                                            <div className="relative overflow-hidden px-8">
                                                <div
                                                    className="flex transition-transform duration-500 ease-out"
                                                    style={{
                                                        transform: `translateX(-${currentSlide * 100}%)`,
                                                    }}
                                                >
                                                    {activity.map(
                                                        (
                                                            service
                                                        ) => (
                                                            <div
                                                                key={
                                                                    service.id
                                                                }
                                                                className="w-full flex-shrink-0 px-2"
                                                            >
                                                                <ServiceCard
                                                                    service={
                                                                        service
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                <button
                                                    onClick={
                                                        prevSlide
                                                    }
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full"
                                                >
                                                    ←
                                                </button>

                                                <button
                                                    onClick={
                                                        nextSlide
                                                    }
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full"
                                                >
                                                    →
                                                </button>

                                                <div className="flex justify-center gap-2 mt-6">
                                                    {activity.map(
                                                        (
                                                            _,
                                                            idx
                                                        ) => (
                                                            <button
                                                                key={
                                                                    idx
                                                                }
                                                                onClick={() =>
                                                                    setCurrentSlide(
                                                                        idx
                                                                    )
                                                                }
                                                                className={`rounded-full transition-all duration-300 ${
                                                                    currentSlide ===
                                                                    idx
                                                                        ? "w-8 h-2 bg-[#faa821]"
                                                                        : "w-2 h-2 bg-gray-300"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full mt-20">
                                            <div
                                                ref={
                                                    servicesGridRef
                                                }
                                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                                            >
                                                {activity.map(
                                                    (
                                                        service
                                                    ) => (
                                                        <ServiceCard
                                                            key={
                                                                service.id
                                                            }
                                                            service={
                                                                service
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityPage;