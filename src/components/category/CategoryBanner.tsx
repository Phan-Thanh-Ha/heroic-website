import { ArrowRight } from "lucide-react";
import type { ICategory, } from "@/types";
import { useNavigate } from "react-router-dom";

export interface ICategoryBannerProps {
    category: ICategory;
}

export const CategoryBanner: React.FC<ICategoryBannerProps> = ({ category }) => {
    const navigate = useNavigate();

    // Chuyển đến trang danh mục
    const handleViewAll = () => {
        navigate(`/products?category=${category.slug}`);
    }

    return (
        <>
            {/* Tiêu đề danh mục */}
            <div className="flex justify-between items-baseline mb-4 flex-col md:flex-row">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tighter italic">
                        {category.name}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleViewAll} className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"><span>Xem tất cả</span> <ArrowRight size={10} fill="currentColor" /></button>
                </div>
            </div>

            {/* Banner ngang lớn */}
            <div className="w-full mb-6 rounded-xl overflow-hidden shadow-md">
                <img src={category.banner} alt={category.name} className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500" />
            </div>
        </>
    );
}
