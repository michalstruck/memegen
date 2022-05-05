import logo from "./images/logo.jpg";

export const Header = () => {
  return (
    <header className="flex items-center h-16 text-white p-5 bg-gradient-to-tl from-fuchsia-900 via-fuchsia-70 to-fuchsia-700 ">
      <img src={logo} className="h-full" alt="trollface" />
      <h2 className="text-2xl mr-auto">Meme Generator</h2>
    </header>
  );
};
