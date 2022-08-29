import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './src/global/styles/theme'

import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes/Router'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
};