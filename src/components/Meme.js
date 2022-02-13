import React from "react";
import memesData from "./memesData.js";

const getMemeImage = () =>
  memesData.data.memes[Math.floor(memesData.data.memes.length * Math.random())]
    .url;

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
