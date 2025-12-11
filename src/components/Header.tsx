import { colors } from '@/config';
import { Layout, Image, Input, Button, Menu } from 'antd';
import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Header: AntHeader } = Layout

const Header = () => {
  const items = [
    {
      label: 'Trang chủ',
      key: 'home',
    },
    {
      label: 'Sản phẩm',
      key: 'products',
    },
    {
      label: 'Liên hệ',
      key: 'contact',
    },
  ];
  return (
    <div>
      <div className="w-full">
        <Image
          alt="Heroic banner"
          src={banner}
          preview={false}
          style={{ width: '100%', height: 80, objectFit: 'contain' }}
        />
      </div>

      <AntHeader style={{ background: colors.brand.primary, padding: 0, textAlign: 'center', height: '100px' }}>
        <div className="grid grid-cols-3 grid-rows-1 gap-5">
          <div>
            {/* Logo Heroic Gym Store */}
            <div className="flex justify-center items-center">
              <Image
                alt="Heroic Gym Store"
                src={logo}
                preview={false}
                style={{ width: 100, height: 100, objectFit: 'contain' }}
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <Title level={2} className="text-white font-bold">Heroic Gym Store</Title>
            </div>
          </div>

          <div>
            <div className="">
              {/* tìm kiếm sản phẩm */}
              <Input
                placeholder="Tìm kiếm sản phẩm"
                prefix={<SearchOutlined />}
                style={{ width: '100%', height: 50 }}
              />
            </div>
            {/* menu */}
           
          </div>

          <div className="mt-5">
            {/*  yêu thích tài khoản giỏ hàng */}
            <div className="flex gap-2 items-center justify-center">
              <Button
                type="default"
                icon={<HeartOutlined />}
              >
                Yêu thích
              </Button>
              <Button
                type="default"
                icon={<ShoppingCartOutlined />}
              >
                Giỏ hàng
              </Button>
              <Button
                type="default"
                icon={<UserOutlined />}
              >
                Tài khoản
              </Button>
            </div>
          </div>
          
        </div>
      </AntHeader>
    </div>
  );
};

export default Header
