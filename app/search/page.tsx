'use client';
import React, { useState } from 'react';
import { parseRecipesData } from '../../pages/api/parse'; // Adjust the path if needed

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [includeIngredients, setIncludeIngredients] = useState('');
  const [diet, setDiet] = useState('');
  const [intolerances, setIntolerances] = useState('');
  const [number, setNumber] = useState(3);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        query,
        includeIngredients,
        diet,
        intolerances,
        number: number.toString(),
      });

      const response = await fetch(`/api/recipes?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        const parsed = parseRecipesData(data);
        setRecipes(parsed);
      } else {
        setError(data.error || 'Failed to fetch recipes');
      }
    } catch (err) {
      setError('An error occurred while fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const params = new URLSearchParams({
        query,
        includeIngredients,
        diet,
        intolerances,
        number: number.toString(),
      });

      const response = await fetch(`/api/migrate?${params.toString()}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok) {
        alert('Recipes saved to database!');
        console.log('Saved result:', result);
      } else {
        alert(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving recipes:', error);
      alert('An error occurred while saving recipes.');
    }
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Include Ingredients (comma separated)"
          value={includeIngredients}
          onChange={(e) => setIncludeIngredients(e.target.value)}
        />
        <input
          type="text"
          placeholder="Diet (e.g., vegan, vegetarian)"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Intolerances (comma separated)"
          value={intolerances}
          onChange={(e) => setIntolerances(e.target.value)}
        />
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          min="3"
        />
        <button onClick={handleSearch}>Search Recipes</button>
        <button onClick={handleSave}>Save Recipes to DB</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recipes.length > 0 && (
        <div>
          <h2>Recipes</h2>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} width="200" />
                <p><strong>Summary:</strong> {recipe.summary}</p>
                <p><strong>Dish Types:</strong> {recipe.dishTypes}</p>
                <p><strong>Diets:</strong> {recipe.diets.join(', ')}</p>
                <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Vegetarian:</strong> {recipe.vegetarian ? 'Yes' : 'No'}</p>
                <p><strong>Vegan:</strong> {recipe.vegan ? 'Yes' : 'No'}</p>
                <p><strong>Gluten Free:</strong> {recipe.glutenFree ? 'Yes' : 'No'}</p>
                <p><strong>Dairy Free:</strong> {recipe.dairyFree ? 'Yes' : 'No'}</p>
                <p><strong>Sustainable:</strong> {recipe.sustainable ? 'Yes' : 'No'}</p>
                <p><strong>Weight Per Serving:</strong> {recipe.weightPerServing}</p>
                <p><strong>Caloric Breakdown:</strong></p>
                <ul>
                  <li>Protein: {recipe.caloricBreakdown.percentProtein}%</li>
                  <li>Fat: {recipe.caloricBreakdown.percentFat}%</li>
                  <li>Carbs: {recipe.caloricBreakdown.percentCarbs}%</li>
                </ul>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                <p><strong>Used Ingredients:</strong> {recipe.usedIngredients.join(', ')}</p>
                <p><strong>Missed Ingredients:</strong> {recipe.missedIngredients.join(', ')}</p>
                <p><strong>Unused Ingredients:</strong> {recipe.unusedIngredients.join(', ')}</p>
                <p><strong>Instructions:</strong></p>
                <ol>
                  {recipe.instructions.map((step: any, i: number) => (
                    <li key={i}>{step.step}</li>
                  ))}
                </ol>
                <p><strong>Nutrients:</strong></p>
                <ul>
                  {recipe.nutrients.map((n: any, i: number) => (
                    <li key={i}>
                      {n.name}: {n.amount} {n.unit} ({n.percentOfDailyNeeds}%)
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
