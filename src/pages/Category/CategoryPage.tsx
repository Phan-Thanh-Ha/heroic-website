import { categoryStore } from "@/store/categoryStore";
import { productStore } from "@/store/productStore";
import type { ICategory } from "@/types";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CategoryPage: React.FC = observer(() => {
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get("category");

    const { categories } = categoryStore;
    const { products } = productStore;

    useEffect(() => {
        categoryStore.getCategoryList();
        if (categorySlug) {
            // Load products by category
            productStore.getProductList({ category: categorySlug });
        }
    }, [categorySlug]);

    // Tìm category theo slug
    const category = categories.find((cat: ICategory) => cat.slug === categorySlug);
    const categoryProducts = categorySlug && category ? category.products : [];

    return (
        <div className="w-full min-h-screen bg-[#F8F9FA] py-8">
            <div className="max-w-7xl mx-auto px-4">
                {category ? (
                    <>
                        {/* Tiêu đề danh mục */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-black text-zinc-800 uppercase tracking-tighter italic mb-2">
                                {category.name}
                            </h1>
                            {category.banner && (
                                <div className="w-full rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={category.banner}
                                        alt={category.name}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Danh sách sản phẩm */}
                        {categoryProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {/* {categoryProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))} */}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-zinc-500">Không có sản phẩm nào trong danh mục này.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-zinc-500">Danh mục không tồn tại.</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default CategoryPage;
