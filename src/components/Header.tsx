import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg';
import { customerStore, useCustomerStore } from '@/store';
import { LoginPageModal, type LoginPageModalRef, } from '@/views/LoginPage/LoginPage';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, Input, Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

const { Header: AntHeader } = Layout
const Header = observer(() => {
  const { isAuthenticated } = useCustomerStore();
  const modalRef = useRef<LoginPageModalRef>(null);

  // Hàm xử lý khi bấm nút (sử dụng modalRef)
  const handleLoginClick = () => {
      modalRef.current?.handleOpen();
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center bg-sky-400" >
        <Image
          alt="Heroic banner"
          src={banner}
          preview={false}
        />
      </div>

      <AntHeader
        style={{
          textAlign: 'center',
          height: '100px',
        }}
      >

        <div className="grid grid-cols-3 grid-rows-1 gap-5">
          <div className='flex items-center gap-2 justify-center'>
            <Image
              alt="Heroic Gym Store"
              src={logo}
              preview={false}
              style={{ width: 100, height: 80, objectFit: 'contain', marginTop: 10 }}
            />
            <span className='text-white text-2xl font-bold align-middle'>HEROIC GYM STORE</span>
          </div>

          <div className='grid grid-cols-1 grid-rows-1 justify-center items-center mt-4'>
            {/* tìm kiếm */}
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined />}
              className='w-full'
              style={{ height: 40, borderRadius: 10 }}
            />
          </div>
          <div className='flex  items-center gap-2 justify-center mt-4'>
            {!isAuthenticated ? (
              <Button type="dashed" icon={<UserOutlined />} onClick={handleLoginClick}>
                Đăng nhập / Đăng ký
              </Button>
            ) : (
              <Button
                type="dashed"
                icon={<UserOutlined />}
                onClick={() => customerStore.logout()}
              >
                Đăng xuất
              </Button>
            )}
          </div>
        </div>
      </AntHeader>
      <LoginPageModal
        ref={modalRef}
        onClose={() => console.log("Close modal")}
        onSubmitOk={() => console.log("Submit OK")}
      />

    </div>
  );
});

export default Header
