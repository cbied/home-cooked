import { useLayoutEffect, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'rsuite';
import DropdownAvatar from '../dropdown-avatar/dropdown-avatar.component';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import DrawerExperienceFinder from '../drawer-experience-finder/drawer-experience-finder.component';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

const Navbar = ({ showSearch = true }) => {
    const [size, setSize] = useState([0, 0]);
    const selectCurrentUser = useSelector(state => state.user.currentUser);
    const largeStyles = { 'min-width': 200 };
    
    useEffect(() => {
        const userAvatar = document.getElementById('userAvatar')
        if(selectCurrentUser && selectCurrentUser.photoURL) {
            userAvatar.src = selectCurrentUser.photoURL
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
        }
    }, [selectCurrentUser])

    
    useLayoutEffect(() => {
        function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
return(
    <nav className='flex flex-col h-28'>
        <div className='flex justify-between w-screen'>
            <div className='flex h-28 px-10'>
                <a className='block self-center' href={'/'}>
                    <img className='w-16 h-12' src={logo} alt="home cooked logo" />
                </a>
            </div>
            {

            size[0] > 950 && showSearch  ?
            
            <div className='flex items-center'>
                <Nav className='flex justify-around items-center'>
                    <Nav.Item href={'/'}>Be a Guest</Nav.Item>
                    <Nav.Item href={'/'}>Learn about the experience</Nav.Item>
                    <Nav.Item href={'/'}>Be a Host</Nav.Item>
                </Nav>
            </div>

            :

            size[0] < 950 && size[0] > 700 && showSearch ?

            <DrawerExperienceFinder />

            :

            null

            }

            <DropdownAvatar selectCurrentUser={selectCurrentUser} />
            
        </div>
        {

        size[0] > 950 && showSearch ?

        <div className='w-4/5 flex justify-center self-center'>
            <ExperienceFinder largeStyles={largeStyles} />
        </div>

        : 
        
        size[0] < 700 && showSearch ?

        <DrawerExperienceFinder size={size[0]} />

            : 

            null

        }
    </nav>
)
}


export default Navbar;