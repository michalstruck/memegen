import { useDrag } from "react-dnd";
import ItemTypes from "../common/DnDConstants";

interface props {
  text: string;
  id: number;
  left: number;
  top: number;
}

const Text = ({ text, id, left, top }: props) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MEME_TEXT,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <h2
      ref={drag}
      style={{ top, left }}
      className="absolute text-white text-outline text-3xl font-meme uppercase"
    >
      {text}
    </h2>
  );
};
export default Text;
