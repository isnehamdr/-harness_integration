// import React from 'react'
// import Hero from '../Component/Home/Hero'
// import About from '../Component/Home/About'
// import Rooms from '../Component/Home/Rooms'
// import Extra from '../Component/Home/Extra'
// import Activities from '../Component/Home/Activities'
// import Services from '../Component/Home/Services'
// import Testimonials from '../Component/Home/Testimonials'

// const Home = () => {
//     return (
//         <>

//             <Hero />
//             <About />
//             <Services />
//             <Activities />
//             <Testimonials />
//             <Rooms />

//             {/* <Extra /> */}



//         </>

//     )
// }

// export default Home


import React from 'react'
import Hero from '../Component/Home/Hero'
import About from '../Component/Home/About'
import Rooms from '../Component/Home/Rooms'
import Activities from '../Component/Home/Activities'
import Services from '../Component/Home/Services'
import Testimonials from '../Component/Home/Testimonials'
import Seo from '../Component/Seo'
import {
    BUSINESS_NAME,
    CONTACT,
    buildLocalBusinessSchema,
    buildOrganizationSchema,
} from '../seo/site'



const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Where is Harness Zipline Pvt Ltd located?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: CONTACT.address,
            },
        },
        {
            '@type': 'Question',
            name: 'How can I contact Harness for bookings?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: `Call ${CONTACT.phoneDisplay} or email ${CONTACT.email} for room reservations, activities, weddings, and group events.`,
            },
        },
        {
            '@type': 'Question',
            name: 'What can I book at Harness?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Guests can book rooms, zipline adventures, rafting, cycling, dining, destination events, and scenic group stays in Kusma, Nepal.',
            },
        },
    ],
}

const Home = () => {
    return (
        <>
            <Seo
                title="Harness  Zipline Adventure & Resort Kusma, Nepal | Official Website"
                description="Stay, dine, and adventure in Kusma, Nepal at Harness Zipline & Adventure Resort. Book scenic rooms, zipline experiences, events, and nature-filled getaways."
                path="/"
                image="/images/DSC01949.jpeg"
                keywords="Kusma resort, zipline Nepal, adventure resort Nepal, Harness Zipline, rooms in Kusma, zipline booking Nepal, resort near Kusma"
                schema={[
                    buildOrganizationSchema(),
                    buildLocalBusinessSchema({
                        name: BUSINESS_NAME,
                    }),
                    faqSchema,
                ]}
            />

            <Hero />
            <About />
            <Services />
            <Activities />
            <Testimonials />
            <Rooms />
            

            <section className="bg-stone-50 px-4 py-16 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                    <div className="max-w-4xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FAA821]">
                            Plan Your Visit
                        </p>
                        <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
                            Harness Zipline and Adventure Resort in Kusma, Nepal
                        </h2>
                        <p className="mt-5 text-base leading-8 text-stone-600">
                            Harness Zipline Pvt Ltd brings together scenic accommodation, outdoor adventure, destination dining,
                            and private event experiences in one memorable setting. Guests come here for more than a single activity.
                            They come to spend a full day or weekend enjoying valley views, comfortable rooms, signature zipline rides,
                            family-friendly recreation, and a slower rhythm surrounded by nature.
                        </p>
                        <p className="mt-5 text-base leading-8 text-stone-600">
                            If you are planning a holiday in Kusma, looking for a resort with activities in Nepal, or searching for a
                            venue for weddings, gatherings, and team retreats, Harness offers a strong all-in-one option. Our location
                            makes it easy to combine relaxation with thrill. Guests can stay overnight, book zipline adventures, explore
                            local scenery, and enjoy on-site hospitality without having to split their plans across multiple destinations.
                        </p>
                        <p className="mt-5 text-base leading-8 text-stone-600">
                            We also make direct booking simple. For room reservations, adventure planning, or event inquiries, contact
                            us by phone or email and our team can help you organize the right stay. Clear business information helps
                            travelers trust the experience before they arrive, so you will always find our core details below in plain text.
                        </p>
                        <p className="mt-5 text-base leading-8 text-stone-600">
                            Travelers searching for a Kusma resort, a Nepal zipline destination, or a scenic place to stay near adventure
                            activities should find a homepage that explains all of that clearly. This section is intentionally written to
                            describe our location, services, and booking options in natural language so both guests and search engines can
                            better understand what Harness offers.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 text-sm text-stone-700 sm:grid-cols-3">
                        <a className="rounded-2xl bg-stone-50 p-5 transition hover:bg-stone-100" href={CONTACT.phoneHref}>
                            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#FAA821]">Call</span>
                            <span className="mt-2 block text-base font-bold">{CONTACT.phoneDisplay}</span>
                        </a>
                        <a className="rounded-2xl bg-stone-50 p-5 transition hover:bg-stone-100" href={`mailto:${CONTACT.email}`}>
                            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#FAA821]">Email</span>
                            <span className="mt-2 block break-all text-base font-bold">{CONTACT.email}</span>
                        </a>
                        <div className="rounded-2xl bg-stone-50 p-5">
                            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#FAA821]">Location</span>
                            <span className="mt-2 block text-base font-bold">{CONTACT.address}</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
