import React, { useState, useEffect } from 'react';
import { Marker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { Button } from 'rsuite'
const google = window.google;

const HostMapMarkers = ({ host, map }) => {
  const [infowindowShown, setInfowindowShown] = useState(false);
  const [currentHostMarker, setCurrentHostMarker] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  let infoWindow = new google.maps.InfoWindow();

  const showInfoWindow = (uid) => {
    
      setInfowindowShown(true);
  };

  const keepInfoWindowOpen = (uid) => {
    setCurrentHostMarker(uid)
    setInfowindowShown(prevState => !prevState);
  }

  const hideInfoWindow = (uid) => {
    if(currentHostMarker) {
      setCurrentHostMarker(null)
    } else {
      setInfowindowShown(false);
      
    }
  };
  
  const closeInfoWindow = () => {
    setInfowindowShown(false);
  };


  const createInfoWindow = (host) => {

    return (
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
            <div className='flex justify-end'>
              <Button appearance="primary">Register</Button>
            </div>
          </div>
        </InfoWindow>
    )
  }

  return (
    <div>
      <Marker
        ref={markerRef}
        key={host.uid}
        position={{ lat: host.lat, lng: host.lng }}
        title={host.foodType}
        id={host.uid}
        onClick={() => keepInfoWindowOpen(host.uid)}
        onMouseOver={() => showInfoWindow()}
        onMouseOut={() => hideInfoWindow()}
      />
      {infowindowShown && (
          createInfoWindow(host)
      )}
    </div>
  );
};

export default HostMapMarkers;