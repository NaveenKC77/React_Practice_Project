import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import data from "./data.js";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    // const resp = await fetch(url);
    // const data = await resp.json();
    const newJobs = data;
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  });

  if (loading) {
    return (
      <>
        <h1 className="loading">Loading...</h1>
      </>
    );
  }
  const { company, dates, duties, title } = jobs[value];
  return (
    <main>
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>

      <section className="jobs-center">
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={index}
                className={`job-btn  ${item.index == value && "active-btn"}`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        <article className="job-info">
          <div>
            <h3> {title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
          </div>

          <div>
            {duties.map((duty, index) => {
              return (
                <>
                  <div key={index} className="job-desc">
                    <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                    <p className="duty">{duty}</p>
                  </div>
                </>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
