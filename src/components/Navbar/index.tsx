// FILE: components/Navbar.tsx
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.css"; // Import the CSS module

const Navbar = () => {
  const [minimized, setMinimized] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setMinimized(true);
    } else {
      setMinimized(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`${styles.navbar} ${minimized ? styles.minimized : ""}`}
    >
      <nav>
        <ul className={styles.ul}>
          <li>
            <Link legacyBehavior href="/#home">
              <a className={styles["nav-link"]}>Home</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/#about">
              <a className={styles["nav-link"]}>About</a>
            </Link>
          </li>
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdxRC7RDKSa-dcPKMs0acPjmDk2Mastl6UnUKEBRxJnInd8qw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["nav-link"]}
            >
              Join Us
            </a>
          </li>
          <li>
            <Link legacyBehavior href="/team">
              <a className={styles["nav-link"]}>Team</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/projects">
              <a className={styles["nav-link"]}>Projects</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
