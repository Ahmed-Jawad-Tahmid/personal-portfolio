import { useState } from "react";
import { Globe, Code, Database } from "lucide-react";

export const AboutSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Software Developer 
            </h3>

            <p className="text-muted-foreground">
              I'm a Developer who Loves Building Cool Stuff that actually does something useful. 
            </p>

            <p className="text-muted-foreground">
              Always pushing myself to experiment and learn new things.
              Whether it’s backend logic or frontend polish, 
              I enjoy the process of creating something from 
              scratch and making it work well.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Web Dev */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Web Development</h4>
                  <p className="text-muted-foreground">
                    Creating responsive websites and web applications with modern frameworks.
                  </p>
                </div>
              </div>
            </div>

            {/* DB */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Database Systems</h4>
                  <p className="text-muted-foreground">
                    Experienced in designing and managing structured data using MongoDB and MySQL.
                  </p>
                </div>
              </div>
            </div>

            {/* Networking */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Networking Systems</h4>
                  <p className="text-muted-foreground">
                    Building responsive, real-time applications with network communication at their core.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightly sarcastic modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white max-w-md p-6 rounded-2xl shadow-xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2 text-black">
                Looking for my <span className="text-primary">Resume</span>?
              </h3>
              <p className="text-gray-700 mb-4">
                If you're an employer, recruiter, or someone looking to collaborate — then shoot me an email and I’ll happily share it!<br /><br />
                I like to keep my resume off the public web.<br />
                <span className="italic">Mystery = charm, right?</span>
              </p>
              <p className="text-sm text-gray-500">
                <a href="mailto:ahmedjawadtahmid@gmail.com" className="underline text-primary">
                  ahmedjawadtahmid@gmail.com
                </a>
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-full transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
