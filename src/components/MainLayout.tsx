import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout className="min-h-screen flex flex-col">
            <Header />
            <Content className="flex-1 bg-white p-4 pt-10">
                <div className="min-h-[800px]">
                    <Outlet />
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};

export default MainLayout;