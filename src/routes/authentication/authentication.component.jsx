import React, { useState } from "react";
import Login from "../../components/login/login.component";
import SignUp from "../../components/sign-up/sign-up.component";

export default function Authentication() {
    const [ toggleShowComponent, setToggleShowComponent ] = useState('login');  

    function toggleLoginSignup(componentString) {
        if(componentString === "login") {
            setToggleShowComponent("login")
        } else if (componentString === "signup") {
            setToggleShowComponent("signup")
        } else {
            return
        }
        
    }

    return ( 
        // !!!! Change to grid
    <section className="h-screen flex flex-col items-center md:flex-row ">
        {/* <!-- Left column container with background--> */}
        <div className="w-full mb-10">
            <div className="w-full flex justify-around mb-10 pb-3 text-xl ">
                <button 
                onClick={() => toggleLoginSignup('login')}
                className="w-1/2 inline-block rounded px-7 pb-2.5 pt-3 p-4 text-lg font-medium uppercase leading-normal 
                text-black hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-500 ease-in-out 
                hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    Login
                </button>
                <button
                onClick={() => toggleLoginSignup('signup')}
                className="w-1/2 inline-block rounded px-7 pb-2.5 pt-3 p-4 text-lg font-medium uppercase leading-normal 
                text-black hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-500 ease-in-out 
                hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    Sign Up
                </button>
            </div>
            {
            toggleShowComponent === 'login' ?
            <Login /> :
            toggleShowComponent === 'signup' ?
            <SignUp /> :
            false
            }
        </div>
        {/* <!-- Right column container with Login or Sign up--> */}
        <div className="hidden mb-12 max-w-md lg:block">
            <img
            className="px-10"
            src="https://svgsilh.com/svg/307076.svg"
            alt="Chef"
            />
        </div>
    </section>
    );

}