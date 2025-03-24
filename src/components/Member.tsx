// src/components/Member.tsx
import React from 'react';
import styles from '../styles/Member.module.css';

interface MemberProps {
  /** Path to image. E.g. "2024_members/Onur_Gul.png" (since it's in public/). */
  img: string;
  /** Member's name. */
  n: string;
  /** Member's position (VP Finance, President, etc.). */
  position: string;
  /** Member's field (e.g. "U2 Mathematics/Computer Science"). */
  field: string;
}

export default class Member extends React.Component<MemberProps> {
  render() {
    const { img, n, position, field } = this.props;

    return (
      <div className={styles.memberWrapper}>
        {/* 
          The circular photo with an outer ring. 
          "img" should be something like "2024_members/Onur_Gul.png"
          because it's inside `public/`.
          So the actual rendered <img src> becomes "/2024_members/Onur_Gul.png".
        */}
        <img
          src={`/${img}`}
          alt={n}
          className={styles.memberImage}
        />

        {/* 
          The overlay that appears only when hovering exactly over the photo. 
          It uses absolutely-positioned <div> plus transitions.
        */}
        <div className={styles.overlay}>
          <div className={styles.overlayInner}>
            <div className={styles.memberName}>{n}</div>
            <div className={styles.memberPosition}>{position}</div>
            <div className={styles.memberField}>{field}</div>
          </div>
        </div>
      </div>
    );
  }
}
