import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add this line to make the root element take full height
document.documentElement.style.height = '100%';
document.body.style.height = '100%';

createRoot(document.getElementById("root")!).render(<App />);
