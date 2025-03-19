'use client'; 

import { CartContext } from "@/components/AppContext"; 
import ShoppingCart from "@/components/icons/ShoppingCart"; 
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"; 
import { useContext } from "react";
import { useRouter } from "next/navigation";  // Import useRouter for redirection

function AuthLinks({status, userName, clearCart}) {
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  if (status === 'authenticated') 
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, { userName }
        </Link>
        <button 
          onClick={() => {           
            // Clear cart in the state as well
            clearCart();  

            // Sign out the user
            signOut();

            // Redirect to the home page after logging out
            router.push('/');  // Use router.push to navigate
          }} 
          className="bg-primary rounded-full text-white px-8 py-2">
            Logout
        </button>
      </>
    )
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register 
        </Link>
      </>
    )
  }
}

export default function Header() {
  const session = useSession(); 
  const status = session?.status; 
  const userData = session.data?.user; 
  let userName = userData?.name || userData?.email; 
  const { cartProducts, clearCart } = useContext(CartContext); 
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]; 
  }
  const router = useRouter();
  
  return (
    <header>
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            Dough & Co.
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} clearCart={clearCart}/>
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>           
  ) 
}