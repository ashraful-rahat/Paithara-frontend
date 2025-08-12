import React from "react";
import Notice from "./components/Notice";
import Banner from "./components/Banner";
import Academic from "./components/Academic";
import StudentActivities from "./components/StudentActivities";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Notice />
      <Banner />
      <Academic />
      <StudentActivities />
    </div>
  );
};

export default HomePage;
