import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
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

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
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
        // Save auth to store
        customerStore.setAuth({
          customer: response.data.info || response.data.customer,
          token: response.data.accessToken || response.data.token,
        });
        toast.success("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential || 'null');
      if (decoded) {
        // Tạo payload từ decoded JWT
        const payload = {
          googleId: decoded.sub,
          email: (decoded as any).email,
          firstName: (decoded as any).family_name,
          lastName: (decoded as any).given_name,
          fullName: (decoded as any).name || `${(decoded as any).given_name} ${(decoded as any).family_name}`,
          avatarUrl: (decoded as any).picture,
        };
        
        const response = await authApi.loginGoogle(payload);
        if (response.success && response.data) {
          // Save auth to store
          customerStore.setAuth({
            customer: response.data.info || response.data.customer,
            token: response.data.accessToken || response.data.token,
          });
          toast.success("Đăng nhập thành công!");
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập Google thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Đăng nhập
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </Form>

        <div className="mt-6">
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

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Đăng nhập Google thất bại");
              }}
            />
          </div>
        </div>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

