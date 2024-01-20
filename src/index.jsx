import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import reportWebVitals from './reportWebVitals';
import Root from './routes/root';
import App from './App'
import SignUp from './routes/sign-up/sign-up.component';
import Login from './routes/login/login.component';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='*' element={<Root />}>
      <Route path='home' element={<App />}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='login' element={<Login />}/>
    </Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();