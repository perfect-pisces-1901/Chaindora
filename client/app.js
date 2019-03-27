import React from "react";

import Routes from "./Routes";
import Navbar from "./components/navbar";
import Logo from "./components/Logo";

const App = () => {
  return (
    <div>
      <Navbar />
      <Logo />
      <Routes />
    </div>
  );
};

export default App;
