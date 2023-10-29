import { Button, Menu } from "semantic-ui-react";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export default function SignedOutBotton({ setIsLoggedIn }: Props) {
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Login"
        style={{ marginRight: "5px" }}
        onClick={() => setIsLoggedIn(true)}
      />
      <Button basic inverted content="Register" />
    </Menu.Item>
  );
}
