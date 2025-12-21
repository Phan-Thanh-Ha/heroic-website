import { BackgroundLines } from "@/components/ui/background-lines";
import RegisterForm from "@/pages/Register/components/RegisterForm";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/login");
  };

  return (
    <BackgroundLines className="flex items-center justify-center min-h-screen w-full flex-col px-4 py-8">
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <RegisterForm
          onSuccess={handleSuccess}
          onSwitchToLogin={() => navigate("/login")}
          showSwitchLink={true}
          loadProvincesOnMount={true}
        />
      </div>

    </BackgroundLines>
  );
};

export default RegisterPage;

