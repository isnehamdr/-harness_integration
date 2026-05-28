
// import React, { useRef, useEffect, useState } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Helmet } from 'react-helmet-async'
// import careerData from '../data/careerdata.json'
// import axios from 'axios'
// import { FileText, X, AlertCircle } from 'lucide-react'

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger)
// }

// // ── SVG Icons ──
// const icons = {
//   mountain: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 20l5-8 4 5 3-4 6 7H3z" />
//     </svg>
//   ),
//   growth: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//     </svg>
//   ),
//   team: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   ),
//   schedule: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
//   ),
//   location: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   ),
//   meal: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//   ),
//   close: (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   ),
//   check: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   ),
//   send: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//     </svg>
//   ),
//   bag: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   ),
//   clock: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2" />
//     </svg>
//   ),
//   pin: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//     </svg>
//   ),
//   upload: (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//     </svg>
//   ),
//   arrowRight: (
//     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//     </svg>
//   ),
// }

// // ── Department icon map ──
// const deptIconMap = {
//   Adventure: icons.mountain,
//   Operations: icons.schedule,
//   'Guest Experience': icons.team,
//   Marketing: icons.growth,
//   Events: icons.schedule,
//   Hospitality: icons.meal,
//   Safety: icons.location,
// }

// // ── Apply Form with full submission logic ──
// const ApplyForm = ({ position, onClose }) => {
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [cvFileName, setCvFileName] = useState('')
//   const [cvFile, setCvFile] = useState(null)
//   const [submitStatus, setSubmitStatus] = useState(null)
  
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     experience: '',
//     coverNote: '',
//   })
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     const e = {}
//     if (!form.name.trim()) e.name = 'Full name is required'
//     if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
//     if (!form.phone.trim()) e.phone = 'Phone number is required'
//     else if (!/^[\d\s\-+()]{10,}$/.test(form.phone.replace(/\s/g, ""))) {
//       e.phone = 'Please enter a valid phone number'
//     }
//     if (!cvFile) e.cv = 'Please attach your CV'
//     else {
//       // Validate file type
//       const validTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ]
//       if (!validTypes.includes(cvFile.type)) {
//         e.cv = "Please upload only PDF, DOC, or DOCX files"
//       }
//       // Validate file size (2MB max)
//       if (cvFile.size > 2 * 1024 * 1024) {
//         e.cv = "File size must be less than 2MB"
//       }
//     }
//     return e
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const handleFile = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setCvFile(file)
//       setCvFileName(file.name)
//       if (errors.cv) setErrors((prev) => ({ ...prev, cv: '' }))
//     }
//   }

//   const removeFile = () => {
//     setCvFile(null)
//     setCvFileName('')
//     const fileInput = document.getElementById('cv-upload')
//     if (fileInput) {
//       fileInput.value = ''
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     const validationErrors = validate()
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors)
//       return
//     }
    
//     setLoading(true)
//     setSubmitStatus(null)
//     setUploadProgress(0)
    
//     // Create FormData object for file upload
//     const submitData = new FormData()
//     submitData.append("job_id", position.id)
//     submitData.append("full_name", form.name)
//     submitData.append("email", form.email)
//     submitData.append("phone_number", form.phone)
//     submitData.append("description", `${form.coverNote}\n\nExperience Level: ${form.experience || 'Not specified'}\nPosition: ${position.title}\nDepartment: ${position.department}`)
//     submitData.append("cv", cvFile)
    
//     try {
//       const response = await axios.post("/ourjobenquiry", submitData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             )
//             setUploadProgress(percentCompleted)
//           }
//         },
//       })
      
//       // Handle successful submission
//       setSubmitStatus({
//         type: "success",
//         message: "Your application has been submitted successfully!",
//       })
//       setSubmitted(true)
      
//       // Reset form
//       setForm({
//         name: '',
//         email: '',
//         phone: '',
//         experience: '',
//         coverNote: '',
//       })
//       setCvFile(null)
//       setCvFileName('')
      
//       // Reset file input
//       const fileInput = document.getElementById("cv-upload")
//       if (fileInput) {
//         fileInput.value = ""
//       }
      
//     } catch (error) {
//       console.error("Submission error:", error)
      
//       if (error.response) {
//         if (error.response.status === 422) {
//           const serverErrors = error.response.data.errors || {}
//           const formattedErrors = {}
          
//           // Map server validation errors to form fields
//           if (serverErrors.full_name) formattedErrors.name = serverErrors.full_name[0]
//           if (serverErrors.email) formattedErrors.email = serverErrors.email[0]
//           if (serverErrors.phone_number) formattedErrors.phone = serverErrors.phone_number[0]
//           if (serverErrors.cv) formattedErrors.cv = serverErrors.cv[0]
          
//           setErrors(formattedErrors)
//           setSubmitStatus({
//             type: "error",
//             message: "Please check the form for errors and try again.",
//           })
//         } else {
//           setSubmitStatus({
//             type: "error",
//             message: error.response.data?.message || "Server error. Please try again later.",
//           })
//         }
//       } else if (error.request) {
//         setSubmitStatus({
//           type: "error",
//           message: "Network error. Please check your connection and try again.",
//         })
//       } else {
//         setSubmitStatus({
//           type: "error",
//           message: "An unexpected error occurred. Please try again.",
//         })
//       }
      
//       setSubmitted(false)
//     } finally {
//       setLoading(false)
//       setUploadProgress(0)
//     }
//   }

//   const inputClass = (field) =>
//     `w-full bg-stone-50 border ${errors[field] ? 'border-red-400' : 'border-stone-200'
//     } rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#FAA821] focus:ring-2 focus:ring-[#FAA821]/20 transition-all duration-200`

//   const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1.5'

//   if (submitted) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
//         <div className="w-16 h-16 rounded-full bg-[#FAA821] flex items-center justify-center text-white shadow-lg shadow-[#FAA821]/30">
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-stone-800">Application Submitted!</h3>
//         <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
//           Thanks for applying to <span className="font-semibold text-[#FAA821]">{position.title}</span>.
//           Our team will review your application and reach out within 5–7 business days.
//         </p>
//         <button
//           onClick={onClose}
//           className="mt-2 text-xs uppercase tracking-widest text-[#FAA821] underline underline-offset-4"
//         >
//           Back to Openings
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Upload Progress Bar */}
//       {loading && uploadProgress > 0 && (
//         <div className="mb-2">
//           <div className="flex justify-between text-xs text-stone-600 mb-1">
//             <span>Uploading CV...</span>
//             <span>{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-stone-100 rounded-full h-1.5">
//             <div
//               className="bg-[#FAA821] h-1.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {/* Error/Success Messages */}
//       {submitStatus && submitStatus.type === "error" && (
//         <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200">
//           <div className="flex">
//             <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//             <p className="text-xs text-red-700">{submitStatus.message}</p>
//           </div>
//         </div>
//       )}

