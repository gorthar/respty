import ModalWrapper from "../joint_graund/modals/ModalWrapper";
import { useAppSelector } from "../store/store";

export default function TestModal() {
  const { data } = useAppSelector((state) => state.modals);
  return (
    <ModalWrapper header={"Test 123"} size="mini">
      <div>TestModal {data}</div>
    </ModalWrapper>
  );
}
