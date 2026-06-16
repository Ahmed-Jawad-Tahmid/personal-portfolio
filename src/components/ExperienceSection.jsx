import { GraduationCap, Briefcase } from "lucide-react";

const YEAR_START = 2022;
const YEAR_END   = 2027;
const SPAN       = YEAR_END - YEAR_START; // 5 years
const H          = 500; // container height in px
const MIN_BAR_H  = 52; // minimum bar height so short entries are always readable
const YEAR_LABELS = [2027, 2026, 2025, 2024, 2023, 2022];

// Distance from the TOP of the container (2027 = top, 2022 = bottom)
const toTop = (year, month = 0) => {
  const frac = Math.min(1, Math.max(0, (year + month / 12 - YEAR_START) / SPAN));
  return (1 - frac) * H;
};

const toHeight = (sy, sm, ey, em) => {
  const startFrac = (sy + sm / 12 - YEAR_START) / SPAN;
  const endFrac   = (ey + em / 12 - YEAR_START) / SPAN;
  return Math.max(MIN_BAR_H, (endFrac - startFrac) * H);
};

const entries = [
  {
    type: "education",
    title: "BSc Computer Science",
    org: "University of Calgary",
    detail: "Relevant courses: Data Science, AI & ML, OS, Networks, Security, Software Engineering. 2× P.U.R.E award winner ($7,500 each).",
    period: "Sep 2022 – Jun 2027",
    startYear: 2022, startMonth: 9,
    endYear:   2027, endMonth:   6,
    icon: GraduationCap,
    barClass:   "bg-primary/10 border border-primary/30",
    labelClass: "bg-primary/20 text-primary border border-primary/30",
    iconClass:  "text-primary",
  },
  {
    type: "work",
    title: "Software Research Intern",
    org: "University of Calgary · CI/CD Pipelines",
    detail: "Empirical research on CI/CD pipeline pitfalls. Analyzed GitHub Actions configs across open-source repositories.",
    period: "May – Aug 2026",
    startYear: 2026, startMonth: 5,
    endYear:   2026, endMonth:   8,
    icon: Briefcase,
    barClass:   "bg-violet-500/80 border border-violet-400/60",
    labelClass: "bg-violet-600 text-white border border-violet-500",
    iconClass:  "text-white",
  },
  {
    type: "work",
    title: "Software Research Intern",
    org: "University of Calgary · Database Inconsistencies",
    detail: "Python scripts to parse & clean large datasets for modal-logic proof-tree generation. Reduced computation time by 25%.",
    period: "May – Aug 2024",
    startYear: 2024, startMonth: 5,
    endYear:   2024, endMonth:   8,
    icon: Briefcase,
    barClass:   "bg-blue-500/80 border border-blue-400/60",
    labelClass: "bg-blue-600 text-white border border-blue-500",
    iconClass:  "text-white",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Experience &amp; <span className="text-primary">Education</span>
        </h2>

        <div className="flex gap-4">
          {/* Year labels */}
          <div className="relative flex-shrink-0 w-12" style={{ height: H }}>
            {YEAR_LABELS.map((yr) => (
              <span
                key={yr}
                className="absolute right-0 text-xs text-muted-foreground -translate-y-1/2"
                style={{ top: toTop(yr, 0) }}
              >
                {yr}
              </span>
            ))}
          </div>

          {/* Vertical line */}
          <div className="relative flex-shrink-0 w-px bg-border" style={{ height: H }} />

          {/* Bar track */}
          <div className="relative flex-1" style={{ height: H }}>
            {/* Tick marks */}
            {YEAR_LABELS.map((yr) => (
              <div
                key={yr}
                className="absolute left-0 right-0 border-t border-dashed border-border/40"
                style={{ top: toTop(yr, 0) }}
              />
            ))}

            {entries.map((entry, i) => {
              const Icon  = entry.icon;
              const top   = toTop(entry.endYear, entry.endMonth);
              const height = toHeight(entry.startYear, entry.startMonth, entry.endYear, entry.endMonth);
              const isEdu = entry.type === "education";

              return (
                <div
                  key={i}
                  className={`absolute rounded-xl ${entry.barClass} transition-all duration-300 overflow-hidden group cursor-default`}
                  style={{
                    top,
                    height,
                    left: isEdu ? 0 : "2%",
                    width: isEdu ? "100%" : "96%",
                    zIndex: isEdu ? 0 : 10,
                  }}
                >
                  {/* Label pinned to top of bar */}
                  <div className={`flex items-center gap-2 px-3 py-2 ${isEdu ? "" : ""}`}>
                    <div className={`p-1 rounded-full ${isEdu ? "bg-primary/20" : "bg-white/20"}`}>
                      <Icon className={`h-3.5 w-3.5 ${entry.iconClass}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${isEdu ? "text-primary" : "text-white"}`}>
                        {entry.title}
                      </p>
                      <p className={`text-xs truncate ${isEdu ? "text-primary/70" : "text-white/80"}`}>
                        {entry.period}
                      </p>
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  <div className="absolute left-full ml-3 top-0 z-50 w-64 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                    <div className="bg-card border border-border rounded-xl shadow-lg p-4">
                      <p className="font-semibold text-sm mb-1">{entry.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{entry.org}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{entry.detail}</p>
                      <span className={`inline-block mt-3 text-xs px-2 py-0.5 rounded-full ${entry.labelClass}`}>
                        {entry.period}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
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