//       <div className="flex items-center gap-3 p-3 bg-[#FAA821]/8 border border-[#FAA821]/20 rounded-xl mb-2">
//         <span className="text-[#FAA821]">{icons.bag}</span>
//         <div>
//           <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold leading-none mb-0.5">Applying for</p>
//           <p className="text-sm font-bold text-stone-800">{position.title}</p>
//         </div>
//         <div className="ml-auto flex items-center gap-2 text-xs text-stone-500">
//           <span>{icons.clock}</span>{position.type}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
//         <div>
//           <label className={labelClass}>Full Name *</label>
//           <input 
//             type="text" 
//             name="name" 
//             placeholder="Your full name"
//             value={form.name} 
//             onChange={handleChange} 
//             className={inputClass('name')} 
//           />
//           {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className={labelClass}>Email *</label>
//             <input 
//               type="email" 
//               name="email" 
//               placeholder="you@email.com"
//               value={form.email} 
//               onChange={handleChange} 
//               className={inputClass('email')} 
//             />
//             {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
//           </div>
//           <div>
//             <label className={labelClass}>Phone *</label>
//             <input 
//               type="tel" 
//               name="phone" 
//               placeholder="+977 98XXXXXXXX"
//               value={form.phone} 
//               onChange={handleChange} 
//               className={inputClass('phone')} 
//             />
//             {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
//           </div>
//         </div>

//         <div>
//           <label className={labelClass}>Years of Experience</label>
//           <select 
//             name="experience" 
//             value={form.experience} 
//             onChange={handleChange} 
//             className={inputClass('experience')}
//           >
//             <option value="">Select experience level</option>
//             <option value="0-1">0–1 years (fresher / intern)</option>
//             <option value="1-3">1–3 years</option>
//             <option value="3-5">3–5 years</option>
//             <option value="5+">5+ years</option>
//           </select>
//         </div>

//         <div>
//           <label className={labelClass}>CV / Resume *</label>
//           {!cvFile ? (
//             <label className={`flex items-center gap-3 cursor-pointer w-full border ${errors.cv ? 'border-red-400' : 'border-stone-200'
//               } border-dashed rounded-xl px-4 py-4 bg-stone-50 hover:border-[#FAA821] hover:bg-[#FAA821]/5 transition-all duration-200`}>
//               <span className="text-[#FAA821]">{icons.upload}</span>
//               <span className={`text-sm ${cvFileName ? 'text-stone-800 font-medium' : 'text-stone-400'}`}>
//                 {cvFileName || 'Upload PDF, DOC, or DOCX (max 2MB)'}
//               </span>
//               <input 
//                 id="cv-upload"
//                 type="file" 
//                 accept=".pdf,.doc,.docx" 
//                 onChange={handleFile} 
//                 className="hidden" 
//               />
//             </label>
//           ) : (
//             <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
//               <div className="flex items-center">
//                 <FileText className="h-5 w-5 text-[#FAA821] mr-2" />
//                 <span className="text-sm text-stone-700 truncate max-w-[200px]">{cvFileName}</span>
//               </div>
//               <button
//                 type="button"
//                 onClick={removeFile}
//                 className="text-stone-400 hover:text-red-500 transition"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           )}
//           {errors.cv && <p className="text-red-400 text-xs mt-1">{errors.cv}</p>}
//           <p className="text-stone-400 text-[11px] mt-1">Accepted formats: PDF, DOC, DOCX (Max 2MB)</p>
//         </div>

