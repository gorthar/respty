import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";
import formatDateString from "../../../app/joint_graund/formatDate";
import { Link } from "react-router-dom";

type Props = { event: AppEvent };

export default function EventDetailInfo({ event }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="purple" />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>{formatDateString(event.date)}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="purple" />
          </Grid.Column>
          <Grid.Column computer={11} tablet={10} mobile={10}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              as={Link}
              to={
                "http://maps.google.com/maps?q=" +
                event.venue.replace(/ /g, "+")
              }
              target="_blank"
              floated="right"
              color="purple"
              size="tiny"
              content="Show Map"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
