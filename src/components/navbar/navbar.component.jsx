import { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUserOut } from '../../store/user-slice/user-slice';
import { Nav, AvatarGroup, Avatar, Dropdown } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import DrawerExperienceFinder from '../drawer-experience-finder/drawer-experience-finder.component';
import { signOutUser } from '../../utils/firebase.utils';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

const Navbar = ({ showSearch = true }) => {
    const dispatch = useDispatch()
    const selectCurrentUser = useSelector(state => state.user.currentUser);
    const largeStyles = { 'min-width': 200 };
    

    const handleSignUserOut = async () => {
        return signOutUser().then(() => {
            dispatch(signUserOut())
        })
    }

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

    const [size, setSize] = useState([0, 0]);
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
            <div className='flex h-28 px-10' id='avatarDropdown'>
            <Dropdown placement='bottomEnd' noCaret={true}  
            className='self-center'
            title={
                    <span>
                    {
                        selectCurrentUser && selectCurrentUser.photoURL ?
                        <AvatarGroup>
                            <Avatar
                            id='userAvatar'
                            size="lg"
                            circle
                            src={selectCurrentUser.photoURL}
                            alt="Avatar"
                            />
                        </AvatarGroup>
                        :
                        <AvatarGroup>
                            <AvatarIcon style={{ fontSize: 60 }}/>
                        </AvatarGroup>
                    }
                    </span>
                }>
            
                <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                {
                selectCurrentUser ?
                    <div>
                        <p>Signed in as</p>
                        <strong>{selectCurrentUser.displayName}</strong>
                    </div>
                    :
                    null
                }
                </Dropdown.Item>
                {
                    selectCurrentUser ? 
                    <div>
                    <Dropdown.Separator />
                    <a
                    className="links"
                    href="/userProfile" 
                    alt="User Profile page">
                        <Dropdown.Item>
                        Your profile
                        </Dropdown.Item>
                    </a>
                    <Dropdown.Item>Your dinners</Dropdown.Item>
                    <Dropdown.Item>Your friends</Dropdown.Item>
                    </div>
                    :
                    null
                }
                
                <Dropdown.Separator />
                <Dropdown.Item>Help</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                {selectCurrentUser ?
                    <a 
                    href="/" 
                    onClick={handleSignUserOut} 
                    alt="Sign out"
                    className="links">
                        <Dropdown.Item>
                        Sign Out
                        </Dropdown.Item>
                    </a>
                        : 
                    <a
                    className='links' 
                    href={"/auth"}
                    alt="Login in page">
                        <Dropdown.Item>
                        Login
                        </Dropdown.Item>
                    </a>
                }
            </Dropdown>


               
            </div>
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