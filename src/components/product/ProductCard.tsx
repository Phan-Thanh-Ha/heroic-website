import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Định nghĩa lại Interface cho khớp với dữ liệu Repository trả về
interface ProductCardProps {
    product: {
        id: number;
        name: string;
        slug: string;
        image: string;      // Ảnh lấy từ tấm đầu tiên
        minPrice: number;   // Giá thấp nhất tính từ các biến thể
        totalStock: number; // Tổng kho của các biến thể
        discount?: number;  // % giảm giá (nếu có)
    };
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const isOutOfStock = product.totalStock <= 0;

    return (
        <Link 
            to={`/products/${product.slug}`}
            className="group relative block overflow-hidden rounded-2xl h-full transition-all border border-zinc-200 hover:shadow-xl hover:-translate-y-1 bg-white"
        >
            <div className="relative z-20 p-4 h-full flex flex-col">
                {/* Badge Flash Sale */}
                <div className="absolute top-4 left-4 z-30">
                    {product.discount && product.discount > 0 && (
                        <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 italic shadow-sm">
                            <Zap size={10} fill="currentColor" /> SALE -{product.discount}%
                        </div>
                    )}
                </div>

                {/* Badge Trạng thái kho */}
                <div className="absolute top-2 right-2 z-30 flex flex-col gap-1 items-end">
                    {isOutOfStock && (
                        <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 border-none text-[10px]">Tạm hết hàng</Badge>
                    )}
                </div>

                {/* Ảnh Sản phẩm */}
                <div className="aspect-square mb-4 flex items-center justify-center p-2 relative">
                    <img
                        src={product.image || '/placeholder-product.png'} // Fallback nếu không có ảnh
                        alt={product.name}
                        className={`object-contain h-full w-full transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col flex-grow text-left">
                    <h2 className="text-zinc-700 text-sm font-medium leading-snug line-clamp-2 mb-2 h-10 group-hover:text-red-600 transition-colors">
                        {product.name}
                    </h2>
                    
                    <div className="mt-auto">
                        <div className="flex flex-col">
                            <span className="text-zinc-400 text-[10px] mb-0.5">Giá chỉ từ:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-red-600 font-bold text-lg">
                                    {product.minPrice > 0 ? product.minPrice.toLocaleString() : "Liên hệ"}đ
                                </span>
                            </div>
                        </div>
                        
                        {/* Rating & Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-zinc-100">
                            <div className="flex text-orange-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} fill={i < 5 ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="text-[10px] text-zinc-400">Đã bán {Math.floor(Math.random() * 100)}+</span>
                        </div>
                    </div>
                </div>

                {/* Hiệu ứng viền chạy nếu đang có khuyến mãi lớn */}
                {product.discount && product.discount >= 10 && (
                    <BorderBeam size={200} duration={3} colorFrom="#ef4444" colorTo="#fbbf24" />
                )}
            </div>
        </Link>
    );
}