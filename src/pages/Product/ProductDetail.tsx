import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");

    // Dữ liệu mẫu (Sau này sẽ lấy từ API qua CategoryStore hoặc ProductStore)
    const product = {
        name: "Nutrabolics Hydropure 100% Hydrolyzed Whey Protein",
        brand: "Nutrabolics",
        retailPrice: 2250000,
        importPrice: 3090000,
        image: "https://ndqdiqunwhwrxwqrhmsz.supabase.co/storage/v1/object/public/heroic-storage/admin/categories/thumbnails/1767247396466-icon-whey_1703565401.jpg.webp",
        description: "Hydropure là dòng Whey Protein tinh khiết nhất hiện nay với công nghệ thủy phân hoàn toàn, giúp hấp thụ ngay lập tức vào cơ bắp sau khi tập luyện.",
        flavors: ["Chocolate", "Vanilla", "Strawberry", "Gourmet Milk"],
        sizes: ["5lbs (2.27kg)", "2lbs (900g)"]
    };

    return (
        <div className="bg-white min-h-screen text-zinc-900">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- CỘT TRÁI: HÌNH ẢNH (5/12) --- */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="relative group rounded-3xl border border-zinc-100 p-10 flex items-center justify-center bg-zinc-50 overflow-hidden aspect-square">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110 z-10" 
                            />
                            {/* Hiệu ứng viền chạy cho sản phẩm nổi bật */}
                            <BorderBeam size={400} duration={12} colorFrom="#ef4444" colorTo="#fbbf24" />
                        </div>
                        
                        {/* Thumbnails (Ảnh phụ) */}
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square border-2 border-zinc-100 rounded-xl p-2 cursor-pointer hover:border-red-500 transition-all bg-white overflow-hidden">
                                    <img src={product.image} alt="thumbnail" className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: THÔNG TIN CHI TIẾT (7/12) --- */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div>
                            <p className="text-red-600 font-bold uppercase text-xs tracking-[0.2em] mb-2">{product.brand}</p>
                            <h1 className="text-4xl font-black text-zinc-900 leading-[1.1] uppercase italic tracking-tighter mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1 text-orange-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    <span className="text-zinc-900 font-bold ml-1 text-sm">5.0</span>
                                </div>
                                <span className="text-zinc-400 text-sm font-medium border-l border-zinc-200 pl-4">125 Đánh giá</span>
                                <span className="text-zinc-400 text-sm font-medium border-l border-zinc-200 pl-4">1.2k Đã bán</span>
                            </div>
                        </div>

                        {/* GIÁ CẢ */}
                        <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-black text-red-600 tracking-tighter">
                                    {product.retailPrice.toLocaleString()}đ
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-zinc-400 line-through text-sm font-medium">{product.importPrice.toLocaleString()}đ</span>
                                    <Badge className="bg-red-500 text-white w-fit text-xs font-bold border-none">-27% OFF</Badge>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 w-fit px-4 py-2 rounded-full border border-green-100">
                                <ShieldCheck size={18} /> Tiết kiệm ngay: 840.000đ khi mua hôm nay
                            </div>
                        </div>

                        {/* CHỌN BIẾN THỂ */}
                        <div className="space-y-6 py-4">
                            <div className="space-y-3">
                                <p className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    Hương vị: <span className="text-red-600">{selectedFlavor}</span>
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {product.flavors.map(f => (
                                        <button 
                                            key={f}
                                            onClick={() => setSelectedFlavor(f)}
                                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border-2 
                                                ${selectedFlavor === f 
                                                    ? 'border-red-500 bg-red-50 text-red-600 shadow-md shadow-red-100' 
                                                    : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-300'}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
                                <div className="space-y-3 w-full md:w-auto">
                                    <p className="font-black text-sm uppercase tracking-wider">Số lượng:</p>
                                    <div className="flex items-center border-2 border-zinc-100 rounded-xl w-fit bg-white overflow-hidden">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-zinc-50 hover:text-red-500 transition-colors border-r border-zinc-100"><Minus size={18}/></button>
                                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-zinc-50 hover:text-red-500 transition-colors border-l border-zinc-100"><Plus size={18}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NÚT HÀNH ĐỘNG */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button className="flex-1 h-16 text-md font-black bg-zinc-950 hover:bg-zinc-800 rounded-2xl uppercase tracking-widest text-white transition-transform active:scale-95">
                                Thêm vào giỏ hàng
                            </Button>
                            <Button className="flex-1 h-16 text-md font-black bg-red-600 hover:bg-red-700 rounded-2xl uppercase tracking-widest text-white shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)] transition-transform active:scale-95">
                                Mua ngay ngay
                            </Button>
                        </div>

                        {/* CAM KẾT DƯỚI NÚT */}
                        <div className="grid grid-cols-2 gap-y-4 pt-8 border-t border-zinc-100 border-dashed">
                             {[
                                { icon: ShieldCheck, text: "Chính hãng 100%", color: "text-blue-500" },
                                { icon: Truck, text: "Freeship toàn quốc", color: "text-green-500" },
                                { icon: RotateCcw, text: "Đổi trả 7 ngày", color: "text-orange-500" },
                                { icon: Check, text: "Đầy đủ tem nhãn", color: "text-red-500" }
                             ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-tight">
                                    <item.icon size={18} className={item.color} /> {item.text}
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* --- PHẦN TABS MÔ TẢ & DINH DƯỠNG --- */}
                <div className="mt-24">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-zinc-200 rounded-none h-16 bg-transparent p-0 gap-10">
                            <TabsTrigger 
                                value="description" 
                                className="rounded-none border-b-4 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent text-xl font-black uppercase italic tracking-tighter transition-all px-2 h-full"
                            >
                                Mô tả sản phẩm
                            </TabsTrigger>
                            <TabsTrigger 
                                value="nutrition" 
                                className="rounded-none border-b-4 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent text-xl font-black uppercase italic tracking-tighter transition-all px-2 h-full"
                            >
                                Thành phần dinh dưỡng
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="description" className="py-12 px-2 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="prose prose-zinc lg:prose-lg max-w-none text-zinc-700">
                                <h3 className="text-3xl font-black italic uppercase text-zinc-900 mb-6">Đỉnh cao hấp thụ Protein</h3>
                                <p className="leading-relaxed mb-8">{product.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mt-10">
                                    {["28g Protein tinh khiết", "0g Đường & Chất béo", "Hấp thụ siêu tốc", "Hương vị tự nhiên"].map(item => (
                                        <div key={item} className="flex items-center gap-4 font-black text-zinc-800 bg-zinc-50 p-5 rounded-2xl border border-zinc-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                                <Check size={18} strokeWidth={3}/>
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="nutrition" className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* BẢNG NUTRITION FACTS KIỂU CỔ ĐIỂN - TỐI ƯU HIỂN THỊ */}
                            <div className="border-[6px] border-black p-5 max-w-md bg-white font-sans text-black shadow-xl mx-auto md:mx-0">
                                <h2 className="text-5xl font-black border-b-[14px] border-black pb-1 leading-none uppercase tracking-tighter">Nutrition Facts</h2>
                                <div className="border-b-4 border-black py-2 font-bold text-lg">
                                    71 servings per container
                                    <div className="flex justify-between items-center text-xl mt-1">
                                        <span>Serving size</span>
                                        <span className="font-black">1 Scoop (32g)</span>
                                    </div>
                                </div>
                                <div className="border-b-[10px] border-black py-3">
                                    <div className="flex justify-between items-end font-black">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase">Amount per serving</span>
                                            <span className="text-5xl leading-none tracking-tighter">Calories</span>
                                        </div>
                                        <span className="text-6xl leading-none font-black tracking-tighter">120</span>
                                    </div>
                                </div>
                                <div className="w-full text-right text-[11px] font-black py-1 border-b-2 border-black">% Daily Value *</div>
                                {[
                                    { label: "Total Fat", value: "0g", dv: "0%" },
                                    { label: "Saturated Fat", value: "0g", dv: "0%", indent: true },
                                    { label: "Cholesterol", value: "10mg", dv: "3%" },
                                    { label: "Sodium", value: "115mg", dv: "5%" },
                                    { label: "Total Carbohydrate", value: "1g", dv: "0%" },
                                    { label: "Protein", value: "28g", dv: "56%", bold: true }
                                ].map((item, idx) => (
                                    <div key={idx} className={`flex justify-between py-1.5 border-b border-zinc-400 text-base ${item.bold ? 'font-black border-black border-b-2' : ''}`}>
                                        <span className="flex items-baseline">
                                            <span className={`${item.indent ? 'ml-6' : 'font-black'}`}>{item.label}</span>
                                            <span className="ml-2 font-medium">{item.value}</span>
                                        </span>
                                        <span className="font-black">{item.dv}</span>
                                    </div>
                                ))}
                                <p className="text-[10px] mt-3 leading-tight italic">
                                    * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}