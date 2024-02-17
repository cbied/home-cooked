import { useState } from 'react';
import {  IconButton, Drawer, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import FoodTypes from '../food-types/food-types.component';
import DatePicker from '../date-range-picker/date-range-picker.component';
import PartySizeInput from '../party-size-input/party-size-input.component';

const DrawerExperienceFinder = ({ size }) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const handleOpenDrawer = key => {
            setOpen(true);
            setPlacement(key);
    };
    const smallStyles = { width: '100%'}

  return (
    // JSX code goes here
    <div className='grow h-28 px-10 flex items-center rounded-full'>
                <IconButton 
                appearance="default" 
                block
                icon={<SearchIcon style={{'height': '48', 'width': '48'}} />} 
                onClick={() => handleOpenDrawer('top')}
                className='h-12 px-10 rounded-full'>
                    Find an experience
                </IconButton>
                <Drawer placement={placement} open={open} onClose={() => setOpen(false)} size={size < 700 ? 'full' : 'lg'}>
                <Drawer.Body>
                {
                    size < 700 ?

                    <div className={'flex flex-col items-center h-fit mt-14'}>
                        <DatePicker placement={'bottomStart'} showOneCalendar={true} className='mt-14'/>
                        <div className={'flex flex-col items-center justify-around h-96 mb-10'}>
                            <FoodTypes isInline={true} smallStyles={smallStyles}/>    
                            <PartySizeInput />
                        </div>
                    </div>

                    :

                    <div className='flex justify-around mt-14'>
                        <FoodTypes isInline={true} smallStyles={smallStyles}/>    
                        <div className={'flex flex-col self-stretch justify-around mb-10'}>
                            <DatePicker placement={'bottomStart'} showOneCalendar={true} />
                            <PartySizeInput />
                        </div>
                    </div>
                }
                    
                        <Drawer.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)} appearance="primary">
                            Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Body>
                    
                </Drawer>
            </div>
  );
};


export default DrawerExperienceFinder;