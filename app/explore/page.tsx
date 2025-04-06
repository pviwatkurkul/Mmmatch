import { poppins, inter } from '@/components/ui/fonts';
import { RecipeCard } from '@/components/recipe_card_sm';
import { RecipeCard_LG } from '@/components/recipe_card_lg';

export default async function Explore() {
    return (
        <>
        {/* <RecipeCard imageUrl='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
        title='Lasanga' tag='Italian'/> */}
        <RecipeCard_LG imageUrl='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        title='Lasanga' tag='Italian' time={10} servings={2} description='what' ingredients={["apple", "banana", "orange"]} instructions={[
            { step: "Preheat the oven to 350°F (175°C)." },
            { step: "Mix the flour, sugar, and eggs in a bowl." },
            { step: "Pour the mixture into a baking pan." },
            { step: "Bake for 25 minutes or until golden brown." },
            { step: "Let it cool before serving." }
          ]} />
        </>
    )
}
