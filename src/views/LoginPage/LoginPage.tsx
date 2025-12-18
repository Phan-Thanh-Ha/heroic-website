import { Modal } from 'antd'
import React, { useState, useImperativeHandle, useRef } from 'react'
import LoginForm from './components/LoginForm';
import { CloseOutlined } from '@ant-design/icons';
import { RegisterPageModal, type RegisterPageModalRef } from '../RegisterPage/RegisterPage';

// --- Khai báo Types ---
interface LoginPageProps {
    onClose?: () => void;
    onSubmitOk?: () => void;
}

export interface LoginPageModalRef {
    handleOpen: () => void;
}
// -----------------------

export const LoginPageModal = React.forwardRef<LoginPageModalRef, LoginPageProps>(({ onClose }, ref) => {
    const [visible, setVisible] = useState(false);
    const registerModalRef = useRef<RegisterPageModalRef | null>(null);

    // Hàm để MỞ Modal
    const handleOpen = () => {
        // Nếu là đăng ký ngay thì đóng modal login và mở modal register
        if (onClose) onClose();
        setVisible(true);
    }

    // Hàm để ĐÓNG Modal
    const handleClose = () => {
        setVisible(false);
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
                    <LoginForm
                        onRegisterClick={() => {
                            handleClose();
                            registerModalRef.current?.handleOpen();
                            console.log('registerModalRef', registerModalRef);
                        }}
                        onCloseModal={() => {
                            handleClose();
                        }}
                    />
                </div>
            </Modal>

            <RegisterPageModal
                ref={registerModalRef}
                onClose={() => console.log("Close modal")}
                onSubmitOk={() => console.log("Submit OK")}
                onLoginClick={() => {
                    // Khi từ modal đăng ký bấm "Đăng nhập ngay" thì mở lại modal đăng nhập
                    setVisible(true);
                }}
            />

        </div>
    )
})
export default LoginPageModal