import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, MapPin, MessageSquare, PawPrint } from "lucide-react";
import { useCalgary } from "./useCalgary";
import { useSound } from "./useSound";
import { buildSky, makeDrops, makeGusts, CLOUDS, STARS, WEATHERS, WINDS, WIND_LOOK } from "./skyLogic";
import { SKILL_GROUPS } from "./skills";
import "./sky.css";

const TABS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certs" },
  { id: "hi", label: "Say hi" },
];

const EMAIL = "ahmedjawadtahmid@gmail.com";
const TITLE = "Jawad Tahmid";
const FONTS =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=Inter:wght@400;500;600&display=swap";

// Notes for the sun slider: the higher the sun, the higher the pitch.
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
const WEATHER_NOTES = { clear: 523, cloudy: 440, rain: 349, snow: 659 };
const WIND_NOTES = { calm: 392, breeze: 494, gale: 587 };
const WIND_WORDS = { calm: "", breeze: " · Breezy", gale: " · Windy" };

// What the sky says back, depending on how many wishes this visitor has made.
const wishReply = (n) => {
  if (n === 0) return "";
  if (n === 1) return "Wish no. 1 sent. Delivery times vary.";
  if (n === 2) return "Wish no. 2 sent. No refunds.";
  if (n === 3) return "Three wishes. That's the genie limit.";
  if (n === 4) return "Four? Bold.";
  if (n === 5) return "Ask god atp bro.";
  if (n <= 7) return "The star left you on read.";
  if (n <= 9) return "Bro, this is a sky, not customer support.";
  if (n <= 12) return "The stars have unionized. They want fewer wishes.";
  if (n <= 16) return "Wishing harder doesn't make it load faster.";
  if (n <= 20) return "Okay, go touch grass. It's right below the sky.";
  if (n <= 29) return "Fine. Wish granted: you now have one (1) portfolio to look at.";
  return `Achievement unlocked: ${n} wishes, 0 granted.`;
};

const wishLabel = (n) => {
  if (n < 5) return "Make a wish";
  if (n < 10) return "Make another wish";
  if (n < 21) return "Still wishing?";
  return "You again";
};

// The wish chime is always the same three rising notes. As the wishes pile up it gets
// played differently (lower, backwards, twice, out of tune) but it stays the same tune.
const CHIME = [784, 988, 1319];

const playChime = (s, { ratio = 1, gap = 0.1, type = "sine", reverse = false, repeat = 1, droop = false, detune = false } = {}) => {
  const notes = reverse ? [...CHIME].reverse() : CHIME;
  for (let r = 0; r < repeat; r++) {
    notes.forEach((freq, i) => {
      const at = (r * notes.length + i) * gap + r * gap * 0.5;
      const last = i === notes.length - 1;
      const f = freq * ratio;
      if (last && droop) {
        // The final note gives up and slides down.
        s.sweep(f, f * 0.45, 0.7, 0.06, at, type);
      } else {
        s.note(f, last ? gap * 3 : gap * 1.6, 0.06, at, type);
      }
      if (detune) s.note(f * 1.04, last ? gap * 3 : gap * 1.6, 0.04, at, type);
    });
  }
};

const CHIME_STYLES = {
  droop: { droop: true },
  tired: { ratio: 0.5, gap: 0.2, type: "triangle" },
  backwards: { reverse: true },
  twice: { repeat: 2, gap: 0.07 },
  wobbly: { detune: true, gap: 0.12 },
  tiny: { ratio: 2, gap: 0.06 },
  grand: { ratio: 0.75, gap: 0.14, type: "triangle", repeat: 2 },
};
const STYLE_CYCLE = ["droop", "backwards", "twice", "tired", "wobbly", "tiny"];

// How the chime is played for wish number n.
const chimeStyle = (n) => {
  if (n < 5) return { ratio: 2 ** ((n - 1) / 12) };
  if (n === 5) return CHIME_STYLES.droop;
  if (n <= 7) return CHIME_STYLES.tired;
  if (n <= 9) return CHIME_STYLES.backwards;
  if (n <= 12) return CHIME_STYLES.twice;
  if (n <= 16) return CHIME_STYLES.wobbly;
  if (n <= 20) return CHIME_STYLES.tiny;
  if (n === 21) return CHIME_STYLES.grand;
  return CHIME_STYLES[STYLE_CYCLE[n % STYLE_CYCLE.length]];
};

