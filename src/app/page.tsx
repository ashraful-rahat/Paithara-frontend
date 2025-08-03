import React from "react";
import Notice from "./components/Notice";
import Banner from "./components/Banner";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Notice />
      <Banner />
    </div>
  );
};

export default HomePage;
