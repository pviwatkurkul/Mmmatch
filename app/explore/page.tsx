import { poppins, inter } from '@/components/ui/fonts';
import { RecipeCard } from '@/components/recipe_card_sm';
import { RecipeCard_LG } from '@/components/recipe_card_lg';
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { CarouselSize } from '@/components/recipe_carousel';


export default async function Explore() {
    return (
        <>
            <div className="flex h-screen flex-col py-16 px-5 gap-5">
                <div className={`${poppins.className} p-4 flex self-stretch rounded-lg bg-navy border border-mintgreen text-white text-xl font-bold justify-center z-2`}>Explore Recipes</div>
                <div className="flex self-stretch rounded-lg border border-mintgreen flex-col content-start p-4 gap-6">
                    <div className = "flex flex-col gap-2 content-start">
                        <div className={`${poppins.className} text-customgreen text-xl font-bold`}>Find your Recipes</div>
                        <p className={`${inter.className} text-white text-sm`}>Use our curated <span className="text-customorange">chatbot</span> to find recipes according to your preferences.</p>
                    </div>
                    <Button className={`${inter.className} text-white text-sm font-bold bg-customgreen gap-2`}>
                        <Sparkles/> Start Chatting
                    </Button>
                </div>

                <div className={`${poppins.className} text-lg flex flex-col content-center self-stretch text-customgreen font-bold`}>
                    Popular
                </div>
            </div>

        {/* <CarouselSize recipes={recipes} />; */}
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
