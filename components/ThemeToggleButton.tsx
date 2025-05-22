import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@emotion/react";
import { useThemeToggle } from "../ThemeProvider";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const { toggleTheme, isDark } = useThemeToggle();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
      <MaterialCommunityIcons
        name={isDark ? "weather-sunny" : "weather-night"}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
