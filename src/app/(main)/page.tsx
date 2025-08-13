import React from "react";
import Notice from "./components/Notice";
import Banner from "./components/Banner";
import Academic from "./components/Academic";
import StudentActivities from "./components/StudentActivities";
import SirSpeech from "./components/SirSpeech";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Notice />
      <Banner />
      <SirSpeech></SirSpeech>
      <Academic />
      <StudentActivities />
    </div>
  );
};

export default HomePage;
