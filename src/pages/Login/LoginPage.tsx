import React, { useState } from "react";
import LoginForm from "@/pages/Login/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FaTelegramPlane, FaDiscord, FaExternalLinkAlt } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  // key để hiển thị hướng dẫn bên dưới: 'email' | 'telegram' | 'discord'
  const [activeKey, setActiveKey] = useState<'telegram' | 'discord' | 'email'>('email');

  const handleSuccess = () => navigate("/");

  return (
    <BackgroundLines className="flex items-center justify-center min-h-screen w-full flex-col px-4 bg-[#020617]">
      <div className="relative z-10 max-w-md w-full bg-[#0B1120]/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6">
        
        {/* 1. FORM ĐĂNG NHẬP LUÔN HIỂN THỊ */}
        <LoginForm
          onSuccess={handleSuccess}
          onEmailChange={(val: string) => setEmail(val)}
          onSelectMethod={(method) => setActiveKey(method || 'email')} 
        />

        {/* 2. PHẦN HƯỚNG DẪN NẰM CỐ ĐỊNH BÊN DƯỚI */}
        <div className="pt-4 border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-500">
          {activeKey === 'telegram' && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-400 font-bold italic text-sm">
                <FaTelegramPlane /> <span>HƯỚNG DẪN TELEGRAM</span>
              </div>
              <p className="text-[11px] text-slate-400 px-4">Liên kết tài khoản với Bot để nhận mã OTP bảo mật.</p>
              <a 
                href={`https://t.me/HeroicGymBot?start=${email?.replace('@', '_at_').replace('.', '_dot_') || 'link'}`} 
                target="_blank" 
                className="flex items-center justify-center gap-2 w-full bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 text-blue-400 hover:text-white text-[11px] font-bold py-3 rounded-xl transition-all"
              >
                Liên kết ngay <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          )}

          {activeKey === 'discord' && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold italic text-sm">
                <FaDiscord /> <span>HƯỚNG DẪN DISCORD</span>
              </div>
              <div 
                onClick={() => {
                  navigator.clipboard.writeText(`/link email:${email || 'your-email'}`);
                  alert("Đã copy lệnh Discord!");
                }}
                className="bg-[#020617] border border-dashed border-slate-700 p-4 rounded-xl cursor-pointer hover:border-indigo-500 transition-all group"
              >
                <code className="text-indigo-300 text-[10px] block font-mono">/link email:{email || 'Phanha615@gmail.com'}</code>
                <span className="text-[9px] text-slate-600 uppercase font-bold tracking-widest mt-1 block">(Click để copy lệnh)</span>
              </div>
              <a href="https://discord.gg/d4RuKUHC" target="_blank" className="flex items-center justify-center gap-2 w-full bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/50 text-indigo-400 hover:text-white text-[11px] font-bold py-3 rounded-xl transition-all">
                Vào Server nhận mã
              </a>
            </div>
          )}

          {activeKey === 'email' && (
            <p className="text-[10px] text-center text-slate-500 italic">Mã OTP sẽ được gửi trực tiếp về hòm thư Email của bạn.</p>
          )}
        </div>

        {/* 3. ĐĂNG KÝ & QUÊN MẬT KHẨU */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <button onClick={() => navigate("/forgot-password")} className="text-[10px] text-slate-500 hover:text-blue-400 font-bold uppercase tracking-widest">Quên mật khẩu?</button>
          <p className="text-[10px] text-slate-600 uppercase font-medium">Chưa có tài khoản? <button onClick={() => navigate("/register")} className="text-white hover:underline font-bold">Đăng ký</button></p>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default LoginPage;