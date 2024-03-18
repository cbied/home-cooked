import { useState } from 'react'
import HostPersonInfo from '../../components/host-signup/host-personal-info.component'
import HostProfileInfo from '../../components/host-signup/host-profile-info.component'
import { Steps, ButtonGroup, Button, Panel, Form, ButtonToolbar } from 'rsuite'

const totalFormValue = {
	firstStepFormValues: {
		firstName: '',
		lastName: '',
		phoneNumber: '',
		street: '',
		city: '',
		state: '',
		zipCode: '',
	},
	secondStepFormValues: {
		foodTypes: [],
		languages: [],
		textarea: '',
	},
}

const HostSignupContainer = () => {
	const [step, setStep] = useState(0)
	const [formValue, setFormValue] = useState(totalFormValue)
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep)
	}

	const saveForm = (formValues) => {
		//TODO
		// add form for user bank info so they can get paid
		if (formValues.firstName) {
			setFormValue({
				firstStepFormValues: formValues,
			})
		}

		if (formValues.textarea) {
			setFormValue({
				...formValue,
				secondStepFormValues: formValues,
			})
		}
	}

	const onNext = () => {
		saveForm(formValue)
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
							formInfo={formValue.firstStepFormValues}
						/>
					) : step === 1 ? (
						<HostProfileInfo
							saveForm={saveForm}
							formInfo={formValue.secondStepFormValues}
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
