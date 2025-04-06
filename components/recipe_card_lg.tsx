import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { poppins, inter } from '@/components/ui/fonts';
import { Button } from "./ui/button";
import Image from 'next/image'

interface RecipeCardProps {
    imageUrl: string;
    title: string;
    tag: string;
    time: number;
    servings: number;
    ingredients: string[];
    instructions: { step: string }[];
    description: string;
  }
  

export function RecipeCard_LG({ imageUrl, title, tag, time, description, servings, instructions, ingredients }: RecipeCardProps) {
    return (
        <div>
            <Card className='bg-navy text-white w-[360px] h-[400px] gap-1 pt-0 overflow-y-auto overflow-hidden z-5 flex content-center'>
                <div className="relative w-[360px] h-[150px]">
                <Image
                    src={imageUrl}
                    alt="recipe_image"
                    fill
                    className="rounded-lg object-cover"
                />
                </div>                
                <CardHeader>
                    <CardTitle className={`${poppins.className} font-bold text-2xl text-customgreen`}>{title}</CardTitle>
                    <CardDescription className={`${poppins.className} text-lg font-bold text-white`}>{time} Minutes</CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto px-4 pb-4" style={{ maxHeight: 'calc(400 - 120px - 80px)' }}>
                    <Button className="text-white bg-customorange mb-2">{tag}</Button>
                    <p className="mb-2">
                    <span className="font-bold">Recipe Description: </span>{description}
                    </p>

                    <div className="mb-2">
                    <span className="font-bold">Ingredients:</span>
                    <ul className="list-disc ml-6 text-sm">
                        {ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                        ))}
                    </ul>
                    </div>

                    <div>
                    <span className="font-bold">Instructions:</span>
                    <ul className="list-decimal ml-6 text-sm">
                        {instructions.map((inst, idx) => (
                        <li key={idx}>{inst.step}</li>
                        ))}
                    </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}