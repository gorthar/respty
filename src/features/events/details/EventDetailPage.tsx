import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSideBar from "./EventDetailSideBar";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { setEvents } from "../../../app/store/eventSlice";
import { toast } from "react-toastify";
import { db } from "../../../app/config/firebase";

export default function EventDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const event = useAppSelector((state) =>
    state.eventsConfig.events.find((e) => e.id === id)
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "events", id), {
      next: (doc) => {
        dispatch(setEvents({ id: doc.id, ...doc.data() }));
        setLoading(false);
      },
      error: (error) => {
        console.log(error);
        setLoading(false);
        toast.error("Problem loading event: " + error.message);
      },
    });
    return () => unsubscribe();
  }),
    [id];

  if (loading) return <LoadingComponent />;
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
