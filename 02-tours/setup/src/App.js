import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const removeTour = (tourId) => {
    const newTours = tours.filter((tour) => tour.id !== tourId);
    setTours(newTours);
  };

  const fetchTours = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchTours();
  }, []);
  console.log(tours);

  if (isLoading) {
    return <Loading />;
  }
  if (tours.length <= 0) {
    return (
      <>
        <main>
          <h1>No tours Left</h1>
          <button
            class="btn"
            type="button"
            onClick={() => {
              fetchTours();
            }}
          >
            {" "}
            Refresh{" "}
          </button>
        </main>
      </>
    );
  } else
    return (
      <>
        <main>
          <Tours tours={tours} removeTour={removeTour} />
        </main>
      </>
    );
}
export default App;
