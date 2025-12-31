import React from "react";
import LoginForm from "@/pages/Login/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <BackgroundLines className="flex items-center justify-center min-h-screen w-full flex-col px-4">
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToRegister={() => navigate("/register")}
          showSwitchLink={true}
        />
      </div>
    </BackgroundLines>
  );
};

export default LoginPage;

