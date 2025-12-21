import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from 'react';

export default function Profile() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(
        new Date() 
        
    )
    
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))

    function getNamHienTai() {
    return new Date().getFullYear();
}

// Cách sử dụng:
console.log(getNamHienTai());
    function formatDate(date: Date | undefined) {
        if (!date) {
            return ""
        }
        return date.toLocaleDateString("Vi", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }
    function isValidDate(date: Date | undefined) {
        if (!date) {
            return false
        }
        return !isNaN(date.getTime())
    }
    return (
        <div className="w-full container mx-auto px-4 py-8 bg">
            <div className="grid grid-cols-3 gap-4">
                <div className="...">
                    <div className=" flex flex-col">
                        {/* Header User */}
                        <div className="flex items-center gap-3 pb-5 border-b border-neutral-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300">
                                <img src="https://via.placeholder.com/150" alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm truncate">vothanhluan529</span>
                                <button className="text-neutral-500 text-xs flex items-center gap-1 hover:text-orange-500">
                                    ✎ Sửa Hồ Sơ
                                </button>
                            </div>
                        </div>

                        {/* Menu List */}
                        <nav className="mt-6 space-y-4">
                            <div className="flex items-center gap-3 text-orange-600 font-medium cursor-pointer">
                                <span className="text-lg">👤</span>
                                <span className="text-sm">Tài Khoản Của Tôi</span>
                            </div>
                            <div className="pl-8 space-y-3">
                                <p className="text-orange-600 text-sm cursor-pointer">Hồ Sơ</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Ngân Hàng</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Địa Chỉ</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Đổi Mật Khẩu</p>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 cursor-pointer">
                                <span className="text-lg">📋</span>
                                <span className="text-sm">Đơn Mua</span>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="col-span-2 bg">
                    <div className="flex flex-row gap-5">

                        <div className="flex flex-col shadow-input w-full rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                                Hồ Sơ Của Tôi
                            </h2>
                            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                                Quản lý thông tin hồ sơ để bảo mật tài khoản
                            </p>

                            <form className="my-8">
                                <div className="mb-4 flex flex-row items-start gap-4">
                                    <div className="w-32 pt-2">
                                        <Label>Tên đăng nhập</Label>
                                    </div>
                                    <div className="flex-1">
                                        <Input name="fullName" placeholder="Tên đăng nhập" className="w-full" />
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-start gap-4">
                                    <div className="w-32 pt-2">
                                        <Label>Tên</Label>
                                    </div>
                                    <div className="flex-1">
                                        <Input name="firtName" placeholder="Tên" className="w-full" />
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-start gap-4">
                                    <div className="w-32 pt-2">
                                        <Label>Email</Label>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <Input
                                            readOnly
                                            name="email"
                                            placeholder="user@example.com"
                                            className="w-full cursor-not-allowed bg-neutral-50 dark:bg-neutral-900"
                                        />
                                        <p className="text-[12px] text-slate-400 mt-1.5 ml-1">
                                            Email không thể thay đổi.
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-start gap-4">
                                    <div className="w-32 pt-2">
                                        <Label>Số điện thoại</Label>
                                    </div>
                                    <div className="flex-1">
                                        <Input name="number" placeholder="số điện thoại" className="w-full" />
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-row items-start gap-4 w-full">
                                    <div className="w-32 pt-2">
                                        <Label>Giới tính</Label>
                                    </div>
                                    <div className="flex gap-6 flex-1 py-2">
                                        {['Nam', 'Nữ', 'Khác'].map((item) => (
                                            <label key={item} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={item.toLowerCase()}
                                                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                    {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date" className="px-1">
                                        Subscription Date
                                    </Label>
                                    <div className="relative flex gap-2">
                                        <Input
                                            id="date"
                                            value={value}
                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10"
                                            onChange={(e) => {
                                                const date = new Date(e.target.value)
                                                setValue(e.target.value)
                                                if (isValidDate(date)) {
                                                    setDate(date)
                                                    setMonth(date)
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowDown") {
                                                    e.preventDefault()
                                                    setOpen(true)
                                                }
                                            }}
                                        />
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date-picker"
                                                    
                                                    variant="ghost"
                                                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                                >
                                                    <CalendarIcon className="size-3.5" />
                                                    <span className="sr-only">năm sinh</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="end"
                                                alignOffset={-8}
                                                sideOffset={10}
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(date) => {
                                                        setDate(date)
                                                        setValue(formatDate(date))
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>




                                <Button  className="w-full mt-6">
                                    Lưu thay đổi
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
}