import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col min-h-screen">
            {/* Banner ở trên */}
            <Banner />
            {/* Header menu ở dưới banner */}
            <Header />
            <main className="flex-1 bg-background">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;