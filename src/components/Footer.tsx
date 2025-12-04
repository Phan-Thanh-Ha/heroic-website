import React from 'react'
import { Layout, Row, Col, Typography, Space } from 'antd'
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Footer: AntFooter } = Layout
const { Title, Text } = Typography

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              HEROIC GYM STORE
            </Title>
            <Text className="text-gray-400 block mb-2">
              Chuyên cung cấp dụng cụ và thiết bị tập gym chính hãng, chất
              lượng cao.
            </Text>
            <Space size="middle" className="mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition"
              >
                <FacebookOutlined className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition"
              >
                <InstagramOutlined className="text-xl" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition"
              >
                <YoutubeOutlined className="text-xl" />
              </a>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Liên kết nhanh
            </Title>
            <Space direction="vertical" size="small" className="w-full">
              <Link to="/" className="text-gray-400 hover:text-white block">
                Trang chủ
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white block">
                Giới thiệu
              </Link>
              <Link
                to="/products"
                className="text-gray-400 hover:text-white block"
              >
                Sản phẩm
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white block"
              >
                Liên hệ
              </Link>
            </Space>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Hỗ trợ khách hàng
            </Title>
            <Space direction="vertical" size="small" className="w-full">
              <Link
                to="/shipping"
                className="text-gray-400 hover:text-white block"
              >
                Chính sách vận chuyển
              </Link>
              <Link
                to="/return"
                className="text-gray-400 hover:text-white block"
              >
                Chính sách đổi trả
              </Link>
              <Link
                to="/warranty"
                className="text-gray-400 hover:text-white block"
              >
                Chính sách bảo hành
              </Link>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-white block"
              >
                Câu hỏi thường gặp
              </Link>
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Thông tin liên hệ
            </Title>
            <Space direction="vertical" size="middle" className="w-full">
              <div className="flex items-start gap-2">
                <PhoneOutlined className="text-gray-400 mt-1" />
                <div>
                  <Text className="text-gray-400 block">Hotline</Text>
                  <Text className="text-white">1900 1234</Text>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MailOutlined className="text-gray-400 mt-1" />
                <div>
                  <Text className="text-gray-400 block">Email</Text>
                  <Text className="text-white">support@heroicgym.com</Text>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <EnvironmentOutlined className="text-gray-400 mt-1" />
                <div>
                  <Text className="text-gray-400 block">Địa chỉ</Text>
                  <Text className="text-white text-sm">
                    123 Đường ABC, Quận XYZ, TP.HCM
                  </Text>
                </div>
              </div>
            </Space>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={12}>
              <Text className="text-gray-400 text-sm">
                © 2025 Heroic Gym Store. Tất cả quyền được bảo lưu.
              </Text>
            </Col>
            <Col xs={24} sm={12} className="text-right mt-2 sm:mt-0">
              <Space>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Chính sách bảo mật
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Điều khoản sử dụng
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer

