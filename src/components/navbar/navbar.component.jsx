import { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUserOut } from '../../store/user-slice/user-slice';
import { Nav, AvatarGroup, Avatar, Dropdown, 
         IconButton, Drawer, Button, Placeholder } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import { signOutUser } from '../../utils/firebase.utils';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const dispatch = useDispatch()
    const selectCurrentUser = useSelector(state => state.user.currentUser);

    const handleSignUserOut = async () => {
        return signOutUser().then(() => {
            dispatch(signUserOut())
        })
    }

    const handleOpenDrawer = key => {
        setOpen(true);
        setPlacement(key);
  };

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

            size[0] > 950 ?
            
            <div className='flex items-center'>
                <Nav className='flex justify-around items-center'>
                    <Nav.Item href={'/'}>Be a Guest</Nav.Item>
                    <Nav.Item href={'/'}>Learn about the experience</Nav.Item>
                    <Nav.Item href={'/'}>Be a Host</Nav.Item>
                </Nav>
            </div>

            :

            size[0] < 950 && size[0] > 700 ?

            <div className='grow h-28 px-10 flex items-center rounded-full'>
                <IconButton 
                appearance="default" 
                block
                icon={<SearchIcon style={{'height': '48', 'width': '48'}} />} 
                onClick={() => handleOpenDrawer('top')} 
                className='h-12 px-10 rounded-full'>
                    Find an experience
                </IconButton>
                <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
                  
                    <Drawer.Body>
                    <Placeholder.Paragraph rows={8} />
                        <Drawer.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)} appearance="primary">
                            Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Body>
                    
                </Drawer>
            </div>

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
                            </span>}>
            
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

        size[0] > 950 ?

        <div className='w-3/5 flex justify-center self-center'>
            <ExperienceFinder />
        </div>

        : 
        
        size[0] < 700 ?

        <div className='grow h-28 px-10 flex items-center rounded-full'>
                <IconButton 
                appearance="default" 
                block
                icon={<SearchIcon style={{'height': '48', 'width': '48'}} />} 
                onClick={() => handleOpenDrawer('top')} 
                className='h-12 px-10 rounded-full'>
                    Find an experience
                </IconButton>
                <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
                  
                    <Drawer.Body>
                    <Placeholder.Paragraph rows={8} />
                        <Drawer.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)} appearance="primary">
                            Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Body>
                    
                </Drawer>
            </div>

            : 

            null

        }
    </nav>
)
}


export default Navbar;