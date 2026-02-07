import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

const theme = createTheme({
  primaryColor: 'green',
  defaultRadius: 'md',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <MantineProvider theme={theme}>
    <App />
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>,
)
