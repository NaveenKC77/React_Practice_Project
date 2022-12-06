import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=VDRyZM4z0719pEObDDiJ6k5YuU_Xp6Uku7N0YPOGXwo`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageUrl = `&page=${page}`;

  const [query, setQuery] = useState("");
  const queryUrl = `&query=${query}`;
  const [newPage, setNewPage] = useState(false);
  const mounted = useRef(true);

  const fetchPhotos = async () => {
    setLoading(true);
    let url;
    if (query) {
      url = `${searchUrl}${clientID}${pageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientID}${pageUrl}`;
    }
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return [...data.results];
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewPage(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setNewPage(false);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query && page === 1) {
      fetchPhotos();
      return;
    }
    setPage(1);
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (loading) return;
    if (!setNewPage) return;
    setPage((oldPage) => {
      return oldPage + 1;
    });
  }, [newPage]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewPage(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your keywords"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2> Loading</h2>}
      </section>
    </main>
  );
}
export default App;
