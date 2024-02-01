import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';



const ExperienceFinder = () => {



    return (
        <div className="w-fit flex self-center outline outline-2 outline-offset-2 rounded mb-3">
            <FoodTypes />
            <DatePicker />
            <PartySizeInput />
            <ButtonToolbar>
                <IconButton size="lg" icon={<SearchIcon />} />
            </ButtonToolbar>
        </div>
    )
}

export default ExperienceFinder;