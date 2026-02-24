import { productStore } from "@/store/productStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage: React.FC = observer(() => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      productStore.fetchProducts({ name: query });
    } else {
      productStore.setProducts([]);
    }
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-800">
            Kết quả tìm kiếm: "{query}"
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block col-span-3">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-zinc-200">
              <h2 className="font-bold mb-4">Bộ lọc nâng cao</h2>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-zinc-200 min-h-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Danh sách sản phẩm</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SearchPage;
