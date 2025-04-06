import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parseRecipesData } from '../api/parse'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
);

// Function to fetch user's favorites from the 'Users' table
async function fetchFavorites(userId: string) {
    
  const { data, error } = await supabase
    .from('Users')
    .select('favorite_recipes')  
    .eq('user_id', userId); 

  if (error) {
    console.error('Error fetching favorites:', error);
    throw new Error(error.message);
  }

  return data?.[0]?.favorite_recipes ?? [];  // Return the favorites, or an empty array if no data
}

async function addFavorite(userId: string, spoonId: number) {

    const currentFavorites = await fetchFavorites(userId);

    if (currentFavorites.includes(spoonId)) {
        return null; 
    }

    // Add the new spoonId to the favorites list
    currentFavorites.push(spoonId);
    console.log(currentFavorites)
    console.log(userId)

    // Update the user's favorites column in the 'Users' table
    const { data, error } = await supabase
        .from('Users')
        .update({ favorite_recipes: currentFavorites })
        .eq('user_id', userId);  
    console.log('data', data)


    if (error) {
        console.error('Error adding favorite:', error);
        throw new Error(error.message);
    }
    const favorites = await fetchFavorites(userId);
    console.log('f', favorites)
    return data;  
}

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const userId = searchParams.get('userId');  // Get userId from the query params
    const spoonId = Number(searchParams.get('spoonId'));  // Get spoonId from the query params

    if (req.method === 'GET') {
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }

      const favorites = await fetchFavorites(userId);

      if (!favorites.length) {
        return NextResponse.json({ message: 'No favorites found for this user.' }, { status: 200 });
      }

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
      if (!userId || !spoonId) {
        return NextResponse.json({ error: 'User ID and Spoon ID are required' }, { status: 400 });
      }

      const updatedData = await addFavorite(userId, spoonId);

      console.log("updated",updatedData)
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
