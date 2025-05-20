import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function RootLayout() {
  return (
    <Stack screenOptions={headerStyle}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const headerStyle: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#000" },
  headerTintColor: "#fff",
  headerShown: false,
};
