import React from "react";
import memesData from "./memesData.js";

const getMemeImage = () => {
  const { url } = memesData.data.memes[Math.floor(10 * Math.random())];
  return console.log(url);
};

export const Meme = () => {
  return (
    <main>
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />
        <input type="text" placeholder="Bottom text" className="form--input" />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
    </main>
  );
};
