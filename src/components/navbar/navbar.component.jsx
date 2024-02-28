import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'rsuite';
import DropdownAvatar from '../dropdown-avatar/dropdown-avatar.component';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import DrawerExperienceFinder from '../drawer-experience-finder/drawer-experience-finder.component';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

const Navbar = ({ showSearch = true, size = [1000, 1000] }) => {
    const selectCurrentUser = useSelector(state => state.user.currentUser);
    const largeStyles = { 'minWidth': 200 };
    
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
    
return(
    <nav className='flex flex-col h-auto'>
        <div className='flex justify-between w-auto'>
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
        
        size[0] < 700 && showSearch &&

        <DrawerExperienceFinder size={size[0]} />


        }
    </nav>
)
}


export default Navbar;