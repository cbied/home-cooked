import { useLayoutEffect, useState } from "react";
import Navbar from "./components/navbar/navbar.component";
import Map from "./components/map/map.component";
import "./App.css";

const App = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    let supportsPassive = false;
    let opts = Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    });
    window.addEventListener("resize", updateSize, opts);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="h-screen">
      <Navbar size={screenSize} />
      <Map screenSize={screenSize} />
    </div>
  );
};

export default App;
