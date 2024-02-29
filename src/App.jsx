import { useLayoutEffect, useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import DrawerHostList from './components/drawer-host-list/drawer-host-list.component';
import { APIProvider } from '@vis.gl/react-google-maps';
import { getUserLocationInfo, initMap } from './utils/google-maps/google-maps.utils';
import hostMarkers from './mockData/mockHostMakers.json'
import './App.css';

const App = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);
  const [ geoPosition, setGeoPosition ] = useState({lat: 41.0895249, lng: -73.8419063})
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setSize('full');
    setOpen(true);
  };

  const findUserPositionSuccess = (position) => {
    setGeoPosition({
      lat: position.coords.latitude, 
      lng: position.coords.longitude});
  }

  const findUserPositionFailed = () => {
    console.log("Unable to retrieve your location.");
  }

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    let supportsPassive = false;
    let opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener('resize', updateSize, opts);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    getUserLocationInfo(findUserPositionSuccess, findUserPositionFailed)
    initMap(hostMarkers, geoPosition, handleOpen);
  }, [])
  
  return (
      <div className="h-screen">
        <Navbar size={screenSize} />
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <div id='map' className='h-full w-full'>
            <DrawerHostList 
            screenSize={screenSize} 
            setOpen={setOpen} 
            drawerSize={size}
            drawerOpen={open} />
          </div>
        </APIProvider>        
      </div>
  );
}

export default App;
