import React from 'react'
import StripMosaic from '../../../../features/Mosaic/StripMosaic'
import styles from "./herosecond.module.css";

export default function HeroSecond() {
    return (
    <>
     <p className={styles.eyebrow}>
    Nobody should build alone
    </p>

    <h2 className={styles.display}>
    We bring the <em>pieces.</em>
    </h2>

    <p className={styles.deck}>
      Leaders, product people, engineers and recruiters, senior and in your hours.
    </p>
  </>
    
  );
}