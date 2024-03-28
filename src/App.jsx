import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "./components/navbar/navbar.component";
import Map from "./components/map/map.component";
import "./App.css";

const App = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);
  const selectFormattedAddress = useSelector(
    (state) => state.experienceFinder.formattedAddress
  );
  const [autocompletePlace, setAutocompletePlace] = useState(
    selectFormattedAddress
  );

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
    setAutocompletePlace(selectFormattedAddress);
    return () => window.removeEventListener("resize", updateSize);
  }, [selectFormattedAddress]);

  return (
    <div className="h-screen">
      <Navbar
        size={screenSize}
        setAutocompletePlace={setAutocompletePlace}
        autocompletePlace={autocompletePlace}
      />
      <Map
        screenSize={screenSize}
        setAutocompletePlace={setAutocompletePlace}
        autocompletePlace={autocompletePlace}
      />
    </div>
  );
};

export default App;
