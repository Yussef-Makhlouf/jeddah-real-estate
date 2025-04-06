"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Building2, MapPin, Shield, Home, Car, Wifi, Check, ChevronDown, X, Share2, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import image from "next/image"
import Link from "next/link"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

export default function LandingPage() {
  // Platform detection (would be server-side in production)
  const [platform, setPlatform] = useState<string>("social")
  interface MobileModelCardProps {
    title: string;
    subtitle: string;
    image: string | StaticImport;
    area: number;
    roofArea: number;
    rooms: number;
    bathrooms: number;
    price: string;
    features: string[];
    onInquire: (modelName: string) => void; // Add this prop
  }
  
  // Set RTL direction for Arabic content
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"

    // Detect platform from URL params in a real implementation
    const url = new URL(window.location.href)
    const platformParam = url.searchParams.get("platform")
    if (platformParam) {
      setPlatform(platformParam)
    }
  }, [])

  // For scroll animations
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({})
  const observerRefs = useRef<(HTMLElement | null)[]>([])

  // For expandable sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // For video modal
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)

  // For share modal
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false)

  // For CTA sticky state
  const [isSticky, setIsSticky] = useState<boolean>(false)

  // For scroll progress
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  // WhatsApp phone number
  const whatsappNumber = "966536667967" // Replace with actual number without +

  // Function to open WhatsApp with a pre-filled message
  const openWhatsApp = (modelName: string = "") => {
    const message = encodeURIComponent(` استفسر بخصوص مشروع 24${modelName ? ` - نموذج ${modelName}` : ""}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  // Function to share the project
  const shareProject = async () => {
    const shareData = {
      title: "مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة",
      text: "مشروع سكني متميز في حي الزهراء بجدة بأسعار استثنائية تبدأ من 830000 ﷼ فقط",
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        setShareModalOpen(true)
      }
    } catch (error) {
      console.error("Error sharing:", error)
      setShareModalOpen(true)
    }
  }

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible((prev) => ({ ...prev, [index]: entry.isIntersecting }))
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Set sticky state for CTA
      if (window.scrollY > 300) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observers.forEach((observer, index) => {
        if (observerRefs.current[index]) observer.unobserve(observerRefs.current[index] as HTMLElement)
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current[index] = el
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  const handleInquire = (modelName: string) => {
    openWhatsApp(modelName)
  }

  const [selectedModel, setSelectedModel] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  interface FormErrors {
    name?: string;
    phone?: string;
    message?: string;
  }
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'الرجاء إدخال الاسم';
    if (!formData.phone || !/^05\d{8}$/.test(formData.phone)) newErrors.phone = 'الرجاء إدخال رقم هاتف صحيح';
    if (!formData.message) newErrors.message = 'الرجاء إدخال الرسالة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format WhatsApp message
    const message = `السلام عليكم، استفسر بخصوص مشروع 24 حي الزهراء

الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
الرسالة: ${formData.message}`;

    // Open WhatsApp
    const phoneNumber = '+201101675983';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Prevent going back to the homepage after form submission
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };

    // Redirect to thank you page
    window.history.replaceState(null, '', '/thank-you');
    window.location.href = '/thank-you';
  };

  // Model Data
  const modelData = [
    {
      name: 'A',
      price: '830,000 ريال',
      area: '156 م²',
      rooms: 4,
      bathrooms: 4,
      floor: 1,
      location: 'قريب من المطار',
      description: 'هذا النموذج يتميز بتصميم عصري ومساحات واسعة تناسب العائلات الكبيرة، مع إطلالة مميزة على الحديقة الخلفية.'
    },
    {
      name: 'B',
      price: '930,000 ريال',
      area: '190 م²',
      rooms: 5,
      bathrooms: 4,
      floor: 1,
      location: 'قريب من المطار',
      description: 'هذا النموذج يتميز بتصميم عصري ومساحات واسعة تناسب العائلات الكبيرة، مع إطلالة مميزة على الحديقة الخلفية.'
    },
    {
      name: 'C',
      price: '830,000 ريال',
      area: '156 م²',
      rooms: 4,
      bathrooms: 4,
      floor: 1,
      location: 'قريب من المطار',
      description: 'هذا النموذج يتميز بتصميم عصري ومساحات واسعة تناسب العائلات الكبيرة، مع إطلالة مميزة على الحديقة الخلفية.'
    },
    {
      name: 'D',
      price: '1,350,000 ريال',
      area: '220 م²',
      areaDetails: 'مساحة المباني ١٨٠ متر ومساحة السطح ٤٠ متر',
      rooms: 5,
      bathrooms: 5,
      floor: 1,
      location: 'قريب من المطار',
      description: 'هذا النموذج يتميز بتصميم عصري ومساحات واسعة تناسب العائلات الكبيرة، مع إطلالة مميزة على الحديقة الخلفية.'
    }
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden text-slate-900 text-right" dir="rtl">
      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute left-4 top-4 text-slate-500 hover:text-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">تواصل مع مستشار المبيعات</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="05XXXXXXXX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الرسالة</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#c48765] text-white py-2 rounded-lg hover:bg-[#34222e] transition-colors"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-[#c48765]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Platform badge */}
      {platform !== "social" && (
        <div className="fixed top-3 left-3 z-40 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium shadow-md">
          {platform === "google" && "إعلان Google"}
          {platform === "tiktok" && "إعلان TikTok"}
          {platform === "snapchat" && "إعلان Snapchat"}
          {platform === "meta" && "إعلان Meta"}
        </div>
      )}

      {/* Share button */}
      <button
        onClick={shareProject}
        className="fixed top-3 right-3 z-40 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
        aria-label="مشاركة"
      >
        <Share2 className="h-5 w-5 text-[#c48765]" />
      </button>

      {/* Hero Section */}
      <section className="relative bg-[#34222e]/5 py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-[#34222e] mb-6">
              امتلك منزل العمر في جدة
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-700 font-medium mb-4">
              مشروع 24-حي الزهراء
            </h2>
            <p className="text-2xl md:text-3xl text-[#c48765] font-bold">
              بأسعار تبدأ من 830,000 ريال فقط
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#34222e]/20">
              <div className="text-center mb-8">
                <h3 className="text-[#34222e]">
                  املأ النموذج وسيقوم مستشارنا العقاري بالتواصل معك
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-slate-700">الاسم</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 text-lg border-2 rounded-2xl bg-[#34222e]/5"
                    placeholder="الاسم الكامل"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-slate-700">رقم الهاتف</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 text-lg border-2 rounded-2xl bg-[#34222e]/5"
                      placeholder="05XXXXXXXX"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c48765]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-slate-700">الرسالة</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 text-lg border-2 rounded-2xl bg-[#34222e]/5 resize-none"
                    rows={4}
                    placeholder="اكتب رسالتك هنا"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#34222e] text-white py-4 rounded-2xl text-xl font-medium hover:from-[#34222e] hover:to-[#1d0728] transition-all duration-300"
                >
                  تواصل مع مستشار المبيعات
                </button>

                <p className="text-center text-slate-500 mt-6">
                  سيتم الرد عليك في أقرب وقت ممكن
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      {/* <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 text-right">
            <div className="bg-[#34222e]/10 p-3 rounded-xl text-center">
              <div className="text-[#c48765] font-bold text-xl md:text-2xl">156+</div>
              <div className="text-xs md:text-sm">م² مساحة</div>
            </div>
            <div className="bg-[#34222e]/10 p-3 rounded-xl text-center">
              <div className="text-[#c48765] font-bold text-xl md:text-2xl">4-5</div>
              <div className="text-xs md:text-sm">غرف</div>
            </div>
            <div className="bg-[#34222e]/10 p-3 rounded-xl text-center">
              <div className="text-[#c48765] font-bold text-xl md:text-2xl">25</div>
              <div className="text-xs font-medium">
                سنة ضمان
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Project Images */}
      <section ref={(el) => addToRefs(el, 0)} className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[0] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center">صور المشروع</h2>
            <div className="w-16 h-1 bg-[#c48765] mr-auto ml-auto mt-2"></div>
          </motion.div>

          <div className="relative">
            <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-hide">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible[0] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative aspect-square w-[300px] md:w-[400px] lg:w-[500px] flex-none snap-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={`/${item}.jpg`}
                    alt={`صورة المشروع ${item}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 text-white">
                    <p className="text-sm md:text-base font-medium">صورة المشروع</p>
                    <p className="text-xs md:text-sm">منظر خارجي</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation arrows for larger screens */}
            <div className="hidden md:block">
              <button 
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronDown className="h-6 w-6 -rotate-90 text-[#c48765]" />
              </button>
              <button 
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronDown className="h-6 w-6 rotate-90 text-[#c48765]" />
              </button>
            </div>

            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-[#c48765]/50"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Expandable Sections */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Features Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex items-center mb-8">
                <Home className="h-10 w-10 text-[#c48765]" />
                <h3 className="text-2xl font-bold mr-4">مميزات المشروع</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {[
                  "موقع إستراتيجي قريب من الواجهة البحرية",
                  "قريب من جميع الخدمات",
                  "ضمانات تصل إلى 25 سنة",
                  "مساحات تصل إلى 220م²",
                  "مواقف سيارات مخصصة",
                  "سمارت هوم"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center p-4 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-all duration-200">
                    <Check className="h-6 w-6 text-[#c48765] ml-3 flex-shrink-0" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full bg-[#c48765] text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-[#34222e] transition-all duration-300 hover:shadow-lg"
              >
                احجز الآن
              </button>
            </div>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex items-center mb-8">
                <MapPin className="h-10 w-10 text-[#c48765]" />
                <h3 className="text-2xl font-bold mr-4">مميزات الموقع</h3>
              </div>
              <div className="space-y-6 flex-grow">
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-amber-50/50 p-6 rounded-xl hover:bg-amber-50 transition-all duration-200">
                    <h4 className="text-lg font-bold mb-4">قريب من:</h4>
                    <ul className="space-y-3">
                      {["الشوارع الرئيسية", "المسجد", "الخدمات", "المراكز التجارية", "المطار"].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-6 w-6 text-[#c48765] ml-3 flex-shrink-0" />
                          <span className="text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/50 p-6 rounded-xl hover:bg-amber-50 transition-all duration-200">
                    <h4 className="text-lg font-bold mb-4">دقائق من:</h4>
                    <ul className="space-y-3">
                      {["طريق الأمير سلطان", "شارع حراء"].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-6 w-6 text-[#c48765] ml-3 flex-shrink-0" />
                          <span className="text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full bg-[#c48765] text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-[#34222e] transition-all duration-300 hover:shadow-lg"
              >
                احجز شقتك الآن
              </button>
            </div>
          </div>

          {/* Project Video Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">فيديو المشروع</h2>
              <div className="w-20 h-1 bg-[#c48765] mx-auto mt-4"></div>
            </div>

            <div 
              className="relative aspect-video max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 cursor-pointer"
              onClick={() => setVideoModalOpen(true)}
            >
              <Image
                src="/1.jpg"
                alt="فيديو المشروع"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#c48765] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-2"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 text-white">
                <p className="text-xl font-bold mb-1">فيديو المشروع</p>
                <p className="text-base">اضغط للمشاهدة</p>
              </div>
            </div>

            {/* Book now button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#c48765] hover:bg-[#34222e] text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                احجز وتملك الآن شقة العمر
              </button>
            </div>
          </div>
          {/* Warranty Card - Full Width */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <Shield className="h-10 w-10 text-[#c48765]" />
              <h3 className="text-2xl font-bold mr-4">ضمانات المشروع</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { years: "20", description: "القواطع والأفياش" },
                { years: "20", description: "الهيكل الإنشائي" },
                { years: "5", description: "المصاعد" },
                { years: "2", description: "أعمال السباكة والكهرباء" },
                { years: "2", description: "سمارت هوم" },
                { years: "1", description: "اتحاد ملاك" }
              ].map((warranty, index) => (
                <div key={index} className="p-4 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-all duration-200 flex flex-col justify-center">
                  <div className="text-2xl font-bold text-[#c48765]">{warranty.years}</div>
                  <div className="text-sm font-medium">
                    {warranty.years === "1" ? "سنة" : warranty.years === "2" ? "سنتين" : "سنوات"}
                  </div>
                  <div className="text-base mt-2">{warranty.description}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 w-full bg-[#c48765] text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-[#34222e] transition-all duration-300 hover:shadow-lg"
            >
              سجل الآن
            </button>
          </div>
        </div>
      </section>
      {/* Project Models */}
      <section ref={(el) => addToRefs(el, 2)} className="py-10 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[2] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center">نماذج المشروع</h2>
            <div className="w-16 h-1 bg-[#c48765] mr-auto ml-auto mt-2"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[2] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs defaultValue="model-a" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-slate-100 p-1 rounded-full w-full">
                {["A", "B", "C", "D"].map((model, index) => (
                  <TabsTrigger
                    key={index}
                    value={`model-${model.toLowerCase()}`}
                    className="rounded-full data-[state=active]:bg-[#c48765] data-[state=active]:text-white py-2"
                  >
                    {model}
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="model-a">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    <MobileModelCard
                      title="نموذج A"
                      image="/a.jpg"
                      subtitle="على شارع جنوبي شرقي"
                      area={156}
                      roofArea={156}
                      rooms={4}
                      bathrooms={4}
                      price="830,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "نوافذ كبيرة",
                        "صالة",
                        "مطبخ",
                        "بلكونة",
                        "سمارت هوم",
                        "موقف خاص",
                        "مصعد",
                        "كاميرات مراقبة",
                      ]}
                      onInquire={handleInquire}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="model-b">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    <MobileModelCard
                      title="نموذج B"
                      image="/b.jpg"
                      subtitle="خلفية شرقي شمالي غربي"
                      area={190}
                      roofArea={190}
                      rooms={5}
                      bathrooms={4}
                      price="930,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "نوافذ كبيرة",
                        "صالة",
                        "مطبخ",
                        "بلكونة",
                        "سمارت هوم",
                        "موقف خاص",
                        "مصعد",
                        "كاميرات مراقبة",
                      ]}
                      onInquire={handleInquire}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="model-c">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    <MobileModelCard
                      title="نموذج C"
                      image="/c.jpg"
                      subtitle="واجهة جنوبية غربية"
                      area={156}
                      roofArea={0}
                      rooms={4}
                      bathrooms={4}
                      price="830,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "نوافذ كبيرة",
                        "صالة",
                        "مطبخ",
                        "بلكونة",
                        "سمارت هوم",
                        "موقف خاص",
                        "مصعد",
                        "كاميرات مراقبة",
                      ]}
                      onInquire={handleInquire}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="model-d">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    <MobileModelCard
                      title="نموذج D"
                      image="/a.jpg"
                      subtitle="ملحق شرقي شمالي"
                      area={180}
                      roofArea={40}
                      rooms={5}
                      bathrooms={5}
                      price="1,350,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "نوافذ كبيرة",
                        "صالة",
                        "مطبخ",
                        "بلكونة",
                        "سمارت هوم",
                        "موقف خاص",
                        "مصعد",
                        "كاميرات مراقبة",
                        "اجمالي المساحه 220 متر"
                      ]}
                      onInquire={handleInquire}
                    />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Interactive Model Display Section */}
      <section className="py-24 md:py-40 bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Model Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {modelData.map((model, index) => (
              <button
                key={model.name}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all transform hover:scale-105 ${selectedModel === index ? 'bg-[#c48765] text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md'}`}
                onClick={() => setSelectedModel(index)}
              >
                النموذج {model.name}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            {/* Information Panel */}
            <div className="bg-white p-8 rounded-2xl shadow-xl h-full">
              <h3 className="text-2xl font-bold mb-6 text-slate-800">معلومات النموذج</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">المساحة</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].area}</span>
                  {modelData[selectedModel].areaDetails && (
                    <span className="text-sm text-slate-500 mt-1">{modelData[selectedModel].areaDetails}</span>
                  )}
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">السعر</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].price}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">الغرف</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].rooms}</span>
                  <span className="text-sm text-slate-500 mt-1">غرف نوم</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">دورات المياه</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].bathrooms}</span>
                  <span className="text-sm text-slate-500 mt-1">حمامات حديثة</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">الطابق</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].floor}</span>
                  <span className="text-sm text-slate-500 mt-1">طابق أرضي</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 mb-2">الموقع</span>
                  <span className="text-2xl font-bold text-slate-800">{modelData[selectedModel].location}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {modelData[selectedModel].description}
                </p>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-auto bg-slate-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <Image
                src={`/plans/model-${selectedModel + 1}.jpg`}
                alt={`مخطط النموذج ${selectedModel + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto object-contain p-6 hover:scale-110 transition-transform duration-500"
                quality={100}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        </div>
      </section>
      {/* Project Map */}
      <section ref={(el) => addToRefs(el, 3)} className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[3] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center">موقع المشروع</h2>
            <div className="w-16 h-1 bg-[#c48765] mr-auto ml-auto mt-2"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible[3] ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-slate-200 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="w-full h-[400px] md:h-[500px] lg:h-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.207909503884!2d39.1993937641382!3d21.5335112481012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21a4a8b2b2b2b%3A0x8b2b2b2b2b2b2b2b!2sG5MX%2BCP3%D8%8C%20%D8%B4%D8%A7%D8%B1%D8%B9%20%D9%81%D9%84%D8%B3%D8%B7%D9%8A%D9%86%D8%8C%20%D9%85%D8%B4%D8%B1%D9%81%D8%A9%D8%8C%20%D8%AC%D8%AF%D8%A9%2023335%D8%8C%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9!5e0!3m2!1sen!2ssa!4v1710615222226!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المشروع على خرائط جوجل"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section ref={(el) => addToRefs(el, 4)} className="py-10 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[4] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-none shadow-xl overflow-hidden py-12">
              <div className="bg-[#c48765]  p-4 text-white text-center">
                <h2 className="text-xl font-bold mb-1">احجز وحدتك الآن</h2>
                <p className="text-sm">سارع بالحجز قبل نفاد الوحدات المتاحة</p>
              </div>
              <CardContent className="p-4 bg-white">
                <Button
                  onClick={() => openWhatsApp()}
                  className="w-full bg-[#34222e] hover:from-[#34222e] hover:to-[#1d0728] text-white py-3 rounded-full shadow-lg"
                >
                  تواصل معنا الآن
                </Button>

                <div className="text-center mt-4 text-sm text-slate-500">أو اتصل بنا مباشرة</div>

                <a
                  href="tel:0536667967"
                  className="flex items-center justify-center gap-2 mt-2 p-3 border border-[#1d0728] rounded-md text-[#c48765] font-medium"
                >
            <PhoneIcon className="w-4 h-4" />
                  0536667967
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sticky CTA */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-slate-200 p-3 z-40"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">السعر يبدأ من</div>
                <div className="text-lg font-bold text-[#c48765]">﷼ 830000 </div>
              </div>
              <Button
                onClick={() => openWhatsApp()}
                className="bg-[#34222e] text-white px-6 py-2 rounded-full shadow-md"
              >
                احجز الآن
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full z-10"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/l9cH8RJQnYg"
                title="امتلك شقتك الآن في مدينة جدة - حي الزهراء"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen

              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#34222e] p-4 text-white">
                <h3 className="text-lg font-bold text-center">مشاركة المشروع</h3>
                <p className="text-sm text-center">شارك المشروع مع أصدقائك وعائلتك</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { 
                      name: "واتساب", 
                      color: "#c48765", 
                      icon: "whatsapp.svg",
                      action: () => {
                        const shareText = encodeURIComponent("مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة\n\nاستفسر الآن عن مشروع 24 في حي الزهراء\n" + window.location.href);
                        window.open(`https://wa.me/?text=${shareText}`, "_blank");
                      }
                    },
                    { 
                      name: "تويتر", 
                      color: "#d68c3c", 
                      icon: "twitter.svg",
                      action: () => {
                        const shareText = encodeURIComponent("مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة");
                        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`, "_blank");
                      }
                    },
                    { 
                      name: "فيسبوك", 
                      color: "#34222e", 
                      icon: "facebook.svg",
                      action: () => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
                      }
                    },
                    { 
                      name: "تلجرام", 
                      color: "#1d0728", 
                      icon: "telegram.svg",
                      action: () => {
                        const shareText = encodeURIComponent("مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة");
                        window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${shareText}`, "_blank");
                      }
                    },
                  ].map((platform, index) => (
                    <button 
                      key={index} 
                      className="flex flex-col items-center"
                      onClick={() => {
                        platform.action();
                        setShareModalOpen(false);
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                        style={{ backgroundColor: platform.color }}
                      >
                        <Image
                          src={`/placeholder.svg?height=24&width=24&text=${platform.name}`}
                          alt={platform.name}
                          width={24}
                          height={24}
                          className="invert"
                        />
                      </div>
                      <span className="text-xs">{platform.name}</span>
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center mb-4">
                  <input
                    type="text"
                    readOnly
                    value={window.location.href}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm text-right"
                  />
                  <Button
                    className="absolute right-1 top-1 bottom-1 bg-[#c48765] hover:bg-[#34222e] text-white text-xs px-2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("تم نسخ الرابط");
                    }}
                  >
                    نسخ الرابط
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-slate-300"
                  onClick={() => setShareModalOpen(false)}
                >
                  إغلاق
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  // Component for expandable sections
  function ExpandableSection({
    title,
    isExpanded,
    toggleExpand,
    icon,
    children,
  }: {
    title: string;
    isExpanded: boolean;
    toggleExpand: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) {
    return (
      <div className="mb-4">
        <button
          onClick={toggleExpand}
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[#c48765]"
        >
          <div className="flex items-center">
            {icon}
            <span className="text-lg font-bold mr-3">{title}</span>
          </div>
          <ChevronDown className={`h-5 w-5 text-[#c48765] transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {children}
        </div>
      </div>
    )
  }

  // Component for mobile model cards
  function MobileModelCard({
    title,
    subtitle,
    image,
    area,
    roofArea,
    rooms,
    bathrooms,
    price,
    features,
    onInquire
  }: {
    title: string;
    subtitle: string;
    image: string | StaticImport;
    area: number;
    roofArea: number;
    rooms: number;
    bathrooms: number;
    price: string;
    features: string[];
    onInquire: (modelName: string) => void;
  }) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="relative aspect-[16/9] -mx-4 -mt-4 mb-6 overflow-hidden rounded-t-lg shadow-lg">
            <Image
              src={image}
              alt={title}
              width={1280}
              height={720}
              className="object-cover hover:scale-105 transition-transform duration-300"
              quality={90}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-4 right-4 bg-[#34222e] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {price}
            </div>
          </div>

          <div className="space-y-3 mb-5 text-end">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-600 font-medium">{subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4" dir="rtl">
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Home className="h-6 w-6 text-[#c48765] ml-2" />
                <div>
                  <div className="text-xs text-slate-500">المساحة</div>
                  <div className="text-sm font-semibold text-slate-800">{area} م²</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100" dir="rtl">
                <Building2 className="h-6 w-6 text-[#c48765] ml-2" />
                <div>
                  <div className="text-xs font-bold text-slate-500">مساحة السطح</div>
                  <div className="text-sm font-semibold text-slate-800">{roofArea} م²</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Home className="h-6 w-6 text-[#c48765] ml-2" />
                <div>
                  <div className="text-xs text-slate-500">الغرف</div>
                  <div className="text-sm font-semibold text-slate-800">{rooms}</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Shield className="h-6 w-6 text-[#c48765] ml-2" />
                <div>
                  <div className="text-xs text-slate-500">دورات المياه</div>
                  <div className="text-sm font-semibold text-slate-800">{bathrooms}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm font-medium text-slate-700 mb-3">المميزات:</div>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm bg-amber-50 p-3 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors duration-200" dir="rtl">
                <Check className="h-5 w-5 text-[#c48765] ml-2 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500">السعر يبدأ من</div>
              <div className="text-xl font-bold text-[#34222e]"> ريال {price}</div>
            </div>
            <Button
              size="sm"
              className="bg-[#c48765] hover:bg-[#34222e] text-white px-6"
              onClick={() => onInquire(title)}
            >
              استفسار عبر واتساب
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}
