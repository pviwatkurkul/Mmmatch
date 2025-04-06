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
  }
  

export function RecipeCard({ imageUrl, title, tag }: RecipeCardProps) {
    return (
        <div>
            <Card className='bg-navy text-white w-[170px] gap-1 pt-0'>
                <Image src={imageUrl} width={170} height={125} className="rounded-lg object-cover" alt='recipe_image'/>
                <CardHeader>
                    <CardTitle className={`${poppins.className} font-bold text-xl`}>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className='text-white bg-customorange'>{tag}</Button>
                </CardContent>
            </Card>
        </div>
    )
}