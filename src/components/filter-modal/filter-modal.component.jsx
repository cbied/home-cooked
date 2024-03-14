import { Button, Modal, ButtonToolbar } from 'rsuite'
import FilterHostOptions from '../filter-host-options/filter-host-options.component'

const FilterModal = ({ handleOpenFilterOptions, modalOpen, modalSize }) => {
	return (
		<div>
			<Modal
				size={modalSize}
				open={modalOpen}
				onClose={handleOpenFilterOptions}
				aria-labelledby='Filter options'
				aria-describedby='Fitler options for host dinners'
			>
				<Modal.Body>
					<FilterHostOptions />
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar className='flex justify-between'>
						<Button
							onClick={handleOpenFilterOptions}
							appearance='subtle'
							size='lg'
						>
							Cancel
						</Button>
						<Button
							onClick={handleOpenFilterOptions}
							appearance='primary'
							size='lg'
						>
							Filter
						</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default FilterModal
