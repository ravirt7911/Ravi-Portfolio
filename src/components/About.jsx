import React from "react";

const About = ({ data }) => {
  return (
    <section id="about" className="py-8 md:py-16 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* About Me Section */}
        <div className="mb-12 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-extralight mb-4 md:mb-6 tracking-tight text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200",
              letterSpacing: "-0.01em"
            }}
          >
            About Me
          </h2>
          <p 
            className="text-base md:text-lg text-white/70 leading-relaxed"
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
        <div className="mb-12 md:mb-16">
          <h3 
            className="text-xl md:text-2xl font-extralight mb-4 md:mb-6 text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200"
            }}
          >
            Current Focus
          </h3>
          <div className="space-y-3 md:space-y-4">
            {[
              "Building next-generation AI agent systems for enterprise automation",
              "Developing scalable full-stack applications with modern technologies", 
              "Contributing to open-source projects and technical communities"
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 md:space-x-4 group">
                <div className="w-1 h-1 bg-white/40 rounded-full mt-2 md:mt-2.5 flex-shrink-0 group-hover:bg-white/70 transition-all duration-500"></div>
                <p 
                  className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-500"
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
            className="text-xl md:text-2xl font-extralight mb-6 md:mb-8 text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200"
            }}
          >
            Professional Experience
          </h3>
          <div className="space-y-8 md:space-y-12">
            {data.experience && data.experience.map((exp, index) => (
              <div 
                key={exp.id} 
                className="group relative p-4 md:p-6 rounded-lg hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
              >
                {/* Timeline line */}
                {index < data.experience.length - 1 && (
                  <div className="absolute left-0 md:left-0 top-16 md:top-20 w-px h-16 md:h-24 bg-gradient-to-b from-white/20 to-white/5"></div>
                )}
                
                <div className="flex items-start space-x-4 md:space-x-6 lg:space-x-8">
                  {/* Timeline dot */}
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-white/40 to-white/20 rounded-full mt-3 md:mt-5 flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-white/60 group-hover:to-white/40 transition-all duration-500 shadow-lg"></div>
                  
                  <div className="flex-1 space-y-3 md:space-y-4">
                    <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                      <h4 
                        className="text-lg md:text-xl font-light text-white mb-1 md:mb-2 group-hover:text-white/90 transition-colors duration-300"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: "300"
                        }}
                      >
                        {exp.title}
                      </h4>
                      <p 
                        className="text-base md:text-lg text-white/80 mb-1 md:mb-2 font-medium"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: "400"
                        }}
                      >
                        {exp.company}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-white/50">
                        <span className="flex items-center space-x-2">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{exp.duration}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 md:space-y-3 pl-2">
                      {exp.description && exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 md:space-x-3 group/item">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white/30 rounded-full mt-2 md:mt-2.5 flex-shrink-0 group-hover/item:bg-white/50 transition-all duration-300"></div>
                          <p 
                            className="text-xs md:text-sm text-white/70 leading-relaxed group-hover/item:text-white/85 transition-colors duration-300"
                            style={{
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: "300",
                              lineHeight: "1.7"
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
