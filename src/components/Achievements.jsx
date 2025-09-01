import React from "react";
import { Card, CardContent } from "./ui/card";
import { Trophy, Award, Code, Users } from "lucide-react";

const Achievements = ({ data }) => {
  const getIcon = (title) => {
    if (title.includes("Position")) return <Trophy className="w-7 h-7" />;
    if (title.includes("Star") || title.includes("Rank")) return <Code className="w-7 h-7" />;
    if (title.includes("Speaker")) return <Users className="w-7 h-7" />;
    return <Award className="w-7 h-7" />;
  };

  const getIconColor = (index) => {
    const colors = [
      "text-yellow-400 bg-yellow-400/20",
      "text-blue-400 bg-blue-400/20", 
      "text-green-400 bg-green-400/20",
      "text-purple-400 bg-purple-400/20",
      "text-red-400 bg-red-400/20",
      "text-indigo-400 bg-indigo-400/20",
      "text-orange-400 bg-orange-400/20"
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="achievements" className="py-32 bg-black relative overflow-hidden">
      {/* 3D Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-48 h-48 border border-white/10 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/10 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-white relative inline-block">
            Achievements
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Recognition and milestones in competitive programming, hackathons, and technical excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((achievement, index) => (
            <Card
              key={achievement.id}
              className="group border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)',
                perspective: '1000px'
              }}
            >
              {/* 3D depth effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-2xl ${getIconColor(index)} transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 transform relative`}
                       style={{
                         boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)'
                       }}>
                    {getIcon(achievement.title)}
                    {/* 3D shadow */}
                    <div className="absolute top-1 left-1 inset-0 bg-black/20 rounded-2xl -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-white/60 font-medium px-3 py-1 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                        {achievement.year}
                      </span>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced 3D Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "7+", label: "Major Achievements", color: "text-yellow-400" },
            { number: "3", label: "Hackathon Wins", color: "text-green-400" },
            { number: "1402", label: "Global Rank (CodeJam)", color: "text-blue-400" },
            { number: "4⭐", label: "CodeChef Rating", color: "text-purple-400" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group transform hover:scale-125 transition-all duration-700 hover:-translate-y-3 relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative">
                {/* 3D background shape */}
                <div className="absolute inset-0 bg-white/5 rounded-2xl transform group-hover:rotate-3 transition-transform duration-500 -z-10"></div>
                <div className="absolute inset-0 bg-white/2 rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 -z-20"></div>
                
                <div className="p-6 relative z-10">
                  <div className={`text-5xl font-light mb-3 group-hover:scale-110 transition-all duration-500 ${stat.color}`}
                       style={{
                         textShadow: `0 0 30px ${stat.color === 'text-yellow-400' ? 'rgba(255,193,7,0.5)' : stat.color === 'text-green-400' ? 'rgba(76,175,80,0.5)' : stat.color === 'text-blue-400' ? 'rgba(33,150,243,0.5)' : 'rgba(156,39,176,0.5)'}`,
                         transform: 'rotateX(0deg)',
                         transition: 'transform 0.5s'
                       }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;