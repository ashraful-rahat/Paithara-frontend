const StudentActivities = () => {
  const activities = [
    {
      id: 1,
      title: "খেলাধুলা",
      description:
        "আমাদের স্কুলে বিভিন্ন ধরনের খেলাধুলার আয়োজন করা হয়। শিক্ষার্থীরা সক্রিয়ভাবে অংশগ্রহণ করে।",
      image: "/images/sports.jpg",
    },
    {
      id: 2,
      title: "রোভার স্কাউটস",
      description:
        "রোভার স্কাউটস এর মাধ্যমে শিক্ষার্থীদের নেতৃত্ব দক্ষতা ও সমাজসেবা শেখানো হয়।",
      image: "/images/rover.jpg",
    },
    {
      id: 3,
      title: "গাছ লাগানো",
      description:
        "পরিবেশ সচেতনতার জন্য নিয়মিত গাছ লাগানোর কর্মসূচি পরিচালনা করা হয়।",
      image: "/images/gach.jpg",
    },
  ];

  return (
    <section className=" bg-white max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        ছাত্রছাত্রীদের কার্যকলাপ
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {activities.map(({ id, title, description, image }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentActivities;
