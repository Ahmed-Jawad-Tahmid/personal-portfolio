import { GraduationCap, Briefcase } from "lucide-react";

const YEAR_START  = 2022;
const YEAR_END    = 2027;
const SPAN        = YEAR_END - YEAR_START;
const H           = 500;
const MIN_BAR_H   = 90;
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
    period: "Sep 2022 – Jun 2027",
    bullets: [
      "Relevant courses: Data Science, AI & ML, Security & Privacy, Software Engineering, OS, Computer Networks, Cybersecurity, Web Development.",
      "2× Program for Undergraduate Research Experience (P.U.R.E) award winner, valued $7,500 each.",
    ],
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
    period: "May – Aug 2026",
    bullets: [
      "Conducting empirical research on CI/CD pipelines under the supervision of a senior professor.",
      "Analyzing GitHub Actions configuration pitfalls and fix patterns across open-source repositories.",
    ],
    startYear: 2026, startMonth: 5,
    endYear:   2026, endMonth:   8,
    snapYear: 2026,
    barClass:   "bg-violet-500/80 border border-violet-400/60",
    labelClass: "bg-violet-600 text-white border border-violet-500",
    icon: Briefcase,
    iconClass: "text-white",
  },
  {
    title: "Software Research Intern",
    org: "UCalgary · Database Inconsistencies",
    period: "May – Aug 2024",
    bullets: [
      "Conducted research on database inconsistencies under the supervision of a senior professor.",
      "Developed Python scripts to parse, clean, and summarize large datasets for modal-logic proof-tree generation.",
      "Optimized algorithm efficiency by reducing computation time by 25% for complex logical formulas.",
    ],
    startYear: 2024, startMonth: 5,
    endYear:   2024, endMonth:   8,
    snapYear: 2024,
    barClass:   "bg-blue-500/80 border border-blue-400/60",
    labelClass: "bg-blue-600 text-white border border-blue-500",
    icon: Briefcase,
    iconClass: "text-white",
  },
];

const Bar = ({ entry, tooltipSide = "right" }) => {
  const Icon   = entry.icon;
  const height = entry.snapYear ? MIN_BAR_H : toHeight(entry.startYear, entry.startMonth, entry.endYear, entry.endMonth);
  const top    = entry.snapYear ? toTop(entry.snapYear, 0) - height : toTop(entry.endYear, entry.endMonth);
  const isPrimary = entry.iconClass === "text-primary";

  return (
    <div
      className={`absolute rounded-xl ${entry.barClass} cursor-default overflow-visible group`}
      style={{ top, height, left: 0, right: 0, zIndex: 10 }}
    >
      {/* Bar content */}
      <div className="flex gap-2 px-3 py-2 h-full overflow-hidden rounded-xl">
        <div className={`p-1 rounded-full flex-shrink-0 h-fit mt-0.5 ${isPrimary ? "bg-primary/20" : "bg-white/20"}`}>
          <Icon className={`h-3.5 w-3.5 ${entry.iconClass}`} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 text-left">
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

      {/* Hover tooltip with bullets */}
      {entry.bullets && (
        <div className={`absolute top-0 z-50 w-72 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 ${tooltipSide === "left" ? "right-full mr-3" : "left-full ml-3"}`}>
          <div className="bg-card border border-border rounded-xl shadow-xl p-4">
            <p className="font-semibold text-sm mb-1">{entry.title}</p>
            <p className="text-xs text-muted-foreground mb-3">{entry.org} · {entry.period}</p>
            <ul className="space-y-2">
              {entry.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
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
              <Bar key={i} entry={e} tooltipSide="left" />
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
              <Bar key={i} entry={e} tooltipSide="right" />
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
