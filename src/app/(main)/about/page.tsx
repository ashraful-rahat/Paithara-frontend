import React from "react";
import {
  BookOpen,
  Users,
  Award,
  MapPin,
  Calendar,
  GraduationCap,
  School,
  HeartHandshake,
  Globe,
} from "lucide-react";
import Image from "next/image";
import FadeUp from "../components/FadeUp";

// Card Components
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className }) => (
  <div
    className={`rounded-lg bg-white border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3
    className={`text-xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const AboutUs = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "আধুনিক শিক্ষা ব্যবস্থা",
      description: "৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত মানসম্পন্ন শিক্ষা প্রদান",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
      description: "যোগ্য ও অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে পাঠদান",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "সহশিক্ষা কার্যক্রম",
      description: "খেলাধুলা, সাংস্কৃতিক কার্যক্রম ও বিভিন্ন প্রতিযোগিতা",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "উচ্চ সাফল্যের হার",
      description: "এসএসসি পরীক্ষায় ধারাবাহিক সাফল্য ও ভাল ফলাফল",
    },
  ];

  const facilities = [
    "সুবিশাল গ্রন্থাগার",
    "বিজ্ঞান গবেষণাগার",
    "কম্পিউটার ল্যাব",
    "খেলার মাঠ",
    "মসজিদ",
    "নিরাপদ পানীয় জলের ব্যবস্থা",
    "স্বাস্থ্যকর পরিবেশ",
    "পরিচ্ছন্ন শ্রেণীকক্ষ",
  ];

  const achievements = [
    {
      title: "প্রতিষ্ঠার বছর",
      value: "১৯৮৫",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "শিক্ষার্থী সংখ্যা",
      value: "৫০০+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "শিক্ষক সংখ্যা",
      value: "১০+",
      icon: <School className="h-5 w-5" />,
    },
    {
      title: "সাফল্যের হার",
      value: "৭০%+",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <FadeUp>
        <section className="relative py-20 px-6 bg-gray-50 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            পৈথারা উচ্চ বিদ্যালয়
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4 text-gray-700">
            <MapPin className="h-5 w-5" />
            <p className="text-lg">ফুলগাজী, ফেনী</p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-8 text-gray-700">
            <Calendar className="h-5 w-5" />
            <p className="text-lg">স্থাপিত: ১৯৮৫</p>
          </div>
          <p className="text-xl md:text-2xl font-medium text-gray-600">
            শিক্ষার আলোয় আলোকিত এক উজ্জ্বল ভবিষ্যৎ
          </p>
        </section>
      </FadeUp>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* About School */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <FadeUp>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/banner2.jpg"
                alt="বিদ্যালয়ের শ্রেণীকক্ষ"
                fill
                className="object-cover"
              />
            </div>
          </FadeUp>

          <FadeUp>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                আমাদের সম্পর্কে
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  ফেনী জেলার শিক্ষা প্রতিষ্ঠানের তালিকায় পৈথারা উচ্চ বিদ্যালয়
                  একটি গুরুত্বপূর্ণ নাম। ফুলগাজী উপজেলার এই উল্লেখযোগ্য শিক্ষা
                  প্রতিষ্ঠানটি ১৯৮৫ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে নিরলসভাবে
                  কাজ করে আসছে।
                </p>
                <p>
                  আমাদের বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত শিক্ষার্থীরা
                  অধ্যয়ন করে থাকে। প্রায় চার দশক ধরে আমরা এই অঞ্চলের
                  শিশু-কিশোরদের শিক্ষিত করে তুলেছি এবং তাদের একটি উজ্জ্বল
                  ভবিষ্যতের জন্য প্রস্তুত করেছি।
                </p>
                <p>
                  আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে থাকা
                  প্রতিভাকে বিকশিত করা এবং তাদের নৈতিক, আধ্যাত্মিক ও
                  বুদ্ধিবৃত্তিক উন্নতি সাধন করা।
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            আমাদের বিশেষত্ব
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeUp key={index}>
                <Card className="hover:shadow-md transition-shadow text-center p-6">
                  <div className="text-gray-800 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <FadeUp>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <HeartHandshake className="h-5 w-5" /> আমাদের লক্ষ্য
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    আমাদের প্রধান লক্ষ্য হলো শিক্ষার্থীদের একটি সুশিক্ষিত,
                    নৈতিকতাসম্পন্ন এবং দেশপ্রেমিক নাগরিক হিসেবে গড়ে তোলা। আমরা
                    চাই প্রতিটি শিক্ষার্থী জ্ঞান, বিজ্ঞান ও প্রযুক্তিতে দক্ষ
                    হয়ে সমাজের কল্যাণে নিজেদের নিয়োজিত করুক।
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Globe className="h-5 w-5" /> আমাদের দৃষ্টিভঙ্গি
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    আমাদের স্বপ্ন হলো পৈথারা উচ্চ বিদ্যালয়কে এই অঞ্চলের সেরা
                    শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত করা। আমরা চাই আমাদের
                    প্রাক্তন শিক্ষার্থীরা দেশ ও বিদেশে নিজেদের মেধা ও যোগ্যতার
                    পরিচয় দিক।
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/bannnnnnnner.jpg"
                alt="বিদ্যালয়ের অনুষ্ঠান"
                fill
                className="object-cover"
              />
            </div>
          </FadeUp>
        </section>

        {/* Facilities Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            আমাদের সুবিধাসমূহ
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((facility, index) => (
              <FadeUp key={index}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center text-gray-900 hover:bg-gray-50 transition-colors">
                  {facility}
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            আমাদের অর্জন
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <FadeUp key={index}>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-4 text-gray-700">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">
                    {item.value}
                  </h3>
                  <p className="text-gray-600">{item.title}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
