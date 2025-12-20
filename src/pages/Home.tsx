import React from "react";
import ProductBanner from "@/components/ProductBanner";
import CategoryBanner from "@/components/CategoryBanner";
import BrandBanner from "@/components/BrandBanner";

const Home: React.FC = () => {
    return (
        <div className="w-full">
            {/* Product Banner với carousel */}
            <ProductBanner />

            {/* Category Banner */}
            <CategoryBanner />

            {/* Brand Banner */}
            <BrandBanner />

            {/* Nội dung trang Home */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Chào mừng đến với Heroic</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Trang chủ của bạn sẽ được hiển thị ở đây.
                </p>
            </div>
        </div>
    );
};

export default Home;

