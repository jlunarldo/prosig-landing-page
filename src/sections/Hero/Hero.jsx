import { useEffect, useState } from "react";

import HeroFirst from "./hero-slides/Slide-First/HeroFirst";
import HeroSecond from "./hero-slides/Slide-Second/HeroSecond";
import HeroThird from "./hero-slides/Slide-Third/HeroThird";
import HeroMosaic from "../../features/Mosaic/HeroMosaic";

import styles from "./hero.module.css";
const CAPS = [HeroFirst, HeroSecond, HeroThird];

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("top");

      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const scrollable = hero.offsetHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = Math.min(
        1,
        Math.max(0, -rect.top / scrollable)
      );

      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ph = progress < 0.3 ? 0 : progress < 0.66 ? 1 : 2;

  const ActiveCap = CAPS[ph];

  return (
    <section className={styles.theatre} id="top">
      <div className={styles.tstage}>
      <HeroMosaic canvasId="field" progress={progress} />
        <canvas id="field" aria-hidden="true" width="1050" height="948" className={styles.mosaic}></canvas>

        
        <div className={styles.tick}>
          {[0, 1, 2].map((i) => (
            <i key={i} className={ph === i ? styles.on : ""} />
          ))}
        </div>

        <div className={styles.caps}>
          <div
          className={`${styles.cap} ${styles.on}`}>
              <ActiveCap  />
          </div>
          
        </div>

      </div>
    </section>
  );
}