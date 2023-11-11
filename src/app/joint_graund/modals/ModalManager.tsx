import LoginForm from "../../../features/auth/LoginForm";
import DeleteEventModal from "../../../features/events/dashboard/DeleteEventModal";
import TestModal from "../../scratch/TestModal";
import { useAppSelector } from "../../store/store";

export default function ModalManager() {
  const ModalLookup = {
    TestModal,
    LoginForm,
    DeleteEventModal,
  };
  const { modalType, data, open } = useAppSelector((state) => state.modals);

  let renderedModal;

  if (modalType && open) {
    const ModalComponent = (ModalLookup as any)[modalType];
    renderedModal = <ModalComponent data={data} />;
  }

  return <div>{renderedModal}</div>;
}
