import { useState } from 'react';
import {  IconButton, Drawer, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import FoodTypes from '../food-types/food-types.component';
import DatePicker from '../date-range-picker/date-range-picker.component';
import PartySizeInput from '../party-size-input/party-size-input.component';
import DropdownAvatar from "../dropdown-avatar/dropdown-avatar.component";
import logo from '../../assets/logo.png';

const DrawerExperienceFinder = ({ size, showLogo = false, showUserProfile = false }) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const handleOpenDrawer = key => {
            setOpen(true);
            setPlacement(key);
    };
    const smallStyles = { width: '100%'}

  return (
    // JSX code goes here
    <div className='w-full flex justify-around self-center'>
    {
        showLogo &&

        <div className='flex h-28 px-10'>
            <a className='block self-center' href={'/'}>
                <img className='w-16 h-12' src={logo} alt="home cooked logo" />
            </a>
        </div>
    }
        
    <div className='h-28 flex items-center rounded-full grow'>
        <IconButton 
        appearance="default" 
        block
        icon={<SearchIcon style={{'height': '48', 'width': '48'}} />} 
        onClick={() => handleOpenDrawer('top')}
        className='h-12 w-full px-10 rounded-full'>
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

        {
            showUserProfile &&

            <DropdownAvatar />
        }
    </div>
  );
};


export default DrawerExperienceFinder;