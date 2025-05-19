import { useEffect } from "react";
import { Drink } from "../lib/theCoctailDb";

// Custom hook for debounced filtering, now typed for TypeScript
export default function useDebouncedFilter(
  drinks: Array<Drink> | null,
  text: string,
  setFilteredDrinks: React.Dispatch<React.SetStateAction<Array<Drink> | null>>
) {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function runFilter() {
      if (drinks && text.trim().length > 1) {
        const filtered = drinks.filter((drink) =>
          drink.strDrink.toLowerCase().includes(text)
        );
        setFilteredDrinks(filtered);
      } else {
        setFilteredDrinks(null);
      }
    }
    timeout = setTimeout(runFilter, 350);
    return () => clearTimeout(timeout);
  }, [drinks, text, setFilteredDrinks]);
}
