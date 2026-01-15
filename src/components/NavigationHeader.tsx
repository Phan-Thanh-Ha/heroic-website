import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from 'react';

interface NavigationHeaderProps {
    title: string;
    backText?: string;
    // Thêm option này nếu sau này bạn muốn có nút phụ bên phải (ví dụ: nút "Xóa tất cả")
    rightElement?: React.ReactNode;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    title,
    backText = "Quay lại",
    rightElement
}) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 w-full">
            {/* Nút quay lại - Sử dụng group để tạo hiệu ứng khi hover */}
            <Button
                variant="ghost"
                className="mb-4 px-0 hover:bg-transparent group flex items-center text-zinc-500 hover:text-zinc-800 transition-colors"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">{backText}</span>
            </Button>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight">
                    {title}
                </h1>
                {rightElement && (
                    <div>{rightElement}</div>
                )}
            </div>
        </div>
    );
};

export default NavigationHeader;