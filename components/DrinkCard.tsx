import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { Drink } from "../lib/theCocktailDb";

export default function DrinkCard(props: Drink) {
  return (
    <View style={styles.card}>
      <Link
        href={{
          pathname: "/(tabs)/cocktails/[id]",
          params: { id: props.idDrink },
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.cardTitle}>{props.strDrink}</Text>
          <Image
            source={{
              uri: props.strDrinkThumb,
            }}
            style={styles.cardImage}
          />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    height: 290,
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 0,
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
