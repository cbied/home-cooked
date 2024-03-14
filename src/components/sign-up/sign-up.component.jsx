import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupUserStart } from '../../store/user-slice/user-slice'
import {
	Form,
	Schema,
	InputGroup,
	Button,
	ButtonGroup,
	Checkbox,
	CheckboxGroup,
} from 'rsuite'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'

export default function SignUp() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const selectUserSlice = useSelector((state) => state.user)
	const [visible, setVisible] = useState(false)
	const formRef = useRef()
	const [formValue, setFormValue] = useState({
		displayName: '',
		email: '',
		password: '',
		verifyPassword: '',
		isHost: [],
	})
	const styles = {
		width: 350,
	}

	const { StringType } = Schema.Types

	const model = Schema.Model({
		name: StringType().isRequired('This field is required.'),
		email: StringType()
			.isEmail('Please enter a valid email address.')
			.isRequired('This field is required.'),
		password: StringType().isRequired('This field is required.'),
		verifyPassword: StringType()
			.addRule((value, data) => {
				if (value !== data.password) {
					return false
				}

				return true
			}, 'The two passwords do not match')
			.isRequired('This field is required.'),
	})

	/**
	 * Handles the signup process for a user.
	 * @param {Event} event - The event object.
	 */
	const handleSignupUser = () => {
		if (formRef.current.check()) {
			console.error('Form Error')
			formRef.current.resetErrors()
			return
		}
		dispatch(signupUserStart(formValue))
	}

	const handleChange = () => {
		setVisible(!visible)
	}

	useEffect(() => {
		if (selectUserSlice.currentUser && selectUserSlice.currentUser.isHost) {
			console.log(selectUserSlice.currentUser.isHost)
			navigate('/hostSignup')
		}

		if (
			selectUserSlice.currentUser &&
			!selectUserSlice.currentUser.isHost
		) {
			console.log(selectUserSlice.currentUser.isHost)
			navigate('/home')
		}
	}, [selectUserSlice.currentUser, navigate])

	return (
		<Form
			ref={formRef}
			onChange={setFormValue}
			formValue={formValue}
			model={model}
			className='flex flex-col items-center mt-10'
		>
			{/* <!-- display name input --> */}
			<Form.Group controlId='displayName'>
				<Form.Control name='displayName' placeholder='Display Name' />
			</Form.Group>

			{/* <!-- Email input --> */}
			<Form.Group controlId='email'>
				<Form.Control name='email' placeholder='Email' />
			</Form.Group>

			{/* <!--Password input--> */}
			<div className='flex mb-5'>
				<Form.Group controlId='password' className='flex'>
					<Form.Control
						name='password'
						type={visible ? 'text' : 'password'}
						placeholder='Password'
						className='pr-0'
					/>
					<InputGroup.Button onClick={handleChange}>
						{visible ? <EyeIcon /> : <EyeSlashIcon />}
					</InputGroup.Button>
				</Form.Group>
			</div>

			{/* <!--Password input--> */}
			<div className='flex mb-10'>
				<Form.Group controlId='verifyPassword' className='flex'>
					<Form.Control
						name='verifyPassword'
						type={visible ? 'text' : 'password'}
						placeholder='Comfirm Password'
					/>
					<InputGroup.Button onClick={handleChange} className='block'>
						{visible ? <EyeIcon /> : <EyeSlashIcon />}
					</InputGroup.Button>
				</Form.Group>
			</div>

			<Form.Group controlId='isHost'>
				<Form.Control name='isHost' accepter={CheckboxGroup} inline>
					<Checkbox value='isHost'>I want to be a Host!</Checkbox>
				</Form.Control>
				<Form.HelpText>
					Teach people how to cook authentic meals and/or host
					parties!
				</Form.HelpText>
			</Form.Group>

			<ButtonGroup size='lg' style={styles}>
				{/* <!-- Submit button --> */}
				<Button
					onClick={handleSignupUser}
					color='blue'
					appearance='primary'
					size='lg'
					type='submit'
					className='mb-3 flex w-full rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0'
				>
					Sign up
				</Button>
			</ButtonGroup>
		</Form>
	)
}
