import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './globals.css'
import App from './App.tsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
// Lấy CLIENT_ID từ biến môi trường
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GG_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
      <App />
      <Toaster position="top-right" richColors duration={4000} closeButton />
    </GoogleOAuthProvider>
  </StrictMode>
)