// Movement starts on unless the visitor's device asks for reduced motion; the Motion button overrides it.
const initialMotion = () => {
  try {
    const saved = localStorage.getItem("sky-motion");
    if (saved) return saved === "on";
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
};

export const Sky = () => {
  const live = useCalgary();
  const sound = useSound();

  // null means "follow the real thing"; a value means the visitor has taken over.
  const [timeOverride, setTimeOverride] = useState(null);
  const [weatherOverride, setWeatherOverride] = useState(null);
  const [windOverride, setWindOverride] = useState(null);
  const [motion, setMotion] = useState(initialMotion);
  const [tab, setTab] = useState("about");
  const [wishes, setWishes] = useState(0);
  const [showResume, setShowResume] = useState(false);

  const t = timeOverride ?? live.t;
  const weather = weatherOverride ?? live.weather;
  const wind = windOverride ?? live.wind;
  const windLook = WIND_LOOK[wind];
  const sky = useMemo(
    () => buildSky({ t, sunrise: live.sunrise, sunset: live.sunset, weather }),
    [t, live.sunrise, live.sunset, weather]
  );
  const drops = useMemo(() => makeDrops(weather, wind), [weather, wind]);
  const gusts = useMemo(() => makeGusts(wind), [wind]);
  const isLive = timeOverride === null && weatherOverride === null && windOverride === null;

  // Keep the area behind the page (overscroll, mobile browser bars) the same colour as the sky.
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = sky.colors.bg;
    return () => { document.body.style.backgroundColor = previous; };
  }, [sky.colors.bg]);

  // This page brings its own title and fonts, so index.html stays as the classic site left it.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = TITLE;
    if (!document.querySelector(`link[href="${FONTS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONTS;
      document.head.appendChild(link);
    }
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    if (!showResume) return;
    const onKey = (e) => { if (e.key === "Escape") setShowResume(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showResume]);

  const weatherLabel = WEATHERS.find((w) => w.id === weather).label;
  const showTemperature = weatherOverride === null && live.temperature !== null;

  const moveSun = (e) => {
    const value = Number(e.target.value);
    const span = live.sunset - live.sunrise;
    const height = Math.max(0, Math.sin((Math.PI * (value - live.sunrise)) / span));
    const step = SCALE[Math.round(height * (SCALE.length - 1))];
    sound.unlock();
    sound.note(262 * 2 ** (step / 12), 0.09, 0.05);
    setTimeOverride(value);
  };

  const backToNow = () => {
    sound.click(392);
    setTimeOverride(null);
    setWeatherOverride(null);
    setWindOverride(null);
  };

  const pickWind = (id) => {
    sound.click(WIND_NOTES[id]);
    setWindOverride(id);
  };

  const toggleMotion = () => {
    sound.click(motion ? 294 : 440);
    setMotion((on) => {
      try { localStorage.setItem("sky-motion", on ? "off" : "on"); } catch { /* private mode */ }
      return !on;
    });
  };

  const pickWeather = (id) => {
    sound.click(WEATHER_NOTES[id]);
    setWeatherOverride(id);
  };

  const pickTab = (id) => {
    sound.click(330);
    setTab(id);
  };

  const makeWish = () => {
    const next = wishes + 1;
    sound.unlock();
    playChime(sound, chimeStyle(next));
    setWishes(next);
  };

  const style = {
    "--bg": sky.colors.bg,
    "--ink": sky.colors.ink,
    "--card": sky.colors.card,
    "--accent": sky.colors.accent,
    "--on-accent": sky.colors.onAccent,
    "--sun": sky.colors.sun,
    "--cloud": sky.colors.cloud,
    "--dx": windLook.dx,
    "--gust": windLook.gustOpacity,
    "--tilt": `${windLook.tilt}deg`,
  };

  return (
    <div className={motion ? "sky" : "sky is-still"} style={style} onPointerDown={sound.unlock}>
      {/* The weather itself: fixed behind the whole page. */}
      <div className="sky-backdrop" aria-hidden="true">
        {sky.isNight && (
          <div className="sky-layer">
            {STARS.map((s, i) => (
              <span key={i} className="sky-star" style={{ left: s.left, top: s.top, width: s.size, height: s.size }} />
            ))}
          </div>
        )}

        {gusts.length > 0 && (
          <div className="sky-layer">
            {gusts.map((g, i) => (
              <span
                key={`${wind}-${i}`}
                className="sky-gust"
                style={{ top: g.top, width: g.width, animationDuration: g.duration, animationDelay: g.delay }}
              />
            ))}
          </div>
        )}

        {drops.length > 0 && (
          <div className="sky-layer">
            {drops.map((d, i) => (
              <span
                key={`${weather}-${wind}-${i}`}
                className={weather === "snow" ? "sky-drop is-snow" : "sky-drop"}
                style={{ left: d.left, animationDuration: d.duration, animationDelay: d.delay, "--rest": d.rest }}
              >
                <i style={{ width: d.width, height: d.height, animationDuration: d.sway }} />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="sky-wrap">
        <header className="sky-top">
          <span>ahmedjt.com</span>
          <div className="sky-top-right">
            <span>
              Calgary, AB · {sky.clock} · {weatherLabel}
              {showTemperature ? `, ${live.temperature}°C` : ""}
              {WIND_WORDS[wind]}
            </span>
            <button
              type="button"
              className="sky-pill"
              aria-pressed={motion}
              onClick={toggleMotion}
              onMouseEnter={sound.hover}
            >
              {motion ? "Motion on" : "Motion off"}
            </button>
            <button
              type="button"
              className="sky-pill"
              aria-pressed={sound.enabled}
              onClick={sound.toggle}
              onMouseEnter={sound.hover}
            >
              {sound.enabled ? "Sound on" : "Sound off"}
            </button>
          </div>
        </header>

        <div className="sky-strip" data-wind={wind}>
          <div className="sky-body" aria-hidden="true" style={{ left: sky.bodyLeft, top: sky.bodyTop }} />

          {weather !== "clear" && (
            <div className="sky-layer" aria-hidden="true">
              {CLOUDS.map((c, i) => (
                <div
                  key={i}
                  className="sky-cloud"
                  style={{
                    left: c.left,
                    top: c.top,
                    width: c.width,
                    height: c.height,
                    animationDuration: wind === "calm" ? c.duration : `${windLook.cloudSeconds}s`,
                    animationDelay: wind === "calm" ? "0s" : `${(-c.offset * windLook.cloudSeconds).toFixed(1)}s`,
                  }}
                >
                  <span /><span /><span />
                </div>
              ))}
            </div>
          )}

          {sky.isNight && wishes > 0 && <span key={wishes} className="sky-shooting" aria-hidden="true" />}

          {sky.isNight && (
            <div className="sky-wish">
              <button type="button" className="sky-pill" onClick={makeWish} onMouseEnter={sound.hover}>
                {wishLabel(wishes)}
              </button>
              <span aria-live="polite">{wishReply(wishes)}</span>
            </div>
          )}
        </div>

        <div className="sky-controls">
          <label htmlFor="sky-sun">Move the sun</label>
          <input id="sky-sun" type="range" min="0" max="23.75" step="0.25" value={Math.round(t * 4) / 4} onChange={moveSun} />
        </div>

        <div className="sky-controls" role="group" aria-label="Change the weather">
          <span>Don't like the weather?</span>
          <div className="sky-controls-group">
            {WEATHERS.map((w) => (
              <button
                key={w.id}
                type="button"
                className="sky-pill sky-pill-fill"
                aria-pressed={weather === w.id}
                onClick={() => pickWeather(w.id)}
                onMouseEnter={sound.hover}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sky-controls" role="group" aria-label="Change the wind">
          <span>And the wind?</span>
          <div className="sky-controls-group">
            {WINDS.map((w) => (
              <button
                key={w.id}
                type="button"
                className="sky-pill sky-pill-fill"
                aria-pressed={wind === w.id}
                onClick={() => pickWind(w.id)}
                onMouseEnter={sound.hover}
              >
                {w.label}
              </button>
            ))}
            {!isLive && (
              <button type="button" className="sky-pill" onClick={backToNow} onMouseEnter={sound.hover}>
                Back to now
              </button>
            )}
          </div>
        </div>

        <main>
          <p className="sky-hello">{sky.greeting}, I'm</p>
          <h1 className="sky-name">Jawad</h1>
          <p className="sky-tagline">
            A final-year computer science student at the University of Calgary who likes building things that end up
            being useful. Looking for a new-grad software role.
          </p>
        </main>

        <nav className="sky-tabs" aria-label="Sections">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sky-tab"
              aria-pressed={tab === item.id}
              onClick={() => pickTab(item.id)}
              onMouseEnter={sound.hover}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <section className="sky-card">
          {tab === "about" && (
            <div className="sky-panel sky-stack">
              <div className="sky-chips is-large">
                <span className="sky-chip">Calgary, AB</span>
                <span className="sky-chip">Graduating Dec 2026</span>
                <span className="sky-chip is-accent">Open to new-grad roles</span>
              </div>
              <p>
                I'm finishing my BSc in Computer Science at the University of Calgary. Along the way I spent two
                summers doing research, picked up two AWS certifications, and built a handful of apps with friends and
                on my own.
              </p>
              <p>
                I enjoy both ends of the work: getting backend logic right and making the front end pleasant to use.
                Mostly I like starting from nothing and ending with something that works.
              </p>
              <div>
                <button
                  type="button"
                  className="sky-button"
                  onClick={() => { sound.click(330); setShowResume(true); }}
                  onMouseEnter={sound.hover}
                >
                  <FileText size={20} aria-hidden="true" />
                  Résumé
                </button>
              </div>
            </div>
          )}

          {tab === "work" && (
            <div className="sky-panel sky-timeline">
              <article className="sky-job is-latest">
                <span className="sky-date">May to Aug 2026</span>
                <h2>Software Research Intern</h2>
                <p className="sky-org">University of Calgary</p>
                <p>
                  Empirical research on CI/CD pipelines: studied configuration pitfalls in GitHub Actions and how
                  open-source projects fix them.
                </p>
                <div className="sky-chips">
                  <span className="sky-chip">CI/CD</span>
                  <span className="sky-chip">GitHub Actions</span>
                  <span className="sky-chip">Research</span>
                </div>
              </article>

              <article className="sky-job">
                <span className="sky-date">May to Aug 2024</span>
                <h2>Undergraduate Research Assistant</h2>
                <p className="sky-org">University of Calgary</p>
                <p>Wrote Python to parse, clean and summarize large datasets for modal-logic proof-tree generation.</p>
                <div className="sky-chips">
                  <span className="sky-chip is-ink">25% faster on complex formulas</span>
                  <span className="sky-chip">Python</span>
                  <span className="sky-chip">Data cleaning</span>
                </div>
              </article>

              <article className="sky-job">
                <span className="sky-date">Sep 2022 to Dec 2026</span>
                <h2>BSc Computer Science</h2>
                <p className="sky-org">University of Calgary</p>
                <p>Courses across data science, AI and ML, security, operating systems, networks and web development.</p>
                <div className="sky-chips">
                  <span className="sky-chip is-ink">2× PURE research award, $7,500 each</span>
                </div>
              </article>
            </div>
          )}

          {tab === "projects" && (
            <div className="sky-panel sky-projects">
              <article className="sky-project" onMouseEnter={sound.hover}>
                <div className="sky-icon" aria-hidden="true"><MapPin size={30} /></div>
                <h2>VistaShare</h2>
                <p>A place for travellers to share locations and browse city guides.</p>
                <div className="sky-chips">
                  {["React", "Node", "Express", "MySQL", "Leaflet"].map((x) => (
                    <span key={x} className="sky-chip">{x}</span>
                  ))}
                </div>
                <a className="sky-link" href="https://github.com/Ahmed-Jawad-Tahmid/VistaShare" target="_blank" rel="noreferrer">
                  See the code <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>

              <article className="sky-project" onMouseEnter={sound.hover}>
                <div className="sky-icon" aria-hidden="true"><PawPrint size={30} /></div>
                <h2>Apollo</h2>
                <p>
                  Adopt a real wild animal and follow it by GPS, with AI-written updates and donations that go to
                  conservation.
                </p>
                <div className="sky-chips">
                  {["Angular", "Node", "MongoDB", "YOLOv8", "Google Maps"].map((x) => (
                    <span key={x} className="sky-chip">{x}</span>
                  ))}
                </div>
                <a className="sky-link" href="https://github.com/arjitchitkara/CALGARYHACKS" target="_blank" rel="noreferrer">
                  See the code <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>

              <article className="sky-project" onMouseEnter={sound.hover}>
                <div className="sky-icon" aria-hidden="true"><MessageSquare size={30} /></div>
                <h2>Offline Group Chat</h2>
                <p>Real-time chat over WebSockets that keeps working when the internet doesn't.</p>
                <div className="sky-chips">
                  {["WebSocket", "JavaScript", "HTML", "CSS"].map((x) => (
                    <span key={x} className="sky-chip">{x}</span>
                  ))}
                </div>
                <a className="sky-link" href="https://github.com/Ahmed-Jawad-Tahmid/Offline-Group-Chat" target="_blank" rel="noreferrer">
                  See the code <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            </div>
          )}

          {tab === "skills" && (
            <div className="sky-panel sky-skills">
              {SKILL_GROUPS.map((group, g) => (
                <div key={group.label} className="sky-skill-group">
                  <h2>{group.label}</h2>
                  <ul>
                    {group.skills.map((skill, i) => (
                      <li
                        key={skill.name}
                        className="sky-skill"
                        onMouseEnter={() => sound.hoverTone(392 * 2 ** (SCALE[(g * 2 + i) % SCALE.length] / 12))}
                      >
                        <span className="sky-skill-logo">
                          <img src={skill.logo} alt="" loading="lazy" />
                        </span>
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab === "certs" && (
            <div className="sky-panel sky-certs">
              <div className="sky-cert" onMouseEnter={sound.hover}>
                <img src="/sky/aws-saa.png" alt="AWS Certified Solutions Architect Associate badge" width="88" height="88" />
                <div className="sky-cert-text">
                  <h2>AWS Certified Solutions Architect, Associate</h2>
                  <p>Amazon Web Services · 2026</p>
                </div>
                <span className="sky-chip">SAA-C03</span>
                <a className="sky-link" href="https://www.credly.com/badges/23c53cd1-f029-4846-a00b-3b5b64ab99b8/public_url" target="_blank" rel="noreferrer">
                  Verify <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>

              <div className="sky-cert" onMouseEnter={sound.hover}>
                <img src="/sky/aws-clf.png" alt="AWS Certified Cloud Practitioner badge" width="88" height="88" />
                <div className="sky-cert-text">
                  <h2>AWS Certified Cloud Practitioner</h2>
                  <p>Amazon Web Services · 2026</p>
                </div>
                <span className="sky-chip">CLF-C02</span>
                <a className="sky-link" href="https://www.credly.com/badges/00f953ad-d30d-4607-adad-b81c9e2a92df/public_url" target="_blank" rel="noreferrer">
                  Verify <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>

              <div className="sky-cert" onMouseEnter={sound.hover}>
                <img src="https://learn.microsoft.com/training/achievements/generic-trophy.svg" alt="Microsoft Learn trophy" width="88" height="88" />
                <div className="sky-cert-text">
                  <h2>DevOps Foundations: The Core Principles and Practices</h2>
                  <p>Microsoft Learn · 2025</p>
                </div>
                <span className="sky-chip">DevOps</span>
                <a className="sky-link" href="https://learn.microsoft.com/en-us/users/ahmedjawadtahmid-2180/achievements/e5aakhnp" target="_blank" rel="noreferrer">
                  Verify <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {tab === "hi" && (
            <div className="sky-panel">
              <p className="sky-hi-line">Got a job, a project, or moral support to offer? I accept all three.</p>
              <div className="sky-contacts">
                <a className="sky-contact" href={`mailto:${EMAIL}`} onMouseEnter={sound.hover}>
                  <div className="sky-icon is-logo" aria-hidden="true"><img src="/sky/gmail.png" alt="" /></div>
                  <strong>Gmail</strong>
                </a>
                <a className="sky-contact" href="https://github.com/Ahmed-Jawad-Tahmid" target="_blank" rel="noreferrer" onMouseEnter={sound.hover}>
                  <div className="sky-icon is-logo" aria-hidden="true"><img src="/sky/github.png" alt="" /></div>
                  <strong>GitHub</strong>
                </a>
                <a className="sky-contact" href="https://www.linkedin.com/in/ahmed-jawad-tahmid" target="_blank" rel="noreferrer" onMouseEnter={sound.hover}>
                  <div className="sky-icon is-logo" aria-hidden="true"><img src="/sky/linkedin.png" alt="" /></div>
                  <strong>LinkedIn</strong>
                </a>
              </div>
            </div>
          )}
        </section>

        <footer>
          <p className="sky-small">The sky on this page follows the real time, weather and wind in Calgary.</p>
        </footer>
      </div>

      {showResume && (
        <div className="sky-overlay" onClick={() => setShowResume(false)}>
          <div
            className="sky-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sky-resume-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="sky-resume-title">Looking for my résumé?</h2>
            <p>
              If you're an employer, recruiter, or someone looking to collaborate then feel free to shoot me an email
              and I'll happily share it!
            </p>
            <p>
              I like to keep my résumé off the public web. <em>Mystery = charm, right?</em>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <button type="button" className="sky-button" autoFocus onClick={() => setShowResume(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
