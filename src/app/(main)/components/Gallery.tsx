// components/Gallery.tsx
"use client";

import { useState } from "react";
import CircularGallery from "./CircularGallery";

const Gallery = () => {
  const [activeView, setActiveView] = useState<"circular" | "grid">("circular");

  const galleryItems = [
    { image: "/images/one.jpg", text: "প্রধান ফটক" },
    { image: "/images/two.jpg", text: "শিক্ষার্থী সমাবেশ" },
    { image: "/images/three.jpg", text: "ক্লাসরুম" },
    { image: "/images/four.jpg", text: "বিদ্যালয় ভবন" },
    { image: "/images/rover.jpg", text: "স্কাউট কার্যক্রম" },
    { image: "/images/rokto.jpg", text: "রক্তদান" },
    { image: "/images/gallery.jpg", text: "পুনর্মিলনী" },
    { image: "/images/curriculam3.jpg", text: "শিক্ষাক্রম" },
    { image: "/images/ovivabok.jpg", text: "অভিভাবক সমাবেশ" },
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🏫 স্কুল গ্যালারি
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          আমাদের বিদ্যালয়ের স্মরণীয় মুহূর্ত ও কার্যক্রমের সংগ্রহ
        </p>

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveView("circular")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "circular"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔄 সার্কুলার ভিউ
          </button>
          <button
            onClick={() => setActiveView("grid")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "grid"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📱 গ্রিড ভিউ
          </button>
        </div>
      </div>

      {/* Circular Gallery View */}
      {activeView === "circular" && (
        <div className="relative">
          <div className="h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
            <CircularGallery
              items={galleryItems}
              bend={2.5}
              textColor="#1f2937"
              borderRadius={0.06}
              scrollSpeed={1.5}
              scrollEase={0.03}
            />
          </div>

          {/* Instructions */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm md:text-base">
              ⚡ স্ক্রল বা ড্র্যাগ করে ছবিগুলো দেখুন | 🖱️ মাউস হুইল ব্যবহার করুন
            </p>
          </div>
        </div>
      )}

      {/* Grid Gallery View */}
      {activeView === "grid" && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${
                        index + 1
                      }/400/300`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {item.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {galleryItems.length}+
          </div>
          <div className="text-gray-700">মোট ছবি</div>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-600 mb-2">১০+</div>
          <div className="text-gray-700">বিভিন্ন ইভেন্ট</div>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">২০২৪</div>
          <div className="text-gray-700">বর্তমান বছর</div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
