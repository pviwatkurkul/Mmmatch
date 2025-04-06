'use client'
import ChatWindow from '@/components/ui/chatwindow'
import { CarouselSize } from '@/components/recipe_carousel';

import '@/app/globals.css'
const recipes = [
  {
    imageUrl: "https://media.istockphoto.com/id/1420910486/photo/spaghetti-and-beef-meatballs-with-tomato-sauce-in-white-dish-on-wooden-rustic-board-italian.jpg?s=612x612&w=0&k=20&c=K388S8_fDe0IQtWha8DEDDxNxkIImMHXTrLd0dF6hAQ=",
    title: "Classic Spaghetti Bolognese",
    tag: "Italian",
    time: 35,
    servings: 4,
    ingredients: [
      "200g spaghetti",
      "300g ground beef",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "400g canned tomatoes",
      "2 tbsp tomato paste",
      "Salt and pepper to taste",
      "1 tsp dried oregano",
      "Grated Parmesan cheese (optional)",
    ],
    instructions: [
      { step: "Boil spaghetti according to package instructions." },
      { step: "In a pan, sauté onion and garlic until fragrant." },
      { step: "Add ground beef and cook until browned." },
      { step: "Stir in tomato paste, canned tomatoes, and oregano." },
      { step: "Simmer for 15–20 minutes, season with salt and pepper." },
      { step: "Serve sauce over spaghetti and top with Parmesan if desired." },
    ],
    description: "A hearty and comforting Italian pasta dish with rich tomato and beef sauce.",
  },
  {
    imageUrl: "https://media.istockphoto.com/id/1396858974/photo/healthy-eating-and-healthy-diet-woman-holding-plate-with-fresh-vegan-or-vegetarian-food.jpg?s=1024x1024&w=is&k=20&c=grCIWdbwSQQsMx_Zi1B4DBQFgSjn2hNgC7ZR_5ApW_M=",
    title: "Rainbow Vegan Bowl",
    tag: "Vegan",
    time: 20,
    servings: 2,
    ingredients: [
      "1 cup quinoa",
      "1 avocado, sliced",
      "1/2 cup cherry tomatoes, halved",
      "1/2 cup shredded carrots",
      "1/2 cup red cabbage, shredded",
      "1/4 cup hummus",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt to taste",
    ],
    instructions: [
      { step: "Cook quinoa according to package instructions." },
      { step: "Arrange cooked quinoa in bowls." },
      { step: "Top with avocado, tomatoes, carrots, and red cabbage." },
      { step: "Drizzle with olive oil and lemon juice." },
      { step: "Add a dollop of hummus and serve." },
    ],
    description: "A colorful and nutritious bowl packed with fresh veggies and plant-based protein.",
  },
  {
    imageUrl: "https://media.istockphoto.com/id/879661732/photo/butter-chicken-indian-chicken-curry-dish.jpg?s=1024x1024&w=is&k=20&c=rAuX39JsyVCKG2Pw1MwjQi-RWJCAvAXMU2dsqCcDdbI=",
    title: "Coconut Chicken Curry",
    tag: "Asian",
    time: 45,
    servings: 4,
    ingredients: [
      "500g chicken breast, diced",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 tbsp curry powder",
      "400ml coconut milk",
      "1 tbsp olive oil",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    instructions: [
      { step: "Heat oil in a pan and sauté onion, garlic, and ginger." },
      { step: "Add chicken and cook until lightly browned." },
      { step: "Stir in curry powder and cook for 1–2 minutes." },
      { step: "Pour in coconut milk and simmer for 25–30 minutes." },
      { step: "Season with salt and garnish with cilantro before serving." },
    ],
    description: "A creamy and fragrant chicken curry made with coconut milk and warming spices.",
  },
];


export default async function Chat() {
    return (
      <>
      <ChatWindow/>
      {/* <div className="flex flex-col items-center justify-center">
        <CarouselSize recipes={recipes} />;
      </div> */}
      </>
    );
  }