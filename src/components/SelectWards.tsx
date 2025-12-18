
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { wardApi } from '@/api/ward.api';


interface WardProp {
  onChange: (WardOption: any) => void;  //trả về district cho thằng cha
  districsItem: any  // nhận giá trị districsItem
}


export const SelectWards: React.FC<WardProp> = ({ onChange , districsItem }) => {
  const [wardList, setWardList] = useState([])
  const [loading, setLoading] = useState(false)
  // const [pronvincesItem,setProvincesItem] = useState(pronvincesItem)
   console.log(districsItem)
   useEffect(() => {
     handleGetWards(districsItem)
   }, [districsItem])
   
 

  const handleGetWards = async (districsItem:any) => {
  console.log('ward',districsItem)
    
    
    setLoading(true)
    try {
      const response = await wardApi.getWardByDistrictCode((districsItem.value))
      console.log('đã vô hàm district', response.data)
      if (response && response.data) {
        const newResponse = response.data.result.map((item: any) => ({
            id : item.id,
            label: item.name,
            value: item.code,
            
        }))
        
        setWardList(newResponse)
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedWard = (label: string | number, option: any) => {
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
      placeholder="Chọn Phường / Xã"
      loading={loading}
      style={{ width: 200 }}
      onChange={handleSelectedWard}
       options={wardList} 
       filterOption={(input, option) =>
         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
     }
    />
  )
}