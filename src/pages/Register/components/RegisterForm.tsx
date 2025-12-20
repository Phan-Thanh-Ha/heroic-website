import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getProvinces } from "@/api/province.api";
import { Calendar } from "lucide-react";
import { customerStore } from "@/store/customerStore";
import { authApi } from "@/api/auth.api";

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

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Province {
  id: number;
  name: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  showSwitchLink?: boolean;
  loadProvincesOnMount?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  showSwitchLink = true,
  loadProvincesOnMount = true,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<Province[]>([]);
  const [wards, setWards] = useState<Province[]>([]);

  const form = useForm<RegisterFormValues>({
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

  const selectedProvinceId = form.watch("provinceId");
  const selectedDistrictId = form.watch("districtId");

  // Load provinces
  useEffect(() => {
    if (loadProvincesOnMount) {
      const loadProvinces = async () => {
        try {
          const response = await getProvinces();
          if (response?.data) {
            setProvinces(Array.isArray(response.data) ? response.data : []);
          }
        } catch (error) {
          console.error("Error loading provinces:", error);
        }
      };
      loadProvinces();
    }
  }, [loadProvincesOnMount]);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvinceId) {
      // TODO: Implement getDistricts API call
      setDistricts([]);
      form.setValue("districtId", "");
      form.setValue("wardId", "");
    }
  }, [selectedProvinceId, form]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      // TODO: Implement getWards API call
      setWards([]);
      form.setValue("wardId", "");
    }
  }, [selectedDistrictId, form]);

  const onSubmit = async (_data: RegisterFormValues) => {
    try {
      // TODO: Implement register API call
      toast.success("Đăng ký thành công!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
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
          form.reset();
          onSuccess?.();
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký Google thất bại");
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Họ và Tên */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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

      {showSwitchLink && onSwitchToLogin && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

