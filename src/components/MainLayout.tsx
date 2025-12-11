import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout className="h-full w-full"> 
            <Header />

            <Content className="flex-1 bg-white p-50 pt-5">
                <div className="min-h-[800px] justify-center">
                    <Outlet />
                </div>
            </Content>

            <Footer />
        </Layout>
    );
};

export default MainLayout;