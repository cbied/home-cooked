import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";



const ExperienceFinder = () => {



    return (
        <div className="flex items-center justify-center rounded border-spacing-1 mb-10">
            <FoodTypes />
            <DatePicker />
            <PartySizeInput />
        </div>
    )
}

export default ExperienceFinder;