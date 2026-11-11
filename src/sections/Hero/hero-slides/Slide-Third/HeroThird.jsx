import React from 'react'

import styles from "./herothird.module.css";

export default function HeroThird() {
  return (
    <>
    <h2 className={styles.display}>
    You get one <em>clear shape.</em>
  </h2>

  <p className={styles.deck}>
    The team your company needs right now. Tell us what’s in the way.
  </p>

  <a className={styles.textlink} href="#compose">
    Start with what hurts ↓
  </a>
    </>
  );
}