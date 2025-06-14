import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "VistaShare – Location Sharing App",
    description: "A platform for explorers to share locations and explore city guides. Designed with travelers in mind using MERN stack",
    image: "/projects/project1.png",
    tags: ["React", "MySQL", "Node.js", "Leaflet.js", "Express.js"],
    demoUrl: "https://github.com/Ahmed-Jawad-Tahmid/VistaShare",
  },
  {
    id: 2,
    title: "Apollo – Wildlife Tracker",
    description:
      "A GPS-powered wildlife conservation app that lets users 'adopt' real animals. Includes live tracking, AI-generated summaries and a donation model to boost wildlife conservation",
    image: "/projects/project2.png",
    tags: ["MongoDB", "Angular", "Node.js", "YOLOv8", "Google Maps API"],
    demoUrl: "https://github.com/arjitchitkara/CALGARYHACKS",
  },
  {
    id: 3,
    title: "Offline Group Chat",
    description:
      "A WebSocket-based real-time chat app that works without internet",
    image: "/projects/project3.png",
    tags: ["WebSocket", "Node.js", "HTML", "CSS", "Offline"],
    demoUrl: "https://github.com/Ahmed-Jawad-Tahmid/Offline-Group-Chat",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Ahmed-Jawad-Tahmid"
          >
            My Github <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};