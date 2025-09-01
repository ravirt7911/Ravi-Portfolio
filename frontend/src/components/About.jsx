import React from "react";
import { Card, CardContent } from "./ui/card";

const About = ({ data }) => {
  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-white relative">
                About Me
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-white to-transparent"></div>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                {data.summary}
              </p>
            </div>
            
            <div className="pt-8">
              <h3 className="text-3xl font-light mb-8 text-white">Current Focus</h3>
              <div className="space-y-6">
                {[
                  "Building next-generation AI agent systems for enterprise automation",
                  "Developing scalable full-stack applications with modern technologies", 
                  "Contributing to open-source projects and technical communities"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-6 group">
                    <div className="w-3 h-3 bg-white rounded-full mt-4 flex-shrink-0 group-hover:scale-150 transition-all duration-300"></div>
                    <p className="text-white/70 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-light mb-10 text-white">Experience</h3>
            {data.experience.map((exp, index) => (
              <Card 
                key={exp.id} 
                className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 group relative overflow-hidden"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* 3D depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 relative z-10">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-medium text-white group-hover:text-white transition-colors duration-300">{exp.title}</h4>
                      <p className="text-xl text-white/80 font-light mt-2">{exp.company}</p>
                      <p className="text-sm text-white/60 mt-1">{exp.duration} • {exp.location}</p>
                    </div>
                    
                    <ul className="space-y-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-white/60 rounded-full mt-3 flex-shrink-0 group-hover:bg-white transition-colors duration-300"></div>
                          <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;