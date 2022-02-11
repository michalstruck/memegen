import React from "react";
import logo from "./images/Logo.png";

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="header--image" alt="trollface" />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">React Course - Project 3</h4>
    </header>
  );
};
