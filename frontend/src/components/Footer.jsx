import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-light">Ravi Teeja K</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Developer & AI Engineer crafting intelligent solutions with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <div className="space-y-2">
              {["About", "Skills", "Projects", "Achievements", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="space-y-2">
              <a
                href="mailto:ravir7911@gmail.com"
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                ravir7911@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/kamsu-ravi-teeja"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://github.com/ravir7911"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {currentYear} Ravi Teeja K. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>and React</span>
            </div>
            
            <div className="text-sm text-gray-400">
              Available for opportunities • Remote, India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;