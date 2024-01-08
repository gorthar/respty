import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image, Label } from "semantic-ui-react";
import { AppEvent, Attendee } from "../../../app/types/events";
import formatDateString from "../../../app/joint_graund/formatDate";

import { useState } from "react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";
import { useAppSelector } from "../../../app/store/store";

type Props = { event: AppEvent };

export default function EventDetailHeader({ event }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isCurrentUserAttendig, setIsCurrentUserAttendig] = useState(
    event.attendees?.some((a) => a.id === currentUser?.uid)
  );
  const { updateDocument } = useFireStore("events");
  const eventImageStyle = {
    filter: "brightness(30%)",
  };

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  async function cancelMyPlace() {
    const eventAttendees = event.attendees.filter(
      (a) => a.id !== currentUser?.uid
    );
    const eventAttendeesIds = event.attendeesIds.filter(
      (a) => a !== currentUser?.uid
    );

    await updateDocument(event.id, {
      ...event,
      date: Timestamp.fromDate(new Date(event.date)),
      attendees: eventAttendees,
      attendeesIds: eventAttendeesIds,
    });
    setIsCurrentUserAttendig(false);
  }
  async function joinEvent() {
    const currentUserAsAttendee: Attendee = {
      id: currentUser!.uid || ``,
      displayName: currentUser!.displayName || ``,
      photoURL: currentUser!.photoURL || ``,
    };
    const updatedEvent = {
      ...event,
      date: Timestamp.fromDate(new Date(event.date)),
      attendees: [...event.attendees, currentUserAsAttendee],
      attendeesIds: [...event.attendeesIds, currentUser!.uid],
    };
    await updateDocument(event.id, updatedEvent);
    setIsCurrentUserAttendig(true);
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{formatDateString(event.date)}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
                {event.isCanceled && (
                  <Label color="red" size="large">
                    {" "}
                    Canceled
                  </Label>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isCurrentUserAttendig && !event.isCanceled && (
          <Button
            color="purple"
            style={{ fontSize: "0.9rem" }}
            onClick={() => {
              joinEvent();
            }}
          >
            JOIN THIS EVENT
          </Button>
        )}
        {isCurrentUserAttendig && (
          <Button
            style={{ fontSize: "0.9rem" }}
            onClick={() => {
              cancelMyPlace();
            }}
          >
            Cancel My Place
          </Button>
        )}

        {currentUser?.uid === event.hostUid && (
          <Button
            color="orange"
            floated="right"
            style={{ fontSize: "0.9rem" }}
            as={Link}
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}
