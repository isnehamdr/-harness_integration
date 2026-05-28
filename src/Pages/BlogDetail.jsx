// import React from 'react'
// import { useParams, Link, Navigate } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import blogsData from '../data/blogsData.json'

// const BlogDetail = () => {
//     const { slug } = useParams()
//     const post = blogsData.find((b) => b.slug === slug)

//     // 404 fallback
//     if (!post) return <Navigate to="/blog" replace />

//     // Related posts (other posts, max 3)
//     const related = blogsData.filter((b) => b.id !== post.id).slice(0, 3)

//     return (
//         <>
//             <Helmet>
//                 <title>{post.title} | The Harness Nepal Blog</title>
//                 <meta name="description" content={post.excerpt} />
//                 <link rel="canonical" href={`https://www.theharnessnepal.com/blog/${post.slug}`} />
//             </Helmet>

//             {/* HERO */}
//             <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
//                 <img
//                     src={post.image}
//                     alt={post.alt}
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
//                 <div className="relative z-20 w-full h-full flex items-end">
//                     <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 w-full">
//                         {/* Breadcrumb */}
//                         <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
//                             <Link to="/" className="hover:text-[#FAA821] transition-colors">Home</Link>
//                             <span>/</span>
//                             <Link to="/blog" className="hover:text-[#FAA821] transition-colors">Blog</Link>
//                             <span>/</span>
//                             <span className="text-white/90 truncate max-w-[200px]">{post.title}</span>
//                         </nav>
//                         <span className="inline-block bg-[#FAA821] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
//                             {post.category}
//                         </span>
//                         <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug drop-shadow-lg">
//                             {post.title}
//                         </h1>
//                         <div className="flex flex-wrap items-center gap-3 mt-4 text-white/60 text-sm">
//                             <span>{post.date}</span>
//                             <span>·</span>
//                             <span>{post.readTime}</span>
//                             <span>·</span>
//                             <span>By {post.author.name}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT + SIDEBAR */}
//             <div className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
//                 <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

//                     {/* Main article */}
//                     <article className="w-full lg:w-2/3">

//                         {/* Excerpt / lead */}
//                         <p className="text-lg sm:text-xl text-[#1b6934] font-semibold leading-relaxed border-l-4 border-[#FAA821] pl-5 mb-10">
//                             {post.excerpt}
//                         </p>

//                         {/* Dynamic content blocks */}
//                         <div className="prose prose-lg max-w-none">
//                             {post.content.map((block, i) => {
//                                 if (block.type === 'paragraph') {
//                                     return (
//                                         <p key={i} className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
//                                             {block.text}
//                                         </p>
//                                     )
//                                 }
//                                 if (block.type === 'heading') {
//                                     return (
//                                         <h2 key={i} className="text-[#1b6934] text-xl sm:text-2xl lg:text-3xl font-bold mt-10 mb-4">
//                                             {block.text}
//                                         </h2>
//                                     )
//                                 }
//                                 if (block.type === 'quote') {
//                                     return (
//                                         <blockquote key={i} className="bg-[#1b6934]/5 border-l-4 border-[#FAA821] pl-6 py-4 my-8 rounded-r-xl">
//                                             <p className="text-[#1b6934] text-lg sm:text-xl italic font-medium leading-relaxed">
//                                                 "{block.text}"
//                                             </p>
//                                         </blockquote>
//                                     )
//                                 }
//                                 return null
//                             })}
//                         </div>

                     
                       

                    

//                         {/* Back link */}
//                         <div className="mt-10">
//                             <Link
//                                 to="/blog"
//                                 className="inline-flex items-center gap-2 text-[#1b6934] hover:text-[#FAA821] font-semibold transition-colors duration-200 text-sm uppercase tracking-widest"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//                                 </svg>
//                                 Back to Blog
//                             </Link>
//                         </div>
//                     </article>

                

//                 </div>
//             </div>
//         </>
//     )
// }

// export default BlogDetail



import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/storage/'

const BlogDetail = () => {
    const { slug } = useParams()

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/blogs/${slug}`)
                const data = response.data.data

                // If not archived, treat as not found
                if (!data || data.is_archived !== true) {
                    setNotFound(true)
                } else {
                    setPost(data)
                }
            } catch (error) {
                console.error('Blog detail fetch error:', error)
                setNotFound(true)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [slug])

    // Loading state
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-2 border-[#FAA821] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    // 404 fallback
    if (notFound || !post) return <Navigate to="/blog" replace />

    return (
        <>
            <Helmet>
                <title>{post.title} | The Harness Nepal Blog</title>
                <meta name="description" content={post.short_description} />
                <link rel="canonical" href={`https://www.theharnessnepal.com/blog/${post.slug}`} />
            </Helmet>

            {/* HERO */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
                <img
                    src={`${BASE_URL}${post.image}`}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
                <div className="relative z-20 w-full h-full flex items-end">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 w-full">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
                            <Link to="/" className="hover:text-[#FAA821] transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/blog" className="hover:text-[#FAA821] transition-colors">Blog</Link>
                            <span>/</span>
                            <span className="text-white/90 truncate max-w-[200px]">{post.title}</span>
                        </nav>

                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug drop-shadow-lg">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 mt-4 text-white/60 text-sm">
                            <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
                <div className="max-w-4xl mx-auto">

                    <article className="w-full">

                        {/* Short description / lead */}
                        {post.short_description && (
                            <p className="text-lg sm:text-xl text-[#1b6934] font-semibold leading-relaxed border-l-4 border-[#FAA821] pl-5 mb-10">
                                {post.short_description}
                            </p>
                        )}

                        {/* Long description — rendered as HTML from the API */}
                        {post.long_description && (
                            <div
                                className="prose prose-lg max-w-none text-gray-600 leading-relaxed
                                    prose-headings:text-[#1b6934] prose-headings:font-bold
                                    prose-a:text-[#FAA821] prose-a:no-underline hover:prose-a:underline
                                    prose-blockquote:border-l-[#FAA821] prose-blockquote:text-[#1b6934]"
                                dangerouslySetInnerHTML={{ __html: post.long_description }}
                            />
                        )}

                        {/* Back link */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-[#1b6934] hover:text-[#FAA821] font-semibold transition-colors duration-200 text-sm uppercase tracking-widest"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back to Blog
                            </Link>
                        </div>
                    </article>

                </div>
            </div>
        </>
    )
}

export default BlogDetail