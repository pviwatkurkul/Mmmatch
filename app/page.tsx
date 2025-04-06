import './globals.css'
import { poppins, inter } from '@/components/ui/fonts';
import { Button } from "@/components/ui/button"


export default async function Home() {
  return (
    <>
      <div className="flex h-screen flex-col py-16 px-5 gap-10">
        <div className="gap-[10px]">
          <div className={`${poppins.className} flex justify-center text-white text-xl font-bold`}>Welcome to</div>
          <div className={`${poppins.className} flex justify-center text-white text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-white`}>Mmmatch</div>
        </div>
        <div className={`${poppins.className} flex justify-center text-customgreen text-xl font-bold`}>Combating Food Waste with AI</div>
        <div className={`${inter.className} flex flex-col justify-center text-white text-sm `}>
          <span className="font-bold">
            Transform Your <span className="text-customorange">Leftovers</span> Into Delicious New Meals
          </span>
          <br></br>
          <span>
            Discover <span className="text-customorange">personalized</span> recipes through our AI-powered chat assistant. Whether you're working with leftovers or specific cravings, get curated <span className="text-customorange">suggestions</span> tailored to your tastes and dietary preferences—making every meal uniquely yours.
          </span>
        </div>
        <div className="gap-[10px] flex flex-col">
          <Button className={`${poppins.className} border-customgreen text-white text-lg`} variant="outline">Sign Up</Button>
          <Button className={`${poppins.className} border-customgreen text-white text-lg`} variant="outline">Sign In</Button>
          <Button className={`${poppins.className} bg-customgreen text-white text-lg`}>Start Matching</Button>
        </div>
      </div>
    </>
  );
}
