import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div id="home-div">
        <h1 id="home">Welcome To Chaindora</h1>
      </div>
      <div id="users">
        <p id="artist">
          <Link to="/upload">Artists</Link>
        </p>
        <p id="listener">
          <Link to="/songs">Listeners</Link>
        </p>
      </div>
    </div>
  );
}
