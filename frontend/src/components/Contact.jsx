import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Contact = ({ data }) => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone}`
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: data.location,
      href: null
    }
  ];

  const socialProfiles = [
    { name: "GitHub", url: data.profiles.github },
    { name: "LinkedIn", url: data.profiles.linkedin },
    { name: "CodeChef", url: data.profiles.codechef },
    { name: "LeetCode", url: data.profiles.leetcode },
    { name: "Codeforces", url: data.profiles.codeforces }
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-40 w-52 h-52 border border-white/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute top-20 left-1/3 w-28 h-28 border border-white/10 rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-white relative inline-block">
            Let's Connect
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Open to exciting opportunities, collaborations, and conversations about technology and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Information */}
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-light mb-8 text-white">Get In Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-6 p-6 rounded-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer group transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                    onClick={() => item.href && window.open(item.href)}
                    style={{
                      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* 3D background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10">
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">{item.label}</div>
                      <div className="text-white font-medium text-lg group-hover:text-white transition-colors duration-300">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Social Profiles */}
            <div>
              <h3 className="text-3xl font-light mb-8 text-white">Developer Profiles</h3>
              <div className="grid grid-cols-1 gap-4">
                {socialProfiles.map((profile, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-between border-white/20 text-white/80 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-500 hover:scale-105 transform p-6 text-lg group relative overflow-hidden"
                    onClick={() => window.open(profile.url, "_blank")}
                    style={{
                      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                    <span className="relative z-10">{profile.name}</span>
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Card */}
          <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 relative overflow-hidden group"
                style={{
                  boxShadow: '0 30px 60px rgba(255, 255, 255, 0.15)'
                }}>
            {/* 3D depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
            
            <CardContent className="p-12 text-center space-y-8 relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 relative">
                <Mail className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                {/* 3D shadow */}
                <div className="absolute top-1 left-1 w-20 h-20 bg-black/20 rounded-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              </div>
              
              <div>
                <h3 className="text-3xl font-light mb-6 text-white">Ready to collaborate?</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  Whether you're looking for a full-stack developer, AI engineer, or technical consultant, 
                  I'd love to hear about your project and explore how we can work together.
                </p>
              </div>

              <div className="space-y-6">
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-500 hover:scale-105 py-8 text-lg font-medium group/btn relative overflow-hidden"
                  onClick={() => window.open(`mailto:${data.email}`, "_blank")}
                  style={{
                    boxShadow: '0 15px 30px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse"></div>
                  <span className="relative z-10 group-hover/btn:tracking-wider transition-all duration-300">Send Me an Email</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 py-8 text-lg font-medium group/btn relative overflow-hidden"
                  onClick={() => window.open(data.profiles.linkedin, "_blank")}
                  style={{
                    boxShadow: '0 15px 30px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse"></div>
                  <span className="relative z-10 group-hover/btn:tracking-wider transition-all duration-300">Connect on LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;