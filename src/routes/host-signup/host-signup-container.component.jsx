import { useState } from 'react'
import { useDispatch } from 'react-redux'
import HostPersonInfo from '../../components/host-signup/host-personal-info.component'
import HostProfileInfo from '../../components/host-signup/host-profile-info.component'
import { Steps, ButtonGroup, Button, Panel, Form, ButtonToolbar } from 'rsuite'

const hostPersonalInfoValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	street: '',
	city: '',
	state: '',
	zipCode: '',
}
const hostProfileInfoValues = {
	foodTypes: [],
	languages: [],
	textarea: '',
}

const HostSignupContainer = () => {
	const [step, setStep] = useState(0)
	const dispatch = useDispatch()
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep)
	}

	const saveForm = (formValues) => {
		// dispatch formValues to store
	}

	const onNext = () => {
		// saveForm()
		onChange(step + 1)
	}
	const onPrevious = () => onChange(step - 1)

	return (
		<div className='h-full w-full p-24'>
			<div className='w-full flex flex-col justify-around items-stretch '>
				<Steps current={step}>
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
				</Steps>
				<Panel className='flex flex-col self-center mt-10'>
					{step === 0 ? (
						<HostPersonInfo
							saveForm={saveForm}
							formInfo={hostPersonalInfoValues}
						/>
					) : step === 1 ? (
						<HostProfileInfo
							saveForm={saveForm}
							formInfo={hostProfileInfoValues}
						/>
					) : step === 2 ? (
						<div>
							<h3>step 3</h3>
						</div>
					) : null}
				</Panel>
			</div>
			<div className='h-full w-full flex flex-col justify-center items-center'>
				<ButtonGroup
					className='w-full justify-around items-center'
					style={{ display: 'flex' }}
				>
					<Button onClick={onPrevious} disabled={step === 0}>
						Previous
					</Button>
					{step === 2 ? (
						<Form.Group>
							<ButtonToolbar>
								<Button appearance='primary'>Submit</Button>
							</ButtonToolbar>
						</Form.Group>
					) : (
						<Button onClick={onNext} disabled={step === 3}>
							Next
						</Button>
					)}
				</ButtonGroup>
			</div>
		</div>
	)
}

export default HostSignupContainer
