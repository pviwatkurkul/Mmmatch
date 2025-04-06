import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// utils/spoonacular.ts
const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/complexSearch";
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export interface ComplexSearchParams {
  includeIngredients?: string;
  fillIngredients?: boolean;
  addRecipeInformation?: boolean;
  addRecipeInstructions?:boolean;
  maxReadyTime?: number;
  minServings?: number;
  number?: number;
  diet?: string;
  intolerances?: string;
}

export async function fetchRecipes(params: ComplexSearchParams = {}) {
  const url = new URL(SPOONACULAR_API_URL);
  url.searchParams.append("apiKey", SPOONACULAR_API_KEY as string);

  // Default required settings
  const defaults: Partial<ComplexSearchParams> = {
    fillIngredients: true,
    addRecipeInformation: true,
    addRecipeInstructions:true,
    number: 3,
  };

  const finalParams = { ...defaults, ...params };

  Object.entries(finalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Spoonacular API Error: ${res.status} - ${errorText}`);
  }

  return res.json();
}
