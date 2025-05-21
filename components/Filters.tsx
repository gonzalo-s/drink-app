import { FiltersResponse, getFilters } from "@/lib/theCocktailDb";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";
import { MultiSelect } from "react-native-element-dropdown";

export type FilterProps = {
  filters: FiltersResponse;
  setFilters: (filters: FiltersResponse) => void;
};

function Filters(props: FilterProps) {
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
        style={[styles.dropdown, { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={filterOptions?.alcoholic || []}
        labelField="label"
        valueField="value"
        value={props.filters.alcoholic}
        onChange={(item) => {
          console.log("🚀 ~ onChange ~ item:", item);
          onMultiValueChange(item);
        }}
        confirmSelectItem
      />
    </View>
  );
}

export default Filters;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "white",
    backgroundColor: "#1f1f1f",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "red",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white",
    backgroundColor: "#1f1f1f",
  },
});
