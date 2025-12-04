import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <div>Home</div>,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);