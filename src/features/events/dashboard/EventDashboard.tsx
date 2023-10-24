import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../app/layout/api/sampleData";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/events";

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectedEvent: AppEvent | null;
  viewEvent: (event: AppEvent | null) => void;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectedEvent,
  viewEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function handleCreateEvent(event: AppEvent) {
    setEvents((prevState) => {
      return [...prevState, event];
    });
  }
  function handleUpdateEvent(event: AppEvent) {
    setEvents((prevState) => {
      return prevState.map((e) => (e.id === event.id ? event : e));
    });
    viewEvent(null);
    setFormOpen(false);
  }

  function handleDelteEvent(event: AppEvent) {
    setEvents((prevState) => {
      return prevState.filter((e) => e.id !== event.id);
    });
    setFormOpen(false);
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} viewEvent={viewEvent} />
      </Grid.Column>
      <Grid.Column width="6">
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            handleCreateEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            handleUpdateEvent={handleUpdateEvent}
            key={selectedEvent?.id ?? "create"}
            handleDelteEvent={handleDelteEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
