import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    FacebookOutlined,
    GoogleOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import React from 'react';

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {

    // Hàm xử lý khi form gửi thành công
    const onFinish = (values: any) => {
        console.log('Thông tin đăng nhập:', values);
        // Thêm logic API login ở đây
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-lg mt-20">
            <div className="relative bg-white p-8">
                <Form layout="vertical" onFinish={onFinish} >
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        className="mb-6"
                    >
                        <Input placeholder="Nhập số điện thoại" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        className="mb-8"
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            className="h-11 border-gray-300"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>



                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="h-12 text-lg font-bold bg-red-600 hover:bg-red-700 border-none"
                        >
                            Đăng Nhập Ngay
                        </Button>
                    </Form.Item>

                    <Divider>
                        <span className="text-gray-500 text-sm">Hoặc tiếp tục với</span>
                    </Divider>

                    <div className="flex justify-between gap-3">
                        <Button
                            icon={<FacebookOutlined />}
                        >
                            Đăng nhập với Facebook
                        </Button>

                        <Button
                            block
                            icon={<GoogleOutlined />}
                        >
                            Đăng nhập với Google
                        </Button>
                    </div>

                    <div className="text-center mt-6 text-sm">
                        Bạn chưa có tài khoản?
                        <a href="#" className="text-red-600 hover:text-red-700 font-semibold ml-1">Đăng ký ngay</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;