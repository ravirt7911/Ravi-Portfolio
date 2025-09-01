import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 border border-white/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Enhanced Brand */}
          <div className="space-y-6">
            <div className="text-3xl font-light group cursor-pointer">
              <span className="group-hover:tracking-wider transition-all duration-500"
                    style={{
                      textShadow: '0 0 30px rgba(255,255,255,0.3)'
                    }}>
                Ravi Teeja K
              </span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Full Stack Developer & AI Engineer crafting intelligent solutions with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {/* Social icons with 3D effect */}
              {["GitHub", "LinkedIn", "Twitter"].map((social, index) => (
                <div key={social} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer group relative">
                  <div className="absolute inset-0 bg-white/5 rounded-full transform group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-xs font-medium relative z-10">{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Navigation</h3>
            <div className="space-y-3">
              {["About", "Skills", "Projects", "Achievements", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="block text-white/60 hover:text-white transition-all duration-300 text-left group relative"
                >
                  <span className="group-hover:translate-x-2 transform transition-transform duration-300 inline-block">
                    {link}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Connect */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:ravir7911@gmail.com"
                className="block text-white/60 hover:text-white transition-all duration-300 group relative"
              >
                <span className="group-hover:translate-x-2 transform transition-transform duration-300 inline-block">
                  ravir7911@gmail.com
                </span>
              </a>
              <a
                href="https://linkedin.com/in/kamsu-ravi-teeja"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/60 hover:text-white transition-all duration-300 group relative"
              >
                <span className="group-hover:translate-x-2 transform transition-transform duration-300 inline-block">
                  LinkedIn Profile
                </span>
              </a>
              <a
                href="https://github.com/ravir7911"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/60 hover:text-white transition-all duration-300 group relative"
              >
                <span className="group-hover:translate-x-2 transform transition-transform duration-300 inline-block">
                  GitHub Profile
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom section with 3D effects */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3 text-white/60 group">
              <span className="group-hover:text-white/80 transition-colors duration-300">© {currentYear} Ravi Teeja K. Made with</span>
              <Heart className="w-5 h-5 text-red-500 group-hover:scale-125 group-hover:text-red-400 transition-all duration-300" />
              <span className="group-hover:text-white/80 transition-colors duration-300">and React</span>
            </div>
            
            <div className="text-white/60 hover:text-white/80 transition-colors duration-300 cursor-pointer">
              <span className="hover:tracking-wider transition-all duration-300">
                Available for opportunities • Remote, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;