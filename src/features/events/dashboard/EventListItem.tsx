import {
  Button,
  Icon,
  Item,
  ItemGroup,
  List,
  Modal,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/events";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/store";
import { deleteEvent } from "../../../app/store/eventSlice";
import React from "react";

type Props = {
  event: AppEvent;
};
function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}
export default function EventListItem({ event }: Props) {
  const dispatcher = useAppDispatch();
  function handleDeleteEvent(eventId: string) {
    dispatcher(deleteEvent(eventId));
    dispatch({ type: "CLOSE_MODAL" });
  }
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
    <>
      <SegmentGroup>
        <Segment>
          <ItemGroup>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={event.hostPhotoURL || "/user.png"}
              />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </ItemGroup>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date}
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees.map((attendee: any) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <div
            className="flex"
            style={{ justifyContent: "space-between", marginTop: "10px" }}
          >
            <Button
              style={{ backgroundColor: "#1f4ed3", color: "white" }}
              content="Delete event"
              onClick={() =>
                dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })
              }
            />

            <Button
              color="purple"
              content="View"
              as={Link}
              to={`/events/${event.id}`}
            />
          </div>
        </Segment>
      </SegmentGroup>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Coution, this event will be deleted!</Modal.Header>
        <Modal.Content>
          By clicking delete you will delete this event permanently. Are you
          sure to delete this event?
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Cancel
          </Button>
          <Button negative onClick={() => handleDeleteEvent(event.id)}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
