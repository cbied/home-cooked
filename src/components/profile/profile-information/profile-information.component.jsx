import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserStart } from '../../../store/user-slice/user-slice'
import {
	Container,
	Content,
	Footer,
	Form,
	Button,
	Uploader,
	Message,
	Schema,
	Loader,
	useToaster,
	InlineEdit,
	DatePicker,
} from 'rsuite'
import AvatarIcon from '@rsuite/icons/legacy/Avatar'
import './profile-information.styles.css'

const previewFile = (file, callback) => {
	const reader = new FileReader()
	reader.onloadend = () => {
		callback(reader.result)
	}
	reader.readAsDataURL(file)
}

const Field = ({
	label,
	as: Component,
	name,
	isRequired,
	type,
	controlId,
	handleSaveInputs,
	defaultValue,
	accepter,
	format,
}) => {
	return (
		<Form.Group controlId={controlId}>
			<Form.ControlLabel>{label}</Form.ControlLabel>
			<InlineEdit
				placeholder='Click to edit ...'
				size='lg'
				style={{ minWidth: 300 }}
				defaultValue={defaultValue}
				onSave={handleSaveInputs}
			>
				<Component
					style={{ minWidth: 300 }}
					name={name}
					type={type}
					accepter={accepter}
					format={format}
				/>
			</InlineEdit>
			{isRequired && (
				<Form.HelpText tooltip>{label} is required</Form.HelpText>
			)}
		</Form.Group>
	)
}

const ProfileInformation = () => {
	const dispatch = useDispatch()
	const selectUserSlice = useSelector((state) => state.user)
	const toaster = useToaster()
	const [uploading, setUploading] = useState(false)
	const [fileInfo, setFileInfo] = useState(null)
	const [formChange, setFormChange] = useState(false)
	const { StringType } = Schema.Types
	const formRef = useRef()
	const [formValue, setFormValue] = useState({
		firstName: selectUserSlice.currentUser?.firstName
			? selectUserSlice.currentUser.firstName
			: '',
		lastName: selectUserSlice.currentUser?.lastName
			? selectUserSlice.currentUser.lastName
			: '',
		birthday: selectUserSlice.currentUser?.birthday
			? selectUserSlice.currentUser.birthday
			: '',
		displayName: selectUserSlice.currentUser
			? selectUserSlice.currentUser.displayName
			: '',
		email: selectUserSlice.currentUser
			? selectUserSlice.currentUser.email
			: '',
		phoneNumber: selectUserSlice.currentUser
			? selectUserSlice.currentUser.phoneNumber
			: '',
		photoURL: selectUserSlice.currentUser?.photoURL
			? selectUserSlice.currentUser.photoURL
			: '',
	})

	const updateUserInfoStart = (userInfo) => {
		dispatch(updateUserStart({ userInfo }))
	}

	const handleUpdateUserInfo = () => {
		if (!formRef.current.check()) {
			console.error('Form Error')
			return
		} else {
			setFormChange(false)
			const userInfo = {
				uid: selectUserSlice.currentUser.uid,
				userInfo: formValue,
			}
			updateUserInfoStart(userInfo)
		}
	}

	const handleSaveInputs = () => {
		setFormValue(formValue)
		for (let key in formValue) {
			if (formValue[key] !== selectUserSlice.currentUser[key]) {
				setFormChange(true)
				return
			} else {
				setFormChange(false)
			}
		}
	}

	const model = Schema.Model({
		displayName: StringType().isRequired('This field is required.'),
		email: StringType()
			.isEmail('Please enter a valid email address.')
			.isRequired('This field is required.'),
	})

	return (
		<Container>
			{formChange && (
				<div className='flex justify-center'>
					<h4> Remember to save! </h4>
				</div>
			)}
			<Content className='flex justify-center mt-10'>
				{formValue && !selectUserSlice.isLoading ? (
					<Form
						ref={formRef}
						onChange={setFormValue}
						formValue={formValue}
						model={model}
					>
						{formChange}
						<Field
							label='Frist Name'
							as={Form.Control}
							name='firstName'
							isRequired={false}
							controlId='firstName'
							defaultValue={formValue.firstName}
							handleSaveInputs={handleSaveInputs}
						/>

						<Field
							label='Last Name'
							as={Form.Control}
							name='lastName'
							isRequired={false}
							controlId='lastName'
							defaultValue={formValue.lastName}
							handleSaveInputs={handleSaveInputs}
						/>

						<Field
							label='Birthday'
							as={Form.Control}
							name='birthday'
							isRequired={false}
							controlId='birthday'
							defaultValue={
								formValue.birthday
									? new Date(formValue.birthday)
									: new Date()
							}
							accepter={DatePicker}
							format='MM/dd/yyyy'
							handleSaveInputs={(event) =>
								handleSaveInputs(event)
							}
						/>

						<Field
							label='Display Name'
							as={Form.Control}
							name='displayName'
							isRequired={true}
							controlId='displayName'
							defaultValue={formValue.displayName}
							handleSaveInputs={handleSaveInputs}
						/>

						<Field
							label='Email'
							as={Form.Control}
							name='email'
							isRequired={true}
							type={'email'}
							controlId='email'
							defaultValue={formValue.email}
							handleSaveInputs={handleSaveInputs}
						/>

						<Field
							label='Phone Number'
							as={Form.Control}
							name='phoneNumber'
							isRequired={false}
							controlId='phoneNumber'
							defaultValue={formValue.phoneNumber}
							handleSaveInputs={handleSaveInputs}
						/>

						<Form.Group controlId='photoURL'>
							<Form.ControlLabel>Photo URL</Form.ControlLabel>
							<Uploader
								fileListVisible={false}
								listType='picture'
								action='//jsonplaceholder.typicode.com/posts/'
								onUpload={(file) => {
									setUploading(true)
									previewFile(file.blobFile, (value) => {
										setFileInfo(value)
									})
								}}
								onSuccess={(response, file) => {
									setUploading(false)
									toaster.push(
										<Message type='success'>
											Uploaded successfully
										</Message>
									)
									console.log(response)
								}}
								onError={() => {
									setFileInfo(null)
									setUploading(false)
									toaster.push(
										<Message type='error'>
											Upload failed
										</Message>
									)
								}}
							>
								<button style={{ width: 150, height: 150 }}>
									{uploading && <Loader backdrop center />}
									{fileInfo ? (
										<img
											src={fileInfo}
											width='100%'
											height='100%'
											alt='file info'
										/>
									) : (
										<AvatarIcon style={{ fontSize: 80 }} />
									)}
								</button>
							</Uploader>
						</Form.Group>
						<Button
							appearance='primary'
							onClick={handleUpdateUserInfo}
						>
							Save
						</Button>
					</Form>
				) : (
					<Loader size='lg' />
				)}
			</Content>
			<Footer>Footer</Footer>
		</Container>
	)
}

export default ProfileInformation
