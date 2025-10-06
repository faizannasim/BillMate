import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="299278289441-mu947c0v88euai3d10mstlelod0vn2bn.apps.googleusercontent.com">

    <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)