"use client";

import React, { useState, useRef } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { GoCheck } from "react-icons/go";
import {
  FaGlobe,
  FaCalendarCheck,
  FaBriefcase,
  FaShoppingCart,
  FaSearchDollar,
  FaShieldAlt,
  FaBullseye,
  FaChartLine,
  FaLightbulb,
  FaMoneyBillWave,
  FaClock,
  FaHashtag,
  FaCalendarAlt,
  FaChartBar,
  FaBullhorn,
  FaStore,
  FaBoxOpen,
  FaVideo,
  FaSearch,
  FaMapMarkerAlt,
  FaTrophy,
  FaEye,
  FaCrosshairs,
  FaSlidersH,
} from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";
import RequestReportModal from "@/components/RequestReportModal";
import RequestWebsiteAuditModal from "@/components/RequestWebsiteAuditModal";

const mainCategories = [
  { key: "website", title: "Website Solutions" },
  { key: "research", title: "Market Research" },
  { key: "branding", title: "Branding & Marketing" },
];

const packages = [
  {
    name: "Standard",
    price: "6,583",
    icon: FaGlobe,
    popular: false,
    features: [
      "Up to 5 pages",
      "Social Media Links integration",
      "Simple Contact Form",
      "Email Alerts for Form Inquiries",
      "1-Year Domain and Hosting",
    ],
  },
  {
    name: "Premium",
    price: "9,999",
    icon: FaCalendarCheck,
    popular: true,
    features: [
      "Everything in Standard, plus:",
      "Up to 10 Website Pages",
      "Dashboard Login for Clients",
      "Traffic Insights & Analytics",
      "Enhanced Site Customization",
      "Smart Chat System",
      "Design Upgrade",
    ],
  },
  {
    name: "Business",
    price: "14,999",
    icon: FaBriefcase,
    popular: false,
    features: [
      "SEO Pro Setup + Dashboard Reports",
      "eCommerce-Ready Products Catalog",
      "Admin Staff & Client Management",
      "Upgraded Motion & Animation Website",
      "Lead Form With Dashboard Tracking",
      "Video Testimonials Section",
    ],
  },
  {
    name: "Commerce",
    price: "21,999",
    icon: FaShoppingCart,
    popular: false,
    features: [
      "Advanced Conversion Tracking",
      "Full eCommerce System",
      "Booking Calendar & Tools",
      "Real-Time Notifications System",
      "VIP Priority Support (Phone, Chat, Email)",
      "Dashboard for Clients",
    ],
  },
];

const researchBenefits = [
  {
    title: "Avoid Costly Mistakes",
    description: "Know your market before you spend on it.",
    icon: FaShieldAlt,
    color: "#ef4444",
  },
  {
    title: "Know Your Audience",
    description: "Understand who's buying and why.",
    icon: FaBullseye,
    color: "#0ea5e9",
  },
  {
    title: "Outsmart Competitors",
    description: "See what's working for others in your space.",
    icon: FaChartLine,
    color: "#f59e0b",
  },
  {
    title: "Make Confident Decisions",
    description: "Back your next move with real data.",
    icon: FaLightbulb,
    color: "#8b5cf6",
  },
  {
    title: "Save Money Long-Term",
    description: "Invest only where the data says it pays off.",
    icon: FaMoneyBillWave,
    color: "#10b981",
  },
  {
    title: "Move Faster",
    description: "Skip guesswork and launch with clarity.",
    icon: FaClock,
    color: "#f43f5e",
  },
];

// JuanTap: digital business card platform — illustrate a tappable NFC card
const JuanTapIllustration = () => (
  <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
    <rect width="400" height="300" fill="#7c3aed" />
    {/* business card */}
    <rect
      x="110"
      y="95"
      width="180"
      height="110"
      rx="12"
      fill="#ffffff"
      transform="rotate(-6 200 150)"
    />
    <circle
      cx="150"
      cy="130"
      r="16"
      fill="#8b5cf6"
      transform="rotate(-6 200 150)"
    />
    <rect
      x="175"
      y="122"
      width="70"
      height="7"
      rx="3.5"
      fill="#a78bfa"
      transform="rotate(-6 200 150)"
    />
    <rect
      x="175"
      y="136"
      width="50"
      height="6"
      rx="3"
      fill="#ddd6fe"
      transform="rotate(-6 200 150)"
    />
    <rect
      x="130"
      y="165"
      width="120"
      height="6"
      rx="3"
      fill="#ede9fe"
      transform="rotate(-6 200 150)"
    />
    <rect
      x="130"
      y="178"
      width="90"
      height="6"
      rx="3"
      fill="#ede9fe"
      transform="rotate(-6 200 150)"
    />
    {/* NFC tap waves */}
    <path
      d="M275 70 Q305 100 275 130"
      stroke="#ffffff"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M292 55 Q332 100 292 145"
      stroke="#ffffff"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* tap point */}
    <circle cx="245" cy="100" r="6" fill="#fbbf24" />
  </svg>
);

