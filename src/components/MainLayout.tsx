import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col min-h-screen">
            <Banner />
            <Header />
            <main className="flex-1 bg-background min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;