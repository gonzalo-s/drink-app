import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ThemeProvider } from "../ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={headerStyle}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}

const headerStyle: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#000" },
  headerTintColor: "#fff",
  headerShown: false,
};
