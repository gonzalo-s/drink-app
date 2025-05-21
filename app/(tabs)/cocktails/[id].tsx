import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Drink, getDrinkById } from "@/lib/theCocktailDb";
import CocktailDetail from "@/components/CocktailDetail";

export default function DrinkDetails() {
  const [details, setDetails] = useState<Drink | null>(null);
  const { id } = useLocalSearchParams();

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
      <ScrollView style={styles.container}>
        <CocktailDetail details={details} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
  },
});
