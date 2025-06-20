import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [clickMeteors, setClickMeteors] = useState([]);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => generateStars();
    const handleClick = () => {
      spawnClickMeteor();
      setShowHint(false); // Hide hint after interaction
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick);

    // Auto-hide after 7 seconds
    const timer = setTimeout(() => setShowHint(false), 7000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
      clearTimeout(timer);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  const spawnClickMeteor = () => {
    const id = Date.now();
    const newMeteor = {
      id,
      size: Math.random() * 3 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 80,
      animationDuration: Math.random() * 2 + 3,
    };

    setClickMeteors((prev) => [...prev, newMeteor]);

    setTimeout(() => {
      setClickMeteors((prev) => prev.filter((m) => m.id !== id));
    }, newMeteor.animationDuration * 1000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
            visibility: "hidden",
            animationFillMode: "forwards",
          }}
          onAnimationStart={(e) => {
            e.currentTarget.style.visibility = "visible";
          }}
        />
      ))}

      {clickMeteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 40}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDuration: `${meteor.animationDuration}s`,
            visibility: "hidden",
            animationFillMode: "forwards",
          }}
          onAnimationStart={(e) => {
            e.currentTarget.style.visibility = "visible";
          }}
        />
      ))}

      {showHint && (
        <div className="fixed top-20 right-5 px-4 py-2 text-sm text-foreground/80 bg-background/70 backdrop-blur-sm rounded-md shadow-md animate-fade-in z-10">
          Psst... tap anywhere to make a wish ✨
        </div>
      )}
    </div>
  );
};
