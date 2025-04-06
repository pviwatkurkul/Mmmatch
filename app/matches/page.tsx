'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

export default function Match() {
  const [isFavorite, setIsFavorite] = useState(false); 
  const userId = "1f3ee3f3-3aa8-4f9e-91a4-50a82443b05a";
  const spoonId = 715415; 

  
  const handleFavoriteClick = async () => {
    try {
      const response = await fetch(`/api/favorite?userId=${userId}&spoonId=${spoonId}`, {
        method: 'POST',
      });

      console.log(userId)

      const data = await response.json();

      if (response.ok) {
        setIsFavorite(true); // Mark as favorite if the POST was successful
        alert(data.message); // Show a success message
      } else {
        alert(data.error); // Show error if any
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while adding to favorites.");
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col py-16 px-5 gap-5">
        <div className="p-4 flex self-stretch rounded-lg bg-navy border border-mintgreen text-white text-xl font-bold justify-center z-2">
          Recommended Recipes
        </div>
        <div className="flex w-full justify-between">
          <Button className="bg-white text-customred rounded-full w-16 h-16" variant="outline" size="icon">
            <X size={36} />
          </Button>
          <Button
            className={`bg-white rounded-full w-16 h-16 ${isFavorite ? 'text-customgreen' : 'text-gray-400'}`}
            variant="outline"
            size="icon"
            onClick={handleFavoriteClick}
            disabled={isFavorite} // Disable the button if already favorited
          >
            <Heart size={36} />
          </Button>
        </div>
      </div>
    </>
  );
}
