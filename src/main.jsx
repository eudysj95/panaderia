import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ListadoProvider } from './context/ListadoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListadoProvider>
      <App />
    </ListadoProvider>
  </StrictMode>,
)
