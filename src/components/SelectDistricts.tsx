import { districtApi } from '@/api/district.api'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'


interface DistrictProp {
  onChange: () => void;  //trả về district cho thằng cha
  pronvincesItem: {}  // nhận giá trị provinces
}


export const SelectDistricts: React.FC<DistrictProp> = ({ onChange , pronvincesItem }) => {
  const [districtList, setDistrictList] = useState([])
  const [loading, setLoading] = useState(false)
  // const [pronvincesItem,setProvincesItem] = useState(pronvincesItem)
  console.log(pronvincesItem)
  useEffect(() =>   { 
    if(pronvincesItem){
        console.log('kiểm tra')
    }
    
}, [pronvincesItem])

  const handleGetDistricts = async () => {
    setLoading(true)
    try {
      const response = await districtApi.getDistrictByProvinceCode(String(pronvincesItem))
      
      if (response && response.data.data) {
        const newResponse = response.data.data.map((item: any) => ({
            id : item.id,
            label: item.name,
            value: item.code,
        }))
        
        setDistrictList(newResponse)
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedDistrict = (label: string | number, option: any) => {
    // 'option' chính là object bạn đã map ở trên: { id, label, value }
    console.log("ID:", option);
    onChange()
    
    // Gửi ID về component cha
    // if (onChange && option) {
    //     onChange({value:option.value,option.id})
    // }
  };

  return (
    <Select
      showSearch
      placeholder="Chọn Quận/Huyện"
      loading={loading}
      style={{ width: 200 }}
      onChange={handleSelectedDistrict}
      // options={provincesList} 
      // filterOption={(input, option) =>
      //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      // }
    />
  )
}