import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";
import LocationFinder from "../location-finder/location-finder.compoent";
import DropdownAvatar from "../dropdown-avatar/dropdown-avatar.component";
import { IconButton, ButtonToolbar, Divider } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import logo from "../../assets/logo.png";

const ExperienceFinder = ({
  largeStyles,
  showLogo = false,
  showUserProfile = false,
}) => {
  return (
    <div className="flex justify-between w-auto mb-5">
      {showLogo && (
        <div className="flex h-28 px-10">
          <a className="block self-center" href={"/"}>
            <img className="w-16 h-12" src={logo} alt="home cooked logo" />
          </a>
        </div>
      )}

      <div className="w-fit h-full flex self-center justify-center outline outline-1 rounded-full overflow-hidden">
        <ButtonToolbar>
          <IconButton
            className="w-fit"
            size="lg"
            style={{ height: "100%", width: "35px" }}
          />
        </ButtonToolbar>
        <div className="w-fit h-auto flex flex-col">
          <LocationFinder />

          <div className="flex self-center justify-center">
            <FoodTypes />
            <Divider vertical className="h-auto" />
            <DatePicker
              placement="bottomEnd"
              showOneCalendar={false}
              largeStyles={largeStyles}
            />
            <Divider vertical className="h-auto" />
            <PartySizeInput />
          </div>
        </div>
        <ButtonToolbar>
          <IconButton
            className="w-fit"
            size="lg"
            icon={<SearchIcon className="w-fit" />}
            style={{ height: "100%" }}
          />
        </ButtonToolbar>
      </div>
      {showUserProfile && <DropdownAvatar />}
    </div>
  );
};

export default ExperienceFinder;
