import "./style.css";
import { Container } from "semantic-ui-react";

import NavBar from "./nav/NavBar";

import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../joint_graund/modals/ModalManager";

function App() {
  const location = useLocation();
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
