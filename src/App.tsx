import { AppThemeProvider } from '@/providers'
import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from '@/routes';

function App() {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  )
}

export default App
