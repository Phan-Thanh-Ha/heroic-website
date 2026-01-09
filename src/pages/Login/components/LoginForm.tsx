import { authApi } from "@/api/auth.api";
import OTPModal from "@/components/OTPModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { customerStore } from "@/store/customerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  otpMethod: z.enum(["email", "discord", "telegram"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
  onEmailChange: (email: string) => void;
  onSelectMethod: (method: 'telegram' | 'discord' | 'email') => void;
}

const LoginForm: React.FC<LoginFormProps> = observer(({ onEmailChange, onSelectMethod }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", otpMethod: "email" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authApi.login(data);
      if (response.success) {
        customerStore.setRequiresOTP(data.email);
        toast.success(`Đã gửi OTP qua ${data.otpMethod.toUpperCase()}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng nhập lỗi");
    }
  };

  return (
    <div className="w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email</FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1f2e] border-[#2e3344] text-white h-11 rounded-xl" placeholder="name@example.com" {...field} onChange={(e) => { field.onChange(e); onEmailChange(e.target.value); }} />
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
                <FormLabel className="text-slate-400 text-xs font-bold uppercase tracking-wider">Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" sx={{WebkitTextSecurity: 'disc'}} className="bg-[#1a1f2e] border-[#2e3344] text-white h-11 rounded-xl" placeholder="••••••••" {...field} />
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
                <FormLabel className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center block">Nhận OTP qua</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => {
                      field.onChange(val); 
                      onSelectMethod(val as any); // Cập nhật hướng dẫn bên dưới
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
                        <label htmlFor={item.id} className={cn("flex flex-col items-center justify-center rounded-2xl border transition-all min-h-[85px] cursor-pointer", field.value === item.id ? "border-slate-400 bg-slate-800 shadow-md" : "border-slate-800 bg-slate-900/50 hover:bg-slate-800")}>
                          <item.icon className={cn("mb-2 h-5 w-5", field.value === item.id ? "text-white" : "text-slate-500")} />
                          <span className={cn("text-[9px] font-bold uppercase", field.value === item.id ? "text-white" : "text-slate-500")}>{item.label}</span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 bg-slate-200 hover:bg-white text-black font-black uppercase tracking-widest mt-2 rounded-xl">Đăng nhập</Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><Separator className="bg-[#2e3344]" /></div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500"><span className="bg-[#0B1120] px-3 tracking-widest">Hoặc</span></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11 bg-[#161b22] border-[#30363d] text-white hover:bg-[#21262d] flex items-center justify-center gap-2 rounded-xl" onClick={() => toast.info("Facebook Login...")}>
          <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span className="font-bold text-xs text-slate-300">Facebook</span>
        </Button>
        <Button variant="outline" className="h-11 bg-[#161b22] border-[#30363d] text-white hover:bg-[#21262d] flex items-center justify-center gap-2 rounded-xl" onClick={() => {}}>
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <span className="font-bold text-xs text-slate-300">Google</span>
        </Button>
      </div>

      <OTPModal open={customerStore.requiresOTP} onOpenChange={(open) => !open && customerStore.clearOTPRequirement()} email={customerStore.pendingEmail || undefined} />
    </div>
  );
});

export default LoginForm;