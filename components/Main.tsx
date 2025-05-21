import { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import {
  DrinkFiltered,
  FiltersResponse,
  getDrinksByFirstLetter,
} from "../lib/theCocktailDb";
import DrinkCard from "./DrinkCard";
import Filters, { FilterProps } from "./Filters";
import useDebounce from "../utils/useDebounce";

export default function Main() {
  const [text, setText] = useState<string | null>(null);
  const [firstLetter, setFirstLetter] = useState("");
  const [drinks, setDrinks] = useState<Array<DrinkFiltered> | null>(null);
  const [filteredDrinks, setFilteredDrinks] =
    useState<Array<DrinkFiltered> | null>(null);
  const [filters, setFilters] = useState<FiltersResponse>({
    alcoholic: [],
    categories: [],
    glasses: [],
    ingredients: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [noDrinksFound, setNoDrinksFound] = useState(false);

  const debouncedText = useDebounce(text, 300);

  function onChangeText(text: string | null) {
    if (text === null || text.trim().length === 0) {
      setText(""); // Set to empty string for easier checks
      setDrinks(null); // This will trigger fetch for 'a' in useEffect
      setFilteredDrinks(null);
      setFirstLetter("");
      return;
    }
    setText(text.toLocaleLowerCase());
  }

  function getFirstLetter() {
    const result = !text || text.trim().length === 0 ? "a" : text.trim()[0];
    return result;
  }

  useEffect(() => {
    const firstLetter = getFirstLetter();
    setFirstLetter(firstLetter);
  }, [text]);

  useEffect(() => {
    async function fetchDrinksByFirstLetter() {
      setIsLoading(true);
      setNoDrinksFound(false);
      try {
        const drinks = await getDrinksByFirstLetter(firstLetter);
        setDrinks(drinks);
        setNoDrinksFound(drinks.length === 0);
      } catch (e) {
        setDrinks([]);
        setNoDrinksFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (firstLetter) {
      fetchDrinksByFirstLetter();
    }
  }, [firstLetter]);

  useEffect(() => {
    if (isLoading || !drinks) return; // Only filter when not loading and drinks is available
    filterData({
      drinks,
      filters,
      setFilteredDrinks,
      searchText: debouncedText,
    });
  }, [filters, drinks, debouncedText, isLoading]);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text || ""}
        placeholder="Search for a drink"
        placeholderTextColor="white"
      />
      <Filters filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <ActivityIndicator />
      ) : noDrinksFound ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: "white" }}>No drinks found.</Text>
        </View>
      ) : drinks?.length && drinks.length > 0 ? (
        <FlatList
          data={filteredDrinks !== null ? filteredDrinks : drinks}
          contentContainerStyle={{ gap: 10, paddingBottom: 250 }}
          keyExtractor={(drink) => drink.idDrink}
          renderItem={({ item }) => <DrinkCard {...item} />}
        />
      ) : null}
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

type FilterDataProps = {
  drinks: Array<DrinkFiltered> | null;
  filters: FiltersResponse;
  setFilteredDrinks: React.Dispatch<
    React.SetStateAction<Array<DrinkFiltered> | null>
  >;
  searchText: string | null;
};

function filterData(props: FilterDataProps) {
  const { drinks, filters, setFilteredDrinks, searchText } = props;

  if (!drinks) {
    setFilteredDrinks(null);
    return;
  }

  // If no search and all filters are empty, show original state
  const allFiltersEmpty =
    (!searchText || searchText.trim().length === 0) &&
    filters.alcoholic.length === 0 &&
    filters.categories.length === 0 &&
    filters.glasses.length === 0 &&
    filters.ingredients.length === 0;

  if (allFiltersEmpty) {
    setFilteredDrinks(null);
    return;
  }

  // Filter by search text if present
  let filtered = drinks;
  if (searchText && searchText.trim().length > 1) {
    const search = searchText.trim().toLowerCase();
    filtered = filtered.filter((drink) =>
      drink.strDrink.toLowerCase().includes(search)
    );
  }

  // Filter by filters if present
  filtered = filtered.filter((drink) => {
    const isAlcoholic =
      filters.alcoholic.length > 0
        ? filters.alcoholic.includes(drink.strAlcoholic)
        : true;
    const isCategory =
      filters.categories.length > 0
        ? filters.categories.includes(drink.strCategory)
        : true;
    const isGlass =
      filters.glasses.length > 0
        ? filters.glasses.includes(drink.strGlass)
        : true;
    const isIngredient =
      filters.ingredients.length > 0
        ? filters.ingredients.some((ingredient) =>
            drink.ingredientInstructions?.some(
              (drinkIngredient) => drinkIngredient.ingredient === ingredient
            )
          )
        : true;
    return isAlcoholic && isCategory && isGlass && isIngredient;
  });

  setFilteredDrinks(filtered);
}
