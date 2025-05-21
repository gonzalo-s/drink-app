import { getFilters } from "@/lib/theCocktailDb";
import { useEffect } from "react";
import { View, Text } from "react-native";

function Filters() {
  useEffect(() => {
    async function fetchAllFilters() {
      const filters = await getFilters();
      console.log(filters);
    }
    fetchAllFilters();
  }, []);

  return (
    <View>
      <Text>Filters</Text>
    </View>
  );
}

export default Filters;
