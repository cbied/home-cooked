import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUserOut } from '../../store/user-slice/user-slice';
import { Nav, AvatarGroup, Avatar, Dropdown } from 'rsuite';
import ExperienceFinder from '../experience-finder/experience-finder.component';
import { signOutUser } from '../../utils/firebase.utils';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

export const Navbar = () => {
    const dispatch = useDispatch()
    const selectCurrentUser = useSelector(state => state.user.currentUser);

    async function handleSignUserOut() {
        return signOutUser().then(() => {
            dispatch(signUserOut())
        })
    }

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
    <nav>
        <div className='flex justify-between w-screen'>
            <div>
                
                <a className='block h-16 pl-15 my-5 px-10' href={'/'}>
                    <img className='w-16 h-12' src={logo} alt="home cooked logo" />
                </a>
            </div>

            <div className='hidden md:flex md:items-center'>
                <Nav className='flex justify-around items-center'>
                    <Nav.Item href={'/'}>Be a Guest</Nav.Item>
                    <Nav.Item href={'/'}>Learn about the experience</Nav.Item>
                    <Nav.Item href={'/'}>Be a Host</Nav.Item>
                </Nav>
            </div>

            <div className='flex self-center h-16 px-10'>
            <Dropdown placement='bottomEnd' noCaret={true} title={<span className="mr-3">
                                <AvatarGroup spacing={6}>
                                    <Avatar
                                    size="lg"
                                    circle
                                    src={selectCurrentUser && selectCurrentUser.photoURL ? selectCurrentUser.photoURL : "https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
                                    alt="Avatar"
                                    />
                                </AvatarGroup>
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
                <Dropdown.Separator />
                <Dropdown.Item>Your profile</Dropdown.Item>
                <Dropdown.Item>Your dinners</Dropdown.Item>
                <Dropdown.Item>Your friends</Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item>Help</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>{selectCurrentUser ?
                    <a href="/" onClick={handleSignUserOut} alt="sign out">
                    Sign Out
                    </a>
                    : 
                    <a href={"/auth"}>
                    Login
                    </a>
                }</Dropdown.Item>
            </Dropdown>


               
            </div>
        </div>
        <ExperienceFinder />

    </nav>
)
}

