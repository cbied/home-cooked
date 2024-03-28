import { useState, useEffect } from "react";
import DrawerHostList from "../drawer-host-list/drawer-host-list.component";
import FilterModal from "../filter-modal/filter-modal.component";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  getUserLocationInfo,
  initMap,
} from "../../utils/google-maps/google-maps.utils";
import { setLocation } from "../../store/experience-finder-slice/experience-finder-slice";
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
  const findUserPositionSuccess = (position) => {
    dispatch(
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
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
    if (selectUserLatLng.lat === null) {
      getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed);
    }
    initMap(hostMarkers, selectUserLatLng, handleOpen, handleOpenFilterOptions);
  }, [selectUserLatLng.lat]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div id="map" className="h-full w-full">
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