// Services that show real sample work (photo gallery)
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

interface BenefitItem {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}

interface BenefitsService {
  name: string;
  type: "benefits";
  icon: React.ComponentType<IconProps>;
  color: string;
  tagline: string;
  benefits: BenefitItem[];
}

interface GalleryService {
  name: string;
  type: "gallery";
  image?: string;
  illustration?: React.ComponentType;
  gallery: string[];
}

type BrandingService = BenefitsService | GalleryService;

const brandingServices: BrandingService[] = [
  {
    name: "Social Media Management",
    type: "benefits",
    icon: FaHashtag,
    color: "#0ea5e9",
    tagline: "Consistent content, real engagement.",
    benefits: [
      {
        icon: FaCalendarAlt,
        title: "Content Calendar",
        description: "Planned posts so your pages never go quiet.",
      },
      {
        icon: FaChartBar,
        title: "Analytics & Reporting",
        description: "See what's working with monthly performance reports.",
      },
      {
        icon: FaBullseye,
        title: "Better Engagement",
        description: "Content built to get likes, shares, and comments.",
      },
      {
        icon: FaClock,
        title: "Save Your Time",
        description: "We handle posting so you can focus on the business.",
      },
    ],
  },
  {
    name: "TikTok Shop Opening",
    type: "benefits",
    icon: FaStore,
    color: "#f43f5e",
    tagline: "Get your shop live and selling fast.",
    benefits: [
      {
        icon: FaStore,
        title: "Fast Store Setup",
        description: "We register and configure your shop end-to-end.",
      },
      {
        icon: FaBoxOpen,
        title: "Product Listing Optimization",
        description: "Titles, photos, and pricing built to convert.",
      },
      {
        icon: FaVideo,
        title: "Live Selling Guidance",
        description: "Learn how to run live selling sessions that sell.",
      },
      {
        icon: FaChartBar,
        title: "Sales Tracking",
        description: "Monitor orders and performance from day one.",
      },
    ],
  },
  {
    name: "Photography & Videography",
    type: "gallery",
    image: "https://picsum.photos/seed/photography-videography-svc/400/300",
    gallery: [
      "https://picsum.photos/seed/photography-videography-1/300/200",
      "https://picsum.photos/seed/photography-videography-2/300/200",
      "https://picsum.photos/seed/photography-videography-3/300/200",
    ],
  },
  {
    name: "SEO",
    type: "benefits",
    icon: FaSearch,
    color: "#059669",
    tagline: "Get found by the people already searching for you.",
    benefits: [
      {
        icon: FaTrophy,
        title: "Higher Search Rankings",
        description: "Rank where your customers are already looking.",
      },
      {
        icon: FaChartLine,
        title: "Long-Term Organic Traffic",
        description: "Consistent visitors without paying per click.",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Better Local Visibility",
        description: "Show up in local searches and Google Maps.",
      },
      {
        icon: FaShieldAlt,
        title: "Competitive Edge",
        description: "Outrank competitors still ignoring their SEO.",
      },
    ],
  },
  {
    name: "JuanTap",
    type: "gallery",
    illustration: JuanTapIllustration,
    gallery: [
      "https://picsum.photos/seed/juantap-business-card-1/300/200",
      "https://picsum.photos/seed/juantap-business-card-2/300/200",
      "https://picsum.photos/seed/juantap-business-card-3/300/200",
    ],
  },
  {
    name: "Paid Ads",
    type: "benefits",
    icon: FaBullhorn,
    color: "#f59e0b",
    tagline: "Put your brand in front of the right people, fast.",
    benefits: [
      {
        icon: FaEye,
        title: "Immediate Visibility",
        description: "Get seen the moment your campaign goes live.",
      },
      {
        icon: FaCrosshairs,
        title: "Targeted Reach",
        description: "Ads shown to the audience most likely to buy.",
      },
      {
        icon: FaChartBar,
        title: "Measurable ROI",
        description: "Track every peso spent against real results.",
      },
      {
        icon: FaSlidersH,
        title: "Scalable Budget Control",
        description: "Start small and scale up what performs.",
      },
    ],
  },
];

