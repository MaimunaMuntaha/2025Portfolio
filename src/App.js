import React, { useEffect, useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";

export default function App() {
  const root = process.env.PUBLIC_URL;

  const postItPositions = [
    { top: "20%", left: "5%" },
    { bottom: "5%", left: "5%" },
    { bottom: "5%", right: "5%" },
    { top: "20%", right: "5%" },
    { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  ];
  const postItColors = ["#AEDFF7", "#A8E6CF", "#FFF59D", "#FFABAB"];

  const [showInstruction, setShowInstruction] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [visibleRoles, setVisibleRoles] = useState([]);
  const [visibleAcademics, setVisibleAcademics] = useState([]);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState("projects");
  const [canContinue, setCanContinue] = useState(false);

  const hobbyPages = [
    {
      title: "Filmmaking",
      images: ["/video.png"],
      description: (
        <>
          <p>
            I have vlogged my entire life, mainly for myself and for the
            enjoyment of my friends. Here's a vlog of my last week as a
            sophomore at Stanford:
          </p>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/bPIsqNQ04Wc?si=SPON_Mh087U-0HAg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ),
    },
    {
      title: "Painting",
      images: ["/painting1.png", "/painting2.png", "/painting3.png"],
      description:
        "I've been painting for as long as I can remember. Here are a few of the paintings I have completed.",
    },
    {
      title: "Creative Writing",
      images: ["/writing.png"],
      description:
        "I studied abroad at Oxford University for Winter (Hilary) term in 2025 and I did my tutorial in Creative Writing. I wrote different types of stories like science fiction and memoirs.",
    },
  ];

  const projects = [
    {
      title: "CoLab App",
      description: (
        <>
          <p>
            We developed Co-Lab, a project-matching platform for the Stanford
            community. The need we address is coordination opacity: on mailing
            lists, Fizz, or Slack, students cannot easily see who is both
            available and interested in the same niche idea; as a result,
            collaborations form slowly or not at all.
          </p>
          <p>
            Co-Lab solves this by asking every Stanford-verified user (SSO gate)
            to pick exactly three interest tags at sign-up. That small signal
            powers: a personalised, scrollable feed ranked by tag overlap and
            post freshness, a live search bar that filters by title or tag
            without leaving the feed, and a one-tap project composer that posts
            immediately and appears in every relevant feed via real-time
            Firestore listeners.
          </p>
          <p>
            <a
              href="https://docs.google.com/document/d/1eUh4dupSBPem_IHob-TmjJpwT7SyMwYNfNYKqOo1KVM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the doc
            </a>
          </p>
        </>
      ),

      image: "/colab.png",
    },
    {
      title: "Last Dive (Game)",
      description: (
        <>
          <p>
            An eccentric cast, an out-of-touch tech executive, submarine
            vacation turned deadly; Last Dive is an escape-room-in-a-box type
            game where players solve puzzles in order to get out of a submarine
            that has been hijacked by its billionaire owner.
          </p>
          <p>
            For Last Dive, we wanted to create an escape room experience that
            would smoothly integrate our React and Tyepscript-based digital
            interface into the game flow and leverage both the physical and
            digital sections in order to improve upon the challenge posed by the
            puzzles and the immersion into the atmosphere and storyline of the
            game. The website could take on the work of managing environmental
            conditions, such as the puzzle answers, time limit, and hints,
            allowing the players to dedicate more of their attention and time to
            the gameplay without having to account for a game master-type role.
          </p>
          <p>
            <a
              href="https://mechanicsofmagic.com/2025/06/07/p2-last-dive-group-21/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check out the game blog!
            </a>
          </p>
        </>
      ),

      image: "/lastdive.png",
    },
    {
      title: "Good Status App",
      description: (
        <>
          <p>
            I used React.js and SQL to code a wellbeing app with a Login And
            Create Account Screen. With Stack Navigation, users then login and
            with the auth, are redirected to Feed where they can access their
            own "Status Updates" or their friends' "Status Updates". Then, in
            the Future tab, users will write down how they are feeling. Using
            the Gemini API, an AI generated response will appear alongside a
            wellbeing task for the user to implement. The last tab is a Profile
            Tab where Users can search for other users' usernames and add them
            as friends so that those friends' statuses appear on the main Feed
            page. To code the backend database for the App, I used Supabase and
            multiple SQL queries and RLS policies.
          </p>

          <a
            href="https://github.com/MaimunaMuntaha/GoodStatus.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Github Code
          </a>
        </>
      ),

      image: "/goodstatus.png",
    },
    {
      title: "Voice Feedback Systems",
      description: (
        <>
          <p>
            I worked on a HCI study with two other Stanford Students
            investigating the impact of user involvement in error detection and
            correction on transcription accuracy and user satisfaction. We
            developed and evaluated three variations of a voice dictation system
            with Python:
          </p>
          <p>
            <b>Control:</b> Users receive only audio playback of the
            transcription at the end of the speaking section.
          </p>
          <p>
            <b>Variation 1:</b> Live transcription with immediate feedback on
            proper noun spellings while the user is still speaking.
          </p>
          <p>
            <b>Variation 2:</b> This variation provides feedback after the user
            completes their recording where the system first plays back the full
            transcription. Afterward, it plays back a proper noun check with all
            the proper nouns detected, followed by the spelling of each proper
            noun. This variation also provides the user with an opportunity to
            fix any errors, by saying the corrections they want to make.
          </p>
          <p>
            These findings reveal that post-transcription feedback (Variation 2)
            significantly improved transcription accuracy, achieving a
            near-perfect proper noun error rate of 0.9%, and was preferred by
            users for its structured correction process. By contrast, live
            transcription feedback (Variation 1) demonstrated some benefits but
            was less effective due to the interruptions it introduced. Our
            findings will contribute to the development of more accessible and
            adaptive technologies, bridging gaps in communication and enhancing
            usability for individuals with diverse needs, including those in
            screenless or hands-free environments.
          </p>
          <a
            href="https://github.com/matthewjguck/audio.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Github Code
          </a>
        </>
      ),
      image: "/feedback.png",
    },
    {
      title: "NASA ML Model",
      description: (
        <>
          <p>
            Although I cannot share the website or code, as it is in development
            and private government information, I can provide my project poster.
            As part of the CCRI Team, me and my team analyzed the relationship
            between air temperature and land surface temperature (LST) on a
            variety of scales. At the largest scale, air temperatures from
            Automated Surface Observing Systems (ASOS) and the New York Urban
            Hydro-meteorological Testbed (UHMT) were compared with four-daily
            LST measurements from NASA’s Moderate Resolution Imaging
            Spectroradiometer (MODIS) for 8 stations around New York City and
            227 stations globally. The main result is that LST is
            disproportionately warmer than air temperature whenever the ambient
            air temperatures are warmer, such as during the day, in the summer,
            at urban locations, and at lower latitudes, and at more humid
            locations. On the smallest scale, over one hundred students have
            collected air temperature and LST measurements through field
            campaigns during class periods at Baruch College Campus High School
            throughout the year and NSF’s Implementing Novel Solutions for
            Promoting Cultural Change in Geoscience Research and Education
            program in the summer of 2023 and 2024. Teaching high school
            students about research while engaging environmental justice
            organizations, like WE ACT for Environmental Justice, is an
            unprecedented opportunity for the next generation of scholars.
            Thermal images gathered by students have been used with machine
            learning and segmentation to predict a thermal image given a visual
            image. The segmentation (e.g., separating pavement vs. grass) has
            greatly improved the performance of the model and thermal patterns
            in the predictions have been reasonably accurate. This
            interdisciplinary opportunity to connect students with NASA
            researchers provides unprecedented exposure to current climate
            change research.
          </p>
        </>
      ),
      image: "/nasa.png",
    },
    {
      title: "Predictive Policing",
      description: (
        <>
          <p>
            In Python, I used prior NYPD statistics to recreate a different
            version of the predictive policing model created for the NYPD by
            HunchLab. For reference, the Brennan Center filed a Freedom of
            Information Law (“FOIL”) request for information about the New York
            Police Department’s (NYPD) purchase of predictive policing software
            on June 14, 2016, made by Azavea. This FOIL complaint was made in
            fear of what harmful bias may be used in the data that the NYPD uses
            for its future activity and patrolling. According to the Brennan
            Center for Justice, Azavea wanted specific NYPD data for
            implementing its predictive policing software. This included basic
            crime information such as, “crime type, location, and date, as well
            as extensive environmental information, including the locations of
            schools, hospitals, subway entrances, mental health facilities,
            methadone clinics, pawn shops, liquor licenses, restaurants, and
            laundry facilities” (Brennan Center for Justice). I used Bayesian
            concepts to find these posterior probabilities given certain user
            inputs. I researched NYPD and NYC Demographic Reports to collect the
            statistics I needed. Then I cross-referenced data and wrote a
            program with this data that takes in the user's "given" information
            and outputs the probability that a crime occurs given the
            neighborhood and other demographics a crime occurs in and compares
            different crimes and their respective probabilities in various
            boroughs. By mapping this data, I showed the biases AI models can
            inherit from historical crime data which lead to discriminatory
            policing practices. I observed how certain areas (particularly more
            socioeconomically disadvantaged areas) are more likely to be
            targeted by predictive policing algorithms.
          </p>
          <a
            href="https://docs.google.com/document/d/14siQDmsjhZkG6QzkFAdnJHYDLw2Ak-LJxtBof_Qxu3g/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the doc
          </a>
        </>
      ),
      image: "/policing.png",
    },
  ];

  const roles = [
    "Software    Engineer",
    "Manager",
    "Analyst",
    "Researcher",
    "Designer",
  ];
  const academics = [
    "I'm currently an undergrad senior at Stanford University, concentrating in Human Computer Interaction. I'm also a Master's student in Management Science & Engineering at Stanford.",
    "I love using creativity to build new software and pride myself on having an entrepreneurial mindset. Consider me an OPEN BOOK.",
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // roll in roles
      for (let r of roles) {
        if (cancelled) return;
        await new Promise((res) => setTimeout(res, 500));
        setVisibleRoles((v) => [...v, r]);
      }
      // then academics
      await new Promise((res) => setTimeout(res, 1000));
      for (let a of academics) {
        if (cancelled) return;
        await new Promise((res) => setTimeout(res, 1000));
        setVisibleAcademics((v) => [...v, a]);
      }
      // finally unlock the book
      await new Promise((res) => setTimeout(res, 1000));
      setCanContinue(true);
    })();
    setShowIntro(true);
    return () => {
      cancelled = true;
    };
  }, []);

  // pick the right data array
  const pages =
    tab === "hobbies"
      ? hobbyPages
      : tab === "projects"
      ? projects.map((p) => ({
          title: p.title,
          images: [p.image],
          description: p.description,
        }))
      : []; // biography handled separately

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#007acc" num={100} />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-container">
          <img src={`${root}/me.jpg`} className="hero-image" alt="Maimuna" />
          <h1 className="hero-text">hi, i'm Maimuna</h1>
        </div>
      </section>

      {/* INTRO + POST-ITS */}
      {showIntro && (
        <section className="intro-section">
          <div className="intro-content">
            <h1 className="bubble-text">
              THIS IS MY OLD PORTFOLIO. ACCESS MY NEW ONE:
              https://maimunamuntahaportfolio.netlify.app/
            </h1>
            <h1 className="bubble-text">I pride myself on being many things</h1>
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
                  {role.split("").map((ch, j) => (
                    <span
                      key={j}
                      className={`cutout-letter font-${Math.floor(
                        Math.random() * 7
                      )} bg-${Math.floor(Math.random() * 7)}`}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BIO LINES (below the post-its) */}
      <div className="bio-section">
        {visibleAcademics.map((line, i) => (
          <p key={i} className="bio-line">
            {line}
          </p>
        ))}
      </div>

      {/* BOOK + TABS */}
      {canContinue && (
        <div className="book-section">
          {showInstruction && (
            <div className="book-instruction">
              <p>
                Tap through the tabs on the right to explore my projects and
                hobbies.
              </p>
              <button onClick={() => setShowInstruction(false)}>Got it!</button>
            </div>
          )}

          <div className="tab-buttons">
            {["projects", "hobbies", "biography"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => {
                  setTab(t);
                  setPage(0);
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="book-body">
            {tab !== "biography" ? (
              <div className="double-page">
                <div className="left-page">
                  {pages[page].images[0] && (
                    <img
                      src={`${root}${pages[page].images[0]}`}
                      alt={pages[page].title}
                      className="page-image"
                    />
                  )}
                </div>
                <div className="right-page">
                  <h2 className="page-title">{pages[page].title}</h2>
                  <div className="page-desc">{pages[page].description}</div>
                  <div className="page-controls">
                    <button
                      onClick={() => setPage((p) => p - 1)}
                      disabled={page === 0}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page === pages.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // single-page bio split
              <div className="double-page">
                <div className="left-page">
                  <img
                    src={`${root}/me.jpg`}
                    alt="Maimuna"
                    className="page-image"
                  />
                </div>
                <div className="right-page">
                  {visibleAcademics.map((line, i) => (
                    <p key={i} className="page-desc">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESUME */}
      <section className="resume-section">
        <h2 className="section-title">My Resume</h2>
        <div className="resume-container">
          <img
            src={`${root}/resume.png`}
            alt="Maimuna's Resume"
            className="resume-image"
          />
        </div>
        <a href="/resume.png" className="download-button" download>
          Download Resume
        </a>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p className="copyright">
          © {new Date().getFullYear()} Maimuna Muntaha. All rights reserved.
        </p>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/maimuna-muntaha"
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
      </footer>
    </div>
  );
}
