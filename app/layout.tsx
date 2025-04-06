import Navbar from '@/components/ui/navbar';
import './globals.css'


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
  <html>
    <body className="bg-customblack h-screen overflow-hidden flex flex-col">
      <div className="absolute w-[300px] h-[300px] bg-radial-[at_0%_0%] from-customgreen from-0% to-transparent to-30% z-0"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-radial-[at_100%_100%] from-customgreen from-0% to-transparent to-30% z-0"></div>
      {children}
      <Navbar/>
    </body>
  </html>
)
  }