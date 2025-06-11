import { useEffect, useRef, useState } from "react";
import "./App.css"; // Add styles separately

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [visibleRoles, setVisibleRoles] = useState([]);
  const [visibleAcademics, setVisibleAcademics] = useState([]);
  const [bookMode, setBookMode] = useState(false);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState("home");
  const [canContinue, setCanContinue] = useState(false);

  const roles = [
    "a Software Engineer",
    "a Software Manager",
    "a Software Designer",
    "a Software Marketer",
    "an Analytics Researcher",
    "a filmmaker",
  ];
  const academics = [
    "I'm currently an undergraduate senior at Stanford University, concentrating in Human-Computer Interaction.",
    "I'm also a Master's student in Management Science & Engineering at Stanford, focusing on Tech & Engineering Management.",
  ];
  const projects = [
    {
      title: "CoLab App",
      description:
        "A wellbeing app using React.js, SQL, and Supabase for AI-guided journaling and friend-based check-ins.",
      image: "/colab.png",
    },
    {
      title: "Good Status App",
      description:
        "An evolved journaling app using Gemini AI to suggest wellbeing actions based on emotional input.",
      image: "/goodstatus.png",
    },
    {
      title: "Voice Feedback Systems",
      description:
        "An HCI study optimizing voice transcription with live and post-record feedback techniques.",
      image: "/feedback.png",
    },
    {
      title: "NASA ML Model",
      description:
        "Research using LST and ML segmentation to predict thermal imagery from environmental data.",
      image: "/nasa.png",
    },
    {
      title: "Predictive Policing",
      description:
        "A critique of NYPD predictive policing using Bayesian stats and NYC demographic data.",
      image: "/policing.png",
    },
  ];

  useEffect(() => {
    let isCancelled = false;

    const revealText = async () => {
      for (let i = 0; i < roles.length; i++) {
        if (isCancelled) return;
        await new Promise((res) => setTimeout(res, 1000));
        setVisibleRoles((prev) => [...prev, roles[i]]);
      }
      for (let i = 0; i < academics.length; i++) {
        if (isCancelled) return;
        await new Promise((res) => setTimeout(res, 1000));
        setVisibleAcademics((prev) => [...prev, academics[i]]);
      }
      await new Promise((res) => setTimeout(res, 1000));
      setCanContinue(true); // Now the Next button shows
    };

    setShowIntro(true);
    revealText();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (bookMode) {
    return (
      <div className="book-animation">
        <div className="book-wrapper projects-layout">
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

          <div className="book-header">
            <h1 className="cover-title">Maimuna’s Portfolio</h1>
            <button className="home-button" onClick={() => setBookMode(false)}>
              ← Home
            </button>
          </div>

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
            {tab === "projects" ? (
              <>
                <div className="project-left">
                  <h2>{projects[page].title}</h2>
                  <img
                    src={projects[page].image}
                    alt={projects[page].title}
                    className="project-img"
                  />
                  {page > 0 && (
                    <button
                      className="page-btn left"
                      onClick={() => setPage(page - 1)}
                    >
                      ← Prev
                    </button>
                  )}
                </div>
                <div className="project-right">
                  <p>{projects[page].description}</p>
                  {page < projects.length - 1 && (
                    <button
                      className="page-btn right"
                      onClick={() => setPage(page + 1)}
                    >
                      Next →
                    </button>
                  )}
                </div>
              </>
            ) : tab === "biography" ? (
              <div className="book-body-full">
                {academics.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ) : (
              <div className="book-body-full">
                <p>Welcome to the story of me. Use the tabs to explore!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero-container">
          <img src="/me.jpg" className="hero-image" alt="me" />
          <h1 className="hero-text">hi, i'm Maimuna</h1>
        </div>

        {showIntro && (
          <h1 className="bubble-text fade-in-text">
            {" "}
            I pride myself in being many things:
          </h1>
        )}

        {visibleRoles.map((role, i) => (
          <p key={i} className="cutout-container">
            {role.split("").map((char, idx) => {
              const fontClass = `font-${Math.floor(Math.random() * 7)}`;
              const bgClass = `bg-${Math.floor(Math.random() * 7)}`;
              return (
                <span
                  key={idx}
                  className={`cutout-letter ${fontClass} ${bgClass}`}
                >
                  {char}
                </span>
              );
            })}
          </p>
        ))}

        {visibleAcademics.map((line, i) => (
          <p key={i} className="bio-line">
            {line}
          </p>
        ))}

        <p className="bio-line">
          Suffice to say, I love using my creativity to create new software and
          pride myself on having an entrepreneurial mindset. Consider me an{" "}
          <strong>OPEN BOOK</strong>.
        </p>

        {canContinue && (
          <button
            className="next-button"
            style={{ fontFamily: "'Luckiest Guy', cursive" }}
            onClick={() => setBookMode(true)}
          >
            Next →
          </button>
        )}
      </header>
    </div>
  );
}
