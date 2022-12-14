import React from "react";
import Nav from "./nav";
import Graphs from "./graphs";
import About from "./about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./stats";
import PlayerStats from "./playerstats";
import TeamStats from "./teamstats";
import TeamGraph from "./teamgraphs";
import PlayerGraph from "./playergraphs";

// To add more routes, create them under <Routes>

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/graphs" exact element={<Graphs />} />
          <Route path="/graphs/teams" exact element={<TeamGraph />} />
          <Route path="/graphs/players" exact element={<PlayerGraph />} />
          <Route path="/stats" exact element={<Stats />} />
          <Route path="/stats/teams" exact element={<TeamStats />} />
          <Route path="/stats/players" exact element={<PlayerStats />} />
        </Routes>
      </div>
    </Router>
  );
}
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);
export default App;
