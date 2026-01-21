import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  const container = document.getElementById('root');
  if (!container) throw new Error('Root container not found');
  const root = createRoot(container);
  root.render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
    <h1>Gagal memuat aplikasi</h1>
    <p>Terjadi kesalahan saat memuat komponen utama.</p>
    <pre>${error.stack}</pre>
  </div>`;
}
