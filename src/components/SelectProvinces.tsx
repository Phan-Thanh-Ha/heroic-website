import { getProvinces } from '@/api/province.api'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'



interface ProvinceProp {
  onChange: ( ProvinceOption : any
) => void;
}

export const SelectProvinces: React.FC<ProvinceProp> = ({ onChange }) => {
  const [provincesList, setProvincesList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleGetProvinces()
  }, [])

  const handleGetProvinces = async () => {
    setLoading(true)
    try {
      const response = await getProvinces()
      
      if (response && response.data.data) {
        const newResponse = response.data.data.map((item: any) => ({
            id : item.id,
            label: item.name,
            value: item.code,
            code: item.code,
        }))
        
        setProvincesList(newResponse)
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedProvinces = (label: string | number, option:any) => {
    // 'option' chính là object bạn đã map ở trên: { id, label, value }
    console.log("ID:", option);
    onChange(option)
    
    
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