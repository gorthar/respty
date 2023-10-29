import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export default function SignedInMenu({ setIsLoggedIn }: Props) {
  return (
    <>
      <Menu.Item position="right">
        <Image avatar spaced="right" src="/user.png" />
        <Dropdown pointing="top left" text="Bob">
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
              onClick={() => setIsLoggedIn(false)}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
