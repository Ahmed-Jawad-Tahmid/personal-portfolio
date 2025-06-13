import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiDocker,
  DiVisualstudio,
} from "react-icons/di";

import { SiTailwindcss, SiNextdotjs, SiExpress, SiTypescript, SiGraphql, SiFigma, SiGithub } from "react-icons/si";

const skills = [
  // Frontend
  { name: "HTML/CSS", icon: <DiReact />, category: "frontend" },
  { name: "JavaScript", icon: <DiReact />, category: "frontend" },
  { name: "React", icon: <DiReact />, category: "frontend" },
  { name: "TypeScript", icon: <DiReact />, category: "frontend" },
  { name: "Tailwind CSS", icon: <DiReact />, category: "frontend" },
  { name: "Next.js", icon: <DiReact />, category: "frontend" },

  // Backend
  { name: "Node.js", icon: <DiReact />, category: "backend" },
  { name: "Express", icon: <DiReact />, category: "backend" },
  { name: "MongoDB", icon: <DiReact />, category: "backend" },
  { name: "PostgreSQL", icon: <DiReact />, category: "backend" },
  { name: "GraphQL", icon: <DiReact />, category: "backend" },

  // Tools
  { name: "Git/GitHub", icon: <DiReact />, category: "tools" },
  { name: "Docker", icon: <DiReact />, category: "tools" },
  { name: "Figma", icon: <DiReact />, category: "tools" },
  { name: "VS Code", icon: <DiReact />, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex items-center gap-4 hover:shadow-md transition"
            >
              <div className="text-3xl text-primary">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};