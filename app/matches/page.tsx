import { poppins, inter } from '@/components/ui/fonts';
import { RecipeCard_LG } from '@/components/recipe_card_lg';
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"


export default async function Match() {
    return (
        <>
            <div className="flex h-screen flex-col py-16 px-5 gap-5">
                <div className={`${poppins.className} p-4 flex self-stretch rounded-lg bg-navy border border-mintgreen text-white text-xl font-bold justify-center z-2`}>Recommended Recipes</div>
                <RecipeCard_LG imageUrl='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        title='Lasanga' tag='Italian' time={10} servings={2} description='what' ingredients={["apple", "banana", "orange"]} instructions={[
            { step: "Preheat the oven to 350°F (175°C)." },
            { step: "Mix the flour, sugar, and eggs in a bowl." },
            { step: "Pour the mixture into a baking pan." },
            { step: "Bake for 25 minutes or until golden brown." },
            { step: "Let it cool before serving." }
          ]} />
            <div className="flex w-full justify-between">
                <Button className="bg-white text-customred rounded-full w-16 h-16" variant="outline" size="icon">
                    <X size={36}/>
                </Button>
                <Button className="bg-white text-customgreen rounded-full w-16 h-16 z-10" variant="outline" size="icon">
                    <Heart size={36}/>
                </Button>
            </div>
            </div>
        </>
    )
}