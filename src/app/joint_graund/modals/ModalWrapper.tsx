import { Modal, ModalProps } from "semantic-ui-react";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeModal } from "./modalSlice";

type Props = {
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
  header?: string;
  dimmer?: "blurring" | "inverted";
  children: React.ReactNode;
} & ModalProps;

function ModalWrapper({ header, children, size, dimmer, ...props }: Props) {
  const { open } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeModal())}
      size={size}
      dimmer={dimmer}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default ModalWrapper;
