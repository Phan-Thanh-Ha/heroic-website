import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import iconWhey from "@/assets/image-product/icon-whey_1703565401.jpg.webp";
import iconMassGainer from "@/assets/image-product/icon-mass-gainer_1703565419.jpg";
import iconBCAA from "@/assets/image-product/icon-bcaa-eaa_1703565431.jpg";
import iconTangSucManh from "@/assets/image-product/icon-tang-suc-manh_1703565453.jpg";
import iconVitamin from "@/assets/image-product/icon-viatamin-dau-ca_1703565469.jpg";
import iconThucPhamChucNang from "@/assets/image-product/icon-thuc-pham-chuc-nang_1707105206.jpg";

interface Category {
    id: string;
    name: string;
    image: string;
    gradient: string;
    link: string;
}

const categories: Category[] = [
    {
        id: "whey",
        name: "Whey Protein",
        image: iconWhey,
        gradient: "from-purple-500 to-blue-500",
        link: "/products/whey-protein",
    },
    {
        id: "mass-gainer",
        name: "Mass Gainer",
        image: iconMassGainer,
        gradient: "from-green-500 to-emerald-400",
        link: "/products/mass-gainer",
    },
    {
        id: "bcaa",
        name: "BCAA - EAA - Amino Acid",
        image: iconBCAA,
        gradient: "from-orange-500 to-pink-500",
        link: "/products/bcaa-eaa",
    },
    {
        id: "strength",
        name: "Tăng sức mạnh",
        image: iconTangSucManh,
        gradient: "from-orange-500 to-yellow-500",
        link: "/products/tang-suc-manh",
    },
    {
        id: "vitamin",
        name: "Vitamin - D3&K2 - Dầu Cá",
        image: iconVitamin,
        gradient: "from-purple-500 to-orange-500",
        link: "/products/vitamin",
    },
    {
        id: "functional",
        name: "Thực phẩm chức năng",
        image: iconThucPhamChucNang,
        gradient: "from-green-500 to-cyan-400",
        link: "/products/thuc-pham-chuc-nang",
    },
];

const CategoryBanner: React.FC = () => {
    return (
        <div className="w-full container mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
                DANH MỤC NỔI BẬT
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <Link
                            to={category.link}
                            className="group relative w-full aspect-square max-w-[140px] mx-auto"
                        >
                            {/* Circular container with gradient */}
                            <div
                                className={`relative w-full h-full rounded-full bg-gradient-to-br ${category.gradient} p-1 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl`}
                            >
                                {/* Inner white circle */}
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-2 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </div>
                            </div>
                        </Link>

                        {/* Category label */}
                        <h3 className="mt-3 text-sm md:text-base font-medium text-center text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                        </h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBanner;

