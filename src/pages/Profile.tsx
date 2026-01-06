import { uploadApi } from "@/api/upload.api";
import DistrictSelect from "@/components/DistrictSelect"; 
import ProvinceSelect from "@/components/ProvinceSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import WardSelect from "@/components/WardSelect";
import { locationStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { CalendarIcon, Camera } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileSchema = z.object({
    username: z.string(),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    email: z.string().email(),
    phoneNumber: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
    gender: z.enum(["nam", "nu", "khac"]),

    birthDay: z.date(),
    provinceId: z.number().min(1, "Vui lòng chọn Tỉnh/Thành"),
    districtId: z.number().min(1, "Vui lòng chọn Quận/Huyện"),
    wardId: z.number().min(1, "Vui lòng chọn Phường/Xã"),
    specificAddress: z.string().min(1, "Vui lòng nhập địa chỉ cụ thể"),

    avatar: z
        .any()
        .refine((files) => {
            if (!files) return true;
            return files instanceof File;
        }, "File không hợp lệ")
        .refine((file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
        }, `Kích thước tối đa là 5MB.`)
        .refine((file) => {
            if (!file) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "Chỉ hỗ trợ định dạng .jpg, .jpeg, .png và .webp")
        .optional(),


});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
    const [pathWithType, setPathWithType] = useState("");

    // 1. State cho ảnh Preview (Mặc định là ảnh placeholder hoặc ảnh user hiện tại)
    const [preview, setPreview] = useState<string>("https://via.placeholder.com/150");

    // 2. Ref để tham chiếu tới input file ẩn
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- 2. KHỞI TẠO FORM ---
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: "",
            firstName: "",
            email: "",
            phoneNumber: "",
            gender: "nam",
            birthDay: new Date(),
            provinceId: 0,
            districtId: 0,
            wardId: 0,
            specificAddress: "",
            avatar: undefined,
        },
    });


    const selectedProvinceId = form.watch("provinceId");
    const selectedDistrictId = form.watch("districtId");
    const selectedWardId = form.watch("wardId");

    // --- XỬ LÝ CHỌN ẢNH ---
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
        // 1. Tạo URL preview (Giữ nguyên logic của bạn)
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        
        
        console.log("Link Preview:", objectUrl);

        try {
            // 2. Tạo FormData để chứa file (Bắt buộc cho upload)
            const formData = new FormData();
            // 'file' là key mà Server yêu cầu (theo curl -F 'file=...')
            formData.append('file', file); 
            console.log("File Object:", file);
            console.log("File size:", file.size, "bytes");
            console.log("File type:", file.type);
            
            // Debug: Kiểm tra FormData
            console.log("FormData entries:");
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            // 4. Gọi API
            const response = await uploadApi.uploadAvatar(formData);
            
            console.log('Upload thành công:', response);
            
            // Cập nhật preview với URL từ server nếu có
            if (response?.data?.url) {
                setPreview(response.data.url);
            }

        } catch (error: any) {
            console.error('Lỗi upload:', error);
        }
    }
};

    // --- HÀM KÍCH HOẠT INPUT FILE ---
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    // --- 3. XỬ LÝ SUBMIT ---
    const onSubmit = (data: ProfileFormValues) => {
        // Tạo payload cuối cùng
        const finalPayload = {
            ...data,
            fullAddress: `${data.specificAddress}, ${pathWithType}`,
            formattedBirthDay: format(data.birthDay, "dd/MM/yyyy")
        };
        console.log("Form Submitted:", finalPayload);

    }; 

    

    return (
        <div className="w-full container mx-auto px-4 py-8 bg">
            <div className="grid grid-cols-3 gap-4">
                <div className="...">
                    <div className=" flex flex-col">
                        {/* Header User */}
                        <div className="flex items-center gap-3 pb-5 border-b border-neutral-200">

                            {/* Khu vực ảnh đại diện */}
                            <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300">
                                    <img
                                        src={preview}
                                        alt="avatar"
                                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                    />
                                </div>
                                {/* Overlay icon camera khi hover (tùy chọn cho đẹp) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-4 h-4 text-white drop-shadow-md" />
                                </div>
                            </div>

                            {/* Input File Ẩn */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                onChange={handleImageChange}
                            />

                            <div className="flex flex-col">
                                <span className="font-bold text-sm truncate">{form.getValues('username')}</span>
                                {/* Nút sửa cũng kích hoạt chọn ảnh */}
                                <button
                                    type="button" // Quan trọng: type button để không submit form
                                    onClick={triggerFileInput}
                                    className="text-neutral-500 text-xs flex items-center gap-1 hover:text-orange-500"
                                >
                                    Sửa ảnh đại diện
                                </button>
                                {/* Hiển thị lỗi validate avatar nếu có */}
                                {form.formState.errors.avatar && (
                                    <span className="text-[10px] text-red-500 mt-1">
                                        {form.formState.errors.avatar.message?.toString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Menu List */}
                        <nav className="mt-6 space-y-4">
                            <div className="flex items-center gap-3 text-orange-600 font-medium cursor-pointer">
                                <span className="text-lg">👤</span>
                                <span className="text-sm">Tài Khoản Của Tôi</span>
                            </div>
                            <div className="pl-8 space-y-3">
                                <p className="text-orange-600 text-sm cursor-pointer">Hồ Sơ</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Ngân Hàng</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Địa Chỉ</p>
                                <p className="text-sm hover:text-orange-600 cursor-pointer">Đổi Mật Khẩu</p>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 cursor-pointer">
                                <span className="text-lg">📋</span>
                                <span className="text-sm">Đơn Mua</span>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="col-span-2 bg">
                    <div className="flex flex-row gap-5">

                        <div className="flex flex-col shadow-input w-full rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                                Hồ Sơ Của Tôi
                            </h2>
                            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                                Quản lý thông tin hồ sơ để bảo mật tài khoản
                            </p>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-6">

                                    {/* Tên đăng nhập (Read Only) */}
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <div className="flex flex-row items-start gap-4">
                                                <div className="w-32 pt-2"><Label>Tên đăng nhập</Label></div>
                                                <div className="flex-1">
                                                    <Input placeholder="Nhập tên đăng nhập" {...field} className='bg-black' />
                                                </div>
                                            </div>
                                        )}
                                    />

                                    {/* Tên */}
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                <div className="w-32 pt-2"><Label>Tên</Label></div>
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input placeholder="Nhập tên" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Số điện thoại */}
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                <div className="w-32 pt-2"><Label>Số điện thoại</Label></div>
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input placeholder="Số điện thoại" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                <div className="w-32 pt-2"><Label>Email</Label></div>
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled // <--- QUAN TRỌNG: Chặn chỉnh sửa
                                                            className="bg-black text-neutral-500 cursor-not-allowed" // Style màu xám
                                                        />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Giới tính */}
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                <div className="w-32 pt-2"><Label>Giới tính</Label></div>
                                                <div className="flex-1">
                                                    <div className="flex gap-6 py-2">
                                                        {['Nam', 'Nu', 'Khac'].map((val) => (
                                                            <label key={val} className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    value={val.toLowerCase()}
                                                                    checked={field.value === val.toLowerCase()}
                                                                    onChange={field.onChange}
                                                                    className="w-4 h-4 accent-orange-500"
                                                                />
                                                                <span className="text-sm">
                                                                    {val === 'Nu' ? 'Nữ' : val === 'Khac' ? 'Khác' : val}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Ngày sinh */}
                                    <FormField
                                        control={form.control}
                                        name="birthDay"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                <div className="w-32 pt-2"><Label>Ngày sinh</Label></div>
                                                <div className="flex-1">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? (
                                                                        format(field.value, "dd 'tháng' MM, yyyy", { locale: vi })
                                                                    ) : (
                                                                        <span>Chọn ngày sinh</span>
                                                                    )}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* --- KHU VỰC ĐỊA CHỈ --- */}
                                    <div className="border-t border-neutral-200 my-4 pt-4">
                                        <h3 className="font-semibold text-neutral-700 mb-4">Địa chỉ nhận hàng</h3>

                                        {/* Tỉnh/Thành phố */}
                                        <FormField
                                            control={form.control}
                                            name="provinceId"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start gap-4 space-y-0 mb-4">
                                                    <div className="w-32 pt-2"><Label>Tỉnh/Thành</Label></div>
                                                    <div className="flex-1">
                                                        <ProvinceSelect
                                                            value={field.value}
                                                            onValueChange={(item) => {
                                                                field.onChange(item?.id || 0);
                                                                // Logic reset
                                                                form.setValue("districtId", 0);
                                                                form.setValue("wardId", 0);
                                                                // Gọi Store
                                                                if (item?.code) locationStore.getDistrictsByProvinceCode(item.code);
                                                            }}
                                                        />
                                                        <FormMessage className="mt-1 text-xs" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Quận/Huyện */}
                                        <FormField
                                            control={form.control}
                                            name="districtId"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start gap-4 space-y-0 mb-4">
                                                    <div className="w-32 pt-2"><Label>Quận/Huyện</Label></div>
                                                    <div className="flex-1">
                                                        <DistrictSelect
                                                            value={field.value}
                                                            disabled={!selectedProvinceId}
                                                            onValueChange={(item) => {
                                                                field.onChange(item?.id || 0);
                                                                form.setValue("wardId", 0);
                                                            }}
                                                        />
                                                        <FormMessage className="mt-1 text-xs" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Phường/Xã */}
                                        <FormField
                                            control={form.control}
                                            name="wardId"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start gap-4 space-y-0 mb-4">
                                                    <div className="w-32 pt-2"><Label>Phường/Xã</Label></div>
                                                    <div className="flex-1">
                                                        <WardSelect
                                                            value={field.value}
                                                            districtId={selectedDistrictId}
                                                            disabled={!selectedDistrictId}
                                                            onValueChange={(item: any) => {
                                                                field.onChange(item?.id || 0);
                                                                setPathWithType(item?.path_with_type || "");
                                                            }}
                                                        />
                                                        <FormMessage className="mt-1 text-xs" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Địa chỉ cụ thể */}
                                        <FormField
                                            control={form.control}
                                            name="specificAddress"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start gap-4 space-y-0">
                                                    <div className="w-32 pt-2"><Label>Địa chỉ cụ thể</Label></div>
                                                    <div className="flex-1">
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Số nhà, tên đường..."
                                                                {...field}
                                                                disabled={!selectedWardId}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="mt-1 text-xs" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                        Lưu thay đổi
                                    </Button>
                                </form>
                            </Form>

                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
}