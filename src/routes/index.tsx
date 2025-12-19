import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Home } from "@/views/Home";
import { NotFoundPage } from "@/views/errors/NotFoundPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
                element: <ProtectedRoute>
                    <div>
                        <h1>Cart</h1>
                    </div>
                </ProtectedRoute>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export const router = createBrowserRouter(routes);