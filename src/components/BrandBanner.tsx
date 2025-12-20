import React from "react";
import { motion } from "motion/react";

interface Brand {
  id: string;
  name: string;
  logo?: string; // Có thể thêm logo sau
}

const brands: Brand[] = [
  { id: "optimum-nutrition", name: "Optimum Nutrition" },
  { id: "nutrabolics", name: "Nutrabolics" },
  { id: "dynatics", name: "Perfecting Athletic Nutrition" },
  { id: "now", name: "NOW" },
  { id: "redcon1", name: "REDCON1" },
  { id: "rule1", name: "Rule 1" },
  { id: "applied-nutrition", name: "Applied Nutrition" },
  { id: "amix", name: "AMIX Advanced Nutrition" },
  { id: "bpi-sports", name: "BPI Sports" },
  { id: "mhp", name: "MHP Maximum Human Performance" },
  { id: "mutant", name: "Mutant" },
  { id: "nutricost", name: "Nutricost" },
  { id: "labrada", name: "Labrada Nutrition" },
  { id: "pvl", name: "PVL Pure Vita Labs" },
  { id: "muscletech", name: "Muscletech" },
];

const BrandBanner: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
          THƯƠNG HIỆU NỔI BẬT
        </h2>

        {/* Description */}
        <p className="text-center mb-8 text-sm md:text-base">
          <span className="text-primary font-semibold">Heroic</span>{" "}
          <span className="text-foreground">
            Uy Tín 10 Năm Bán Hàng - Cam Kết Chính Hãng 100%, Bồi Thường 20 Lần Nếu Phát Hiện Hàng Giả
          </span>
        </p>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 flex items-center justify-center min-h-[120px] hover:shadow-lg transition-shadow duration-300 group"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {brand.name}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandBanner;

