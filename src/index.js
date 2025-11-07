import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Toast provider importu
import { ToastProvider } from './components/Toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ App'i ToastProvider ile sardık */}
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();

