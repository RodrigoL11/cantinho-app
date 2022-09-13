import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './src/hooks/auth';
import { MenuProvider } from 'react-native-popup-menu'

import theme from './src/global/styles/theme'
import Routes from './src/routes/Router'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <Routes />
        </MenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};