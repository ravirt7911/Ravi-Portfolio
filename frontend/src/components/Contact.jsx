import React from "react";
import { Button } from "./ui/button";

const Contact = ({ data }) => {
  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <div className="space-y-12">
          <h2 
            className="text-4xl md:text-5xl font-extralight tracking-tight text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "200",
              letterSpacing: "-0.01em"
            }}
          >
            Let's Connect
          </h2>
          
          <p 
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: "300",
              lineHeight: "1.7"
            }}
          >
            Open to exciting opportunities, collaborations, and conversations about technology and innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              className="bg-white text-black hover:bg-gray-100 transition-all duration-500 hover:scale-105 px-10 py-4 text-base font-light tracking-wide"
              onClick={() => window.open(`mailto:${data.email}`, "_blank")}
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              Send Email
            </Button>
            
            <Button
              variant="outline"
              className="border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 px-10 py-4 text-base font-light tracking-wide"
              onClick={() => window.open(data.profiles.linkedin, "_blank")}
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "300" }}
            >
              LinkedIn
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-16 space-y-4">
            <p 
              className="text-white/50 text-sm"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "300"
              }}
            >
              {data.email}
            </p>
            <p 
              className="text-white/50 text-sm"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "300"
              }}
            >
              {data.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;