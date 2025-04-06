import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRecipes } from "../../lib/utils" 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, includeIngredients, maxReadyTime, minServings, diet, intolerances, number } = req.query;

    const dietStr = Array.isArray(diet)
      ? diet.join(",")  
      : diet;           

    const includeIngredientsStr = Array.isArray(includeIngredients)
      ? includeIngredients.join(",")  
      : includeIngredients; 

    const intolerancesStr = Array.isArray(intolerances)
    ? intolerances.join(",")
    :intolerances;

    const data = await fetchRecipes({
      includeIngredients: includeIngredientsStr || undefined,
      maxReadyTime: maxReadyTime ? Number(maxReadyTime) : undefined,
      minServings: minServings ? Number(minServings) : undefined,
      diet: dietStr || undefined ,
      intolerances: intolerancesStr|| undefined,
      number: number ? Number(number) : 3, 
    });

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
  }
}
