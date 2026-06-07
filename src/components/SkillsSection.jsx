import { useState } from "react";
import { cn } from "@/lib/utils";

const img = (src, alt) => (
  <img src={src} alt={alt} className="h-10 w-10 object-contain" />
);

const cdnImg = (url, alt) => (
  <img src={url} alt={alt} className="h-10 w-10 object-contain" />
);

const skills = [
  // Languages
  { name: "Python",      icon: img("/logos/Python.png", "Python"),         category: "languages" },
  { name: "Java",        icon: img("/logos/java.webp", "Java"),            category: "languages" },
  { name: "C",           icon: img("/logos/C.png", "C"),                   category: "languages" },
  { name: "C#",          icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", "C#"), category: "languages" },
  { name: "JavaScript",  icon: img("/logos/JS.png", "JavaScript"),         category: "languages" },
  { name: "TypeScript",  icon: img("/logos/TS.png", "TypeScript"),         category: "languages" },
  { name: "ARM Assembly", icon: img("/logos/Assembly.webp", "ARM Assembly"), category: "languages" },

  // Frontend
  { name: "HTML",        icon: img("/logos/HTML.png", "HTML"),            category: "frontend" },
  { name: "CSS",         icon: img("/logos/CSS.png", "CSS"),              category: "frontend" },
  { name: "Tailwind CSS",icon: img("/logos/Tailwind.png", "Tailwind"),    category: "frontend" },
  { name: "React",       icon: img("/logos/React.webp", "React"),         category: "frontend" },
  { name: "Angular",     icon: img("/logos/Angular.webp", "Angular"),     category: "frontend" },

  // Backend
  { name: "Node.js",    icon: img("/logos/nodejs.png", "Node.js"),        category: "backend" },
  { name: "Express",    icon: img("/logos/express.png", "Express"),       category: "backend" },
  { name: "npm",        icon: img("/logos/npm.png", "npm"),               category: "backend" },

  // Databases
  { name: "MySQL",       icon: img("/logos/mysql.png", "MySQL"),           category: "databases" },
  { name: "MongoDB",     icon: img("/logos/mongodb.png", "MongoDB"),       category: "databases" },
  { name: "PostgreSQL",  icon: img("/logos/postgresql.png", "PostgreSQL"), category: "databases" },
  { name: "AWS DynamoDB",icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg", "DynamoDB"), category: "databases" },

  // DevOps
  { name: "Git",            icon: img("/logos/git.webp", "Git"),          category: "devops" },
  { name: "GitHub",         icon: img("/logos/github.png", "GitHub"),     category: "devops" },
  { name: "GitLab",         icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg", "GitLab"), category: "devops" },
  { name: "GitHub Actions", icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", "GitHub Actions"), category: "devops" },
  { name: "Docker",         icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", "Docker"), category: "devops" },

  // Backend
  { name: "AWS Cognito", icon: cdnImg("https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg", "AWS Cognito"), category: "backend" },

  // Cloud
  { name: "AWS", icon: cdnImg("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", "AWS"), category: "cloud" },

  // Machine Learning
  { name: "TensorFlow",  icon: img("/logos/Tensorflow.png", "TensorFlow"),  category: "machine-learning" },
  { name: "Keras",       icon: img("/logos/keras.png", "Keras"),            category: "machine-learning" },
  { name: "PyTorch",     icon: img("/logos/Pytorch.png", "PyTorch"),        category: "machine-learning" },
  { name: "Scikit-learn",icon: img("/logos/Scikit_learn.png", "Scikit-learn"),category: "machine-learning" },
  { name: "NumPy",       icon: img("/logos/numpy.png", "NumPy"),            category: "machine-learning" },
  { name: "Pandas",      icon: img("/logos/pandas.png", "Pandas"),          category: "machine-learning" },
  { name: "Matplotlib",  icon: img("/logos/Matplotlib.png", "Matplotlib"),  category: "machine-learning" },
  { name: "YOLOv8",      icon: cdnImg("https://avatars.githubusercontent.com/u/26833451?s=200&v=4", "YOLOv8"), category: "machine-learning" },
];

const categories = [
  { key: "languages",        label: "Languages" },
  { key: "frontend",         label: "Frontend" },
  { key: "backend",          label: "Backend" },
  { key: "databases",        label: "Databases" },
  { key: "devops",           label: "DevOps" },
  { key: "cloud",            label: "Cloud" },
  { key: "machine-learning", label: "Machine Learning" },
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
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 cursor-pointer",
                activeCategory === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {label}
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
