
'use client'
import {inter, poppins} from '@/components/ui/fonts'
import {Send,ScrolltoBottom,ClearChat} from '@/components/icons'
import { useState,useRef,useEffect} from 'react'
import { CarouselSize } from '@/components/recipe_carousel';

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
  
export default function ChatWindow() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai', text: string}[]>([])
    const [apiConversationHistory, setApiConversationHistory] = useState<any[]>([])
    const [extractedRequirements, setExtractedRequirements] = useState<any>(null)
    const chatWindowRef = useRef<HTMLDivElement>(null)

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target
        textarea.style.height = 'auto' 
        textarea.style.height = `${textarea.scrollHeight}px`
        setMessage(textarea.value)
    }

    const handleSend = () => {
        generateText();
    }

    const clearChat = () => {
        setChatHistory([]);
        setApiConversationHistory([]);
    }

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }
    
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const generateText = async () => {
        if (!message.trim()) return;
        
        const userMessage = message;
        setChatHistory(prev => [...prev, {type: 'user', text: userMessage}]);
        setMessage(''); 
        
        try {
            const response = await fetch('/api/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: userMessage,
                    history: apiConversationHistory                        
                })
            });
            
            const data = await response.json();
            
            if(response.ok){
                setChatHistory(prev => [...prev, {type: 'ai', text: data.response}]);
                setApiConversationHistory(data.history);
                console.log(chatHistory)

                if (data.response.includes("Sit tight, while I compile some delicious recipes for you")) {
                    console.log("Detected completion phrase, extracting requirements...");
                    // Call extract requirements right away
                    const requirements = await extractRequirements();
                    // Do something with the requirements
                    if (requirements) {
                        console.log("Successfully extracted requirements:", requirements);
                        // You could show these requirements or navigate to a recipe page
                    }
                }
            } else {
                setChatHistory(prev => [...prev, {type: 'ai', text: data.error || 'Something went wrong'}]);
            }
        } catch (error) {
            setChatHistory(prev => [...prev, {type: 'ai', text: 'Failed to connect to the server'}]);
        }
    }

    const extractRequirements = async () => {
        try {
            const response = await fetch('/api/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: apiConversationHistory })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to extract data');
            }
            const requirements = await response.json();
            // The response is now directly the JSON object with the 5 keys
            let jsonString = requirements.response || '';

            jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?$/g, '');

            let parsedRequirements = JSON.parse(jsonString);
            setExtractedRequirements(parsedRequirements);
            return jsonString;
        } catch (error) {
            console.error("Error extracting requirements:", error);
            return null;
        }
};
    
    return (
        <div className="@container flex flex-col h-22/23 w-xs md:w-md gap-y-6.25 mx-auto mt-14 mb-5 box-border">
            <h1 className={`${poppins.className} text-white text-2xl font-bold bg-navy border-white border-solid border rounded-lg text-center h-auto p-4 box-border`}>Ask Gemini</h1>
            <main className={`@container ${inter.className} flex-grow h-full bg-navy border-white border-solid border rounded-lg p-4 box-border flex flex-col gap-y-7.5`}> 
                {/* comment out style for chat window*/}
                <div id="chat-window" 
                ref={chatWindowRef}
                className='@container h-7/10 max-h-[600px] w-full box-border flex-grow overflow-auto'>

                {chatHistory.length === 0 ? 
                (
                        <p className="text-white text-center text-md">Begin a conversation with your personal recipe maker.</p>
                ) : (
                        chatHistory.map((chat, index) => (
                            <div 
                                key={index} 
                                className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}
                            >
                                <div 
                                    className={`inline-block max-w-3/4 px-4 py-2 rounded-lg ${
                                        chat.type === 'user' 
                                            ? 'bg-blue-500 text-white rounded-tr-none' 
                                            : 'bg-green-200 text-black rounded-tl-none'
                                    }`}
                                >
                                    <p className="break-words">{chat.text}</p>
                                </div>
                            </div>
                        ))
                    )}


                </div>
                <div className="@container flex flex-col h-fit focus:ring-2 focus:ring-blue-500 box-border">
                    <textarea value={message} onChange={handleInput} placeholder="Message" className="bg-white px-2.5 py-1.25 w-full rounded-tl-lg rounded-tr-lg resize-none overflow-hidden focus:outline-none"
                    rows={1}>
                    </textarea>
                    <div className="relative w-full rounded-bl-lg rounded-br-lg bg-white h-5 flex flex-row px-2.5 py-1.25 h-fit gap-x-2 box-border">
                        <button title="Clear Chat Window" onClick={clearChat}className="cursor-pointer">
                            <ClearChat/>
                        </button>
                        <button title="Scroll to Bottom of Chat" onClick={scrollToBottom}className="cursor-pointer">
                            <ScrolltoBottom/>
                        </button>
                        <button title="Send Message" onClick={handleSend} className="ml-auto cursor-pointer">
                            <Send size={24}/>
                        </button>
                    </div>
                </div>

            </main>
            {extractedRequirements && (
                    <div className="flex flex-col items-center justify-center mt-4 pb-4">
                        <h2 className="text-white text-lg font-semibold mb-2">
                            Recommended Recipes
                        </h2>
                        <CarouselSize recipes={recipes} />
                    </div>
                )}
        </div>
    );
}
    