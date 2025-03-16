"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Building2, MapPin, Shield, Home, Car, Wifi, Check, ChevronDown, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import image from "next/image"

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
      text: "مشروع سكني متميز في حي الزهراء بجدة بأسعار استثنائية تبدأ من 775,000 ﷼ فقط",
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

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current[index] = el
    }
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const handleInquire = (modelName: string) => {
    openWhatsApp(modelName)
  }

  const [selectedModel, setSelectedModel] = useState(0);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden text-slate-900 text-right" dir="rtl">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
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
        <Share2 className="h-5 w-5 text-amber-500" />
      </button>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[0] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">مشروع 24</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              مشروع سكني فاخر في قلب جدة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 text-right">
            <div className="bg-amber-50 p-3 rounded-xl text-center">
              <div className="text-amber-500 font-bold text-xl md:text-2xl">156+</div>
              <div className="text-xs md:text-sm">م² مساحة</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl text-center">
              <div className="text-amber-500 font-bold text-xl md:text-2xl">4-5</div>
              <div className="text-xs md:text-sm">غرف</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl text-center">
              <div className="text-amber-500 font-bold text-xl md:text-2xl">25</div>
              <div className="text-xs md:text-sm">سنة ضمان</div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="w-16 h-1 bg-amber-500 mr-auto ml-auto mt-2"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible[0] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={`/${item}.jpg`}
                  alt={`صورة المشروع ${item}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 right-4 text-white">
                  <p className="text-sm font-medium">صورة المشروع</p>
                  <p className="text-xs">منظر خارجي</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expandable Sections */}
      <section className="py-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          {/* Project Features */}
          <ExpandableSection
            title="مميزات المشروع"
            isExpanded={expandedSection === "features"}
            toggleExpand={() => toggleSection("features")}
            icon={<Home className="h-5 w-5 text-amber-500" />}
          >
            <div className="grid grid-cols-1 gap-3 mt-4">
              {[
                { icon: <MapPin className="h-5 w-5" />, text: "موقع إستراتيجي قريب من الواجهة البحرية" },
                { icon: <Building2 className="h-5 w-5" />, text: "قريب من جميع الخدمات" },
                { icon: <Shield className="h-5 w-5" />, text: "ضمانات تصل إلى 25 سنة" },
                { icon: <Home className="h-5 w-5" />, text: "مساحات تصل إلى 220م²" },
                { icon: <Car className="h-5 w-5" />, text: "مواقف سيارات مخصصة" },
                { icon: <Wifi className="h-5 w-5" />, text: "سمارت هوم" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-amber-50 p-3 rounded-lg">
                  <div className="bg-white p-2 rounded-full ml-3 shadow-sm">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Location Advantages */}
          <ExpandableSection
            title="مميزات الموقع"
            isExpanded={expandedSection === "location"}
            toggleExpand={() => toggleSection("location")}
            icon={<MapPin className="h-5 w-5 text-amber-500" />}
          >
            <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-3">قريب من:</h3>
              <ul className="space-y-2">
                {["الشوارع الرئيسية", "المسجد", "الخدمات", "المراكز التجارية"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-amber-500 ml-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-3">دقائق من:</h3>
              <ul className="space-y-2">
                {["طريق الأمير سلطان", "شارع حراء"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-amber-500 ml-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ExpandableSection>

          {/* Warranty Information */}
          <ExpandableSection
            title="ضمانات المشروع"
            isExpanded={expandedSection === "warranty"}
            toggleExpand={() => toggleSection("warranty")}
            icon={<Shield className="h-5 w-5 text-amber-500" />}
          >
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { years: "25", description: "القواطع والأفياش" },
                { years: "20", description: "الهيكل الإنشائي" },
                { years: "5", description: "المصاعد" },
                { years: "2", description: "أعمال السباكة والكهرباء" },
                { years: "2", description: "سمارت هوم" },
                { years: "1", description: "اتحاد ملاك" },
              ].map((warranty, index) => (
                <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold text-amber-500">{warranty.years}</div>
                  <div className="text-xs font-medium">
                    {warranty.years === "1" ? "سنة" : warranty.years === "2" ? "سنتين" : "سنوات"}
                  </div>
                  <div className="text-sm mt-1">{warranty.description}</div>
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      </section>

      {/* Project Video */}
      <section ref={(el) => addToRefs(el, 1)} className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible[1] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center">فيديو المشروع</h2>
            <div className="w-16 h-1 bg-amber-500 mr-auto ml-auto mt-2"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible[1] ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-lg"
            onClick={() => setVideoModalOpen(true)}
          >
            <Image
              src="/placeholder.svg?height=720&width=1280&text=فيديو المشروع"
              alt="فيديو المشروع"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white mr-1"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
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
            <div className="w-16 h-1 bg-amber-500 mr-auto ml-auto mt-2"></div>
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
                    className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white py-2"
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
                  >
                    <MobileModelCard
                      title="نموذج A"
                      image="/a.jpg"
                      subtitle="على شارع جنوبي شرقي"
                      area={156}
                      roofArea={156}
                      rooms={4}
                      bathrooms={4}
                      price="775,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "شبابيك كبيرة",
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
                  >
                    <MobileModelCard
                      title="نموذج B"
                      image="/b.jpg"
                      subtitle="خلفية شرقي شمالي غربي"
                      area={195}
                      roofArea={195}
                      rooms={5}
                      bathrooms={4}
                      price="885,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "شبابيك كبيرة",
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
                  >
                    <MobileModelCard
                      title="نموذج C"
                      image="/c.jpg"
                      subtitle="واجهة جنوبية غربية"
                      area={156}
                      roofArea={0}
                      rooms={4}
                      bathrooms={4}
                      price="775,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "شبابيك كبيرة",
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
                  >
                    <MobileModelCard
                      title="نموذج D"
                      image="/a.jpg"
                      subtitle="ملحق شرقي شمالي"
                      area={220}
                      roofArea={40}
                      rooms={5}
                      bathrooms={5}
                      price="1,350,000"
                      features={[
                        "غرفة خادمة",
                        "غرفة سائق",
                        "شقق مودرن",
                        "أسقف مرتفعة",
                        "شبابيك كبيرة",
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
              </AnimatePresence>
            </Tabs>
          </motion.div>
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
            <div className="w-16 h-1 bg-amber-500 mr-auto ml-auto mt-2"></div>
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

      {/* Interactive Model Display Section */}
      <section className="py-24 md:py-40 bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Model Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['A', 'B', 'C', 'D'].map((model, index) => (
              <button
                key={model}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors  ${selectedModel === index ? 'bg-amber-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                onClick={() => {
                  console.log('Model selected:', index);
                  setSelectedModel(index);
                }}
              >
                النموذج {model}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8" >
            {/* Information Panel */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">معلومات النموذج</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">المساحة:</span>
                  <span className="font-medium text-right">150 م²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">الغرف:</span>
                  <span className="font-medium text-right">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">دورات المياه:</span>
                  <span className="font-medium text-right">2</span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative aspect-square lg:h-[600px] bg-slate-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={`/plans/model-${selectedModel + 1}.jpg`}
                alt={`مخطط النموذج ${selectedModel + 1}`}
                fill
                className="object-cover p-4 hover:scale-105 transition-transform duration-300"
                quality={90}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
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
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white text-center">
                <h2 className="text-xl font-bold mb-1">احجز وحدتك الآن</h2>
                <p className="text-sm">سارع بالحجز قبل نفاذ الوحدات المتاحة</p>
              </div>
              <CardContent className="p-4 bg-white">
                <Button
                  onClick={() => openWhatsApp()}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full shadow-lg"
                >
                  تواصل معنا الآن
                </Button>

                <div className="text-center mt-4 text-sm text-slate-500">أو اتصل بنا مباشرة</div>

                <a
                  href="tel:0536667967"
                  className="flex items-center justify-center gap-2 mt-2 p-3 border border-amber-200 rounded-md text-amber-600 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
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
                <div className="text-lg font-bold text-amber-500">775,000 ﷼</div>
              </div>
              <Button
                onClick={() => openWhatsApp()}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-full shadow-md"
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
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="فيديو المشروع"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
                <h3 className="text-lg font-bold text-center">مشاركة المشروع</h3>
                <p className="text-sm text-center">شارك المشروع مع أصدقائك وعائلتك</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { 
                      name: "واتساب", 
                      color: "#25D366", 
                      icon: "whatsapp.svg",
                      action: () => {
                        const shareText = encodeURIComponent("مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة\n\nاستفسر الآن عن مشروع 24 في حي الزهراء\n" + window.location.href);
                        window.open(`https://wa.me/?text=${shareText}`, "_blank");
                      }
                    },
                    { 
                      name: "تويتر", 
                      color: "#1DA1F2", 
                      icon: "twitter.svg",
                      action: () => {
                        const shareText = encodeURIComponent("مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة");
                        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`, "_blank");
                      }
                    },
                    { 
                      name: "فيسبوك", 
                      color: "#1877F2", 
                      icon: "facebook.svg",
                      action: () => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
                      }
                    },
                    { 
                      name: "تلجرام", 
                      color: "#0088cc", 
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
                    className="w-full p-2 pl-20 border border-gray-300 rounded-md text-sm text-right"
                  />
                  <Button
                    className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-600 text-white text-xs px-2"
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
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
            isExpanded ? "bg-amber-500 text-white shadow-md" : "bg-white shadow-sm"
          }`}
        >
          <div className="flex items-center">
            {icon}
            <h3 className="text-lg font-bold mr-2">{title}</h3>
          </div>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
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
                <Home className="h-6 w-6 text-amber-500 ml-2" />
                <div>
                  <div className="text-xs text-slate-500">المساحة</div>
                  <div className="text-sm font-semibold text-slate-800">{area} م²</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100" dir="rtl">
                <Building2 className="h-6 w-6 text-amber-500 ml-2" />
                <div>
                  <div className="text-xs font-bold text-slate-500">مساحة السطح</div>
                  <div className="text-sm font-semibold text-slate-800">{roofArea} م²</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Home className="h-6 w-6 text-amber-500 ml-2" />
                <div>
                  <div className="text-xs text-slate-500">الغرف</div>
                  <div className="text-sm font-semibold text-slate-800">{rooms}</div>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Shield className="h-6 w-6 text-amber-500 ml-2" />
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
                <Check className="h-5 w-5 text-amber-500 ml-2 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500">السعر يبدأ من</div>
              <div className="text-xl font-bold text-amber-600">{price} ريال</div>
            </div>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6"
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
