import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInUserWithEmailStart, signInUserWithGoogleStart } from "../../store/user-slice/user-slice";
import { Form, InputGroup, Button, ButtonGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import GoogleIcon from '../../assets/google_icon.png';

export default function Login() {
  const selectUserSlice = useSelector(state => state.user)
  const [visible, setVisible] = useState(false);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = {
    width: 350
  };

  const handleSignUserIn = (signinType) => {
    const { email, password } = formValue 
    if (!formRef.current.check()) {
      console.error('Form Error');
      formRef.current.resetErrors()
      return;
    } 
    if(signinType === 'email') {
      handleSigninWithEmail(email, password)
    } else {
      handleSignInWithGoogle()
    }
  }

  const handleSigninWithEmail = (email, password) => {
        dispatch(signInUserWithEmailStart({email, password}))
        setFormValue({
          email: '',
          password: ''
        })
        if(selectUserSlice.currentUser) { 
          navigate("/home");
        }
  }

  const handleSignInWithGoogle = () => {
      dispatch(signInUserWithGoogleStart())
      if(selectUserSlice.currentUser) { 
        navigate("/home");
      }
  }

  const handleChange = () => {
    setVisible(!visible);
  };

return ( 
    <Form 
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}>
      {/* <!-- Email input --> */}
      <Form.Group controlId="email">
        <Form.Control name="email" placeholder="Email"/>
      </Form.Group>

      {/* <!--Password input--> */}
      <div className="flex mb-5">
        <Form.Group controlId='password' className="flex">
        <Form.Control name='password' type={visible ? 'text' : 'password'} placeholder="Password" className="pr-0"/>
          <InputGroup.Button onClick={handleChange}>
            {visible ? <EyeIcon /> : <EyeSlashIcon />}
          </InputGroup.Button>
        </Form.Group>
      </div>
          
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
          onClick={() => handleSignUserIn('email')}
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
          onClick={() => handleSignUserIn('google')}
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
      </Form>  
  );
}