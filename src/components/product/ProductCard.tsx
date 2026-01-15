import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import type { IProduct } from "@/types";
import { Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
    product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Lấy thông tin detail đầu tiên để hiển thị (tránh lỗi nếu mảng trống)
    const detail = product.productDetails?.[0];
    const retailPrice = detail?.retailPrice ?? 0;
    const discount = detail?.discount ?? 0;
    const isOutOfStock = detail?.isOutOfStock ?? false;

    return (
        <Link
            to={`/products/${product.slug}`}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
        >
            {/* 1. Phần Ảnh sản phẩm - Cố định tỉ lệ vuông */}
            <div className="relative aspect-square w-full overflow-hidden bg-white p-4 flex items-center justify-center">
                {/* Badge Khuyến mãi */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 z-30">
                        <div className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 italic text-[10px] font-bold text-white shadow-sm">
                            <Zap size={10} fill="currentColor" /> SALE -{discount}%
                        </div>
                    </div>
                )}

                {/* Badge Trạng thái kho */}
                {isOutOfStock && (
                    <div className="absolute top-3 right-3 z-30">
                        <Badge variant="secondary" className="border-none bg-zinc-100 text-[10px] text-zinc-500">
                            Tạm hết hàng
                        </Badge>
                    </div>
                )}

                <img
                    src={product.image || '/placeholder-product.png'}
                    alt={product.name}
                    className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 ${
                        isOutOfStock ? 'grayscale opacity-60' : ''
                    }`}
                />
            </div>

            <div className="flex grow flex-col p-4 pt-0">
                <div className="mb-2 min-h-[40px]">
                    <h2 className="line-clamp-2 text-sm font-medium leading-snug text-zinc-700 transition-colors group-hover:text-red-600">
                        {product.name}
                    </h2>
                </div>

                <div className="flex grow flex-col justify-end">
                    <span className="text-[10px] text-zinc-400">Giá chỉ từ:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                            {retailPrice > 0 ? retailPrice.toLocaleString() : "Liên hệ"}đ
                        </span>
                    </div>
                </div>

                {/* 3. Footer (Rating & Đã bán) - Luôn nằm sát đáy và thẳng hàng ngang */}
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-zinc-100 pt-3">
                    <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-[10px] text-zinc-400">
                        Đã bán {Math.floor(Math.random() * 50) + 50}+
                    </span>
                </div>
            </div>

            {/* Hiệu ứng BorderBeam khi giảm giá mạnh */}
            {discount >= 10 && (
                <BorderBeam size={200} duration={3} colorFrom="#ef4444" colorTo="#fbbf24" />
            )}

            {/* Vạch kẻ trang trí ở đáy - Thẳng hàng tuyệt đối */}
            <div className="absolute bottom-0 left-0 h-1 w-full translate-y-1 bg-red-600 transition-transform duration-300 group-hover:translate-y-0" />
        </Link>
    );
}