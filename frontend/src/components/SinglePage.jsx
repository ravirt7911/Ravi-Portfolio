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
    const connections = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create enhanced particles with 3D properties
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100 + 50,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.6 + 0.3, // Increased from 0.3 + 0.1
        pulse: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Create 3D geometric shapes
    for (let i = 0; i < 8; i++) {
      geometryShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 50 + 25,
        size: Math.random() * 60 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: Math.floor(Math.random() * 4), // Different 3D shapes
        opacity: Math.random() * 0.25 + 0.15, // Increased from 0.1 + 0.05
        pulse: Math.random() * Math.PI * 2,
        depth: Math.random() * 30 + 10,
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

          // Create 3D depth gradient
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(1, shape.size));
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shape.opacity * 3})`);
          gradient.addColorStop(0.3, `rgba(255, 255, 255, ${shape.opacity * 1.5})`);
          gradient.addColorStop(0.7, `rgba(255, 255, 255, ${shape.opacity})`);
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
            
            // Offset for 3D effect
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

        // Mouse interaction for 3D shapes
        const dx = mousePos.current.x - shape.x;
        const dy = mousePos.current.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          shape.x -= (dx / distance) * force * 1;
          shape.y -= (dy / distance) * force * 1;
          shape.opacity = Math.min(0.3, shape.opacity + force * 0.1);
          shape.rotationSpeed = Math.max(0.02, shape.rotationSpeed + force * 0.01);
        } else {
          shape.opacity = Math.max(0.05, shape.opacity - 0.001);
          shape.rotationSpeed = Math.max(0.005, shape.rotationSpeed - 0.0005);
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
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance3D / 120)})`;
            ctx.lineWidth = 1;
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

        // Mouse interaction in 3D space
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

          // Create radial gradient for 3D glow effect - ensure positive radius
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
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ zIndex: 1 }}
      />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* 3D Geometric decorations */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rotate-45 animate-pulse" 
             style={{ 
               transform: 'rotateX(45deg) rotateY(45deg)',
               animation: 'float 6s ease-in-out infinite'
             }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full" 
             style={{ 
               transform: 'rotateX(60deg) rotateZ(45deg)',
               animation: 'rotate3d 12s linear infinite'
             }}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-white/10"
             style={{ 
               transform: 'rotateY(45deg) rotateX(30deg)',
               animation: 'float 8s ease-in-out infinite reverse'
             }}></div>
        
        {/* 3D Grid pattern */}
        <div className="absolute top-40 left-1/4 opacity-5">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 border border-white/20"
                style={{
                  animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  transform: `rotateX(${i * 10}deg) rotateY(${i * 15}deg)`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Single Page Layout */}
      <div className="h-full flex flex-col relative z-10">
        
        {/* Enhanced 3D Header */}
        <header className="flex items-center justify-between px-8 py-4 relative">
          {/* 3D Header background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/2 via-transparent to-white/2 backdrop-blur-sm"></div>
          
          <div 
            className="font-medium text-xl text-white tracking-wide relative z-10 cursor-pointer group"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: "500",
              textShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}
            onMouseEnter={() => setHoveredElement('logo')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <span className={`transition-all duration-500 ${hoveredElement === 'logo' ? 'transform scale-110 rotate-1' : ''}`}
                  style={{
                    transform: hoveredElement === 'logo' ? 'rotateY(10deg) rotateX(5deg)' : 'rotateY(0deg) rotateX(0deg)',
                    display: 'inline-block',
                    transformStyle: 'preserve-3d'
                  }}>
              Ravi Teeja K
            </span>
          </div>
          
          <div className="flex items-center space-x-6 relative z-10">
            <Button
              className="bg-white text-black hover:bg-gray-100 transition-all duration-500 text-sm font-medium tracking-wide px-6 py-2 relative overflow-hidden group"
              onClick={() => window.open(`mailto:${data.contact.email}`, "_blank")}
              style={{ 
                fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                fontWeight: "500",
                boxShadow: '0 10px 25px rgba(255,255,255,0.1)',
                transform: 'translateZ(0)'
              }}
              onMouseEnter={() => setHoveredElement('contact-btn')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {/* 3D button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className={`relative z-10 transition-all duration-300 ${hoveredElement === 'contact-btn' ? 'transform scale-105' : ''}`}
                    style={{
                      transform: hoveredElement === 'contact-btn' ? 'translateZ(10px)' : 'translateZ(0px)',
                      transformStyle: 'preserve-3d'
                    }}>
                Contact
              </span>
            </Button>
          </div>
        </header>

        {/* Enhanced 3D Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              
              {/* Left Side - Enhanced 3D Hero */}
              <div className="space-y-8 relative">
                {/* 3D Background card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl backdrop-blur-sm transform rotate-1 scale-105 opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/3 to-transparent rounded-3xl backdrop-blur-sm transform -rotate-1 scale-102 opacity-30"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <h1 
                      className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white relative group cursor-default"
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
                      <span className="absolute top-1 left-1 text-5xl md:text-6xl font-bold tracking-tight leading-tight opacity-20 -z-10"
                            style={{
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontWeight: "700",
                              letterSpacing: "-0.02em"
                            }}>
                        {data.hero.name}
                      </span>
                    </h1>
                    
                    <p 
                      className="text-xl font-medium text-white/90 leading-relaxed group cursor-default"
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
                    className="text-base text-white/70 leading-relaxed"
                    style={{
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontWeight: "400",
                      lineHeight: "1.6"
                    }}
                  >
                    {data.hero.description}
                  </p>
                  
                  {/* Enhanced 3D Buttons */}
                  <div className="flex items-center space-x-6 pt-6">
                    <Button
                      className="bg-white text-black hover:bg-gray-100 transition-all duration-500 px-8 py-3 text-base font-medium tracking-wide relative overflow-hidden group"
                      onClick={() => window.open(`mailto:${data.contact.email}`, "_blank")}
                      style={{ 
                        fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                        fontWeight: "500",
                        boxShadow: '0 15px 35px rgba(255,255,255,0.15)',
                        transform: 'translateZ(0)'
                      }}
                      onMouseEnter={() => setHoveredElement('cta1')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {/* 3D button layers */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className={`relative z-10 transition-all duration-400 ${hoveredElement === 'cta1' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'cta1' ? 'translateZ(8px) rotateX(-5deg)' : 'translateZ(0px) rotateX(0deg)',
                              transformStyle: 'preserve-3d'
                            }}>
                        Get In Touch
                      </span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-3 text-base font-medium tracking-wide relative overflow-hidden group"
                      onClick={() => window.open(data.contact.profiles.linkedin, "_blank")}
                      style={{ 
                        fontFamily: "'Space Grotesk', system-ui, sans-serif", 
                        fontWeight: "500",
                        boxShadow: '0 15px 35px rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={() => setHoveredElement('cta2')}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {/* 3D border glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <span className={`relative z-10 transition-all duration-400 ${hoveredElement === 'cta2' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'cta2' ? 'translateZ(8px) rotateX(-5deg)' : 'translateZ(0px) rotateX(0deg)',
                              transformStyle: 'preserve-3d'
                            }}>
                        LinkedIn
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Enhanced 3D About & Experience */}
              <div className="space-y-10 relative">
                {/* 3D Background layers */}
                <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent rounded-3xl backdrop-blur-sm transform -rotate-1 scale-105 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/3 to-transparent rounded-3xl backdrop-blur-sm transform rotate-1 scale-102 opacity-20"></div>
                
                <div className="relative z-10 space-y-8">
                  {/* Enhanced 3D About Section */}
                  <div className="group cursor-default"
                       onMouseEnter={() => setHoveredElement('about')}
                       onMouseLeave={() => setHoveredElement(null)}>
                    <h2 
                      className="text-3xl font-bold mb-5 tracking-tight text-white relative"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: "600"
                      }}
                    >
                      <span className={`transition-all duration-500 ${hoveredElement === 'about' ? 'transform' : ''}`}
                            style={{
                              transform: hoveredElement === 'about' ? 'translateZ(5px) rotateX(3deg)' : 'translateZ(0px) rotateX(0deg)',
                              display: 'inline-block',
                              transformStyle: 'preserve-3d'
                            }}>
                        About
                      </span>
                      {/* 3D underline effect */}
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent transition-all duration-500 ${hoveredElement === 'about' ? 'w-16' : 'w-8'}`}></div>
                    </h2>
                    
                    <p 
                      className="text-sm text-white/80 leading-relaxed mb-5"
                      style={{
                        fontFamily: "'Manrope', system-ui, sans-serif",
                        fontWeight: "400",
                        lineHeight: "1.6"
                      }}
                    >
                      Currently serving as Member of Technical Staff at Lyzr AI, architecting multi-agent systems and full-stack AI solutions for enterprise organizations including Under Armour, Tiny's Construction, and others.
                    </p>
                    
                    {/* Enhanced 3D Focus Areas */}
                    <div className="space-y-3">
                      <h3 
                        className="text-lg font-semibold text-white mb-3"
                        style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontWeight: "600"
                        }}
                      >
                        Focus Areas
                      </h3>
                      <div className="space-y-2">
                        {[
                          "AI agent systems for enterprise automation",
                          "Scalable full-stack applications",
                          "Open-source contributions"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 group cursor-default"
                               onMouseEnter={() => setHoveredElement(`focus-${index}`)}
                               onMouseLeave={() => setHoveredElement(null)}>
                            <div className={`w-1.5 h-1.5 bg-white/50 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${hoveredElement === `focus-${index}` ? 'bg-white scale-150' : ''}`}
                                 style={{
                                   transform: hoveredElement === `focus-${index}` ? 'translateZ(3px)' : 'translateZ(0px)',
                                   boxShadow: hoveredElement === `focus-${index}` ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                                 }}></div>
                            <p 
                              className={`text-xs text-white/70 leading-relaxed transition-all duration-300 ${hoveredElement === `focus-${index}` ? 'text-white/90 transform' : ''}`}
                              style={{
                                fontFamily: "'Manrope', system-ui, sans-serif",
                                fontWeight: "400",
                                transform: hoveredElement === `focus-${index}` ? 'translateZ(2px) translateX(2px)' : 'translateZ(0px) translateX(0px)',
                                transformStyle: 'preserve-3d'
                              }}
                            >
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced 3D Experience Section */}
                  <div className="group cursor-default"
                       onMouseEnter={() => setHoveredElement('experience')}
                       onMouseLeave={() => setHoveredElement(null)}>
                    <h3 
                      className="text-xl font-bold mb-4 text-white relative"
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
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent transition-all duration-500 ${hoveredElement === 'experience' ? 'w-20' : 'w-10'}`}></div>
                    </h3>
                    
                    <div className="space-y-5">
                      {data.about.experience.slice(0, 2).map((exp, index) => (
                        <div key={exp.id} 
                             className="space-y-2 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group/exp cursor-default relative overflow-hidden"
                             onMouseEnter={() => setHoveredElement(`exp-${index}`)}
                             onMouseLeave={() => setHoveredElement(null)}
                             style={{
                               transform: hoveredElement === `exp-${index}` ? 'translateZ(5px) rotateX(2deg)' : 'translateZ(0px) rotateX(0deg)',
                               transformStyle: 'preserve-3d',
                               transition: 'all 0.5s ease'
                             }}>
                          
                          {/* 3D hover background effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="relative z-10">
                            <h4 
                              className="text-sm font-semibold text-white"
                              style={{
                                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                fontWeight: "600"
                              }}
                            >
                              {exp.title}
                            </h4>
                            <p 
                              className="text-sm text-white/80"
                              style={{
                                fontFamily: "'Manrope', system-ui, sans-serif",
                                fontWeight: "500"
                              }}
                            >
                              {exp.company} • {exp.duration}
                            </p>
                          </div>
                          
                          <p 
                            className="text-xs text-white/70 leading-relaxed relative z-10"
                            style={{
                              fontFamily: "'Manrope', system-ui, sans-serif",
                              fontWeight: "400",
                              lineHeight: "1.5"
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
        </div>

        {/* Enhanced 3D Footer */}
        <footer className="px-8 py-5 border-t border-white/10 backdrop-blur-sm relative">
          {/* 3D footer background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/2 via-white/5 to-white/2"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-8">
              {[
                { label: "Email", href: "mailto:ravir7911@gmail.com" },
                { label: "LinkedIn", href: "https://linkedin.com/in/kamsu-ravi-teeja" },
                { label: "GitHub", href: "https://github.com/ravir7911" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-white/60 hover:text-white/90 transition-all duration-500 text-sm font-medium group"
                  style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: "500" }}
                  onMouseEnter={() => setHoveredElement(`footer-${index}`)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <span className={`transition-all duration-300 ${hoveredElement === `footer-${index}` ? 'transform' : ''}`}
                        style={{
                          transform: hoveredElement === `footer-${index}` ? 'translateZ(3px) translateY(-1px)' : 'translateZ(0px) translateY(0px)',
                          transformStyle: 'preserve-3d',
                          textShadow: hoveredElement === `footer-${index}` ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
                        }}>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            
            <p 
              className="text-white/50 text-sm group cursor-default"
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontWeight: "400"
              }}
              onMouseEnter={() => setHoveredElement('footer-text')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <span className={`transition-all duration-300 ${hoveredElement === 'footer-text' ? 'transform' : ''}`}
                    style={{
                      transform: hoveredElement === 'footer-text' ? 'translateZ(2px)' : 'translateZ(0px)',
                      transformStyle: 'preserve-3d'
                    }}>
                Remote, India • Available for opportunities
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SinglePage;