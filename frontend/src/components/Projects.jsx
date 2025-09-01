import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = ({ data }) => {
  const [filter, setFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = ["All", "AI/Enterprise", "AI/Database", "Web Development", "Open Source", "AI/Travel", "FinTech"];
  
  const filteredProjects = filter === "All" 
    ? data 
    : data.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A showcase of innovative solutions spanning AI, full-stack development, and enterprise applications
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className={`px-6 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                filter === category
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardContent className="p-0">
                {/* Project Image Placeholder with 3D effect */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-black/5 transition-all duration-500 flex items-center justify-center"
                    style={{
                      transform: hoveredProject === project.id ? 'rotateY(-5deg) rotateX(5deg)' : 'rotateY(0deg) rotateX(0deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="w-16 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-600 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-black mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-black transition-colors duration-300 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.link && project.link !== "#") {
                          window.open(project.link, "_blank");
                        }
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    
                    {project.link && project.link.includes("github") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-black transition-colors duration-300 p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;