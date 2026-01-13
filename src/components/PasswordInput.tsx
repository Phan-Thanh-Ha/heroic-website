import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  status?: "success" | "error" | "default"
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, status = "default", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasStatus = status !== "default";

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            className,
            // Thêm padding right cho eye icon (status icon đã ở right-3, eye icon sẽ ở right-0)
            hasStatus ? "pr-10" : "pr-10"
          )}
          ref={ref}
          {...props}
        />
        {/* Eye Icon - đặt ở vị trí cuối cùng bên phải */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent z-10"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

