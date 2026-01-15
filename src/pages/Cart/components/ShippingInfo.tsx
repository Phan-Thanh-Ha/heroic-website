import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { customerStore } from "@/store/customerStore";
import { ArrowDown, MapPin, Phone, User } from "lucide-react";

export const ShippingInfo: React.FC = () => {
    const customerInfo = customerStore.customers;
    return (
        <div className="w-full space-y-0 relative">
            {/* Card Người Gửi */}
            <Card className="relative overflow-hidden border-b-0 rounded-b-none bg-linear-to-br from-background to-blue-50/30 dark:to-blue-950/10 shadow-sm">
                {/* Một chút màu sắc hiệu ứng góc */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg dark:shadow-none">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-bold tracking-tight">Người gửi</CardTitle>
                            <CardDescription className="text-xs uppercase tracking-wider font-semibold opacity-70">Heroic-Gym Store</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-6 pb-8">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                            Họ và tên
                        </span>
                        <p className="font-semibold text-sm">Heroic-Gym Store</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                            Liên hệ
                        </span>
                        <p className="font-semibold text-sm flex items-center gap-2">
                            <Phone className="h-3 w-3 text-blue-500" />
                            +84 123 456 789
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Divider hiện đại hơn */}
            <div className="relative h-4 w-full flex items-center justify-center bg-background/50">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-muted"></div>
                </div>
                <div className="relative z-10 p-1 bg-background rounded-full border shadow-sm">
                    <ArrowDown className="h-3 w-3 text-muted-foreground animate-bounce" />
                </div>
            </div>

            {/* Card Người Nhận */}
            <Card className="relative overflow-hidden border-t-0 rounded-t-none bg-linear-to-br from-background to-emerald-50/30 dark:to-emerald-950/10 shadow-sm">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -ml-16 -mb-16" />

                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-600 rounded-lg shadow-emerald-200 shadow-lg dark:shadow-none">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-bold tracking-tight">Người nhận</CardTitle>
                            <CardDescription className="text-xs uppercase tracking-wider font-semibold opacity-70">Destination</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-8">
                    {customerInfo ? (
                        <>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                                        Họ và tên
                                    </span>
                                    <p className="font-semibold text-sm">{customerInfo.fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                                        Số điện thoại
                                    </span>
                                    <p className="font-semibold text-sm">{customerInfo.phoneNumber || "Chưa có số điện thoại"}</p>
                                </div>

                            </div>
                            <div className="space-y-1 mt-8">
                                <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                                    Địa chỉ
                                </span>
                                <p className="font-semibold text-sm">{customerInfo.fullAddress}</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-4 px-4 border-2 border-dashed border-muted rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                            <p className="text-sm font-medium text-muted-foreground">Chưa có thông tin người nhận</p>
                            <p className="text-[11px] text-muted-foreground/60">Bấm vào đây để chọn hoặc thêm mới</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};