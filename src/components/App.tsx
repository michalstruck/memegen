import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Header } from "./Header";
import Main from "./Main";

export const App = () => {
  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </>
  );
};
