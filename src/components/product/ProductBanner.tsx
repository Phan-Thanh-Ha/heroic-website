import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import banner1 from "@/assets/images/banner1.webp";
import banner2 from "@/assets/images/banner2.webp";
import banner3 from "@/assets/images/banner3.webp";
import banner4 from "@/assets/images/banner4.webp";
import banner5 from "@/assets/images/banner5.webp";

const ProductBanner: React.FC = () => {
  // Hình ảnh cho carousel bên trái
  const carouselImages = [banner1, banner2, banner3];

  // Hình ảnh cố định bên phải
  const fixedImages = [banner4, banner5];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Đổi hình mỗi 5 giây

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="w-full container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px] lg:h-[500px]">
        {/* Carousel bên trái - chiếm 2/3 */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={carouselImages[currentIndex]}
                alt={`Banner ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2 hình ảnh cố định bên phải */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {fixedImages.map((image, index) => (
            <div
              key={index}
              className="flex-1 relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={image}
                alt={`Fixed banner ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
