import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const location = useLocation()

    const navItems = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Rooms', url: '/rooms' },
        { name: 'Activities', url: '/activities' },
{ name: 'Services', url: '/services' },
{ name: 'Blog', url: '/blog' },
                { name: 'Gallery', url: '/gallery' },
                 { name: 'Careers', url: '/careers' },
        { name: 'Contact', url: '/contact' },
    ]

    const overlayRef = useRef(null)
    const layer1Ref = useRef(null)
    const layer2Ref = useRef(null)
    const layer3Ref = useRef(null)
    const menuContentRef = useRef(null)
    const menuItemRefs = useRef([])
    const bookBtnRef = useRef(null)

    const tlRef = useRef(null)
    const isBuilt = useRef(false)

    /* ───────── Scroll ───────── */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* ───────── Lock body scroll ───────── */
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isMobileMenuOpen])

    /* ───────── GSAP INIT ───────── */
    useEffect(() => {
        if (isBuilt.current) return
        isBuilt.current = true

        const items = menuItemRefs.current.filter(Boolean)

        gsap.set(overlayRef.current, { autoAlpha: 0 })
        gsap.set([layer1Ref.current, layer2Ref.current, layer3Ref.current], {
            xPercent: -100,
        })

        gsap.set(menuContentRef.current, {
            autoAlpha: 0,
            x: -20,
        })

        gsap.set(items, {
            autoAlpha: 0,
            x: -30,
        })

        gsap.set(bookBtnRef.current, {
            autoAlpha: 0,
            y: 10,
        })

        const tl = gsap.timeline({ paused: true })

        tl.to(overlayRef.current, {
            autoAlpha: 1,
            duration: 0.25,
        })

        tl.to(layer1Ref.current, {
            xPercent: 0,
            duration: 0.45,
        }, '-=0.1')

        tl.to(layer2Ref.current, {
            xPercent: 0,
            duration: 0.45,
        }, '-=0.35')

        tl.to(layer3Ref.current, {
            xPercent: 0,
            duration: 0.45,
        }, '-=0.35')

        tl.to(menuContentRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.25,
        }, '-=0.2')

        tl.to(items, {
            autoAlpha: 1,
            x: 0,
            stagger: 0.06,
            duration: 0.3,
        }, '-=0.2')

        tl.to(bookBtnRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
        })

        tlRef.current = tl

        return () => {
            tl.kill()
        }
    }, [])

    /* ───────── Open/Close menu ───────── */
    useEffect(() => {
        if (!tlRef.current) return

        if (isMobileMenuOpen) {
            tlRef.current.play()
        } else {
            tlRef.current.reverse()
        }
    }, [isMobileMenuOpen])

    const toggleMenu = () => setIsMobileMenuOpen(v => !v)
    const closeMenu = () => setIsMobileMenuOpen(false)
    const isActivePath = (url) => location.pathname === url || location.pathname.startsWith(`${url}/`)

    const barColor = isMobileMenuOpen
        ? '#fff'
        : isScrolled
        ? '#374151'
        : '#fff'

    return (
        <>
            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/70 backdrop-blur-md shadow'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/">
                        <img
                            src="/images/logo.png"
                            className="w-28"
                            alt="logo"
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map(item => {
                            const active = isActivePath(item.url)

                            return (
                                <Link
                                    key={item.url}
                                    to={item.url}
                                    className={`text-md uppercase font-semibold tracking-widest ${
                                        active
                                            ? 'text-amber-500'
                                            : isScrolled
                                            ? 'text-black'
                                            : 'text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}

                        <Link to="/booking" className="px-4 py-1 tracking-[0.33px] bg-amber-500 text-white text-md rounded">
                            Book Now
                        </Link>
                    </div>

                    {/* HAMBURGER */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col gap-1"
                        style={{ color: barColor }}
                    >
                        <span className="w-6 h-[2px] bg-current" />
                        <span className="w-6 h-[2px] bg-current" />
                        <span className="w-6 h-[2px] bg-current" />
                    </button>
                </div>
            </nav>

            {/* OVERLAY */}
            <div
                ref={overlayRef}
                onClick={closeMenu}
                className="fixed inset-0 bg-black/50 z-[100] opacity-0 invisible md:hidden"
            />

            {/* LAYERS */}
            <div ref={layer1Ref} className="fixed top-0 left-0 h-full w-64 bg-amber-500 z-[110] md:hidden" />
            <div ref={layer2Ref} className="fixed top-0 left-0 h-full w-60 bg-green-700 z-[120] md:hidden" />
            <div ref={layer3Ref} className="fixed top-0 left-0 h-full w-56 bg-black z-[130] md:hidden" />

            {/* MOBILE MENU */}
            <div
                ref={menuContentRef}
                className="fixed top-0 left-0 h-full w-56 z-[140] flex flex-col pt-20 px-6 md:hidden"
            >
                {navItems.map((item, i) => {
                    const active = isActivePath(item.url)

                    return (
                        <Link
                            key={item.url}
                            to={item.url}
                            ref={el => (menuItemRefs.current[i] = el)}
                            onClick={closeMenu}
                            className={`py-3 border-b border-white/10 text-sm uppercase ${
                                active
                                    ? 'text-amber-400'
                                    : 'text-white'
                            }`}
                        >
                            {item.name}
                        </Link>
                    )
                })}

                <Link
                    to="/contact"
                    ref={bookBtnRef}
                    onClick={closeMenu}
                    className="mt-6 px-4 py-2 bg-amber-500 text-white text-sm"
                >
                    Book Now
                </Link>
            </div>
        </>
    )
}

export default Navbar
