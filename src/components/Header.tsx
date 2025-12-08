import React, { useState } from 'react'
import { Layout, Input, Button, Badge, Menu, Drawer, Divider } from 'antd'
import type { MenuProps } from 'antd'
import {
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
  PhoneOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getProvinces } from '@/api/province.api'

const { Header: AntHeader } = Layout
const { Search } = Input

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const handleGetProvinces = async () => {
    const response = await getProvinces()
    console.log(response)
  }

  // Search suggestions
  const searchSuggestions = [
    'Whey Protein',
    'Sữa Tăng Cân',
    'BCAA',
    'EAA',
    'Creatine',
    'Vitamin D3 K2',
    'Dầu cá Omega 3',
  ]

  // Navigation menu items
  const navMenuItems: MenuProps['items'] = [
    {
      key: 'supplements',
      label: (
        <span>
          Thực Phẩm Bổ Sung <DownOutlined className="text-xs ml-1" />
        </span>
      ),
      children: [
        { key: 'whey', label: 'Whey Protein' },
        { key: 'mass', label: 'Mass Gainer' },
        { key: 'bcaa', label: 'BCAA' },
        { key: 'creatine', label: 'Creatine' },
      ],
    },
    {
      key: 'goals',
      label: (
        <span>
          Mục Tiêu & Nhu Cầu <DownOutlined className="text-xs ml-1" />
        </span>
      ),
    },
    {
      key: 'promotions',
      label: (
        <span>
          Khuyến Mãi <DownOutlined className="text-xs ml-1" />
        </span>
      ),
    },
    {
      key: 'brands',
      label: <Link to="/brands">Thương Hiệu</Link>,
    },
    {
      key: 'knowledge',
      label: (
        <span>
          Kiến Thức <DownOutlined className="text-xs ml-1" />
        </span>
      ),
    },
    {
      key: 'tools',
      label: (
        <span>
          Công Cụ <DownOutlined className="text-xs ml-1" />
        </span>
      ),
    },
    {
      key: 'stores',
      label: <Link to="/stores">Hệ Thống Cửa Hàng</Link>,
    },
    {
      key: 'login',
      label: <Link to="/login">Đăng Nhập</Link>,
    },
  ]

  return (
    <>
      {/* Top Bar - Red Background with Commitments */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm">
            <span>HIỆU SUPPLEMENTS UY TÍN TỪ 2011</span>
            <Divider orientation="vertical" className="bg-white/30 h-4" />
            <span>CAM KẾT CHUẨN 100% CHÍNH HÃNG</span>
            <Divider orientation="vertical" className="bg-white/30 h-4 hidden md:block" />
            <span className="hidden md:inline">
              GIAO HÀNG NỘI THÀNH SIÊU TỐC 1 - 4H
            </span>
            <Divider orientation="vertical" className="bg-white/30 h-4 hidden lg:block" />
            <span className="hidden lg:inline">
              FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 1
            </span>
          </div>
        </div>
      </div>

      {/* Main Header - Dark Red Background */}
      <AntHeader className=" from-red-800 to-red-900 text-white sticky top-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-6">
            {/* Logo Section */}
            <Link to="/" className="shrink-0">
              <div className="text-3xl font-bold text-white">HEROIC</div>
              <div className="text-xs text-white/80 mt-1">
                Gym Equipment & Supplements
              </div>
            </Link>

            {/* Search Bar Section - Center */}
            <div className="flex-1 max-w-2xl">
              <Search
                placeholder="Tìm kiếm..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    danger
                    icon={<SearchOutlined />}
                    className="h-full"
                  >
                    Tìm kiếm
                  </Button>
                }
                size="large"
                className="w-full"
              />
              {/* Search Suggestions */}
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-white/80">
                {searchSuggestions.map((suggestion, index) => (
                  <span
                    key={index}
                    className="cursor-pointer hover:text-white transition"
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="shrink-0 flex items-start gap-4">
              {/* Hotline */}
              <div className="hidden lg:flex flex-col items-start">
                <div className="flex items-center gap-2 text-sm">
                  <PhoneOutlined />
                  <span>Gọi mua hàng</span>
                </div>
                <div className="text-lg font-bold mt-1">1900 1234</div>
              </div>

              {/* Cart */}
              <Badge count={0} showZero={false} offset={[-5, 5]}>
                <Button
                  type="primary"
                  danger
                  icon={<ShoppingCartOutlined />}
                  className="flex items-center gap-2 border-yellow-400 border-2"
                  style={{ backgroundColor: '#dc2626' }}
                  onClick={handleGetProvinces}
                >
                  <span className="hidden md:inline">Giỏ hàng</span>
                </Button>
              </Badge>

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setDrawerVisible(true)}
              />
            </div>
          </div>
        </div>
      </AntHeader>

      {/* Navigation Bar - White Background */}
      <div className="bg-white border-b shadow-sm sticky top-[140px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <Menu
            mode="horizontal"
            items={navMenuItems}
            className="border-none hidden lg:flex"
            style={{ lineHeight: '48px' }}
          />
          {/* Mobile menu indicator */}
          <div className="lg:hidden py-3 text-center text-sm text-gray-600">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            >
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden bg-white border-b px-4 py-3">
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        size={280}
      >
        <Menu
          mode="vertical"
          items={navMenuItems}
          className="border-none"
          onClick={() => setDrawerVisible(false)}
        />
      </Drawer>
    </>
  )
}

export default Header
