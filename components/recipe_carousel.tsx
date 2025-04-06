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
    <div className="relative m-auto">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-screen max-w-[300px]"
      >
        <CarouselContent>
          {recipes.map((recipe, index) => (
            <CarouselItem key={index}>
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
        <CarouselPrevious className="text-white"/>
        <CarouselNext className="text-white"/>
      </Carousel>

      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeOverlay}
        >
          <div
            className="shadow-lg overflow-y-auto max-h-[90vh]"
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