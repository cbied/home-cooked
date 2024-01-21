import React from "react";
import Login from "../../components/login/login.component";

export default function Authentication() {

    function toggleLoginSignup () {

    }

    return ( 
        // !!!! Change to grid
    <section className="h-screen flex flex-col items-center md:flex-row ">
        {/* <!-- Left column container with background--> */}
            <div className="hidden mb-12 max-w-md lg:block">
                <img
                className="px-10"
                src="https://svgsilh.com/svg/307076.svg"
                alt="Chef"
                />
            </div>
            {/* <!-- Right column container with Login or Sign up--> */}
            <div className="w-full mb-10">
                <div className="w-full flex justify-around mb-10 pb-3 text-xl ">
                    <button className="w-1/2 inline-block rounded px-7 pb-2.5 pt-3 p-4 text-lg font-medium uppercase leading-normal text-black hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active">
                       Login
                    </button>
                    <button className="w-1/2 inline-block rounded px-7 pb-2.5 pt-3 p-4 text-lg font-medium uppercase leading-normal text-black hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active">
                        Sign Up
                    </button>
                </div>
                <Login />
            </div>
    </section>
    );

}