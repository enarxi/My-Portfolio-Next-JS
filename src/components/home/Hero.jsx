"use client";

import React from "react";
import styles from "./Hero.module.css";

const Hero = ({ children }) => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </section>
  );
};

export default Hero;
