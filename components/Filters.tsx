import { FilterKey, FiltersResponse, getFilters } from "@/lib/theCocktailDb";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import React from "react";
import {
  AccordionContent,
  Checkbox,
  CheckboxGroup,
  Text,
  CheckboxIcon,
  CheckIcon,
  Accordion,
  AccordionTrigger,
  AccordionIcon,
  AccordionTitleText,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckboxLabel,
  VStack,
  AccordionItem,
  Modal,
  ButtonText,
  ModalContent,
  ModalFooter,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { CheckboxIndicator } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";

export type FilterProps = {
  filters: FiltersResponse;
  setFilters: (filters: FiltersResponse) => void;
};

function Filters(props: FilterProps) {
  // const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FiltersResponse | null>(
    null
  );
  // Split state for each filter
  const [categories, setCategories] = useState<string[]>(
    props.filters.categories || []
  );
  const [glasses, setGlasses] = useState<string[]>(props.filters.glasses || []);
  const [ingredients, setIngredients] = useState<string[]>(
    props.filters.ingredients || []
  );
  const [alcoholic, setAlcoholic] = useState<string[]>(
    props.filters.alcoholic || []
  );

  useEffect(() => {
    async function fetchAllFiltersOptions() {
      console.log("🚀 ~ fetchAllFiltersOptions ~ fetchAllFiltersOptions:");
      const filtersOptions = await getFilters();
      setFilterOptions(filtersOptions);
    }
    fetchAllFiltersOptions();
  }, []);

  // When opening modal, reset each filter state to current filters
  const openModal = () => {
    setCategories(props.filters.categories || []);
    setGlasses(props.filters.glasses || []);
    setIngredients(props.filters.ingredients || []);
    setAlcoholic(props.filters.alcoholic || []);
    setShowModal(true);
  };

  // When closing modal without applying, just close
  const closeModal = () => {
    setShowModal(false);
  };

  // When applying, update real filters and close
  const applyFilters = () => {
    props.setFilters({
      categories,
      glasses,
      ingredients,
      alcoholic,
    });
    setShowModal(false);
  };

  const resetFilters = () => {
    setCategories([]);
    setGlasses([]);
    setIngredients([]);
    setAlcoholic([]);
    props.setFilters({
      categories: [],
      glasses: [],
      ingredients: [],
      alcoholic: [],
    });
    setShowModal(false);
  };

  return (
    <VStack>
      <Button onPress={openModal}>
        <ButtonText>Filters</ButtonText>
      </Button>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          backgroundColor="$trueGray800"
          closeOnOverlayClick
          sx={{
            backgroundColor: "$black",
          }}
        >
          <ModalContent
            backgroundColor="green"
            boxShadow="none"
            w="100%"
            height="70%"
            justifyContent="center"
            alignItems="center"
            paddingVertical="$0"
            paddingBottom="$0"
            paddingHorizontal="$0"
          >
            <Accordion
              backgroundColor="blue"
              borderRadius="$lg"
              style={{ flex: 1 }}
            >
              {filterOptions && (
                <>
                  <Filter
                    filterKey="categories"
                    options={filterOptions.categories}
                    values={categories}
                    setValues={setCategories}
                  />
                  <Filter
                    filterKey="glasses"
                    options={filterOptions.glasses}
                    values={glasses}
                    setValues={setGlasses}
                  />
                  <Filter
                    filterKey="ingredients"
                    options={filterOptions.ingredients}
                    values={ingredients}
                    setValues={setIngredients}
                  />
                  <Filter
                    filterKey="alcoholic"
                    options={filterOptions.alcoholic}
                    values={alcoholic}
                    setValues={setAlcoholic}
                  />
                </>
              )}
            </Accordion>
            <ModalFooter
              w="100%"
              flexDirection="row"
              justifyContent="space-between"
              gap={10}
            >
              <Button onPress={closeModal} flex={1}>
                <ButtonText>Close</ButtonText>
              </Button>
              <Button onPress={resetFilters} flex={1}>
                <ButtonText>Reset</ButtonText>
              </Button>
              <Button onPress={applyFilters} flex={1}>
                <ButtonText>Apply</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SafeAreaView>
    </VStack>
  );
}

// Memoized Filter component for individual filter state
const Filter = React.memo(function Filter({
  filterKey,
  options,
  values,
  setValues,
}: {
  filterKey: FilterKey;
  options: string[];
  values: string[];
  setValues: (values: string[]) => void;
}) {
  function onMultiValueChange(values: Array<string>) {
    setValues(values);
  }

  const RenderCheckbox = React.memo(({ item }: { item: string }) => (
    <Checkbox value={item} key={item} marginLeft="$5" height={50}>
      <CheckboxIndicator marginRight={10}>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{item}</CheckboxLabel>
    </Checkbox>
  ));

  const renderCheckboxItem = React.useCallback(
    ({ item }: { item: string }) => <RenderCheckbox item={item} />,
    []
  );

  return (
    <AccordionItem value={filterKey} bg="transparent">
      <AccordionTrigger borderRadius="$md" bg="transparent">
        {({ isExpanded }: { isExpanded: boolean }) => (
          <>
            <AccordionTitleText mb="$2" color="$textLight500">
              {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            </AccordionTitleText>
            {isExpanded ? (
              <AccordionIcon as={ChevronUpIcon} color="$textLight500" />
            ) : (
              <AccordionIcon as={ChevronDownIcon} color="$textLight500" />
            )}
          </>
        )}
      </AccordionTrigger>
      <AccordionContent
        borderRadius="$lg"
        backgroundColor="red"
        width="100%"
        paddingVertical="$0"
        paddingBottom="$0"
        paddingHorizontal="$0"
        paddingTop="$0"
      >
        <CheckboxGroup
          value={values}
          onChange={onMultiValueChange}
          backgroundColor="transparent"
          paddingVertical="$5"
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={renderCheckboxItem}
            getItemLayout={(_, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            windowSize={10}
            style={{ maxHeight: 200 }}
            nestedScrollEnabled
          />
        </CheckboxGroup>
      </AccordionContent>
    </AccordionItem>
  );
});

export default Filters;
