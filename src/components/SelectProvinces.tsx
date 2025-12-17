import { getProvinces } from '@/api/province.api'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'

interface ProvinceOption {
  id: number;
  label: string;
  value: string | number;
}

interface ProvinceProp {
  onChange: (id: number,
  label: string,
  value: string | number
) => void;
}

export const SelectProvinces: React.FC<ProvinceProp> = ({ onChange }) => {
  const [provincesList, setProvincesList] = useState<ProvinceOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleGetProvinces(valueProvince)
  }, [valueProvince])

  const handleGetProvinces = async (valueProvince) => {
    setLoading(true)
    try {
      const response = await getProvinces(valueProvince)
      
      if (response && response.data) {
        const newResponse = response.data.map((item: any) => ({
            id : item.id,
            label: item.name,
            value: item.code,
        }))
        
        setProvincesList(newResponse)
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedProvinces = (label: string | number, option: any) => {
    // 'option' chính là object bạn đã map ở trên: { id, label, value }
    console.log("ID:", option);
    onChange(option)
    
    // Gửi ID về component cha
    // if (onChange && option) {
    //     onChange({value:option.value,option.id})
    // }
  };

  return (
    <Select
      showSearch
      placeholder="Chọn Tỉnh/Thành phố"
      loading={loading}
      style={{ width: 200 }}
      onChange={handleSelectedProvinces}
      options={provincesList} 
      // filterOption={(input, option) =>
      //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      // }
    />
  )
}