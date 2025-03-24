import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface ProjectDetails {
  title: string;
  website: string;
  linkedin: string;
  description: string[];
}

interface Project {
  shortTitle: string;
  image: string; // image in /public/
  dateRange: string;
  details: ProjectDetails;
}

interface Sector {
  sector: string;
  projects: Project[];
}

const ProjectsPage: React.FC = () => {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const sectors: Sector[] = [
    {
      sector: "Algorithmic Trading Projects",
      projects: [
        {
          shortTitle: "Volatility Vision",
          image: "mlstocks.png",
          dateRange: "Second Place, McHacks - National Bank",
          details: {
            title: "Volatility Vision: Machine Learning Stock Correlation Dashboard",
            website: "https://devpost.com/software/volatility-vision",
            linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7294477816505466880/",
            description: [
              "Developed a React-based interactive dashboard for visualizing stock correlations.",
              "Implemented a Recurrent Neural Network (RNN) using PyTorch for high-accuracy price prediction.",
              "Designed a momentum-based pairs trading algorithm leveraging Pearson correlation analysis.",
            ]
          }
        }
      ]
    },
    {
      sector: "Data Science Projects",
      projects: [
        {
          shortTitle: "Coming Soon",
          image: "coming_soon.png",
          dateRange: "Coming Soon",
          details: {
            title: "Data Science Project [Coming Soon]",
            website: "#",
            linkedin: "#",
            description: [
              "Details for this project will be added soon.",
              "Stay tuned for more exciting projects in the field of Data Science."
            ]
          }
        }
      ]
    },
    {
      sector: "Risk Management Projects",
      projects: [
        {
          shortTitle: "Coming Soon",
          image: "coming_soon.png",
          dateRange: "Coming Soon",
          details: {
            title: "Risk Management Project [Coming Soon]",
            website: "#",
            linkedin: "#",
            description: [
              "Details for this project will be added soon.",
              "Stay tuned for more exciting projects in the field of Risk Management."
            ]
          }
        }
      ]
    }
  ];

  const handleCardClick = (proj: Project) => {
    setSelectedProj(proj);
    setTimeout(() => setShowDrawer(true), 0);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProj(null);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = showDrawer ? "hidden" : "auto";
  }, [showDrawer]);

  return (
    <>
      <Head>
        <title>McGill QR | Our Projects</title>
        <meta name="description" content="Explore our Quant Projects" />
      </Head>

      {/* Top-level wrapper with overflow-x-hidden to prevent horizontal scroll */}
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Black background layer */}
        <div className="absolute inset-0 bg-black z-[-2]" />
        {/* Gradient bubble layers */}
        <div className="absolute inset-0 z-[-1]">
          <div className="gradientBubbleTwo" />
          <div className="gradientBubbleThree" />
        </div>

        <div className="relative">
          <Navbar />
          <main className="text-white p-4 pt-[70px]">
            <h1 className="text-center text-5xl font-bold mb-10 uppercase text-white/80">
              Our Projects
            </h1>

            {sectors.map((sectorItem, sectorIndex) => (
              <section key={sectorIndex} className="mb-16">
                <h2 className="text-3xl font-semibold mb-6 text-center uppercase text-white/80">
                  {sectorItem.sector}
                </h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                  {sectorItem.projects.map((proj, projIndex) => (
                    <div
                      key={projIndex}
                      // Use w-full on small screens, w-96 above sm
                      className="project-card w-full sm:w-96 bg-black border border-white rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 text-center"
                      onClick={() => handleCardClick(proj)}
                    >
                      <img
                        src={proj.image}
                        alt={proj.shortTitle}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-bold uppercase text-white/80">
                          {proj.shortTitle}
                        </h3>
                        <p className="text-sm text-gray-400 uppercase">
                          {proj.dateRange}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {(selectedProj || showDrawer) && (
              <div
                className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${
                  showDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={handleCloseDrawer}
              >
                <div
                  className="bg-black border border-white rounded-lg max-w-3xl w-full p-6 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-3xl text-white hover:text-gray-400"
                    onClick={handleCloseDrawer}
                  >
                    &times;
                  </button>
                  {selectedProj && (
                    <>
                      <h3 className="text-2xl font-bold mb-4 uppercase text-white/80">
                        {selectedProj.details.title}
                      </h3>
                      <div className="mb-4">
                        {selectedProj.details.description.map((line, idx) => (
                          <p key={idx} className="mb-2">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <a
                            href={selectedProj.details.linkedin}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
                          >
                            <FontAwesomeIcon icon={faLinkedin} height={20} color="white" />
                          </a>
                          <a
                            href={selectedProj.details.website}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500 transition"
                          >
                            <FontAwesomeIcon icon={faGlobe} height={20} color="white" />
                          </a>
                        </div>
                        <div className="text-sm text-gray-400 uppercase">
                          {selectedProj.dateRange}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>

      <style jsx>{`
        .gradientBubbleTwo {
          position: absolute;
          bottom: 600px;
          left: 150px;
          user-select: none;
          width: 90%;
          height: 100%;
          filter: blur(100px);
          transform: rotate(-160deg) translateZ(0);
          border-radius: 10%;
          max-height: 400px;
          background: linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.5) 25%,
            rgba(255, 167, 167, 0.4) 50%,
            rgba(255, 138, 138, 0.15) 75%
          );
        }
        .gradientBubbleThree {
          position: absolute;
          bottom: 1300px;
          left: 150px;
          user-select: none;
          width: 50%;
          height: 60%;
          filter: blur(100px);
          transform: rotate(-230deg) translateZ(0);
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
};

export default ProjectsPage;
