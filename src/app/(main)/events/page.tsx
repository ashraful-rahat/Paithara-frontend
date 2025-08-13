const EventsPage = () => {
  const events = [
    {
      title: "রোভার স্কাউটস সচেতনতামূলক অনুষ্ঠান",
      description: `
বিদ্যালয়ের রোভার স্কাউটস দল শিক্ষার্থীদের চরিত্র গঠন, নেতৃত্বগুণ বৃদ্ধি এবং সামাজিক দায়িত্ববোধ তৈরির উদ্দেশ্যে এই সচেতনতামূলক অনুষ্ঠান আয়োজন করে।  
অনুষ্ঠানে স্বাস্থ্য সচেতনতা, পরিবেশ রক্ষা, দুর্যোগকালীন সহায়তা ও সমাজসেবা সম্পর্কিত বিভিন্ন কর্মসূচি নিয়ে আলোচনা হয়।  
শিক্ষার্থীরা দলে দলে অংশগ্রহণ করে এবং বাস্তব জীবনের সমস্যার সমাধানে কার্যকরী পদক্ষেপ শিখে।  
এই ধরনের কার্যক্রমের মাধ্যমে তারা শুধু জ্ঞান অর্জনই করে না, বরং সমাজের কল্যাণে কাজ করার মানসিকতাও গড়ে তোলে।`,
      image: "/images/curiculam2.jpg",
    },
    {
      title: "পুরস্কার বিতরণী অনুষ্ঠান",
      description: `
বিদ্যালয়ের শিক্ষার্থীদের সারাবছরের কৃতিত্ব ও সাফল্যকে সম্মান জানাতে অনুষ্ঠিত হয় পুরস্কার বিতরণী অনুষ্ঠান।  
এই দিনে বিদ্যালয় প্রাঙ্গণ সেজে ওঠে আনন্দ ও উচ্ছ্বাসে।  
বিভিন্ন শ্রেণির শিক্ষার্থীরা পড়াশোনা, খেলাধুলা, সাংস্কৃতিক কার্যক্রম ও শৃঙ্খলাবোধের জন্য পুরস্কার পায়।  
অনুষ্ঠানে অতিথিরা শিক্ষার্থীদের উৎসাহিত করেন এবং ভবিষ্যতের জন্য প্রেরণামূলক বক্তব্য রাখেন।  
এটি শিক্ষার্থীদের মনোবল বৃদ্ধি করে এবং আরো ভালো ফলাফল অর্জনে উদ্বুদ্ধ করে।`,
      image: "/images/curiiculam.jpg",
    },
    {
      title: " আবদুল কালাম স্যারের বিদায় সংবর্ধনা",
      description: `
বিদ্যালয়ের প্রাক্তন শিক্ষক ও সকলের শ্রদ্ধেয় ড. এ.পি.জে. আবদুল কালাম স্যার দীর্ঘদিনের শিক্ষকতা জীবন শেষে অবসর গ্রহণ করেন।  
তাঁর বিদায় উপলক্ষে বিদ্যালয় কর্তৃপক্ষ, শিক্ষক-শিক্ষার্থী এবং প্রাক্তন ছাত্রছাত্রীরা একত্রিত হয়ে এক আবেগঘন সংবর্ধনার আয়োজন করে।  
অনুষ্ঠানে স্যারের অবদানের কথা তুলে ধরা হয় এবং শিক্ষার্থীদের জীবনে তাঁর অনুপ্রেরণামূলক ভূমিকা স্মরণ করা হয়।  
তিনি শিক্ষার্থীদের নীতি-নৈতিকতা, জ্ঞানপিপাসা ও দেশপ্রেমের শিক্ষা দিয়ে গেছেন, যা চিরকাল স্মরণীয় হয়ে থাকবে।`,
      image: "/images/curi.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center space-y-6">
          <div className="inline-block p-1 bg-gradient-primary rounded-full shadow-glow animate-glow">
            <h1 className="text-4xl md:text-6xl font-bold bg-white rounded-full px-8 py-4 text-gray-900 t bg-gradient-primary">
              বিদ্যালয়ের বিশেষ অনুষ্ঠানসমূহ
            </h1>
          </div>
          <p className="text-lg t text-gray-900   max-w-2xl mx-auto">
            আমাদের বিদ্যালয়ের গুরুত্বপূর্ণ অনুষ্ঠান ও কার্যক্রমসমূহ যা
            শিক্ষার্থীদের জীবনে অবিস্মরণীয় স্মৃতি তৈরি করে
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {events.map((event, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-card shadow-soft hover:shadow-hover transition-all duration-500 transform hover:-translate-y-2 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-10" />
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating Number Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-float">
                      <span className="text-2xl font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 relative">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-accent opacity-10 rounded-bl-full" />

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="inline-block">
                        <span className="px-4 py-2 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-full  shadow-soft  text-gray-900 ">
                          বিশেষ অনুষ্ঠান
                        </span>
                      </div>

                      <h2 className="text-3xl  lg:text-4xl font-bold text-gray-900">
                        {event.title}
                      </h2>
                    </div>

                    <div className="h-1 w-24 bg-gradient-accent rounded-full shadow-soft" />

                    <div className="relative">
                      <p className=" text-gray-900  leading-relaxed text-lg">
                        {event.description}
                      </p>

                      {/* Subtle Quote Decoration */}
                      <div className="absolute -top-4 -left-4 text-6xl text-accent/20 font-serif">
                        "
                      </div>
                    </div>
                  </div>

                  {/* Bottom Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-primary rounded-r-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-card rounded-full shadow-soft">
          <div className="w-3 h-3 bg-gradient-primary rounded-full animate-glow" />
          <span className=" text-gray-900 font-medium">
            আরও অনুষ্ঠান আসছে শীঘ্রই
          </span>
          <div className="w-3 h-3 bg-gradient-accent rounded-full animate-glow" />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
