import React, { useState } from "react";
import "./Book.css";
import projects from "./projects";

export default function Book() {
  const [pageIndex, setPageIndex] = useState(0);

  const nextPage = () => {
    if (pageIndex < projects.length - 1) setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const project = projects[pageIndex];

  return (
    <div className="book">
      <div className="page left">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {project.source && (
          <a href={project.source} target="_blank" rel="noreferrer">
            View Code
          </a>
        )}
      </div>
      <div className="page right">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="nav-buttons">
        <button onClick={prevPage} disabled={pageIndex === 0}>
          Back
        </button>
        <button onClick={nextPage} disabled={pageIndex === projects.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
