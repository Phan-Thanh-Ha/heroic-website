import { Modal } from 'antd';
import React, { useState, useImperativeHandle } from 'react';
import RegisterForm from './RegisterForm'; // 👈 Import RegisterForm vừa tạo
import { CloseOutlined } from '@ant-design/icons';

// --- Khai báo Types ---
interface RegisterPageProps {
    onClose?: () => void;
    onSubmitOk?: () => void;
    onLoginClick?: () => void; // Hàm chuyển về login
}

export interface RegisterPageModalRef {
    handleOpen: () => void;
}
// -----------------------

export const RegisterPageModal = React.forwardRef<RegisterPageModalRef, RegisterPageProps>(({ onClose, onSubmitOk, onLoginClick }, ref) => {
    const [visible, setVisible] = useState(false);

    // Hàm để MỞ Modal
    const handleOpen = () => {
        setVisible(true);
    }

    // Hàm để ĐÓNG Modal
    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose();
    }

    // Sử dụng useImperativeHandle để expose handleOpen cho component cha
    useImperativeHandle(ref, () => ({
        handleOpen: handleOpen
    }));

    return (
        <div>
            <Modal
                title={null}
                footer={null}
                closable={false} // Tắt nút đóng mặc định để dùng nút custom ở Header
                maskClosable={true}
                width={600}
                open={visible}
                onCancel={handleClose}
                bodyStyle={{ padding: 0 }} // Reset padding body để background đỏ tràn viền
            >
                {/* Background Header Màu Đỏ */}
                <div className="absolute top-0 left-0 w-full h-40 bg-red-600 rounded-t-lg">
                    <div className="relative h-40 pt-6 text-center text-white bg-red-600 rounded-t-lg">
                        <h2 className="text-xl font-bold mb-4 mx-auto w-full uppercase">ĐĂNG KÝ</h2>
                        
                        {/* Nút đóng tùy chỉnh nằm trên nền đỏ */}
                        <CloseOutlined 
                            onClick={handleClose}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ 
                                color: 'white', 
                                fontSize: '20px', 
                                position: 'absolute', 
                                right: '20px', 
                                top: '20px' 
                            }} 
                        />
                    </div>
                </div>

                {/* Nội dung Form (RegisterForm sẽ tự đẩy mình xuống nhờ class mt-10) */}
                <div className="pb-8">
                    <RegisterForm 
                        onLoginClick={() => {
                            handleClose(); // Đóng form đăng ký
                            if (onLoginClick) onLoginClick(); // Gọi hàm mở login từ cha
                        }}
                        onFinish={(values) => {
                            console.log("Đăng ký thành công:", values);
                            if (onSubmitOk) onSubmitOk();
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
})

export default RegisterPageModal