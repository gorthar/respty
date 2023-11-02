import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailPage from "../../features/events/details/EventDetailPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../scratch/Scratch";

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
        element: <EventForm />,
      },
      {
        path: "/scratch",
        element: <Scratch />,
      },
    ],
  },
]);
