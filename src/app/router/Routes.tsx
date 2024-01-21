import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailPage from "../../features/events/details/EventDetailPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../scratch/Scratch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <EventDashboard />,
      },
      {
        path: "/events/:id",
        element: <EventDetailPage />,
      },
      {
        path: "/manage/:id",
        element: <EventForm />,
      },

      {
        path: "/createEvent",
        element: <EventForm key="create" />,
      },

      {
        path: "/scratch",
        element: <Scratch />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/profiles/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);
