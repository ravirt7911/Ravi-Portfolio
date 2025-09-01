import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
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
    }, 1200);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          {/* Minimalistic loading animation */}
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 border border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mt-4 text-white font-light text-sm tracking-widest">Loading...</div>
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
        <Contact data={portfolioData.contact} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;