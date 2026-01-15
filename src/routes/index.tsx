import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import ProductDetailPage from "@/pages/Product/ProductDetail";
import CartPage from "@/pages/Cart/CartPage";
import CategoryPage from "@/pages/Category/CategoryPage";

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
                path: "/products/:slug",
                element: <ProductDetailPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/products",
                element: <CategoryPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
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