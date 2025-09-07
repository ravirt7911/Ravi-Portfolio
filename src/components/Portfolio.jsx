import React, { useState, useEffect } from "react";
import SinglePage from "./SinglePage";
import { mockData } from "../data/mock";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create initial particles for background animation
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      direction: Math.random() * 360
    }));
    setParticles(initialParticles);

    // Simulate progressive loading with different stages
    const totalDuration = 1200; // 1.2 seconds (reduced from 2.5)
    const stageInterval = totalDuration / 5;
    
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 4; // Increased increment for faster loading
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setPortfolioData(mockData);
            setIsLoading(false);
          }, 300); // Reduced timeout
          return 100;
        }
        return newProgress;
      });
    }, 30); // Reduced interval for faster updates

    // Animate particles
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction * Math.PI / 180) * particle.speed * 0.1) % 100,
        y: (particle.y + Math.sin(particle.direction * Math.PI / 180) * particle.speed * 0.1) % 100,
        direction: particle.direction + 0.5
      })));
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(particleInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                transform: `scale(${particle.size})`,
                animation: `pulse ${2 + particle.speed}s infinite`
              }}
            />
          ))}
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/20 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main loading content */}
        <div className="relative z-10 text-center">
          {/* 3D Loading Logo */}
          <div className="relative mb-8">
            <div className="w-20 h-20 relative mx-auto">
              {/* Outer rotating ring */}
              <div 
                className="absolute inset-0 border-2 border-white/30 rounded-full"
                style={{
                  animation: 'spin 3s linear infinite',
                  transform: 'rotateX(60deg)'
                }}
              ></div>
              
              {/* Middle rotating ring */}
              <div 
                className="absolute inset-2 border-2 border-white/50 rounded-full"
                style={{
                  animation: 'spin 2s linear infinite reverse',
                  transform: 'rotateY(60deg)'
                }}
              ></div>
              
              {/* Inner pulsing core */}
              <div className="absolute inset-6 bg-gradient-to-r from-white to-white/60 rounded-full animate-pulse">
                <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-80 max-w-xs mx-auto mb-6">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white/60 to-white transition-all duration-300 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="flex justify-center items-center mt-2">
              <span className="text-white/60 text-xs font-medium">{loadingProgress}%</span>
            </div>
          </div>

          {/* Fun interactive elements */}
          <div className="mt-8 flex justify-center space-x-4">
            {[0, 1, 2, 3, 4].map((index) => {
              const isActive = loadingProgress >= (index + 1) * 20;
              return (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-white scale-110 shadow-lg shadow-white/50' 
                      : 'bg-white/30 scale-100'
                  }`}
                  style={{
                    animation: isActive ? 'bounce 1s infinite' : 'none',
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* CSS animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-auto">
      <SinglePage data={portfolioData} />
    </div>
  );
};

export default Portfolio;