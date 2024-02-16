import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";
import { IconButton, ButtonToolbar, Divider } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';



const ExperienceFinder = () => {
    
    const styles = { height: 'auto' }

    return (
        <div className="w-auto h-auto flex self-center justify-center outline outline-1 rounded-full mb-3 overflow-hidden">
            <FoodTypes />
            <Divider vertical style={styles}/>
            <DatePicker />
            <Divider vertical style={styles}/>
            <PartySizeInput />
            <ButtonToolbar>
                <IconButton className='w-fit' size="lg" icon={<SearchIcon className='w-fit'/>} />
            </ButtonToolbar>
        </div>
    )
}

export default ExperienceFinder;