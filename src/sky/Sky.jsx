import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, MapPin, MessageSquare, PawPrint, RefreshCw } from "lucide-react";
import { useCalgary } from "./useCalgary";
import { useSound } from "./useSound";
import { buildSky, makeDrops, CLOUDS, STARS, WEATHERS } from "./skyLogic";
import "./sky.css";

const TABS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
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

export const Sky = () => {
  const live = useCalgary();
  const sound = useSound();

  // null means "follow the real thing"; a value means the visitor has taken over.
  const [timeOverride, setTimeOverride] = useState(null);
  const [weatherOverride, setWeatherOverride] = useState(null);
  const [tab, setTab] = useState("about");
  const [wishes, setWishes] = useState(0);
  const [showResume, setShowResume] = useState(false);

  const t = timeOverride ?? live.t;
  const weather = weatherOverride ?? live.weather;
  const sky = useMemo(
    () => buildSky({ t, sunrise: live.sunrise, sunset: live.sunset, weather }),
    [t, live.sunrise, live.sunset, weather]
  );
  const drops = useMemo(() => makeDrops(weather), [weather]);
  const isLive = timeOverride === null && weatherOverride === null;

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
    sound.unlock();
    sound.note(784, 0.16, 0.06);
    sound.note(988, 0.16, 0.06, 0.1);
    sound.note(1319, 0.3, 0.06, 0.2);
    setWishes((n) => n + 1);
  };

  const style = {
    "--bg": sky.colors.bg,
    "--ink": sky.colors.ink,
    "--card": sky.colors.card,
    "--accent": sky.colors.accent,
    "--on-accent": sky.colors.onAccent,
    "--sun": sky.colors.sun,
    "--cloud": sky.colors.cloud,
  };

  return (
    <div className="sky" style={style} onPointerDown={sound.unlock}>
      <div className="sky-wrap">
        <header className="sky-top">
          <span>ahmedjt.com</span>
          <div className="sky-top-right">
            <span>
              Calgary, AB · {sky.clock} · {weatherLabel}
              {showTemperature ? `, ${live.temperature}°C` : ""}
            </span>
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

        <div className="sky-strip">
          {sky.isNight && (
            <div className="sky-layer" aria-hidden="true">
              {STARS.map((s, i) => (
                <span key={i} className="sky-star" style={{ left: s.left, top: s.top, width: s.size, height: s.size }} />
              ))}
            </div>
          )}

          <div className="sky-body" aria-hidden="true" style={{ left: sky.bodyLeft, top: sky.bodyTop }} />

          {weather !== "clear" && (
            <div className="sky-layer" aria-hidden="true">
              {CLOUDS.map((c, i) => (
                <div
                  key={i}
                  className="sky-cloud"
                  style={{ left: c.left, top: c.top, width: c.width, height: c.height, animationDuration: c.duration }}
                >
                  <span /><span /><span />
                </div>
              ))}
            </div>
          )}

          {drops.length > 0 && (
            <div className="sky-layer" aria-hidden="true">
              {drops.map((d, i) => (
                <span
                  key={`${weather}-${i}`}
                  className={weather === "snow" ? "sky-drop is-snow" : "sky-drop"}
                  style={{
                    left: d.left,
                    width: d.width,
                    height: d.height,
                    animationDuration: d.duration,
                    animationDelay: d.delay,
                    "--rest": d.rest,
                  }}
                />
              ))}
            </div>
          )}

          {sky.isNight && (
            <div className="sky-wish">
              <button type="button" className="sky-pill" onClick={makeWish} onMouseEnter={sound.hover}>
                Make a wish
              </button>
              <span aria-live="polite">{wishes > 0 ? `Wish no. ${wishes} sent. Delivery times vary.` : ""}</span>
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
                <div className="sky-icon is-round" aria-hidden="true"><RefreshCw size={30} /></div>
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
                  <div>
                    <strong>Gmail</strong>
                    <span>{EMAIL}</span>
                  </div>
                </a>
                <a className="sky-contact" href="https://github.com/Ahmed-Jawad-Tahmid" target="_blank" rel="noreferrer" onMouseEnter={sound.hover}>
                  <div className="sky-icon is-logo" aria-hidden="true"><img src="/sky/github.png" alt="" /></div>
                  <div>
                    <strong>GitHub</strong>
                    <span>Where the code lives</span>
                  </div>
                </a>
                <a className="sky-contact" href="https://www.linkedin.com/in/ahmed-jawad-tahmid" target="_blank" rel="noreferrer" onMouseEnter={sound.hover}>
                  <div className="sky-icon is-logo" aria-hidden="true"><img src="/sky/linkedin.png" alt="" /></div>
                  <div>
                    <strong>LinkedIn</strong>
                    <span>The professional version</span>
                  </div>
                </a>
              </div>
              <p className="sky-small">I usually reply within a day. Calgary time, so check the sky above.</p>
            </div>
          )}
        </section>

        <footer>
          <p className="sky-small">The sky on this page follows the real time and weather in Calgary.</p>
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
