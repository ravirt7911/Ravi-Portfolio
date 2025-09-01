import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Contact from "./Contact";
import Footer from "./Footer";
import { mockData } from "../data/mock";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPortfolioData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Achievements data={portfolioData.achievements} />
        <Contact data={portfolioData.contact} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;