import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ThemeProvider } from "../ThemeProvider";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function RootLayout() {
  console.log("🚀 ~ RootLayout ~ RootLayout:");

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider>
        <Stack screenOptions={headerStyle}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

const headerStyle: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#000" },
  headerTintColor: "#fff",
  headerShown: false,
};
