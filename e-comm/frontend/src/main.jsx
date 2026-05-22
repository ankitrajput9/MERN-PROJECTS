import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Approuter from './routes/Approuter.jsx'
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')).render(
  <>
<Approuter/>
<ToastContainer/>
  </>
)
