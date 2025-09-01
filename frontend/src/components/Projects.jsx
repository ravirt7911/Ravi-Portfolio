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
    <section id="projects" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-60 h-60 border border-white/10 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-20 right-40 w-32 h-32 border border-white/10 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-white relative inline-block">
            Featured Projects
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions spanning AI, full-stack development, and enterprise applications
          </p>
        </div>

        {/* Enhanced Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className={`px-8 py-4 text-sm font-medium transition-all duration-500 hover:scale-110 transform relative overflow-hidden group ${
                filter === category
                  ? "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/20"
                  : "border-white/30 text-white/80 hover:border-white hover:text-white hover:bg-white/10"
              }`}
              style={{
                boxShadow: filter === category 
                  ? '0 10px 25px rgba(255, 255, 255, 0.2)' 
                  : '0 5px 15px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              <span className="relative z-10">{category}</span>
            </Button>
          ))}
        </div>

        {/* Enhanced Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 cursor-pointer relative overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                boxShadow: hoveredProject === project.id 
                  ? '0 30px 60px rgba(255, 255, 255, 0.15)' 
                  : '0 20px 40px rgba(255, 255, 255, 0.1)',
                perspective: '1000px'
              }}
            >
              {/* 3D depth layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
              
              <CardContent className="p-0 relative z-10">
                {/* Enhanced Project Image with 3D effect */}
                <div className="relative h-56 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-black/20 transition-all duration-700 flex items-center justify-center"
                    style={{
                      transform: hoveredProject === project.id 
                        ? 'rotateY(-8deg) rotateX(4deg) scale(1.05)' 
                        : 'rotateY(0deg) rotateX(0deg) scale(1)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* 3D geometric project representation */}
                    <div className="relative">
                      <div className="w-20 h-20 border-2 border-white/40 rounded-xl flex items-center justify-center transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:border-white/60">
                        <div className="w-10 h-10 bg-white/30 rounded-lg group-hover:bg-white/50 transition-colors duration-500"></div>
                      </div>
                      {/* 3D shadow */}
                      <div className="absolute top-2 left-2 w-20 h-20 border-2 border-white/10 rounded-xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                    </div>
                    
                    {/* Floating elements around the main shape */}
                    <div className="absolute top-4 right-4 w-4 h-4 border border-white/30 rotate-45 animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 border border-white/30 rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
                  </div>
                  
                  {/* Enhanced category badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-xs font-medium text-black rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay with glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Enhanced tech stack */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-white/10 text-white/80 text-xs rounded-full font-medium hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110 transform"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced action buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 p-3 rounded-full group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.link && project.link !== "#") {
                          window.open(project.link, "_blank");
                        }
                      }}
                    >
                      <ExternalLink className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                    </Button>
                    
                    {project.link && project.link.includes("github") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 p-3 rounded-full group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                      >
                        <Github className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
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