import "./style.css";
import { Container } from "semantic-ui-react";

import NavBar from "./nav/NavBar";

import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../joint_graund/modals/ModalManager";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../store/store";
import { login } from "../../features/auth/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          dispatch(login(user));
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }, [dispatch]);

  if (location.pathname === "/") {
    return <HomePage />;
  }
  return (
    <>
      <NavBar />
      <Container className="main">
        <Outlet />
      </Container>
      <ScrollRestoration />
      <ModalManager />
    </>
  );
}

export default App;
