import React from "react";

export const Meme = () => {
  const [allMemes, setAllMemes] = React.useState([]);

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const { url } = allMemes[randomNumber];
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, [allMemes]);

  // const randomImg = () => {
  //   return allMemes.data.memes[
  //     Math.floor(Math.random() * memesData.data.memes.length)
  //   ].url;
  // };
  // const getMemeImage = () => {
  //   setMeme((prevMeme) => ({
  //     ...prevMeme,
  //     randomImage: { randomImg() },
  //   }));
  // };

  function handleChange(event) {
    const { name, value } = event.target;
    return setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          onChange={handleChange}
          name="topText"
          type="text"
          placeholder="Top text"
          className="form--input"
        />
        <input
          onChange={handleChange}
          name="bottomText"
          type="text"
          placeholder="Bottom text"
          className="form--input"
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};
