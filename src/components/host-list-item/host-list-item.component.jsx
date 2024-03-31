import { Panel, Stack, ButtonGroup, Button } from "rsuite";
import { check, meter } from "../../utils/google-maps/google-maps.utils";
import { useSelector } from "react-redux";
import { updateHostMakers } from "../../utils/google-maps/google-maps.utils";

import { useState, useEffect } from "react";
import { hostMarkers } from "../../mockData/mockHostMakers";

const HostListItem = () => {
  const selectUserLatLng = useSelector(
    (state) => state.experienceFinder.location
  );
  const [userLatLng, setUserLatLng] = useState(selectUserLatLng);
  // when user updates their location within the HostListContainer component, update the listed host dinners
  useEffect(() => {
    updateHostMakers(hostMarkers, selectUserLatLng);
    setUserLatLng(selectUserLatLng);
  }, [selectUserLatLng]);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {hostMarkers.map((host) => {
        const markerPosition = { lat: host.lat, lng: host.lng };
        if (check(markerPosition, userLatLng, meter)) {
          return (
            <Panel
              key={host.uid}
              className="w-full md:w-3/4 my-5 md:px-5"
              bordered
              header={
                <Stack className="w-full flex justify-between">
                  <div>
                    <h3>
                      {host.foodType} - {host.hostDisplayName}
                    </h3>
                    <h5>Guest spots left: {host.guestSpotsLeft}</h5>
                  </div>
                  <ButtonGroup>
                    <Button appearance="primary">Register</Button>
                  </ButtonGroup>
                </Stack>
              }
            >
              <div className="flex">
                <img
                  className="w-24 h-24 mr-8 rounded-full"
                  src={host.image}
                  alt={host.foodType}
                />
                <p>{host.description}</p>
              </div>
            </Panel>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default HostListItem;
