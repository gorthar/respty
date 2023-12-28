import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { useAppSelector } from "../../store/store";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logout());
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        toast.error(error.message);
      });
    navigate("/");
  }

  function goToAccount() {
    navigate("/account");
  }

  return (
    <>
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={currentUser?.photoURL || "/user.png"}
        />
        <Dropdown pointing="top left" text={currentUser?.displayName ?? "User"}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/createEvent"
              text="Create Event"
              icon="plus"
            />
            <Dropdown.Item
              text="My profile"
              icon="user"
              onClick={() => goToAccount()}
            />
            <Dropdown.Item
              text="Sign out"
              icon="power"
              onClick={() => handleSignOut()}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
