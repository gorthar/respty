import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSideBar from "./EventDetailSideBar";

export default function EventDetailPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailInfo />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar />
      </Grid.Column>
    </Grid>
  );
}
