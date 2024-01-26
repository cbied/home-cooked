import React from "react";
import { signInUserWithEmail, signInUserWithGoogle } from '../../utils/firebase.utils';
import { useDispatch } from 'react-redux';
import { signInUser } from "../../store/user-slice/user-slice";
import { TEInput, TERipple } from "tw-elements-react";
import GoogleIcon from '../../assets/google_icon.png';
import './login.component.css';

export default function Login() {
const dispatch = useDispatch();

async function handleSignUserIn(event) {
  event.preventDefault();
  const email = event.target[0]?.value
  const password = event.target[1]?.value
  if(email && password) {
    signInUserWithEmail(email, password).then(user => {
      const { displayName, email, phoneNumber, photoURL, uid } = user
      const currentUser = {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid
      }
      dispatch(signInUser(currentUser))
    })
  } else {
    signInUserWithGoogle().then(user => {
      const { displayName, email, phoneNumber, photoURL, uid } = user
      const currentUser = {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid
      }
      dispatch(signInUser(currentUser))
    })
  }
}

return ( 
    <form 
    onSubmit={handleSignUserIn}
    className="flex flex-col items-center mt-10">
      {/* <!-- Email input --> */}
      <TEInput
        type="email"
        label="Email address"
        size="lg"
        className="mb-6"
      ></TEInput>

      {/* <!--Password input--> */}
      <TEInput
        type="password"
        label="Password"
        className="mb-3"
        size="lg"
      ></TEInput>

      {/* <!-- Remember me checkbox --> */}
      <div className="mb-6 flex items-center justify-end">

        {/* <!-- Forgot password link --> */}
        <a
          href="#!"
          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
        >
          Forgot password?
        </a>
      </div>

      {/* <!-- Submit button --> */}

      <TERipple rippleColor="light" className="w-6/12">
        <button
          
          type="submit"
          className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Sign in
        </button>
      </TERipple>

      {/* <!-- Divider --> */}
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>

      {/* <!-- Social login buttons --> */}
      <TERipple 
      onClick={handleSignUserIn}
      rippleColor="light" className="w-6/12">
        <button
          className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
        >
          {/* <!-- Google --> */}
          <img
          className="w-7 mr-2" 
          src={GoogleIcon} 
          alt="Google login"/>
          Google Login
        </button>
      </TERipple>
    </form>      
  );
}