import { Outlet } from 'react-router-dom';
import App from '../App';
import { Navbar } from "../components/navbar/navbar.component";

import './root.css'

const Root = () => {
    return (
    <div className="flex flex-col">
        <Navbar />
        <div id="detail">
        {window.location.pathname === '/' ? 
            <App /> :
            <Outlet />
        }
        </div>
    </div>
    );
}

export default Root;