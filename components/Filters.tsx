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
          borderWidth: theme.border.width,
          borderRadius: theme.border.radius,
          borderColor: theme.colors.border,
          paddingHorizontal: 8,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
        inside={false}
        placeholderStyle={{
          fontSize: 16,
          color: theme.colors.placeholder,
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: theme.colors.text,
        }}
        selectedStyle={{
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.background,
          borderWidth: theme.border.width,
          borderRadius: theme.border.radius,
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        containerStyle={{
          marginTop: 10,
          backgroundColor: theme.colors.backgroundSecondary,
          padding: 16,
          borderWidth: theme.border.width,
          borderRadius: theme.border.radius,
          borderColor: theme.colors.border,
        }}
        activeColor={theme.colors.background}
        itemTextStyle={{
          color: theme.colors.placeholder,
        }}
        itemContainerStyle={{
          borderColor: theme.colors.border,
          borderRadius: theme.border.radius,
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
