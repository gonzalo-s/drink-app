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
} from "../lib/theCoctailDb";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrinkCard from "./DrinkCard";
import useDebouncedFilter from "../utils/useFilter";

export default function Main() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const [firstLetter, setFirstLetter] = useState(null);
  const [drinks, setDrinks] = useState<Array<Drink> | null>(null);
  const [filteredDrinks, setFilteredDrinks] = useState<Array<Drink> | null>(
    null
  );

  function onChangeText(text: string) {
    setText(text.toLocaleLowerCase());
  }

  function getFirstLetter() {
    if (text.trim().length > 0) {
      return text.trim()[0];
    }
    return null;
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
    if (drinks === null || text.length === 0) {
      fetchDrinks();
    }
  }, [drinks, text]);

  return (
    <View
      style={{
        marginTop: insets.top + 48,
        paddingBottom: insets.bottom,
        width: "100%",
      }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search for a drink"
        placeholderTextColor="white"
      />
      {drinks?.length > 0 ? (
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#1f1f1f",
    color: "white",
  },
});
