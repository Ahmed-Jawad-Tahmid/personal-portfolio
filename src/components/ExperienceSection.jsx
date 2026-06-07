import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    type: "education",
    title: "BSc Computer Science",
    organization: "University of Calgary",
    period: "2022 – Present",
    description:
      "Final-year student specializing in software engineering and machine learning. Coursework spans algorithms, databases, operating systems, networks, and AI.",
    icon: GraduationCap,
  },
  {
    type: "work",
    title: "Undergraduate Research Intern",
    organization: "University of Calgary",
    period: "May 2024 – Aug 2024",
    description:
      "Researched and identified database inconsistencies, contributing to data integrity improvements across internal systems.",
    icon: Briefcase,
  },
  {
    type: "work",
    title: "Undergraduate Research Intern",
    organization: "University of Calgary",
    period: "May 2026 – Aug 2026",
    description:
      "Working on CI/CD pipeline design and automation, streamlining deployment workflows for research software.",
    icon: Briefcase,
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Experience &amp; <span className="text-primary">Education</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isWork = item.type === "work";

              return (
                <div key={index} className="relative flex gap-8">
                  {/* Icon badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isWork
                          ? "bg-primary/10 border-primary"
                          : "bg-secondary border-primary/50"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-card rounded-xl p-6 shadow-xs card-hover border border-border mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="font-semibold text-lg leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      {item.organization}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
