import React, { Fragment } from "react";
import { Button, ButtonGroup, Animation, Grid, Row, Col } from 'rsuite';
import Login from "../../components/login/login.component";
import SignUp from "../../components/sign-up/sign-up.component";
import Navbar from "../../components/navbar/navbar.component";

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
    <Fragment>
      <Navbar />
      <Grid fluid>
      <Row>
      <Col md={24} lg={11}>
      
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
        </Col>
       
  
        {/* <!-- Right column container with Login or Sign up--> */}
      <Col mdHidden lg={12}>
        <div className=" mb-12 max-w-md block">
            <img
            className="px-10"
            src="https://svgsilh.com/svg/307076.svg"
            alt="Chef"
            />
        </div>
        </Col>
        </Row>
        </Grid>
    </Fragment>
    
    );

}