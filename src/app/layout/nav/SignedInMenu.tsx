import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { useAppSelector } from "../../store/store";

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSignOut() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      <Menu.Item position="right">
        <Image avatar spaced="right" src={currentUser?.photoURL} />
        <Dropdown pointing="top left" text={currentUser?.name}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/createEvent"
              text="Create Event"
              icon="plus"
            />
            <Dropdown.Item text="My profile" icon="user" />
            <Dropdown.Item
              text="Sign out"
              icon="power"
              onClick={() => handleSignOut()}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
