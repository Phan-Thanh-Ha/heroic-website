import { Modal } from 'antd'
import React, { useState, useImperativeHandle } from 'react'
import LoginForm from './components/LoginForm'; // 👈 Cập nhật đường dẫn thực tế của bạn
import { CloseOutlined } from '@ant-design/icons';

// --- Khai báo Types ---
interface LoginPageProps {
    onClose?: () => void;
    onSubmitOk?: () => void;
}

interface LoginPageModalRef {
    handleOpen: () => void;
}
// -----------------------

export const LoginPageModal = React.forwardRef<LoginPageModalRef, LoginPageProps>(({ onClose, onSubmitOk }, ref) => {
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
                closable={!false}
                maskClosable={true}
                width={600}
                open={visible}
                onCancel={handleClose}
                closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '18px' }} />}
            >
                {/* backgroup  */}
                <div className="absolute top-0 left-0 w-full h-40 bg-red-600 rounded-t-lg">
                    <div className="relative h-40 pt-6 text-center text-white bg-red-600">
                        <h2 className="text-xl font-bold mb-4 mx-auto w-full">Đăng nhập</h2>
                    </div>
                </div>
                <div>
                    <LoginForm onClose={handleClose} />
                </div>
            </Modal>
        </div>
    )
})
export default LoginPageModal