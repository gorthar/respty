import { Segment, Item } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";

type Props = {
  event: AppEvent;
};

export default function EventDetailSideBar({ event }: Props) {
  if (!event.attendees) {
    return (
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="purple"
      >
        Be the first to attend this event!
      </Segment>
    );
  }

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="purple"
      >
        {event.attendees.length}
        {event.attendees.length === 1 ? " Person" : " People"} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {event.attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.id}>
              <Item.Image size="tiny" src={attendee.photoURL || "/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
