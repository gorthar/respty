import { Divider, Grid, Segment } from "semantic-ui-react";

export default function UnauthComponent() {
  return (
    <Segment>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <p>Re-vents requires you to be signed in to view this page</p>
          </Grid.Column>
          <Grid.Column>
            <p>Login or register to see this content</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
