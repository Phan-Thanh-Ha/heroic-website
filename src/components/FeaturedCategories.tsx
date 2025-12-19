import React from 'react';
import { Card, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

// Import images from image-product folder
import iconWhey from '@/assets/image-product/icon-whey_1703565401.jpg.webp';
import iconMassGainer from '@/assets/image-product/icon-mass-gainer_1703565419.jpg';
import iconBCAA from '@/assets/image-product/icon-bcaa-eaa_1703565431.jpg';
import iconTangSucManh from '@/assets/image-product/icon-tang-suc-manh_1703565453.jpg';
import iconThucPhamChucNang from '@/assets/image-product/icon-thuc-pham-chuc-nang_1707105206.jpg';
import iconVitaminDauCa from '@/assets/image-product/icon-viatamin-dau-ca_1703565469.jpg';

interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Whey Protein',
    image: iconWhey,
    description: 'Bổ sung protein chất lượng cao',
  },
  {
    id: 2,
    name: 'Mass Gainer',
    image: iconMassGainer,
    description: 'Tăng cân hiệu quả',
  },
  {
    id: 3,
    name: 'BCAA/EAA',
    image: iconBCAA,
    description: 'Hỗ trợ phục hồi cơ bắp',
  },
  {
    id: 4,
    name: 'Tăng Sức Mạnh',
    image: iconTangSucManh,
    description: 'Nâng cao hiệu suất tập luyện',
  },
  {
    id: 5,
    name: 'Thực Phẩm Chức Năng',
    image: iconThucPhamChucNang,
    description: 'Hỗ trợ sức khỏe tổng thể',
  },
  {
    id: 6,
    name: 'Vitamin Dầu Cá',
    image: iconVitaminDauCa,
    description: 'Bổ sung omega-3 và vitamin',
  },
];

const FeaturedCategories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    // Navigate to category page or product list
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Danh Mục Nổi Bật
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map((category) => (
            <Card
              key={category.id}
              hoverable
              className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => handleCategoryClick(category.id)}
              cover={
                <div className="p-4 bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    preview={false}
                    className="object-contain"
                    style={{ height: 120, width: '100%' }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={
                  <span className="text-sm font-semibold text-gray-800">
                    {category.name}
                  </span>
                }
                description={
                  category.description && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      {category.description}
                    </span>
                  )
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;

