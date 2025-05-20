import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { DrinkFiltered } from "../lib/theCocktailDb";

export default function DrinkCard(props: DrinkFiltered) {
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
          <Text style={styles.cardText}>({props.strAlcoholic})</Text>
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
    height: 350,
    display: "flex",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    gap: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  cardText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
