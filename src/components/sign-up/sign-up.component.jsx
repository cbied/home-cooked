import { useState } from "react";
import { addNewUser } from '../../utils/firebase.utils';
import { Input, InputGroup, Grid, Row, Col, Button, ButtonGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

export default function SignUp() {
  const [visible, setVisible] = useState(false);
  const styles = {
    width: 350
  };
  const CustomInput = ({ ...props }) => <Input {...props} style={styles} />;

/**
 * Handles the signup process for a user.
 * @param {Event} event - The event object.
 */
async function handleSignupUser(event) {
  event.preventDefault();
  const displayName = event.target[0].value;
  const email = event.target[1].value;
  const password = event.target[2].value;
  const password2 = event.target[4].value;
  console.log(event)
  if(password === password2) {
    addNewUser({displayName, email, password})
  } else {
    alert('Passwords do not match')
  }
}

const handleChange = () => {
  setVisible(!visible);
};

    return ( 
        <form 
        onSubmit={handleSignupUser}
        className="flex flex-col items-center mt-10">
          <Grid fluid>
            <Row>
            <Col xs={24} sm={12} md={8}>
        {/* <!-- first name input --> */}
        <CustomInput size="lg" placeholder="Display Name" type='text' label="Display name" className="mb-6"/>

        {/* <!-- Email input --> */}
        <CustomInput size="lg" placeholder="Email" type='email' label="Email address" className="mb-6"/>

        {/* ADD PASSWORD MATCHING */}
        {/* <!--Password input--> */}
        <InputGroup inside style={styles} className="mb-3">
  
        <Input type={visible ? 'text' : 'password'} placeholder="Password" size="md" />
        <InputGroup.Button onClick={handleChange}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>

      </InputGroup>

        {/* <!--Password input--> */}
      <InputGroup inside style={styles} className="mb-3">

        <Input type={visible ? 'text' : 'password'} placeholder="Confirm Password" size="md" />
        <InputGroup.Button onClick={handleChange}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>

      </InputGroup>
      <ButtonGroup size="lg" style={styles}>
        {/* <!-- Submit button --> */}
          <Button
            color="blue"
            appearance="primary"
            size="lg"
            type="submit"
            className="mb-3 flex w-full rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
          >
            Sign up
          </Button>

          </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </form> 
    );

}