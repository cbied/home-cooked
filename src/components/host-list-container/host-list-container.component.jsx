import { useState, useEffect } from "react";
import HostListItem from "../host-list-item/host-list-item.component";
import { useSelector } from "react-redux";
const HostListContainer = () => {
  const selectUserLatLng = useSelector(
    (state) => state.experienceFinder.location
  );
  const [userLatLng, setUserLatLng] = useState(selectUserLatLng);
  // when user updates their location within the HostListContainer component, update the listed host dinners
  useEffect(() => {
    setUserLatLng(selectUserLatLng);
  }, [selectUserLatLng]);
  return (
    <div className="w-full flex justify-center items-center my-10">
      {userLatLng ? <HostListItem /> : null}
    </div>
  );
};

export default HostListContainer;
