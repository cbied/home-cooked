import ExperienceFinder from '../experience-finder/experience-finder.component';
import DrawerExperienceFinder from '../drawer-experience-finder/drawer-experience-finder.component';
import HostListContainer from '../host-list-container/host-list-container.component';
import { Drawer, Button } from 'rsuite';

const DrawerHostList = ({ screenSize, setOpen, drawerSize, drawerOpen }) => {
const largeStyles = { 'minWidth': 200 };

  return (
    <Drawer 
    size={drawerSize} 
    placement='bottom' 
    open={drawerOpen} onClose={() => setOpen(false)}
    className='host-list-drawer'
    >
    <Drawer.Header className='host-list-header'>

      <Drawer.Title className='w-4/5 flex justify-center self-center'>
        {screenSize[0] > 950 ?

        <div className='w-4/5 flex justify-center self-center p-10'>
            <ExperienceFinder largeStyles={largeStyles} />
        </div>

        : 

        screenSize[0] <= 950 &&

        <DrawerExperienceFinder size={screenSize[0]} />


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
  );
};

export default DrawerHostList;
