import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import type { IWard } from '@/types/wards'
import { locationStore } from '@/store'

interface WardSelectProps {
    onValueChange?: (item: any) => void
    value?: any
    districtId?: number
    disabled?: boolean
}

export const WardSelect = observer(({ onValueChange, value, districtId, disabled }: WardSelectProps) => {
    const { wards, resetWards } = locationStore
    const [isOpen, setIsOpen] = useState(false)

    // Fetch wards khi districtId thay đổi
    useEffect(() => {
        if (!districtId) {
            setIsOpen(false)
            return
        }

        // Tìm district code từ districtId trong store
        const district = locationStore.districts.find((d) => d.id === districtId)
        if (district) {
            locationStore.getWardsByDistrictCode(district.code)
        }
    }, [districtId])

    // Reset form value khi resetWards = true (chọn district mới)
    useEffect(() => {
        if (resetWards && onValueChange) {
            onValueChange(null)
        }
    }, [resetWards]) 

    // Tự động mở Select khi wards đã load xong và chưa chọn
    useEffect(() => {
        if (!resetWards && wards.length > 0 && !disabled && !value) {
            const timer = setTimeout(() => setIsOpen(true), 100)
            return () => clearTimeout(timer)
        }
        if (resetWards || !districtId) {
            setIsOpen(false)
        }
    }, [resetWards, wards.length, disabled, value, districtId])


    // Xử lý khi user chọn ward
    const handleChange = (wardIdStr: string) => {
        const ward = wards.find((w: IWard) => w.id.toString() === wardIdStr)
        onValueChange?.(ward)
    }

    const isDisabled = disabled || !districtId

    return (
        <Select 
            onValueChange={handleChange} 
            open={isOpen}
            onOpenChange={setIsOpen}
            disabled={isDisabled}
        >
            <SelectTrigger>
                <SelectValue placeholder="Chọn phường/xã" />
            </SelectTrigger>
            
            <SelectContent className="max-h-[300px]">
                {!districtId ? (
                    <SelectItem value="empty" disabled>Vui lòng chọn quận/huyện trước</SelectItem>
                ) : wards.length > 0 ? (
                    wards.map((ward: IWard) => (
                        <SelectItem key={ward.id} value={ward.id.toString()}>
                            {ward.name_with_type}
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem value="loading" disabled>
                        {resetWards ? "Đang tải..." : "Không có dữ liệu"}
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    )
})

