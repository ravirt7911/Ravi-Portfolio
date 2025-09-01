import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";

const Skills = ({ data }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: "Languages",
      items: data.languages,
      color: "bg-white/10 hover:bg-white/20 border-white/20",
      textColor: "text-white hover:text-white"
    },
    {
      title: "AI & Machine Learning",
      items: data.ai,
      color: "bg-white text-black hover:bg-gray-200",
      textColor: "text-black"
    },
    {
      title: "Frameworks",
      items: data.frameworks,
      color: "bg-white/10 hover:bg-white/20 border-white/20",
      textColor: "text-white hover:text-white"
    },
    {
      title: "Databases",
      items: data.databases,
      color: "bg-white/10 hover:bg-white/20 border-white/20",
      textColor: "text-white hover:text-white"
    },
    {
      title: "Tools & Technologies",
      items: data.tools,
      color: "bg-white/10 hover:bg-white/20 border-white/20",
      textColor: "text-white hover:text-white"
    }
  ];

  return (
    <section id="skills" className="py-32 bg-black relative overflow-hidden">
      {/* 3D Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 gap-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-white/10 transform hover:scale-110 transition-transform duration-500"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 4s infinite'
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-white relative inline-block">
            Skills & Expertise
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 group relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)',
                perspective: '1000px'
              }}
            >
              {/* 3D depth layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <CardContent className="p-10 relative z-10">
                <h3 className="text-3xl font-light mb-8 text-white group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-4">
                  {category.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-1 ${category.color} ${category.textColor} relative overflow-hidden group/skill`}
                      onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        transform: hoveredSkill === `${categoryIndex}-${skillIndex}` 
                          ? 'translateY(-4px) scale(1.1) rotateY(5deg)' 
                          : 'translateY(0) scale(1) rotateY(0deg)',
                        boxShadow: hoveredSkill === `${categoryIndex}-${skillIndex}` 
                          ? '0 15px 30px rgba(255, 255, 255, 0.2)' 
                          : '0 5px 15px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/skill:opacity-100 group-hover/skill:animate-pulse"></div>
                      <span className="relative z-10">{skill}</span>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3D Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5+", label: "Languages Mastered" },
            { number: "10+", label: "Frameworks" },
            { number: "8+", label: "Database Systems" },
            { number: "15+", label: "Tools & Technologies" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group transform hover:scale-110 transition-all duration-500 hover:-translate-y-2"
              style={{ perspective: '1000px' }}
            >
              <div className="relative">
                <div className="text-4xl font-light text-white mb-2 group-hover:text-white transition-colors duration-300"
                     style={{
                       textShadow: '0 0 30px rgba(255,255,255,0.5)',
                       transform: 'rotateX(0deg)',
                       transition: 'transform 0.5s'
                     }}>
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;