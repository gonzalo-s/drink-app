import { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  Drink,
  getDrinksByFirstLetter,
  getLatestDrinks,
} from "../lib/theCocktailDb";
import DrinkCard from "./DrinkCard";
import useDebouncedFilter from "../utils/useFilter";

export default function Main() {
  const [text, setText] = useState<string | null>(null);
  const [firstLetter, setFirstLetter] = useState("");
  const [drinks, setDrinks] = useState<Array<Drink> | null>(null);
  const [filteredDrinks, setFilteredDrinks] = useState<Array<Drink> | null>(
    null
  );

  function onChangeText(text: string | null) {
    if (text === null) {
      setText(null);
      return;
    }
    setText(text.toLocaleLowerCase());
  }

  function getFirstLetter() {
    if (text === null) {
      return "";
    }
    if (text.trim().length > 0) {
      return text.trim()[0];
    }
    return "";
  }

  useDebouncedFilter(drinks, text, setFilteredDrinks);

  useEffect(() => {
    async function fetchDrinksByFirstLetter() {
      const drinks = await getDrinksByFirstLetter(firstLetter);
      setDrinks(drinks);
    }

    if (firstLetter) {
      fetchDrinksByFirstLetter();
    }
  }, [firstLetter]);

  useEffect(() => {
    const firstLetter = getFirstLetter();
    setFirstLetter(firstLetter);
  }, [text]);

  useEffect(() => {
    async function fetchDrinks() {
      const drinks = await getLatestDrinks();
      setDrinks(drinks);
    }
    if (drinks === null || text?.length === 0) {
      fetchDrinks();
    }
  }, [drinks, text]);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text || ""}
        placeholder="Search for a drink"
        placeholderTextColor="white"
      />
      {drinks?.length && drinks.length > 0 ? (
        <FlatList
          data={filteredDrinks !== null ? filteredDrinks : drinks}
          contentContainerStyle={{ gap: 10 }}
          keyExtractor={(drink) => drink.idDrink}
          renderItem={({ item }) => <DrinkCard {...item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#1f1f1f",
    color: "white",
  },
});
