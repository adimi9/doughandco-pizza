/**
 * Header Component
 * 
 * This component includes navigation links for different sections of the website 
 * - Home, Menu, About, Content 
 * 
 * It dynamically updates based on the user's authentication status using NextAuth's `useSession` hook
 * - If the user is authenticated, the username is shown, and the logout button is provided. 
 * - If the user is not authenticated, Login and Register links are dsplayed. 
 * 
 * @component 
 * @returns {JSX.Element} Header component with navigation and authentication links 
 */

'use client'; 

import { CartContext } from "@/components/AppContext"; 
import ShoppingCart from "@/components/icons/ShoppingCart"; 
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"; 
import { useContext } from "react";
import { useRouter } from "next/navigation";  


/**
 * Helper Function AuthLinks 
 * 
 * Renders different links based on the user's authentication status. 
 * - If the status is 'loading': it shows a loading message
 * - If the user is authenticated:
 *   - Displays a greeting with the user's name 
 *   - Provides a logout button 
 * - If the user is unauthenticated:
 *   - Display Login and Register links 
 * 
 * @param {Object} props              - component's props 
 * @param {string} props.status       - authentication status of user: 'loading' / 'authenticated' / 'unauthenticated'
 * @param {string} props.userName     - name of authenticated user 
 * @param {Function} props.clearcart  - function to clear shopping cart 
 * @returns {JSX.Element}             - returns JSX elements with appropriate links based on user's authentication status 
 */
function AuthLinks({status, clearCart}) {
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  if (status === 'authenticated') 
    return (
      <>
      {/* Logout Button */}
        <button 
          onClick={() => {           
            // clear shopping cart
            clearCart();  
            // log user out of application
            signOut();
            // redirect user to home page 
            router.push('/');  
          }} 
          className="bg-primary rounded-full text-white px-8 py-2">
            LOGOUT
        </button>
      </>
    )
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          REGISTER 
        </Link>
      </>
    )
  }
}

export default function Header() {

  // get session details 
  const session = useSession(); 
  const status = session?.status; 
  const userData = session.data?.user; 

  let userName = userData?.name || userData?.email; 

  // get cart products and clearCart function from CartContext 
  const { cartProducts, clearCart } = useContext(CartContext); 
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]; 
  }

  // router instance for navigation 
  const router = useRouter();
  
  return (
    <header>
      <div className="hidden md:flex items-center justify-between px-8 py-4"> {/* Added padding for spacing */}
        {/* Left Navigation: Logo */}
        <nav className="flex items-center">
          <Link className="text-primary font-semibold text-5xl" href={'/'}>
            Dough & Co.
          </Link>
        </nav>

        {/* Centered Navigation Links */}
        <nav className="flex items-center justify-center gap-8 flex-grow">
          <Link href={'/'} className="text-gray-800 font-semibold">HOME</Link>
          <Link href={'/menu'} className="text-gray-800 font-semibold">MENU</Link>
          <Link href={'/#about'} className="text-gray-800 font-semibold">ABOUT</Link>
          <Link href={'/#contact'} className="text-gray-800 font-semibold">CONTACT</Link>
        </nav>

        {/* Right Navigation: Cart and Authentication links */}
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} clearCart={clearCart} />
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
  );
}