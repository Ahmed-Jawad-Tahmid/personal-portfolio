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
  SiTensorflow,
  SiKeras,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiScikitlearn,
  SiPytorch,
} from "react-icons/si";

const skills = [
  // Languages
  {
    name: "Python",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/2048px-Python.svg.png"
        alt="Python Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },
  {
    name: "Java",
    icon: (
      <img
        src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/181_Java-512.png"
        alt="Java Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },
  {
    name: "C",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
        alt="C Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },
  {
    name: "JavaScript",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png"
        alt="JavaScript Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },
  { name: "TypeScript", 
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/640px-Typescript.svg.png"
        alt="ARM Assembly"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },

  {
    name: "ARM Assembly",
    icon: (
      <img
        src="https://cdn1.iconfinder.com/data/icons/technology-and-hardware-2/200/vector_66_06-1024.png"
        alt="ARM Assembly"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "languages",
  },

  // Frontend
  {
    name: "HTML",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/732/732212.png"
        alt="HTML Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "frontend",
  },
  {
    name: "CSS",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/2048px-CSS3_logo.svg.png"
        alt="CSS Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "frontend",
  },
  { name: "Tailwind CSS", 
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/640px-Tailwind_CSS_Logo.svg.png"
        alt="CSS Logo"
        className="h-10 w-10 object-contain"
      />
    ), 
    category: "frontend" },
  { name: "React", 
    icon: (
      <img
        src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-5/24/react-512.png"
        alt="CSS Logo"
        className="h-10 w-10 object-contain"
      />
    ), 
    category: "frontend" },
  { name: "Angular", icon: <SiAngular size={40} />, category: "frontend" },

  // Backend
  { name: "npm", icon: <SiNpm size={40} />, category: "backend" },
  { name: "Node.js", icon: <DiNodejs size={40} />, category: "backend" },
  { name: "Express", icon: <SiExpress size={40} />, category: "backend" },

  // Databases
  { name: "MySQL", icon: <SiMysql size={40} />, category: "databases" },
  { name: "MongoDB", icon: <DiMongodb size={40} />, category: "databases" },
  { name: "PostgreSQL", icon: <DiPostgresql size={40} />, category: "databases" },

  // Version Control
  { name: "Git", icon: <DiGit size={40} />, category: "version-control" },
  { name: "GitHub", icon: <SiGithub size={40} />, category: "version-control" },

  // Machine Learning
  { name: "TensorFlow", icon: <SiTensorflow size={40} />, category: "machine-learning" },
  { name: "Keras", icon: <SiKeras size={40} />, category: "machine-learning" },
  { name: "PyTorch", icon: <SiPytorch size={40} />, category: "machine-learning" },
  { name: "Scikit-learn", icon: <SiScikitlearn size={40} />, category: "machine-learning" },
  { name: "NumPy", icon: <SiNumpy size={40} />, category: "machine-learning" },
  { name: "Pandas", icon: <SiPandas size={40} />, category: "machine-learning" },
  { name: "Matplotlib", icon: <SiPlotly size={40} />, category: "machine-learning" }, // visual stand-in
];

const categories = [
  "languages",
  "frontend",
  "backend",
  "databases",
  "version-control",
  "machine-learning",
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
              <div>{skill.icon}</div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
