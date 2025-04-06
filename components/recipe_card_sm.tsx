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
    onClick: () => void;
  }
  

export function RecipeCard({ imageUrl, title, tag, onClick}: RecipeCardProps) {
    return (
        <div>
            <Card className='bg-navy text-white w-[230px] gap-1 pt-0 cursor-pointer' onClick={onClick}>
                <div className="relative w-[230px] h-[120px]">
                    <Image
                        src={imageUrl}
                        alt="recipe_image"
                        fill
                        className="rounded-lg object-cover"
                    />
                </div> 
                <CardHeader>
                    <CardTitle className={`${poppins.className} font-bold text-lg`}>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className='text-white bg-customorange'>{tag}</Button>
                </CardContent>
            </Card>
        </div>
    )
}