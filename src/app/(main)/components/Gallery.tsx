// components/Gallery.jsx
"use client";
import CircularGallery from "./CircularGallery";

const galleryItems = [
  { image: "/images/one.jpg", text: "One" },
  { image: "/images/two.jpg", text: "Two" },
  { image: "/images/three.jpg", text: "Three" },
  { image: "/images/four.jpg", text: "Four" },
  { image: "/images/rover.jpg", text: "Rover" },
  { image: "/images/rokto.jpg", text: "Blood Donation" },
  { image: "/images/gallery.jpg", text: "Gallery" },
  { image: "/images/curriculam3.jpg", text: "Curriculum" },
  { image: "/images/ovivabok.jpg", text: "Parent Meeting" },
];

const Gallery = () => {
  return (
    <div className="w-full bg-white h-[600px] relative my-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        📸 School Gallery
      </h2>
      <CircularGallery
        items={galleryItems}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
};

export default Gallery;
