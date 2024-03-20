import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-gbofbhc0qiuqyk3l.us.auth0.com"
      clientId="gkV0rUEGfFOZpD0qnQWvELmrpxFbw2lO"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-gbofbhc0qiuqyk3l.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
