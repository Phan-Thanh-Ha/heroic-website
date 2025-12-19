import icon404 from "@/assets/icons/404.svg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white">
      <div className="max-w-xl w-full flex flex-col items-center px-4 text-center">
        <img
          src={icon404}
          alt="404 - Page not found"
          className="w-full max-w-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-900">404</h1>
        <p className="text-gray-600 mb-6">
          Xin lỗi, trang bạn truy cập không tồn tại hoặc đã bị thay đổi.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
};

