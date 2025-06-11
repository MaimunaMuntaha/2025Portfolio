import React, { useEffect } from "react";
import "./WebIntro.css";

export default function WebIntro({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="web-intro">
      <h1 className="name">Maimuna Muntaha</h1>
      <div className="web">
        <p>Software Engineer</p>
        <p>Software Manager</p>
        <p>Software Designer</p>
        <p>Software Marketer</p>
        <p>Analytics Researcher</p>
        <p>Filmmaker</p>
        <p>
          Stanford undergrad senior in HCI + Master's in Management Science &
          Engineering
        </p>
        <p>
          I love using creativity to build software with an entrepreneurial
          mindset. I'm an OPEN BOOK.
        </p>
      </div>
    </div>
  );
}
