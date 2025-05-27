import { useEffect, useState, useMemo } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  Text,
} from "react-native";
import {
  DrinkFiltered,
  FiltersResponse,
  getDrinksByFirstLetter,
} from "../lib/theCocktailDb";
import DrinkCard from "./DrinkCard";
import Filters from "./Filters";
import useDebounce from "../utils/useDebounce";
import { useTheme } from "@emotion/react";

export default function Main() {
  const theme = useTheme();
  const [text, setText] = useState<string>("");
  const [firstLetter, setFirstLetter] = useState("a");
  const [drinks, setDrinks] = useState<Array<DrinkFiltered> | null>(null);
  // log drinks glasses
  drinks?.map((drink) => {
    console.log("🚀 ~ Main ~ drinks.glasses:", drink.strGlass);
  });
  const [filters, setFilters] = useState<FiltersResponse>({
    alcoholic: [],
    categories: [],
    glasses: [],
    ingredients: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const debouncedText = useDebounce(text, 300);

  // Fetch drinks by first letter
  useEffect(() => {
    async function fetchDrinks() {
      setIsLoading(true);
      try {
        const result = await getDrinksByFirstLetter(firstLetter);
        setDrinks(result);
      } catch {
        setDrinks([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDrinks();
  }, [firstLetter]);

  // Update first letter when text changes
  useEffect(() => {
    setFirstLetter(!text || text.trim().length === 0 ? "a" : text.trim()[0]);
  }, [text]);

  // Declarative filtering
  const filteredDrinks = useMemo(() => {
    if (!drinks) return null;

    // If no search and all filters are empty, show all drinks
    const allFiltersEmpty =
      (!debouncedText || debouncedText.trim().length === 0) &&
      filters.alcoholic.length === 0 &&
      filters.categories.length === 0 &&
      filters.glasses.length === 0 &&
      filters.ingredients.length === 0;

    if (allFiltersEmpty) return drinks;

    let filtered = drinks;

    // Filter by search text if present
    if (debouncedText && debouncedText.trim().length > 1) {
      const search = debouncedText.trim().toLowerCase();
      filtered = filtered.filter((drink) =>
        drink.strDrink.toLowerCase().includes(search)
      );
    }

    // Filter by filters if present
    filtered = filtered.filter((drink) => {
      const isAlcoholic =
        filters.alcoholic.length > 0
          ? filters.alcoholic.includes(drink.strAlcoholic.toLowerCase())
          : true;
      const isCategory =
        filters.categories.length > 0
          ? filters.categories.includes(drink.strCategory.toLowerCase())
          : true;
      const isGlass =
        filters.glasses.length > 0
          ? filters.glasses.includes(drink.strGlass.toLowerCase())
          : true;
      const isIngredient =
        filters.ingredients.length > 0
          ? filters.ingredients.every((ingredient) =>
              drink.ingredientInstructions?.some(
                (drinkIngredient) =>
                  drinkIngredient.ingredient.toLowerCase() ===
                  ingredient.toLowerCase()
              )
            )
          : true;
      return isAlcoholic && isCategory && isGlass && isIngredient;
    });

    return filtered;
  }, [drinks, filters, debouncedText]);

  // UI
  return (
    <View style={{ gap: 10 }}>
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          backgroundColor: theme.colors.backgroundSecondary,
          color: theme.colors.text,
          borderColor: theme.colors.border,
        }}
        onChangeText={setText}
        value={text}
        placeholder="Search for a drink"
        placeholderTextColor={theme.colors.placeholder}
      />
      <Filters filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <ActivityIndicator />
      ) : filteredDrinks && filteredDrinks.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: theme.colors.text }}>No drinks found.</Text>
        </View>
      ) : filteredDrinks ? (
        <FlatList
          data={filteredDrinks}
          contentContainerStyle={{ gap: 10, paddingBottom: 250 }}
          keyExtractor={(drink) => drink.idDrink}
          renderItem={({ item }) => <DrinkCard {...item} />}
        />
      ) : null}
    </View>
  );
}
