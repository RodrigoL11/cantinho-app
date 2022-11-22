import React from "react";

import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/hooks/auth";
import { MenuProvider } from "react-native-popup-menu";

import theme from "./src/global/styles/theme";
import Routes from "./src/routes/Router";
import { SafeAreaView } from "react-native";

import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";

import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <SafeAreaView style={{ flex: 1 }}>
            {fontsLoaded ? <Routes /> : <Loading />}
          </SafeAreaView>
        </MenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
