import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUserOut } from '../../store/user-slice/user-slice';
import { Nav } from 'rsuite';
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";
import { signOutUser } from '../../utils/firebase.utils';
import logo from '../../assets/logo.png'
import './navbar.styles.css';

export const Navbar = () => {
    const [ toggleNav, setToggleNav ] = useState(false);
    const dispatch = useDispatch()
    const selectCurrentUser = useSelector(state => state.user.currentUser);

    const handleToggleNav = () => {
        setToggleNav(!toggleNav);

        setTimeout(() => {
            if(toggleNav) {
                window.document.getElementById('navbar').className += ' hide'
            }
        }, 900)
    }

    async function handleSignUserOut() {
        return signOutUser().then(() => {
            dispatch(signUserOut())
        })
      
    }

    useEffect(() => {
    const hasHide = window.document.getElementById('navbar').classList.contains('hide');
    if(!hasHide) {
        window.document.getElementById('navbar').className += ' hide'
        }
    }, [])
    
return(
    <nav>
        <div className='flex justify-between w-screen'>
            <div>
                <div className="menu cross menu--1 hamburger">
                    <label className='h-20'>
                    <input type="checkbox" autoComplete="off"/>
                    <svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg" onClick={handleToggleNav}>
                        <circle cx="50" cy="50" r="30" />
                        <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
                        <path className="line--2" d="M0 50h70" />
                        <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
                    </svg>
                    </label>
                </div>
                <div className='hidden md:block h-16 pl-15'>
                    <img className='w-16 h-12' src={logo} alt="home cooked logo" />
                </div>
            </div>

            <div className='hidden md:flex md:items-center'>
                <Nav className='flex justify-around items-center'>
                    <Nav.Item href={'/'}>Home</Nav.Item>
                    <Nav.Item href={'/auth'}>Login/Sign up</Nav.Item>
                    <Nav.Item>Solutions</Nav.Item>
                    <Nav.Item>Products</Nav.Item>
                    <Nav.Item>About</Nav.Item>
                </Nav>
            </div>

            <div className='flex self-center pr-21 h-16'>
                <TEDropdown className="flex justify-center">
                
                {
                selectCurrentUser ? 
                <TERipple rippleColor="light">
                    <TEDropdownToggle className="flex items-center whitespace-nowrap px-5 pt-2 rounded text-xs font-medium uppercase leading-normal text-white ">
                    <span className="ml-2 w-12">
                        <img
                        src={selectCurrentUser.photoURL ? selectCurrentUser.photoURL : "https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
                        className="w-16 rounded-full"
                        alt="Avatar" />
                    </span>
                    </TEDropdownToggle>
                </TERipple>
                :
                <div></div>
                }

                <TEDropdownMenu>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Action
                    </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Another action
                    </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Something else here
                    </a>
                    </TEDropdownItem>
                    <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                    <TEDropdownItem onClick={handleSignUserOut}>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Sign out
                    </a>
                    </TEDropdownItem>
                </TEDropdownMenu>
                </TEDropdown>
            </div>
        </div>

        <Nav id="navbar" className={toggleNav ? 'down' : 'up'}>
            <Nav.Item href={'/'}>Home</Nav.Item>
            <Nav.Item href={'/auth'}>Login/Sign up</Nav.Item>
            <Nav.Item>Solutions</Nav.Item>
            <Nav.Item>Products</Nav.Item>
            <Nav.Item>About</Nav.Item>
        </Nav>

    </nav>
)
}

