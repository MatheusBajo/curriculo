import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "./gsap.css";
import App from './App.tsx'
import {SensitiveProvider} from "./contexts/SensitiveContext.tsx";

createRoot(document.getElementById('root')!).render(
    <SensitiveProvider>
        <App/>
    </SensitiveProvider>
)
