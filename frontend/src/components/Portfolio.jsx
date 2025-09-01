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
    // Simulate loading data with enhanced loading animation
    setTimeout(() => {
      setPortfolioData(mockData);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          {/* 3D Loading animation */}
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-white/40 border-r-transparent rounded-full animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 border-2 border-white/60 border-b-transparent rounded-full animate-spin animation-delay-300"></div>
          </div>
          <div className="mt-6 text-white font-light tracking-wider">Loading Portfolio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
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