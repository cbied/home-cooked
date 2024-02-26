'use strict';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import HostMapMarkers from './components/host-map-markers/host-map-markers.component';
import { APIProvider } from '@vis.gl/react-google-maps';
import { getUserLocationInfo, initMap } from './utils/google-maps/google-maps.utils';
import hostMarkers from './mockData/mockHostMakers.json'
import './App.css';

const App = () => {
  const [ geoPosition, setGeoPosition ] = useState({lat: 41.0895249, lng: -73.8419063})
  const findUserPositionSuccess = (position) => {
    setGeoPosition({
      lat: position.coords.latitude, 
      lng: position.coords.longitude});
      console.log(geoPosition)
  }

  const findUserPositionFailed = () => {
    console.log("Unable to retrieve your location.");
  }

  useEffect(() => {
    getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed)
    initMap(hostMarkers, geoPosition);
  }, [])
  
  return (
      <div className="h-screen">
        <Navbar />
        {
          
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <div id='map' className='h-full w-full'></div>
          </APIProvider>

         
         
        }
        
      </div>
  );
}

export default App;
