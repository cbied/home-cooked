import { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "./store/experience-finder-slice/experience-finder-slice";
import {
  map,
  regionCircle,
  updateHostMakers,
} from "./utils/google-maps/google-maps.utils";
import Navbar from "./components/navbar/navbar.component";
import Map from "./components/map/map.component";
import { hostMarkers } from "./mockData/mockHostMakers";
import "./App.css";
/* global google */

const App = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);
  const selectFormattedAddress = useSelector(
    (state) => state.experienceFinder.formattedAddress
  );
  const [autocompletePlace, setAutocompletePlace] = useState(
    selectFormattedAddress
  );
  const dispatch = useDispatch();

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

  const handleCenterChange = () => {
    if (map) {
      let center = map.getCenter();
      let lat = center.lat();
      let lng = center.lng();
      let currentLocation = { lat, lng };
      map.setCenter(currentLocation);
      regionCircle.setCenter(currentLocation);
      updateHostMakers(hostMarkers, currentLocation);
      dispatch(setLocation(currentLocation));
    }
  };

  useEffect(() => {
    setAutocompletePlace(selectFormattedAddress);

    if (map) {
      const dragListener = new google.maps.event.addListener(
        map,
        "dragend",
        handleCenterChange
      );

      return () => {
        google.maps.event.clearInstanceListeners(dragListener);
      };
    }
  }, [selectFormattedAddress, map]);

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
