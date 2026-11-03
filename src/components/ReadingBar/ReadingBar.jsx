import { useEffect, useState } from "react";
import "./readingbar.css";

 function ReadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function scrollProgress() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const percentage = (window.scrollY / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    }

    window.addEventListener("scroll", scrollProgress, { passive: true });
    scrollProgress();

    return () => window.removeEventListener("scroll", scrollProgress);
  }, []);

  return (
    <div
      className="rbar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default ReadingBar;