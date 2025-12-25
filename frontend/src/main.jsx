import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux'
import store from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios'; // 1. Import axios

// 2. Set global axios defaults to send cookies to Render
axios.defaults.withCredentials = true;

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster 
      position="top-right" 
      richColors 
      closeButton 
      toastOptions={{
        style: { borderRadius: '12px' },
      }}
    />
  </StrictMode>,
)