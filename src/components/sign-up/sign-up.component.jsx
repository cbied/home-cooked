import React from "react";
import { addNewUser } from '../../utils/firebase.utils';
import { TEInput, TERipple } from "tw-elements-react";
import GoogleIcon from '../../assets/google_icon.png';

export default function SignUp() {

function handleSignupUser(event) {
  event.preventDefault();
  const firstname = event.target[0].value;
  const email = event.target[1].value;
  const password = event.target[2].value;
  const password2 = event.target[3].value;
  
  if(password === password2) {
    const userInfo = {
    firstname,
    email,
    password
    }
    addNewUser(userInfo)
  } else {
    alert('Passwords do not match')
  }

}

    return ( 
        <form 
        onSubmit={handleSignupUser}
        className="flex flex-col items-center mt-10">
        {/* <!-- first name input --> */}
        <TEInput
          type="text"
          label="First name"
          size="lg"
          className="mb-6"
        ></TEInput>

        {/* <!-- Email input --> */}
        <TEInput
          type="email"
          label="Email address"
          size="lg"
          className="mb-6"
        ></TEInput>

        {/* ADD PASSWORD MATCHING */}
        {/* <!--Password input--> */}
        <TEInput
          type="password"
          label="Password"
          className="mb-3"
          size="lg"
        ></TEInput>

        {/* <!--Password input--> */}
        <TEInput
          type="password"
          label="Confirm password"
          className="mb-3"
          size="lg"
        ></TEInput>

        {/* <!-- Submit button --> */}

        <TERipple rippleColor="light" className="w-6/12">
          <button
            
            type="submit"
            className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Sign up
          </button>
        </TERipple>

        {/* <!-- Divider --> */}
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>

        {/* <!-- Social login buttons --> */}
        <TERipple rippleColor="light" className="w-6/12">
          <a
            className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            href="#!"
            role="button"
          >
            {/* <!-- Google --> */}
            <img
            className="w-7 mr-2" 
            src={GoogleIcon} 
            alt="Google signup"/>
            Google Signup
          </a>
        </TERipple>
      </form> 
    );

}