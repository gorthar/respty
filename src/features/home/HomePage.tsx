import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image size="massive" src="/logo.png" style={{ marginBottom: 12 }} />
        </Header>
        <Button size="huge" inverted as={Link} to="/events">
          Get started
          <Icon name="caret right" inverted={true} />
        </Button>
      </Container>
    </Segment>
  );
}
