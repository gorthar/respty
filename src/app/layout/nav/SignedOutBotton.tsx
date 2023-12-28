import { Button, Menu } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../joint_graund/modals/modalSlice";

export default function SignedOutBotton() {
  const dispatch = useAppDispatch();
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Login"
        style={{ marginRight: "5px" }}
        onClick={() =>
          dispatch(openModal({ modalType: "LoginForm", size: "mini" }))
        }
      />
      <Button
        basic
        inverted
        content="Register"
        onClick={() => {
          dispatch(openModal({ modalType: "RegisterForm", size: "mini" }));
        }}
      />
    </Menu.Item>
  );
}
