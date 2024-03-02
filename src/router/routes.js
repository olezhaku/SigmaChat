import Error from "../pages/Error/Error";
import { Navigate } from "react-router";
import Feedback from "../pages/Feedback/Feedback";
import Posts from "../pages/Posts/Posts";

export const privateRoutes = [
    { path: "/posts", element: <Posts /> },
    { path: "/error", element: <Error /> },
    { path: "*", element: <Navigate to="/error" /> },
    { path: "/", element: <Navigate to="/posts" /> },
];

// export const publicRoutes = [
//     { path: "/error", element: <Error /> },
//     { path: "*", element: <Navigate to="/error" /> },
//     { path: "/", element: <Navigate to="/login" /> },
//     { path: "/login", element: <Login /> },
//     { path: "/about", element: <Navigate to="/login" /> },
//     { path: "/posts", element: <Navigate to="/login" /> },
// ];
