import { useState, forwardRef} from 'react';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Cascader } from 'rsuite';
import FoodTypes from '../../components/food-types/food-types.component';

const initFormValue = {
    "street": '',
    "city": '',
    "state": '',
    "foodType": [],
    "aboutMe": '',
  };

const HostSignup = ({ saveForm, formInfo }) => {
    console.log(formInfo)
    const [firstFormValue, firstSetFormValue] = useState();
    const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

    const selectData = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ].map(item => ({
        label: item,
        value: item
    }));




  return (
    <Form layout="horizontal"
          formValue={firstFormValue}
          formDefaultValue={formInfo}
          onChange={formValue => saveForm(formValue)}>
        <Form.Group controlId="street">
            <Form.ControlLabel>Street Address</Form.ControlLabel>
            <Form.Control name="address.street" />
            <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="city">
            <Form.ControlLabel>City</Form.ControlLabel>
            <Form.Control name="address.city" />
            <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.ControlLabel>State</Form.ControlLabel>
          <Form.Control name="address.state" accepter={SelectPicker} data={selectData} />
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="foodType">
            <Form.ControlLabel>What cuisine?</Form.ControlLabel>
            <Form.HelpText>Required</Form.HelpText>
            <FoodTypes as={Form.Control} name="foodType" accepter={Cascader} isInline={true} />
        </Form.Group>
        {/* TODO: FIX focus out when user types */}
        <Form.Group controlId="aboutMe">
            <Form.ControlLabel>Tell us about yourself and your awesome food!</Form.ControlLabel>
        <Form.Control name="aboutMe" rows={5} accepter={Textarea} />
    </Form.Group>
  </Form>
  );
};

export default HostSignup;
