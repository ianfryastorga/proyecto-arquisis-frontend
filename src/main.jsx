import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth0ProviderWithHistory from './Components/Auth/AuthProvider';
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Auth0ProviderWithHistory>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Auth0ProviderWithHistory>
        </Router>
    </QueryClientProvider>
)

