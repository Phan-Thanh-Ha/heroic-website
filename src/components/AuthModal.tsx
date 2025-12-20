import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput";
import { authApi } from "@/api/auth.api";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getProvinces } from "@/api/province.api";
import { Calendar } from "lucide-react";
import { customerStore } from "@/store/customerStore";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const registerSchema = z
  .object({
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
    birthday: z.string().optional(),
    provinceId: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    districtId: z.string().min(1, "Vui lòng chọn quận/huyện"),
    wardId: z.string().min(1, "Vui lòng chọn phường/xã"),
    address: z.string().min(1, "Vui lòng nhập địa chỉ"),
    specificAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

interface Province {
  id: number;
  name: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onOpenChange,
  defaultTab = "login",
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<Province[]>([]);
  const [wards, setWards] = useState<Province[]>([]);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, open]);

  // Load provinces for register form
  useEffect(() => {
    if (activeTab === "register" && open) {
      const loadProvinces = async () => {
        try {
          const response = await getProvinces();
          if (response.success && response.data) {
            setProvinces(response.data);
          }
        } catch (error) {
          console.error("Error loading provinces:", error);
        }
      };
      loadProvinces();
    }
  }, [activeTab, open]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      provinceId: "",
      districtId: "",
      wardId: "",
      address: "",
      specificAddress: "",
    },
  });

  const selectedProvinceId = registerForm.watch("provinceId");
  const selectedDistrictId = registerForm.watch("districtId");

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvinceId) {
      // TODO: Implement getDistricts API call
      setDistricts([]);
      registerForm.setValue("districtId", "");
      registerForm.setValue("wardId", "");
    }
  }, [selectedProvinceId]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      // TODO: Implement getWards API call
      setWards([]);
      registerForm.setValue("wardId", "");
    }
  }, [selectedDistrictId]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authApi.login(data);
      if (response.success && response.data) {
        // Save auth to store
        customerStore.setAuth({
          customer: response.data.info || response.data.customer,
          token: response.data.accessToken || response.data.token,
        });
        toast.success("Đăng nhập thành công!");
        onOpenChange(false);
        loginForm.reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      // TODO: Implement register API call
      toast.success("Đăng ký thành công!");
      onOpenChange(false);
      registerForm.reset();
      setActiveTab("login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
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
          onOpenChange(false);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập Google thất bại");
    }
  };

  const handleGoogleRegister = async (credentialResponse: any) => {
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
          toast.success("Đăng ký thành công!");
          onOpenChange(false);
          setActiveTab("login");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký Google thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[90vh] overflow-y-auto ${activeTab === "register" ? "max-w-2xl" : "max-w-md"}`}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">
            {activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
          </h2>

          {activeTab === "login" ? (
            <>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
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

                  <Button type="submit" className="w-full">
                    Đăng nhập
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

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Bạn chưa có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  {/* Họ và Tên */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className="text-destructive">*</span> Họ
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className="text-destructive">*</span> Tên
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Số điện thoại */}
                  <FormField
                    control={registerForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Số điện thoại
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email - Optional */}
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập email"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mật khẩu */}
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Mật khẩu
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Xác nhận mật khẩu */}
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Xác nhận mật khẩu
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập lại mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ngày sinh */}
                  <FormField
                    control={registerForm.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              placeholder="Nhập ngày sinh"
                              {...field}
                              value={field.value || ""}
                              className="pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tỉnh/Thành phố */}
                  <FormField
                    control={registerForm.control}
                    name="provinceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Tỉnh / Thành phố
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn tỉnh / thành phố" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {provinces.map((province) => (
                              <SelectItem
                                key={province.id}
                                value={province.id.toString()}
                              >
                                {province.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quận/Huyện */}
                  <FormField
                    control={registerForm.control}
                    name="districtId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Quận / Huyện
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedProvinceId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn quận / huyện" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem
                                key={district.id}
                                value={district.id.toString()}
                              >
                                {district.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phường/Xã */}
                  <FormField
                    control={registerForm.control}
                    name="wardId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Phường / Xã
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedDistrictId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phường / xã" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {wards.map((ward) => (
                              <SelectItem key={ward.id} value={ward.id.toString()}>
                                {ward.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Địa chỉ */}
                  <FormField
                    control={registerForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-destructive">*</span> Địa chỉ
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập địa chỉ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Địa chỉ cụ thể */}
                  <FormField
                    control={registerForm.control}
                    name="specificAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ cụ thể</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Số nhà và tên đường"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full mt-6">
                    Đăng ký
                  </Button>
                </form>
              </Form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-muted-foreground">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleRegister}
                  onError={() => {
                    toast.error("Đăng ký Google thất bại");
                  }}
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
