import { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { DrinkFiltered, getDrinksByFirstLetter } from "../lib/theCocktailDb";
import DrinkCard from "./DrinkCard";
import useDebouncedFilter from "../utils/useFilter";
import Filters from "./Filters";

export default function Main() {
  const [text, setText] = useState<string | null>(null);
  const [firstLetter, setFirstLetter] = useState("");
  const [drinks, setDrinks] = useState<Array<DrinkFiltered> | null>(null);
  const [filteredDrinks, setFilteredDrinks] =
    useState<Array<DrinkFiltered> | null>(null);

  function onChangeText(text: string | null) {
    if (text === null || text.trim().length === 0) {
      resetDrinks();
      return;
    }
    setText(text.toLocaleLowerCase());
  }

  function resetDrinks() {
    setFilteredDrinks(null);
    setFirstLetter("");
    setText(null);
    setDrinks(null);
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
      const newDrinks = await getDrinksByFirstLetter("a");
      setDrinks(newDrinks);
    }
    if (drinks === null || text?.trim().length === 0) {
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
      <Filters />
      {drinks?.length && drinks.length > 0 ? (
        <FlatList
          data={filteredDrinks !== null ? filteredDrinks : drinks}
          contentContainerStyle={{ gap: 10, paddingBottom: 150 }}
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
