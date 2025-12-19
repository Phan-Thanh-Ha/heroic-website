import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { customerStore, useCustomerStore } from '@/store';
import {
  LoginPageModal,
  type LoginPageModalRef,
} from '@/views/LoginPage/LoginPage';
import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Image,
  Input,
  Layout,
  Row,
  Space,
  Tooltip,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

const { Header: AntHeader } = Layout;
const Header = observer(() => {
  const { isAuthenticated } = useCustomerStore();
  const modalRef = useRef<LoginPageModalRef>(null);

  // Hàm xử lý khi bấm nút (sử dụng modalRef)
  const handleLoginClick = () => {
    modalRef.current?.handleOpen();
  };

  const handleLogout = () => {
    customerStore.logout();
  };

  const profileMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Trang cá nhân',
      icon: <UserOutlined />,
      onClick: () => {
        console.log('Đi tới trang cá nhân');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
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
              <Row align="middle" gutter={[16, 16]}>
                {/* Khối ngôn ngữ */}
                <LanguageSwitcher />
                {/* Khối Avatar & Tên + Menu Profile */}
                <Col>
                    <Dropdown
                      menu={{ items: profileMenuItems }}
                      trigger={['click']}
                      arrow
                      placement="bottomLeft"
                    >
                      <Space
                        size="middle"
                        className="cursor-pointer select-none"
                      >
                        <Image
                          width={40}
                          height={40}
                          preview={false}
                          className="rounded-lg mt-3"
                          src={
                            customerStore.customers?.avatarUrl ??
                            'https://www.gravatar.com/avatar/...'
                          }
                        />
                        {/* Ẩn tên trên màn hình nhỏ hơn 576px (xs) */}
                        <div className="hidden-xs flex flex-col text-white leading-tight">
                          <span className="text-xs opacity-80">Xin chào</span>
                          <span className="font-bold text-sm">
                            {customerStore.customers?.fullName}
                          </span>
                        </div>
                      </Space>
                    </Dropdown>
                </Col>

                {/* Khối Giỏ hàng (Ẩn bớt chữ Thành tiền trên mobile) */}
                <Col className="hidden-sm">
                  <Space size="small">
                    <Tooltip title="Giỏ hàng">
                      <a href="/cart">
                        <Badge count={5} size="small">
                          <ShoppingCartOutlined style={{ color: 'white', fontSize: 24 }} />
                        </Badge>
                      </a>
                    </Tooltip>
                    <div className="flex flex-col text-white leading-tight al ">
                      <span className="text-xs opacity-80">Thành tiền</span>
                      <span className="font-semibold text-sm">100.000 VNĐ</span>
                    </div>
                  </Space>
                </Col>

                {/* Khối Thông báo & Giỏ hàng rút gọn cho Mobile */}
                <Col className="visible-xs">
                  <Space size="large">
                    <Tooltip title="Thông báo">
                      <Badge count={5} size="small">
                        <BellOutlined style={{ color: 'white', fontSize: 24 }} />
                      </Badge>
                    </Tooltip>
                  </Space>
                </Col>

              </Row>
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
