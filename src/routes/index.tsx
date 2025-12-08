import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Home } from "@/views/Home";
const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);