import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";


export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/xeokkqjg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setToastMessage("Message sent! I'll get back to you soon.");
        e.target.reset();
      } else {
        setToastMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setToastMessage("Error submitting form.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Got a job, project, or moral support to offer? I accept all three.
          Let’s connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-10">
                {/* Email */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:ahmedjawadtahmid@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      ahmedjawadtahmid@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <span className="text-muted-foreground">Calgary, AB, Canada</span>
                  </div>
                </div>
              </div>


            <div className="pt-12 text-center">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/ahmed-jawad-tahmid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/ahm_jawadx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://github.com/Ahmed-Jawad-Tahmid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  
                  <Github className="h-6 w-6 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://discord.com/users/386235881737945089"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <FaDiscord className="h-6 w-6 hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  pattern="^[A-Za-z\s]{2,}$"
                  title="Name must be at least 2 letters and contain only letters or spaces"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Jon Snow..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Enter a valid email address"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="jonsnow@thewall.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell Cersei. I want her to know..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 cursor-pointer"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>

              {toastMessage && (
                <p className="text-sm text-muted-foreground pt-2 text-center">
                  {toastMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
