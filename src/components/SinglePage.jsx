import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const SinglePage = ({ data }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const geometryShapes = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create enhanced particles with 3D properties
    for (let i = 0; i < 125; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100 + 50,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.6 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    // Create 3D geometric shapes
    for (let i = 0; i < 10; i++) {
      geometryShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 50 + 25,
        size: Math.random() * 60 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        type: Math.floor(Math.random() * 4),
        opacity: Math.random() * 0.25 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        depth: Math.random() * 30 + 10,
      });
    }

    // Mouse/Touch move handler for responsive interaction
    const handleInteraction = (e) => {
      let clientX, clientY;
      
      if (e.touches && e.touches.length > 0) {
        // Touch interaction
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Mouse interaction
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      mousePos.current = {
        x: clientX,
        y: clientY,
      };
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    // Enhanced 3D animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3D geometric shapes first (background layer)
      geometryShapes.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        
        // 3D transformation effects
        const perspective = 1000;
        const scale = perspective / (perspective + shape.z);
        ctx.scale(scale, scale);
        
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity * (1 + Math.sin(shape.pulse) * 0.3);

        // Create 3D depth gradient - enhanced visibility
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(1, shape.size));
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shape.opacity * 5})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${shape.opacity * 3})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${shape.opacity * 1.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        // Draw different 3D shapes
        ctx.beginPath();
        if (shape.type === 0) {
          // 3D Triangle with depth
          for (let layer = 0; layer < 3; layer++) {
            const layerSize = shape.size - layer * 5;
            const layerOpacity = shape.opacity * (1 - layer * 0.2);
            ctx.globalAlpha = layerOpacity;
            
            ctx.moveTo(0, -layerSize / 2);
            ctx.lineTo(-layerSize / 2, layerSize / 2);
            ctx.lineTo(layerSize / 2, layerSize / 2);
            ctx.closePath();
            ctx.stroke();
            
            ctx.translate(1, 1);
          }
        } else if (shape.type === 1) {
          // 3D Square with perspective
          const perspective3D = Math.sin(shape.rotationX) * 10;
          ctx.beginPath();
          ctx.moveTo(-shape.size/2, -shape.size/2 + perspective3D);
          ctx.lineTo(shape.size/2, -shape.size/2 - perspective3D);
          ctx.lineTo(shape.size/2, shape.size/2 + perspective3D);
          ctx.lineTo(-shape.size/2, shape.size/2 - perspective3D);
          ctx.closePath();
          ctx.stroke();
          
          // 3D depth lines
          ctx.moveTo(-shape.size/2, -shape.size/2 + perspective3D);
          ctx.lineTo(-shape.size/2 + shape.depth, -shape.size/2 + perspective3D - shape.depth);
          ctx.moveTo(shape.size/2, -shape.size/2 - perspective3D);
          ctx.lineTo(shape.size/2 + shape.depth, -shape.size/2 - perspective3D - shape.depth);
          ctx.stroke();
        } else if (shape.type === 2) {
          // 3D Hexagon
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 + shape.rotation;
            const x = Math.cos(angle) * shape.size / 2;
            const y = Math.sin(angle) * shape.size / 2 + Math.sin(shape.rotationY) * 5;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        } else {
          // 3D Circle with orbital rings
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          
          // Orbital rings for 3D effect
          ctx.beginPath();
          ctx.ellipse(0, 0, shape.size / 2, shape.size / 4, shape.rotation, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(0, 0, shape.size / 4, shape.size / 2, shape.rotation + Math.PI/2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();

        // Update shape properties
        shape.rotation += shape.rotationSpeed;
        shape.rotationX += shape.rotationSpeed * 0.7;
        shape.rotationY += shape.rotationSpeed * 1.3;
        shape.pulse += 0.02;
        shape.z += shape.speedZ || 0;

        // Mouse/Touch interaction for 3D shapes
        const dx = mousePos.current.x - shape.x;
        const dy = mousePos.current.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          shape.x -= (dx / distance) * force * 1;
          shape.y -= (dy / distance) * force * 1;
          shape.opacity = Math.min(0.6, shape.opacity + force * 0.2);
          shape.rotationSpeed = Math.max(0.01, shape.rotationSpeed + force * 0.005);
        } else {
          shape.opacity = Math.max(0.15, shape.opacity - 0.001);
          shape.rotationSpeed = Math.max(0.002, shape.rotationSpeed - 0.0002);
        }

        // Boundary wrapping
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
      });

      // Draw 3D connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance3D < 120) {
            const perspective1 = 1000 / (1000 + particles[i].z);
            const perspective2 = 1000 / (1000 + particles[j].z);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x * perspective1, particles[i].y * perspective1);
            ctx.lineTo(particles[j].x * perspective2, particles[j].y * perspective2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance3D / 120)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw enhanced 3D particles
      particles.forEach((particle) => {
        // 3D perspective calculation
        const perspective = 1000 / (1000 + particle.z);
        const projectedX = particle.x * perspective;
        const projectedY = particle.y * perspective;
        const projectedSize = particle.size * perspective;

        // Mouse/Touch interaction in 3D space
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
          particle.z += force * 10;
          particle.size = Math.min(4, particle.size + force);
        } else {
          particle.size = Math.max(1, particle.size - 0.05);
          particle.z = Math.max(25, particle.z - 0.2);
        }

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.z += particle.speedZ;
        particle.pulse += 0.03;
        particle.rotation += particle.rotationSpeed;

        // Boundary wrapping with 3D consideration
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 25) particle.z = 150;
        if (particle.z > 150) particle.z = 25;

        // Draw 3D particle with multiple layers
        for (let layer = 2; layer >= 0; layer--) {
          const layerOffset = layer * 2;
          const layerOpacity = Math.max(0, particle.opacity * (1 - layer * 0.3));
          const layerSize = Math.max(1, projectedSize + Math.sin(particle.pulse) * 1 + layer);

          // Create radial gradient for 3D glow effect
          const gradientRadius = Math.max(1, layerSize + layerOffset);
          const gradient = ctx.createRadialGradient(
            projectedX, projectedY, 0,
            projectedX, projectedY, gradientRadius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${layerOpacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.arc(projectedX + layerOffset, projectedY + layerOffset, layerSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core particle with rotation effect
        ctx.save();
        ctx.translate(projectedX, projectedY);
        ctx.rotate(particle.rotation);
        ctx.beginPath();
        const coreSize = Math.max(0.5, projectedSize / 2);
        ctx.arc(0, 0, coreSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, particle.opacity * 2)})`;
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-70"
        style={{ zIndex: 1 }}
      />
      
      {/* 3D Floating Elements - Enhanced visibility */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* 3D Geometric decorations */}
        <div className="absolute bottom-20 right-20 w-12 h-12 md:w-24 md:h-24 border-2 border-white/25 rounded-full" 
             style={{ 
               transform: 'rotateX(60deg) rotateZ(45deg)',
               animation: 'rotate3d 24s linear infinite',
               boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
             }}></div>
        <div className="absolute top-1/2 right-5 md:right-10 w-8 h-8 md:w-16 md:h-16 border-2 border-white/25"
             style={{ 
               transform: 'rotateY(45deg) rotateX(30deg)',
               animation: 'float 12s ease-in-out infinite reverse',
               boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
             }}></div>
        
        {/* 3D Grid pattern - Enhanced */}
        <div className="absolute top-40 left-1/4 opacity-15 hidden md:block">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 border border-white/40"
                style={{
                  animation: `float ${6 + i * 0.8}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  transform: `rotateX(${i * 10}deg) rotateY(${i * 15}deg)`,
                  boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="relative z-10 overflow-y-auto">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-20">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start lg:items-center">
              
              {/* Left Side - Enhanced 3D Hero */}
              <div className="space-y-6 md:space-y-8 relative w-full lg:w-auto min-w-0 lg:pr-8">
                {/* 3D Background card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl backdrop-blur-sm transform rotate-1 scale-105 opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/3 to-transparent rounded-3xl backdrop-blur-sm transform -rotate-1 scale-102 opacity-30"></div>
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    <h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white relative group cursor-default"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: "700",
                        letterSpacing: "-0.02em",
                        textShadow: '0 0 40px rgba(255,255,255,0.2)'
                      }}
                      onMouseEnter={() => setHoveredElement('name')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <span className={`transition-all duration-700 ${hoveredElement === 'name' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'name' ? 'rotateY(5deg) rotateX(-2deg) scale(1.02)' : 'rotateY(0deg) rotateX(0deg) scale(1)',
                              display: 'inline-block',
                              transformStyle: 'preserve-3d',
                              transformOrigin: 'center center'
                            }}>
                        {data.hero.name}
                      </span>
                      {/* 3D text shadow effect */}
                      <span className="absolute top-1 left-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight opacity-20 -z-10"
                            style={{
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontWeight: "700",
                              letterSpacing: "-0.02em"
                            }}>
                        {data.hero.name}
                      </span>
                    </h1>
                    
                    <p 
                      className="text-lg md:text-xl font-medium text-white/90 leading-relaxed group cursor-default"
                      style={{
                        fontFamily: "'Manrope', system-ui, sans-serif",
                        fontWeight: "500"
                      }}
                      onMouseEnter={() => setHoveredElement('title')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <span className={`transition-all duration-500 ${hoveredElement === 'title' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'title' ? 'translateZ(5px) rotateX(2deg)' : 'translateZ(0px) rotateX(0deg)',
                              display: 'inline-block',
                              transformStyle: 'preserve-3d'
                            }}>
                        {data.hero.title}
                      </span>
                    </p>
                  </div>
                  
                  <p 
                    className="text-sm md:text-base text-white/70 leading-relaxed"
                    style={{
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontWeight: "400",
                      lineHeight: "1.6"
                    }}
                  >
                    {data.hero.description}
                  </p>
                  
                  {/* Enhanced 3D Contact Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 md:pt-6">
                    <Button
                      variant="outline"
                      className="border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium tracking-wide relative overflow-hidden group w-full sm:w-auto"
                      onClick={() => window.open("mailto:ravirt7911@gmail.com", "_blank")}
                      style={{ 
                        fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                        fontWeight: "500",
                        boxShadow: '0 15px 35px rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={() => setHoveredElement('email')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {/* 3D border glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className={`relative z-10 transition-all duration-400 ${hoveredElement === 'email' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'email' ? 'translateZ(8px) rotateX(-5deg)' : 'translateZ(0px) rotateX(0deg)',
                              transformStyle: 'preserve-3d'
                            }}>
                        Email
                      </span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium tracking-wide relative overflow-hidden group w-full sm:w-auto"
                      onClick={() => window.open("https://linkedin.com/in/kamsu-ravi-teeja", "_blank")}
                      style={{ 
                        fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                        fontWeight: "500",
                        boxShadow: '0 15px 35px rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={() => setHoveredElement('linkedin')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {/* 3D border glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className={`relative z-10 transition-all duration-400 ${hoveredElement === 'linkedin' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'linkedin' ? 'translateZ(8px) rotateX(-5deg)' : 'translateZ(0px) rotateX(0deg)',
                              transformStyle: 'preserve-3d'
                            }}>
                        LinkedIn
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium tracking-wide relative overflow-hidden group w-full sm:w-auto"
                      onClick={() => window.open("https://github.com/ravirt7911", "_blank")}
                      style={{ 
                        fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                        fontWeight: "500",
                        boxShadow: '0 15px 35px rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={() => setHoveredElement('github')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {/* 3D border glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className={`relative z-10 transition-all duration-400 ${hoveredElement === 'github' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'github' ? 'translateZ(8px) rotateX(-5deg)' : 'translateZ(0px) rotateX(0deg)',
                              transformStyle: 'preserve-3d'
                            }}>
                        GitHub
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Enhanced Professional Summary & Experience */}
              <div className="space-y-8 md:space-y-10 relative w-full lg:w-auto min-w-0">
                {/* 3D Background layers */}
                <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent rounded-3xl backdrop-blur-sm transform -rotate-1 scale-105 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/3 to-transparent rounded-3xl backdrop-blur-sm transform rotate-1 scale-102 opacity-20"></div>
                
                <div className="relative z-10 space-y-6 md:space-y-8">
                  {/* Personal Interests */}
                  <div className="group cursor-default"
                    onMouseEnter={() => setHoveredElement('interests')}
                    onMouseLeave={() => setHoveredElement(null)}>
                    <h2 
                      className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white"
                      style={{
                     fontFamily: "'Space Grotesk', system-ui, sans-serif",
                     fontWeight: "600"
                      }}
                    >
                      <span className={`transition-all duration-300 ${hoveredElement === 'interests' ? 'transform' : ''}`}
                      style={{
                        transform: hoveredElement === 'interests' ? 'scale(1.04)' : 'scale(1)',
                        display: 'inline-block'
                      }}>
                     Beyond Code
                      </span>
                    </h2>
                    <p 
                      className="text-sm md:text-base text-white/80 leading-relaxed"
                      style={{
                     fontFamily: "'Manrope', system-ui, sans-serif",
                     fontWeight: "600"
                      }}
                    >
                      These days, I spend my time building cool AI stuff, chasing goals on the football field , getting lost in games where I get to be the hero , and binging movies (yeah, mostly TFI) . I live on late nights, big dreams, and that itch to always do something more. Life’s too short to play it safe—so I don’t.
                    </p>
                  </div>
                  <div className="group cursor-default"
                       onMouseEnter={() => setHoveredElement('experience')}
                       onMouseLeave={() => setHoveredElement(null)}>
                    <h3 
                      className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white relative"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: "600"
                      }}
                    >
                      <span className={`transition-all duration-500 ${hoveredElement === 'experience' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'experience' ? 'translateZ(5px) rotateX(3deg)' : 'translateZ(0px) rotateX(0deg)',
                              display: 'inline-block',
                              transformStyle: 'preserve-3d'
                            }}>
                        Experience
                      </span>
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent transition-all duration-500 ${hoveredElement === 'experience' ? 'w-16' : 'w-8'}`}></div>
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Lyzr AI */}
                      <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="w-2 h-2 bg-gradient-to-r from-white to-white/60 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h4 className="text-base md:text-lg font-bold text-white/95 mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                              Member of Technical Staff • <span className="text-sm md:text-base font-medium underline">
                                <a 
                                  href="https://www.lyzr.ai/" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-white transition-colors duration-200"
                                >
                                  Lyzr AI
                                </a>
                              </span>
                            </h4>
                            <p className="text-xs font-medium text-white/80" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                              June 2025 - Present
                            </p>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                            Building multi-agent systems and AI Agents for enterprise clients including Under Armour and Tiny's Construction.
                          </p>
                        </div>
                      </div>
                      
                      {/* GradeHive AI */}
                      <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="w-2 h-2 bg-gradient-to-r from-white/80 to-white/40 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h4 className="text-base md:text-lg font-bold text-white/95 mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                              Founding Software Engineer • <span className="text-sm md:text-base font-medium underline">
                                <a 
                                  href="https://deepdocs.dev/" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-white transition-colors duration-200"
                                >
                                  GradeHive AI
                                </a>
                              </span>
                            </h4>
                            <p className="text-xs font-medium text-white/80" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                              Aug 2024 - June 2025
                            </p>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                            Led frontend and backend development integrating LLMs for coding and grading with 10+ language support.
                          </p>
                        </div>
                      </div>
                      
                      {/* Tooljet */}
                      <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="w-2 h-2 bg-gradient-to-r from-white/60 to-white/30 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h4 className="text-base md:text-lg font-bold text-white/95 mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                              Software Engineer Intern • <span className="text-sm md:text-base font-medium underline">
                                <a 
                                  href="https://www.tooljet.ai/" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-white transition-colors duration-200"
                                >
                                  Tooljet
                                </a>
                              </span>
                            </h4>
                            <p className="text-xs font-medium text-white/80" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                              May 2024 - Aug 2024
                            </p>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                            Revamped workflows feature from beta to production with seamless functionality.
                          </p>
                        </div>
                      </div>
                      
                      {/* Hoppscotch */}
                      <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="w-2 h-2 bg-gradient-to-r from-white/50 to-white/20 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h4 className="text-base md:text-lg font-bold text-white/95 mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                              Developer Intern • <span className="text-sm md:text-base font-medium underline">
                                <a 
                                  href="https://hoppscotch.com/" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-white transition-colors duration-200"
                                >
                                  Hoppscotch
                                </a>
                              </span>
                            </h4>
                            <p className="text-xs font-medium text-white/80" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                              Aug 2023 - Nov 2023
                            </p>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
                            Built marketing website using React.js and Vue.js, represented DevRel expertise at conferences.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default SinglePage;
