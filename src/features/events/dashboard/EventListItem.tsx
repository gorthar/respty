import {
  Button,
  Grid,
  Icon,
  Item,
  ItemGroup,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/events";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/store";
import { openModal } from "../../../app/joint_graund/modals/modalSlice";
import formatDateString from "../../../app/joint_graund/formatDate";

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
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />

              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
                {event.isCanceled && (
                  <Label ribbon="right" color="red" style={{ top: "-10px" }}>
                    {" "}
                    Canceled
                  </Label>
                )}
              </Item.Content>
            </Item>
          </ItemGroup>
        </Segment>
        <Segment>
          <span>
            <Grid columns={2} stackable textAlign="justified">
              <Grid.Column>
                <Icon name="calendar" /> {formatDateString(event.date)}
              </Grid.Column>
              <Grid.Column>
                <Icon name="marker" />{" "}
                <a
                  href={
                    "http://maps.google.com/maps?q=" +
                    event.venue.replace(/ /g, "+")
                  }
                  target="_blank"
                >
                  {event.venue}
                </a>
              </Grid.Column>
            </Grid>
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees.map((attendee) => (
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
