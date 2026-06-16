import { GraduationCap, Briefcase } from "lucide-react";

const YEAR_START  = 2022;
const YEAR_END    = 2027;
const SPAN        = YEAR_END - YEAR_START;
const H           = 500;
const MIN_BAR_H   = 52;
const YEAR_LABELS = [2027, 2026, 2025, 2024, 2023, 2022];

const toTop = (year, month = 0) => {
  const frac = Math.min(1, Math.max(0, (year + month / 12 - YEAR_START) / SPAN));
  return (1 - frac) * H;
};

const toHeight = (sy, sm, ey, em) => {
  const startFrac = (sy + sm / 12 - YEAR_START) / SPAN;
  const endFrac   = (ey + em / 12 - YEAR_START) / SPAN;
  return Math.max(MIN_BAR_H, (endFrac - startFrac) * H);
};

const education = [
  {
    title: "BSc Computer Science",
    org: "University of Calgary",
    detail: "Courses: Data Science, AI & ML, OS, Networks, Security, Software Engineering. 2× P.U.R.E award winner ($7,500 each).",
    period: "Sep 2022 – Jun 2027",
    startYear: 2022, startMonth: 9,
    endYear:   2027, endMonth:   6,
    barClass:   "bg-primary/10 border border-primary/30",
    labelClass: "bg-primary/20 text-primary border border-primary/30",
    icon: GraduationCap,
    iconClass: "text-primary",
  },
];

const experience = [
  {
    title: "Software Research Intern",
    org: "UCalgary · Security in CI/CD Pipelines",
    detail: "Empirical research on security in CI/CD pipelines. Analyzed GitHub Actions configs across open-source repositories.",
    period: "May – Aug 2026",
    startYear: 2026, startMonth: 0,
    endYear:   2027, endMonth:   0,
    barClass:   "bg-violet-500/80 border border-violet-400/60",
    labelClass: "bg-violet-600 text-white border border-violet-500",
    icon: Briefcase,
    iconClass: "text-white",
  },
  {
    title: "Software Research Intern",
    org: "UCalgary · Database Inconsistencies",
    detail: "Python scripts to parse & clean large datasets for modal-logic proof-tree generation. Reduced computation time by 25%.",
    period: "May – Aug 2024",
    startYear: 2024, startMonth: 0,
    endYear:   2025, endMonth:   0,
    barClass:   "bg-blue-500/80 border border-blue-400/60",
    labelClass: "bg-blue-600 text-white border border-blue-500",
    icon: Briefcase,
    iconClass: "text-white",
  },
];

const Bar = ({ entry }) => {
  const Icon   = entry.icon;
  const top    = toTop(entry.endYear, entry.endMonth);
  const height = toHeight(entry.startYear, entry.startMonth, entry.endYear, entry.endMonth);
  const isPrimary = entry.iconClass === "text-primary";

  return (
    <div
      className={`absolute rounded-xl ${entry.barClass} cursor-default overflow-hidden`}
      style={{ top, height, left: 0, right: 0, zIndex: 10 }}
    >
      <div className="flex gap-2 px-3 py-2 h-full">
        {/* Icon */}
        <div className={`p-1 rounded-full flex-shrink-0 h-fit mt-0.5 ${isPrimary ? "bg-primary/20" : "bg-white/20"}`}>
          <Icon className={`h-3.5 w-3.5 ${entry.iconClass}`} />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className={`text-xs font-semibold truncate ${isPrimary ? "text-primary" : "text-white"}`}>
            {entry.title}
          </p>
          <p className={`text-xs truncate ${isPrimary ? "text-primary/70" : "text-white/80"}`}>
            {entry.org}
          </p>
          <p className={`text-xs truncate ${isPrimary ? "text-primary/50" : "text-white/60"}`}>
            {entry.period}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Experience &amp; <span className="text-primary">Education</span>
        </h2>

        <div className="flex gap-3 items-start">
          {/* Experience — left */}
          <div className="relative flex-1" style={{ height: H }}>
            {YEAR_LABELS.map((yr) => (
              <div
                key={yr}
                className="absolute left-0 right-0 border-t border-dashed border-border/40"
                style={{ top: toTop(yr, 0) }}
              />
            ))}
            {experience.map((e, i) => (
              <Bar key={i} entry={e} />
            ))}
          </div>

          {/* Centre: year labels + line */}
          <div className="relative flex-shrink-0 flex flex-col items-center" style={{ height: H, width: 48 }}>
            <div className="absolute top-0 bottom-0 w-px bg-border left-1/2 -translate-x-1/2" />
            {YEAR_LABELS.map((yr) => (
              <span
                key={yr}
                className="absolute text-xs text-muted-foreground -translate-x-1/2 -translate-y-1/2 bg-background px-1"
                style={{ top: toTop(yr, 0), left: "50%" }}
              >
                {yr}
              </span>
            ))}
          </div>

          {/* Education — right */}
          <div className="relative flex-1" style={{ height: H }}>
            {YEAR_LABELS.map((yr) => (
              <div
                key={yr}
                className="absolute left-0 right-0 border-t border-dashed border-border/40"
                style={{ top: toTop(yr, 0) }}
              />
            ))}
            {education.map((e, i) => (
              <Bar key={i} entry={e} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-6 justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/30" />
            Education
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm bg-violet-500/80 border border-violet-400/60" />
            Internship (2026)
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm bg-blue-500/80 border border-blue-400/60" />
            Internship (2024)
          </div>
        </div>
      </div>
    </section>
  );
};
