import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';

import Today, {
  loader as todayLoader,
  action as todayAction,
} from './pages/Today.jsx';

import Upcoming, {
  loader as upcomingLoader,
  action as upcomingAction,
} from './pages/Upcoming.jsx';

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import Cover from "./pages/Cover.jsx";
import './index.css'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [ 
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
      { path: "upcoming", element: <Upcoming />, loader: upcomingLoader, action: upcomingAction },
      { path: "today", element: <Today />, loader: todayLoader, action: todayAction }, 
      { path: "calendar", element: <CalendarPage /> },
      { path: "cover", element: <Cover /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
