import { useState, useEffect } from "react";
import DrawerHostList from "../drawer-host-list/drawer-host-list.component";
import FilterModal from "../filter-modal/filter-modal.component";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  getUserLocationInfo,
  initMap,
} from "../../utils/google-maps/google-maps.utils";
import { hostMarkers } from "../../mockData/mockHostMakers";

const Map = ({ screenSize }) => {
  const [geoPosition, setGeoPosition] = useState({
    lat: -41.288,
    lng: 174.788,
  });
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState();

  const findUserPositionSuccess = (position) => {
    setGeoPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
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
    getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed);
    initMap(hostMarkers, geoPosition, handleOpen, handleOpenFilterOptions);
  }, []);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div id="map" className="h-full w-full">
        <DrawerHostList
          screenSize={screenSize}
          setOpen={setOpen}
          drawerSize={size}
          drawerOpen={open}
          className="pb-10"
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
