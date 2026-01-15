import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EmptyProps {
    title?: string;
    description?: string;
    showAction?: boolean;
    className?: string;
}

export const Empty = ({
    title = "Không tìm thấy sản phẩm",
    description = "Hiện tại danh mục này chưa có sản phẩm nào. Vui lòng quay lại sau hoặc khám phá các danh mục khác.",
    showAction = true,
    className
}: EmptyProps) => {
    return (
        <div className={cn(
            "flex min-h w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-100 bg-zinc-50/50 p-8 text-center",
            className
        )}>
            {/* Hình ảnh minh họa */}
            <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-red-100 blur-2xl opacity-40" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-zinc-100">
                    <ShoppingBag size={32} className="text-zinc-300" strokeWidth={1.5} />
                </div>
            </div>

            {/* Nội dung */}
            <h3 className="mb-2 text-lg font-semibold text-zinc-800">
                {title}
            </h3>
            <p className="mx-auto mb-8 max-w-[350px] text-sm text-zinc-500 leading-relaxed">
                {description}
            </p>

            {/* Nút quay lại */}
            {showAction && (
                <Link
                    to="/"
                    className="group flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 transition-all rounded-full px-6 py-2.5 text-sm font-medium"
                >
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Quay lại cửa hàng
                </Link>
            )}
        </div>
    );
};