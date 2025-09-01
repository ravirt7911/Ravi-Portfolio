import React from "react";
import { Card, CardContent } from "./ui/card";

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                About Me
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.summary}
              </p>
            </div>
            
            <div className="pt-8">
              <h3 className="text-2xl font-light mb-6">Current Focus</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Building next-generation AI agent systems for enterprise automation</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Developing scalable full-stack applications with modern technologies</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Contributing to open-source projects and technical communities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-light mb-8">Experience</h3>
            {data.experience.map((exp, index) => (
              <Card 
                key={exp.id} 
                className="border-0 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-medium text-black">{exp.title}</h4>
                      <p className="text-lg text-gray-700 font-light">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration} • {exp.location}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                          <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
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