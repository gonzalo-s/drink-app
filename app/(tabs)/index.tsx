import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Main from "@/components/Main";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@emotion/react";
import { useThemeToggle } from "@/ThemeProvider"; // adjust path if needed

export default function HomeScreen() {
  const theme = useTheme();
  const { isDark } = useThemeToggle();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar style={isDark ? "light" : "dark"} />
        <View
          style={{
            width: "100%",
            backgroundColor: theme.colors.background,
          }}
        >
          <Main />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
});
