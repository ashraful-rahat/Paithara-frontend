import React from "react";
import Notice from "./components/Notice";
import Banner from "./components/Banner";
import Academic from "./components/Academic";
import StudentActivities from "./components/StudentActivities";
import SirSpeech from "./components/SirSpeech";
import ClassroomPage from "./components/Classroom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Notice />
      <Banner />
      <SirSpeech></SirSpeech>
      <Academic />
      <ClassroomPage />
      <StudentActivities />
    </div>
  );
};

export default HomePage;
