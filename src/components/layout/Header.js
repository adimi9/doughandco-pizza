'use client'; 

import { CartContext } from "@/components/AppContext"; 
import ShoppingCart from "@/components/icons/ShoppingCart"; 
import ProfileIcon from "../icons/ProfileIcon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"; 
import { useContext } from "react";
import { useRouter } from "next/navigation";  

import { Luckiest_Guy } from "next/font/google"; // Import the Rubik Burned font
const luckiestguy = Luckiest_Guy({ subsets: ['latin'], weight: '400' }); // Define the Rubik Burned font

function AuthLinks({ status, clearCart }) {
  if (status === 'loading') return <span>Loading...</span>;

  if (status === 'authenticated') 
    return (
      <button 
        onClick={() => {           
          clearCart();  
          signOut();
          router.push('/');  
        }} 

        // Logout Button 
        className="
          bg-primary rounded-full px-4 sm:px-6 py-2 sm:py-4 
          text-white font-semibold text-base md:text-lg lg:text-xl">
          LOGOUT
      </button>
    );

  return (
    <>
      {/* Login Button */} 
      <Link 
        href={'/login'} 
        className="
          bg-primary rounded-full px-4 md:px-10 lg:px-12 py-1 sm:py-2 lg:py-4 
          text-white font-semibold text-base md:text-lg lg:text-2xl">
        LOGIN 
      </Link>
    </>
  );
}

export default function Header() {
  const session = useSession(); 
  const status = session?.status; 
  const { cartProducts, clearCart } = useContext(CartContext); 
  const router = useRouter();

  return (
    <section className="hero md:mt-4">
      <div className="
            max-w-screen mx-auto 
            flex justify-between 
            px-8 md:px-16 py-4">
              
        {/* Logo */}
        <Link 
          href={'/'}
          className=
            {`${luckiestguy.className} 
            text-primary 
            text-[2rem] md:text-[3rem] lg:text-[5rem]`}>
          Dough & Co.
        </Link>

        {/* Central Navigation Links (hidden on small screens) */}
        <nav 
          className="
            hidden xl:flex
            flex flex-wrap items-center gap-8
            text-gray-800 font-semibold text-2xl">
          <Link href={'/'}>HOME</Link>
          <Link href={'/menu'}>MENU</Link>
          <Link href={'/#contact'}>CONTACT</Link>
        </nav>

        {/* Cart & Auth Links */}
        <nav 
          className="flex items-center gap-3 sm:gap-4">
          <AuthLinks status={status} clearCart={clearCart} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </Link>

          {/* Profile Icon */}
          {status === 'authenticated' && (
            <Link href={'/profile'} className="relative">
              <ProfileIcon className="w-7 h-7 text-gray-800" />
            </Link>
          )}
        </nav>

      </div>
    </section>
  );
}
