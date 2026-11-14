import { useEffect, useState } from "react";
import styles from "./mobileButton.module.css";
import ButtonCall from "../ButtonCallTrigger/ButtonCall";
export default function ButtonCallMobile() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.mcta} ${show ? styles.show : ""}`.trim()}>
      <ButtonCall
      className={styles.btn}
      text="Book a free 30-min call"
      ></ButtonCall>
      
    </div>
  );
}