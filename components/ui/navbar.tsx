import { Sparkle, Home, Explore, Heart } from "@/components/icons"

export default function Navbar() {
    return (
        <div className="flex bg-black">
        {/* <div className="w-60 p-2.5 left-0 top-0 absolute bg-black rounded-[20px] outline outline-1 outline-offset-[-1px] outline-mint_green inline-flex justify-between items-center"> */}
            <Sparkle size={16} color="#1F2E3C" />
            <Home size={16} color="#1F2E3C" />
            <Explore size={16} color="#1F2E3C" />
            <Heart size={16} color="#1F2E3C" />
        </div>
    );
}