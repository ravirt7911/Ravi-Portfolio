import React, { useState, useEffect } from "react";
import SinglePage from "./SinglePage";
import { mockData } from "../data/mock";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPortfolioData(mockData);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 border border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mt-2 text-white font-light text-xs tracking-widest">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SinglePage data={portfolioData} />
    </div>
  );
};

export default Portfolio;