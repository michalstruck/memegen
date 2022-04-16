import logo from "./images/logo.jpg";

export const Header = () => {
  return (
    <header className="flex items-center h-16 text-white p-5 bg-fuchsia-800">
      <img src={logo} className="h-full" alt="trollface" />
      <h2 className="text-2xl mr-auto">Meme Generator</h2>
      <h4 className="text-xl">React Course - Project 3</h4>
    </header>
  );
};
