import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg'; 
import { colors } from '@/config';
import { LoginOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, Input, Layout, Space } from 'antd';
import Link from 'antd/es/typography/Link';

const { Header: AntHeader } = Layout

const Header = () => {
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
          
          <div className='grid grid-cols-1 grid-rows-1 justify-center items-center'>
            {/* tìm kiếm */}
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined />}
              className='w-full'
              style={{  height: 40, borderRadius: 10 }}
            />
          </div>
          <div className='flex items-center gap-2 justify-center'>
            <div className='flex items-center gap-2 justify-center'>
              <Space size={10} className='text-white'>
                <UserOutlined className='text-white' />
                Đăng ký/Đăng nhập
              </Space>
            </div>
          </div>
        </div>

      </AntHeader>
    </div>
  );
};

export default Header
