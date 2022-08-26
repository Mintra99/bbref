import React from "react";
import Nav from "./nav";
import Shop from "./shop";
import About from "./about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./stats";

// To add more routes, create them under <Routes>

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/stats" exact element={<Stats />} />
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
