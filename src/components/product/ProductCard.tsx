import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import type { IProduct } from "@/types";
import { Star, Zap } from "lucide-react";
import { Link } from "react-router-dom"; // Dùng Link thay vì useNavigate

export function ProductCard({ product }: { product: IProduct }) {
    return (
        <Link 
            to={`/products/${product.slug}`}
            className="group relative block overflow-hidden rounded-2xl h-full transition-all border border-zinc-200 hover:shadow-xl hover:-translate-y-1 bg-white"
        >
            <div className="relative z-20 p-4 h-full flex flex-col">

                {/* Badge Hot/Sale - z-30 để nằm trên cùng */}
                <div className="absolute top-2 right-2 z-30 flex flex-col gap-1 items-end">
                    {product.isOutOfStock && (
                        <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 border-none text-[10px]">tạm hết</Badge>
                    )}
                    {product.discount && (
                        <Badge className="bg-red-500 text-white border-none text-[10px] font-bold">-{product.discount}</Badge>
                    )}
                </div>

                {product.isFlashSale && (
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit flex items-center gap-1 mb-3 italic">
                        <Zap size={10} fill="currentColor" /> Flash Sale
                    </div>
                )}

                {/* Ảnh Sản phẩm - group-hover để tạo hiệu ứng zoom nhẹ */}
                <div className="aspect-square mb-4 flex items-center justify-center p-2 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col flex-grow text-left">
                    <h2 className="text-zinc-700 text-sm font-medium leading-snug line-clamp-2 mb-2 h-10 group-hover:text-red-600 transition-colors">
                        {product.name}
                    </h2>
                    
                    <div className="mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-red-600 font-bold text-lg">{product.retailPrice?.toLocaleString()}đ</span>
                        </div>
                        <p className="text-zinc-400 text-xs line-through mb-2">{product.importPrice?.toLocaleString()}đ</p>

                        <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-2">
                            <span className="flex text-orange-400">
                                {/* Sửa lại logic hiển thị sao dựa trên rating thực tế hoặc mặc định 5 */}
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} fill={i < (product.discount || 5) ? "currentColor" : "none"} />
                                ))}
                            </span>
                        </div>

                        <p className="text-zinc-500 text-[11px] border-t border-dashed pt-2 mt-2 flex items-center gap-1">
                            🎁 Quà trị giá {product.discount || "250.000đ"} đ
                        </p>
                    </div>
                </div>

                {/* Hiệu ứng BorderBeam cho Flash Sale */}
                {product.isFlashSale && (
                    <BorderBeam size={300} duration={3} colorFrom="#ef4444" colorTo="#fbbf24" />
                )}
            </div>
        </Link>
    );
}