import { useState } from 'react';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import DrawerExperienceFinder from '../drawer-experience-finder/drawer-experience-finder.component';
import HostListContainer from '../host-list-container/host-list-container.component';
import FilterHostOptions from '../filter-host-options/filter-host-options.component';
import { Drawer, Button, Modal, ButtonToolbar  } from 'rsuite';
import './drawer-host-list.styles.css';

const DrawerHostList = ({ screenSize, setOpen, drawerSize, drawerOpen }) => {
  const largeStyles = { 'minWidth': 240, 'maxWidth': 250 };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState();
  const handleOpen = () => {
    setModalSize('md');
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  return (
    <Drawer 
    size={drawerSize} 
    placement='bottom' 
    open={drawerOpen} onClose={() => setOpen(false)}
    className='host-list-drawer'
    >
    <Drawer.Header className='host-list-header flex justify-center'>

      <Drawer.Title className='w-screen flex justify-around self-center'>
        {screenSize[0] > 1050 ?

          <ExperienceFinder largeStyles={largeStyles} showUserProfile={true} showLogo={true} />

        : 

        screenSize[0] <= 1050 &&

          <DrawerExperienceFinder size={screenSize[0]} showLogo={true} showUserProfile={true} />
          
        } 
      </Drawer.Title>
      
      </Drawer.Header>
      <Drawer.Body id='host-list' className='flex flex-col host-list-body'>

      <Drawer.Actions className="w-full flex justify-between host-list">
      <div className="ml-60"></div>
        <Button 
        onClick={() => setOpen(false)} 
        appearance="primary"
        className="w-32 h-14 rounded-full mr-60">
          Map
        </Button>
        <Button 
        size="md" 
        onClick={handleOpen}
        appearance="primary"
        className="w-24 h-14 rounded-full">
        Filter
        </Button>
      </Drawer.Actions>
      
      <HostListContainer/>
      <Modal 
          size={modalSize} 
          open={modalOpen} 
          onClose={handleClose}
          aria-labelledby="Filter options" 
          aria-describedby="Fitler options for host dinners">
        <Modal.Body>
          <FilterHostOptions />
        </Modal.Body>
        <Modal.Footer >
        <ButtonToolbar className='flex justify-between'>
          <Button 
          onClick={handleClose} 
          appearance="subtle"
          size="lg">
            Cancel
          </Button>
          <Button 
          onClick={handleClose} 
          appearance="primary" 
          size="lg">
            Filter
          </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>

      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerHostList;
