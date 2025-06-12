import React, { useEffect, useState } from "react";
import "./App.css";
import Book from "./Book";
import ParticlesBg from "particles-bg";

export default function App() {
  const postItPositions = [
    { top: "20%", left: "5%" }, // position 0
    { bottom: "5%", left: "5%" }, // position 1
    { bottom: "5%", right: "5%" }, // position 2
    { top: "20%", right: "5%" }, // new position 3
    { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }, // new position 4
  ];
  const postItColors = [
    "#AEDFF7", // light blue
    "#A8E6CF", // light green
    "#FFF59D", // light yellow
    "#FFABAB", // light coral
  ];
  const [showInstruction, setShowInstruction] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [visibleRoles, setVisibleRoles] = useState([]);
  const [visibleAcademics, setVisibleAcademics] = useState([]);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState("home");
  const [canContinue, setCanContinue] = useState(false);

  const hobbyPages = [
    {
      title: "I have a few hobbies! My favorite is Song Writing",
      images: ["/song1.png", "/song2.png"],
      description:
        "I compose melodies and lyrics—here are a couple of my recent pieces.",
    },
    {
      title: "Painting",
      images: ["/painting1.png", "/painting2.png", "/painting3.png"],
      description: "These are some of my oil and watercolor paintings.",
    },
    {
      title: "Filmmaking",
      images: ["/film1.png"],
      description: "I storyboard, shoot, and edit short films.",
    },
    {
      title: "Creative Writing",
      images: [],
      description: "I write flash fiction and poetry.",
    },
  ];
  const biography = [
    {
      title: "I have a few hobbies! My favorite is Song Writing",
      images: ["/song1.png", "/song2.png"],
      description:
        "I compose melodies and lyrics—here are a couple of my recent pieces.",
    },
    {
      title: "Painting",
      images: ["/painting1.png", "/painting2.png", "/painting3.png"],
      description: "These are some of my oil and watercolor paintings.",
    },
    {
      title: "Filmmaking",
      images: ["/film1.png"],
      description: "I storyboard, shoot, and edit short films.",
    },
    {
      title: "Creative Writing",
      images: [],
      description: "I write flash fiction and poetry.",
    },
  ];
  const roles = ["Software   Engineer", "Manager", "Designer", "Researcher"];
  const academics = [
    "I'm currently an undergraduate senior at Stanford University, concentrating in Human-Computer Interaction. I'm also a Master's student in Management Science & Engineering at Stanford, focusing on Tech & Engineering Management.",
    "Suffice to say, I love using my creativity to create new software and pride myself on having an entrepreneurial mindset. Consider me an OPEN BOOK.",
  ];
  const projects = [
    {
      title: "CoLab App",
      description: "A wellbeing app…",
      image: "/colab.png",
    },
    {
      title: "Good Status App",
      description: "An evolved journaling app…",
      image: "/goodstatus.png",
    },
    {
      title: "Voice Feedback Systems",
      description: "An HCI study…",
      image: "/feedback.png",
    },
    {
      title: "NASA ML Model",
      description: "Research using LST…",
      image: "/nasa.png",
    },
    {
      title: "Predictive Policing",
      description: "A critique of NYPD…",
      image: "/policing.png",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Show roles first
      for (let r of roles) {
        if (cancelled) return;
        await new Promise((res) => setTimeout(res, 500));
        setVisibleRoles((v) => [...v, r]);
      }

      // Then show academics
      await new Promise((res) => setTimeout(res, 1000));
      for (let a of academics) {
        if (cancelled) return;
        await new Promise((res) => setTimeout(res, 1000));
        setVisibleAcademics((v) => [...v, a]);
      }

      // Finally show book
      await new Promise((res) => setTimeout(res, 1000));
      setCanContinue(true);
    })();
    setShowIntro(true);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#007acc" num={100} />

      {/* 1) HERO */}
      <section className="hero-section">
        <div className="hero-container">
          <img src="/me.jpg" className="hero-image" alt="me" />
          <h1 className="hero-text">hi, i'm Maimuna</h1>
        </div>
      </section>

      {/* 2) INTRO (bubble + post-its + bio) */}
      {showIntro && (
        <section className="intro-section">
          <div className="intro-content">
            <h1 className="bubble-text">I pride myself on being many things</h1>

            {/* POST-ITS */}
            <div className="post-it-container">
              {visibleRoles.map((role, i) => (
                <div
                  key={i}
                  className="post-it"
                  style={{
                    ...postItPositions[i],
                    backgroundColor: postItColors[i],
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  {role.split("").map((ch, j) => {
                    const fontClass = `font-${Math.floor(Math.random() * 7)}`;
                    const bgClass = `bg-${Math.floor(Math.random() * 7)}`;
                    return (
                      <span
                        key={j}
                        className={`cutout-letter ${fontClass} ${bgClass}`}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BIO SECTION - Now separate from intro */}
      <div className="bio-section">
        {visibleAcademics.map((line, i) => (
          <p key={i} className="bio-line">
            {line}
          </p>
        ))}
      </div>

      {/* 3) BOOK */}
      {canContinue && (
        <div className="book-section">
          {showInstruction && (
            <div className="book-instruction">
              <p>
                Tap through the tabs on the right to look through my projects
                and hobbies.
              </p>
              <button onClick={() => setShowInstruction(false)}>Got it!</button>
            </div>
          )}

          <div className="tab-buttons">
            {["hobbies", "projects", "biography"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="book-body">
            {tab === "hobbies" && (
              <div className="projects-layout">
                <div className="project-left" style={{ overflowY: "auto" }}>
                  {hobbyPages[page].images.map((src, i) => (
                    <img key={i} src={src} className="project-img" alt="" />
                  ))}
                </div>
                <div className="project-right">
                  <h2>{hobbyPages[page].title}</h2>
                  <p>{hobbyPages[page].description}</p>
                  <div className="page-controls">
                    <button
                      onClick={() => setPage((p) => p - 1)}
                      disabled={page === 0}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page === hobbyPages.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}
            {tab === "projects" && (
              <div className="projects-layout">
                <div className="project-left">
                  <h2>{projects[page].title}</h2>
                  <img
                    src={projects[page].image}
                    className="project-img"
                    alt=""
                  />
                  {page > 0 && (
                    <button onClick={() => setPage((p) => p - 1)}>
                      ← Prev
                    </button>
                  )}
                </div>
                <div className="project-right">
                  <p>{projects[page].description}</p>
                  {page < projects.length - 1 && (
                    <button onClick={() => setPage((p) => p + 1)}>
                      Next →
                    </button>
                  )}
                </div>
              </div>
            )}
            {tab === "biography" && (
              <p>
                I'm a senior in college, and I have been very involved on
                Stanford's campus from being in an a capella group to having my
                own radio show for KZSU. I was born and raised in Queens, New
                York and I love going to museums regularly.{" "}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <section className="resume-section">
        <h2 className="section-title">My Resume</h2>
        <div className="resume-container">
          <img
            src="/resume.png"
            alt="Maimuna's Resume"
            className="resume-image"
          />
        </div>
      </section>
      <footer className="site-footer">
        <div className="footer-content">
          <p className="copyright">
            © {new Date().getFullYear()} Maimuna. All rights reserved.
          </p>
          <div className="social-links">
            <a
              href="www.linkedin.com/in/maimuna-muntaha"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MaimunaMuntaha"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.youtube.com/@mussvlogs"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
