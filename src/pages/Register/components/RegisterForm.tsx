import { PasswordInput } from "@/components/PasswordInput";
import ProvinceSelect from "@/components/ProvinceSelect";
import DistrictSelect from "@/components/DistrictSelect";
import WardSelect from "@/components/WardSelect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { locationStore } from "@/store";
import { authApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    provinceId: z.number().min(1, "Vui lòng chọn tỉnh/thành phố"),
    districtId: z.number().min(1, "Vui lòng chọn quận/huyện"),
    wardId: z.number().min(1, "Vui lòng chọn phường/xã"),
    address: z.string().min(1, "Vui lòng nhập địa chỉ"),
    specificAddress: z.string().optional(),
  })

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  showSwitchLink?: boolean;
  loadProvincesOnMount?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const navigate = useNavigate();
  // Form validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      password: "",
      provinceId: 0,
      districtId: 0,
      wardId: 0, // number
      address: "",
      specificAddress: "",
    },
  });

  const selectedProvinceId = form.watch("provinceId");
  const selectedDistrictId = form.watch("districtId");
  const password = form.watch("password");
  const [pathWithType, setPathWithType] = useState("");

  // Reset district và ward khi chọn province mới
  useEffect(() => {
    if (selectedProvinceId) {
      form.setValue("districtId", 0);
      form.setValue("wardId", 0);
    }
  }, [selectedProvinceId, form]);

  // Reset ward khi chọn district mới (chỉ khi districtId > 0, không reset khi về 0)
  useEffect(() => {
    if (selectedDistrictId && selectedDistrictId > 0) {
      form.setValue("wardId", 0);
    }
  }, [selectedDistrictId, form]);

  // Trigger validation cho confirmPassword khi password thay đổi
  useEffect(() => {
    if (password) {
      form.trigger("password");
    }
  }, [password, form]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Convert id từ string sang number
      const payload = {
        ...data,
        address:data.specificAddress,
        fullName: `${data.lastName} ${data.firstName}`,
        fullAddress: `${data.specificAddress} ${pathWithType} `,
        typeRegister:"email",
        provinceId: data.provinceId,
        districtId: data.districtId,
        wardId: data.wardId,
      };
      const response = await authApi.register(payload);
      if (response.success && response.data) {
        toast.success("Đăng ký thành công!");
        form.reset();
        // Chuyển hướng đến trang login
        navigate("/login");
      }else{
        toast.error(response.message || "Đăng ký thất bại");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div>
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
                    <Input 
                      placeholder="Nhập họ" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-destructive">*</span> Tên
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên" 
                      className={fieldState.error ? "border-destructive" : ""}
                      {...field} 
                    />
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

          {/* Tỉnh/Thành phố */}
          <FormField
            control={form.control}
            name="provinceId"
              render={({ field }) => (
              <ProvinceSelect
                value={field.value}
                onValueChange={(item) => {
                  // Reset district và ward ngay khi chọn province mới
                  form.setValue("districtId", 0);
                  form.setValue("wardId", 0);
                  field.onChange(item?.id || 0)
                  //Cập nhật provincecode vào store
                  locationStore.getDistrictsByProvinceCode(item?.code || "");
                }}
              />
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
                <FormControl>
                  <DistrictSelect
                    value={field.value} 
                    onValueChange={(item: any) => {
                      field.onChange(item?.id || 0); 
                    }}
                    disabled={!selectedProvinceId}
                  />
                </FormControl>
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
                <FormControl>
                  <WardSelect
                    value={field.value} 
                    onValueChange={(item: any) => {
                      setPathWithType(item?.path_with_type);
                      field.onChange(item?.id || 0);
                    }}
                    districtId={selectedDistrictId}
                    disabled={!selectedDistrictId}
                  />
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
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-6"
            onClick={() => {
              onSubmit(form.getValues());
          }}
          >
            Đăng ký
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;

