import { useEffect, useState } from "react";
import { CALGARY, calgaryHours, estimateSun, isoToHours, weatherFromCode, windFromSpeed } from "./skyLogic";

const URL =
  "https://api.open-meteo.com/v1/forecast" +
  `?latitude=${CALGARY.latitude}&longitude=${CALGARY.longitude}` +
  "&current=weather_code,temperature_2m,wind_speed_10m,wind_gusts_10m&daily=sunrise,sunset" +
  `&timezone=${encodeURIComponent(CALGARY.timezone)}&forecast_days=1`;

// Live time, weather, wind, sunrise and sunset for Calgary. Falls back to a clear sky and
// estimated sun times if the weather service can't be reached.
export function useCalgary() {
  const [live, setLive] = useState(() => ({
    t: calgaryHours(),
    weather: "clear",
    wind: "calm",
    temperature: null,
    offset: undefined,
    ...estimateSun(),
  }));

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setLive((prev) => ({
          ...prev,
          offset: data.utc_offset_seconds,
          t: calgaryHours(data.utc_offset_seconds),
          weather: weatherFromCode(data.current.weather_code),
          wind: windFromSpeed(data.current.wind_speed_10m ?? 0, data.current.wind_gusts_10m ?? 0),
          temperature: Math.round(data.current.temperature_2m),
          sunrise: isoToHours(data.daily.sunrise[0]),
          sunset: isoToHours(data.daily.sunset[0]),
        }));
      } catch {
        /* keep the fallback sky */
      }
    };

    load();
    const weatherTimer = setInterval(load, 15 * 60 * 1000);
    const clockTimer = setInterval(() => {
      setLive((prev) => ({ ...prev, t: calgaryHours(prev.offset) }));
    }, 30 * 1000);

    return () => {
      cancelled = true;
      clearInterval(weatherTimer);
      clearInterval(clockTimer);
    };
  }, []);

  return live;
}
