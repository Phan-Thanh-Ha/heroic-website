import { useEffect } from "react";
import { Banner } from "@/components";
import banner1 from '@/assets/images/banner2.webp';
import banner2 from '@/assets/images/banner3.webp';
import { Image } from "antd";
export const Home = ({ title = "" }) => {
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 grid-rows-3 gap-4">
                <div className="col-span-2 row-span-3">
                    <Banner height={300} />
                </div>

                <div className="col-span-1 row-span-1">
                    <Image src={banner1} alt="banner" style={{ borderRadius: 8 }} />
                </div>
                <div className="col-span-1 row-span-2">
                    <Image src={banner2} alt="banner" style={{ borderRadius: 8 }} />
                </div>
            </div>
        </>
    );
};
