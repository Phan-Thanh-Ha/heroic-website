import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { locationApi } from '@/api/location.api'
import { useEffect, useState, useCallback } from 'react'
import type { IProvince } from '@/types/province.type'

interface ProvinceSelectProps {
    onValueChange?: (item: IProvince | null) => void
    value?: any
    placeholder?: string
    className?: string
    disabled?: boolean
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({ 
    onValueChange, 
    value,
    placeholder = "Chọn tỉnh/thành phố",
    className,
    disabled
}) => {
    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [loading, setLoading] = useState(false)

    const fetchProvinces = useCallback(async () => {
        setLoading(true)
        try {
            const response = await locationApi.getAllProvinces()
            if (response.success) {
                setProvinces(response.data.items || [])
            }
        } catch (error) {
            console.error("Error fetching provinces:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProvinces()
    }, [fetchProvinces])

    // Tìm province theo ID và lấy code để hiển thị (vì SelectItem dùng code làm value)
    const displayValue = value && provinces.length > 0 
        ? provinces.find((p: IProvince) => p.id === value)?.code 
        : undefined

    const handleChange = (selectedCode: string) => {
        const selectedItem = provinces.find(p => p.code === selectedCode)
        onValueChange?.(selectedItem || null)
    }

    return (
        <div className={className}>
            <Select 
                onValueChange={handleChange}
                value={displayValue}
                disabled={disabled}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={loading ? "Đang tải..." : placeholder} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                    {loading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Đang tải...</div>
                    ) : provinces.length > 0 ? (
                        provinces.map((province) => (
                            <SelectItem key={province.id} value={province.code}>
                                {province.name}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="empty" disabled>Không có dữ liệu</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}
export default ProvinceSelect;