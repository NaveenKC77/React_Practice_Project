import React from "react";
import { Switch, Route } from "react-router-dom";
import { useFetch } from "./useFetch";

import Home from "./Home";
import Movie from "./SingleMovie";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/movies/:id">
        <Movie></Movie>
      </Route>
    </Switch>
  );
}

export default App;
