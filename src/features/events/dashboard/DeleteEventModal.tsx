import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import ModalWrapper from "../../../app/joint_graund/modals/ModalWrapper";
import { AppEvent } from "../../../app/types/events";
import { deleteEvent } from "../../../app/store/eventSlice";
import { closeModal } from "../../../app/joint_graund/modals/modalSlice";

export default function DeleteModal() {
  const { data } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  function handleDeleteEvent(event: AppEvent) {
    console.log("delete event");
    dispatch(deleteEvent(event.id));
    dispatch(closeModal());
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
        <Button negative onClick={() => handleDeleteEvent(data)}>
          Delete
        </Button>
      </div>
    </ModalWrapper>
  );
}
