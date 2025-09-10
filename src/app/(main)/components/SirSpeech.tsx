"use client";
import { Quote } from "lucide-react";
import Image from "next/image";

const principalSpeech = {
  name: "মোঃ নূরন নবী ভূঁইয়া",
  designation: "প্রধান শিক্ষক",
  school: "পৈথারা উচ্চ বিদ্যালয়",
  speech:
    "আমাদের বিদ্যালয়ের মূল লক্ষ্য শিক্ষার্থীদের সুশিক্ষা প্রদান এবং নৈতিক ও সামাজিক মূল্যবোধ গঠন। প্রত্যেক শিক্ষার্থীর মাঝে আত্মবিশ্বাস ও দেশপ্রেম জাগ্রত করাই আমাদের অঙ্গীকার। পাশাপাশি আমরা চেষ্টা করি প্রতিটি শিক্ষার্থীর মধ্যে সৃজনশীলতা, নেতৃত্বগুণ ও মানবিক চেতনা বিকাশ করতে। আধুনিক জ্ঞান, প্রযুক্তি ও চারিত্রিক উৎকর্ষতার সমন্বয়ে তাদেরকে আগামী দিনের আলোকিত নাগরিক হিসেবে গড়ে তোলাই আমাদের লক্ষ্য।",
  image: "/images/two.jpg", // নিজের ইমেজ দিন
};

const SirSpeech = () => {
  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center mb-6 text-black">
          প্রধান শিক্ষকের বক্তব্য
        </h2>
        <div className="w-24 h-1 bg-black mx-auto mb-12 rounded-full"></div>

        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col md:flex-row items-center md:items-stretch">
          {/* Image */}
          <div className="md:w-2/5 w-full h-full relative">
            <Image
              src={principalSpeech.image}
              alt={principalSpeech.name}
              width={500}
              height={500}
              className="w-full h-full object-cover md:rounded-l-3xl"
              priority
            />
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg">
              <Quote className="text-black" size={28} />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-3/5 w-full p-10 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">
              {principalSpeech.name}
            </h3>
            <p className="text-gray-600 mt-1">{principalSpeech.designation}</p>
            <p className="text-gray-500 text-sm">{principalSpeech.school}</p>

            <p className="text-gray-800 text-lg leading-relaxed mt-6">
              {principalSpeech.speech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SirSpeech;