//         <div>
//           <label className={labelClass}>
//             Cover Note <span className="normal-case text-stone-300">(optional)</span>
//           </label>
//           <textarea 
//             name="coverNote" 
//             rows={4}
//             placeholder="Tell us why you'd be a great fit at Harness — your passion, relevant experience, and what excites you about this role..."
//             value={form.coverNote} 
//             onChange={handleChange}
//             className={`${inputClass('coverNote')} resize-none`} 
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-1 w-full flex items-center justify-center gap-2 bg-[#FAA821] hover:bg-[#e8971a] text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#FAA821]/25 disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//               </svg>
//               {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Submitting...'}
//             </>
//           ) : (
//             <>{icons.send} Submit Application</>
//           )}
//         </button>

//         <p className="text-center text-xs text-stone-400 leading-relaxed">
//           By submitting this form, you agree to our{" "}
//           <a href="/privacy-policy" className="text-[#FAA821] hover:underline">
//             Privacy Policy
//           </a>
//         </p>
//       </form>
//     </div>
//   )
// }

// // ── Job Drawer ──
// const JobDrawer = ({ position, onClose }) => {
//   const drawerRef = useRef(null)
//   const [showForm, setShowForm] = useState(false)

//   useEffect(() => {
//     document.body.style.overflow = 'hidden'
//     gsap.fromTo(drawerRef.current,
//       { x: '100%', opacity: 0 },
//       { x: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
//     )
//     return () => { document.body.style.overflow = '' }
//   }, [])

//   const handleClose = () => {
//     gsap.to(drawerRef.current, {
//       x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in',
//       onComplete: onClose
//     })
//   }

//   return (
//     <div className="fixed inset-0 z-[100] flex">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={handleClose}
//       />

//       <div
//         ref={drawerRef}
//         className="relative ml-auto w-full sm:w-[520px] lg:w-[600px] h-full bg-white flex flex-col shadow-2xl overflow-hidden"
//         style={{ opacity: 0 }}
//       >
//         <div className="relative flex-shrink-0 bg-stone-900 px-5 sm:px-6 pt-10 pb-6">
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-[10px] uppercase tracking-[0.28em] text-[#FAA821] font-semibold">
//               {position.department}
//             </span>
//             <span className="w-1 h-1 rounded-full bg-white/40" />
//             <span className="text-[10px] uppercase tracking-widest text-white/60">{position.type}</span>
//           </div>
//           <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight">
//             {position.title}
//           </h2>
//           <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
//             <span className="text-white/60">{icons.pin}</span>
//             {position.location}
//           </div>
//           <button
//             onClick={handleClose}
//             className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
//             aria-label="Close"
//           >
//             {icons.close}
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {!showForm ? (
//             <div className="p-5 sm:p-6 flex flex-col gap-6">
//               <div>
//                 <p className="text-xs uppercase tracking-widest text-[#FAA821] font-semibold mb-2">About the Role</p>
//                 <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{position.summary}</p>
//               </div>

//               <div>
//                 <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">What You'll Do</p>
//                 <ul className="flex flex-col gap-2">
//                   {position.responsibilities.map((r, i) => (
//                     <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
//                       <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FAA821]/15 flex items-center justify-center text-[#FAA821] flex-shrink-0">
//                         {icons.check}
//                       </span>
//                       {r}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">What We're Looking For</p>
//                 <ul className="flex flex-col gap-2">
//                   {position.requirements.map((r, i) => (
//                     <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-[#FAA821] flex-shrink-0" />
//                       {r}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="p-5 sm:p-6">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-widest mb-5 hover:text-[#FAA821] transition-colors duration-200"
//               >
//                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back to job details
//               </button>
//               <ApplyForm position={position} onClose={handleClose} />
//             </div>
//           )}
//         </div>

//         {!showForm && (
//           <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-stone-100 bg-white">
//             <button
//               onClick={() => setShowForm(true)}
//               className="w-full flex items-center justify-center gap-2 bg-[#FAA821] hover:bg-[#e8971a] text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#FAA821]/25"
//             >
//               {icons.send} Apply for This Role
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // ── Perk Card ──
// const PerkCard = ({ perk }) => (
//   <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-5 sm:p-6 bg-white/70 backdrop-blur-sm border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
//     <div className="w-11 h-11 rounded-xl bg-[#FAA821]/12 flex items-center justify-center text-[#FAA821] flex-shrink-0">
//       {icons[perk.icon]}
//     </div>
//     <div>
//       <h4 className="text-sm font-bold text-stone-800 mb-1">{perk.title}</h4>
//       <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{perk.description}</p>
//     </div>
//   </div>
// )

// // ── Job Card ──
// const JobCard = ({ position, onClick }) => {
//   const deptIcon = deptIconMap[position.department] ?? icons.bag

//   return (
//     <div
//       className="service-card group flex flex-col gap-4 p-5 sm:p-6
//                  bg-white border border-stone-100 rounded-2xl cursor-pointer
//                  hover:-translate-y-1 hover:border-[#FAA821]/40 hover:shadow-lg
//                  transition-all duration-300"
//       onClick={() => onClick(position)}
//     >
//       <div className="flex items-center justify-between flex-wrap gap-2">
//         <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]
//                          font-semibold text-[#c8840a] bg-[#FAA821]/10 px-3 py-1 rounded-full">
//           <span className="text-[#FAA821] [&>svg]:w-3.5 [&>svg]:h-3.5">
//             {deptIcon}
//           </span>
//           {position.department}
//         </span>
//         <span className="text-[10px] uppercase tracking-wider text-stone-400
//                          bg-stone-100 px-3 py-1 rounded-full font-medium">
//           {position.type}
//         </span>
//       </div>

//       <h3 className="text-[#faa821] text-lg sm:text-xl font-bold leading-snug
//                      group-hover:text-[#fcb742] transition-colors duration-300">
//         {position.title}
//       </h3>

//       <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1">
//         {position.summary}
//       </p>

//       <hr className="border-stone-100" />

//       <div className="flex items-center gap-4 text-xs text-stone-400">
//         <span className="flex items-center gap-1.5">
//           {icons.pin}
//           {position.location}
//         </span>
//         <span className="flex items-center gap-1.5">
//           {icons.clock}
//           {position.type}
//         </span>
//       </div>

//       <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em]
//                        font-semibold text-[#faa821] border border-[#FAA821]/35 bg-[#FAA821]/6
//                        px-4 py-2 rounded-lg w-fit
//                        group-hover:bg-[#FAA821]/14 group-hover:border-[#FAA821]/60
//                        transition-all duration-200">
//         {icons.arrowRight}
//         View Details
//       </span>
//     </div>
//   )
// }

// // ── Main Page with fixed data loading ──
// const CareerPage = () => {
//   const heroRef           = useRef(null)
//   const textRef           = useRef(null)
//   const contentSectionRef = useRef(null)
//   const maskRef           = useRef(null)
//   const contentRef        = useRef(null)
//   const headerRef         = useRef(null)
//   const perksRef          = useRef(null)
//   const jobsGridRef       = useRef(null)

//   const [activeJob, setActiveJob] = useState(null)
//   const [jobs, setJobs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const { meta, perks } = careerData

//   const transformJobData = (apiJob) => {
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(apiJob.content, 'text/html')
    
//     const responsibilities = []
//     const requirements = []
    
//     const listItems = doc.querySelectorAll('li')
//     listItems.forEach(item => {
//       const text = item.textContent.trim()
//       if (text && text.length > 0) {
//         responsibilities.push(text)
//       }
//     })
    
//     const paragraphs = doc.querySelectorAll('p')
//     paragraphs.forEach(p => {
//       const text = p.textContent.trim()
//       if (text && text.length > 0 && 
//           !text.includes('What You\'ll Do') && 
//           !text.includes("What We're Looking For") &&
//           !responsibilities.includes(text)) {
//         if (text.includes('certified') || text.includes('rescue') || text.includes('experience') || 
//             text.includes('swimming') || text.includes('First aid') || text.includes('CPR') ||
//             text.includes('license')) {
//           requirements.push(text)
//         }
//       }
//     })
    
//     let department = 'Adventure'
//     if (apiJob.title.toLowerCase().includes('marketing')) department = 'Marketing'
//     else if (apiJob.title.toLowerCase().includes('operation')) department = 'Operations'
//     else if (apiJob.title.toLowerCase().includes('guest')) department = 'Guest Experience'
//     else if (apiJob.title.toLowerCase().includes('hospitality')) department = 'Hospitality'
    
//     return {
//       id: apiJob.id,
//       title: apiJob.title,
//       department: department,
//       type: 'Full-time',
//       location: 'Kusma, Nepal',
//       summary: apiJob.short_description,
//       responsibilities: responsibilities.length > 0 ? responsibilities : [apiJob.short_description],
//       requirements: requirements.length > 0 ? requirements : ['Check job description for details'],
//       is_archived: apiJob.is_archived
//     }
//   }

//   // Fetch jobs with retry logic
//   const fetchJobs = async (retryAttempt = 0) => {
//     try {
//       setLoading(true)
//       const response = await axios.get("http://127.0.0.1:8000/api/jobs", {
//         timeout: 10000,
//         headers: {
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache'
//         }
//       })
      
//       const data = response.data.data
//       const archivedJobs = data.filter(job => job.is_archived === true)
//       const transformedJobs = archivedJobs.map(transformJobData)
      
//       setJobs(transformedJobs)
//       setError(null)
//     } catch (error) {
//       console.error("Error fetching jobs:", error)
      
//       if (retryAttempt < 3) {
//         const delay = Math.pow(2, retryAttempt) * 1000
//         setTimeout(() => {
//           fetchJobs(retryAttempt + 1)
//         }, delay)
//       } else {
//         setError("Unable to load job listings. Please check your connection.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load jobs on mount
//   useEffect(() => {
//     fetchJobs()
//   }, [])

//   // Initialize GSAP animations
//   useEffect(() => {
//     const initTimer = setTimeout(() => {
//       ScrollTrigger.getAll().forEach((t) => t.kill())

//       const ctx = gsap.context(() => {
//         if (textRef.current) {
//           gsap.fromTo(textRef.current,
//             { y: 50, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
//           )
//         }

//         if (contentSectionRef.current && heroRef.current) {
//           gsap.set(contentSectionRef.current, { yPercent: 100 })
          
//           ScrollTrigger.create({
//             trigger: heroRef.current,
//             start: 'top top',
//             end: 'bottom top',
//             scrub: 0.5,
//             pin: true,
//             pinSpacing: true,
//             anticipatePin: 1,
//             onUpdate: (self) => {
//               if (contentSectionRef.current) {
//                 gsap.set(contentSectionRef.current, { yPercent: 100 - self.progress * 100 })
//               }
//             },
//           })
//         }

//         if (maskRef.current) {
//           gsap.fromTo(maskRef.current,
//             { scale: 1.2, opacity: 0 },
//             {
//               scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
//               scrollTrigger: {
//                 trigger: heroRef.current,
//                 start: 'top center',
//                 end: 'bottom center',
//                 scrub: 0.8,
//               },
//             }
//           )
//         }

//         if (headerRef.current) {
//           gsap.fromTo(headerRef.current,
//             { opacity: 0, y: 40 },
//             {
//               opacity: 1, y: 0, duration: 0.6,
//               scrollTrigger: {
//                 trigger: contentSectionRef.current,
//                 start: 'top 80%', end: 'top 60%',
//                 scrub: 0.3, once: true,
//               },
//             }
//           )
//         }

//         if (perksRef.current && perksRef.current.children.length > 0) {
//           gsap.fromTo(Array.from(perksRef.current.children),
//             { opacity: 0, y: 30, scale: 0.95 },
//             {
//               opacity: 1, y: 0, scale: 1,
//               duration: 0.5, stagger: 0.08, ease: 'power2.out',
//               scrollTrigger: {
//                 trigger: perksRef.current,
//                 start: 'top 85%', once: true,
//               },
//             }
//           )
//         }
//       }, heroRef)

//       let rafId
//       const onResize = () => {
//         cancelAnimationFrame(rafId)
//         rafId = requestAnimationFrame(() => ScrollTrigger.refresh())
//       }
//       window.addEventListener('resize', onResize)

//       return () => {
//         ctx.revert()
//         ScrollTrigger.getAll().forEach((t) => t.kill())
//         window.removeEventListener('resize', onResize)
//         cancelAnimationFrame(rafId)
//       }
//     }, 100)

//     return () => clearTimeout(initTimer)
//   }, [])

//   // Animate job cards when jobs are loaded
//   useEffect(() => {
//     if (!loading && jobsGridRef.current && jobs.length > 0) {
//       const timer = setTimeout(() => {
//         const elements = jobsGridRef.current?.children
//         if (elements && elements.length > 0) {
//           gsap.fromTo(Array.from(elements),
//             { opacity: 0, y: 30, scale: 0.95 },
//             {
//               opacity: 1, y: 0, scale: 1,
//               duration: 0.5, stagger: 0.08, ease: 'power2.out',
//               scrollTrigger: {
//                 trigger: jobsGridRef.current,
//                 start: 'top 85%', once: true,
//               },
//             }
//           )
//         }
//       }, 200)
      
//       return () => clearTimeout(timer)
//     }
//   }, [loading, jobs])

//   return (
//     <>
//       <Helmet>
//         <title>Careers at Harness Zipline &amp; Adventure Resort</title>
//         <meta name="description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
//         <link rel="canonical" href="https://www.theharnessnepal.com/careers" />
//         <meta name="keywords" content="Harness careers, Kusma jobs, Nepal hospitality jobs, adventure resort careers" />
//         <meta name="robots" content="index, follow" />
//         <meta property="og:title" content="Careers at Harness Zipline & Adventure Resort" />
//         <meta property="og:description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
//         <meta property="og:image" content={meta.heroImage} />
//         <meta property="og:url" content="https://www.theharnessnepal.com/careers" />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Careers at Harness Zipline & Adventure Resort" />
//         <meta name="twitter:description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
//         <meta name="twitter:image" content={meta.heroImage} />
//       </Helmet>

//       {activeJob && (
//         <JobDrawer
//           position={activeJob}
//           onClose={() => setActiveJob(null)}
//         />
//       )}

//       <div>
//         <div
//           ref={heroRef}
//           className="relative bg-white w-full h-screen overflow-hidden"
//           style={{ zIndex: 1 }}
//         >
//           <img
//             src={meta.heroImage}
//             alt="Careers at Harness Zipline and Adventure Resort"
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/55 z-10" />

//           <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
//             <div ref={textRef} className="text-center px-4">
//               <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
//                 {meta.heroTitle}
//               </h2>
//               <h2 className="text-[#faa821] max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-5 mt-4">
//                 {meta.heroSubtitle}
//               </h2>
//               <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
//                 {meta.heroDescription}
//               </p>
//             </div>
//           </div>

//           <div
//             ref={contentSectionRef}
//             className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden"
//             style={{ top: 'auto' }}
//           >
//             <div
//               ref={maskRef}
//               className="absolute inset-0 w-full h-full"
//               style={{ transformOrigin: 'center center' }}
//             >
//               <img src="/images/mask.svg" alt="mask"
//                 className="w-full h-full object-cover object-top invert" />
//             </div>

//             <div
//               ref={contentRef}
//               className="relative z-10 w-full min-h-screen flex items-center justify-center mt-60"
//             >
//               <div
//                 className=" sm:block hidden absolute sm:top-24 top-32 right-0
//                   w-[300px] sm:w-[400px] md:w-[500px]
//                   h-[300px] sm:h-[400px] md:h-[500px]
//                   pointer-events-none opacity-30 lg:opacity-40 z-0"
//                 style={{
//                   backgroundImage: "url('/images/bg.png')",
//                   backgroundSize: 'contain',
//                   backgroundPosition: 'top right',
//                   backgroundRepeat: 'no-repeat',
//                 }}
//               />

//               <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-20 sm:mt-20 mt-36">
//                 <div className="w-full relative z-30 mt-48">

//                   <div ref={headerRef} className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
//                     <button
//                       className="text-white px-6 sm:px-8 py-2 mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold transition-colors duration-300 hover:opacity-90 relative z-30"
//                       style={{
//                         backgroundColor: '#FAA821',
//                         maskImage: "url('/images/logo.png')",
//                         WebkitMaskImage: "url('/images/logo.png')",
//                         maskSize: 'contain',
//                         WebkitMaskSize: 'cover',
//                         maskPosition: 'center',
//                         WebkitMaskPosition: 'center',
//                         maskRepeat: 'no-repeat',
//                         WebkitMaskRepeat: 'no-repeat',
//                       }}
//                     >
//                       {meta.sectionBadge}
//                     </button>

//                     <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 px-2 relative z-30">
//                       {meta.sectionTitle}
//                     </h2>

//                     <p className="text-black/80 text-sm sm:text-base lg:text-xl max-w-3xl leading-relaxed px-2 relative z-30">
//                       {meta.sectionDescription}
//                     </p>
//                   </div>

//                   <div className="mt-14 sm:mt-16 lg:mt-20 max-w-6xl mx-auto px-2 sm:px-4 relative z-30">
//                     <p className="text-center text-xs uppercase tracking-[0.28em] text-stone-400 font-semibold mb-6 sm:mb-8">
//                       Why Work With Us
//                     </p>
//                     <div
//                       ref={perksRef}
//                       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
//                     >
//                       {perks.map((perk) => (
//                         <PerkCard key={perk.id} perk={perk} />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mt-16 sm:mt-20 lg:mt-24 flex flex-col items-center text-center px-4 relative z-30">
//                     <div className="w-10 h-px bg-[#FAA821] mb-4" />
//                     <h3 className="text-[#faa821] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
//                       Open Positions
//                     </h3>
//                     <p className="text-black/60 text-sm sm:text-base max-w-xl leading-relaxed">
//                       Click any role to read the full job description and apply directly.
//                     </p>
//                   </div>

//                   <div className="w-full mt-10 sm:mt-12 lg:mt-16">
//                     {loading && jobs.length === 0 ? (
//                       <div className="flex justify-center items-center py-20">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAA821]"></div>
//                       </div>
//                     ) : error ? (
//                       <div className="text-center py-20">
//                         <p className="text-red-500 mb-4">{error}</p>
//                         <button
//                           onClick={() => fetchJobs(0)}
//                           className="px-6 py-2 bg-[#FAA821] text-white rounded-lg hover:bg-[#e8971a] transition-colors"
//                         >
//                           Retry
//                         </button>
//                       </div>
//                     ) : jobs.length === 0 ? (
//                       <div className="text-center py-20">
//                         <p className="text-stone-500 text-lg">No open positions at the moment. Check back soon!</p>
//                       </div>
//                     ) : (
//                       <div
//                         ref={jobsGridRef}
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-30"
//                       >
//                         {jobs.map((pos) => (
//                           <JobCard key={pos.id} position={pos} onClick={setActiveJob} />
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-16 sm:mt-20 text-center px-4 relative z-30 pb-8 sm:pb-12">
//                     <p className="text-stone-500 text-sm sm:text-base mb-4">
//                       Don't see a role that fits? We'd still love to hear from you.
//                     </p>
//                     <a
//                       href="mailto:theharnessnepal@gmail.com?subject=General%20Career%20Application"
//                       className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-200"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Send a General Application
//                     </a>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CareerPage















import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Helmet } from 'react-helmet-async'
import careerData from '../data/careerdata.json'
import axios from 'axios'
import { FileText, X, AlertCircle } from 'lucide-react'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── SVG Icons ──
const icons = {
  mountain: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 20l5-8 4 5 3-4 6 7H3z" />
    </svg>
  ),
  growth: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  team: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  schedule: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  meal: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  send: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  bag: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2" />
    </svg>
  ),
  pin: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  ),
  upload: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
}

