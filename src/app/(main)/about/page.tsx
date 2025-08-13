import React from "react";
import {
  BookOpen,
  Users,
  Award,
  MapPin,
  Calendar,
  GraduationCap,
} from "lucide-react";

interface CardProps {
  children: React.ReactNode;
  className?: string; // className অপশনাল এবং string টাইপের
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "secondary"; // শুধু 'secondary' variant নির্দিষ্ট করা হলো
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant, className }) => {
  const baseStyle =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <div
      className={`${baseStyle} ${
        variant ? variants[variant] : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface SeparatorProps {
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return <div className={`h-[1px] w-full bg-border ${className}`}></div>;
};

const AboutUs = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "আধুনিক শিক্ষা ব্যবস্থা",
      description: "৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত মানসম্পন্ন শিক্ষা প্রদান",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
      description: "যোগ্য ও অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে পাঠদান",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "সহশিক্ষা কার্যক্রম",
      description: "খেলাধুলা, সাংস্কৃতিক কার্যক্রম ও বিভিন্ন প্রতিযোগিতা",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <section className="bg-gradient-primary text-primary-foreground py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            পৈথারা উচ্চ বিদ্যালয়
          </h1>
          <div
            className="flex items-center justify-center gap-2 mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <MapPin className="h-5 w-5" />
            <p className="text-lg md:text-xl">ফুলগাজী, ফেনী</p>
          </div>
          <div
            className="flex items-center justify-center gap-2 mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Calendar className="h-5 w-5" />
            <p className="text-lg">স্থাপিত: ১৯৮৫</p>
          </div>
          <p
            className="text-xl md:text-2xl font-medium animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            শিক্ষার আলোয় আলোকিত এক উজ্জ্বল ভবিষ্যৎ
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <section className="animate-fade-in">
          <Card className="shadow-soft border-0 bg-gradient-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
                আমাদের সম্পর্কে
              </CardTitle>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                ফেনী জেলার শিক্ষা প্রতিষ্ঠানের তালিকায় পৈথারা উচ্চ বিদ্যালয়
                একটি গুরুত্বপূর্ণ নাম। ফুলগাজী উপজেলার এই উল্লেখযোগ্য শিক্ষা
                প্রতিষ্ঠানটি ১৯৮৫ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে নিরলসভাবে
                কাজ করে আসছে।
              </p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="mb-6 leading-relaxed">
                  আমাদের বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত শিক্ষার্থীরা
                  অধ্যয়ন করে থাকে। প্রায় চার দশক ধরে আমরা এই অঞ্চলের
                  শিশু-কিশোরদের শিক্ষিত করে তুলেছি এবং তাদের একটি উজ্জ্বল
                  ভবিষ্যতের জন্য প্রস্তুত করেছি।
                </p>
                <p className="mb-6 leading-relaxed">
                  আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে থাকা
                  প্রতিভাকে বিকশিত করা এবং তাদের নৈতিক, আধ্যাত্মিক ও
                  বুদ্ধিবৃত্তিক উন্নতি সাধন করা। আমরা বিশ্বাস করি যে সঠিক
                  শিক্ষাই পারে একটি জাতিকে এগিয়ে নিয়ে যেতে।
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            আমাদের বিশেষত্ব
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-soft hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card group hover-scale"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center group-hover:animate-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-soft border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  আমাদের লক্ষ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  আমাদের প্রধান লক্ষ্য হলো শিক্ষার্থীদের একটি সুশিক্ষিত,
                  নৈতিকতাসম্পন্ন এবং দেশপ্রেমিক নাগরিক হিসেবে গড়ে তোলা। আমরা
                  চাই প্রতিটি শিক্ষার্থী জ্ঞান, বিজ্ঞান ও প্রযুক্তিতে দক্ষ হয়ে
                  সমাজের কল্যাণে নিজেদের নিয়োজিত করুক।
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  আমাদের দৃষ্টিভঙ্গি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  আমাদের স্বপ্ন হলো পৈথারা উচ্চ বিদ্যালয়কে এই অঞ্চলের সেরা
                  শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত করা। আমরা চাই আমাদের
                  প্রাক্তন শিক্ষার্থীরা দেশ ও বিদেশে নিজেদের মেধা ও যোগ্যতার
                  পরিচয় দিক।
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Card className="shadow-soft border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
                আমাদের সুবিধাসমূহ
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                শিক্ষার্থীদের সর্বোচ্চ সুবিধা প্রদানের জন্য আমাদের রয়েছে আধুনিক
                সব সুবিধা
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {facilities.map((facility, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="py-3 px-4 text-center justify-center bg-secondary/50 hover:bg-secondary transition-colors cursor-default"
                  >
                    {facility}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Card className="shadow-soft border-0 bg-gradient-primary text-primary-foreground">
            <CardContent className="py-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">৩৮+</h3>
                  <p className="text-xl opacity-90">বছরের অভিজ্ঞতা</p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">৫০০+</h3>
                  <p className="text-xl opacity-90">শিক্ষার্থী</p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">২৫+</h3>
                  <p className="text-xl opacity-90">অভিজ্ঞ শিক্ষক</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        <section
          className="text-center animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <h2 className="text-2xl font-bold text-primary mb-4">যোগাযোগ</h2>
          <p className="text-muted-foreground mb-2">
            <strong>ঠিকানা:</strong> পৈথারা, ফুলগাজী, ফেনী
          </p>
          <p className="text-muted-foreground">
            আরও তথ্যের জন্য বিদ্যালয়ে সরাসরি যোগাযোগ করুন
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
