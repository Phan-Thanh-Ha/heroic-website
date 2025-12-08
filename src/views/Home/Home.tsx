import { useEffect } from "react";
import { Banner } from "@/components";

export const Home = ({ title = "" }) => {
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <>
            <Banner />
        </>
    );
};
