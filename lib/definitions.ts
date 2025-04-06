//model schemas
//export type
export type User = {
    user_id: number;
    created_at: string; // ISO string, use Date if you're parsing it
    email: string;
    password: string;
    favorite_recipes: number[];
};

export type Recipe = {
    recipe_id: number;
    created_at: string;
    recipe_name: string;
    ingredients: {name: string, amount: string};
    serving_size: string;
    instructions: string;
    tags: string[];
}

