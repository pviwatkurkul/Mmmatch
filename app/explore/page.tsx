'use client';
import { poppins, inter } from '@/components/ui/fonts';
import { RecipeCard } from '@/components/recipe_card_sm';
import { RecipeCard_LG } from '@/components/recipe_card_lg';
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { CarouselSize } from '@/components/recipe_carousel';
import Link from 'next/link';

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


export default function Explore() {
    return (
        <>
            <div className="flex h-screen flex-col py-16 px-5 gap-5 content-center">
                <div className={`${poppins.className} p-4 flex self-stretch rounded-lg bg-navy border border-mintgreen text-white text-xl font-bold justify-center z-2`}>Explore Recipes</div>
                <div className="flex self-stretch rounded-lg border border-mintgreen flex-col content-start p-4 gap-6">
                    <div className = "flex flex-col gap-2 content-start">
                        <div className={`${poppins.className} text-customgreen text-xl font-bold`}>Find your Recipes</div>
                        <p className={`${inter.className} text-white text-sm`}>Use our curated <span className="text-customorange">chatbot</span> to find recipes according to your preferences.</p>
                    </div>
                    <Link className={`${poppins.className} text-white text-sm w-full bg-customgreen rounded-lg flex justify-center items-center p-2 font-bold gap-2 `} href="/chat">
                        <Sparkles/>
                        Start Chatting
                    </Link>

                </div>

                <div className={`${poppins.className} text-lg flex flex-col content-center self-stretch text-customgreen font-bold`}>
                    Popular
                </div>
                <CarouselSize recipes={recipes} />;
            </div>
        {/* <RecipeCard imageUrl='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
        title='Lasanga' tag='Italian'/> */}
        {/* <RecipeCard_LG imageUrl='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        title='Lasanga' tag='Italian' time={10} servings={2} description='what' ingredients={["apple", "banana", "orange"]} instructions={[
            { step: "Preheat the oven to 350°F (175°C)." },
            { step: "Mix the flour, sugar, and eggs in a bowl." },
            { step: "Pour the mixture into a baking pan." },
            { step: "Bake for 25 minutes or until golden brown." },
            { step: "Let it cool before serving." }
          ]} /> */}
        </>
    )
}
