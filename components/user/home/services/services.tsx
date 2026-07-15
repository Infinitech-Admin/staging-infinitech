"use client";

import React, { useState, useRef } from "react";
import { Button } from "@heroui/react";
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
} from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";

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
      "Simple contact form",
      "1-year domain and hosting",
    ],
  },
  {
    name: "Premium",
    price: "9,999",
    icon: FaCalendarCheck,
    popular: true,
    features: [
      "Everything in Standard, plus:",
      "Up to 10 pages",
      "Client login dashboard",
      "Smart chat system",
    ],
  },
  {
    name: "Business",
    price: "14,999",
    icon: FaBriefcase,
    popular: false,
    features: [
      "SEO Pro Setup",
      "eCommerce-ready product catalog",
      "Upgraded motion & animation",
      "Video testimonials section",
    ],
  },
  {
    name: "Commerce",
    price: "21,999",
    icon: FaShoppingCart,
    popular: false,
    features: [
      "Full eCommerce system",
      "Booking calendar & tools",
      "Real-time notifications",
      "VIP priority support",
    ],
  },
];

// Each service has a cover image + a small gallery shown when the card is clicked
const brandingServices = [
  {
    name: "Social Media",
    image: "https://placehold.co/400x300/f59e0b/f59e0b",
    gallery: [
      "https://placehold.co/300x200/fbbf24/fbbf24",
      "https://placehold.co/300x200/f59e0b/f59e0b",
      "https://placehold.co/300x200/d97706/d97706",
    ],
  },
  {
    name: "TikTok Shop",
    image: "https://placehold.co/400x300/f43f5e/f43f5e",
    gallery: [
      "https://placehold.co/300x200/fb7185/fb7185",
      "https://placehold.co/300x200/f43f5e/f43f5e",
      "https://placehold.co/300x200/e11d48/e11d48",
    ],
  },
  {
    name: "Photo & Video",
    image: "https://placehold.co/400x300/06b6d4/06b6d4",
    gallery: [
      "https://placehold.co/300x200/22d3ee/22d3ee",
      "https://placehold.co/300x200/06b6d4/06b6d4",
      "https://placehold.co/300x200/0891b2/0891b2",
    ],
  },
  {
    name: "SEO",
    image: "https://placehold.co/400x300/10b981/10b981",
    gallery: [
      "https://placehold.co/300x200/34d399/34d399",
      "https://placehold.co/300x200/10b981/10b981",
      "https://placehold.co/300x200/059669/059669",
    ],
  },
  {
    name: "JuanTap",
    image: "https://placehold.co/400x300/8b5cf6/8b5cf6",
    gallery: [
      "https://placehold.co/300x200/a78bfa/a78bfa",
      "https://placehold.co/300x200/8b5cf6/8b5cf6",
      "https://placehold.co/300x200/7c3aed/7c3aed",
    ],
  },
  {
    name: "Paid Ads",
    image: "https://placehold.co/400x300/ef4444/ef4444",
    gallery: [
      "https://placehold.co/300x200/f87171/f87171",
      "https://placehold.co/300x200/ef4444/ef4444",
      "https://placehold.co/300x200/dc2626/dc2626",
    ],
  },
];

const Services = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("website");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
                    /mo
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

                <Button
                  size="sm"
                  className="mt-4 w-full bg-accent text-white font-medium"
                  onPress={() => router.push("/contact")}
                >
                  Choose {pkg.name}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 mb-8">
            <MdOutlineSpeed className="h-8 w-8 text-accent shrink-0" />
            <div>
              <h3 className="text-primary font-semibold">
                Website Audit & Optimization
              </h3>
              <p className="text-gray-500 text-sm">
                Already have a site? We'll improve speed, SEO, and UX.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-accent text-white font-medium"
              endContent={<LuArrowRight size={18} />}
              onPress={() => router.push("/contact")}
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      )}

      {/* MARKET RESEARCH */}
      {activeTab === "research" && (
        <div>
          <div className="max-w-2xl mx-auto rounded-xl border border-gray-100 bg-white p-8 text-center mb-8">
            <FaSearchDollar className="mx-auto h-10 w-10 text-accent mb-4" />
            <h3 className="text-primary font-bold text-xl mb-2">
              Market Research Report
            </h3>
            <p className="text-gray-500">
              Data-backed insights on your market, competitors, and audience.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-accent text-white font-medium"
              endContent={<LuArrowRight size={18} />}
              onPress={() => router.push("/contact")}
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
                    className={`group relative shrink-0 w-[220px] h-32 snap-start overflow-hidden rounded-xl border cursor-pointer shadow-sm transition-all
                      ${isSelected ? "border-accent ring-2 ring-accent" : "border-gray-200"}`}
                    onClick={() =>
                      setSelectedService(isSelected ? null : service.name)
                    }
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
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
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary font-bold text-lg">
                  {activeService.name} — Sample Work
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <LuX size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeService.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${activeService.name} sample ${idx + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Button
              className="bg-accent text-white font-medium"
              endContent={<LuArrowRight size={18} />}
              onPress={() => router.push("/contact")}
            >
              Grow My Brand
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
