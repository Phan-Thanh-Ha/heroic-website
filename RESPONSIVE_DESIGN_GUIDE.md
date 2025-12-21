# Hướng Dẫn Responsive Design cho Heroic Website

## Mục Lục
1. [Giới Thiệu](#giới-thiệu)
2. [Breakpoints trong Tailwind CSS](#breakpoints-trong-tailwind-css)
3. [Các Pattern Responsive Phổ Biến](#các-pattern-responsive-phổ-biến)
4. [Best Practices](#best-practices)
5. [Ví Dụ Thực Tế](#ví-dụ-thực-tế)
6. [Tips & Tricks](#tips--tricks)
7. [Checklist Responsive](#checklist-responsive)

---

## Giới Thiệu

Responsive Design là phương pháp thiết kế website sao cho giao diện tự động điều chỉnh để hiển thị tốt trên mọi thiết bị (mobile, tablet, desktop). Trong dự án Heroic Website, chúng ta sử dụng **Tailwind CSS** để xây dựng responsive design.

### Tại Sao Cần Responsive Design?

- 📱 **Mobile-first**: Hơn 60% người dùng truy cập website từ mobile
- 🎯 **User Experience**: Trải nghiệm tốt hơn trên mọi thiết bị
- 📈 **SEO**: Google ưu tiên các website responsive
- 💰 **Chi phí**: Một codebase cho tất cả thiết bị

---

## Breakpoints trong Tailwind CSS

Tailwind CSS sử dụng **mobile-first approach**, nghĩa là bạn thiết kế cho mobile trước, sau đó mở rộng cho các màn hình lớn hơn.

### Các Breakpoint Mặc Định

| Breakpoint | Kích Thước | Prefix | Mô Tả |
|------------|------------|--------|-------|
| `sm` | ≥640px | `sm:` | Small devices (tablets) |
| `md` | ≥768px | `md:` | Medium devices (tablets landscape) |
| `lg` | ≥1024px | `lg:` | Large devices (desktops) |
| `xl` | ≥1280px | `xl:` | Extra large devices |
| `2xl` | ≥1536px | `2xl:` | 2X Extra large devices |

### Cách Sử Dụng

```tsx
// Mobile-first: Thiết kế cho mobile trước
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive Text
</div>

// Ẩn/hiện theo breakpoint
<div className="hidden md:block">
  Chỉ hiển thị từ tablet trở lên
</div>

<div className="block md:hidden">
  Chỉ hiển thị trên mobile
</div>
```

---

## Các Pattern Responsive Phổ Biến

### 1. Responsive Grid Layout

#### Grid 1 Cột → 2 Cột → 3 Cột

```tsx
// Mobile: 1 cột, Tablet: 2 cột, Desktop: 3 cột
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>
```

#### Grid Responsive với Auto-fit

```tsx
// Tự động điều chỉnh số cột dựa trên chiều rộng
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>
```

### 2. Responsive Typography

```tsx
// Text size responsive
<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
  Tiêu đề Responsive
</h1>

// Line height và spacing responsive
<p className="text-sm md:text-base leading-relaxed md:leading-normal">
  Đoạn văn responsive
</p>
```

### 3. Responsive Spacing

```tsx
// Padding responsive
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  Container với padding responsive
</div>

// Margin responsive
<div className="mt-4 md:mt-8 lg:mt-12">
  Margin responsive
</div>

// Gap responsive
<div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
  Flex container với gap responsive
</div>
```

### 4. Responsive Flexbox

```tsx
// Flex direction responsive
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
  {/* Mobile: dọc, Desktop: ngang */}
</div>

// Flex wrap responsive
<div className="flex flex-wrap md:flex-nowrap gap-4">
  {/* Mobile: wrap, Desktop: nowrap */}
</div>
```

### 5. Responsive Images

```tsx
// Image size responsive
<img 
  src="image.jpg" 
  alt="Heroic"
  className="w-full h-auto md:w-3/4 lg:w-1/2"
/>

// Object fit responsive
<img 
  src="banner.jpg" 
  alt="Banner"
  className="w-full h-48 md:h-64 lg:h-96 object-cover"
/>
```

### 6. Responsive Navigation

```tsx
// Desktop: hiển thị menu, Mobile: hamburger menu
<nav className="hidden md:flex items-center gap-4">
  {/* Desktop Navigation */}
</nav>

<button className="md:hidden">
  {/* Mobile Menu Button */}
</button>
```

---

## Best Practices

### 1. Mobile-First Approach ✅

**Đúng:**
```tsx
// Bắt đầu với mobile, sau đó mở rộng
<div className="p-4 md:p-6 lg:p-8">
```

**Sai:**
```tsx
// Thiết kế desktop trước rồi thu nhỏ
<div className="p-8 lg:p-6 md:p-4">
```

### 2. Sử Dụng Container Responsive

```tsx
// Container tự động căn giữa và responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* Nội dung */}
</div>
```

### 3. Breakpoint Consistency

Sử dụng cùng một bộ breakpoint trong toàn bộ dự án:

- **Mobile**: `< 640px` (mặc định, không cần prefix)
- **Tablet**: `md:` (≥768px)
- **Desktop**: `lg:` (≥1024px)
- **Large Desktop**: `xl:` (≥1280px)

### 4. Test trên Nhiều Thiết Bị

- 📱 Mobile: 375px, 414px
- 📱 Tablet: 768px, 1024px
- 💻 Desktop: 1280px, 1920px

### 5. Tránh Fixed Width

**Sai:**
```tsx
<div className="w-[500px]"> {/* Fixed width */}
```

**Đúng:**
```tsx
<div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
```

### 6. Sử Dụng Min/Max Width

```tsx
// Responsive với min/max width
<div className="w-full min-w-[300px] max-w-4xl mx-auto">
```

---

## Ví Dụ Thực Tế

### Ví Dụ 1: Header Component

Từ file `Header.tsx` trong dự án:

```tsx
// Logo responsive
<img 
  src={logoImage}
  alt="Heroic Logo"
  className="h-10 w-10 md:h-12 md:w-12"
/>

// Text responsive
<span className="hidden sm:block text-xl md:text-2xl font-bold">
  Heroic
</span>

// Navigation responsive
<nav className="hidden lg:flex items-center">
  {/* Desktop menu */}
</nav>

// Search bar responsive
<div className="hidden md:flex flex-1 max-w-lg">
  {/* Search input */}
</div>

// Mobile search icon
<Button variant="ghost" size="icon" className="md:hidden">
  <Search className="h-5 w-5" />
</Button>
```

**Phân Tích:**
- Logo: Mobile (40px) → Desktop (48px)
- Text: Ẩn trên mobile nhỏ, hiện từ `sm:` trở lên
- Navigation: Ẩn trên mobile/tablet, hiện từ `lg:` trở lên
- Search: Icon trên mobile, input bar từ `md:` trở lên

### Ví Dụ 2: Form Component

Từ file `RegisterForm.tsx`:

```tsx
// Grid responsive cho form fields
<div className="grid grid-cols-2 gap-4">
  {/* Họ và Tên - 2 cột trên mọi màn hình */}
</div>

// Có thể cải thiện thành:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Mobile: 1 cột, Tablet+: 2 cột */}
</div>
```

### Ví Dụ 3: Container Pattern

```tsx
// Pattern chuẩn cho container
<div className="container mx-auto px-4 lg:px-6">
  {/* 
    - container: max-width responsive
    - mx-auto: căn giữa
    - px-4: padding mobile
    - lg:px-6: padding desktop lớn hơn
  */}
</div>
```

---

## Tips & Tricks

### 1. Sử Dụng Custom Breakpoints (Nếu Cần)

Trong `tailwind.config.js`:

```js
export default {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
}
```

### 2. Responsive Utilities Classes

```tsx
// Responsive display
<div className="hidden md:block lg:hidden xl:block">
  {/* Hiển thị ở tablet và desktop lớn */}
</div>

// Responsive visibility
<div className="invisible md:visible">
  {/* Ẩn trên mobile, hiện từ tablet */}
</div>
```

### 3. Aspect Ratio Responsive

```tsx
// Aspect ratio responsive
<div className="aspect-square md:aspect-video">
  {/* Square trên mobile, video ratio trên tablet+ */}
</div>
```

### 4. Responsive Background Images

```tsx
<div className="bg-cover bg-center bg-[url('/mobile.jpg')] md:bg-[url('/desktop.jpg')]">
  {/* Background khác nhau cho mobile và desktop */}
</div>
```

### 5. Responsive Z-Index

```tsx
// Z-index có thể thay đổi theo breakpoint
<div className="z-10 md:z-20 lg:z-30">
```

### 6. Conditional Rendering với Hook

```tsx
import { useEffect, useState } from 'react';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Sử dụng
const isMobile = useMediaQuery('(max-width: 767px)');
```

---

## Checklist Responsive

Khi phát triển component mới, hãy kiểm tra:

### Layout
- [ ] Container có `mx-auto` và padding responsive
- [ ] Grid/Flex layout responsive
- [ ] Không có fixed width (trừ khi cần thiết)
- [ ] Sử dụng `max-w-*` thay vì fixed width

### Typography
- [ ] Font size responsive (`text-sm md:text-base lg:text-lg`)
- [ ] Line height phù hợp với từng breakpoint
- [ ] Text không bị overflow trên mobile

### Images & Media
- [ ] Images có `w-full` và `h-auto`
- [ ] Aspect ratio được xử lý đúng
- [ ] Background images responsive

### Navigation
- [ ] Mobile menu cho màn hình nhỏ
- [ ] Desktop menu cho màn hình lớn
- [ ] Hamburger icon trên mobile

### Forms
- [ ] Input fields full width trên mobile
- [ ] Form layout responsive (1 cột mobile, nhiều cột desktop)
- [ ] Buttons có kích thước phù hợp

### Spacing
- [ ] Padding và margin responsive
- [ ] Gap trong grid/flex responsive
- [ ] Không có spacing quá lớn trên mobile

### Testing
- [ ] Test trên mobile (375px, 414px)
- [ ] Test trên tablet (768px, 1024px)
- [ ] Test trên desktop (1280px, 1920px)
- [ ] Test cả portrait và landscape
- [ ] Test trên trình duyệt thật (Chrome DevTools)

---

## Công Cụ Hỗ Trợ

### 1. Chrome DevTools
- F12 → Toggle Device Toolbar (Ctrl+Shift+M)
- Chọn device preset hoặc custom size
- Test touch events và network throttling

### 2. BrowserStack / LambdaTest
- Test trên thiết bị thật
- Test trên nhiều trình duyệt

### 3. Responsive Design Checker
- https://responsivedesignchecker.com/
- https://www.browserstack.com/responsive

---

## Tài Liệu Tham Khảo

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev: Responsive Design](https://web.dev/responsive-web-design-basics/)

---

## Kết Luận

Responsive Design là một phần quan trọng trong phát triển web hiện đại. Với Tailwind CSS, việc xây dựng responsive design trở nên dễ dàng và nhất quán hơn.

**Nhớ:**
- 🎯 Mobile-first approach
- 📐 Sử dụng breakpoints nhất quán
- 🧪 Test trên nhiều thiết bị
- ♻️ Tái sử dụng patterns đã có
- 📱 Ưu tiên trải nghiệm mobile

---

**Tác giả:** Heroic Development Team  
**Cập nhật:** 2024  
**Version:** 1.0

