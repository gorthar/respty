# React + TypeScript + Vite
Live demo: https://revently-myreven.web.app/




## Features

*   User Authentication and Account Management: The app supports user authentication, including login and registration functionalities, as implemented in the authSlice (authSlice.ts) and through forms like LoginForm and RegisterForm (ModalManager.tsx). Users can manage their accounts through the AccountPage (Routes.tsx).

*   Event Management: Users can browse, create, and manage events. The EventDashboard (EventDashboard.tsx) serves as the main interface for browsing events. Event details can be viewed on the EventDetailPage (EventDetailPage.tsx), and events can be created or edited using the EventForm (Routes.tsx). There's also functionality for deleting events as seen in DeleteEventModal (ModalManager.tsx).

*   Real-time Chat: The EventDetailChat (EventDetailPage.tsx) suggests the presence of a chat feature, allowing participants of an event to communicate in real-time.

*   Profile Management: Users can view and edit their profiles through the ProfilePage (Routes.tsx), with components like ProfileAbout, ProfilePhotos, ProfileEvents, and ProfileConnections (ProfileContent.tsx) providing detailed views and interactions within a user's profile.

*   Social Networking: The application supports social networking features such as following other users and viewing followers/following lists, as indicated by the ProfileConnections component (ProfileConnections.tsx) and the followSlice (store.ts).

*   Photo Management: Users can manage photos within their profiles, as suggested by the presence of a photoSlice (store.ts).

*   Modals and UI Components: The app utilizes modals for various functionalities, managed by ModalManager (ModalManager.tsx), and employs a consistent UI framework across the application, as seen with the use of Semantic UI React components.

*   Firebase Integration: Firebase is used for backend services, including authentication and possibly for database and storage solutions, as indicated by the configuration in firebase.ts (firebase.ts).

*   State Management: The application uses Redux Toolkit for state management, organizing different aspects of the app's state into slices like eventSlice, authSlice, profileSlice, etc., as configured in the store (store.ts).

*   Routing: The app features a sophisticated routing system using React Router, with routes defined for various pages including the home page, event dashboard, event details, profile pages, and more (Routes.tsx).


