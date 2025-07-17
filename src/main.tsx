
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove PWA register for now to fix build error
// import { registerSW } from 'virtual:pwa-register'
// registerSW({ immediate: true })

createRoot(document.getElementById("root")!).render(<App />);
