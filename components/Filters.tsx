import { FiltersResponse, getFilters } from "@/lib/theCocktailDb";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { useTheme } from "@emotion/react";

export type FilterProps = {
  filters: FiltersResponse;
  setFilters: (filters: FiltersResponse) => void;
};

function Filters(props: FilterProps) {
  const theme = useTheme();
  const [filterOptions, setFilterOptions] = useState<FiltersResponse | null>(
    null
  );

  useEffect(() => {
    async function fetchAllFiltersOptions() {
      const filtersOptions = await getFilters();
      setFilterOptions(filtersOptions);
    }
    fetchAllFiltersOptions();
  }, []);

  // push and pop selected value to filters
  function onMultiValueChange(value: Array<string>) {
    const newFilters = { ...props.filters };
    if (value.length === 0) {
      newFilters.alcoholic = [];
    } else {
      newFilters.alcoholic = value;
    }

    props.setFilters(newFilters);
  }

  return (
    <View>
      <MultiSelect
        style={{
          height: 50,
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
        placeholderStyle={{
          fontSize: 16,
          color: theme.colors.placeholder,
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: theme.colors.dropdownSelected,
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 16,
          color: theme.colors.text,
          backgroundColor: theme.colors.inputBackground,
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        containerStyle={{
          backgroundColor: theme.colors.backgroundSecondary,
          padding: 16,
        }}
        data={filterOptions?.alcoholic || []}
        labelField="label"
        valueField="value"
        value={props.filters.alcoholic}
        onChange={(item) => {
          onMultiValueChange(item);
        }}
        confirmSelectItem
      />
    </View>
  );
}

export default Filters;
