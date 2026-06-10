import React from 'react'
import { createRoot } from 'react-dom/client'
import { getRouter } from './router'
import { RouterProvider } from '@tanstack/react-router'
import './styles.css'

async function bootstrap() {
  const router = getRouter()
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

bootstrap()
