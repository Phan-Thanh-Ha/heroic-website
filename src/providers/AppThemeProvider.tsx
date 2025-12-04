import React, { useEffect } from 'react'
import { App as AntApp, ConfigProvider, message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import { themeConfig } from '../config/theme'
import { setMessageInstance } from '../util/messageService'

interface AppThemeProviderProps {
  children: React.ReactNode
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setMessageInstance(messageApi as MessageInstance)
  }, [messageApi])

  return (
    <ConfigProvider theme={themeConfig}>
      <AntApp>
        {contextHolder}
        {children}
      </AntApp>
    </ConfigProvider>
  )
}

export default AppThemeProvider

