import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { APIResTypes, MemeTypes } from "../common/Types";
import { toJpeg } from "html-to-image";
import MemeImg from "./MemeImg";

const downloadMeme = () => {
  toJpeg(document.getElementById("generatedMeme")!, { quality: 1 }).then(
    (dataUrl) => {
      const link = document.createElement("a");
      link.download = `my_meme`;
      link.href = dataUrl;
      link.click();
    }
  );
};

export const Meme = () => {
  const [allMemes, setAllMemes] = useState<MemeTypes[]>([]);
  const fetchMemes = useCallback(async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json: APIResTypes = await res.json();
    setAllMemes(json.data.memes);
  }, []);
  useEffect(() => void fetchMemes(), [fetchMemes]);

  const [meme, setMeme] = useState({
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [inputFields, setInputFields] = useState<string[]>(["", ""]);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes?.length);
    const { url } = allMemes[randomNumber];
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const addInput = () => {
    setInputFields(() => [...inputFields, ""]);
  };

  const removeInput = () => {
    setInputFields(() =>
      inputFields.filter((elem, i) => i != inputFields.length - 1)
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields(
      inputFields.map((text, i) => (i === +name ? (text = value) : text))
    );
  };

  return (
    <div
      // style={{ gridTemplateRows: inputFields.length > 2 ? 3 : 2 }}
      className="grid grid-cols-1 grid-rows-2 place-items-center"
    >
      <form className="mt-12 grid grid-cols-3">
        {inputFields.map((v, i) => (
          <input
            key={i}
            onChange={handleChange}
            name={i.toString()}
            type="text"
            placeholder="Enter text"
            className="mx-8 my-1 py-1 rounded-md focus:ring-0 focus:border-gray-500"
          />
        ))}
      </form>
      <div className="grid grid-cols-8 place-items-center">
        <button
          className="col-span-2 w-full rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={downloadMeme}
        >
          Download meme
        </button>
        <div />
        <button
          className="col-span-2 w-full rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={getMemeImage}
        >
          Get a new meme image
        </button>
        <div />

        <button
          className="mr-1 w-full rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={addInput}
        >
          + text area
        </button>
        <button
          className="ml-1 w-full rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={removeInput}
          disabled={inputFields.length === 1}
        >
          - text area
        </button>
      </div>

      <MemeImg textArr={inputFields} randomImg={meme.randomImage} />
    </div>
  );
};
