import BrandBanner from "@/components/BrandBanner";
import CategoryBanner from "@/components/CategoryBanner";
import { CategorySection } from "@/components/product/CategorySection";
import ProductBanner from "@/components/ProductBanner";
import { categoryStore } from "@/store/categoryStore";
import type { ICategory } from "@/types";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

const Home: React.FC =  observer(() => {
    const { categories } = categoryStore;
    useEffect(() => {
        categoryStore.getCategoryList();
    }, []);
    return (
        <div className="w-full">
            {/* Product Banner với carousel */}
            <ProductBanner />

            {/* Category Banner */}
            <CategoryBanner />

            {/* Brand Banner */}
            <BrandBanner />

            {/* Nội dung trang Home */}
            <div className="bg-[#F8F9FA] min-h-screen">
                {categories.map((cat: ICategory) => (
                    <CategorySection
                        key={cat.id}
                        category={cat}
                        products={cat.products}
                    />
                ))}
            </div>
        </div>
    );
});

export default Home;

