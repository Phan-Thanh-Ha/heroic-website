import {
    EyeInvisibleOutlined,
    EyeTwoTone
} from '@ant-design/icons';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { Button, Divider, Form, Input } from 'antd';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { authApi } from '@/api/auth.api';
import { getMessageInstance } from '@/util/messageService';
import icFacebook from '@/assets/icons/ic-facebook.svg';
import { customerStore } from '@/store';

interface LoginFormProps {
    onRegisterClick?: () => void;
    onCloseModal?: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick, onCloseModal }) => {
    const messageApi = getMessageInstance();
    // Hàm xử lý khi đăng nhập thành công với Google
    const handleSuccessGoogle = async (credentialResponse: CredentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential || 'null');
            if (decoded) {
                // gọi API login
                const payload = {
                    googleId: decoded.sub,
                    email: (decoded as any).email,
                    firstName: (decoded as any).family_name,
                    lastName: (decoded as any).given_name,
                    fullName: (decoded as any).name || (decoded as any).given_name + ' ' + (decoded as any).family_name,
                    avatarUrl: (decoded as any).picture,
                }
                const response = await authApi.loginGoogle(payload);
                
                if(response.success){
                    console.log("🚀 🇵 🇭: ~ response.data.info:", response.data.info)
                    console.log("🚀 🇵 🇭: ~ response.data.accessToken:", response.data.accessToken)
                    customerStore.setAuth({
                        customer: response.data.info,
                        token: response.data.accessToken
                    });
                    //Đóng modal login
                    onCloseModal?.();
                    messageApi?.success(response.message);
                }
            } else {
                console.error('Không thể giải mã token JWT từ Google.');
            }
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
        }
    }

    // Hàm xử lý khi form gửi thành công
    const onFinish = (values: any) => {
        console.log('Thông tin đăng nhập:', values);
        // Thêm logic API login ở đây
    };

    //#region Facebook Login
    const handleSuccessFacebook = async (fbProfile: any) => {
        try {
            const payload = {
                facebookId: fbProfile.id,
                fullName: fbProfile.name,
                avatarUrl: fbProfile.picture?.data?.url,
                email: fbProfile.email || 'Heroic@gmail.com',
            }
            const apiResponse = await authApi.loginFacebook(payload);
            if (apiResponse.success) {
                messageApi?.success(apiResponse.message);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý login Facebook:', error);
        }
    }
    //#endregion

    // Hàm xử lý khi bấm vào link đăng ký ngay
    const handleRegisterClick = () => {
        onRegisterClick?.();
    }

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
                            size="large"
                        >
                            Đăng Nhập Ngay
                        </Button>
                    </Form.Item>

                    <div className='flex justify-self-end'>
                        <span className="text-sm text-red-400 jus">Quên mật khẩu?</span>
                    </div>

                    <Divider>
                        <span className="text-gray-500 text-sm">Hoặc tiếp tục với</span>
                    </Divider>

                    <div className="flex flex-1 justify-between">
                        <div className='w-1/2 mr-2'>
                            <FacebookLogin
                                appId={import.meta.env.VITE_FB_APP_ID || ''}
                                scope="public_profile"
                                fields="name,picture"
                                onFail={(error) => console.error('Facebook login failed', error)}
                                onProfileSuccess={(response) => handleSuccessFacebook(response)}
                                className="w-full h-10 rounded border border-gray-300 flex items-center justify-center text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <img src={icFacebook} alt="Facebook" className="w-4 h-4" />
                                    <span>Facebook</span>
                                </span>
                            </FacebookLogin>
                        </div>
                        <div className='w-1/2 ml-2' style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        handleSuccessGoogle(credentialResponse);
                                    }}
                                    useOneTap={false}
                                    shape="rectangular"
                                    theme="outline"
                                    size="large"
                                    text="signin_with"
                                    containerProps={{ className: 'w-full h-10 rounded border border-gray-300 flex items-center justify-center text-gray-700 font-medium hover:bg-gray-100 transition-colors' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6 text-sm">
                        Bạn chưa có tài khoản?
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRegisterClick();
                            }}
                            className="text-red-600 hover:text-red-700 font-semibold ml-1"
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;