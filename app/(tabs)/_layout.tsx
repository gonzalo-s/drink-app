import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarInactiveTintColor: "white",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="cocktails/[id]"
        options={{
          title: "Cocktails",
          tabBarLabel: "Cocktails",
          tabBarIcon: ({ color }) => (
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
