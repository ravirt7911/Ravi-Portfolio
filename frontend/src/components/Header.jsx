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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div 
            className="font-light text-xl cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection("hero")}
          >
            RT
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-normal hover:text-gray-600 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm font-normal hover:text-gray-600 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-normal hover:text-gray-600 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("achievements")}
              className="text-sm font-normal hover:text-gray-600 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Achievements
            </button>
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
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