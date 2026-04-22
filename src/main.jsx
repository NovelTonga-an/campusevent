import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import App from './App';
import { AuthProvider } from './context/authcontext';
import { EventProvider } from './context/eventcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);