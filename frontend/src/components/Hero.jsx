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

    // Create fewer, more elegant particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2,
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

    // Minimalistic animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        // Subtle mouse interaction
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 1;
          particle.y -= (dy / distance) * force * 1;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.01;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw minimalistic particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity + Math.sin(particle.pulse) * 0.1})`;
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ zIndex: 1 }}
      />
      
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 
              className="text-6xl md:text-8xl font-extralight tracking-tight leading-tight text-white"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "200",
                letterSpacing: "-0.02em"
              }}
            >
              {data.name}
            </h1>
            
            <p 
              className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "300"
              }}
            >
              {data.title}
            </p>
          </div>
          
          <p 
            className="text-lg text-white/60 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "300",
              lineHeight: "1.7"
            }}
          >
            {data.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16">
            <Button
              onClick={() => scrollToSection("about")}
              className="bg-white text-black hover:bg-gray-100 transition-all duration-500 hover:scale-105 px-10 py-4 text-base font-light tracking-wide"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              Learn More
            </Button>
            
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 px-10 py-4 text-base font-light tracking-wide"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Minimalistic scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;