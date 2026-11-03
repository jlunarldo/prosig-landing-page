import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./mobileButton.module.css";

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
      <Button className={styles.btn} onClick={() => setOpen(true)}>
        Book a free 30-min call
      </Button>
    </div>
  );
}