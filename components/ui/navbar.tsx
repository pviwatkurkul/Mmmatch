import { Sparkle, Home, Explore, Heart } from "@/components/icons"
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className="bottom-0 left-1/2 fixed transform -translate-x-1/2 flex bg-white border border-customgreen gap-4 p-2.5 rounded-[20px] justify-between items-center w-60">
            <Link href="/"><Home size={24} color="#1F2E3C" /></Link>
            <Link href="/chat"><Sparkle size={24} color="#1F2E3C" /></Link>
            <Link href="/explore"><Explore size={24} color="#1F2E3C" /></Link>
            <Link href="/liked"><Heart size={24} color="#1F2E3C" /></Link>
        </div>
    );
}