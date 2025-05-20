import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Drink,
  getDrinkById,
  getIngredientsInstructions,
  IngredientsInstructions,
} from "@/lib/theCocktailDb";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ingredient from "@/components/Ingredient";

export default function DrinkDetails() {
  const insets = useSafeAreaInsets();

  const [details, setDetails] = useState<Drink | null>(null);
  const { id } = useLocalSearchParams();

  const ingredientInstructions: IngredientsInstructions | null =
    details && getIngredientsInstructions(details);
  console.log(
    "🚀 ~ DrinkDetails ~ ingredientInstructions:",
    ingredientInstructions
  );

  function getId() {
    if (typeof id === "string") {
      return id;
    }
    return id[0];
  }

  useEffect(() => {
    async function getDrinkDetailsById() {
      const response = await getDrinkById(getId());

      setDetails(response);
    }

    getDrinkDetailsById();

    return () => {
      setDetails(null);
    };
  }, [id]);

  if (!details) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingBottom: insets.bottom,
          width: "100%",
          flex: 1,
        }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.cardTitle}>{details.strDrink}</Text>
          <Image
            source={{
              uri: details.strDrinkThumb,
            }}
            style={styles.cardImage}
          />
          <Text style={styles.sectionTitle}>Category:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {details.strCategory} - {details.strAlcoholic}
          </Text>
          <Text style={styles.sectionTitle}>Glass:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {details.strGlass}
          </Text>
          <Text style={styles.sectionTitle}>Instructions:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {details.strInstructions}
          </Text>

          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <View
            style={{
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            {ingredientInstructions?.length &&
              ingredientInstructions.length > 0 &&
              ingredientInstructions.map((item) => {
                return <Ingredient {...item} key={item.ingredient} />;
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  sectionTitle: {
    color: "white",
    fontSize: 26,
  },
  sectionText: {
    color: "white",
    fontSize: 10,
  },
  wrapper: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
  cardTitle: {
    color: "white",
    fontSize: 26,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
