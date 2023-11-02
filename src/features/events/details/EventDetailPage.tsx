import { Grid, GridRow } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSideBar from "./EventDetailSideBar";
import { useAppSelector } from "../../../app/store/store";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams();

  const event = useAppSelector((state) =>
    state.eventsConfig.events.find((e) => e.id === id)
  );

  if (!event) return <h1>Event not found</h1>;

  return (
    <>
      <Grid>
        <Grid.Column computer={10} mobile={16}>
          <EventDetailHeader event={event} />
          <EventDetailInfo event={event} />
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6} only="computer">
          <EventDetailSideBar event={event} />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={16} only="tablet mobile">
          <EventDetailSideBar event={event} />
        </Grid.Column>
      </Grid>
    </>
  );
}
