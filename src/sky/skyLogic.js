// Everything that turns "what time is it and what's the weather in Calgary"
// into colours and positions for the sky page.

export const CALGARY = { latitude: 51.0447, longitude: -114.0719, timezone: "America/Edmonton" };

export const WEATHERS = [
  { id: "clear", label: "Clear" },
  { id: "cloudy", label: "Cloudy" },
  { id: "rain", label: "Rain" },
  { id: "snow", label: "Snow" },
];

export const WINDS = [
  { id: "calm", label: "Calm" },
  { id: "breeze", label: "Breeze" },
  { id: "gale", label: "Strong wind" },
];

// How far sideways rain and snow travel while they fall down the page (dx), how much rain
// leans (tilt, in degrees), and how many seconds a cloud takes to cross the strip.
export const WIND_LOOK = {
  calm: { dx: "0vh", tilt: 0, fallSpeed: 1, cloudSeconds: 0, gustOpacity: 0 },
  breeze: { dx: "8vh", tilt: -5, fallSpeed: 0.95, cloudSeconds: 95, gustOpacity: 0.18 },
  gale: { dx: "50vh", tilt: -27, fallSpeed: 0.75, cloudSeconds: 22, gustOpacity: 0.35 },
};

// Wind speed and gusts in km/h, as returned by Open-Meteo.
export function windFromSpeed(speed, gusts) {
  if (speed >= 30 || gusts >= 50) return "gale";
  if (speed >= 12 || gusts >= 25) return "breeze";
  return "calm";
}

const PALETTES = {
  dawn: { bg: "#FFE1CF", ink: "#2B1B3D", card: "#FFF4EC", accent: "#FF8552", onAccent: "#2B1B3D" },
  day: { bg: "#CDEBFF", ink: "#10243A", card: "#FFFFFF", accent: "#FFC83D", onAccent: "#10243A" },
  golden: { bg: "#FFD08A", ink: "#3A1F0B", card: "#FFE9C4", accent: "#F2622E", onAccent: "#2A1505" },
  dusk: { bg: "#4E4380", ink: "#FFF3E0", card: "#5D5196", accent: "#FF9E6B", onAccent: "#2B1B3D" },
  night: { bg: "#14213D", ink: "#F4F1DE", card: "#1E2E54", accent: "#F4F1DE", onAccent: "#14213D" },
};

// Blend two #RRGGBB colours; k = 0 gives a, k = 1 gives b.
export function mix(a, b, k) {
  let out = "#";
  for (let i = 1; i < 7; i += 2) {
    const v = Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - k) + parseInt(b.slice(i, i + 2), 16) * k);
    out += v.toString(16).padStart(2, "0");
  }
  return out;
}

// WMO weather codes, as returned by Open-Meteo.
export function weatherFromCode(code) {
  if (code === 0 || code === 1) return "clear";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return "rain";
  return "cloudy";
}

// Rough sunrise and sunset for Calgary, used only until (or unless) the live data arrives.
export function estimateSun(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start) / 86400000);
  const length = 12.2 + 4.3 * Math.cos((2 * Math.PI * (dayOfYear - 172)) / 365);
  const noon = 13.3;
  return { sunrise: noon - length / 2, sunset: noon + length / 2 };
}

// Decimal hours in Calgary right now. With a UTC offset from the weather service we use that;
// otherwise we ask the browser for the America/Edmonton time.
export function calgaryHours(utcOffsetSeconds) {
  const now = new Date();
  if (typeof utcOffsetSeconds === "number") {
    const local = new Date(now.getTime() + utcOffsetSeconds * 1000);
    return local.getUTCHours() + local.getUTCMinutes() / 60;
  }
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: CALGARY.timezone, hour: "numeric", minute: "numeric", hour12: false,
    }).formatToParts(now);
    const hour = Number(parts.find((p) => p.type === "hour").value) % 24;
    const minute = Number(parts.find((p) => p.type === "minute").value);
    return hour + minute / 60;
  } catch {
    return now.getHours() + now.getMinutes() / 60;
  }
}

export function isoToHours(iso) {
  const [h, m] = iso.slice(11, 16).split(":").map(Number);
  return h + m / 60;
}

function phaseAt(t, sunrise, sunset) {
  const dawnStart = sunrise - 0.75;
  const duskEnd = sunset + 0.9;
  if (t < dawnStart || t >= duskEnd) return "night";
  if (t < sunrise + 1) return "dawn";
  if (t < sunset - 1.5) return "day";
  if (t < sunset) return "golden";
  return "dusk";
}

