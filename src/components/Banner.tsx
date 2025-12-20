import React from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const Banner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="relative w-full overflow-hidden"
    >
      <BackgroundGradient
        containerClassName="w-full rounded-none"
        className="w-full bg-gray-900/90 dark:bg-gray-950/90 rounded-none"
        animate={true}
      >
        {/* Content */}
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Promotional Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-sm md:text-base lg:text-lg font-bold text-yellow-300 drop-shadow-lg">
                  COMBO KHỦNG - GIÁ LẠI CÒN ĐẸP NHẤT THỊ TRƯỜNG
                </span>
              </div>
            </div>

            {/* Center: BIG SALE */}
            <div className="hidden lg:flex items-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-yellow-400 drop-shadow-lg">
                BIG SALE
              </div>
            </div>

            {/* Right: Gift Promotion */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs md:text-sm text-yellow-200 font-medium">QUÀ TẶNG LÊN ĐẾN</div>
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-yellow-300 drop-shadow-lg">700K</div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Close banner"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default Banner;
