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

import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiGraphql,
  SiFigma,
  SiGithub,
} from "react-icons/si";

const skills = [
  // Frontend
  { name: "HTML/CSS", icon: <><DiHtml5 /> <DiCss3 /></>, category: "frontend" },
  { name: "JavaScript", icon: <DiJavascript1 />, category: "frontend" },
  { name: "React", icon: <DiReact />, category: "frontend" },
  { name: "TypeScript", icon: <SiTypescript />, category: "frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, category: "frontend" },

  // Backend
  { name: "Node.js", icon: <DiNodejs />, category: "backend" },
  { name: "Express", icon: <SiExpress />, category: "backend" },
  { name: "MongoDB", icon: <DiMongodb />, category: "backend" },
  { name: "PostgreSQL", icon: <DiPostgresql />, category: "backend" },
  { name: "GraphQL", icon: <SiGraphql />, category: "backend" },

  // Tools
  { name: "Git/GitHub", icon: <><DiGit /> <SiGithub /></>, category: "tools" },
  { name: "Docker", icon: <DiDocker />, category: "tools" },
  { name: "Figma", icon: <SiFigma />, category: "tools" },
  { name: "VS Code", icon: <DiVisualstudio />, category: "tools" },
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
          My <span className="text-primary">Skills</span>
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
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
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
              <div className="text-3xl text-primary">{skill.icon}</div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
