const StudentActivities = () => {
  const activities = [
    {
      id: 1,
      title: "খেলাধুলা",
      description:
        "আমাদের স্কুলে বিভিন্ন ধরনের খেলাধুলার আয়োজন করা হয়। শিক্ষার্থীরা সক্রিয়ভাবে অংশগ্রহণ করে।",
      image: "/images/sports.jpg",
      gradient: "from-primary/80 to-transparent",
    },
    {
      id: 2,
      title: "রোভার স্কাউটস",
      description:
        "রোভার স্কাউটস এর মাধ্যমে শিক্ষার্থীদের নেতৃত্ব দক্ষতা ও সমাজসেবা শেখানো হয়।",
      image: "/images/rover.jpg",
      gradient: "from-green-500/80 to-transparent",
    },
    {
      id: 3,
      title: "গাছ লাগানো",
      description:
        "পরিবেশ সচেতনতার জন্য নিয়মিত গাছ লাগানোর কর্মসূচি পরিচালনা করা হয়।",
      image: "/images/gach.jpg",
      gradient: "from-emerald-500/80 to-transparent",
    },
  ];

  return (
    <section className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl"></div>
          <h2 className="text-5xl font-bold mb-4 text-gray-900 relative">
            ছাত্রছাত্রীদের কার্যকলাপ
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            আমাদের শিক্ষার্থীদের সর্বাঙ্গীণ বিকাশের জন্য বিভিন্ন কার্যক্রম
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map(({ id, title, description, image, gradient }) => (
            <div
              key={id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-primary p-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white rounded-2xl h-full w-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <span className="text-xs font-semibold">{`0${id}`}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 relative">
                  <div className="absolute -top-3 left-6 w-6 h-6 bg-primary rounded-full shadow-md"></div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {description}
                  </p>

                  {/* Learn More */}
                  <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">আরো জানুন</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 rounded-full px-6 py-3 shadow-md">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              আরো কার্যক্রম শীঘ্রই
            </span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentActivities;
