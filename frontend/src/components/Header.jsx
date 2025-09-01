import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div 
            className="font-light text-2xl cursor-pointer hover:scale-110 transition-all duration-500 transform hover:rotate-3 text-white"
            onClick={() => scrollToSection("hero")}
            style={{
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}
          >
            RT
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {["about", "skills", "projects", "achievements"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-light text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1 transform capitalize relative group"
              >
                {section}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-black hover:bg-gray-200 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-white/20 transform"
            size="sm"
          >
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;