import Navbar from '@/components/ui/navbar';
import './globals.css'


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
  <html>
    <body className="bg-customblack h-full flex flex-col pb-20 ">
      <div className="relative h-dvh w-dvw">
        <div className="absolute w-[300px] h-[300px] bg-radial-[at_0%_0%] from-customgreen from-0% to-transparent to-30% z-0"></div>

        {children}
        <Navbar />
      </div>
    </body>
  </html>
)
  }