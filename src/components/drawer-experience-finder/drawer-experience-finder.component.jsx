import { useState } from "react";
import { IconButton, Drawer, Button } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import LocationFinder from "../location-finder/location-finder.compoent";
import FoodTypes from "../food-types/food-types.component";
import DatePicker from "../date-range-picker/date-range-picker.component";
import PartySizeInput from "../party-size-input/party-size-input.component";
import DropdownAvatar from "../dropdown-avatar/dropdown-avatar.component";
import logo from "../../assets/logo.png";

const DrawerExperienceFinder = ({
  size,
  showLogo = false,
  showUserProfile = false,
}) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const handleOpenDrawer = (key) => {
    setOpen(true);
    setPlacement(key);
  };
  const smallStyles = { minWidth: 200, maxWidth: 250 };

  return (
    // JSX code goes here
    <div className="w-full flex justify-around self-center">
      {showLogo && size > 600 ? (
        <div className="flex h-28 px-10">
          <a className="block self-center" href={"/"}>
            <img className="w-16 h-12" src={logo} alt="home cooked logo" />
          </a>
        </div>
      ) : null}

      <div className="h-28 flex items-center rounded-full grow">
        <IconButton
          appearance="default"
          block
          icon={<SearchIcon style={{ height: "48", width: "48" }} />}
          onClick={() => handleOpenDrawer("top")}
          className="h-12 w-full px-10 rounded-full"
        >
          Find an experience
        </IconButton>
        <Drawer
          placement={placement}
          open={open}
          onClose={() => setOpen(false)}
          size={size < 800 ? "full" : "lg"}
        >
          <Drawer.Body>
            {size < 800 ? (
              <div className={"flex flex-col items-center h-fit mt-14"}>
                <h5 className="my-5">Where we eatting?</h5>
                <LocationFinder />
                <h5 className="my-5">When we eatting?</h5>
                <DatePicker
                  placement={"bottomStart"}
                  showOneCalendar={true}
                  className="mt-14"
                  customStyles={smallStyles}
                />
                <div
                  className={
                    "flex flex-col items-center justify-around h-96 mb-10 mt-5"
                  }
                >
                  <h5>What we eatting?</h5>
                  <FoodTypes isInline={true} smallStyles={smallStyles} />
                  <h5 className="my-5">How many people we eatting with?</h5>
                  <PartySizeInput />
                </div>
              </div>
            ) : (
              <div className="mt-14">
                <h5>Where we eatting?</h5>
                <LocationFinder />
                <div className="flex justify-around mt-5">
                  <div className="flex flex-col">
                    <h5>What we eatting?</h5>
                    <FoodTypes isInline={true} smallStyles={smallStyles} />
                  </div>
                  <div
                    className={
                      "flex flex-col self-stretch justify-around ml-5 mb-10"
                    }
                  >
                    <h5>When we eatting?</h5>
                    <DatePicker
                      placement={"bottomStart"}
                      showOneCalendar={true}
                      customStyles={smallStyles}
                    />
                    <h5>How many people we eatting with?</h5>
                    <PartySizeInput />
                  </div>
                </div>
              </div>
            )}

            <Drawer.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)} appearance="primary">
                Confirm
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </Drawer>
      </div>

      {showUserProfile && <DropdownAvatar />}
    </div>
  );
};

export default DrawerExperienceFinder;
