import { useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutBotton from "./SignedOutBotton";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/">
          <img src="/logo.png" alt="logo" style={{ marginRight: "20px" }} />
          Re-vents
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/events" />
        <Menu.Item name="Scratch" as={NavLink} to="/scratch" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createEvent"
            floated="right"
            content="Create event"
            color="purple"
          ></Button>
        </Menu.Item>
        {isLoggedIn ? (
          <SignedInMenu setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SignedOutBotton setIsLoggedIn={setIsLoggedIn} />
        )}
      </Container>
    </Menu>
  );
}
