import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HELLO } from '@lumber/common'
import App from './App.tsx'
import './index.css'

console.log(HELLO)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)