import { useEffect, useState } from "react";
import styles from "./mobileButton.module.css";
import ButtonCall from "../ButtonCallTrigger/ButtonCall";

export default function ButtonCallMobile() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("heroCta");
    const comp = document.getElementById("compose");
    const endSec = document.getElementById("close");

    if (!heroCta || !comp || !endSec) {
      return;
    }

    function onScroll() {
      document.body.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

      const r = comp.getBoundingClientRect();

      const heroPassed =
        heroCta.getBoundingClientRect().bottom < 0;

      const composeOutside =
        r.top > window.innerHeight || r.bottom < 0;

      const endNotReached =
        endSec.getBoundingClientRect().top >
        window.innerHeight * 0.8;

      setShow(
        heroPassed &&
        composeOutside &&
        endNotReached
      );
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("scrolled");
    };
  }, []);

  return (
    <div
      className={`${styles.mcta} ${
        show ? styles.show : ""
      }`.trim()}
    >
      <ButtonCall
        className={styles.btn}
        text="Book a free 30-min call"
      />
    </div>
  );
}