import logoImage from "@/assets/icon-512.svg";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useTheme } from "@/hooks/useTheme";
import { Menu, Moon, Search, Sun, Bell, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { customerStore } from "@/store/customerStore";
import LanguageSelector from "@/components/LanguageSelector";

const Header: React.FC = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
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
            // Navigate to search page or perform search
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleLogout = () => {
        customerStore.logout();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-gray-950/60 shadow-sm">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex h-16 md:h-20 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 shrink-0 hover:opacity-80 transition-opacity">
                        <img
                            src={logoImage}
                            alt="Heroic Logo"
                            className="h-10 w-10 md:h-12 md:w-12"
                        />
                        <span className="hidden sm:block text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Heroic
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center flex-1 justify-center">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.link}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={item.link}
                                                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                                                    location.pathname === item.link
                                                        ? "text-primary bg-primary/10 shadow-sm"
                                                        : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
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

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-6">
                        <PlaceholdersAndVanishInput
                            placeholders={[
                                "Tìm kiếm sản phẩm...",
                                "Whey Protein",
                                "BCAA & EAA",
                                "Mass Gainer",
                                "Vitamin & Dầu cá",
                                "Thực phẩm chức năng",
                            ]}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSubmit={handleSearch}
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Search Icon for Mobile */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>

                        {isAuthenticated ? (
                            <>
                                {/* Language Selector */}
                                <LanguageSelector />


                                {/* User Avatar & Name */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                                {customer?.avatarUrl ? (
                                                    <img src={customer.avatarUrl} alt={customer.fullName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                                )}
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <div className="text-xs text-gray-600 dark:text-gray-400">Xin chào</div>
                                                <div className="text-sm font-medium text-foreground">{customer?.fullName || customer?.firstName || "User"}</div>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile">Tài khoản</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/orders">Đơn hàng</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Shopping Cart */}
                                <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-2" asChild>
                                    <Link to="/cart">
                                        <ShoppingCart className="h-5 w-5" />
                                        <div className="hidden md:block text-left">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Thành tiền</div>
                                            <div className="text-sm font-medium text-red-600">0đ</div>
                                        </div>
                                    </Link>
                                </Button>

                                {/* Notifications */}
                                <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Đăng nhập Button */}
                                <Button
                                    onClick={() => navigate("/login")}
                                    className="relative inline-flex h-10 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        Đăng nhập
                                    </span>
                                </Button>
                            </>
                        )}
                        
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;
