import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { getUserLocationInfo } from './utils/google-maps/google-maps.utils';
import './App.css';

const App = () => {
  const [ geoPosition, setGeoPosition ] = useState(null)

  const findUserPositionSuccess = (position) => {
    setGeoPosition({
      lat: position.coords.latitude, 
      long: position.coords.longitude});
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
        {geoPosition && geoPosition.lat && geoPosition.long ? 
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={{lat: geoPosition.lat, lng: geoPosition.long} }
              defaultZoom={14}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            />
          </APIProvider>
          :
        
         null
        }
        
      </div>
  );
}

export default App;
