import logoImage from "@/assets/icon-512.svg";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Đảm bảo đúng path
import { useTheme } from "@/hooks/useTheme";
import { cartStore } from "@/store";
import { customerStore } from "@/store/customerStore";
import { formatCurrency } from "@/utils/formatMoney";
import { Menu, Moon, Search, ShoppingCart, Sun, User } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Highlight } from "./ui/hero-highlight";
import { SparklesText } from "./ui/sparkles-text";

const Header: React.FC = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State quản lý đóng mở menu mobile
    const { theme, toggleTheme } = useTheme();
    const isAuthenticated = customerStore.isAuthenticated;
    const customer = customerStore.customers;

    const navItems = [
        { name: "Trang chủ", link: "/" },
        { name: "Sản phẩm", link: "/products" },
        { name: "Về chúng tôi", link: "/about" },
        { name: "Liên hệ", link: "/contact" },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex h-16 md:h-20 items-center justify-between gap-4">

                    {/* LEFT: Mobile Menu & Logo */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu trượt ra */}
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px]">
                                <div className="flex flex-col gap-4 mt-8">
                                    <p className="text-sm font-semibold text-gray-400 px-4">DANH MỤC</p>
                                    {navItems.map((item) => (
                                        <Link
                                            to={item.link}
                                            className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${ // Thêm whitespace-nowrap
                                                location.pathname === item.link
                                                    ? "text-primary bg-primary/10"
                                                    : "text-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <hr className="my-2" />
                                    {/* Link bổ sung cho mobile nếu muốn */}
                                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" /> Giỏ hàng
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 shrink-0">
                            <img src={logoImage} alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
                            <SparklesText sparklesCount={5} className="text-xl font-bold hidden sm:block">
                                Heroic
                            </SparklesText>
                        </Link>
                    </div>

                    {/* CENTER: Desktop Navigation */}
                    <nav className="hidden lg:flex items-center flex-1 justify-center">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.link}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={item.link}
                                                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${ // Thêm whitespace-nowrap ở đây
                                                    location.pathname === item.link
                                                        ? "text-primary bg-primary/10"
                                                        : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* CENTER-RIGHT: Search Bar (ẩn trên mobile rất nhỏ) */}
                    <div className="hidden md:flex flex-1 max-w-xs lg:max-w-lg mx-2">
                        <PlaceholdersAndVanishInput
                            placeholders={["Tìm kiếm sản phẩm...", "Whey Protein", "Mass Gainer"]}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSubmit={handleSearch}
                        />
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        {/* Search Icon Mobile */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>

                        {isAuthenticated ? (
                            <>
                                <div className="hidden sm:block"><LanguageSelector /></div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 px-1 sm:px-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                                {customer?.avatarUrl ? (
                                                    <img src={customer.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="h-4 w-4 m-2" />
                                                )}
                                            </div>
                                            <div className="hidden lg:block text-left">
                                                <div className="text-sm font-medium leading-none">{customer?.fullName}</div>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild><Link to="/profile">Tài khoản</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => customerStore.logout()}>Đăng xuất</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="ghost" size="icon" className="relative" asChild>
                                    <Link to="/cart">
                                        <ShoppingCart className="h-5 w-5" />
                                        {cartStore.cartItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                                                {cartStore.cartItems.length}
                                            </span>
                                        )}
                                    </Link>
                                    {/* Tổng tiền */}

                                </Button>

                                {/* Highlight tổng tiền */}
                                {cartStore.totalPrice > 0 && <Highlight className="text-black dark:text-white">
                                        <span className="text-sm font-medium">
                                            {formatCurrency(cartStore.totalPrice, 'VND', 'vi-VN')}
                                        </span>
                                    </Highlight>
                                }

                            </>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                className="relative inline-flex h-9 overflow-hidden rounded-full p-px"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl">
                                    Đăng nhập
                                </span>
                            </Button>
                        )}

                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;