import { CategoryBanner, ProductCard } from "@/components";
import BrandBanner from "@/components/BrandBanner";
import CategoryIcon from "@/components/category/CategoryIcon";
import ProductBanner from "@/components/product/ProductBanner";
import { categoryStore } from "@/store/categoryStore";
import type { ICategory, IProduct } from "@/types";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

const Home: React.FC = observer(() => {
    useEffect(() => {
        categoryStore.getCategoryList();
    }, []);

    const { categories } = categoryStore;

    return (
        <div className="w-full">
            {/* Product Banner với carousel */}
            <ProductBanner />

            {/* Category Banner */}
            <CategoryIcon />

            {/* Brand Banner */}
            <BrandBanner />

            {/* Banner Category */}
            {categories.map((item: ICategory) => (
                <section key={item.id} className="w-full container mx-auto px-4 py-8 space-y-6">
                    <div className="container mx-auto px-4">

                        <div className="mb-6">
                            <CategoryBanner category={item} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {item.products.map((product: IProduct) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                    </div>
                </section>
            ))}
        </div>
    );
});

export default Home;

