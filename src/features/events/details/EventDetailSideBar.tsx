import { Segment, Item } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";
import { Link } from "react-router-dom";

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
            //console.log(attendee),
            <Item
              style={{ position: "relative" }}
              key={attendee.id + Math.random()}
            >
              <Item.Image size="tiny" src={attendee.photoURL || "/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as={Link} to={`/profiles/${attendee.id}`}>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
