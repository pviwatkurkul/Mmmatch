import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parseRecipesData } from '../api/parse'; // adjust path as needed

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
);

async function fetchFromSpoonacular(params: Record<string, string>) {
  const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
  url.searchParams.append('apiKey', process.env.SPOONACULAR_API_KEY!);
  url.searchParams.append('addRecipeInformation', 'true');
  url.searchParams.append('fillIngredients', 'true');
  url.searchParams.append('addRecipeInstructions','true');
  url.searchParams.append('number', '3');

  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.append(key, value);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch from Spoonacular');

  const data = await res.json();
  return parseRecipesData(data);
}

export const config = {
  runtime: 'edge',
};

export default async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const params = Object.fromEntries(searchParams.entries());

    const parsedRecipes = await fetchFromSpoonacular(params);

    const values = parsedRecipes.map((r) => ({
      spoon_id: r.id,
      title: r.title,
      image: r.image,
      readyInMinutes: r.readyInMinutes,
      servings: r.servings,
      vegetarian: r.vegetarian,
      vegan: r.vegan,
      glutenFree: r.glutenFree,
      dairyFree: r.dairyFree,
      sustainable: r.sustainable,
      nutrients: JSON.stringify(r.nutrients),
      caloricBreakdown: JSON.stringify(r.caloricBreakdown),
      weightPerServing: r.weightPerServing,
      summary: r.summary,
      dishTypes: r.dishTypes,
      diets: r.diets,
      instructions: JSON.stringify(r.instructions),
      usedIngredients: r.usedIngredients,
      missedIngredients: r.missedIngredients,
      unusedIngredients: r.unusedIngredients,
      ingredients: r.ingredients,
    }));

    const { data, error } = await supabase.from('Recipe').insert(values);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Recipes saved', data }, { status: 200 });
  } catch (err: any) {
    console.error('Migration error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
