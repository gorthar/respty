import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";

type Props = { event: AppEvent };

export default function EventDetailHeader({ event }: Props) {
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
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button style={{ fontSize: "0.9rem" }}>Cancel My Place</Button>
        <Button color="purple" style={{ fontSize: "0.9rem" }}>
          JOIN THIS EVENT
        </Button>

        <Button
          color="orange"
          floated="right"
          style={{ fontSize: "0.9rem" }}
          as={Link}
          to={`/manage/${event.id}`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
