import { useState } from 'react'
import HostSignup from '../../components/host-signup/host-signup.component'
import { Steps, ButtonGroup, Button, Panel, Form, ButtonToolbar } from 'rsuite'

const totalFormValue = {
	firstFormValue: {
		street: '',
		city: '',
		state: '',
		foodType: [],
		aboutMe: '',
	},
}

const HostSignupContainer = () => {
	const [step, setStep] = useState(0)
	const [formValue, setFormValue] = useState(totalFormValue)
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep)
	}

	const saveForm = (firstFormValue) => {
		//TODO
		// add form for user full legal information and verification (gov id, sefie), phone number
		// add form for user bank info so they can get paid
		setFormValue({
			firstFormValue: firstFormValue,
		})
	}

	const onNext = () => {
		onChange(step + 1)
	}
	const onPrevious = () => onChange(step - 1)

	return (
		<div className='h-full w-full'>
			<div className='w-full flex flex-col justify-around items-stretch p-24'>
				<Steps current={step}>
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
				</Steps>
				<Panel
					header={`Step: ${step + 1}`}
					className='flex flex-col self-center'
				>
					{step === 0 ? (
						<HostSignup
							saveForm={saveForm}
							formInfo={formValue.firstFormValue}
						/>
					) : step === 1 ? (
						<h3>step 2</h3>
					) : step === 2 ? (
						<div>
							<h3>step 3</h3>
							<Form.Group>
								<ButtonToolbar>
									<Button appearance='primary'>Submit</Button>
								</ButtonToolbar>
							</Form.Group>
						</div>
					) : null}
				</Panel>
			</div>
			<div className='h-full w-full flex flex-col justify-center items-center'>
				<ButtonGroup>
					<Button onClick={onPrevious} disabled={step === 0}>
						Previous
					</Button>
					<Button onClick={onNext} disabled={step === 3}>
						Next
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

export default HostSignupContainer
