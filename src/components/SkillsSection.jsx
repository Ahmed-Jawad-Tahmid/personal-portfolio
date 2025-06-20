import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Languages
  {
    name: "Python",
    icon: (
      <img
        src="/logos/Python.png"
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
        src="/logos/java.webp"
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
        src="/logos/C.png"
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
        src="/logos/JS.png"
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
        src="/logos/TS.png"
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
        src="/logos/Assembly.webp"
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
        src="/logos/HTML.png"
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
        src="/logos/CSS.png"
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
        src="/logos/Tailwind.png"
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
        src="/logos/React.webp"
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
        src="/logos/Angular.webp"
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
        src="/logos/npm.png"
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
        src="/logos/nodejs.png"
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
        src="/logos/express.png"
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
        src="/logos/mysql.png"
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
        src="/logos/mongodb.png"
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
        src="/logos/postgresql.png"
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
        src="/logos/git.webp"
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
        src="/logos/github.png"
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
        src="/logos/tensorflow.webp"
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
        src="/logos/keras.webp"
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
        src="/logos/pytorch.webp"
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
        src="/logos/scikitlearn.webp"
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
        src="/logos/numpy.webp"
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
        src="/logos/pandas.webp"
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
        src="/logos/matplotlib.webp"
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