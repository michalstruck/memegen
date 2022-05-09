import { useState, useCallback } from "react";
import { DndProvider, XYCoord, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Text from "./Text";

type props = {
  textArr: string[];
  randomImg: string;
};

const GeneratedMeme = ({ textArr, randomImg }: props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        id="generatedMeme"
        className="order-3 mt-1 relative flex items-center justify-center"
      >
        {textArr.map((text, i) => (
          <Text key={i} text={text} i={i} />
        ))}

        <img
          alt="meme-img"
          src={randomImg}
          className="rounded-sm max-w-2xl min-w-"
        />
      </div>
    </DndProvider>
  );
};

export default GeneratedMeme;
