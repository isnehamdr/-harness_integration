

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = 'http://127.0.0.1:8000/storage/'

const Hero = () => {
	const heroRef = useRef(null)
	const textRef = useRef(null)
	const aboutRef = useRef(null)
	const maskRef = useRef(null)
	const aboutContentRef = useRef(null)

	const [hero, setHero] = useState(null)
	const [loading, setLoading] = useState(true)

	// ── Fetch hero data ──────────────────────────────────────────────
	useEffect(() => {
		const fetchHero = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/hero')
				const data = response.data.data

				// Support both array and single object responses
				const item = Array.isArray(data) ? data[0] : data

				// Only set hero if is_archived === 1
				if (item && item.is_archived === 1) {
					setHero(item)
				}
			} catch (error) {
				console.error('Hero fetch error:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchHero()
	}, [])

	

	// ── GSAP animations (run after hero data is ready) ───────────────
	useEffect(() => {
		if (!hero) return // don't animate if nothing to show

		const ctx = gsap.context(() => {
			// Hero entrance
			gsap.fromTo(
				textRef.current,
				{ y: 80, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
			)

			// About section slides up over the hero
			gsap.fromTo(
				aboutRef.current,
				{ yPercent: 100 },
				{
					yPercent: 0,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 0.8,
						pin: heroRef.current,
						pinSpacing: true,
					},
				}
			)

			// Mask SVG fade-in
			gsap.fromTo(
				maskRef.current,
				{ scale: 1, opacity: 0, rotateZ: -5 },
				{
					scale: 1,
					opacity: 1,
					rotateZ: 0,
					duration: 1.5,
					ease: 'back.out(0.5)',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top center',
						end: 'bottom top',
						scrub: 1.2,
					},
				}
			)

			// About content stagger
			gsap.fromTo(
				aboutContentRef.current.children,
				{ opacity: 0, y: 60, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					stagger: 0.15,
					ease: 'elastic.out(0.6, 0.5)',
					scrollTrigger: {
						trigger: aboutRef.current,
						start: 'top 60%',
						end: 'top 30%',
						scrub: 0.5,
					},
				}
			)
		})

		return () => ctx.revert()
	}, [hero]) // re-run when hero data arrives

	// ── Loading state ────────────────────────────────────────────────
	if (loading) {
		return (
			<div className="relative bg-black w-full h-screen flex items-center justify-center">
				<div className="w-10 h-10 border-2 border-[#FAA821] border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	// ── Not archived / not found — render nothing ────────────────────
	if (!hero) return null

	// ── Resolve media URLs ───────────────────────────────────────────
	const videoSrc = hero.video ? `${BASE_URL}${hero.video}` : '/images/main.mp4'
	const imageSrc = hero.image ? `${BASE_URL}${hero.image}` : '/images/hero-fallback.jpg'

	return (
		<>
			{/* ── HERO ───────────────────────────────────────────────── */}
			<div
				ref={heroRef}
				className="relative bg-white w-full h-screen overflow-hidden"
				style={{ zIndex: 1 }}
			>
				{/* Video Background */}
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute top-0 left-0 w-full h-full object-cover"
				>
					<source src={videoSrc} type="video/mp4" />
					<img
						src={imageSrc}
						alt="Adventure Resort"
						className="w-full h-full object-cover"
					/>
				</video>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/40 z-10" />

				{/* Hero Text */}
				<div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
					<div ref={textRef} className="text-center px-4">
						<h1 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
							Harness Zipline and Adventure Resort!
						</h1>
					</div>
				</div>

				{/* Gold Divider */}
				<div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-16 h-px bg-[#FAA821] z-20" />

				{/* ── ABOUT — slides up over the hero on scroll ── */}
				<div
					ref={aboutRef}
					className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
					style={{ top: 'auto' }}
				>
					{/* Mask SVG as full background */}
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

					{/* Top Right Image */}
					<div className="absolute top-24 right-4 z-20">
						<img
							src="/images/bg.png"
							alt="Top right decoration"
							className="w-26 h-26 lg:w-56 lg:h-56 object-contain"
						/>
					</div>

					{/* About content */}
					<div
						ref={aboutContentRef}
						className="relative z-10 w-full mt-24 sm:mt-42 h-full flex flex-col items-center justify-center px-6 text-center"
					>
						<div className="flex flex-col items-center pt-32">
							<div className="w-10 h-px bg-[#FAA821] mb-4" />

							<button
								className="text-white px-8 py-2 mb-3 text-sm uppercase tracking-widest font-semibold transition-colors duration-300"
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
								<h3>About us</h3>
							</button>

							<h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight mb-4 drop-shadow-2xl">
								Where Adventure Meets Nature
							</h2>

							<p className="text-black/90 text-lg sm:text-xl tracking-wide max-w-xl leading-relaxed mb-6 drop-shadow-lg">
								Founded with a vision to create unforgettable experiences, our resort
								has evolved into a sanctuary for those who crave both excitement and
								serenity. Guests can soar through the treetops on exhilarating ziplines
								or unwind while enjoying the tranquil beauty of nature. We take pride in
								offering Nepal's first-ever igloo rooms, providing a lavish escape that
								seamlessly integrates adventure with modern comforts.
							</p>

							{/* CTA */}
							<button className="cursor-pointer relative px-8 py-2.5 text-sm font-semibold uppercase tracking-widest border border-[#FAA821] text-[#FAA821] overflow-hidden group transition-all duration-300 hover:shadow-lg">
								<Link
									to="/about"
									className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300"
								>
									Discover More
								</Link>
								<span className="absolute inset-0 bg-[#FAA821] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
							</button>

							<div className="w-10 h-px bg-[#FAA821] mt-6" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Hero
