import { Header } from "./Header";
import { Meme } from "./Meme";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Meme />
    </DndProvider>
  );
};
