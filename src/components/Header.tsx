import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg';
import flagCn from '@/assets/icons/ic-flag-cn.svg';
import flagEn from '@/assets/icons/ic-flag-en.svg';
import flagVi from '@/assets/icons/ic-flag-vi.svg';
import { customerStore, useCustomerStore } from '@/store';
import {
  LoginPageModal,
  type LoginPageModalRef,
} from '@/views/LoginPage/LoginPage';
import {
  BellOutlined,
  DownOutlined,
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
import { useRef, useState } from 'react';

const { Header: AntHeader } = Layout;
const Header = observer(() => {
  const { isAuthenticated } = useCustomerStore();
  const modalRef = useRef<LoginPageModalRef>(null);
  const [language, setLanguage] = useState<'vi' | 'en' | 'cn'>('vi');

  // Hàm xử lý khi bấm nút (sử dụng modalRef)
  const handleLoginClick = () => {
    modalRef.current?.handleOpen();
  };

  const handleLogout = () => {
    customerStore.logout();
  };

  const handleChangeLanguage = (lang: 'vi' | 'en' | 'cn') => {
    setLanguage(lang);
    // TODO: Tích hợp i18n tại đây (ví dụ: i18next.changeLanguage(lang))
    console.log('Đổi ngôn ngữ sang:', lang);
  };

  const getLanguageLabel = (lang: 'vi' | 'en' | 'cn') => {
    if (lang === 'vi') return 'Tiếng Việt';
    if (lang === 'en') return 'English';
    return '中文';
  };

  const getFlagSrc = (lang: 'vi' | 'en' | 'cn') => {
    if (lang === 'vi') return flagVi;
    if (lang === 'en') return flagEn;
    return flagCn;
  };

  // Ngôn ngữ mặc định là Tiếng Việt.
  // Menu chỉ hiển thị các ngôn ngữ KHÁC với ngôn ngữ đang chọn.
  const languageMenuItems: MenuProps['items'] = (['vi', 'cn', 'en'] as const)
    .filter((code) => code !== language)
    .map((code) => ({
      key: code,
      label: (
        <span className="flex items-center gap-2">
          <img
            src={getFlagSrc(code)}
            alt={getLanguageLabel(code)}
            className="w-4 h-4"
          />
          <span>{getLanguageLabel(code)}</span>
        </span>
      ),
      onClick: () => handleChangeLanguage(code),
    }));

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
                {/* Khối ngôn ngữ (cờ + mũi tên, nền trong suốt) */}
                <Col className='mr-10'>
                  <Dropdown
                    menu={{ items: languageMenuItems }}
                    trigger={['click']}
                    arrow
                    placement="bottomCenter"
                    className='w-full'
                  >
                    <Button
                      type="text"
                      icon={
                        <span className="flex items-center gap-1">
                          <img
                            src={getFlagSrc(language)}
                            alt={getLanguageLabel(language)}
                            className="w-10 h-5"
                          />
                          <DownOutlined style={{ fontSize: 10, color: '#ffffff' }} />
                        </span>
                      }
                      style={{ padding: 0, height: 'auto' }}
                    />
                  </Dropdown>
                </Col>
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
                      <Badge count={5} size="small">
                        <ShoppingCartOutlined style={{ color: 'white', fontSize: 24 }} />
                      </Badge>
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
