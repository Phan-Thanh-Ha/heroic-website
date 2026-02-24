import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Copy, CheckCircle2, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    amount: number;
    orderCode?: string;
    bankCode?: string; // Mã ngân hàng (VD: VCB, TCB, VPB, etc.)
    accountNumber?: string; // Số tài khoản
    accountName?: string; // Tên chủ tài khoản
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    open,
    onOpenChange,
    amount,
    orderCode,
    bankCode = "ACB", // Mặc định Á Châu
    accountNumber = "123456789", // Thay bằng số tài khoản thực tế
    accountName = "HEROIC-GYM-SHOP", // Thay bằng tên chủ tài khoản thực tế
}) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // Tạo URL QR code từ VietQR API
    const qrCodeUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(orderCode || `ORDER${Date.now()}`)}`;

    // Thông tin ngân hàng
    const bankInfo: Record<string, { name: string; shortName: string }> = {
        VCB: { name: "Ngân hàng TMCP Ngoại Thương Việt Nam", shortName: "Vietcombank" },
        TCB: { name: "Ngân hàng TMCP Kỹ Thương Việt Nam", shortName: "Techcombank" },
        VPB: { name: "Ngân hàng TMCP Việt Nam Thịnh Vượng", shortName: "VPBank" },
        ACB: { name: "Ngân hàng TMCP Á Châu", shortName: "ACB" },
        BID: { name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", shortName: "BIDV" },
    };

    const bank = bankInfo[bankCode] || { name: "Ngân hàng", shortName: bankCode };

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            toast.success("Đã sao chép!");
            setTimeout(() => setCopiedField(null), 2000);
        } catch (error) {
            toast.error("Không thể sao chép");
        }
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-500px">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-blue-500" />
                        Thanh toán chuyển khoản
                    </DialogTitle>
                    <DialogDescription>
                        Vui lòng quét mã QR hoặc chuyển khoản theo thông tin bên dưới
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* QR Code */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                            <img
                                src={qrCodeUrl}
                                alt="VietQR Code"
                                className="w-64 h-64 object-contain"
                                onError={(e) => {
                                    // Fallback nếu QR code không load được
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                        parent.innerHTML = `
                                            <div class="w-64 h-64 flex items-center justify-center text-gray-400 text-sm">
                                                Không thể tải QR code
                                            </div>
                                        `;
                                    }
                                }}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            Quét mã QR bằng ứng dụng ngân hàng của bạn
                        </p>
                    </div>

                    {/* Thông tin chuyển khoản */}
                    <div className="space-y-3 border-t pt-4">
                        <h3 className="font-semibold text-sm">Thông tin chuyển khoản:</h3>

                        {/* Số tiền */}
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Số tiền:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-blue-600">
                                    {formatAmount(amount)}đ
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => copyToClipboard(amount.toString(), "amount")}
                                >
                                    {copiedField === "amount" ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Ngân hàng */}
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Ngân hàng:</span>
                            <span className="font-medium">{bank.shortName}</span>
                        </div>

                        {/* Số tài khoản */}
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Số tài khoản:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium font-mono">{accountNumber}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => copyToClipboard(accountNumber, "account")}
                                >
                                    {copiedField === "account" ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Tên chủ tài khoản */}
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Chủ tài khoản:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-right max-w-200px truncate">
                                    {accountName}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => copyToClipboard(accountName, "name")}
                                >
                                    {copiedField === "name" ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Nội dung chuyển khoản */}
                        {orderCode && (
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <span className="text-sm text-muted-foreground">Nội dung:</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium font-mono text-sm">
                                        {orderCode}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => copyToClipboard(orderCode, "content")}
                                    >
                                        {copiedField === "content" ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Lưu ý */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p className="text-xs text-blue-800 dark:text-blue-300">
                            <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh chóng.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                    <Button
                        onClick={() => {
                            toast.success("Đã gửi thông báo xác nhận thanh toán!");
                            onOpenChange(false);
                        }}
                    >
                        Đã chuyển khoản
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
