import { useState, ChangeEvent, useCallback, memo } from "react";
import useMemes from "../common/useMemes";
import { toJpeg } from "html-to-image";
import { useDrop, XYCoord } from "react-dnd";
import ItemTypes from "../common/DnDConstants";
import Text from "./Text";
import { DragItem } from "../common/Types";

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

const Main = () => {
  const { currentMeme, getMemeImage } = useMemes();
  const [inputText, setInputText] = useState<InputText[]>([
    { text: "", top: 30, left: 30 },
    { text: "", top: 45, left: 45 },
  ]);

  const addInput = useCallback(() => {
    setInputText(() => [
      ...inputText,
      {
        text: "",
        top: (inputText.length + 2) * 15,
        left: (inputText.length + 2) * 15,
      },
    ]);
  }, [inputText]);

  const removeInput = useCallback(() => {
    setInputText(() =>
      inputText.filter((elem, i) => i !== inputText.length - 1)
    );
  }, [inputText]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInputText(
        inputText.map((textObj, i) => {
          console.log();
          return i === +name ? { ...textObj, text: value } : textObj;
        })
      );
    },
    [inputText]
  );

  //
  //Drag'n'Drop functionality
  //
  const moveText = useCallback(
    (id: string, left: number, top: number, text: string) => {
      setInputText(
        inputText.map((textObj, i) =>
          +id === i ? { text, top, left } : textObj
        )
      );
    },
    [inputText]
  );

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
  const gridRows = () => {
    let length;
    if (inputText.length === 1) {
      length = "repeat(1, minmax(0, 1fr))";
    } else if (inputText.length === 2) {
      length = "repeat(2, minmax(0, 1fr))";
    } else {
      length = "repeat(3, minmax(0, 1fr))";
    }
    return length;
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2 place-items-center">
      <form
        className="mt-12 grid"
        style={{
          gridTemplateColumns: gridRows(),
        }}
      >
        {inputText.map((v, i) => (
          <input
            key={i}
            onChange={handleChange}
            name={i.toString()}
            type="text"
            placeholder="Enter text"
            className="mx-8 my-1 py-1 drop-shadow-md rounded-md focus:ring-0 focus:border-gray-500"
          />
        ))}
      </form>
      <div className="grid grid-cols-8 place-items-center">
        <button
          className="col-span-2 transition-all duration-75 w-full rounded-md drop-shadow-lg active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white hover:drop-shadow-2xl"
          onClick={downloadMeme}
        >
          Download meme
        </button>
        <div />
        <button
          className="col-span-2 transition-all duration-75 w-full rounded-md drop-shadow-lg active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white hover:drop-shadow-2xl"
          onClick={getMemeImage}
        >
          Get a new meme
        </button>
        <div />

        <button
          className="mr-1 transition-all duration-75 w-full rounded-md drop-shadow-lg active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white hover:drop-shadow-2xl"
          onClick={addInput}
        >
          + text area
        </button>
        <button
          className="ml-1 transition-all duration-75 w-full rounded-md drop-shadow-lg active:mt-2 bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer p-2 text-white 
          disabled:mt-0 disabled:opacity-80 hover:drop-shadow-2xl hover:disabled:drop-shadow-lg hover:disabled:bg-fuchsia-700"
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
          className="rounded-sm max-w-2xl min-w- "
        />
      </div>
    </div>
  );
};
export default memo(Main);