export function formatClock(t) {
  let hh = Math.floor(t);
  let mm = Math.round((t - hh) * 60);
  if (mm === 60) { mm = 0; hh = (hh + 1) % 24; }
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "am" : "pm"}`;
}

function greetingAt(t) {
  if (t < 5 || t >= 22.5) return "You're up late";
  if (t < 12) return "Good morning";
  if (t < 17) return "Good afternoon";
  return "Good evening";
}

// The one function the page calls: time + sun times + weather in, look out.
export function buildSky({ t, sunrise, sunset, weather }) {
  const phase = phaseAt(t, sunrise, sunset);
  const look = PALETTES[phase];
  const darkSky = phase === "dusk" || phase === "night";

  let bg = look.bg;
  if (weather === "cloudy") bg = mix(look.bg, darkSky ? "#343A4C" : "#B4C0CC", 0.5);
  if (weather === "rain") bg = mix(look.bg, darkSky ? "#2A2F3E" : "#96A4B2", 0.68);
  if (weather === "snow") bg = mix(look.bg, darkSky ? "#3A4256" : "#A9B8C7", 0.6);

  const sun = weather === "clear" ? look.accent : mix(look.accent, bg, weather === "cloudy" ? 0.35 : 0.6);
  const cloud = darkSky ? (weather === "rain" ? "#4A5068" : "#565C75") : weather === "rain" ? "#DDE3EA" : "#FFFFFF";

  // Sun crosses between sunrise and sunset; the night disc crosses between dusk and dawn.
  let p;
  if (phase === "night") {
    const nightStart = sunset + 0.9;
    const nightLength = 24 - (nightStart - (sunrise - 0.75));
    p = (((t - nightStart) % 24) + 24) % 24 / nightLength;
  } else {
    p = Math.min(1.12, Math.max(-0.12, (t - sunrise) / (sunset - sunrise)));
  }

  return {
    phase,
    isNight: phase === "night",
    greeting: greetingAt(t),
    clock: formatClock(t),
    bodyLeft: `${(5 + 90 * p).toFixed(1)}%`,
    bodyTop: `${(124 - 100 * Math.sin(Math.PI * p)).toFixed(1)}%`,
    colors: { bg, ink: look.ink, card: look.card, accent: look.accent, onAccent: look.onAccent, sun, cloud },
  };
}

// A small seeded random-number generator, so the weather looks scattered and natural
// but is identical on every render (no reshuffling when React re-renders).
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Rain and snow in three depths: far drops are small, faint and slow; near ones are bigger,
// brighter and quicker. Every drop has its own speed, so the pattern never visibly repeats.
export function makeDrops(weather, wind = "calm") {
  if (weather !== "rain" && weather !== "snow") return [];
  const rand = seeded(weather === "rain" ? 11 : 23);
  const rain = weather === "rain";
  const speed = WIND_LOOK[wind].fallSpeed;
  const count = rain ? 80 : 60;
  return Array.from({ length: count }, () => {
    const depth = rand(); // 0 = far away, 1 = close
    const base = rain ? 2.6 - depth * 1.1 + rand() * 0.6 : 16 - depth * 7 + rand() * 4;
    const duration = base * speed;
    const size = rain ? 2 + Math.round(depth) : 3 + Math.round(depth * 5 + rand());
    return {
      left: `${(-8 + rand() * 116).toFixed(1)}%`,
      width: size,
      height: rain ? Math.round(9 + depth * 20 + rand() * 4) : size,
      opacity: (0.3 + depth * 0.55).toFixed(2),
      duration: `${duration.toFixed(2)}s`,
      delay: `${(-rand() * duration).toFixed(2)}s`,
      sway: `${(1.8 + rand() * 2.4).toFixed(2)}s`,
      rest: `${Math.round(4 + rand() * 90)}%`,
    };
  });
}

// Streaks of wind that cross the page: a couple of slow, faint ones in a breeze; more in strong
// wind, each with its own length, thickness, strength and speed.
export function makeGusts(wind) {
  if (wind === "calm") return [];
  const rand = seeded(wind === "gale" ? 37 : 53);
  const gale = wind === "gale";
  return Array.from({ length: gale ? 10 : 2 }, () => {
    const strength = rand();
    const duration = gale ? 2.4 + rand() * 3.2 : 11 + rand() * 5;
    return {
      top: `${Math.round(4 + rand() * 90)}%`,
      width: Math.round(gale ? 90 + rand() * 260 : 40 + rand() * 40),
      height: gale ? 2 + Math.round(strength * 2) : 2,
      opacity: (gale ? 0.14 + strength * 0.24 : 0.16).toFixed(2),
      duration: `${duration.toFixed(2)}s`,
      delay: `${(-rand() * duration).toFixed(2)}s`,
    };
  });
}

// Stars are spread over the whole window.
export const STARS = Array.from({ length: 44 }, (_, k) => ({
  left: `${(k * 37 + 11) % 100}%`,
  top: `${(k * 59 + 7) % 100}%`,
  size: 2 + ((k * 7) % 4),
}));

// Clouds are spread over the whole window too. "speed" varies how fast each one crosses in wind.
export const CLOUDS = [
  { left: "3%", top: "9%", width: 190, height: 78, duration: "9s", offset: 0.08, speed: 1 },
  { left: "30%", top: "3%", width: 260, height: 104, duration: "13s", offset: 0.42, speed: 1.25 },
  { left: "70%", top: "14%", width: 210, height: 84, duration: "11s", offset: 0.8, speed: 0.9 },
  { left: "86%", top: "40%", width: 170, height: 68, duration: "12s", offset: 0.6, speed: 1.4 },
  { left: "12%", top: "52%", width: 230, height: 92, duration: "14s", offset: 0.25, speed: 1.1 },
  { left: "55%", top: "72%", width: 200, height: 80, duration: "10s", offset: 0.95, speed: 1.3 },
  { left: "-4%", top: "86%", width: 180, height: 72, duration: "12s", offset: 0.5, speed: 0.85 },
];
