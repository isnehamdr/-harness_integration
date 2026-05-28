import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const images = [
    { src: "/images/room2.jpg", label: " Room Image"},
    { src: "/images/room1.jpg", label: "Room Image" },
    { src: "/images/tent.jpg", label: "Room Image" },
    { src: "/images/room5.jpg", label: "Room Image" },
    { src: "/images/room4.jpg", label: "Room Image" },
    { src: "/images/swimming.jpg", label: "Swimming Pool" },
    { src: "/images/room3.jpg", label: "Room Image" },
    { src: "/images/room6.jpg", label: "Room Image" },
];

const Rooms = () => {
    const galleryRef = useRef(null);
    const flipCtxRef = useRef(null);

    const createTween = () => {
        const galleryEl = galleryRef.current;
        if (!galleryEl) return;

        const isMobile = window.innerWidth <= 768;

        const items = galleryEl.querySelectorAll(".gallery__item");

        // kill previous context
        flipCtxRef.current && flipCtxRef.current.revert();

        // MOBILE: skip heavy Flip animation
        if (isMobile) return;

        galleryEl.classList.remove("gallery--final");

        flipCtxRef.current = gsap.context(() => {
            galleryEl.classList.add("gallery--final");
            const flipState = Flip.getState(items);
            galleryEl.classList.remove("gallery--final");

            const flip = Flip.to(flipState, {
                simple: true,
                ease: "expoScale(1, 5)",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: galleryEl,
                    start: "center center",
                    end: "+=100%",
                    scrub: true,
                    pin: galleryEl.parentNode,
                },
            }).add(flip);

            return () => gsap.set(items, { clearProps: "all" });
        });
    };

    useEffect(() => {
        createTween();
        window.addEventListener("resize", createTween);

        return () => {
            window.removeEventListener("resize", createTween);
            flipCtxRef.current && flipCtxRef.current.revert();
        };
    }, []);

    return (
        <>
            {/* Gallery */}
            <div className="relative w-full h-screen my-24 flex items-center justify-center overflow-hidden bg-white">
                <div
                    className="gallery gallery--bento relative w-full h-full flex-none"
                    ref={galleryRef}
                    id="gallery-8"
                >
                    {images.map(({ src, label }, i) => (
                        <div
                            className="gallery__item relative overflow-hidden cursor-pointer group"
                            key={i}
                        >
                            <img
                                src={src}
                                alt={label}
                                loading="lazy"
                                className="object-cover w-full h-full block transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/65 to-transparent text-white text-[11px] font-semibold tracking-[0.12em] uppercase opacity-0 translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none font-mono">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GRID STYLES */}
            <style>{`
                .gallery--bento {
                    display: grid;
                    gap: 2vh;
                    grid-template-columns: repeat(3, 32.5vw);
                    grid-template-rows: repeat(4, 23vh);
                    justify-content: center;
                    align-content: center;
                }

                .gallery--final.gallery--bento {
                    grid-template-columns: repeat(3, 100vw);
                    grid-template-rows: repeat(4, 49.5vh);
                    gap: 1vh;
                }

                /* Desktop bento layout */
                .gallery--bento .gallery__item:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
                .gallery--bento .gallery__item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
                .gallery--bento .gallery__item:nth-child(3) { grid-area: 2 / 2 / 4 / 3; }
                .gallery--bento .gallery__item:nth-child(4) { grid-area: 1 / 3 / 3 / 4; }
                .gallery--bento .gallery__item:nth-child(5) { grid-area: 3 / 1 / 4 / 2; }
                .gallery--bento .gallery__item:nth-child(6) { grid-area: 3 / 3 / 5 / 4; }
                .gallery--bento .gallery__item:nth-child(7) { grid-area: 4 / 1 / 5 / 2; }
                .gallery--bento .gallery__item:nth-child(8) { grid-area: 4 / 2 / 5 / 3; }

                /* =========================
                   MOBILE FIX (IMPORTANT)
                   ========================= */
                @media (max-width: 768px) {
                    .gallery--bento {
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: auto;
                        gap: 12px;
                        padding: 0 16px;
                    }

                    .gallery--bento .gallery__item {
                        height: 180px;
                    }

                    /* disable bento positioning */
                    .gallery--bento .gallery__item:nth-child(n) {
                        grid-area: auto !important;
                    }
                }

                @media (max-width: 480px) {
                    .gallery--bento {
                        grid-template-columns: 1fr;
                    }

                    .gallery--bento .gallery__item {
                        height: 220px;
                    }
                }
            `}</style>
        </>
    );
};

export default Rooms;