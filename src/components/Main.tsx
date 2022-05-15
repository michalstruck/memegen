import { useState, ChangeEvent, useCallback } from "react";
import useMemes from "../common/useMemes";
import { toJpeg } from "html-to-image";
import { useDrop, XYCoord } from "react-dnd";
import ItemTypes from "../common/DnDConstants";
import Text from "./Text";
import { DragItem } from "../common/Types";
import update from "immutability-helper";

interface InputText {
  text: string;
  top: number;
  left: number;
}

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

export const Main = () => {
  const { currentMeme, getMemeImage } = useMemes();
  const [inputText, setInputText] = useState<InputText[]>([
    { text: "", top: 30, left: 30 },
    { text: "", top: 45, left: 45 },
  ]);

  const addInput = () => {
    setInputText(() => [
      ...inputText,
      {
        text: "",
        top: (inputText.length + 2) * 15,
        left: (inputText.length + 2) * 15,
      },
    ]);
  };

  const removeInput = () => {
    setInputText(() =>
      inputText.filter((elem, i) => i !== inputText.length - 1)
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputText(
      inputText.map((textObj, i) => {
        console.log();
        return i === +name ? { ...textObj, text: value } : textObj;
      })
    );
  };

  //
  //Drag'n'Drop functionality
  //
  const moveText = (id: string, left: number, top: number, text: string) => {
    setInputText(
      inputText.map((textObj, i) => (+id === i ? { text, top, left } : textObj))
    );
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.MEME_TEXT,
      drop: (item: DragItem, monitor) => {
        const movementOf = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + movementOf.x);
        const top = Math.round(item.top + movementOf.y);
        const { children } = item;
        moveText(item.id, left, top, children);
        return undefined;
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }),
    [inputText]
  );
  //

  return (
    <div
      // style={{ gridTemplateRows: inputText.length > 2 ? 3 : 2 }}
      className="grid grid-cols-1 grid-rows-2 place-items-center"
    >
      <form className="mt-12 grid grid-cols-3">
        {inputText.map((v, i) => (
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
          Get a new meme
        </button>
        <div />

        <button
          className="mr-1 w-full rounded-md drop-shadow-2xl active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={addInput}
        >
          + text area
        </button>
        <button
          className="ml-1 w-full rounded-md drop-shadow-2xl active:mt-2 disabled:mt-0 disabled:opacity-80 disabled: bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white"
          onClick={removeInput}
          disabled={inputText.length === 1}
        >
          - text area
        </button>
      </div>
      <div
        id="generatedMeme"
        className="relative flex items-center justify-center"
      >
        {inputText.map((textObj, i) => (
          <Text key={i} id={i} left={textObj.left} top={textObj.top}>
            {textObj.text}
          </Text>
        ))}
        <img
          ref={drop}
          alt="meme-img"
          src={currentMeme}
          className="rounded-sm max-w-2xl min-w-"
        />
      </div>
    </div>
  );
};
