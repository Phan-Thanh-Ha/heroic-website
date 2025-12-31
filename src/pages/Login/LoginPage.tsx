import React, { useState } from "react";
import LoginForm from "@/pages/Login/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FaTelegramPlane, FaDiscord, FaExternalLinkAlt, FaChevronLeft } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  // key quản lý: null (form login) | 'telegram' | 'discord'
  const [activeKey, setActiveKey] = useState<'telegram' | 'discord' | null>(null);

  const handleSuccess = () => navigate("/");

  return (
    <BackgroundLines className="flex items-center justify-center min-h-screen w-full flex-col px-4 bg-[#020617]">
      <div className="relative z-10 max-w-md w-full bg-[#0B1120]/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-800">
        
        {!activeKey ? (
          /* MÀN HÌNH ĐĂNG NHẬP CHÍNH CÓ FB/GOOGLE */
          <div className="space-y-6 animate-in fade-in duration-500">
            <LoginForm
              onSuccess={handleSuccess}
              onEmailChange={(val: string) => setEmail(val)}
              onSelectMethod={(method) => setActiveKey(method)} 
            />
          </div>
        ) : (
          /* MÀN HÌNH HƯỚNG DẪN DỰA TRÊN KEY */
          <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-300">
            <button 
              onClick={() => setActiveKey(null)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-2"
            >
              <FaChevronLeft className="text-[10px]" /> Quay lại đăng nhập
            </button>

            {activeKey === 'telegram' ? (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 text-blue-400 font-black italic">
                  <FaTelegramPlane className="text-3xl" />
                  <span className="text-xl tracking-tighter uppercase">NHẬN OTP QUA TELEGRAM</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                  Để bảo mật, vui lòng liên kết tài khoản với Bot trước khi nhận mã OTP.
                </p>
                <a
                  href={`https://t.me/HeroicGymBot?start=${email?.replace('@', '_at_').replace('.', '_dot_') || 'link'}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all uppercase tracking-wide"
                >
                  Liên kết ngay <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            ) : (
              <div className="text-center space-y-5">
                <div className="flex items-center justify-center gap-3 text-indigo-400 font-black italic">
                  <FaDiscord className="text-3xl" />
                  <span className="text-xl tracking-tighter uppercase">NHẬN OTP QUA DISCORD</span>
                </div>
                <p className="text-slate-400 text-xs">Vào Discord gõ lệnh này để kích hoạt OTP:</p>
                
                <div 
                  onClick={() => {
                    navigator.clipboard.writeText(`/link email:${email || 'Phanha615@gmail.com'}`);
                    alert("Đã copy lệnh Discord!");
                  }}
                  className="bg-[#020617] border border-dashed border-slate-700 p-6 rounded-2xl cursor-pointer hover:border-indigo-500 transition-all group"
                >
                  <code className="text-slate-200 text-sm block mb-1 font-mono">
                    /link email:{email || 'Phanha615@gmail.com'}
                  </code>
                  <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                    (Click để copy mã này)
                  </span>
                </div>

                <a href="https://discord.gg/d4RuKUHC" target="_blank" className="bg-[#5865F2] text-white py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg uppercase tracking-wide w-full flex justify-center">
                  Mở Discord & Vào Server nhận mã
                </a>
              </div>
            )}
            
            <button 
              onClick={() => setActiveKey(null)}
              className="w-full text-[11px] text-slate-500 font-black uppercase tracking-[0.3em] hover:text-white transition-colors py-2"
            >
              Đã xong
            </button>
          </div>
        )}
      </div>
    </BackgroundLines>
  );
};

export default LoginPage;