// FILE: pages/team.tsx

import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/** 
 * Utility function to determine if a member is an executive
 * (VP / President / Head, etc.) => Red ring 
 */
function isExec(position: string): boolean {
  const p = position.toLowerCase();
  return p.includes("vp") || p.includes("president") || p.includes("head");
}

export default function Team() {
  const committees = [
    {
      name: "Algorithmic Trading",
      members: [
        {
          name: "Onur Gul",
          position: "Co-President, Head of Algorithmic Trading",
          field: "U2 Mathematics and Computer Science",
          img: "/2024_members/Onur_Gul.png",
          linkedin: "https://www.linkedin.com/in/onurgul1/" // update with correct URL
        },
        {
          name: "Theodor Semerdzhiev",
          position: "Algo-Trading Researcher",
          field: "U2 Computer Science",
          img: "/2024_members/Theodor.png", // or any other photo
          linkedin: "https://www.linkedin.com/in/theodor-semerdzhiev-21687a249/" // update with correct URL
        },
        {
          name: "Parsa Jafarian",
          position: "Algo-Trading Researcher",
          field: "U1 Software Engineering",
          img: "/2024_members/Parsa.jpg", // or any other photo
          linkedin: "https://www.linkedin.com/in/parsa-jafarian/?originalSubdomain=ca" // update with correct URL
        },
      ],
    },
    {
      name: "Data Science",
      members: [
        {
          name: "MacLaren Scott",
          position: "Co-President, Head of Data Science",
          field: "U2 Mathematics and Computer Science",
          img: "/2024_members/Mac.jpeg",
          linkedin: "https://www.linkedin.com/in/maclarenscott/" // update with correct URL
        },
        {
          name: "Murad Ismayilov",
          position: "Data Science Researcher",
          field: "U2 Computer Science - A.I.",
          img: "/2024_members/Murad.png",
          linkedin: "https://www.linkedin.com/in/murad-ism/" // update with correct URL
        },
        
      ],
    },
    {
      name: "Risk Management",
      members: [
        {
          name: "Rob Li",
          position: "Head of Risk Management",
          field: "U2 Applied Mathematics",
          img: "/2024_members/Rob.png", // or any other photo
          linkedin: "https://www.linkedin.com/in/rob-li-b6380725b/" // update with correct URL
        },
        {
          name: "Eli Kohn",
          position: "Risk Management Researcher",
          field: "U2 Mathematics and Computer Science",
          img: "/2024_members/Eli.png",
          linkedin: "https://www.linkedin.com/in/eli-kohn-7b450a258/" // update with correct URL
        },
        {
          name: "Nicholas Belev",
          position: "Risk Management Researcher",
          field: "U1 Computer Science - A.I.",
          img: "/2024_members/Nicholas.png",
          linkedin: "https://www.linkedin.com/in/nicholas-belev-7922a3228/" // update with correct URL
        },
      ],
    },
    {
      name: "Operations",
      members: [
        {
          name: "Maya McGhan",
          position: "Head of Operations",
          field: "U1 Commerce",
          img: "/2024_members/Maya.png", // or any other photo
          linkedin: "https://www.linkedin.com/in/mayamcghan/" // update with correct URL
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>McGill QR | Our Team</title>
        <meta name="description" content="Meet the McGill QR team" />
      </Head>

      <Navbar />
     
      <main className="min-h-screen w-full py-12 px-4 relative pt-[70px]">
        {/* 
          Bubble container that holds the gradient streaks 
          behind the content
        */}
        <div className="bubble-container">
          <div className="gradientBubbleOne"></div>
          <div className="gradientBubbleTwo"></div>
        </div>

        <h1 className="text-center text-5xl font-bold mb-10 uppercase text-white">
          Our Team
        </h1>

        <div className="committees-container">
          {committees.map((committee) => (
            <div key={committee.name} className="committee-block">
              <h2 className="committee-title">{committee.name}</h2>
              <div className="members-grid">
                {committee.members.map((member) => {
                  // Check if this member is an executive => red ring
                  const execClass = isExec(member.position) ? " exec" : "";
                  return (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`member-wrapper${execClass}`}
                    >
                      <img
                        src={member.img}
                        alt={member.name}
                        className="member-image"
                      />
                      <div className="overlay">
                        <div className="overlay-inner">
                          <div className="member-name">{member.name}</div>
                          <div className="member-position">{member.position}</div>
                          <div className="member-field">{member.field}</div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        /* ================== Committees & Members ================== */
        .committees-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          box-sizing: border-box;
        }
        .committee-block {
          margin-bottom: 4rem;
        }
        .committee-title {
          text-transform: uppercase;
          color: #fff;
          font-size: 1.8rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: 1px;
        }
        .members-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }
        .member-wrapper {
          position: relative;
          width: 300px;
          height: 300px;
          cursor: pointer;
          text-decoration: none;
        }
        .member-wrapper::before {
          content: "";
          position: absolute;
          top: 0; 
          left: 0;
          width: 100%;
          height: 100%;
          border: 4px solid #fff;
          border-radius: 50%;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .member-wrapper:hover::before {
          transform: scale(1.1);
        }
        /* Exec members get a red ring */
        .member-wrapper.exec::before {
          border-color: red;
        }
        .member-image {
          position: relative;
          z-index: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        /* Circular overlay that scales up on hover */
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: scale(0.9); 
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 2;
        }
        .member-wrapper:hover .overlay {
          opacity: 1;
          transform: scale(1.1);
        }
        .overlay-inner {
          color: #fff;
          padding: 0.5rem 1rem;
          text-transform: uppercase;
          z-index: 3;
        }
        .member-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          letter-spacing: 0.5px;
        }
        .member-position {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .member-field {
          font-size: 0.9rem;
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .members-grid {
            gap: 1rem;
          }
          .member-wrapper {
            width: 180px;
            height: 180px;
          }
        }
        @media (max-width: 480px) {
          .member-wrapper {
            width: 150px;
            height: 150px;
          }
          .member-name {
            font-size: 1rem;
          }
          .member-position {
            font-size: 0.9rem;
          }
          .member-field {
            font-size: 0.8rem;
          }
        }
        /* ================== Bubbles Container ================== */
        .bubble-container {
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }
        .gradientBubbleOne {
          position: absolute;
          top: 0; 
          right: 0; 
          user-select: none;
          width: 90%;
          height: 60%;
          filter: blur(92px);
          transform: rotate(150deg) translateZ(0);
          border-radius: 10%;
          max-height: 400px;
          background: linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.5) 25%,
            rgba(241, 161, 161, 0.4) 50%,
            rgba(255, 0, 0, 0.15) 75%
          );
        }
        .gradientBubbleTwo {
          position: absolute;
          bottom: 0; 
          left: 0; 
          user-select: none;
          width: 90%;
          height: 80%;
          filter: blur(100px);
          transform: rotate(-30deg) translateZ(0);
          border-radius: 10%;
          max-height: 400px;
          background: linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.5) 25%,
            rgba(255, 167, 167, 0.4) 50%,
            rgba(255, 138, 138, 0.15) 75%
          );
        }
      `}</style>
    </>
  );
}
