import { useCallback, useEffect, useState } from "react";
import { MemeTypes, APIResTypes } from "./Types";

const useMemes = () => {
  const [allMemes, setAllMemes] = useState<MemeTypes[]>([]);
  const fetchMemes = useCallback(async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json: APIResTypes = await res.json();
    setAllMemes(json.data.memes);
  }, []);
  useEffect(() => void fetchMemes(), [fetchMemes]);

  const [currentMeme, setCurrentMeme] = useState(
    "http://i.imgflip.com/1bij.jpg"
  );

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes?.length);
    const { url } = allMemes[randomNumber];
    setCurrentMeme(url);
  };

  return { allMemes, getMemeImage, currentMeme };
};

export default useMemes;
