import { useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";

type Props = {
  setFormOpen: (value: boolean) => void;
};

export default function NavBar({ setFormOpen }: Props) {
  function handleFormOpen() {
    setFormOpen(true);
  }
  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/logo.png" alt="logo" style={{ marginRight: "10px" }} />
          Re-vents
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button
            floated="right"
            inverted={true}
            content="Create event"
            color="green"
            positive
            onClick={handleFormOpen}
          ></Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            basic
            inverted
            content="Login"
            style={{ marginRight: "5px" }}
          />
          <Button basic inverted content="Register" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
