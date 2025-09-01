import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <div className="space-y-8">
          <div 
            className="text-2xl font-extralight text-white/80"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200"
            }}
          >
            Ravi Teeja K
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
            <a
              href="mailto:ravir7911@gmail.com"
              className="text-white/50 hover:text-white/80 transition-colors duration-500 text-sm font-light"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/kamsu-ravi-teeja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors duration-500 text-sm font-light"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ravir7911"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors duration-500 text-sm font-light"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              GitHub
            </a>
          </div>

          <div className="border-t border-white/5 pt-8">
            <p 
              className="text-white/40 text-xs"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "300"
              }}
            >
              © {currentYear} • Available for opportunities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;