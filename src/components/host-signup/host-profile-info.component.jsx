import { useEffect, forwardRef, useState } from 'react'
import { Form, Input, CheckPicker } from 'rsuite'
import foodTypes from '../../mockData/mockFoodTypes.json'
import languages from '../../mockData/languages.json'

const Textarea = forwardRef((props, ref) => (
	<Input {...props} as='textarea' ref={ref} />
))

const HostProfileInfo = ({ saveForm, formInfo }) => {
	const [foodData, setFoodData] = useState()
	let foodTypeData = []

	foodTypes.forEach((foodType) => {
		foodTypeData.push(...foodType.children)
	})

	useEffect(() => {
		if (foodTypeData.length) {
			setFoodData(foodTypeData.map((item) => item))
		}
	}, [])

	return (
		<Form
			layout='horizontal'
			formValue={formInfo}
			formDefaultValue={formInfo}
			onChange={(formValue) => saveForm(formValue)}
		>
			<Form.Group controlId='foodTypes'>
				<Form.ControlLabel>
					What cusines do you offer?
				</Form.ControlLabel>
				<Form.Control
					name='foodTypes'
					accepter={CheckPicker}
					data={foodData}
					style={{ minWidth: '18rem', maxWidth: '20rem' }}
				/>
			</Form.Group>
			<Form.Group controlId='languages'>
				<Form.ControlLabel>
					What languages do you speak?
				</Form.ControlLabel>
				<Form.Control
					name='languages'
					accepter={CheckPicker}
					data={languages}
					style={{ minWidth: '18rem', maxWidth: '20rem' }}
				/>
			</Form.Group>

			<Form.Group controlId='textarea'>
				<Form.ControlLabel>
					Tell us about yourself and your awesome food!
				</Form.ControlLabel>
				<Form.Control name='textarea' rows={5} accepter={Textarea} />
			</Form.Group>
		</Form>
	)
}

export default HostProfileInfo
