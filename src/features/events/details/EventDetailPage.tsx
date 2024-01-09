import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSideBar from "./EventDetailSideBar";
import { useAppSelector } from "../../../app/store/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { actions } from "../../../app/store/eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

export default function EventDetailPage() {
  const { id } = useParams();
  const { loadDocument } = useFireStore("events");
  const event = useAppSelector((state) =>
    state.eventsConfig.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.eventsConfig);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === "loading") return <LoadingComponent />;
  if (!event) return <h1>Event not found</h1>;

  return (
    <>
      <Grid>
        <Grid.Column computer={10} mobile={16}>
          <EventDetailHeader event={event} />
          <EventDetailInfo event={event} />
          <EventDetailChat event={event} />
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
