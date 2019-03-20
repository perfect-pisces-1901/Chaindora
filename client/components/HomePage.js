import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1 id="Home">Welcome To Chaindora</h1>
      <div id="Users">
        <p id="artist">
          <Link to="/Artist">Artists</Link>
        </p>
        <p id="listener">
          <Link to="/SongsList">Listeners</Link>
        </p>
      </div>
    </div>
  );
}
