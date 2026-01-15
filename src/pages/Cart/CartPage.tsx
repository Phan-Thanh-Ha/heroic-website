import { Empty } from '@/components';
import NavigationHeader from '@/components/NavigationHeader';
import { cartStore } from '@/store/cartStore';
import { customerStore } from '@/store/customerStore';
import type { IProduct } from '@/types';
import { toJS } from 'mobx';
import React, { useEffect, useState } from 'react';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import { ShippingInfo } from './components/ShippingInfo';
import PaymentModal from './components/PaymentModal';
import { toast } from 'sonner';

const CartPage: React.FC = () => {
    const customerInfo = customerStore.customers;
    const [cartItems, setCartItems] = useState<IProduct[]>([]);
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [orderCode, setOrderCode] = useState<string>('');


    useEffect(() => {
        // Lấy giỏ hàng từ local storage
        const cartData = localStorage.getItem('cartStore');
        if (cartData) {
            try {
                const parsed = JSON.parse(cartData);
                setCartItems(parsed.cartItems);
            } catch (error) {
                console.error('Error parsing cart data:', error);
            }
        }
    }, []);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id && item.productDetails?.[0]) {
                    return {
                        ...item,
                        productDetails: [{
                            ...item.productDetails[0],
                            quantity: quantity
                        }]
                    };
                }
                return item;
            })
        );
        // gọi xuống cartStore để cập nhật giỏ hàng
        cartStore.updateCartItemQuantity(id, quantity);
    };

    const handleRemove = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        cartStore.removeFromCart(id);
    };

    // Xử lý thanh toán
    const handleCheckout = () => {
        if (!customerInfo) {
            toast.error('Vui lòng đăng nhập để thanh toán');
            return;
        }
        const customerInfoData = toJS(customerInfo);

        try {
            const subtotal = cartStore.totalPrice;
            // Tạo mã đơn hàng
            const newOrderCode = `ORDER${Date.now()}`;
            setOrderCode(newOrderCode);

            // Thông tin thanh toán
            const orderInfo = {
                paymentMethod: paymentMethod,
                customerInfo: customerInfoData,
                cartItems: cartItems,
                subTotal: subtotal,
                totalDiscount: 0, // Đơn giảm giá
                totalAmount: subtotal,//(subTotal - totalDiscount + shippingFee + tax)
                shippingFee: 0, // Phí vận chuyển
                discountCode: discountCode,
                orderCode: newOrderCode,
            }
            console.log('Order info:', orderInfo);

            // Nếu chọn thanh toán chuyển khoản, hiển thị modal QR
            if (paymentMethod === 'transfer') {
                setShowPaymentModal(true);
            } else {
                // Xử lý thanh toán tiền mặt
                toast.success('Đơn hàng đã được tạo thành công!');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tạo đơn hàng');
        }

    };

    // Xử lý áp dụng mã giảm giá
    const handleApplyDiscount = () => {
        // Handle discount code logic
        console.log('Apply discount:', discountCode);
    };


    // Nếu không có giỏ hàng thì hiển thị thông báo
    if (cartItems.length === 0) {
        return <Empty title="Giỏ hàng trống" description="Giỏ hàng của bạn đang trống" />;
    }


    return (
        <div className='p-4 md:p-6 max-w-7xl mx-auto min-h-screen'>
            <NavigationHeader title="Giỏ hàng" />

            {/* Bỏ grid-rows-3 và mb-40, dùng gap để kiểm soát khoảng cách */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Cột 1: Danh sách sản phẩm (Chiếm 2 cột trên desktop) */}
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

                {/* Cột 2: Tổng kết giỏ hàng (Nằm bên phải trên desktop, nằm dưới trên mobile) */}
                <div className="md:col-span-1">
                    <div className='w-full sticky top-6'>
                        <CartSummary
                            shippingFee={0}
                            discountCode={discountCode}
                            onDiscountCodeChange={setDiscountCode}
                            onApplyDiscount={handleApplyDiscount}
                            onCheckout={handleCheckout}
                            onChangePaymentMethod={(method) => setPaymentMethod(method as 'cash' | 'transfer')}
                        />
                    </div>
                </div>

                {/* Cột 3: Thông tin giao hàng (Tràn 3 cột bên dưới trên desktop) */}
                <div className="md:col-span-3 mt-4">
                    <ShippingInfo
                    />
                </div>
            </div>

            {/* Modal thanh toán chuyển khoản */}
            <PaymentModal
                open={showPaymentModal}
                onOpenChange={setShowPaymentModal}
                amount={cartStore.totalPrice}
                orderCode={orderCode}
                bankCode={import.meta.env.VITE_BANK_NAME} // Có thể lấy từ config hoặc env
                accountNumber={import.meta.env.VITE_ACCOUNT_NUMBER_BANK}
                accountName="HEROIC-GYM-SHOP" // Cần thay bằng tên chủ tài khoản thực tế
            />
        </div>
    );
};

export default CartPage;


