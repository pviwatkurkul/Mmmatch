
'use client'
import {inter, poppins} from '@/components/ui/fonts'
import {Send,ScrolltoBottom,ClearChat} from '@/components/icons'
import { useState,useRef,useEffect} from 'react'
import { resolveSoa } from 'dns'
export default function ChatWindow() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai', text: string}[]>([])
    const [apiConversationHistory, setApiConversationHistory] = useState<any[]>([])
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

    // In your client code (e.g., ChatWindow.tsx)
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

            return jsonString;
        } catch (error) {
            console.error("Error extracting requirements:", error);
            return null;
        }
};
    
    return (
        <div className="@container flex flex-col h-22/23 w-xs md:w-md gap-y-6.25 mx-auto mt-14 box-border">
            <h1 className={`${poppins.className} text-white text-2xl font-bold bg-navy border-white border-solid border rounded-lg text-center h-auto p-4 box-border`}>Ask Gemini</h1>
            <main className={`@container ${inter.className} flex-grow h-full bg-navy border-white border-solid border rounded-lg p-4 box-border flex flex-col gap-y-7.5`}> 
                {/* comment out style for chat window*/}
                <div id="chat-window" 
                ref={chatWindowRef}
                className='@container h-7/10 max-h-[600px] w-full border-white border-solid border box-border flex-grow overflow-auto'>

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
        </div>
    );
}
    