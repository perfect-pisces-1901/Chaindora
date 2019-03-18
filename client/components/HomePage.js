import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome To Chaindora</h1>
      <p>
        <Link to="/Artist">Artists</Link>
      </p>
      <p>
        <Link to="/SongsList">Listeners</Link>
      </p>
    </div>
  );
}
