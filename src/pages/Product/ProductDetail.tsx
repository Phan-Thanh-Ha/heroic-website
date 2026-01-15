import NavigationHeader from "@/components/NavigationHeader";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cartStore, productStore } from "@/store";
import type { IProduct } from "@/types";
import { Loader2, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = observer(() => {
    const { slug } = useParams<{ slug: string }>();
    const { currentProduct, isLoading } = productStore;
    const navigate = useNavigate();

    // State  (mặc định lấy phần tử đầu tiên của productDetails)
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (slug) {
            productStore.fetchProductBySlug(slug);
        }
    }, [slug]);

    // Cập nhật ảnh chính khi dữ liệu về
    useEffect(() => {
        if (currentProduct && currentProduct.productImages) {
            if (currentProduct.productImages.length > 0) {
                setMainImage(currentProduct.productImages[0].image);
            }
        }
    }, [currentProduct]);

    const currentVariant = useMemo(() => {
        return (
            currentProduct?.productDetails?.[selectedVariantIndex] || null
        )
    }, [currentProduct, selectedVariantIndex]);

    // thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (type: 'cart' | 'buy-now' = 'cart') => {
        const product = {
            ...currentProduct,
            productDetails: [
                {
                    ...currentVariant,
                    quantity: quantity
                }
            ],
            productImages: [
                {
                    ...currentProduct?.productImages?.[0],
                    quantity: quantity
                }
            ]
        }
        cartStore.addToCart(product as IProduct); // thêm sản phẩm vào giỏ hàng
        if (type === 'buy-now') {
            navigate('/cart')
        }
    }



    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-red-600" />
                <p className="font-black italic text-xl uppercase tracking-tighter">Loading Product...</p>
            </div>
        );
    }

    if (!currentProduct) return <div className="p-20 text-center">Sản phẩm không tồn tại.</div>;

    return (
        <div className="bg-white min-h-screen text-zinc-900">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <NavigationHeader title={currentProduct.name} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- CỘT TRÁI: HÌNH ẢNH --- */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="relative group rounded-3xl border border-zinc-100 p-10 flex items-center justify-center bg-zinc-50 overflow-hidden aspect-square">
                            <img
                                src={mainImage || currentProduct.image}
                                alt={currentProduct.name}
                                className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110 z-10"
                            />
                            <BorderBeam size={400} duration={12} colorFrom="#ef4444" colorTo="#fbbf24" />
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {currentProduct.productImages?.map((img: any) => (
                                <div
                                    key={img.id}
                                    onClick={() => setMainImage(img.image)}
                                    className={`aspect-square border-2 rounded-xl p-2 cursor-pointer transition-all bg-white ${mainImage === img.image ? 'border-red-500 shadow-md' : 'border-zinc-100'}`}
                                >
                                    <img src={img.image} alt="gallery" className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: THÔNG TIN --- */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div>
                            <p className="text-red-600 font-bold uppercase text-xs tracking-[0.2em] mb-2">Mã SP: {currentProduct.code}</p>
                            <h1 className="text-4xl font-black text-zinc-900 leading-[1.1] uppercase italic tracking-tighter mb-4">
                                <SparklesText>{currentProduct.name}</SparklesText>
                            </h1>
                            <div className="flex items-center gap-4 text-sm font-bold text-zinc-500">
                                <span className="bg-zinc-100 px-3 py-1 rounded-md">SIZE: {currentVariant?.size}</span>
                                <span className="bg-zinc-100 px-3 py-1 rounded-md">FLAVOR: {currentVariant?.flavor}</span>
                            </div>
                        </div>

                        {/* GIÁ CẢ (Lấy từ biến thể được chọn) */}
                        <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-black text-red-600 tracking-tighter">
                                    {currentVariant?.retailPrice?.toLocaleString()}đ
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-zinc-400 line-through text-sm font-medium">
                                        {currentVariant?.importPrice?.toLocaleString()}đ
                                    </span>
                                    <Badge className="bg-red-500 text-white w-fit text-xs font-bold border-none">-20% OFF</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-black text-sm uppercase tracking-wider">Chọn phiên bản:</p>
                            <div className="flex flex-wrap gap-3">
                                {currentProduct.productDetails?.map((detail: any, index: number) => (
                                    <button
                                        key={detail.id}
                                        onClick={() => setSelectedVariantIndex(index)}
                                        className={`px-4 py-3 rounded-xl text-xs font-black transition-all border-2 text-left
                                            ${selectedVariantIndex === index
                                                ? 'border-red-500 bg-red-50 text-red-600 shadow-sm'
                                                : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-300'}`}
                                    >
                                        <div className="uppercase">{detail.flavor}</div>
                                        <div className="opacity-60">{detail.size}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* QUANTITY & ACTIONS */}
                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            <div className="flex items-center border-2 border-zinc-100 rounded-xl w-fit bg-white">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:text-red-600"><Minus size={18} /></button>
                                <span className="w-10 text-center font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:text-red-600"><Plus size={18} /></button>
                            </div>

                        </div>
                        <div className="grid grid-cols-1 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1 md:gap-4 lg:grid-cols-3 lg:grid-rows-1 lg:gap-4">
                            <div className="col-start-1 col-span-1 row-start-1 row-span-1 md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1 text-white flex items-center justify-content font-semibold rounded">
                                <RainbowButton
                                    variant="default"
                                    className="w-full"
                                    size="lg"
                                    onClick={() => {
                                        handleAddToCart('cart')
                                    }}
                                >
                                    <ShoppingCart size={20} className="animate-bounce" />
                                    <span>Thêm vào giỏ hàng</span>
                                </RainbowButton>
                            </div>
                            <div className="col-start-1 col-span-1 row-start-2 row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1  text-white flex items-center justify-content font-semibold rounded">
                                <RainbowButton
                                    onClick={() => {
                                        handleAddToCart('buy-now')
                                    }}
                                    className="w-full"
                                    variant="outline"
                                    size="lg"
                                >
                                    <Zap size={20} className="animate-bounce" />
                                    <span>Mua ngay</span>
                                </RainbowButton>

                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TABS --- */}
                <div className="mt-20">
                    <Tabs defaultValue="description">
                        <TabsList className="w-full justify-start border-b rounded-none h-14 bg-transparent p-0 gap-8">
                            <TabsTrigger value="description" className="data-[state=active]:border-red-600 border-b-4 border-transparent rounded-none h-full text-lg font-black uppercase italic">Mô tả sản phẩm</TabsTrigger>
                            <TabsTrigger value="nutrition" className="data-[state=active]:border-red-600 border-b-4 border-transparent rounded-none h-full text-lg font-black uppercase italic">Nutrition Facts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="py-10">
                            {/* Xử lý Render HTML từ Database */}
                            <div
                                className="prose prose-zinc max-w-4xl prose-img:rounded-3xl prose-a:text-red-600 font-medium text-zinc-600"
                                dangerouslySetInnerHTML={{ __html: currentProduct.description }}
                            />
                        </TabsContent>


                    </Tabs>
                </div>
            </div>
        </div>
    );
});

export default ProductDetailPage;