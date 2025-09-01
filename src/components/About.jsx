import React from "react";

const About = ({ data }) => {
  return (
    <section id="about" className="py-16 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* About Me Section */}
        <div className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-extralight mb-6 tracking-tight text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200",
              letterSpacing: "-0.01em"
            }}
          >
            About Me
          </h2>
          <p 
            className="text-lg text-white/70 leading-relaxed"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "300",
              lineHeight: "1.7"
            }}
          >
            {data.summary}
          </p>
        </div>

        {/* Current Focus Section */}
        <div className="mb-16">
          <h3 
            className="text-2xl font-extralight mb-6 text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200"
            }}
          >
            Current Focus
          </h3>
          <div className="space-y-4">
            {[
              "Building next-generation AI agent systems for enterprise automation",
              "Developing scalable full-stack applications with modern technologies", 
              "Contributing to open-source projects and technical communities"
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-1 h-1 bg-white/40 rounded-full mt-2.5 flex-shrink-0 group-hover:bg-white/70 transition-all duration-500"></div>
                <p 
                  className="text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-500"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: "300",
                    lineHeight: "1.6"
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h3 
            className="text-2xl font-extralight mb-8 text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200"
            }}
          >
            Experience
          </h3>
          <div className="space-y-10">
            {data.experience.map((exp, index) => (
              <div 
                key={exp.id} 
                className="group relative"
              >
                {/* Timeline line */}
                {index < data.experience.length - 1 && (
                  <div className="absolute left-0 top-16 w-px h-20 bg-white/10"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="w-2 h-2 bg-white/30 rounded-full mt-4 flex-shrink-0 group-hover:bg-white/60 transition-all duration-500"></div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 
                        className="text-xl font-light text-white mb-1"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: "300"
                        }}
                      >
                        {exp.title}
                      </h4>
                      <p 
                        className="text-lg text-white/70 mb-1"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: "300"
                        }}
                      >
                        {exp.company}
                      </p>
                      <p 
                        className="text-sm text-white/50"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: "300"
                        }}
                      >
                        {exp.duration} • {exp.location}
                      </p>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.description.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-0.5 h-0.5 bg-white/30 rounded-full mt-2 flex-shrink-0"></div>
                          <p 
                            className="text-sm text-white/60 leading-relaxed"
                            style={{
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: "300",
                              lineHeight: "1.6"
                            }}
                          >
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;