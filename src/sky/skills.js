// Skills shown on the sky page. Logos are the same files and links the classic site uses.
const cdn = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

export const SKILL_GROUPS = [
  {
    label: "Languages",
    skills: [
      { name: "Python", logo: "/logos/Python.png" },
      { name: "Java", logo: "/logos/java.webp" },
      { name: "C", logo: "/logos/C.png" },
      { name: "C#", logo: cdn("csharp/csharp-original.svg") },
      { name: "JavaScript", logo: "/logos/JS.png" },
      { name: "TypeScript", logo: "/logos/TS.png" },
      { name: "ARM Assembly", logo: "/logos/Assembly.webp" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "HTML", logo: "/logos/HTML.png" },
      { name: "CSS", logo: "/logos/CSS.png" },
      { name: "Tailwind CSS", logo: "/logos/Tailwind.png" },
      { name: "React", logo: "/logos/React.webp" },
      { name: "Angular", logo: "/logos/Angular.webp" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", logo: "/logos/nodejs.png" },
      { name: "Express", logo: "/logos/express.png" },
      { name: "npm", logo: "/logos/npm.png" },
      { name: "AWS Cognito", logo: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "MySQL", logo: "/logos/mysql.png" },
      { name: "MongoDB", logo: "/logos/mongodb.png" },
      { name: "PostgreSQL", logo: "/logos/postgresql.png" },
      { name: "AWS DynamoDB", logo: cdn("dynamodb/dynamodb-original.svg") },
    ],
  },
  {
    label: "DevOps",
    skills: [
      { name: "Git", logo: "/logos/git.webp" },
      { name: "GitHub", logo: "/logos/github.png" },
      { name: "GitLab", logo: cdn("gitlab/gitlab-original.svg") },
      { name: "GitHub Actions", logo: cdn("githubactions/githubactions-original.svg") },
      { name: "Docker", logo: cdn("docker/docker-original.svg") },
    ],
  },
  {
    label: "Cloud",
    skills: [{ name: "AWS", logo: cdn("amazonwebservices/amazonwebservices-plain-wordmark.svg") }],
  },
  {
    label: "Machine Learning",
    skills: [
      { name: "TensorFlow", logo: "/logos/Tensorflow.png" },
      { name: "Keras", logo: "/logos/keras.png" },
      { name: "PyTorch", logo: "/logos/Pytorch.png" },
      { name: "Scikit-learn", logo: "/logos/Scikit_learn.png" },
      { name: "NumPy", logo: "/logos/numpy.png" },
      { name: "Pandas", logo: "/logos/pandas.png" },
      { name: "Matplotlib", logo: "/logos/Matplotlib.png" },
      { name: "YOLOv8", logo: "https://avatars.githubusercontent.com/u/26833451?s=200&v=4" },
    ],
  },
];
