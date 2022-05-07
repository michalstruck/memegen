type props = {
  textArr: string[];
  randomImg: string;
};

const MemeImg = ({ textArr, randomImg }: props) => {
  return (
    <div
      id="generatedMeme"
      className="order-3 mt-1 relative flex items-center justify-center"
    >
      {textArr.map((text, i) => {
        return (
          <h2
            key={i}
            style={{ top: i === 0 ? 10 : (i + 0.5) * 20 }}
            className="absolute text-white text-outline text-3xl font-meme uppercase"
          >
            {text}
          </h2>
        );
      })}

      <img alt="meme-img" src={randomImg} className="rounded-sm" />
    </div>
  );
};

export default MemeImg;
