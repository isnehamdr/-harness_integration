import React from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../seo/site'

const Footer = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Rooms & Suites", href: "/rooms" },
        { name: "Contact", href: "/contact" }
    ]

    const platforms = [
        { name: "Booking.com", logo: "/images/icons/booking.png", link: "https://www.booking.com/hotel/np/harness-zipline-and-adventure-resort.en-gb.html?aid=2375516&label=01J1X42R3M4D4ZBF77BKWAKKWV_01KQ6XAZYWG5PEAX9HZN5GSVYY" },
        { name: "Expedia", logo: "/images/icons/expedia.png", link: "https://www.expedia.com/Godaam-Hotels-Harness-Zipline-And-Adventure-Resort.h111727520.Hotel-Information?chkin=2026-05-04&chkout=2026-05-06&x_pwa=1&rfrr=HSR&pwa_ts=1777274903773&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20vSG90ZWwtU2VhcmNo&useRewards=false&rm1=a2&regionId=868423492753063936&destination=Godaam%2C+Gandaki%2C+Nepal&destType=MARKET&selected=111727520&latLong=28.224015%2C83.678406&sort=RECOMMENDED&top_dp=220&top_cur=USD&userIntent=&selectedRoomType=325858402&selectedRatePlan=399491583&categorySearch=any_option&searchId=83d2d9d4-d0bd-475c-840f-be702df0a6f6" },
        { name: "TripAdvisor", logo: "/images/icons/tripadvisor.png", link: "https://www.tripadvisor.com/Hotel_Review-g15320296-d32974652-Reviews-Harness_Zipline_And_Adventure_Resort-Kushma_Dhaulagiri_Zone_Western_Region.html" },
        { name: "Agoda", logo: "/images/icons/agoda.png", link: "https://www.agoda.com/en-gb/harness-zipline-and-adventure-resort/hotel/ghode-pani-np.html?countryId=120&finalPriceView=1&isShowMobileAppPrice=false&cid=1922893&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2026-05-6&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=USD&isFreeOccSearch=false&tag=e8270226-244d-4884-85d9-8fe4141dae0b&los=1&searchrequestid=25f4cef2-7cf5-4a99-af8a-cfe09900686e&ds=hvTz%2BBwGuEyV%2FSyx" },
        { name: "Trip.com", logo: "/images/icons/trip.com.png", link: "https://www.trip.com/hotels/detail/?cityEnName=Kushma&cityId=285690&hotelId=121792880&checkIn=2026-04-27&checkOut=2026-04-28&adult=2&children=0&crn=1&ages=&curr=USD&barcurr=USD&hoteluniquekey=H4sIAAAAAAAA_-M6zMTFJMEktYeJY1dLy3Q2IUYDi9-CjgwgwFPp4LnO_WGViF-NQwBPIVjsQI5DI6MISPRIqsMMxg-XOq02Mhbacl1fLODlsIOR6QSj9QKmhv4Gm1MsrBy_WSVYLrFsZoyuVspOrVSyMtFRKsksyUlVslIKcwxR0lFKSS1OBnKArMTc_NK8EiDbXM_MGMgvSazwTAHrSE7MSS7NSSxJDaksAOo001HKLHYuKcosCErNzSwpSQWqSkvMKU4FiQelFgNlksGCSn5AY4qgApn5eRDtBihiYYk5pakQBwAtdEuF2mFYG_uIhSk69hMLwy-gN5ZKSbA0sTJ0sTJMYmXleG0swbKLlSvIzM830FA3StfwAmuMlLyhgYGBqaGxqamuQaKlhamBUYquiaWxmYU5kDIztdT4c_nFuzvGRrKnGKUMzU2NLcwNLA0MzAxN9FJSLCwzyk0TI5KTiz0Yg9hcLC0MnFyjbLiYQ4NdBHs13vLuC5B2kALxFGE8LRDPEMYLBEcMwwf7SIaJdb-tgCJJrKl5uhERGR9FChi7GLkFGD0YIxgrGBsYGVcxsnMxGxgZCjBtYGTcwfgfBhhfMYLMBAAVZqVcDgIAAA&masterhotelid_tracelogid=100051355-0a98502d-493687-49659&detailFilters=17%7C1%7E17%7E1*31%7C121792880%7E31%7E121792880*80%7C0%7C1%7E80%7E0*29%7C1%7E29%7E1%7C2&display=exavg&subStamp=1584&isCT=true&isFlexible=F&locale=en-XX" }
    ]

    const socialMedia = [
        { name: "Facebook", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" },
        { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
        { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.337-11.773c0-.211 0-.423-.015-.634A9.935 9.935 0 0024 4.59z" },
    ]

    return (
        <footer className="relative w-full flex flex-col">
            <div
                className="w-full flex items-center justify-center p-4 sm:p-8"
                style={{
                    backgroundColor: "#e4e1de",
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
                <div className="w-full max-w-6xl mx-auto pt-16 px-4">
                    <div className="flex justify-center mb-4">
                        <div className="text-center">
                            <img
                                src="/images/logo.png"
                                alt="Harness Logo"
                                className="h-20 w-auto mx-auto mb-4"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.href}
                                className="text-black hover:text-[#faa821] transition-colors duration-300 text-md md:text-lg font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h3 className="text-black text-center text-lg font-semibold mb-6">
                            Book With Confidence
                        </h3>

                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                            {platforms.map((platform, index) => (
                                <a
                                    key={index}
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#e4e1de] backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 p-2"
                                >
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className="w-16 opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="sm:flex gap-8 mb-12 justify-center text-center ">
                        <h3 className="text-black font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {CONTACT.address}
                        </h3>
                        <div>
                            <h3 className="text-black font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-black font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                            </h3>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-center space-x-6">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={`https://${social.name.toLowerCase()}.com/harnesszipline`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#faa821] hover:text-[#faa821] transition-all duration-300 transform hover:scale-110"
                                    aria-label={social.name}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-300 text-center">
                        <p className="text-gray-600 text-md mt-2">
                            &copy; {new Date().getFullYear()} Harness Zipline. All rights reserved. | Crafted by <a href="https://sait.com.np/" target="_blank" rel="noreferrer">S.A I.T Solution Nepal</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
