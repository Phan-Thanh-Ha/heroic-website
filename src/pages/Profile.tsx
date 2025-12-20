import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto my-10 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-800">Hồ Sơ Của Tôi</h2>
        <p className="text-sm text-slate-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-slate-600 text-right">Giới tính</label>
            <div className="col-span-2 flex gap-4">
              {['Nam', 'Nữ', 'Khác'].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group text-sm text-slate-700">
                  <input type="radio" name="gender" value={item.toLowerCase()} className="w-4 h-4 accent-black border-slate-300" />
                  <span className="group-hover:text-black transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-slate-600 text-right">Ngày sinh</label>
           
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="col-start-2">
              <button className="px-6 py-2 bg-[#ee4d2d] hover:bg-[#d73211] text-white rounded-sm shadow-sm transition-all text-sm font-medium active:scale-95">
                Lưu
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}