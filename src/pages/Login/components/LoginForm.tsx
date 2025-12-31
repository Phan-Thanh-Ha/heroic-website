import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authApi } from "@/api/auth.api";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { customerStore } from "@/store/customerStore";
import type { GoogleJwtPayload, GoogleLoginPayload } from "@/types/googleLogin";
import OTPModal from "@/components/OTPModal";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  showSwitchLink?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = observer(({
  onSuccess,
  onSwitchToRegister,
  showSwitchLink = true,
}) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authApi.login(data);
      if (response.success && response.data) {
        // Luôn yêu cầu OTP sau khi login thành công
        // Set state trong store để trigger modal OTP
        customerStore.setRequiresOTP(data.email);
        toast.success("Mã OTP đã được gửi đến email của bạn!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential || 'null');
      if (decoded) {
        // Tạo payload từ decoded JWT
        const payload: GoogleLoginPayload = {
          googleId: decoded.sub,
          email: decoded.email,
          firstName: decoded.family_name,
          lastName: decoded.given_name,
          fullName: decoded.name || `${decoded.given_name} ${decoded.family_name}`,
          avatarUrl: decoded.picture,
        };
        
        const response = await authApi.loginGoogle(payload);
        if (response.success && response.data) {
          // Luôn yêu cầu OTP sau khi login thành công
          // Set state trong store để trigger modal OTP
          customerStore.setRequiresOTP(decoded.email);
          toast.success("Mã OTP đã được gửi đến email của bạn!");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập Google thất bại");
    }
  };

  const handleOTPSuccess = () => {
    customerStore.clearOTPRequirement();
    form.reset();
    onSuccess?.();
  };

  const handleOTPClose = (open: boolean) => {
    if (!open) {
      customerStore.clearOTPRequirement();
    }
  };

  return (
    <div className="space-y-6 relative z-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-foreground"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-primary hover:text-primary/80"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" >
          <Spinner className="w-4 h-4" style={{ display: form.formState.isSubmitting ? 'block' : 'none' }} />
            <span style={{ display: form.formState.isSubmitting ? 'none' : 'block' }}>
              Đăng nhập
            </span>
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-muted-foreground">
            Hoặc đăng nhập với
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            toast.error("Đăng nhập Google thất bại");
          }}
        />
      </div>

      {showSwitchLink && onSwitchToRegister && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Bạn chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      )}

      <OTPModal
        open={customerStore.requiresOTP}
        onOpenChange={handleOTPClose}
        email={customerStore.pendingEmail || undefined}
        onSuccess={handleOTPSuccess}
      />
    </div>
  );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;

