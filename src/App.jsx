import { useLayoutEffect, useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import ExperienceFinder from './components/experience-finder/experience-finder.component';
import DrawerExperienceFinder from './components/drawer-experience-finder/drawer-experience-finder.component';
import HostListContainer from './components/host-list-container/host-list-container.component';
import { APIProvider } from '@vis.gl/react-google-maps';
import { getUserLocationInfo, initMap } from './utils/google-maps/google-maps.utils';
import { Drawer, ButtonToolbar, Button } from 'rsuite';

import hostMarkers from './mockData/mockHostMakers.json'
import './App.css';

const App = () => {
  const [sreenSize, setSreenSize] = useState([0, 0]);
  const [ geoPosition, setGeoPosition ] = useState({lat: 41.0895249, lng: -73.8419063})
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const largeStyles = { 'minWidth': 200 };

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
        setSreenSize([window.innerWidth, window.innerHeight]);
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
        <Navbar size={sreenSize} />

        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <div id='map' className='h-full w-full'>
          <ButtonToolbar>
            <Button size="lg" onClick={() => handleOpen()}>
            Full page
            </Button>
          </ButtonToolbar>
          <Drawer 
          size={size} 
          placement='bottom' 
          open={open} onClose={() => setOpen(false)}
          className='host-list-drawer'
          >
          <Drawer.Header className='host-list-header'>
            <Drawer.Title className='w-4/5 flex justify-center self-center'>
                {sreenSize[0] > 950 ?

                <div className='w-4/5 flex justify-center self-center p-10'>
                    <ExperienceFinder largeStyles={largeStyles} />
                </div>

                : 

                sreenSize[0] <= 950 &&

                <DrawerExperienceFinder size={sreenSize[0]} />


                } 
            </Drawer.Title>
            
            </Drawer.Header>
            <Drawer.Body className='flex flex-col host-list-body'>
            <Drawer.Actions className="flex justify-center items-center host-list">
              <Button 
              onClick={() => setOpen(false)} 
              appearance="primary"
              className=" w-32 h-14 self-center rounded-full">
                Map
              </Button>
            </Drawer.Actions>
            <HostListContainer />
            </Drawer.Body>
          </Drawer>
          </div>
        </APIProvider>
        
      </div>
  );
}

export default App;
