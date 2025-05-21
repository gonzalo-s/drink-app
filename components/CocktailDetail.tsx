import { View, Text, Image, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ingredient from "./Ingredient";
import { Drink } from "@/lib/theCocktailDb";

type CocktailDetailProps = {
  details: Drink;
};

export default function CocktailDetail(props: CocktailDetailProps) {
  console.log("🚀 ~ CocktailDetail ~ props:", props);

  return (
    <View
      style={{
        padding: 16,
        width: "100%",
        height: "100%",
        flex: 1,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.cardTitle}>{props.details.strDrink}</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            source={{ uri: props.details.strDrinkThumb }}
            style={styles.cardImage}
          />
          <View style={{ gap: 10 }}>
            <Text style={styles.sectionTitle}>Category:</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {props.details.strCategory} - {props.details.strAlcoholic}
            </Text>
            <Text style={styles.sectionTitle}>Glass:</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {props.details.strGlass}
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          {props.details.strInstructions}
        </Text>

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View
          style={{
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          {props.details?.ingredientInstructions?.length &&
            props.details.ingredientInstructions.length > 0 &&
            props.details.ingredientInstructions.map((item) => {
              return <Ingredient {...item} key={item.ingredient} />;
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
    // padding: 16,
    gap: 20,
    justifyContent: "flex-start",
  },
  sectionTitle: {
    color: "white",
    fontSize: 26,
  },
  sectionText: {
    color: "white",
    fontSize: 10,
  },
  cardTitle: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 50,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
