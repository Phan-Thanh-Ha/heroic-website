import type { MessageInstance } from 'antd/es/message/interface'

let messageInstance: MessageInstance | null = null

/**
 * Set message instance để có thể sử dụng message từ bất kỳ đâu
 */
export const setMessageInstance = (instance: MessageInstance) => {
  messageInstance = instance
}

/**
 * Get message instance
 */
export const getMessageInstance = (): MessageInstance | null => {
  return messageInstance
}

