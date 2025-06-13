import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiVisualstudio,
  DiCss3,
  DiHtml5,
  DiJava,
  DiPython,
} from "react-icons/di";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMysql,
  SiC,
  SiNpm,
  SiGithub,
  SiAngular,
  SiTypescript,
} from "react-icons/si";

const skills = [
  // Languages
  { name: "Python", icon: <DiPython />, category: "languages" },
  { name: "Java", icon: <DiJava />, category: "languages" },
  { name: "C", icon: <SiC />, category: "languages" },
  { name: "JavaScript", icon: <DiJavascript1 />, category: "languages" },
  { name: "TypeScript", icon: <SiTypescript />, category: "languages" },

  // Frontend
  { name: "HTML", icon: <DiHtml5 />, category: "frontend" },
  { name: "CSS", icon: <DiCss3 />, category: "frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend" },
  { name: "React", icon: <DiReact />, category: "frontend" },
  { name: "Angular", icon: <SiAngular />, category: "frontend" },

  // Backend
  { name: "npm", icon: <SiNpm />, category: "backend" },
  { name: "Node.js", icon: <DiNodejs />, category: "backend" },
  { name: "Express", icon: <SiExpress />, category: "backend" },

  // Databases
  { name: "MySQL", icon: <SiMysql />, category: "databases" },
  { name: "MongoDB", icon: <DiMongodb />, category: "databases" },
  { name: "PostgreSQL", icon: <DiPostgresql />, category: "databases" },

  // Version Control
  { name: "Git", icon: <DiGit />, category: "version-control" },
  { name: "GitHub", icon: <SiGithub />, category: "version-control" },
];

const categories = [
  "languages",
  "frontend",
  "backend",
  "databases",
  "version-control",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("languages");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
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
              {category.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex items-center gap-4 hover:shadow-md transition"
            >
              {/* 👇 No text-primary here — so original icon color is preserved */}
              <div className="text-3xl">{skill.icon}</div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
