import React, { useEffect, useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { Characters } from "./src/components/characters";
import theme from "./src/global/theme";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);
  const onLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Characters onLayout={onLayout} />
    </ThemeProvider>
  );
}