// ── Department icon map ──
const deptIconMap = {
  Adventure: icons.mountain,
  Operations: icons.schedule,
  'Guest Experience': icons.team,
  Marketing: icons.growth,
  Events: icons.schedule,
  Hospitality: icons.meal,
  Safety: icons.location,
}

// ── Apply Form with full submission logic ──
const ApplyForm = ({ position, onClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [cvFileName, setCvFileName] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverNote: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[\d\s\-+()]{10,}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = 'Please enter a valid phone number'
    }
    if (!cvFile) e.cv = 'Please attach your CV'
    else {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(cvFile.type)) {
        e.cv = "Please upload only PDF, DOC, or DOCX files"
      }
      // Validate file size (2MB max)
      if (cvFile.size > 2 * 1024 * 1024) {
        e.cv = "File size must be less than 2MB"
      }
    }
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCvFile(file)
      setCvFileName(file.name)
      if (errors.cv) setErrors((prev) => ({ ...prev, cv: '' }))
    }
  }

  const removeFile = () => {
    setCvFile(null)
    setCvFileName('')
    const fileInput = document.getElementById('cv-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    setSubmitStatus(null)
    setUploadProgress(0)
    
    // Create FormData object for file upload
    const submitData = new FormData()
    submitData.append("job_id", position.id)
    submitData.append("full_name", form.name)
    submitData.append("email", form.email)
    submitData.append("phone_number", form.phone)
    submitData.append("description", `${form.coverNote}\n\nExperience Level: ${form.experience || 'Not specified'}\nPosition: ${position.title}\nDepartment: ${position.department}`)
    submitData.append("cv", cvFile)
    
    try {
      await axios.post(`${API_BASE_URL}/jobenquiry`, submitData, {
        headers: {
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(percentCompleted)
          }
        },
      })
      
      // Handle successful submission
      setSubmitStatus({
        type: "success",
        message: "Your application has been submitted successfully!",
      })
      setSubmitted(true)
      
      // Reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        experience: '',
        coverNote: '',
      })
      setCvFile(null)
      setCvFileName('')
      
      // Reset file input
      const fileInput = document.getElementById("cv-upload")
      if (fileInput) {
        fileInput.value = ""
      }
      
    } catch (error) {
      console.error("Submission error:", error)
      
      if (error.response) {
        if (error.response.status === 422) {
          const serverErrors = error.response.data.errors || {}
          const formattedErrors = {}
          
          // Map server validation errors to form fields
          if (serverErrors.full_name) formattedErrors.name = serverErrors.full_name[0]
          if (serverErrors.email) formattedErrors.email = serverErrors.email[0]
          if (serverErrors.phone_number) formattedErrors.phone = serverErrors.phone_number[0]
          if (serverErrors.cv) formattedErrors.cv = serverErrors.cv[0]
          
          setErrors(formattedErrors)
          setSubmitStatus({
            type: "error",
            message: "Please check the form for errors and try again.",
          })
        } else {
          setSubmitStatus({
            type: "error",
            message: error.response.data?.message || "Server error. Please try again later.",
          })
        }
      } else if (error.request) {
        setSubmitStatus({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        })
      }
      
      setSubmitted(false)
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const inputClass = (field) =>
    `w-full bg-stone-50 border ${errors[field] ? 'border-red-400' : 'border-stone-200'
    } rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#FAA821] focus:ring-2 focus:ring-[#FAA821]/20 transition-all duration-200`

  const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1.5'

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#FAA821] flex items-center justify-center text-white shadow-lg shadow-[#FAA821]/30">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-stone-800">Application Submitted!</h3>
        <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
          Thanks for applying to <span className="font-semibold text-[#FAA821]">{position.title}</span>.
          Our team will review your application and reach out within 5–7 business days.
        </p>
        <button
          onClick={onClose}
          className="mt-2 text-xs uppercase tracking-widest text-[#FAA821] underline underline-offset-4"
        >
          Back to Openings
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Progress Bar */}
      {loading && uploadProgress > 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-stone-600 mb-1">
            <span>Uploading CV...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-1.5">
            <div
              className="bg-[#FAA821] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error/Success Messages */}
      {submitStatus && submitStatus.type === "error" && (
        <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="flex">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 p-3 bg-[#FAA821]/8 border border-[#FAA821]/20 rounded-xl mb-2">
        <span className="text-[#FAA821]">{icons.bag}</span>
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold leading-none mb-0.5">Applying for</p>
          <p className="text-sm font-bold text-stone-800">{position.title}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-stone-500">
          <span>{icons.clock}</span>{position.type}
        </div>
      </div>

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

        <div>
          <label className={labelClass}>Years of Experience</label>
          <select 
            name="experience" 
            value={form.experience} 
            onChange={handleChange} 
            className={inputClass('experience')}
          >
            <option value="">Select experience level</option>
            <option value="0-1">0–1 years (fresher / intern)</option>
            <option value="1-3">1–3 years</option>
            <option value="3-5">3–5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>CV / Resume *</label>
          {!cvFile ? (
            <label className={`flex items-center gap-3 cursor-pointer w-full border ${errors.cv ? 'border-red-400' : 'border-stone-200'
              } border-dashed rounded-xl px-4 py-4 bg-stone-50 hover:border-[#FAA821] hover:bg-[#FAA821]/5 transition-all duration-200`}>
              <span className="text-[#FAA821]">{icons.upload}</span>
              <span className={`text-sm ${cvFileName ? 'text-stone-800 font-medium' : 'text-stone-400'}`}>
                {cvFileName || 'Upload PDF, DOC, or DOCX (max 2MB)'}
              </span>
              <input 
                id="cv-upload"
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFile} 
                className="hidden" 
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-[#FAA821] mr-2" />
                <span className="text-sm text-stone-700 truncate max-w-[200px]">{cvFileName}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-stone-400 hover:text-red-500 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {errors.cv && <p className="text-red-400 text-xs mt-1">{errors.cv}</p>}
          <p className="text-stone-400 text-[11px] mt-1">Accepted formats: PDF, DOC, DOCX (Max 2MB)</p>
        </div>

        <div>
          <label className={labelClass}>
            Cover Note <span className="normal-case text-stone-300">(optional)</span>
          </label>
          <textarea 
            name="coverNote" 
            rows={4}
            placeholder="Tell us why you'd be a great fit at Harness — your passion, relevant experience, and what excites you about this role..."
            value={form.coverNote} 
            onChange={handleChange}
            className={`${inputClass('coverNote')} resize-none`} 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full flex items-center justify-center gap-2 bg-[#FAA821] hover:bg-[#e8971a] text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#FAA821]/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Submitting...'}
            </>
          ) : (
            <>{icons.send} Submit Application</>
          )}
        </button>

        <p className="text-center text-xs text-stone-400 leading-relaxed">
          By submitting this form, you agree to our{" "}
          <a href="/privacy-policy" className="text-[#FAA821] hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  )
}

// ── Job Drawer ──
const JobDrawer = ({ position, onClose }) => {
  const drawerRef = useRef(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(drawerRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
    )
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    gsap.to(drawerRef.current, {
      x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: onClose
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        ref={drawerRef}
        className="relative ml-auto w-full sm:w-[520px] lg:w-[600px] h-full bg-white flex flex-col shadow-2xl overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div className="relative flex-shrink-0 bg-stone-900 px-5 sm:px-6 pt-10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#FAA821] font-semibold">
              {position.department}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-[10px] uppercase tracking-widest text-white/60">{position.type}</span>
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight">
            {position.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
            <span className="text-white/60">{icons.pin}</span>
            {position.location}
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Close"
          >
            {icons.close}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!showForm ? (
            <div className="p-5 sm:p-6 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#FAA821] font-semibold mb-2">About the Role</p>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{position.summary}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">What You'll Do</p>
                <ul className="flex flex-col gap-2">
                  {position.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FAA821]/15 flex items-center justify-center text-[#FAA821] flex-shrink-0">
                        {icons.check}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">What We're Looking For</p>
                <ul className="flex flex-col gap-2">
                  {position.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <span className="mt-1 w-2 h-2 rounded-full bg-[#FAA821] flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-widest mb-5 hover:text-[#FAA821] transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to job details
              </button>
              <ApplyForm position={position} onClose={handleClose} />
            </div>
          )}
        </div>

        {!showForm && (
          <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-stone-100 bg-white">
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#FAA821] hover:bg-[#e8971a] text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#FAA821]/25"
            >
              {icons.send} Apply for This Role
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Perk Card ──
const PerkCard = ({ perk }) => (
  <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-5 sm:p-6 bg-white/70 backdrop-blur-sm border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
    <div className="w-11 h-11 rounded-xl bg-[#FAA821]/12 flex items-center justify-center text-[#FAA821] flex-shrink-0">
      {icons[perk.icon]}
    </div>
    <div>
      <h4 className="text-sm font-bold text-stone-800 mb-1">{perk.title}</h4>
      <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{perk.description}</p>
    </div>
  </div>
)

// ── Job Card ──
const JobCard = ({ position, onClick }) => {
  const deptIcon = deptIconMap[position.department] ?? icons.bag

  return (
    <div
      className="service-card group flex flex-col gap-4 p-5 sm:p-6
                 bg-white border border-stone-100 rounded-2xl cursor-pointer
                 hover:-translate-y-1 hover:border-[#FAA821]/40 hover:shadow-lg
                 transition-all duration-300"
      onClick={() => onClick(position)}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]
                         font-semibold text-[#c8840a] bg-[#FAA821]/10 px-3 py-1 rounded-full">
          <span className="text-[#FAA821] [&>svg]:w-3.5 [&>svg]:h-3.5">
            {deptIcon}
          </span>
          {position.department}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-stone-400
                         bg-stone-100 px-3 py-1 rounded-full font-medium">
          {position.type}
        </span>
      </div>

      <h3 className="text-[#faa821] text-lg sm:text-xl font-bold leading-snug
                     group-hover:text-[#fcb742] transition-colors duration-300">
        {position.title}
      </h3>

      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1">
        {position.summary}
      </p>

      <hr className="border-stone-100" />

      <div className="flex items-center gap-4 text-xs text-stone-400">
        <span className="flex items-center gap-1.5">
          {icons.pin}
          {position.location}
        </span>
        <span className="flex items-center gap-1.5">
          {icons.clock}
          {position.type}
        </span>
      </div>

      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em]
                       font-semibold text-[#faa821] border border-[#FAA821]/35 bg-[#FAA821]/6
                       px-4 py-2 rounded-lg w-fit
                       group-hover:bg-[#FAA821]/14 group-hover:border-[#FAA821]/60
                       transition-all duration-200">
        {icons.arrowRight}
        View Details
      </span>
    </div>
  )
}

// ── Main Page with fixed data loading ──
const CareerPage = () => {
  const heroRef           = useRef(null)
  const textRef           = useRef(null)
  const contentSectionRef = useRef(null)
  const maskRef           = useRef(null)
  const contentRef        = useRef(null)
  const headerRef         = useRef(null)
  const perksRef          = useRef(null)
  const jobsGridRef       = useRef(null)

  const [activeJob, setActiveJob] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { meta, perks } = careerData

  const transformJobData = (apiJob) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(apiJob.content, 'text/html')
    
    const responsibilities = []
    const requirements = []
    
    const listItems = doc.querySelectorAll('li')
    listItems.forEach(item => {
      const text = item.textContent.trim()
      if (text && text.length > 0) {
        responsibilities.push(text)
      }
    })
    
    const paragraphs = doc.querySelectorAll('p')
    paragraphs.forEach(p => {
      const text = p.textContent.trim()
      if (text && text.length > 0 && 
          !text.includes('What You\'ll Do') && 
          !text.includes("What We're Looking For") &&
          !responsibilities.includes(text)) {
        if (text.includes('certified') || text.includes('rescue') || text.includes('experience') || 
            text.includes('swimming') || text.includes('First aid') || text.includes('CPR') ||
            text.includes('license')) {
          requirements.push(text)
        }
      }
    })
    
    let department = 'Adventure'
    if (apiJob.title.toLowerCase().includes('marketing')) department = 'Marketing'
    else if (apiJob.title.toLowerCase().includes('operation')) department = 'Operations'
    else if (apiJob.title.toLowerCase().includes('guest')) department = 'Guest Experience'
    else if (apiJob.title.toLowerCase().includes('hospitality')) department = 'Hospitality'
    
    return {
      id: apiJob.id,
      title: apiJob.title,
      department: department,
      type: 'Full-time',
      location: 'Kusma, Nepal',
      summary: apiJob.short_description,
      responsibilities: responsibilities.length > 0 ? responsibilities : [apiJob.short_description],
      requirements: requirements.length > 0 ? requirements : ['Check job description for details'],
      is_archived: apiJob.is_archived
    }
  }

  // Fetch jobs with retry logic
  const fetchJobs = async (retryAttempt = 0) => {
    try {
      setLoading(true)
      const response = await axios.get("http://127.0.0.1:8000/api/jobs", {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      const data = response.data.data
      const archivedJobs = data.filter(job => job.is_archived === true)
      const transformedJobs = archivedJobs.map(transformJobData)
      
      setJobs(transformedJobs)
      setError(null)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      
      if (retryAttempt < 3) {
        const delay = Math.pow(2, retryAttempt) * 1000
        setTimeout(() => {
          fetchJobs(retryAttempt + 1)
        }, delay)
      } else {
        setError("Unable to load job listings. Please check your connection.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Load jobs on mount
  useEffect(() => {
    fetchJobs()
  }, [])

  // Initialize GSAP animations
  useEffect(() => {
    const initTimer = setTimeout(() => {
      ScrollTrigger.getAll().forEach((t) => t.kill())

      const ctx = gsap.context(() => {
        if (textRef.current) {
          gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
          )
        }

        if (contentSectionRef.current && heroRef.current) {
          gsap.set(contentSectionRef.current, { yPercent: 100 })
          
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (contentSectionRef.current) {
                gsap.set(contentSectionRef.current, { yPercent: 100 - self.progress * 100 })
              }
            },
          })
        }

        if (maskRef.current) {
          gsap.fromTo(maskRef.current,
            { scale: 1.2, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: 0.8,
              },
            }
          )
        }

        if (headerRef.current) {
          gsap.fromTo(headerRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.6,
              scrollTrigger: {
                trigger: contentSectionRef.current,
                start: 'top 80%', end: 'top 60%',
                scrub: 0.3, once: true,
              },
            }
          )
        }

        if (perksRef.current && perksRef.current.children.length > 0) {
          gsap.fromTo(Array.from(perksRef.current.children),
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: {
                trigger: perksRef.current,
                start: 'top 85%', once: true,
              },
            }
          )
        }
      }, heroRef)

      let rafId
      const onResize = () => {
        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => ScrollTrigger.refresh())
      }
      window.addEventListener('resize', onResize)

      return () => {
        ctx.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(rafId)
      }
    }, 100)

    return () => clearTimeout(initTimer)
  }, [])

  // Animate job cards when jobs are loaded
  useEffect(() => {
    if (!loading && jobsGridRef.current && jobs.length > 0) {
      const timer = setTimeout(() => {
        const elements = jobsGridRef.current?.children
        if (elements && elements.length > 0) {
          gsap.fromTo(Array.from(elements),
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: {
                trigger: jobsGridRef.current,
                start: 'top 85%', once: true,
              },
            }
          )
        }
      }, 200)
      
      return () => clearTimeout(timer)
    }
  }, [loading, jobs])

  return (
    <>
      <Helmet>
        <title>Careers at Harness Zipline &amp; Adventure Resort</title>
        <meta name="description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
        <link rel="canonical" href="https://www.theharnessnepal.com/careers" />
        <meta name="keywords" content="Harness careers, Kusma jobs, Nepal hospitality jobs, adventure resort careers" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Careers at Harness Zipline & Adventure Resort" />
        <meta property="og:description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
        <meta property="og:image" content={meta.heroImage} />
        <meta property="og:url" content="https://www.theharnessnepal.com/careers" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at Harness Zipline & Adventure Resort" />
        <meta name="twitter:description" content="Explore careers at Harness Zipline & Adventure Resort in Kusma, Nepal and apply for adventure, hospitality, marketing, and guest experience roles." />
        <meta name="twitter:image" content={meta.heroImage} />
      </Helmet>

      {activeJob && (
        <JobDrawer
          position={activeJob}
          onClose={() => setActiveJob(null)}
        />
      )}

      <div>
        <div
          ref={heroRef}
          className="relative bg-white w-full h-screen overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <img
            src={meta.heroImage}
            alt="Careers at Harness Zipline and Adventure Resort"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 z-10" />

          <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-10 lg:pb-20">
            <div ref={textRef} className="text-center px-4">
              <h2 className="text-white max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                {meta.heroTitle}
              </h2>
              <h2 className="text-[#faa821] max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-5 mt-4">
                {meta.heroSubtitle}
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
                {meta.heroDescription}
              </p>
            </div>
          </div>

          <div
            ref={contentSectionRef}
            className="absolute left-0 right-0 bottom-0 z-30 overflow-hidden"
            style={{ top: 'auto' }}
          >
            <div
              ref={maskRef}
              className="absolute inset-0 w-full h-full"
              style={{ transformOrigin: 'center center' }}
            >
              <img src="/images/mask.svg" alt="mask"
                className="w-full h-full object-cover object-top invert" />
            </div>

            <div
              ref={contentRef}
              className="relative z-10 w-full min-h-screen flex items-center justify-center mt-60"
            >
              <div
                className=" sm:block hidden absolute sm:top-24 top-32 right-0
                  w-[300px] sm:w-[400px] md:w-[500px]
                  h-[300px] sm:h-[400px] md:h-[500px]
                  pointer-events-none opacity-30 lg:opacity-40 z-0"
                style={{
                  backgroundImage: "url('/images/bg.png')",
                  backgroundSize: 'contain',
                  backgroundPosition: 'top right',
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-20 sm:mt-20 mt-36">
                <div className="w-full relative z-30 mt-48">

                  <div ref={headerRef} className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                    <button
                      className="text-white px-6 sm:px-8 py-2 mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold transition-colors duration-300 hover:opacity-90 relative z-30"
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
                      {meta.sectionBadge}
                    </button>

                    <h2 className="text-[#faa821] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 px-2 relative z-30">
                      {meta.sectionTitle}
                    </h2>

                    <p className="text-black/80 text-sm sm:text-base lg:text-xl max-w-3xl leading-relaxed px-2 relative z-30">
                      {meta.sectionDescription}
                    </p>
                  </div>

                  <div className="mt-14 sm:mt-16 lg:mt-20 max-w-6xl mx-auto px-2 sm:px-4 relative z-30">
                    <p className="text-center text-xs uppercase tracking-[0.28em] text-stone-400 font-semibold mb-6 sm:mb-8">
                      Why Work With Us
                    </p>
                    <div
                      ref={perksRef}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                    >
                      {perks.map((perk) => (
                        <PerkCard key={perk.id} perk={perk} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-16 sm:mt-20 lg:mt-24 flex flex-col items-center text-center px-4 relative z-30">
                    <div className="w-10 h-px bg-[#FAA821] mb-4" />
                    <h3 className="text-[#faa821] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                      Open Positions
                    </h3>
                    <p className="text-black/60 text-sm sm:text-base max-w-xl leading-relaxed">
                      Click any role to read the full job description and apply directly.
                    </p>
                  </div>

                  <div className="w-full mt-10 sm:mt-12 lg:mt-16">
                    {loading && jobs.length === 0 ? (
                      <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAA821]"></div>
                      </div>
                    ) : error ? (
                      <div className="text-center py-20">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                          onClick={() => fetchJobs(0)}
                          className="px-6 py-2 bg-[#FAA821] text-white rounded-lg hover:bg-[#e8971a] transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    ) : jobs.length === 0 ? (
                      <div className="text-center py-20">
                        <p className="text-stone-500 text-lg">No open positions at the moment. Check back soon!</p>
                      </div>
                    ) : (
                      <div
                        ref={jobsGridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-30"
                      >
                        {jobs.map((pos) => (
                          <JobCard key={pos.id} position={pos} onClick={setActiveJob} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-16 sm:mt-20 text-center px-4 relative z-30 pb-8 sm:pb-12">
                    <p className="text-stone-500 text-sm sm:text-base mb-4">
                      Don't see a role that fits? We'd still love to hear from you.
                    </p>
                    <a
                      href="mailto:theharnessnepal@gmail.com?subject=General%20Career%20Application"
                      className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send a General Application
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CareerPage