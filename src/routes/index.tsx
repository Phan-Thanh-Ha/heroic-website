import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/cart",
                element: <div>
                    <h1>Cart</h1>
                </div>,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },

    {
        path: "*",
        element: <div>
            <h1>404</h1>
        </div>,
    },
];

export const router = createBrowserRouter(routes);