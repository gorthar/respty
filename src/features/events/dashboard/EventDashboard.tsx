import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import { actions } from "../../../app/store/eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";


export default function EventDashboard() {
  const {data :events ,status} = useAppSelector((state) => state.eventsConfig);
  const {loadCollection} = useFireStore('events')

  useEffect(() => {
    loadCollection(actions)
  }, [loadCollection]);
  console.log(events)
  if (status === "loading") return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
