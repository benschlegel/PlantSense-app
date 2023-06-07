import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SystemUI from "expo-system-ui";
import {
  setBackgroundColorAsync,
  setPositionAsync,
  setVisibilityAsync,
} from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { Platform, useColorScheme } from "react-native";

import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// eslint-disable-next-line camelcase
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // Change default route in `index.tsx`
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font
      loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  //Sets transparency on android on startup
  const fixAndroidNavbar = useCallback(async () => {
    if (Platform.OS === "android") {
      // enables edge-to-edge mode
      await setPositionAsync("absolute");
      // transparent backgrounds to see through
      await setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
      SystemUI.setBackgroundColorAsync(Colors.light.background);
    }
  }, []);

  useEffect(() => {
    fixAndroidNavbar();
  });
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="(main)" /> */}
          <Stack.Screen
            name="(setup)"
            options={{
              headerShown: true,
              title: "Setup",
              headerStyle: { backgroundColor: Colors.light.primary2 },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="(notifications)"
            options={{
              headerShown: true,
              title: "Notifications",
              headerStyle: { backgroundColor: Colors.light.primary2 },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="(settings)"
            options={{
              headerShown: true,
              title: "Settings",
              headerStyle: { backgroundColor: Colors.light.primary2 },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen name="modal" />
        </Stack>
      </ThemeProvider>
    </>
  );
}
