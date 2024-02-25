import React, { useState } from 'react';
import { Marker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';

const HostMapMarkers = ({ host }) => {
  const [infowindowShown, setInfowindowShown] = useState(false);
  const [currentHostMarker, setCurrentHostMarker] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const showInfoWindow = (uid) => {
      setInfowindowShown(true);
  };

  const hideInfoWindow = (uid) => {
      setInfowindowShown(false);
  };
  
  const closeInfoWindow = () => {
    
  };

  return (
    <div>
      <Marker
        ref={markerRef}
        key={host.uid}
        position={{ lat: host.lat, lng: host.lng }}
        title={host.foodType}
        id={host.uid}
        onMouseOver={() => showInfoWindow(host.uid)}
        onMouseOut={() => hideInfoWindow(host.uid)}
      />
      {infowindowShown && (
        <InfoWindow 
          onCloseClick={closeInfoWindow} 
          anchor={marker || null}
        >
          <div className="flex flex-col text-gray-600">
            <div className="text-lg font-bold">{host.foodType}</div>
            <div className="mt-2">
              <div className="flex items-center">
                <span>{host.description}</span>
              </div>
              <div className="flex items-center mt-1">
                <span>{host.bath}</span>
              </div>
              <div className="flex items-center mt-1">
                <div>Guest spots left: <span className="font-bold">{host.guestSpotsLeft}</span></div>
              </div>
              <div className="flex items-center mt-1">
                <div className="font-bold">${host.price} per person</div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default HostMapMarkers;