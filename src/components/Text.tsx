interface props {
  text: string;
  i: number;
}

const Text = ({ text, i }: props) => {
  return (
    <h2
      key={i}
      style={{ top: i === 0 ? 10 : (i + 0.5) * 20 }}
      className="absolute text-white text-outline text-3xl font-meme uppercase"
    >
      {text}
    </h2>
  );
};
export default Text;
