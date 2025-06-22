import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSunrise, setShowSunrise] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      setShowSunrise(true);
      setTimeout(() => setShowSunrise(false), 1500);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <>
      {showSunrise && (
        <div className="sunrise-glow fixed inset-0 z-40 pointer-events-none animate-sunrise" />
      )}

      <button
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full transition-colors duration-300 text-primary",
          "hover:bg-primary/10 active:scale-95 focus:outline-none cursor-pointer"
        )}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-900" />
        )}
      </button>
    </>
  );
};
