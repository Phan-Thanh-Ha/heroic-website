import { toast } from 'sonner'

export const showMessage = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  toast[type](message)
}
