import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import ModalWrapper from "../../../app/joint_graund/modals/ModalWrapper";
import { AppEvent } from "../../../app/types/events";

import { closeModal } from "../../../app/joint_graund/modals/modalSlice";

import { useState } from "react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

export default function DeleteModal() {
  const { data } = useAppSelector((state) => state.modals);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { deleteDocument } = useFireStore("events");
  function handleDeleteEvent(event: AppEvent) {
    setLoading(true);
    deleteDocument(event.id);
    dispatch(closeModal());
    setLoading(false);
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
        <Button
          loading={loading}
          negative
          onClick={() => handleDeleteEvent(data)}
        >
          Delete
        </Button>
      </div>
    </ModalWrapper>
  );
}
