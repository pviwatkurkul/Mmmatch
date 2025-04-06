import { Sparkle, Home, Explore, Heart } from "@/components/icons"

export default function Navbar() {
    return (
        <div className="bottom-4 left-1/2 absolute transform -translate-x-1/2 flex bg-white border border-customgreen gap-4 p-2.5 rounded-[20px] justify-between items-center w-60">
        {/* <div className="w-60 p-2.5 left-0 top-0 absolute bg-black rounded-[20px] outline outline-1 outline-offset-[-1px] outline-mint_green inline-flex justify-between items-center"> */}
            <Sparkle size={24} color="#1F2E3C" />
            <Home size={24} color="#1F2E3C" />
            <Explore size={24} color="#1F2E3C" />
            <Heart size={24} color="#1F2E3C" />
        </div>
    );
}