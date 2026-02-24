import { orderApi } from "@/api/order.api";
import { Empty } from "@/components";
import NavigationHeader from "@/components/NavigationHeader";
import { cartStore } from "@/store/cartStore";
import { customerStore } from "@/store/customerStore";
import type { IProduct } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import PaymentModal from "./components/PaymentModal";
import { ShippingInfo } from "./components/ShippingInfo";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const customerInfo = customerStore.customers;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Lấy giỏ hàng từ local storage
    const cartData = localStorage.getItem("cartStore");
    if (cartData) {
      try {
        const parsed = JSON.parse(cartData);
        setCartItems(parsed.cartItems);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.productDetails?.[0]) {
          return {
            ...item,
            productDetails: [
              {
                ...item.productDetails[0],
                quantity: quantity,
              },
            ],
          };
        }
        return item;
      }),
    );
    // gọi xuống cartStore để cập nhật giỏ hàng
    cartStore.updateCartItemQuantity(id, quantity);
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    cartStore.removeFromCart(id);
  };

  // Tiến hành thanh toán
  const handleCheckout = async () => {
    if (!customerInfo) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      return;
    }
    setIsSubmitting(true); // Bắt đầu loading
    try {
      const subtotal = cartStore.totalPrice;
      const orderInfo = {
        paymentMethod,
        cartItems,
        subTotal: subtotal,
        totalDiscount: 0,
        totalAmount: subtotal,
        shippingFee: 0,
        discountCode,
      };

      const response = await orderApi.create(orderInfo);

      if (response.success) {
        // 1. Chỉ thông báo 1 lần duy nhất từ API hoặc mặc định
        toast.success(response.message || "Đơn hàng đã được tạo thành công!");

        // 2. Xử lý điều hướng hoặc mở Modal
        if (paymentMethod === "transfer") {
          setShowPaymentModal(true);
          // Lưu ý: Nếu mở modal chuyển khoản, có thể bạn chưa muốn navigate ngay
        } else {
          navigate("/order");
        }

        // 3. (Tùy chọn) Xóa giỏ hàng sau khi đặt hàng thành công
        // cartStore.clearCart(); 

      } else {
        toast.error(response.message || "Tạo đơn hàng thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo đơn hàng");
    }
  };

  // Xử lý áp dụng mã giảm giá
  const handleApplyDiscount = () => {
    // Handle discount code logic
    console.log("Apply discount:", discountCode);
  };

  // Nếu không có giỏ hàng thì hiển thị thông báo
  if (cartItems.length === 0) {
    return (
      <Empty title="Giỏ hàng trống" description="Giỏ hàng của bạn đang trống" />
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      <NavigationHeader title="Giỏ hàng" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              product={item}
              key={item?.id}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="w-full sticky top-6">
            <CartSummary
              shippingFee={0}
              discountCode={discountCode}
              onDiscountCodeChange={setDiscountCode}
              onApplyDiscount={handleApplyDiscount}
              onCheckout={handleCheckout}
              onChangePaymentMethod={(method) =>
                setPaymentMethod(method as "cash" | "transfer")
              }
              isLoading={isSubmitting}
            />
          </div>
        </div>

        {/* Cột 3: Thông tin giao hàng (Tràn 3 cột bên dưới trên desktop) */}
        <div className="md:col-span-3 mt-4">
          <ShippingInfo />
        </div>
      </div>

      {/* Modal thanh toán chuyển khoản */}
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        amount={cartStore.totalPrice}
        bankCode={import.meta.env.VITE_BANK_NAME}
        accountNumber={import.meta.env.VITE_ACCOUNT_NUMBER_BANK}
        accountName="HEROIC-GYM-SHOP"
      />
    </div>
  );
};

export default CartPage;
