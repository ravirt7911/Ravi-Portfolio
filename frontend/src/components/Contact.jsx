import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Contact = ({ data }) => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone}`
    },
    {
      icon: <MapPin className="w-5 h-5" />,
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
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Open to exciting opportunities, collaborations, and conversations about technology and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer"
                    onClick={() => item.href && window.open(item.href)}
                  >
                    <div className="text-gray-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="text-gray-800 font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Profiles */}
            <div>
              <h3 className="text-2xl font-light mb-6">Developer Profiles</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialProfiles.map((profile, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-between border-gray-200 hover:border-gray-400 hover:bg-white transition-all duration-300 hover:scale-105"
                    onClick={() => window.open(profile.url, "_blank")}
                  >
                    <span>{profile.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-light mb-4">Ready to collaborate?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're looking for a full-stack developer, AI engineer, or technical consultant, 
                  I'd love to hear about your project and explore how we can work together.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 py-6"
                  onClick={() => window.open(`mailto:${data.email}`, "_blank")}
                >
                  Send Me an Email
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 py-6"
                  onClick={() => window.open(data.profiles.linkedin, "_blank")}
                >
                  Connect on LinkedIn
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