import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@emotion/react";
import ThemeToggleButton from "../../components/ThemeToggleButton";

function TabsLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarInactiveTintColor: theme.colors.text,

        headerTintColor: theme.colors.text,
        headerStyle: { backgroundColor: theme.colors.background },
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="cocktails/[id]"
        options={{
          tabBarLabel: "Cocktails",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              name="glass-cocktail"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;
