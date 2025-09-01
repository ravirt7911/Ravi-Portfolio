import React from "react";
import { Card, CardContent } from "./ui/card";
import { Trophy, Award, Code, Users } from "lucide-react";

const Achievements = ({ data }) => {
  const getIcon = (title) => {
    if (title.includes("Position")) return <Trophy className="w-6 h-6" />;
    if (title.includes("Star") || title.includes("Rank")) return <Code className="w-6 h-6" />;
    if (title.includes("Speaker")) return <Users className="w-6 h-6" />;
    return <Award className="w-6 h-6" />;
  };

  const getIconColor = (index) => {
    const colors = [
      "text-yellow-600 bg-yellow-50",
      "text-blue-600 bg-blue-50", 
      "text-green-600 bg-green-50",
      "text-purple-600 bg-purple-50",
      "text-red-600 bg-red-50",
      "text-indigo-600 bg-indigo-50",
      "text-orange-600 bg-orange-50"
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Recognition and milestones in competitive programming, hackathons, and technical excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((achievement, index) => (
            <Card
              key={achievement.id}
              className="group border-0 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${getIconColor(index)} transition-all duration-300 group-hover:scale-110`}>
                    {getIcon(achievement.title)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-black group-hover:text-gray-700 transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {achievement.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl font-light text-black">7+</div>
            <div className="text-sm text-gray-600">Major Achievements</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-light text-black">3</div>
            <div className="text-sm text-gray-600">Hackathon Wins</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-light text-black">1402</div>
            <div className="text-sm text-gray-600">Global Rank (CodeJam)</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-light text-black">4⭐</div>
            <div className="text-sm text-gray-600">CodeChef Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;