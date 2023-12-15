import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import ModalWrapper from "../../../app/joint_graund/modals/ModalWrapper";
import { AppEvent } from "../../../app/types/events";
import { deleteEvent } from "../../../app/store/eventSlice";
import { closeModal } from "../../../app/joint_graund/modals/modalSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { toast } from "react-toastify";
import { useState } from "react";

export default function DeleteModal() {
  const { data } = useAppSelector((state) => state.modals);
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();

   async function handleDeleteEvent(event: AppEvent) {
    setLoading(true);
    console.log("delete event");
    try {
      await deleteDoc(doc(db, "events", event.id));
      dispatch(closeModal());
    } catch (error : any) {
      console.log(error.message)
      toast.error("Something has gone wrong wit deleting the event")
    }
    finally{
      setLoading(false)
    }
    
    
  }
  return (
    <ModalWrapper header={"Coution, this event will be deleted!"} size="tiny">
      <p
        style={{
          marginBottom: "50px",
          marginTop: "20px",
          fontSize: `15px`,
          lineHeight: `35px`,
          textAlign: `center`,
        }}
      >
        By clicking delete you will delete this event permanently. Are you sure
        to delete this event?
      </p>
      <div
        className="flex"
        style={{ justifyContent: "space-between", marginTop: "10px" }}
      >
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button loading={loading} negative onClick={() => handleDeleteEvent(data)}>
          Delete
        </Button>
      </div>
    </ModalWrapper>
  );
}
