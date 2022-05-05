import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { APIResTypes, MemeTypes } from "../common/Types";

export const Meme = () => {
  const [allMemes, setAllMemes] = useState<MemeTypes[]>([]);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [text, setText] = useState<string[]>([]);

  const fetchMemes = useCallback(async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json: APIResTypes = await res.json();
    setAllMemes(json.data.memes);
  }, []);

  useEffect(() => void fetchMemes(), [fetchMemes]);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes?.length);
    const { url } = allMemes[randomNumber];
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    return setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  return (
    <div className="grid gap-4 grid-cols-1 grid-rows-2 place-items-center">
      <form className="order-1 pt-6">
        <input
          onChange={handleChange}
          name="topText"
          type="text"
          placeholder="Top text"
          className="m-2 py-1 rounded-md focus:ring-0 focus:border-gray-500"
        />
        <input
          onChange={handleChange}
          name="bottomText"
          type="text"
          placeholder="Bottom text"
          className="m-2 py-1 rounded-md focus:ring-0 focus:border-gray-500"
        />
      </form>
      <button
        className="order-2 rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
        onClick={() => {
          getMemeImage();
        }}
      >
        Get a new meme image
      </button>

      <div
        id="generatedMeme"
        className="order-2 relative flex items-center justify-center"
      >
        <h2 className="absolute top-3 text-white text-outline text-3xl font-meme uppercase">
          {meme.topText}
        </h2>
        <img alt="meme-img" src={meme.randomImage} className="rounded-sm" />
        <h2 className="absolute bottom-3 text-3xl text-white text-outline font-meme uppercase">
          {meme.bottomText}
        </h2>
      </div>
    </div>
  );
};

/*     <div className="order-3 h-6/12 w-6/12 grid place-items-center grid-cols-1 grid-rows-12">
<img
  alt="meme-img"
  src={meme.randomImage}
  className="row-span-10 order-2"
/>
<h2 className="order-1 relative top-full text-white uppercase">
  {meme.topText}
</h2>
<h2 className="order-3 relative bottom-full text-white uppercase">
  {meme.bottomText}
</h2>
</div> */
