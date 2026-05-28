import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Seo from '../Component/Seo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const API_BASE = 'http://127.0.0.1:8000/api';

const ServiceDetail = () => {
  const { slug }    = useParams();
  const navigate    = useNavigate();

  const [service, setService]             = useState(null);
  const [relatedServices, setRelated]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [currentIndex, setCurrentIndex]   = useState(0);

  const heroRef           = useRef(null);
  const textRef           = useRef(null);
  const contentSectionRef = useRef(null);
  const maskRef           = useRef(null);
  const contentRef        = useRef(null);
  const featuresRef       = useRef(null);

  // ── Fetch the single service by slug ──────────────────────────
  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setLoading(true);

    const fetchService = async () => {
      try {
        // Fetch this service's detail
        const res = await axios.get(`${API_BASE}/ourservice/${slug}`);
        const data = res.data.data;
        setService(data);

        // Fetch all services to build related list (only non-archived shown as related)
        const allRes = await axios.get(`${API_BASE}/ourservice`);
        const others = allRes.data.data
          .filter((s) => s.slug !== slug && (s.is_archived === true || s.is_archived === 1))
          .slice(0, 3);
        setRelated(others);
      } catch (error) {
        console.error('Error fetching service detail:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // ── GSAP animations ───────────────────────────────────────────
  useEffect(() => {
    if (!service || loading) return;

    const ctx = gsap.context(() => {
      // Hero text
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        );
      }

      // Content panel slides up on scroll
      if (contentSectionRef.current && heroRef.current) {
        gsap.fromTo(
          contentSectionRef.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              pin: heroRef.current,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Mask animation
      if (maskRef.current && heroRef.current) {
        gsap.fromTo(
          maskRef.current,
          { scale: 1, opacity: 0, rotateZ: -5 },
          {
            scale: 1, opacity: 1, rotateZ: 0, duration: 1.5, ease: 'back.out(0.5)',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top center',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Content children stagger on mount
      const children = Array.from(contentRef.current?.children ?? []);
      if (children.length > 0) {
        gsap.set(children, { opacity: 0, y: 40, scale: 0.97 });
        gsap.to(children, {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          stagger: 0.08, ease: 'power2.out', delay: 0.2, clearProps: 'all',
        });
      }

      // Features list
      if (featuresRef.current && featuresRef.current.children.length > 0) {
        gsap.fromTo(
          Array.from(featuresRef.current.children),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, heroRef);

    let rafId;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener('resize', onResize);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, [slug, service, loading]);

  // ── Slider controls ───────────────────────────────────────────
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % relatedServices.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + relatedServices.length) % relatedServices.length);

  // ── Helpers ───────────────────────────────────────────────────

  // Parse meta_data (may be object or JSON string) and return a plain object
  const parseMeta = (meta_data) => {
    if (!meta_data) return {};
    if (typeof meta_data === 'object') return meta_data;
    try { return JSON.parse(meta_data); } catch { return {}; }
  };

  // Pull a description string from meta_data or fall back to short_description / default
  const getDescription = (svc) => {
    if (svc.short_description) return svc.short_description;
    const meta = parseMeta(svc.meta_data);
    return meta.description || meta.subtitle || meta.short_description
      || 'Experience premium hospitality and unforgettable moments at Harness Resort.';
  };

  // Pull a long description from long_description or meta_data
  const getLongDescription = (svc) => {
    if (svc.long_description) return svc.long_description;
    const meta = parseMeta(svc.meta_data);
    return meta.long_description || meta.longDescription || null;
  };

  // Pull features array from meta_data if present
  const getFeatures = (svc) => {
    const meta = parseMeta(svc.meta_data);
    return Array.isArray(meta.features) ? meta.features : [];
  };

  // Pull tagline from meta_data
  const getTagline = (svc) => {
    const meta = parseMeta(svc.meta_data);
    return meta.tagline || meta.subtitle || '';
  };

  // ── Loading state ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-[#FAA821] text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────
  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center text-stone-500">
        <div>
          <p className="text-xl">Service not found.</p>
          <button onClick={() => navigate('/services')} className="mt-4 text-[#FAA821] underline">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // ── Derived values ────────────────────────────────────────────
  const heroImage     = service.image || '/images/service-default.jpeg';
  const tagline       = getTagline(service);
  const description   = getDescription(service);
  const longDesc      = getLongDescription(service);
  const features      = getFeatures(service);
  const seoTitle      = `${service.name} | Harness Zipline & Adventure Resort`;
  const seoDescription = description;

  const maskStyle = {
    WebkitMaskImage: "url('/images/bg2.png')",
    maskImage: "url('/images/bg2.png')",
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  };

  // ── Related service card ──────────────────────────────────────
  const ServiceCard = ({ service: rel }) => {
    const img      = rel.first_image || '/images/service-default.jpeg';
    const relMeta  = parseMeta(rel.meta_data);
    const relTag   = relMeta.tagline || relMeta.subtitle || '';

    return (
      <Link to={`/services/${rel.slug}`} className="group block w-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full transition duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('http://127.0.0.1:8000/storage/${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', ...maskStyle }}
          />
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...maskStyle }}
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
            {relTag && (
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#FAA821]">
                {relTag}
              </p>
            )}
            <h3 className="mt-1 sm:mt-2 text-base sm:text-xl font-bold text-white leading-snug">
              {rel.name}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={`/services/${service.slug}`}
        image={heroImage}
        keywords={`${service.name}, Harness services, Kusma resort services, Nepal event venue`}
      />

      {/* HERO */}
      <div ref={heroRef} className="relative bg-white w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>
        <img
          src={`http://127.0.0.1:8000/storage/${heroImage}`}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Hero text */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
          <div ref={textRef} className="text-center px-4 max-w-4xl mx-auto">
            {tagline && (
              <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FAA821]">
                {tagline}
              </p>
            )}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              {service.name}
            </h1>
            <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* CONTENT PANEL — slides up on scroll */}
        <div
          ref={contentSectionRef}
          className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
          style={{ top: 'auto' }}
        >
          {/* Mask SVG */}
          <div
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{ transformOrigin: 'center center', opacity: 0 }}
          >
            <img src="/images/mask.svg" alt="mask" className="w-full h-full object-cover object-top invert" />
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-4 sm:px-8 pt-16 sm:pt-52 pb-12 sm:pb-16 mt-32 sm:mt-0"
          >
            {/* Header block */}
            <div className="flex flex-col items-center gap-4 sm:gap-5 text-center">
              <button
                className="text-white px-6 sm:px-8 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold"
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
                About This Service
              </button>

              <div className="text-center">
                <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
                <h2 className="text-[#faa821] text-xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-2xl">
                  {service.name}
                </h2>
              </div>
            </div>

            {/* Image left / text right */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 mt-4 sm:mt-6 max-w-6xl mx-auto w-full">
              {/* Left: masked image */}
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <div
                  className="bg-cover bg-center relative w-full"
                  style={{
                    backgroundImage: `url(http://127.0.0.1:8000/storage/${heroImage})`,
                    maskImage: "url('/images/mask.png')",
                    WebkitMaskImage: "url('/images/mask.png')",
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    height: 'clamp(220px, 45vw, 400px)',
                    maxWidth: '100%',
                    filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',
                  }}
                />
              </div>

              {/* Right: text */}
              <div className="flex flex-col justify-center text-left lg:w-1/2 gap-4 sm:gap-5">
                <p className="text-black/90 text-sm sm:text-base md:text-xl tracking-wide leading-relaxed">
                  {description}
                </p>

                {longDesc && (
                  // long_description may contain HTML from the Quill editor
                  <div
                    className="text-black/90 text-sm sm:text-base md:text-xl tracking-wide leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: longDesc }}
                  />
                )}

                {features.length > 0 && (
                  <ul ref={featuresRef} className="flex flex-col gap-2 mt-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-black/80">
                        <span className="mt-1 w-2 h-2 rounded-full bg-[#FAA821] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="px-4 py-12 sm:py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FAA821]">Explore More</p>
              <h2 className="mt-2 sm:mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">Other Experiences</h2>
            </div>

            {/* Mobile slider */}
            <div className="block sm:hidden relative">
              <div className="overflow-hidden rounded-sm">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {relatedServices.map((rel) => (
                    <div key={rel.id} className="w-full flex-shrink-0">
                      <ServiceCard service={rel} />
                    </div>
                  ))}
                </div>
              </div>

              {relatedServices.length > 1 && (
                <>
                  <button onClick={prevSlide} aria-label="Previous service" className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-[#FAA821] rounded-full flex items-center justify-center text-white transition z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={nextSlide} aria-label="Next service" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-[#FAA821] rounded-full flex items-center justify-center text-white transition z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="flex justify-center gap-2 mt-5">
                    {relatedServices.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#FAA821]' : 'w-2 bg-stone-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop grid */}
            <div className="hidden sm:grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.id} service={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetail;