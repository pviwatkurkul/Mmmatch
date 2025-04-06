import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parseRecipesData } from '../api/parse'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
);

// Function to fetch user's favorites from the 'Users' table
async function fetchFavorites(userId: number) {
  const { data, error } = await supabase
    .from('Users')
    .select('favorites')  // Select the 'favorites' column
    .eq('user_id', userId);  // Filter by user_id

  if (error) {
    console.error('Error fetching favorites:', error);
    throw new Error(error.message);
  }

  return data?.[0]?.favorites ?? [];  // Return the favorites, or an empty array if no data
}

// Function to update the user's favorites (adding a new spoon_id)
async function addFavorite(userId: number, spoonId: number) {
  // Fetch the current favorites
  const currentFavorites = await fetchFavorites(userId);

  // Check if the spoonId is already in the favorites list
  if (currentFavorites.includes(spoonId)) {
    return null; // If already in the list, return null (no update needed)
  }

  // Add the new spoonId to the favorites list
  currentFavorites.push(spoonId);

  // Update the user's favorites column in the 'Users' table
  const { data, error } = await supabase
    .from('Users')
    .update({ favorites: currentFavorites })
    .eq('user_id', userId);  // Filter by user_id

  if (error) {
    console.error('Error adding favorite:', error);
    throw new Error(error.message);
  }

  return data;  // Return the updated data
}

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const userId = Number(searchParams.get('userId'));  // Get userId from the query params
    const spoonId = Number(searchParams.get('spoonId'));  // Get spoonId from the query params

    if (req.method === 'GET') {
      // GET request to fetch user's favorites
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }

      // Fetch the user's favorites from the database
      const favorites = await fetchFavorites(userId);

      if (!favorites.length) {
        return NextResponse.json({ message: 'No favorites found for this user.' }, { status: 200 });
      }

      // Optionally, if the favorites are recipe IDs, you can fetch the corresponding recipe data.
      const { data: recipes, error: recipeError } = await supabase
        .from('Recipe')
        .select('*')  // Adjust to only select the columns you need
        .in('spoon_id', favorites);  // Assuming favorites contains recipe IDs

      if (recipeError) {
        console.error('Error fetching recipes:', recipeError);
        return NextResponse.json({ error: recipeError.message }, { status: 500 });
      }

      return NextResponse.json({ favorites: recipes }, { status: 200 });

    } else if (req.method === 'POST') {
      // POST request to add a recipe to the user's favorites
      if (!userId || !spoonId) {
        return NextResponse.json({ error: 'User ID and Spoon ID are required' }, { status: 400 });
      }

      // Add the recipe to the user's favorites
      const updatedData = await addFavorite(userId, spoonId);

      if (!updatedData) {
        return NextResponse.json({ message: 'Recipe already in favorites' }, { status: 200 });
      }

      return NextResponse.json({ message: 'Recipe added to favorites', data: updatedData }, { status: 200 });
    }

    // Handle other methods if necessary
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });

  } catch (err: any) {
    console.error('Error in handler:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
