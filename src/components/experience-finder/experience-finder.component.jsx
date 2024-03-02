import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";
import DropdownAvatar from "../dropdown-avatar/dropdown-avatar.component";
import { IconButton, ButtonToolbar, Divider } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import logo from '../../assets/logo.png'



const ExperienceFinder = ({ largeStyles, showLogo = false, showUserProfile = false }) => {
    
    const styles = { height: 'auto' }

    return (
        <div className="flex justify-between w-auto">
        {
            showLogo &&

            <div className='flex h-28 px-10'>
                <a className='block self-center' href={'/'}>
                    <img className='w-16 h-12' src={logo} alt="home cooked logo" />
                </a>
            </div>
        }
            
            <div className="w-auto h-auto flex self-center justify-center outline outline-1 rounded-full mb-3 overflow-hidden">
                <FoodTypes largeStyles={largeStyles} />
                <Divider vertical style={styles}/>
                <DatePicker placement='bottomEnd' showOneCalendar={false} />
                <Divider vertical style={styles}/>
                <PartySizeInput largeStyles={largeStyles} />
                <ButtonToolbar>
                    <IconButton className='w-fit' size="lg" icon={<SearchIcon className='w-fit'/>} />
                </ButtonToolbar>
            </div>

            {
                showUserProfile &&

                <DropdownAvatar />
            }
        </div>
    )
}

export default ExperienceFinder;