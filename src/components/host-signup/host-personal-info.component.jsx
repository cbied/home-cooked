import { Form, SelectPicker } from 'rsuite'
import statesData from '../../mockData/statesData'

const HostPersonInfo = ({ saveForm, formInfo }) => {
	return (
		<Form
			layout='horizontal'
			formValue={formInfo}
			formDefaultValue={formInfo}
			onChange={(formValue) => saveForm(formValue)}
		>
			<Form.Group controlId='firstName'>
				<Form.ControlLabel>Full First Name</Form.ControlLabel>
				<Form.Control name='firstName' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='lastName'>
				<Form.ControlLabel>Last Name</Form.ControlLabel>
				<Form.Control name='lastName' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='phoneNumber'>
				<Form.ControlLabel>Phone Number</Form.ControlLabel>
				<Form.Control name='phoneNumber' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='street'>
				<Form.ControlLabel>Street Address</Form.ControlLabel>
				<Form.Control name='street' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='city'>
				<Form.ControlLabel>City</Form.ControlLabel>
				<Form.Control name='city' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='state'>
				<Form.ControlLabel>State</Form.ControlLabel>
				<Form.Control
					name='state'
					accepter={SelectPicker}
					data={statesData}
					block
				/>
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
			<Form.Group controlId='zipCode'>
				<Form.ControlLabel>Zip Code</Form.ControlLabel>
				<Form.Control name='zipCode' />
				<Form.HelpText>Required</Form.HelpText>
			</Form.Group>
		</Form>
	)
}

export default HostPersonInfo
