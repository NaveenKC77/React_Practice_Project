import React from "react";
import { REMOVE_STORY } from "./actions";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { stories, isLoading, removeItem } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories-center">
      {stories.map((story) => {
        console.log(story);
        const {
          objectID,
          title,
          points,
          author,
          url: link,
          num_comments: comments,
        } = story;

        return (
          <div key={objectID} className="story">
            <h3>{title}</h3>
            <p>
              {points} points by {author} | {comments} comments
            </p>
            <a href="" target="_blank">
              <button className="btn">Read More</button>
            </a>
            <button
              className="btn btn-danger"
              onClick={() => removeItem(objectID)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Stories;
