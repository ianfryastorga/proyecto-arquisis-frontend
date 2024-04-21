import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth0ProviderWithHistory from './Components/Auth/AuthProvider';
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Auth0ProviderWithHistory>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Auth0ProviderWithHistory>
    </Router>
)

