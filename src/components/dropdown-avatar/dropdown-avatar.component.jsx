import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUserOut } from "../../store/user-slice/user-slice";
import { signOutUser } from "../../utils/firebase.utils";
import { AvatarGroup, Avatar, Dropdown } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";

const DropdownAvatar = () => {
  const selectCurrentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSignUserOut = async () => {
    return signOutUser().then(() => {
      dispatch(signUserOut());
    });
  };

  useEffect(() => {
    const userAvatar = document.getElementById("userAvatar");
    if (selectCurrentUser && selectCurrentUser.photoURL) {
      userAvatar.src = selectCurrentUser.photoURL;
    }
  }, []);

  return (
    <div className="flex h-28 px-10" id="avatarDropdown">
      <Dropdown
        placement="bottomEnd"
        noCaret={true}
        className="self-center"
        title={
          <span>
            {selectCurrentUser && selectCurrentUser.photoURL ? (
              <AvatarGroup>
                <Avatar
                  id="userAvatar"
                  size="lg"
                  circle
                  src={selectCurrentUser.photoURL}
                  alt="Avatar"
                />
              </AvatarGroup>
            ) : (
              <AvatarGroup>
                <AvatarIcon style={{ fontSize: 60 }} />
              </AvatarGroup>
            )}
          </span>
        }
      >
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          {selectCurrentUser ? (
            <div>
              <p>Signed in as</p>
              <strong>{selectCurrentUser.displayName}</strong>
            </div>
          ) : null}
        </Dropdown.Item>
        {selectCurrentUser ? (
          <div>
            <Dropdown.Separator />
            <a className="links" href="/userProfile" alt="User Profile page">
              <Dropdown.Item>Your profile</Dropdown.Item>
            </a>
            <a className="links" href="/admin" alt="User Admin page">
              <Dropdown.Item>Admin</Dropdown.Item>
            </a>
            <Dropdown.Item>Your friends</Dropdown.Item>
          </div>
        ) : null}

        <Dropdown.Separator />
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        {selectCurrentUser ? (
          <a
            href="/"
            onClick={handleSignUserOut}
            alt="Sign out"
            className="links"
          >
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </a>
        ) : (
          <a className="links" href={"/auth"} alt="Login in page">
            <Dropdown.Item>Login</Dropdown.Item>
          </a>
        )}
      </Dropdown>
    </div>
  );
};

export default DropdownAvatar;
