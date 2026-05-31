import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../seo/site';
import parse from 'html-react-parser';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// ── Helper function to get image URL ──────────────────────────────
const getImageUrl = (activity, imgurl) => {
  if (!activity) return '/images/service-default.jpeg';
  
  // Check for images array first
  if (activity.images && activity.images.length > 0) {
    // Find cover image or first image
    const coverImage = activity.images.find(img => img.is_cover === 1) || activity.images[0];
    if (coverImage && coverImage.path) {
      return `${imgurl}/${coverImage.path}`;
    }
  }
  
  // Fallback to hero_image or image fields
  if (activity.hero_image) return `${imgurl}/${activity.hero_image}`;
  if (activity.heroImage) return `${imgurl}/${activity.heroImage}`;
  if (activity.image) return `${imgurl}/${activity.image}`;
  
  // Default fallback
  return '/images/service-default.jpeg';
};

// ── Booking Form with Verification ──────────────────────────────────
const BookingForm = ({ activityTitle, price, onSubmit }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userVerificationCode, setUserVerificationCode] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Generate random verification code
  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    return code;
  };

  // Generate new code on component mount
  useEffect(() => {
    generateVerificationCode();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.date) e.date = 'Please select a date';
    if (!userVerificationCode) e.verification = 'Please enter verification code';
    if (userVerificationCode !== verificationCode) e.verification = 'Invalid verification code';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    // Clear submit status when user starts typing
    if (submitStatus.message) setSubmitStatus({ type: '', message: '' });
  };

  const handleVerificationChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setUserVerificationCode(value);
    if (errors.verification) setErrors((prev) => ({ ...prev, verification: '' }));
  };

  const refreshVerificationCode = () => {
    generateVerificationCode();
    setUserVerificationCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { 
      setErrors(v); 
      return; 
    }
    
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If onSubmit prop is provided, call it with form data
      if (onSubmit) {
        await onSubmit({ ...form, activityTitle });
      }
      
      setSubmitStatus({
        type: 'success',
        message: `Booking request for ${activityTitle} sent successfully! We'll contact you within 24 hours.`
      });
      setSubmitted(true);
      
      // Reset verification code for next booking
      generateVerificationCode();
      setUserVerificationCode('');
      
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
      setLoading(false);
    }
  };

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
    `w-full bg-white/80 border ${errors[field] ? 'border-red-400' : 'border-stone-200'
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
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', phone: '', date: '', guests: '1', message: '' });
            setUserVerificationCode('');
            generateVerificationCode();
            setSubmitStatus({ type: '', message: '' });
          }}
          className="mt-2 text-xs uppercase tracking-widest text-[#FAA821] underline underline-offset-4"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef} className="opacity-0">
      {/* Status Message */}
      {submitStatus.message && (
        <div className={`mb-4 p-3 rounded-xl ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email *</label>
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
            <label className={labelClass}>Phone *</label>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Preferred Date *</label>
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
            <label className={labelClass}>No. of Guests *</label>
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

        <div>
          <label className={labelClass}>
            Special Requests <span className="normal-case text-stone-300">(optional)</span>
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Any dietary needs, accessibility requirements, or questions..."
            value={form.message}
            onChange={handleChange}
            className={`${inputClass('message')} resize-none`}
          />
        </div>

        {/* Verification Code Section */}
        <div>
          <label className={labelClass}>Verification Code *</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={userVerificationCode}
                    onChange={handleVerificationChange}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#FAA821] font-mono text-center text-lg tracking-wider"
                  />
                </div>
                <button
                  type="button"
                  onClick={refreshVerificationCode}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-xl transition-colors text-stone-700 text-sm font-semibold flex items-center gap-2"
                >
                  <RefreshIcon />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-stone-200 p-3 text-center">
                <p className="text-xs text-stone-500 mb-1">Enter this code:</p>
                <p className="font-mono text-2xl font-bold tracking-wider text-[#FAA821] select-none">
                  {verificationCode}
                </p>
              </div>
            </div>
          </div>
          
          {errors.verification && (
            <p className="text-red-400 text-xs mt-2">{errors.verification}</p>
          )}
          {!errors.verification && userVerificationCode && userVerificationCode === verificationCode && (
            <p className="text-green-600 text-xs mt-2">✓ Code verified successfully</p>
          )}
          {!errors.verification && userVerificationCode && userVerificationCode !== verificationCode && (
            <p className="text-red-400 text-xs mt-2">✗ Code does not match</p>
          )}
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

