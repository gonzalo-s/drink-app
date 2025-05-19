// DRINK API TYPES AND FUNCTIONS
export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
};

export type DrinkFiltered = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

// Fetches a list of drinks (cocktails) from TheCocktailDB API
export async function getLatestDrinks(): Promise<Drink[]> {
  // This endpoint returns a list of cocktails ("drinks")
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
  );
  const json = await response.json();
  return json.drinks;
}

// Fetches details for a single drink by ID
export async function getDrinkDetails(idDrink: string): Promise<Drink | null> {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
  );
  const json = await response.json();
  return json.drinks ? json.drinks[0] : null;
}

// fetch drinks by first letter => return drinks name, id, image
export async function getDrinksByFirstLetter(
  firstLetter: string
): Promise<DrinkFiltered[]> {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
  );
  const json = await response.json();

  if (!json.drinks) {
    return [];
  }

  const drinks = json.drinks.map((drink: Drink) => ({
    idDrink: drink.idDrink,
    strDrink: drink.strDrink,
    strDrinkThumb: drink.strDrinkThumb,
  }));
  return drinks;
}

export async function getDrinkById(id: string): Promise<Drink | null> {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const json = await response.json();
  return json.drinks ? json.drinks[0] : null;
}
