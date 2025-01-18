import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { DrawerDemo } from './Slider'
import { bebas_font } from '@/app/fonts/fonts'
import { cn } from '@/lib/utils'
export const NAV_LINKS = [{ text: "Product", navLink: "/" }, { text: "Pricing", navLink: "/" }, { text: "Solutions", navLink: "/" }, { text: "About Us", navLink: "/" }]

function NavBar() {
  return (
    <div className=''>
      {/* hide nav links for md */}
      <nav className='h-20 flex items-center justify-between fixed top-0 z-50 w-full px-4 sm:px-5 lg:px-10  2xl:px-40 shadow-sm  bg-white'>
        {/* Nav - Left */}
        <div className='flex items-center space-x-2'>
          {/* <div className='relative w-40 md:w-52 h-16'><Image alt='nav-logo' src="/img/strix.png" fill priority={true} /></div> */}
          <Link href={"/"}><div className={cn(bebas_font.className, "p-0 m-0 text-3xl text-red-400 tracking-wider")}>STRIX INVOICE</div></Link>
          <div className='font-medium space-x-8 pl-2 hidden lg:block'>
            {NAV_LINKS.map((item) => (
              <Link href="/" key={item.text} className='py-2 px-3 hover:bg-gray-200 hover:bg-opacity-80 rounded-sm  '>{item.text}</Link>
            ))}
          </div>
        </div>
        {/* Nav Right */}
        <div className='flex space-x-4 items-center'>
          <div className='items-center space-x-4 hidden lg:flex'>
            <div className='hover:bg-gray-200 hover:bg-opacity-80 rounded-full p-1  '><Image src={"/svg/search.svg"} alt='' width={25} height={25} /></div>
            <Link href={"/auth/login"} className='py-1 px-3 hover:bg-gray-200 hover:bg-opacity-80 rounded-sm font-medium'>Log in</Link>
            <Button className='rounded-none border-red-300 md:hidden xl:block' variant={'outline'}>Contact Us</Button>
          </div>
          <Link href="/auth/register"><Button className='rounded-none'>Get Started</Button></Link>
          
          <DrawerDemo/>
        </div>
      </nav>
    </div>
  )
}













export { NavBar }

