import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { AppEvent } from "../../../app/types/events";
import { useEffect, useState } from "react";
import { actions } from "../../../app/store/eventSlice";


export default function EventDashboard() {
  const {data :events} = useAppSelector((state) => state.eventsConfig);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const events: AppEvent[] = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() } as AppEvent);
        });
        dispatch(actions.success(events));
        setLoading(false);
      },
      error: (error) => {
        console.log(error), setLoading(false);
      },
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <LoadingComponent />;

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
