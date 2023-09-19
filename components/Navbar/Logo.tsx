'use client';

import Image from "next/image";

import Link from "next/link";

const Logo = () => {

  return ( 
    <Link aria-label="site logo" href="/" className="hidden lg:flex">
    <Image
      className="cursor-pointer" 
      src="/logo.svg" 
      height={85} 
      width={85} 
      alt="Logo" 
    />
    </Link>
   );
}
 
export default Logo;