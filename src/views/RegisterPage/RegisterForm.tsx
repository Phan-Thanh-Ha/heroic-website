import React, { useEffect } from 'react';
import { Form, Input, Button, Divider, Select, DatePicker, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import { SelectProvinces } from '@/components';

interface RegisterFormProps {
    onLoginClick?: () => void;
    onFinish?: (values: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick, onFinish }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        console.log('Register values:', values);
        if (onFinish) onFinish(values);
    };

    const handleGetProvinces = () => {
         console.log('Register values:',)
    }

    useEffect(() => {
        handleGetProvinces()
    },[])

    return (
        // Container nền trắng, đổ bóng, đẩy xuống dưới để đè lên header màu đỏ của Modal
        <div className="relative bg-white p-8 rounded-lg shadow-lg mt-10 mx-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                scrollToFirstError={true}
            >
                {/* HỌ VÀ TÊN */}
                <div className="flex gap-4">
                    <Form.Item
                        label={<span className="font-semibold">Họ</span>}
                        name="lastName"
                        rules={[{ required: true, message: 'Vui lòng nhập Họ!' }]}
                        className="flex-1"
                    >
                        <Input placeholder="Nhập họ" className="h-11 border-gray-300" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-semibold">Tên</span>}
                        name="firstName"
                        rules={[{ required: true, message: 'Vui lòng nhập Tên!' }]}
                        className="flex-1"
                    >
                        <Input placeholder="Nhập tên" className="h-11 border-gray-300" />
                    </Form.Item>
                </div>

                {/* SỐ ĐIỆN THOẠI */}
                <Form.Item
                    label={<span className="font-semibold">Số điện thoại</span>}
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { pattern: /^\d+$/, message: 'Số điện thoại không hợp lệ!' }]}
                >
                    <Input placeholder="Nhập số điện thoại" className="h-11 border-gray-300" />
                </Form.Item>

                {/* EMAIL */}
                <Form.Item
                    label={<span className="font-semibold">Email</span>}
                    name="email"
                    rules={[{ type: 'email', message: 'Email không đúng định dạng!' }]}
                >
                    <Input placeholder="Nhập email" className="h-11 border-gray-300" />
                </Form.Item>

                {/* MẬT KHẨU */}
                <Form.Item
                    label={<span className="font-semibold">Mật khẩu</span>}
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu phải từ 6 ký tự trở lên!' }]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        className="h-11 border-gray-300"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                {/* XÁC NHẬN MẬT KHẨU */}
                <Form.Item
                    label={<span className="font-semibold">Xác nhận mật khẩu</span>}
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập lại mật khẩu"
                        className="h-11 border-gray-300"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                {/* NGÀY SINH */}
                <Form.Item
                    label={<span className="font-semibold">Ngày sinh</span>}
                    name="birthDate"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                >
                    <DatePicker
                        placeholder="Nhập ngày sinh"
                        className="w-full h-11 border-gray-300"
                        format="DD/MM/YYYY"
                        disabledDate={(current) => current && current > dayjs().endOf('day')}
                    />
                </Form.Item>

                {/* TỈNH / THÀNH PHỐ */}
                <Form.Item label={<span className="font-semibold">Tỉnh / Thành phố</span>} 
                name="province" 
                rules={[{ required: true, message: 'Vui lòng chọn!' }]}>
                    <SelectProvinces
                    onChange={(value) => {
                        console.log('day la bo',value)
                    }}
                    />
                    
                  
                </Form.Item>


                {/* QUẬN / HUYỆN */}
                <Form.Item
                    label={<span className="font-semibold">Quận / Huyện</span>}
                    name="district"
                    rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện!' }]}
                >
                    <Select placeholder="Chọn quận / huyện" className="h-11">
                        <Select.Option value="quan1">Quận 1</Select.Option>
                        <Select.Option value="binhthanh">Bình Thạnh</Select.Option>
                    </Select>
                </Form.Item>

                {/* PHƯỜNG / XÃ */}
                <Form.Item
                    label={<span className="font-semibold">Phường / Xã</span>}
                    name="ward"
                    rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]}
                >
                    <Select placeholder="Chọn phường / xã" className="h-11">
                        <Select.Option value="phuong1">Phường 1</Select.Option>
                    </Select>
                </Form.Item>

                {/* ĐỊA CHỈ */}
                <Form.Item
                    label={<span className="font-semibold">Địa chỉ</span>}
                    name="addressLine1"
                    rules={[{ required: true, message: 'Vui lòng Nhập Địa Chỉ!' }]}
                >
                    <Input placeholder="Nhập địa chỉ" className="h-11 border-gray-300" />
                </Form.Item>

                {/* ĐỊA CHỈ CỤ THỂ */}
                <Form.Item
                    label={<span className="font-semibold">Địa chỉ cụ thể</span>}
                    name="addressLine2"
                >
                    <Input placeholder="Số nhà và tên đường" className="h-11 border-gray-300" />
                </Form.Item>

                <Divider className="my-4" />

                {/* CHECKBOX ĐỒNG Ý ĐIỀU KHOẢN */}
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với Điều khoản!')) }]}
                >
                    <Checkbox>
                        Tôi đã đồng ý với các
                        <a href="#" className="text-red-600 font-semibold mx-1">Điều khoản</a> và
                        <a href="#" className="text-red-600 font-semibold ml-1">Chính sách của Thực phẩm Chức năng & Bổ sung</a>
                    </Checkbox>
                </Form.Item>

                {/* CHECKBOX */}
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với Điều khoản!')) }]}
                >
                    <Checkbox>
                        Tôi đã đồng ý với <a href="#" className="text-red-600 font-semibold">Điều khoản</a> và <a href="#" className="text-red-600 font-semibold">Chính sách</a>
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="h-12 text-lg font-bold bg-red-600 hover:bg-red-700 border-none"
                        onClick={handleGetProvinces}
                    >
                        ĐĂNG KÝ NGAY
                    </Button>
                </Form.Item>

                <div className="text-center mt-4 text-sm">
                    Bạn đã có tài khoản?
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (onLoginClick) onLoginClick(); }}
                        className="text-red-600 hover:text-red-700 font-semibold ml-1"
                    >
                        Đăng nhập ngay
                    </a>
                </div>
            </Form>


        </div>
    );
};

export default RegisterForm;