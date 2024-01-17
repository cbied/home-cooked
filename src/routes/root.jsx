import { Fragment, useState } from "react";
import { Outlet } from 'react-router-dom';
import App from '../App';
import logo from '../assets/logo.png'
import './root.css'

const Root = () => {
const [ toggleNav, setToggleNav ] = useState(false) 

const handleToggleNav = () => {
    setToggleNav(!toggleNav);
    console.log(toggleNav)
}

return (
<Fragment>
    <div id="sidebar" className={toggleNav ? "animate" : "animate left"}>
    <div className="nav-logo-name">
        <img src={logo} alt="food logo" className="nav-logo" />
        <h3>Home Cooked</h3>
        <div className="menu cross menu--1" >
            <label>
            <input type="checkbox" onClick={() => handleToggleNav()}/>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" />
                <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
                <path className="line--2" d="M0 50h70" />
                <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
            </label>
        </div>
    </div>
    <nav className="navbar">
        <ul>
        <li>
            <a href={`/`}>Home</a>
        </li>
        <li>
            <a href={`/signup`}>Sign up</a>
        </li>
        <li>
            <a href={`/login`}>Login</a>
        </li>
        </ul>
        <div className={!toggleNav ? "name-container name-in" : "name-container name-out" }>
        <span>H</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
        <br/>
        <span>C</span>
        <span>O</span>
        <span>O</span>
        <span>K</span>
        <span>E</span>
        <span>D</span>
        </div>
    </nav>
    </div>
    <div id="detail">
    {window.location.pathname === '/' ? 
        <App /> :
        <Outlet />
    }
    </div>
</Fragment>
);
}

export default Root;