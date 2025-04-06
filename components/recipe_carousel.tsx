import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { RecipeCard } from "./recipe_card_sm"
import { RecipeCard_LG } from "./recipe_card_lg"


// Assuming the RecipeCardProps type and RecipeCard component are already defined

interface Recipe {
  imageUrl: string;
  title: string;
  tag: string;
  time: number;
  servings: number;
  ingredients: string[];
  instructions: { step: string }[];
  description: string;
}

interface CarouselProps {
  recipes: Recipe[];
}

export function CarouselSize({ recipes }: CarouselProps) {
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // Update selected recipe when a small card is clicked
  };

  const closeOverlay = () => {
    setSelectedRecipe(null); // Close the overlay
  };


  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {recipes.map((recipe, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1" onClick={() => handleCardClick(recipe)}>
                <RecipeCard
                  imageUrl={recipe.imageUrl}
                  title={recipe.title}
                  tag={recipe.tag}
                  onClick={() => handleCardClick(recipe)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    // overlay for large card
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeOverlay}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the overlay
          >
            <RecipeCard_LG
              imageUrl={selectedRecipe.imageUrl}
              title={selectedRecipe.title}
              tag={selectedRecipe.tag}
              time={selectedRecipe.time}
              servings={selectedRecipe.servings}
              description={selectedRecipe.description}
              ingredients={selectedRecipe.ingredients}
              instructions={selectedRecipe.instructions}
            />
          </div>
        </div>
      )}
    </div>
  );
}