import { IngredientsInstructions } from "@/lib/theCocktailDb";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@emotion/react";

export default function Ingredient(props: IngredientsInstructions[0]) {
  const theme = useTheme();

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name="rhombus-medium"
        color={theme.colors.text}
        style={{ marginEnd: 4 }}
      />
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        {props.measure.trim()}{" "}
      </Text>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        {props.ingredient}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
