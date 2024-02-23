import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import {APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { getUserLocationInfo, buildContent, toggleHighlight } from './utils/google-maps/google-maps.utils';
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

  const buildAdvancedMarker = (host, index) => {
    // AdvancedMarker.addListener("click", () => {
    //   toggleHighlight(AdvancedMarker, host);
    // });
    return (
      <AdvancedMarker
        key={index}
        position={{lat: host.lat, lng: host.lng}}
        title={host.foodType}
        content={host.description}
      />
    )
  
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
              mapId={'4504f8b37365c3d0'}>
              {
                hostMarkers.map((host, index) => {
                  return buildAdvancedMarker(host, index)
                })
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
