// DRINK API TYPES AND FUNCTIONS
export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  ingredientInstructions: IngredientsInstructions;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  dateModified?: string;
  strCreativeCommonsConfirmed?: string;
  strDrinkAlternate?: any;
  strIBA?: any;
  strImageAttribution?: any;
  strImageSource?: any;
  strIngredient1?: string;
  strIngredient10?: any;
  strIngredient11?: any;
  strIngredient12?: any;
  strIngredient13?: any;
  strIngredient14?: any;
  strIngredient15?: any;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: any;
  strIngredient6?: any;
  strIngredient7?: any;
  strIngredient8?: any;
  strIngredient9?: any;
  strInstructions?: string;
  strInstructionsDE?: string;
  strInstructionsES?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  "strInstructionsZH-HANS"?: any;
  "strInstructionsZH-HANT"?: any;
  strMeasure1?: string;
  strMeasure10?: any;
  strMeasure11?: any;
  strMeasure12?: any;
  strMeasure13?: any;
  strMeasure14?: any;
  strMeasure15?: any;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: any;
  strMeasure6?: any;
  strMeasure7?: any;
  strMeasure8?: any;
  strMeasure9?: any;
  strTags?: any;
  strVideo?: any;
};

export type DrinkFiltered = Pick<
  Drink,
  | "idDrink"
  | "strDrink"
  | "strDrinkThumb"
  | "strAlcoholic"
  | "strCategory"
  | "strGlass"
  | "ingredientInstructions"
>;

export type IngredientsInstructions = Array<{
  ingredient: string;
  measure: string;
}>;

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
    throw new Error("No drinks found");
  }

  const drinks = json.drinks.map((drink: Drink) => ({
    idDrink: drink.idDrink,
    strDrink: drink.strDrink,
    strDrinkThumb: drink.strDrinkThumb,
    strAlcoholic: drink.strAlcoholic,
    ingredientInstructions: getIngredientsInstructions(drink),
  }));
  return drinks;
}

export async function getDrinkById(id: string): Promise<Drink | null> {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const json = await response.json();

  if (!json.drinks) {
    return null;
  }

  const drink = json.drinks[0];
  const ingredientsInstructions = getIngredientsInstructions(drink);
  return {
    ...drink,
    ingredientInstructions: ingredientsInstructions,
  };
}

export function getIngredientsInstructions(
  drink: Drink
): IngredientsInstructions {
  const result: IngredientsInstructions = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];
    if (
      ingredient &&
      typeof ingredient === "string" &&
      ingredient.trim() !== ""
    ) {
      result.push({
        ingredient,
        measure: typeof measure === "string" ? measure : "",
      });
    }
  }
  return result;
}

export function getIngredients(drink: Drink): Array<string> {
  const result: Array<string> = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    if (
      ingredient &&
      typeof ingredient === "string" &&
      ingredient.trim() !== ""
    ) {
      result.push(ingredient);
    }
  }
  return result;
}

export type FiltersResponse = {
  categories: Array<string>;
  glasses: Array<string>;
  ingredients: Array<string>;
  alcoholic: Array<string>;
};

export async function getFilters(): Promise<FiltersResponse> {
  const endpoints = [
    {
      key: "categories",
      url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
      prop: "strCategory",
    },
    {
      key: "glasses",
      url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list",
      prop: "strGlass",
    },
    {
      key: "ingredients",
      url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
      prop: "strIngredient1",
    },
    {
      key: "alcoholic",
      url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list",
      prop: "strAlcoholic",
    },
  ];

  try {
    const results = await Promise.all(
      endpoints.map(async ({ url, prop }) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          if (!json.drinks) return [];
          return json.drinks.map((item: any) => {
            return { label: item[prop], value: item[prop] };
          });
        } catch {
          return [];
        }
      })
    );

    return {
      categories: results[0],
      glasses: results[1],
      ingredients: results[2],
      alcoholic: results[3],
    };
  } catch {
    return {
      categories: [],
      glasses: [],
      ingredients: [],
      alcoholic: [],
    };
  }
}
