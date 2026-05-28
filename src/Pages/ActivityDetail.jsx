import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import activityData from '../data/activitydata.json';
import { Helmet } from 'react-helmet-async'; // Add this import
import { SITE_URL } from '../seo/site';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const getActivityBySlug = (slug) =>
  activityData.activities.find((a) => a.slug === slug) || activityData.activities[0];

// ── Inline SVG icons ────────────────────────────────────────────────
const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
const GroupIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

// ── Booking Form ─────────────────────────────────────────────────────
const BookingForm = ({ activityTitle, price }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.date) e.date = 'Please select a date';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  // Animate form in
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, []);

  const inputClass = (field) =>
    `w-full bg-white/80 border ${
      errors[field] ? 'border-red-400' : 'border-stone-200'
    } rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#FAA821] focus:ring-2 focus:ring-[#FAA821]/20 transition-all duration-200`;

  const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1.5';

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#FAA821] flex items-center justify-center text-white shadow-lg shadow-[#FAA821]/30">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-bold text-stone-800">Booking Request Sent!</h3>
        <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
          We've received your request for <span className="font-semibold text-[#FAA821]">{activityTitle}</span>.
          Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', date: '', guests: '1', message: '' }); }}
          className="mt-2 text-xs uppercase tracking-widest text-[#FAA821] underline underline-offset-4"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef} className="opacity-0">
      {/* Price badge */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Starting from</p>
          <p className="text-2xl font-bold text-[#FAA821]">{price}</p>
          <p className="text-xs text-stone-400">per person</p>
        </div>
        <span className="bg-[#FAA821]/10 text-[#FAA821] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#FAA821]/20">
          Book Now
        </span>
      </div>

      <div className="w-full h-px bg-stone-100 mb-6" />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email + Phone row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+977 98XXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              className={inputClass('phone')}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Date + Guests row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Preferred Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={inputClass('date')}
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className={labelClass}>No. of Guests</label>
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={inputClass('guests')}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Special requests */}
        <div>
          <label className={labelClass}>Special Requests <span className="normal-case text-stone-300">(optional)</span></label>
          <textarea
            name="message"
            rows={3}
            placeholder="Any dietary needs, accessibility requirements, or questions..."
            value={form.message}
            onChange={handleChange}
            className={`${inputClass('message')} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-[#FAA821] hover:bg-[#e8971a] text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#FAA821]/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <SendIcon />
              Confirm Booking Request
            </>
          )}
        </button>

        <p className="text-center text-xs text-stone-400 leading-relaxed">
          By submitting you agree to our terms. A team member will confirm availability.
        </p>
      </form>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────
const ActivityDetail = () => {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const activity  = getActivityBySlug(slug);
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroRef           = useRef(null);
  const textRef           = useRef(null);
  const contentSectionRef = useRef(null);
  const maskRef           = useRef(null);
  const contentRef        = useRef(null);
  const featuresRef       = useRef(null);
  const formSectionRef    = useRef(null);

  const relatedActivities = activityData.activities
    .filter((a) => a.slug !== activity?.slug)
    .slice(0, 3);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % relatedActivities.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + relatedActivities.length) % relatedActivities.length);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
  }, [slug]);

  useEffect(() => {
    if (!activity) return;

    const ctx = gsap.context(() => {
      // 1. Hero text: animate in immediately
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      // 2. Content panel slides up on scroll
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

      // 3. Mask SVG animates on scroll
      if (maskRef.current && heroRef.current) {
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
        );
      }

      // 4. Content children: animate on mount
      const children = Array.from(contentRef.current?.children ?? []);
      if (children.length > 0) {
        gsap.set(children, { opacity: 0, y: 40, scale: 0.97 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.2,
          clearProps: 'all',
        });
      }

      // 5. Features list stagger (scroll-based)
      if (featuresRef.current && featuresRef.current.children.length > 0) {
        gsap.fromTo(
          Array.from(featuresRef.current.children),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
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

      // 6. Form section fade-in on scroll
      if (formSectionRef.current) {
        gsap.fromTo(
          formSectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: 'top 85%',
              once: true,
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
  }, [slug, activity]);

  if (!activity) {
    return (
      <>
        <Helmet>
          <title>Activity Not Found | Adventure Activities</title>
          <meta name="description" content="The adventure activity you're looking for could not be found. Explore our other exciting adventure activities and experiences." />
          <link rel="canonical" href={`${SITE_URL}/activities`} />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center px-4 text-center text-stone-500">
          <div>
            <p className="text-xl">Activity not found.</p>
            <button onClick={() => navigate('/activities')} className="mt-4 text-[#FAA821] underline">
              Back to Activities
            </button>
          </div>
        </div>
      </>
    );
  }

  const heroImage = activity.heroImage || activity.image || '/images/service-default.jpeg';

  const maskStyle = {
    WebkitMaskImage: "url('/images/bg2.png')",
    maskImage: "url('/images/bg2.png')",
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  };

  // Generate SEO meta data based on activity
  const seoTitle = `${activity.title} | Book Your Adventure Today`;
  const seoDescription = activity.seoDescription || activity.description || `${activity.title} - ${activity.duration} adventure. ${activity.intro} Book your spot now for an unforgettable experience.`;
  const canonicalUrl = `${SITE_URL}/activities/${activity.slug}`;

  // ── Info Pill ─────────────────────────────────────────────────────
  const InfoPill = ({ icon, label, value }) => (
    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-stone-100 rounded-2xl px-4 py-3 shadow-sm">
      <span className="text-[#FAA821]">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold leading-none mb-0.5">{label}</p>
        <p className="text-sm font-bold text-stone-800 leading-none">{value}</p>
      </div>
    </div>
  );

  // ── Related Activity Card ─────────────────────────────────────────
  const ActivityCard = ({ activity: rel }) => {
    const img = rel.heroImage || rel.image;
    return (
      <Link to={`/activities/${rel.slug}`} className="group block w-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full transition duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...maskStyle,
            }}
          />
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', ...maskStyle }}
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#FAA821]">
              {rel.tagline}
            </p>
            <h3 className="mt-1 sm:mt-2 text-base sm:text-xl font-bold text-white leading-snug">
              {rel.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={heroImage} />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative bg-white w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <img
          src={heroImage}
          alt={activity.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/45 z-10" />

        {/* Back button */}
        <div className="absolute top-5 left-4 sm:top-6 sm:left-6 z-30">
          <button
            onClick={() => navigate('/activities')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/80 transition hover:text-white"
          >
            
          </button>
        </div>

        {/* Hero text */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
          <div ref={textRef} className="text-center px-4 max-w-4xl mx-auto">
            <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FAA821]">
              {activity.tagline}
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              {activity.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {activity.intro}
            </p>
          </div>
        </div>

        {/* Content panel — slides up over hero on scroll */}
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
            <img
              src="/images/mask.svg"
              alt="mask"
              className="w-full h-full object-cover object-top invert"
            />
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
                Activity Detail
              </button>
              <div className="text-center">
                <div className="w-10 h-px bg-[#FAA821] mb-3 mx-auto" />
                <h2 className="text-[#faa821] text-xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-2xl">
                  {activity.title}
                </h2>
              </div>
            </div>

            {/* Image left / text + info right */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 mt-4 sm:mt-6 max-w-6xl mx-auto w-full">
              {/* Left: masked image */}
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <div
                  className="bg-cover bg-center relative w-full"
                  style={{
                    backgroundImage: `url(${heroImage})`,
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

              {/* Right: description + features */}
              <div className="flex flex-col justify-center text-left lg:w-1/2 gap-4 sm:gap-5">
                <p className="text-black/90 text-sm sm:text-base md:text-xl tracking-wide leading-relaxed">
                  {activity.description}
                </p>
                {activity.longDescription && (
                  <p className="text-black/90 text-sm sm:text-base md:text-xl tracking-wide leading-relaxed">
                    {activity.longDescription}
                  </p>
                )}

                {/* Quick info pills */}
                <div className="grid grid-cols-2 gap-2.5 mt-1">
                  <InfoPill icon={<ClockIcon />} label="Duration" value={activity.duration} />
                  <InfoPill icon={<StarIcon />} label="Difficulty" value={activity.difficulty} />
                  <InfoPill icon={<UserIcon />} label="Min Age" value={`${activity.minAge}+ years`} />
                  <InfoPill icon={<GroupIcon />} label="Group Size" value={activity.groupSize} />
                </div>

                {/* Features list */}
                {activity.features?.length > 0 && (
                  <ul ref={featuresRef} className="flex flex-col gap-2 mt-2">
                    {activity.features.map((feature, i) => (
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

      {/* ── BOOKING FORM SECTION ───────────────────────────────────── */}
      <section ref={formSectionRef} className="px-4 py-14 sm:py-20 sm:px-6 lg:px-10 bg-stone-50 opacity-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Left: Info column */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              {/* Section label */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FAA821] mb-2">
                  Reserve Your Spot
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                  Book {activity.title}
                </h2>
                <div className="w-10 h-0.5 bg-[#FAA821] mt-3" />
              </div>

              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                Ready for an unforgettable adventure? Fill out the form and our team will confirm
                your booking within 24 hours. We'll take care of everything else.
              </p>

              {/* Summary cards */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  {/* <div className="w-10 h-10 rounded-xl bg-[#FAA821]/10 flex items-center justify-center text-[#FAA821] flex-shrink-0">
                    <ClockIcon />
                  </div> */}
                  <div>
                    <p className="text-lg uppercase tracking-widest text-stone-400 font-semibold">Duration</p>
                    <p className="text-md font-bold text-stone-800">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  {/* <div className="w-10 h-10 rounded-xl bg-[#FAA821]/10 flex items-center justify-center text-[#FAA821] flex-shrink-0">
                    <StarIcon />
                  </div> */}
                  <div>
                    <p className="text-lg uppercase tracking-widest text-stone-400 font-semibold">Difficulty</p>
                    <p className="text-md font-bold text-stone-800">{activity.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  {/* <div className="w-18 h-18 rounded-xl bg-[#FAA821]/10 flex items-center justify-center text-[#FAA821] flex-shrink-0">
                    <GroupIcon />
                  </div> */}
                  <div>
                    <p className="text-lg uppercase tracking-widest text-stone-400 font-semibold">Max Weight</p>
                    <p className="text-md font-bold text-stone-800">{activity.maxWeight}</p>
                  </div>
                </div>
              </div>

              {/* Reassurance note */}

            </div>

            {/* Right: Form card */}
            <div className="w-full lg:w-3/5 bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/80 p-6 sm:p-8">
              <h3 className="text-base font-bold text-stone-800 mb-1">Your Booking Details</h3>
              <p className="text-xs text-stone-400 mb-6">All fields marked are required to confirm your reservation.</p>
              <BookingForm activityTitle={activity.title} price={activity.price} />
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ACTIVITIES ────────────────────────────────────── */}
      <section className="px-4 py-12 sm:py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FAA821]">
              Explore More
            </p>
            <h2 className="mt-2 sm:mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
              Other Adventures
            </h2>
          </div>

          {/* Mobile: touch-friendly slider */}
          <div className="block sm:hidden relative">
            <div className="overflow-hidden rounded-sm">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {relatedActivities.map((rel) => (
                  <div key={rel.id} className="w-full flex-shrink-0">
                    <ActivityCard activity={rel} />
                  </div>
                ))}
              </div>
            </div>
            {relatedActivities.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Previous activity"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-[#FAA821] rounded-full flex items-center justify-center text-white transition z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next activity"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-[#FAA821] rounded-full flex items-center justify-center text-white transition z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            {relatedActivities.length > 1 && (
              <div className="flex justify-center gap-2 mt-5">
                {relatedActivities.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-[#FAA821]' : 'w-2 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden sm:grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedActivities.map((rel) => (
              <ActivityCard key={rel.id} activity={rel} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityDetail;
