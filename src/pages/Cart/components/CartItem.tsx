import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IProduct } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
    // nhận data từ component cha
    product: IProduct;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onQuantityChange, onRemove }) => {
    // Lấy productDetail đầu tiên (variant được chọn)
    const productDetail = product.productDetails?.[0];
    
    if (!productDetail) {
        return null;
    }

    const handleDecrease = () => {
        if (productDetail.quantity > 1) {
            onQuantityChange(product.id, productDetail.quantity - 1);
        }
    };

    const handleIncrease = () => {
        onQuantityChange(product.id, productDetail.quantity + 1);
    };

    return (
        <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-32 h-32 bg-secondary rounded-md overflow-hidden">
                    <img
                        src={product.image || product.productImages?.[0]?.image || ''}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {productDetail.flavor && `Vị: ${productDetail.flavor}`}
                                {productDetail.flavor && productDetail.size && ' | '}
                                {productDetail.size && `Size: ${productDetail.size}`}
                            </p>
                        </div>
                        <p className="font-bold">{productDetail.retailPrice.toLocaleString()}đ</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleDecrease}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center text-sm">{productDetail.quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleIncrease}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onRemove(product.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CartItem;