const Services = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("website");
  const [selectedService, setSelectedService] = useState<string | null>(
    brandingServices[0]?.name ?? null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Request a Report modal
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onOpenChange: onReportOpenChange,
  } = useDisclosure();

  // Request a Website Audit modal
  const {
    isOpen: isAuditOpen,
    onOpen: onAuditOpen,
    onOpenChange: onAuditOpenChange,
  } = useDisclosure();

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const activeService = brandingServices.find(
    (s) => s.name === selectedService,
  );

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="font-bold text-accent text-4xl">OUR SERVICES</h1>
        <p className="text-gray-500 mt-2">
          Solutions built to grow your business.
        </p>
      </div>

      {/* Main tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {mainCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border
              ${
                activeTab === cat.key
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-primary border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* WEBSITE SOLUTIONS */}
      {activeTab === "website" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1
                  ${
                    pkg.popular
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-accent shadow-xl shadow-accent/20"
                      : "bg-slate-800 border border-slate-700 hover:bg-slate-700"
                  }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <pkg.icon className="h-8 w-8 text-accent-light mb-3 mt-2" />
                <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
                <p className="text-2xl font-black text-white mt-1 mb-4">
                  ₱{pkg.price}
                  <span className="text-sm font-medium text-slate-400">
                    /month
                  </span>
                </p>

                <div className="space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <GoCheck className="text-accent-light shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              className="bg-accent text-white font-medium"
              endContent={<LuArrowRight size={18} />}
              onPress={() => router.push("/quote")}
            >
              Get a Free Quote
            </Button>
            <button
              onClick={onAuditOpen}
              className="flex items-center gap-2 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              <MdOutlineSpeed className="h-4 w-4 text-accent" />
              Already have a site? Get a Website Audit
            </button>
          </div>
        </div>
      )}

      {/* MARKET RESEARCH */}
      {activeTab === "research" && (
        <div>
          <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-primary to-slate-900 p-8 text-center mb-6 shadow-lg shadow-primary/20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <FaSearchDollar className="h-8 w-8 text-accent-light" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Market Research Report
            </h3>
            <p className="text-slate-300">
              Data-backed insights on your market, competitors, and audience.
            </p>
          </div>

          <div className="text-center mb-6">
            <h4 className="text-primary font-bold text-lg">
              As Our Client, Here's What You Gain
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 rounded-2xl bg-slate-50 p-4 sm:p-6">
            {researchBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${benefit.color}1a` }}
                >
                  <benefit.icon
                    className="h-6 w-6"
                    style={{ color: benefit.color }}
                  />
                </div>
                <h3 className="text-primary font-semibold text-sm mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-accent text-white font-medium"
              endContent={<LuArrowRight size={18} />}
              onPress={onReportOpen}
            >
              Request a Report
            </Button>
          </div>
        </div>
      )}

      {/* BRANDING & DIGITAL MARKETING — single-row carousel + expandable gallery */}
      {activeTab === "branding" && (
        <div>
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50"
              aria-label="Scroll left"
            >
              <LuChevronLeft className="text-primary" size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {brandingServices.map((service) => {
                const isSelected = selectedService === service.name;
                return (
                  <div
                    key={service.name}
                    className={`group relative shrink-0 w-[220px] h-32 snap-start overflow-hidden rounded-xl cursor-pointer shadow-md transition-all
                      ${isSelected ? "ring-2 ring-accent ring-offset-2" : "ring-1 ring-gray-200 hover:shadow-lg"}`}
                    onClick={() =>
                      setSelectedService(isSelected ? null : service.name)
                    }
                  >
                    {service.type === "benefits" ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                        }}
                      >
                        <service.icon className="h-10 w-10 text-white/90" />
                      </div>
                    ) : service.illustration ? (
                      <service.illustration />
                    ) : (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-semibold text-sm drop-shadow">
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50"
              aria-label="Scroll right"
            >
              <LuChevronRight className="text-primary" size={20} />
            </button>
          </div>

          {/* Expanded gallery panel for the selected service */}
          {activeService && (
            <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    activeService.type === "benefits"
                      ? activeService.color
                      : "#f59e0b",
                }}
              />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {activeService.type === "benefits" && (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: `${activeService.color}1a` }}
                      >
                        <activeService.icon
                          className="h-5 w-5"
                          style={{ color: activeService.color }}
                        />
                      </div>
                    )}
                    <h3 className="text-primary font-bold text-lg">
                      {activeService.type === "benefits"
                        ? `${activeService.name} — What You Get`
                        : `${activeService.name} — Sample Work`}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 shrink-0"
                    aria-label="Close"
                  >
                    <LuX size={20} />
                  </button>
                </div>

                {activeService.type === "benefits" ? (
                  <div>
                    {activeService.tagline && (
                      <p className="text-gray-500 text-sm mb-4">
                        {activeService.tagline}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeService.benefits.map((benefit) => (
                        <div
                          key={benefit.title}
                          className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-gray-100 hover:ring-gray-200 transition-all"
                        >
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-full shrink-0"
                            style={{
                              backgroundColor: `${activeService.color}1a`,
                            }}
                          >
                            <benefit.icon
                              className="h-4.5 w-4.5"
                              style={{ color: activeService.color }}
                            />
                          </div>
                          <div>
                            <h4 className="text-primary font-semibold text-sm">
                              {benefit.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeService.gallery.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${activeService.name} sample ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <RequestReportModal
        isOpen={isReportOpen}
        onOpenChange={onReportOpenChange}
      />
      <RequestWebsiteAuditModal
        isOpen={isAuditOpen}
        onOpenChange={onAuditOpenChange}
      />
    </section>
  );
};

export default Services;