// ── Loading Skeleton ─────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-stone-100 animate-pulse">
    <div className="w-full h-screen bg-stone-300" />
    <div className="px-4 py-20 max-w-6xl mx-auto flex flex-col gap-6">
      <div className="h-8 bg-stone-300 rounded w-1/3 mx-auto" />
      <div className="h-4 bg-stone-200 rounded w-2/3 mx-auto" />
      <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto" />
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────
const ActivityDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [relatedActivities, setRelatedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imgurl = import.meta.env.VITE_IMAGE_PATH;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const contentSectionRef = useRef(null);
  const maskRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);
  const formSectionRef = useRef(null);

  // Handle booking form submission
  const handleBookingSubmit = async (bookingData) => {
    try {
      // Here you would typically send the booking data to your backend
      // Example API call:
      // await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      
      console.log('Booking submitted:', bookingData);
      
      // You can also send an email notification here
      // For now, we'll just log it
      return { success: true };
    } catch (error) {
      console.error('Booking submission error:', error);
      throw error;
    }
  };

  // ── Fetch activity by slug from API ─────────────────────────────
  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      setError(false);
      setActivity(null);
      setRelatedActivities([]);

      try {
        const response = await axios.get(`${API_BASE_URL}/activities/${slug}`);
        const data = response.data?.data ?? response.data;
        setActivity(data);

        const allResponse = await axios.get(`${API_BASE_URL}/activities`);
        const allData = allResponse.data?.data ?? allResponse.data;

        const related = (Array.isArray(allData) ? allData : [])
          .filter((a) => a.slug !== slug && a.is_archived === 1)
          .slice(0, 3);

        setRelatedActivities(related);
      } catch (err) {
        console.error('Error fetching activity:', err);

        try {
          const allResponse = await axios.get(`${API_BASE_URL}/activities`);
          const allData = allResponse.data?.data ?? allResponse.data;
          const found = (Array.isArray(allData) ? allData : []).find(
            (a) => a.slug === slug && a.is_archived === 1
          );

          if (found) {
            setActivity(found);
            const related = allData
              .filter((a) => a.slug !== slug && a.is_archived === 1)
              .slice(0, 3);
            setRelatedActivities(related);
          } else {
            setError(true);
          }
        } catch {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchActivity();
    }
  }, [slug, API_BASE_URL]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
  }, [slug]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % relatedActivities.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + relatedActivities.length) % relatedActivities.length);

  useEffect(() => {
    if (!activity || loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

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
  }, [slug, activity, loading]);

  if (loading) return <LoadingSkeleton />;

  if (error || !activity) {
    return (
      <>
        <Helmet>
          <title>Activity Not Found | Adventure Activities</title>
          <meta name="description" content="The adventure activity you're looking for could not be found." />
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

  const heroImage = getImageUrl(activity, imgurl);
  const activityTitle = activity.name || activity.title;
  const activityTagline = activity.tagline || '';
  const activityIntro = activity.intro || activity.short_description || '';
  const activityDescription = activity.description || '';
  const activityLongDescription = activity.long_description || activity.longDescription || '';
  const activityDuration = activity.duration || 'N/A';
  const activityDifficulty = activity.difficulty || 'N/A';
  const activityMinAge = activity.min_age || activity.minAge || 'N/A';
  const activityGroupSize = activity.group_size || activity.groupSize || 'N/A';
  const activityMaxWeight = activity.max_weight || activity.maxWeight || 'N/A';
  const activityPrice = activity.base_price ? `Rs. ${parseFloat(activity.base_price).toLocaleString()}` : activity.price || 'Contact us';
  
  const extractFeaturesFromHtml = (html) => {
    if (!html) return [];
    const features = [];
    const liMatches = html.match(/<li>(.*?)<\/li>/g);
    if (liMatches) {
      liMatches.forEach(li => {
        const text = li.replace(/<[^>]*>/g, '').trim();
        if (text) features.push(text);
      });
    }
    return features;
  };
  
  const activityFeatures = Array.isArray(activity.features)
    ? activity.features
    : typeof activity.features === 'string'
      ? JSON.parse(activity.features)
      : extractFeaturesFromHtml(activity.long_description);

  const maskStyle = {
    WebkitMaskImage: "url('/images/bg2.png')",
    maskImage: "url('/images/bg2.png')",
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  };

  const seoTitle = `${activityTitle} | Book Your Adventure Today`;
  const seoDescription = activity.seo_description || activity.seoDescription || activityDescription || `${activityTitle} - ${activityDuration} adventure. Book your spot now.`;
  const canonicalUrl = `${SITE_URL}/activities/${slug}`;

  const InfoPill = ({ icon, label, value }) => (
    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-stone-100 rounded-2xl px-4 py-3 shadow-sm">
      <span className="text-[#FAA821]">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold leading-none mb-0.5">{label}</p>
        <p className="text-sm font-bold text-stone-800 leading-none">{value}</p>
      </div>
    </div>
  );

  const ActivityCard = ({ activity: rel }) => {
    const img = getImageUrl(rel, imgurl);
    const relTitle = rel.name || rel.title;
    const relTagline = rel.tagline || '';
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
              {relTagline}
            </p>
            <h3 className="mt-1 sm:mt-2 text-base sm:text-xl font-bold text-white leading-snug">
              {relTitle}
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

      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="relative bg-white w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <img
          src={heroImage}
          alt={activityTitle}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
          onError={(e) => {
            console.error('Failed to load image:', heroImage);
            e.target.src = '/images/service-default.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-black/45 z-10" />

        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
          <div ref={textRef} className="text-center px-4 max-w-4xl mx-auto">
            <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FAA821]">
              {activityTagline}
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              {activityTitle}
            </h1>
            <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-xl max-w-xl mx-auto leading-relaxed">
              {activityIntro}
            </p>
          </div>
        </div>

        <div
          ref={contentSectionRef}
          className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden min-h-[70vh] sm:min-h-[105vh]"
          style={{ top: 'auto' }}
        >
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

          <div
            ref={contentRef}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-4 sm:px-8 pt-16 sm:pt-52 pb-12 sm:pb-16 mt-32 sm:mt-0"
          >
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
                  {activityTitle}
                </h2>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 mt-4 sm:mt-6 max-w-6xl mx-auto w-full">
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

              <div className="flex flex-col justify-center text-left lg:w-1/2 gap-4 sm:gap-5">
                <p className="text-black/90 text-base sm:text-lg md:text-xl tracking-wide leading-relaxed">
                  {activityDescription}
                </p>
                
                {activityLongDescription && (
                  <div className="long-description prose prose-stone max-w-none text-3xl">
                    {parse(activityLongDescription)}
                  </div>
                )}

                {activityFeatures.length > 0 && (
                  <ul ref={featuresRef} className="flex flex-col gap-2 mt-2">
                    {activityFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-black/80">
                        <span className="mt-1 w-2 h-2 rounded-full bg-[#FAA821] flex-shrink-0" />
                        {typeof feature === 'object' ? feature.feature || feature.text || '' : feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING FORM SECTION */}
      <section ref={formSectionRef} className="px-4 py-14 sm:py-20 sm:px-6 lg:px-10 bg-stone-50 opacity-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FAA821] mb-2">
                  Reserve Your Spot
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                  Book {activityTitle}
                </h2>
                <div className="w-10 h-0.5 bg-[#FAA821] mt-3" />
              </div>

              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                Ready for an unforgettable adventure? Fill out the form and our team will confirm
                your booking within 24 hours. We'll take care of everything else.
              </p>

             
            </div>

            <div className="w-full lg:w-3/5 bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/80 p-6 sm:p-8">
              <h3 className="text-base font-bold text-stone-800 mb-1">Your Booking Details</h3>
              <p className="text-xs text-stone-400 mb-6">All fields marked with * are required to confirm your reservation.</p>
              <BookingForm 
                activityTitle={activityTitle} 
                price={activityPrice} 
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RELATED ACTIVITIES */}
      {relatedActivities.length > 0 && (
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
                      className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#FAA821]' : 'w-2 bg-stone-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedActivities.map((rel) => (
                <ActivityCard key={rel.id} activity={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ActivityDetail;