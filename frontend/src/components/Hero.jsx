import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Hero = ({ data }) => {
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

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
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

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
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
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-none">
            {data.name}
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {data.title}
          </p>
          
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
            >
              View My Work
            </Button>
            
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;