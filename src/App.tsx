import { Button } from '@/components/ui/button'
import { RouterProvider } from 'react-router-dom'
import { toast } from 'sonner'
import { router } from '@/routes';

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
