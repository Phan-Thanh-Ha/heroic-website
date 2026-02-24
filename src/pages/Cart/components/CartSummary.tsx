import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cartStore } from "@/store/cartStore";
import { Banknote, CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CartSummaryProps {
    shippingFee?: number;
    discountCode?: string;
    onDiscountCodeChange?: (code: string) => void;
    onApplyDiscount?: () => void;
    onCheckout: () => void;
    onChangePaymentMethod: (method: string) => void;
    isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = observer(({
    shippingFee = 0,
    discountCode = '',
    onDiscountCodeChange,
    onApplyDiscount,
    onCheckout,
    onChangePaymentMethod,
    isLoading = false,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
    // Tính tổng tiền của giỏ hàng lấy từ cartStore
    const subtotal = cartStore.totalPrice;
    const total = subtotal + shippingFee;

    const handleChangePaymentMethod = (method: 'cash' | 'transfer') => {
        setPaymentMethod(method);
        onChangePaymentMethod(method);
    }

    return (
        <div className='lg:col-span-4'>
            <Card className="sticky top-6">
                <CardHeader>
                    <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                            {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}
                        </span>
                    </div>

                    <div className="pt-4 space-y-2">
                        <label className="text-sm font-medium">Mã giảm giá</label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Nhập mã..."
                                value={discountCode}
                                onChange={(e) => onDiscountCodeChange?.(e.target.value)}
                            />
                            <Button variant="outline" onClick={onApplyDiscount}>
                                Áp dụng
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold">Tổng cộng</span>
                        <span className="text-xl font-bold">{total.toLocaleString()}đ</span>
                    </div>

                    <Separator />
                    {/* Chuyển đổi phương thức thanh toán */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-400">Phương thức thanh toán</label>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {/* Option: Tiền mặt */}
                            <div
                                onClick={() => handleChangePaymentMethod('cash')}
                                className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-lg border transition-all cursor-pointer ${paymentMethod === 'cash'
                                    ? "border-blue-500 bg-blue-500/10 text-blue-400" // Khi chọn: viền xanh, nền xanh mờ
                                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700" // Khi chưa chọn: nền tối tiệp với UI
                                    }`}
                            >
                                <Banknote className={`w-5 h-5 mb-2 ${paymentMethod === 'cash' ? "text-blue-400" : "text-zinc-500"}`} />
                                <span className="text-xs font-medium">Tiền mặt</span>

                                {paymentMethod === 'cash' && (
                                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-blue-400" />
                                )}
                            </div>

                            {/* Option: Chuyển khoản */}
                            <div
                                onClick={() => handleChangePaymentMethod('transfer')}
                                className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-lg border transition-all cursor-pointer ${paymentMethod === 'transfer'
                                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                                    }`}
                            >
                                <CreditCard className={`w-5 h-5 mb-2 ${paymentMethod === 'transfer' ? "text-blue-400" : "text-zinc-500"}`} />
                                <span className="text-xs font-medium">Chuyển khoản</span>

                                {paymentMethod === 'transfer' && (
                                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-blue-400" />
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full size-lg text-md font-bold py-6" onClick={onCheckout} disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "TIẾN HÀNH THANH TOÁN"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
});

export default CartSummary;
