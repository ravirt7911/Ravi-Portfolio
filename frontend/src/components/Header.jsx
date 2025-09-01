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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-between">
          <div 
            className="font-light text-2xl cursor-pointer hover:scale-105 transition-all duration-500 transform text-white tracking-wider"
            onClick={() => scrollToSection("hero")}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "300"
            }}
          >
            Ravi Teeja
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-light text-white/70 hover:text-white transition-all duration-500 relative group tracking-wide"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-black hover:bg-gray-100 transition-all duration-500 hover:scale-105 text-sm font-light tracking-wide px-6 py-2"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
          >
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;