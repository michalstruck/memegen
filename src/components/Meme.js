import React from "react";
import memesData from "./memesData.js";

export const Meme = () => {
  const randomImage = () => {
    return memesData.data.memes[
      Math.floor(Math.random() * memesData.data.memes.length)
    ].url;
  };
  const [memeImage, setMemeImage] = React.useState(randomImage);
  const getMemeImage = () => {
    setMemeImage(randomImage);
  };
  return (
    <main>
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />
        <input type="text" placeholder="Bottom text" className="form--input" />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <img src={memeImage} alt="meme" className="meme--image" />
    </main>
  );
};
