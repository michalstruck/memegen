import { useDrag } from "react-dnd";
import ItemTypes from "../common/DnDConstants";

interface props {
  children: string;
  id: number;
  left: number;
  top: number;
}

const Text = ({ children, id, left, top }: props) => {
  const [, drag] = useDrag(
    {
      type: ItemTypes.MEME_TEXT,
      item: { id, left, top, children },
    },
    [children, left, top]
  );

  return (
    <div
      ref={drag}
      className="absolute cursor-pointer text-white text-outline text-3xl font-meme uppercase"
      style={{ top, left }}
    >
      {children}
    </div>
  );
};
export default Text;
