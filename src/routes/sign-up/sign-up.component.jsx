import React from "react";
import { addNewUser } from '../../utils/firebase.utils';


export default function SignUp() {

    function handleSignupUser(event) {
    event.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value
    const userInfo = {
      email,
      password
    }
    addNewUser(userInfo)
  }

    return ( 
        <div>
            <p>login</p>
        </div>
    );

}