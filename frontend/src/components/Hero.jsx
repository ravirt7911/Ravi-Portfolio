import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Hero = ({ data }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const geometryRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const geometricShapes = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create enhanced particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Create 3D geometric shapes
    for (let i = 0; i < 5; i++) {
      geometricShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: Math.floor(Math.random() * 3), // 0: triangle, 1: square, 2: hexagon
        opacity: Math.random() * 0.1 + 0.05,
        depth: Math.random() * 0.5 + 0.5,
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

      // Draw geometric shapes first (background)
      geometricShapes.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity;

        // Add 3D effect with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shape.opacity * 2})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${shape.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        // Draw different shapes
        ctx.beginPath();
        if (shape.type === 0) {
          // Triangle
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
        } else if (shape.type === 1) {
          // Square
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else {
          // Hexagon
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * shape.size / 2;
            const y = Math.sin(angle) * shape.size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        }

        ctx.stroke();
        ctx.restore();

        // Update rotation
        shape.rotation += shape.rotationSpeed;

        // Mouse interaction for shapes
        const dx = mousePos.current.x - shape.x;
        const dy = mousePos.current.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          shape.x -= (dx / distance) * force * 0.5;
          shape.y -= (dy / distance) * force * 0.5;
          shape.opacity = Math.min(0.3, shape.opacity + force * 0.1);
        } else {
          shape.opacity = Math.max(0.05, shape.opacity - 0.001);
        }
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.x -= (dx / distance) * force * 3;
          particle.y -= (dy / distance) * force * 3;
          particle.size = Math.min(8, particle.size + force);
        } else {
          particle.size = Math.max(2, particle.size - 0.1);
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.02;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        const glowSize = particle.size + Math.sin(particle.pulse) * 2;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 1.5})`;
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
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* 3D Background geometry */}
      <div className="absolute inset-0 opacity-5" style={{ zIndex: 2 }}>
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rotate-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-light tracking-tight leading-none text-white transform hover:scale-105 transition-all duration-700"
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.3), 0 0 100px rgba(255,255,255,0.1)',
                  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              {data.name}
            </h1>
            {/* 3D depth shadow */}
            <div className="absolute top-2 left-2 text-7xl md:text-9xl font-light tracking-tight leading-none opacity-10 -z-10">
              {data.name}
            </div>
          </div>
          
          <div className="relative">
            <p className="text-2xl md:text-3xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed transform hover:scale-102 transition-all duration-500">
              {data.title}
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            {data.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-white text-black hover:bg-gray-200 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/20 px-10 py-7 text-lg font-medium transform group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">View My Work</span>
            </Button>
            
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/20 px-10 py-7 text-lg font-medium transform group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">Get In Touch</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden">
          <div className="w-1.5 h-4 bg-white rounded-full mt-3 animate-bounce"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
        <p className="text-white/50 text-sm mt-2 font-light">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;