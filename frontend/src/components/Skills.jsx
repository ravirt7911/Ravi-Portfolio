import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";

const Skills = ({ data }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: "Languages",
      items: data.languages,
      color: "bg-gray-100 hover:bg-gray-200"
    },
    {
      title: "AI & Machine Learning",
      items: data.ai,
      color: "bg-black text-white hover:bg-gray-800"
    },
    {
      title: "Frameworks",
      items: data.frameworks,
      color: "bg-gray-100 hover:bg-gray-200"
    },
    {
      title: "Databases",
      items: data.databases,
      color: "bg-gray-100 hover:bg-gray-200"
    },
    {
      title: "Tools & Technologies",
      items: data.tools,
      color: "bg-gray-100 hover:bg-gray-200"
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-light mb-6 text-black">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer transform hover:scale-105 ${category.color}`}
                      onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        transform: hoveredSkill === `${categoryIndex}-${skillIndex}` 
                          ? 'translateY(-2px) scale(1.05)' 
                          : 'translateY(0) scale(1)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;