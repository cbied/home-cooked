import React from "react";
import { Button, ButtonGroup, Animation } from 'rsuite';
import Login from "../../components/login/login.component";
import SignUp from "../../components/sign-up/sign-up.component";

export default function Authentication() {
    const [showSignup, setShowSignup] = React.useState(true);
    const [showLogin, setShowLogin] = React.useState(false);
  
    const onChange = () => {
      setShowSignup(!showSignup)
      setShowLogin(!showLogin)
    };


    const CustomButtonGroup = ({ appearance }) => (
        <ButtonGroup style={{ marginTop: 12 }} justified>
            <Button appearance={appearance} onClick={() => onChange()} active={showSignup}>Sign Up</Button>
            <Button appearance={appearance} onClick={() => onChange()} active={showLogin}>Login</Button>
        </ButtonGroup>
      );

      const SignupAnimation = React.forwardRef((props, ref) => (
        <div
          {...props}
          ref={ref}
        >
            <SignUp /> :
        </div>
      ));

      const LoginAnimation = React.forwardRef((props, ref) => (
        <div
          {...props}
          ref={ref}
        >
            <Login />
        </div>
      ));
      


    return ( 
        // !!!! Change to grid
    <section className="h-screen flex flex-col justify-center md:flex-row ">
        {/* <!-- Left column container with background--> */}
        <div className="w-half mb-10">
            <div className="w-full flex justify-around mb-10 pb-3 text-xl ">
            <CustomButtonGroup />
            </div>
            <Animation.Collapse in={showSignup}>
                {(props, ref) => <SignupAnimation {...props} ref={ref} />}
            </Animation.Collapse>
            <Animation.Collapse in={showLogin}>
                {(props, ref) => <LoginAnimation {...props} ref={ref} />}
            </Animation.Collapse>
            
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