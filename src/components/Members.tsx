// src/components/Members.tsx
import React from 'react';
import Member from './Member';
import styles from '../styles/Members.module.css';

export default class Members extends React.Component {
  render() {
    return (
      <div className={styles.membersContainer}>

        {/* 
          EXAMPLE #1: President 
          Adjust or remove committees as you want. 
        */}
        <div className={styles.committeeBlock}>
          <h2 className={styles.committeeTitle}>President</h2>
          <div className={styles.membersGrid}>
            <Member
              img="2024_members/Onur_Gul.png"
              n="Onur Gul"
              position="President"
              field="U2 Mathematics/Computer Science"
            />
          </div>
        </div>

        {/* 
          EXAMPLE #2: Sponsorship 
        */}
        <div className={styles.committeeBlock}>
          <h2 className={styles.committeeTitle}>Sponsorship</h2>
          <div className={styles.membersGrid}>
            <Member
              img="2024_members/Celine.png"
              n="Celine Sakkal"
              position="VP Sponsorship"
              field="U1 Computer Science"
            />
            <Member
              img="2024_members/Antonin.png"
              n="Antonin Beranger"
              position="Sponsorship Coordinator"
              field="U2 Economics and Computer Science"
            />
            <Member
              img="2024_members/Marie.png"
              n="Marie Pyun"
              position="Sponsorship Coordinator"
              field="U1 Biology and Math"
            />
          </div>
        </div>

        {/* 
          EXAMPLE #3: Finance
        */}
        <div className={styles.committeeBlock}>
          <h2 className={styles.committeeTitle}>Finance</h2>
          <div className={styles.membersGrid}>
            <Member
              img="2024_members/Ali.png"
              n="Ali Douba"
              position="VP Finance"
              field="U4 Finance, Analytics, and Sustainability"
            />
            <Member
              img="2024_members/Shahd.png"
              n="Shahd Audi"
              position="Finance Coordinator"
              field="U3 Kinesiology"
            />
          </div>
        </div>

        {/* 
          You can add more committees the same way (Logistics, Comms, ML, etc.). 
          Just replicate the <div className={styles.committeeBlock}> ... </div> chunk 
          and fill in the data. 
        */}

      </div>
    );
  }
}
