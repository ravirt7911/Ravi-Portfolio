import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const SinglePage = ({ data }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create minimal particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Subtle animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Very subtle mouse interaction
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = (80 - distance) / 80;
          particle.x -= (dx / distance) * force * 0.3;
          particle.y -= (dy / distance) * force * 0.3;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      />
      
      {/* Single Page Layout */}
      <div className="h-full flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4">
          <div 
            className="font-light text-lg text-white tracking-wide"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "300"
            }}
          >
            Ravi Teeja K
          </div>
          
          <div className="flex items-center space-x-6">
            <Button
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-xs font-light tracking-wide px-4 py-2"
              onClick={() => window.open(`mailto:${data.contact.email}`, "_blank")}
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              Contact
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Hero */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 
                    className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight text-white"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: "200",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {data.hero.name}
                  </h1>
                  
                  <p 
                    className="text-lg font-light text-white/80 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: "300"
                    }}
                  >
                    {data.hero.title}
                  </p>
                </div>
                
                <p 
                  className="text-sm text-white/60 leading-relaxed"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: "300",
                    lineHeight: "1.5"
                  }}
                >
                  {data.hero.description}
                </p>
                
                <div className="flex items-center space-x-4 pt-4">
                  <Button
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105 px-6 py-2 text-sm font-light tracking-wide"
                    onClick={() => window.open(`mailto:${data.contact.email}`, "_blank")}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
                  >
                    Get In Touch
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 px-6 py-2 text-sm font-light tracking-wide"
                    onClick={() => window.open(data.contact.profiles.linkedin, "_blank")}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Right Side - About & Experience */}
              <div className="space-y-8">
                
                {/* About Section */}
                <div>
                  <h2 
                    className="text-2xl font-extralight mb-4 tracking-tight text-white"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: "200"
                    }}
                  >
                    About
                  </h2>
                  <p 
                    className="text-sm text-white/70 leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: "300",
                      lineHeight: "1.5"
                    }}
                  >
                    Currently serving as Member of Technical Staff at Lyzr AI, architecting multi-agent systems and full-stack AI solutions for enterprise organizations including Under Armour, Tiny's Construction, and others.
                  </p>
                  
                  {/* Current Focus */}
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-extralight text-white mb-2"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: "200"
                      }}
                    >
                      Focus Areas
                    </h3>
                    <div className="space-y-1">
                      {[
                        "AI agent systems for enterprise automation",
                        "Scalable full-stack applications",
                        "Open-source contributions"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-white/40 rounded-full mt-1.5 flex-shrink-0"></div>
                          <p 
                            className="text-xs text-white/60 leading-relaxed"
                            style={{
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: "300"
                            }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h3 
                    className="text-lg font-extralight mb-3 text-white"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: "200"
                    }}
                  >
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {data.about.experience.slice(0, 2).map((exp, index) => (
                      <div key={exp.id} className="space-y-1">
                        <div>
                          <h4 
                            className="text-sm font-light text-white"
                            style={{
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: "300"
                            }}
                          >
                            {exp.title}
                          </h4>
                          <p 
                            className="text-sm text-white/70"
                            style={{
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: "300"
                            }}
                          >
                            {exp.company} • {exp.duration}
                          </p>
                        </div>
                        
                        <p 
                          className="text-xs text-white/60 leading-relaxed"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: "300",
                            lineHeight: "1.4"
                          }}
                        >
                          {exp.description[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <a
                href="mailto:ravir7911@gmail.com"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-xs font-light"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/kamsu-ravi-teeja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-xs font-light"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ravir7911"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-xs font-light"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
              >
                GitHub
              </a>
            </div>
            
            <p 
              className="text-white/40 text-xs"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "300"
              }}
            >
              Remote, India • Available for opportunities
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SinglePage;