import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './src/hooks/auth';
import { MenuProvider } from 'react-native-popup-menu'

import theme from './src/global/styles/theme'
import Routes from './src/routes/Router'
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <SafeAreaView style={{flex: 1}}>
          <Routes />
          </SafeAreaView>
        </MenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};