"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const speeches = [
  {
    name: "মোঃ নূরন নবী ভূঁইয়া",
    designation: "ভারপ্রাপ্ত প্রধান শিক্ষক",
    school: "পৈথারা উচ্চ বিদ্যালয়",
    speech:
      "আমাদের বিদ্যালয়ের মূল লক্ষ্য শিক্ষার্থীদের সুশিক্ষা প্রদান এবং নৈতিক ও সামাজিক মূল্যবোধ গঠন। প্রত্যেক শিক্ষার্থীর মাঝে আত্মবিশ্বাস ও দেশপ্রেম জাগ্রত করাই আমাদের অঙ্গীকার।",
  },
  {
    name: "আবুর রহিম",
    designation: "সহকারী শিক্ষক",
    school: "পৈথারা উচ্চ বিদ্যালয়",
    speech:
      "শিক্ষা মানুষের মনন, চিন্তা ও কর্মে ইতিবাচক পরিবর্তন আনে। আমরা চেষ্টা করি শিক্ষার্থীদের মননশীল, সৃজনশীল ও দায়িত্বশীল নাগরিক হিসেবে গড়ে তুলতে।",
  },
  {
    name: "মিজানুর রহমান",
    designation: "সহকারী শিক্ষক",
    school: "পৈথারা উচ্চ বিদ্যালয়",
    speech:
      "শিক্ষা শুধু বইয়ের মধ্যে সীমাবদ্ধ নয়, এটি জীবনের প্রতিটি ক্ষেত্রে প্রযোজ্য। শিক্ষার্থীরা যেন বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলা করতে সক্ষম হয়, সেটাই আমাদের উদ্দেশ্য।",
  },
  {
    name: "শিউলি রাণী চক্রবর্তী",
    designation: "সহকারী শিক্ষক",
    school: "পৈথারা উচ্চ বিদ্যালয়",
    speech:
      "শিক্ষার্থীদের মাঝে শৃঙ্খলা, সততা ও মানবিকতা বিকাশে আমরা কাজ করি। আমাদের বিদ্যালয় শিক্ষার্থীদের সর্বাঙ্গীণ উন্নয়নে প্রতিশ্রুতিবদ্ধ।",
  },
];

const SirSpeech = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? speeches.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === speeches.length - 1 ? 0 : prev + 1));
  };

  const current = speeches[index];

  return (
    <div className="bg-white py-10 px-4">
      <h2 className="text-3xl font-bold  text-gray-900 text-center mb-8">
        শিক্ষকদের বক্তব্য
      </h2>

      <div className="max-w-4xl mx-auto relative border border-gray-200 rounded-xl shadow-lg bg-white p-8 transition-all duration-300">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        >
          <ChevronRight size={20} />
        </button>

        {/* Speech Content */}
        <h3 className="text-xl font-bold text-gray-900">{current.name}</h3>
        <p className="text-gray-700">{current.designation}</p>
        <p className="text-gray-700 mb-4">{current.school}</p>
        <p className="text-gray-600 leading-relaxed">{current.speech}</p>
      </div>
    </div>
  );
};

export default SirSpeech;
