import { useEffect } from "react";
import { QueryOptions } from "../../app/hooks/firestore/types";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "../../app/store/eventSlice";
import { useAppSelector } from "../../app/store/store";
import EventListItemPlaceholder from "../events/dashboard/EventListItemPlaceholder";
import EventList from "../events/dashboard/EventList";

type Props = {
  which: string;
  id: string;
};
export default function ProfileEventItems({ which, id }: Props) {
  const { loadCollection } = useFireStore("events");
  const { data: events, status } = useAppSelector(
    (state) => state.eventsConfig
  );

  let q: QueryOptions[];
  switch (which) {
    case "Past":
      q = [
        {
          attribute: "attendeesIds",
          operator: "array-contains",
          value: id,
        },
        { attribute: "date", operator: "<=", value: new Date() },
      ];
      break;
    case "Future":
      q = [
        {
          attribute: "attendeesIds",
          operator: "array-contains",
          value: id,
        },
        { attribute: "date", operator: ">=", value: new Date() },
      ];
      break;
    case "Hosted":
      q = [{ attribute: "hostUid", operator: "==", value: id }];
      break;
    default:
      q = [
        {
          attribute: "attendeesIds",
          operator: "array-contains",
          value: id,
        },
        { attribute: "date", operator: "<=", value: new Date() },
      ];
      break;
  }
  useEffect(() => {
    loadCollection(actions, {
      queries: q,
    });
  }, []);

  return (
    <>
      {status === "loading" ? (
        <>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
        </>
      ) : (
        <EventList events={events} />
      )}
    </>
  );
}
