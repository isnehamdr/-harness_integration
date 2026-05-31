import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/testimonials`);
          const data = response.data.data;
          setTestimonials(data);
        } catch (error) {
          console.error("fetching error", error);
        }
      };
      fetchTestimonials();
    }, []);

    console.log(testimonials);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }

    // Function to strip HTML tags from long_description
    const stripHtmlTags = (html) => {
        if (!html) return "";
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    return (
        <div className="relative max-w-7xl mx-auto mt-12 z-10 flex flex-col px-4 sm:px-6 lg:px-8">
            <div
                className="w-full flex items-center justify-center p-4 sm:p-8"
                style={{
                    backgroundColor: "#FAA821",
                    maskImage: "url('/images/check.png')",
                    WebkitMaskImage: "url('/images/check.png')",
                    maskSize: "cover",
                    WebkitMaskSize: "cover",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                }}
            >
                <div className="text-center w-full max-w-[1200px] mx-auto py-12 sm:py-16">
                    <button
                        className="text-[#FAA821] px-6 sm:px-8 py-2 mb-6 text-sm uppercase tracking-widest font-semibold transition-colors duration-300"
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
                        <h3>Testimonials</h3>
                    </button>

                    <h2 className="text-[#1b6934] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl">
                        What Our Guests Say
                    </h2>

                    <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-12">
                        Don't just take our word for it - hear from our valued guests about their transformative experiences
                    </p>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="p-6 md:p-8">
                                    {/* Rating Stars - Using a default rating of 5 since your API doesn't have rating field */}
                                    <div className="flex gap-1 mb-4">
                                        {renderStars(5)}
                                    </div>

                                    {/* Testimonial Text - Using long_description or short_description */}
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 italic">
                                        "{stripHtmlTags(testimonial.long_description) || testimonial.short_description || 'No description available'}"
                                    </p>

                                    {/* Divider */}
                                    <div className="w-12 h-0.5 bg-[#FAA821] mb-4"></div>

                                    {/* Guest Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#FAA821] flex items-center justify-center text-white font-bold text-xl">
                                            {testimonial.fullname ? testimonial.fullname.charAt(0) : '?'}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-gray-800">
                                                {testimonial.fullname || 'Anonymous'}
                                            </h4>
                                            <p className="text-gray-500 text-sm">
                                                {testimonial.address || 'Location not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials