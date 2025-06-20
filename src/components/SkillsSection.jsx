import { useState } from "react";
import { cn } from "@/lib/utils";

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
        src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png"
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
  {
    name: "TypeScript",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/640px-Typescript.svg.png"
        alt="TypeScript Logo"
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
        alt="ARM Assembly Logo"
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
  {
    name: "Tailwind CSS",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/640px-Tailwind_CSS_Logo.svg.png"
        alt="Tailwind CSS Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "frontend",
  },
  {
    name: "React",
    icon: (
      <img
        src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-5/24/react-512.png"
        alt="React Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "frontend",
  },
  {
    name: "Angular",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Angular"
        alt="Angular Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "frontend",
  },

  // Backend
  {
    name: "npm",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=npm"
        alt="npm Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "backend",
  },
  {
    name: "Node.js",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Node"
        alt="Node.js Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "backend",
  },
  {
    name: "Express",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Express"
        alt="Express Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "backend",
  },

  // Databases
  {
    name: "MySQL",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=MySQL"
        alt="MySQL Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "databases",
  },
  {
    name: "MongoDB",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Mongo"
        alt="MongoDB Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "databases",
  },
  {
    name: "PostgreSQL",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=PostgreSQL"
        alt="PostgreSQL Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "databases",
  },

  // Version Control
  {
    name: "Git",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Git"
        alt="Git Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "version-control",
  },
  {
    name: "GitHub",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=GitHub"
        alt="GitHub Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "version-control",
  },

  // Machine Learning
  {
    name: "TensorFlow",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=TF"
        alt="TensorFlow Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "Keras",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Keras"
        alt="Keras Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "PyTorch",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Torch"
        alt="PyTorch Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "Scikit-learn",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=SkLearn"
        alt="Scikit-learn Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "NumPy",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=NumPy"
        alt="NumPy Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "Pandas",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Pandas"
        alt="Pandas Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
  {
    name: "Matplotlib",
    icon: (
      <img
        src="https://via.placeholder.com/40?text=Plot"
        alt="Matplotlib Logo"
        className="h-10 w-10 object-contain"
      />
    ),
    category: "machine-learning",
  },
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
