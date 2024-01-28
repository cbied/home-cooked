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
import FoodTypes from '../food-types/food-types.component'
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
    
return(
    <nav>
        <div className='flex justify-between w-screen'>
            <div>
                
                <a className='block h-16 pl-15 my-5' href={'/'}>
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

            <div className='flex self-center pr-21 h-16'>
                <TEDropdown className="flex justify-center">
                
                <TERipple rippleColor="light">
                    <TEDropdownToggle className="flex items-center whitespace-nowrap px-5 pt-2 rounded text-xs font-medium uppercase leading-normal text-white ">
                    <span className="ml-2 w-12">
                        <img
                        src={selectCurrentUser && selectCurrentUser.photoURL ? selectCurrentUser.photoURL : "https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
                        className="w-16 rounded-full"
                        alt="Avatar" />
                    </span>
                    </TEDropdownToggle>
                </TERipple>

                <TEDropdownMenu>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Dashboard
                    </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Another action
                    </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                    <a href="/" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        Settings
                    </a>
                    </TEDropdownItem>
                    <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                    <TEDropdownItem >
                    <div  className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                        {selectCurrentUser ?
                            <a href="/" onClick={handleSignUserOut} alt="sign out"
                            className='font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600'>Sign Out</a>
                            : 
                            <a href={"/auth"}>
                            Login
                            </a>
                        }
                    </div>
                    </TEDropdownItem>
                </TEDropdownMenu>
                </TEDropdown>
            </div>
        </div>
        <div className='flex justify-center'>
            <FoodTypes />
            
        </div>

    </nav>
)
}

