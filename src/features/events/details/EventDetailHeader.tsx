import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";

export default function EventDetailHeader() {
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
          src={`/categoryImages/drinks.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "white" }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button style={{ fontSize: "0.9rem" }}>Cancel My Place</Button>
        <Button color="teal" style={{ fontSize: "0.9rem" }}>
          JOIN THIS EVENT
        </Button>

        <Button
          color="orange"
          floated="right"
          style={{ fontSize: "0.9rem" }}
          as={Link}
          to={"/createEvent"}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
