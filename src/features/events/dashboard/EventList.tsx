import { AppEvent } from "../../../app/types/events";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  viewEvent: (event: AppEvent) => void;
};

export default function EventList({ events, viewEvent }: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} viewEvent={viewEvent} />
      ))}
    </>
  );
}
