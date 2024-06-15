import { Nav } from "rsuite";
import DropdownAvatar from "../dropdown-avatar/dropdown-avatar.component";
import ExperienceFinder from "../experience-finder/experience-finder.component";
import DrawerExperienceFinder from "../drawer-experience-finder/drawer-experience-finder.component";
import logo from "../../assets/logo.png";
import mockData from "../../mockData/generated.json";
import { addMockData } from "../../utils/firebase.utils";
import "./navbar.styles.css";

const Navbar = ({
  showSearch = true,
  size = [1000, 1000],
  setAutocompletePlace,
  autocompletePlace,
}) => {
  const largeStyles = { minWidth: 200, maxWidth: 250 };
  return (
    <nav className="flex flex-col h-auto">
      <div className="flex justify-between w-auto">
        <div className="flex h-28 pl-10 pr-14 min-w-12">
          <a className="block self-center min-w-12" href={"/"}>
            <img className="min-w-12 h-12" src={logo} alt="home cooked logo" />
          </a>
        </div>
        {size[0] > 950 && showSearch ? (
          <div className="flex items-center">
            <Nav className="flex justify-around items-center">
              <Nav.Item onClick={() => addMockData(mockData)}>
                Be a Guest
              </Nav.Item>
              <Nav.Item href={"/"}>Learn about the experience</Nav.Item>
              <Nav.Item href={"/hostSignup"}>Be a Host</Nav.Item>
            </Nav>
          </div>
        ) : size[0] < 950 && size[0] >= 680 && showSearch ? (
          <DrawerExperienceFinder />
        ) : null}

        <DropdownAvatar />
      </div>
      {size[0] > 950 && showSearch ? (
        <div className="w-4/5 flex justify-center self-center">
          <ExperienceFinder
            customStyles={largeStyles}
            showUserProfile={false}
            showLogo={false}
            setAutocompletePlace={setAutocompletePlace}
            autocompletePlace={autocompletePlace}
          />
        </div>
      ) : (
        size[0] < 680 &&
        showSearch && (
          <div className="w-4/5 self-center">
            <DrawerExperienceFinder size={size[0]} />
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
