export interface ParsedRecipe {
    id: number;
    image: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    sustainable: boolean;
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: string;
    summary: string;
    dishTypes: string;
    diets: string[];
    instructions: { step: string }[];
    usedIngredients: string[];
    missedIngredients: string[];
    unusedIngredients: string[];
    ingredients: string[];
  }
  

export function parseRecipesData(data: any): ParsedRecipe[] {
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format from API");
    }
    console.log("data:",data.results)
    return data.results.map((recipe: any): ParsedRecipe => {
      console.log('Recipe data:', recipe); // Debugging log to inspect the full recipe data

      const instructions = recipe.analyzedInstructions?.[0]?.steps?.map((s: any) => ({
        step: s.step,
      })) 

      return {
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        dairyFree: recipe.dairyFree,
        sustainable: recipe.sustainable,
        nutrients: recipe.nutrition?.nutrients ?? [],
        caloricBreakdown: recipe.nutrition?.caloricBreakdown ?? {
          percentProtein: 0,
          percentFat: 0,
          percentCarbs: 0,
        },
        weightPerServing: recipe.nutrition?.weightPerServing
          ? `${recipe.nutrition.weightPerServing.amount} ${recipe.nutrition.weightPerServing.unit}`
          : "0 g",
        summary: recipe.summary,
        dishTypes: recipe.dishTypes?.join(", ") ?? "",
        diets: recipe.diets ?? [],
        instructions: instructions,
        usedIngredients: recipe.usedIngredients?.map((ing: any) => ing.original) ?? [],
        missedIngredients: recipe.missedIngredients?.map((ing: any) => ing.original) ?? [],
        unusedIngredients: recipe.unusedIngredients?.map((ing: any) => ing.original) ?? [],
        ingredients: [
            ...(recipe.usedIngredients?.map((ing: any) => ing.original) ?? []),
            ...(recipe.missedIngredients?.map((ing: any) => ing.original) ?? []),
            ...(recipe.unusedIngredients?.map((ing: any) => ing.original) ?? []),
        ],
      };
    });
}
