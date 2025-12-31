import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api/auth.api";
import { toast } from "sonner";
import { customerStore } from "@/store/customerStore";
import { useNavigate } from "react-router-dom";

interface OTPModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    email?: string;
    onSuccess?: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
    open,
    onOpenChange,
    email,
    onSuccess,
}) => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (open) {
            setOtp("");
            setTimer(60);
            setCanResend(false);
        }
    }, [open]);

    useEffect(() => {
        if (timer > 0 && !canResend) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, canResend]);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            toast.error("Vui lòng nhập đầy đủ 6 số mã OTP");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                otp: otp.trim(),
                email,
            }
            const response = await authApi.verifyOTP(payload);
            if (response.success && response.data) {
                // Save auth to store sau khi verify OTP thành công
                customerStore.setAuth({
                    customer: response.data.info || response.data.customer,
                    token: response.data.accessToken || response.data.token,
                    
                });
                toast.success(response.message);
                // chuyển đến trang home
                navigate("/");
                setOtp("");
                onOpenChange(false);
                onSuccess?.();
            }else{
                toast.error(response?.message );
            }
        } catch (error: any) {
            console.log(error);
            setOtp("");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        try {
            await authApi.resendOTP({ email });
            toast.success("Đã gửi lại mã OTP!");
            setTimer(60);
            setCanResend(false);
            setOtp("");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Gửi lại mã OTP thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        // Chỉ cho phép đóng modal sau khi xác thực OTP thành công
        // Không cho phép đóng bằng cách click outside hoặc ESC
        if (!newOpen) {
            // Không làm gì cả - ngăn không cho đóng modal
            return;
        }
        // Chỉ cho phép mở modal
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent 
                className="sm:max-w-md [&>button]:hidden"
                onInteractOutside={(e) => {
                    // Ngăn không cho đóng khi click bên ngoài
                    e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                    // Ngăn không cho đóng khi nhấn ESC
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        Xác thực OTP
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        {email ? (
                            <>
                                Chúng tôi đã gửi mã OTP đến email{" "}
                                <span className="font-semibold text-foreground">{email}</span>
                            </>
                        ) : (
                            "Vui lòng nhập mã OTP đã được gửi đến email của bạn"
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            disabled={isLoading}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleVerify}
                            disabled={otp.length !== 6 || isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Đang xác thực..." : "Xác thực"}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            {canResend ? (
                                <button
                                    onClick={handleResendOTP}
                                    disabled={isLoading}
                                    className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
                                >
                                    Gửi lại mã OTP
                                </button>
                            ) : (
                                <p>
                                    Gửi lại mã sau{" "}
                                    <span className="font-semibold text-foreground">
                                        {timer}s
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OTPModal;

