import { useState } from "react";
import { signInUserWithEmail, signInUserWithGoogle } from '../../utils/firebase.utils';
import { useDispatch } from 'react-redux';
import { signInUser } from "../../store/user-slice/user-slice";
import { Input, InputGroup, Grid, Row, Col, Button, ButtonGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import GoogleIcon from '../../assets/google_icon.png';
import './login.component.css';

export default function Login() {
const [visible, setVisible] = useState(false);
const dispatch = useDispatch();
const styles = {
  width: 350
};
const CustomInput = ({ ...props }) => <Input {...props} style={styles} />;

async function handleSignUserIn(event) {
  event.preventDefault();
  let email = event.target[0].value;
  let password = event.target[1].value;

  if(email && password) {
    handleSigninWithEmail(email, password)
  } else {
    handleSignInWithGoogle()
  }
}

function handleSigninWithEmail(email, password) {
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
}

function handleSignInWithGoogle() {
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



const handleChange = () => {
  setVisible(!visible);
};

return ( 
    <form 
    onSubmit={handleSignUserIn}
    >
      <Grid fluid>
      <Row>
      <Col xs={24} sm={12} md={8}>
      {/* <!-- Email input --> */}
      <CustomInput size="lg" placeholder="Email address" type='email' label="email" className="mb-6"/>

      <InputGroup inside style={styles} className="mb-3">
      {/* <!--Password input--> */}
        <Input type={visible ? 'text' : 'password'} label="password" placeholder="Password" size="md" />
        <InputGroup.Button onClick={handleChange}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>

      </InputGroup>
          
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

      <ButtonGroup size="lg" style={styles}> 
        <Button
          color="blue"
          appearance="primary"
          size="lg"
          type="submit"
          className="flex w-full bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
        >
          Sign in
        </Button>
      </ButtonGroup>

      {/* <!-- Divider --> */}
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>

      {/* <!-- Social login buttons --> */}
      <ButtonGroup size="lg" style={styles}>    
      <Button
          color="blue"
          appearance="primary"
          size="lg"
          onClick={handleSignUserIn}
          className="flex w-full rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
          startIcon={
            <img
            className="w-7 mr-2" 
            src={GoogleIcon} 
            alt="Google login"/>
          }
          >
          {/* <!-- Google --> */}
          
          Google Login
        </Button>
        </ButtonGroup>
        
            </Col>
          </Row>
        </Grid>
    </form>      
  );
}