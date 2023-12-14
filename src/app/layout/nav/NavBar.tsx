import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutBotton from "./SignedOutBotton";
import SignedInMenu from "./SignedInMenu";
import { useAppSelector } from "../../store/store";
import { sampleData } from "../api/sampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function NavBar() {
  const { authanticated } = useAppSelector((state) => state.auth);
  function seedDatabase() {
    sampleData.forEach(async (event) => {
      const { id, ...eventWithoutId } = event;
      await setDoc(doc(db, "events", id), { ...eventWithoutId });
    });
  }

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
        {import.meta.env.DEV && (
          <Menu.Item>
            <Button
              onClick={seedDatabase}
              floated="right"
              content="Seed database"
              color="green"
            ></Button>
          </Menu.Item>
        )}

        {authanticated ? <SignedInMenu /> : <SignedOutBotton />}
      </Container>
    </Menu>
  );
}
