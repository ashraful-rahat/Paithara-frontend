import Academic from "./components/Academic";
import Banner from "./components/Banner";
import ClassroomPage from "./components/Classroom";
import Gallery from "./components/Gallery";
import Notice from "./components/Notice";
import SirSpeech from "./components/SirSpeech";
import StudentActivities from "./components/StudentActivities";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Notice />
      <Banner />
      <SirSpeech></SirSpeech>
      <Academic />
      <ClassroomPage />
      <Gallery></Gallery>
      <StudentActivities />
    </div>
  );
};

export default HomePage;
