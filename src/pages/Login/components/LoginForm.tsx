import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

// Shadcn UI Components
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

// Logic & Store
import { authApi } from "@/api/auth.api";
import { customerStore } from "@/store/customerStore";
import { cn } from "@/lib/utils";
import OTPModal from "@/components/OTPModal";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  otpMethod: z.enum(["email", "discord", "telegram"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = observer(() => {
  const [isDiscordDrawerOpen, setIsDiscordDrawerOpen] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      otpMethod: "email",
    },
  });

  // Custom Google Login Logic
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Gửi tokenResponse.access_token lên backend của bạn
        toast.success("Đang xác thực Google...");
      } catch (error) {
        toast.error("Lỗi đăng nhập Google");
      }
    },
    onError: () => toast.error("Đăng nhập Google thất bại"),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authApi.login(data);
      if (response.success) {
        customerStore.setRequiresOTP(data.email);
        toast.success(`Mã OTP đã được gửi qua ${data.otpMethod.toUpperCase()}`);
      }
    } catch (error: any) {
      if (error.response?.data?.code === "DISCORD_NOT_LINKED") {
        setIsDiscordDrawerOpen(true);
      }
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="space-y-6 relative z-10 w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Email</FormLabel>
                <FormControl>
                  <Input 
                    className="bg-[#1a1f2e] border-[#2e3344] text-white h-11" 
                    placeholder="name@example.com" 
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
                <FormLabel className="text-gray-200">Mật khẩu</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    className="bg-[#1a1f2e] border-[#2e3344] text-white h-11" 
                    placeholder="••••••••" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otpMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-gray-200">Nhận mã OTP qua</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => {
                      field.onChange(val);
                      if (val === "discord") setIsDiscordDrawerOpen(true);
                    }}
                    value={field.value}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { id: "email", label: "Email", icon: Mail },
                      { id: "discord", label: "Discord", icon: MessageSquare },
                      { id: "telegram", label: "Tele", icon: Send },
                    ].map((item) => (
                      <div key={item.id}>
                        <RadioGroupItem value={item.id} id={item.id} className="sr-only" />
                        <label
                          htmlFor={item.id}
                          className={cn(
                            "flex flex-col items-center justify-center rounded-lg border-2 border-[#2e3344] bg-[#1a1f2e] p-3 hover:bg-[#252a3d] cursor-pointer transition-all min-h-[80px]",
                            field.value === item.id && "border-white bg-[#252a3d]"
                          )}
                        >
                          <item.icon className={cn("mb-2 h-5 w-5", field.value === item.id ? "text-white" : "text-gray-400")} />
                          <span className={cn("text-xs font-bold", field.value === item.id ? "text-white" : "text-gray-400")}>
                            {item.label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11 bg-gray-200 hover:bg-white text-black font-bold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Spinner className="mr-2 h-4 w-4" /> : "Đăng nhập"}
          </Button>
        </form>
      </Form>

      {/* --- SOCIAL LOGIN SECTION --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><Separator className="bg-[#2e3344]" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0f172a] px-3 text-gray-400">Hoặc đăng nhập với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Facebook Button */}
        <Button 
          variant="outline" 
          className="h-11 bg-[#161b22] border-[#30363d] text-white hover:bg-[#21262d] flex items-center justify-center gap-2"
          onClick={() => toast.info("Đang xử lý Facebook...")}
        >
          <svg className="h-5 w-5 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span className="font-semibold text-sm">Facebook</span>
        </Button>

        {/* Google Button Custom */}
        <Button 
          variant="outline" 
          className="h-11 bg-[#161b22] border-[#30363d] text-white hover:bg-[#21262d] flex items-center justify-center gap-2"
          onClick={() => loginGoogle()}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-semibold text-sm">Google</span>
        </Button>
      </div>

      {/* --- DRAWER DISCORD --- */}
      <Drawer open={isDiscordDrawerOpen} onOpenChange={setIsDiscordDrawerOpen}>
        <DrawerContent className="bg-[#0f172a] border-[#2e3344] text-white">
          <div className="mx-auto w-full max-w-sm p-6">
            <DrawerHeader>
              <DrawerTitle>Liên kết Discord</DrawerTitle>
              <DrawerDescription className="text-gray-400 text-center">
                Vào Discord gõ lệnh này để kích hoạt OTP:
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-6">
  {/* 1. Khu vực hiển thị mã và Copy */}
  <div 
    className="p-4 bg-[#1a1f2e] border-2 border-dashed border-[#2e3344] rounded-lg cursor-pointer hover:bg-[#252a3d] transition-all group relative"
    onClick={() => {
      const email = form.getValues("email") || "Phanha615@gmail.com";
      navigator.clipboard.writeText(`/link email:${email}`);
      toast.success("Đã copy lệnh! Hãy dán vào ô chat Discord sắp mở ra.");
    }}
  >
    <code className="text-white text-sm break-all font-mono block text-center">
      {`/link email:${form.getValues("email") || "Phanha615@gmail.com"}`}
    </code>
    <p className="text-[10px] text-gray-500 text-center mt-2 group-hover:text-primary">
      (Click để copy mã này)
    </p>
  </div>

  {/* 2. Nút dẫn đường - Đây là chìa khóa cho người mới */}
  <Button 
    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold h-11" 
    onClick={() => {
      // Dán link mời Server của bạn vào đây
      window.open("https://discord.gg/d4RuKUHC", "_blank");
    }}
  >
    Mở Discord & Vào Server nhận mã
  </Button>
</div>
            <DrawerFooter className="px-0">
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] w-full" onClick={() => window.open(`https://discord.com/users/${import.meta.env.VITE_DISCORD_ID}`, "_blank")}>
                Mở Discord
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" className="text-gray-400">Đã xong</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <OTPModal
        open={customerStore.requiresOTP}
        onOpenChange={(open) => !open && customerStore.clearOTPRequirement()}
        email={customerStore.pendingEmail || undefined}
      />
    </div>
  );
});

export default LoginForm;