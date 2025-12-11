import banner from '@/assets/banner.jpg.webp';
import logo from '@/assets/icon-512.svg';
import { colors } from '@/config';
import { SearchOutlined } from '@ant-design/icons';
import { Image, Input, Layout } from 'antd';

const { Header: AntHeader } = Layout

const Header = () => {
  return (
    <div className="w-full">
      {/* bg xanh dương */}
      <div className="w-full flex justify-center items-center bg-sky-400" >
        <Image
          alt="Heroic banner"
          src={banner}
          preview={false}
        />
      </div>

      <AntHeader
        style={{
          background: colors.brand.primary,
          padding: '0 16px',
          textAlign: 'center',
          height: '100px',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          maxWidth: '100vw',
          margin: 0,
        }}
      >

        <div className="grid grid-cols-3 grid-rows-1 gap-5" style={{ width: '100%', margin: '0 auto' }}>
          <div>
            <Image
              alt="Heroic Gym Store"
              src={logo}
              preview={false} 
              style={{ width: 100, height: 80, objectFit: 'contain', marginTop: 10 }}
            />
          </div>
          <div className='grid grid-cols-1 grid-rows-1 justify-center items-center'>
            {/* tìm kiếm */}
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined />}
              style={{ width: 300, height: 40, borderRadius: 10, marginTop: 10 }}
              
            />
          </div>
          <div>3</div>
        </div>

      </AntHeader>
    </div>
  );
};

export default Header
