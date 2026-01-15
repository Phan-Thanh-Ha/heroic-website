import { ProductCard } from "./components/ProductCard";
import ProductBanner from "../../components/product/ProductBanner";
import { productStore } from "@/store/productStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const ProductPage: React.FC = observer(() => {
    const { products } = productStore;

    useEffect(() => {
        productStore.fetchProducts();
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#F8F9FA]">
            {/* Product Banner */}
            <ProductBanner />

            {/* Danh sách sản phẩm */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-black text-zinc-800 uppercase tracking-tighter italic mb-6">
                    Tất cả sản phẩm
                </h1>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-zinc-500">Không có sản phẩm nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ProductPage;
