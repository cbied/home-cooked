import { useState, useEffect, useRef } from "react";
import DrawerHostList from "../drawer-host-list/drawer-host-list.component";
import FilterModal from "../filter-modal/filter-modal.component";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  map,
  initMap,
  regionCircle,
  updateHostMakers,
  getUserLocationInfo,
} from "../../utils/google-maps/google-maps.utils";
import {
  setLocation,
  setFormattedAddress,
} from "../../store/experience-finder-slice/experience-finder-slice";
import { useDispatch, useSelector } from "react-redux";
import { hostMarkers } from "../../mockData/mockHostMakers";

const Map = ({ screenSize, setAutocompletePlace, autocompletePlace }) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState();
  const selectUserLatLng = useSelector(
    (state) => state.experienceFinder.location
  );
  const hasRun = useRef(false);
  const findUserPositionSuccess = async (position) => {
    const newPoition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    dispatch(setLocation(newPoition));
    if (map) {
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.plus_code && data.plus_code.compound_code) {
            let addressArr = data.plus_code.compound_code.split(" ");
            addressArr.shift();
            const formattedAddress = addressArr.join(" ");
            dispatch(setFormattedAddress(formattedAddress));
            if (regionCircle) {
              regionCircle.setCenter(newPoition);
              updateHostMakers(hostMarkers, newPoition);
            }
          } else {
            const formattedAddress =
              data.results[data.results.length - 2].formatted_address;
            dispatch(setFormattedAddress(formattedAddress));
            if (regionCircle) {
              regionCircle.setCenter(newPoition);
              updateHostMakers(hostMarkers, newPoition);
            }
          }
        });
    }
  };

  const findUserPositionFailed = () => {
    console.log("Unable to retrieve your location.");
  };

  const handleOpen = () => {
    setSize("full");
    setOpen(true);
  };

  const handleOpenFilterOptions = () => {
    setModalSize("md");
    setModalOpen(true);
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed);
      initMap(selectUserLatLng, handleOpen, handleOpenFilterOptions);
      updateHostMakers(hostMarkers, selectUserLatLng);
      hasRun.current = true;
    }
  }, [selectUserLatLng.lat]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div
        id="map"
        className="w-full h-auto"
        style={{
          position: "absolute",
          top: "225px",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <DrawerHostList
          screenSize={screenSize}
          setOpen={setOpen}
          drawerSize={size}
          drawerOpen={open}
          className="pb-10"
          setAutocompletePlace={setAutocompletePlace}
          autocompletePlace={autocompletePlace}
        />
      </div>
      <FilterModal
        handleOpenFilterOptions={handleOpenFilterOptions}
        modalOpen={modalOpen}
        modalSize={modalSize}
      />
    </APIProvider>
  );
};

export default Map;
