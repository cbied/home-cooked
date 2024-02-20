import { Outlet } from 'react-router-dom';
import App from '../App';

import './root.css'

const Root = () => {
    return (
    <div className="flex flex-col h-full overflow-hidden">
        {window.location.pathname === '/' ? 
            <App /> :
            <Outlet />
        }
    </div>
    );
}

export default Root;