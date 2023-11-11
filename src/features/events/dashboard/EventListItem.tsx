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
import { openModal } from "../../../app/joint_graund/modals/modalSlice";

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  const dispatch = useAppDispatch();
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
          {event.attendees.length == 0
            ? "Be the first one to attend this event!"
            : ""}
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
                dispatch(
                  openModal({ modalType: "DeleteEventModal", data: event })
                )
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
    </>
  );
}
