import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useImperativeHandle, useState } from 'react'


// --- Khai báo Types ---
interface RegisterPageProps {
    onClose?: () => void;
    onSubmitOk?: () => void;
}

export interface RegisterPageModalRef {
    handleOpen: () => void;
}
// -----------------------
export const RegisterPageModal = React.forwardRef<RegisterPageModalRef, RegisterPageProps>(({ onClose, onSubmitOk }, ref) => {
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

    // Hàm xử lý khi form gửi thành công
    const onFinish = (values: any) => {
        console.log('Thông tin đăng ký:', values);
        // Thêm logic API đăng ký ở đây
    }

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
                <div>
                    <h2>Đăng ký</h2>
                </div>
            </Modal>
        </div>
    )
})
