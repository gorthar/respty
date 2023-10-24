import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import "./style.css";
import { Button, Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import NavBar from "./nav/NavBar";
import { AppEvent } from "../types/events";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  function viewEvent(event: AppEvent | null) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar viewEvent={viewEvent} />
      <Container className="main">
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          viewEvent={viewEvent}
        />
      </Container>
    </>
  );
}

export default App;
