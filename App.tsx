import React from "react";

import { ThemeProvider } from "./src/hooks/theme";
import { AuthProvider } from "./src/hooks/auth";
import { MenuProvider } from "react-native-popup-menu";

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
      <ThemeProvider>
        <MenuProvider>
          <SafeAreaView style={{ flex: 1 }}>
            {fontsLoaded ? <Routes /> : <Loading />}
          </SafeAreaView>
        </MenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
