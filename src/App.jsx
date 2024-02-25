import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import HostMapMarkers from './components/host-map-markers/host-map-markers.component';
import {APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { getUserLocationInfo } from './utils/google-maps/google-maps.utils';
import hostMarkers from './mockData/mockHostMakers.json'
import './App.css';

const App = () => {
  const [ geoPosition, setGeoPosition ] = useState(null)

  const findUserPositionSuccess = (position) => {
    setGeoPosition({
      lat: position.coords.latitude, 
      long: position.coords.longitude});
      console.log(geoPosition)
  }

  const findUserPositionFailed = () => {
    console.log("Unable to retrieve your location.");
  }


  useEffect(() => {
    getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed)
  }, [])
  
  return (
      <div className="h-screen">
        <Navbar />
        {
          geoPosition && geoPosition.lat && geoPosition.long ? 
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={{lat: geoPosition.lat, lng: geoPosition.long} }
              defaultZoom={14}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={'4504f8b37365c3d0'}
              >
              {
                hostMarkers.map((host) => (
                  <HostMapMarkers key={host.uid} host={host} />
                ))
              }
            </Map>
          </APIProvider>

          :
        
         null
         
        }
        
      </div>
  );
}

export default App;
