import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-full min-h-0">
      <App />
    </div>
  </StrictMode>,
)
