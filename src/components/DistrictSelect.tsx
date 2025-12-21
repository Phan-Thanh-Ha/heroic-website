import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import type { IDistrict } from '@/types/district'
import { locationStore } from '@/store'

interface DistrictSelectProps {
    onValueChange?: (item: IDistrict | null) => void;
    value?: number; // Nhận ID từ Form (vì schema của bạn là number)
    disabled?: boolean;
    loading?: boolean;
}

export const DistrictSelect = observer(({ onValueChange, value, disabled, loading }: DistrictSelectProps) => {
    const { districts, resetDistricts } = locationStore
    const [isOpen, setIsOpen] = useState(false)

    // Tự động mở Select khi districts đã load xong và chưa chọn
    useEffect(() => {
        if (!resetDistricts && districts.length > 0 && !disabled && !value) {
            const timer = setTimeout(() => setIsOpen(true), 100)
            return () => clearTimeout(timer)
        }
        if (resetDistricts) {
            setIsOpen(false)
        }
    }, [resetDistricts, districts.length, disabled, value])


    const handleChange = (code: string) => {
        const district = districts.find((d: IDistrict) => d.code === code)
        if (district) {
            onValueChange?.(district)
        }
    }

    return (
        <Select 
            onValueChange={handleChange}
            open={isOpen}
            onOpenChange={setIsOpen}
            disabled={disabled || loading}
        >
            <SelectTrigger>
                <SelectValue placeholder={loading ? "Đang tải..." : "Chọn Quận / Huyện"} />
            </SelectTrigger>
            
            <SelectContent className="max-h-[300px]">
                {districts.length > 0 ? (
                    districts.map((district: IDistrict) => (
                        <SelectItem key={district.id} value={district.code}>
                            {district.name_with_type}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-4 text-sm text-center text-muted-foreground">
                        Không có dữ liệu
                    </div>
                )}
            </SelectContent>
        </Select>
    )
})