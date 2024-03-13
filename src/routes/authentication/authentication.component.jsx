import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Animation, Grid, Row, Col, Loader } from 'rsuite'
import Login from '../../components/login/login.component'
import SignUp from '../../components/sign-up/sign-up.component'
import Navbar from '../../components/navbar/navbar.component'

export default function Authentication() {
	const [showSignup, setShowSignup] = useState(false)
	const [showLogin, setShowLogin] = useState(true)
	const selectUserSlice = useSelector((state) => state.user)

	const onChangeSignUp = () => {
		setShowSignup(true)
		setShowLogin(false)
	}

	const onChangeLogin = () => {
		setShowSignup(false)
		setShowLogin(true)
	}

	const CustomButtonGroup = ({ appearance }) => (
		<ButtonGroup style={{ marginTop: 12 }} justified>
			<Button
				appearance={appearance}
				onClick={() => onChangeSignUp()}
				active={showSignup}
			>
				Sign Up
			</Button>
			<Button
				appearance={appearance}
				onClick={() => onChangeLogin()}
				active={showLogin}
			>
				Login
			</Button>
		</ButtonGroup>
	)

	const SignupAnimation = React.forwardRef((props, ref) => (
		<div {...props} ref={ref}>
			<SignUp /> :
		</div>
	))

	const LoginAnimation = React.forwardRef((props, ref) => (
		<div {...props} ref={ref}>
			<Login />
		</div>
	))

	return (
		<Fragment>
			<Navbar showSearch={false} />
			<Grid fluid>
				{!selectUserSlice.isLoading ? (
					<Row>
						<Col md={24} lg={11}>
							{/* <!-- Left column container with background--> */}
							<div className='w-half mb-10'>
								<div className='w-full flex justify-around mb-10 pb-3 text-xl '>
									<CustomButtonGroup />
								</div>
								<Animation.Collapse in={showSignup}>
									{(props, ref) => (
										<SignupAnimation {...props} ref={ref} />
									)}
								</Animation.Collapse>
								<Animation.Collapse in={showLogin}>
									{(props, ref) => (
										<LoginAnimation {...props} ref={ref} />
									)}
								</Animation.Collapse>
							</div>
						</Col>

						{/* <!-- Right column container with Login or Sign up--> */}
						<Col mdHidden lg={12}>
							<div className=' mb-12 max-w-md block'>
								<img
									className='px-10'
									src='https://svgsilh.com/svg/307076.svg'
									alt='Chef'
								/>
							</div>
						</Col>
					</Row>
				) : (
					<div className='h-screen flex justify-center items-center'>
						<Loader size='lg' />
					</div>
				)}
			</Grid>
		</Fragment>
	)
}
