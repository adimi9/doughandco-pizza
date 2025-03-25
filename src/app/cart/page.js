'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import AddressInputs from "@/components/form/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import {useProfile} from "@/components/UseProfile";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const {cartProducts,removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔');
            }
        }, []);

    useEffect(() => {
        if (profileData?.city) {
            const {phone, streetAddress, city, postalCode, country} = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += Number(cartProductPrice(p));
    }
  
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]:value}));
    }
    
    async function proceedToCheckout(ev) {
        ev.preventDefault();

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                address,
                cartProducts,
            }),
        }); 

        await toast.promise(response, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                    <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }

    return (
        <section className = "max-w-screen px-4 md:px-10 border-black">
        <section className="mt-8">
        <div className="text-center">
            <SectionHeaders mainHeader="Cart" />
        </div>
        <div className="mt-8 grid gap-8 grid-cols-2">
            <div>
            {cartProducts?.length === 0 && (
                <div>No products in your shopping cart</div>
            )}
            {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                <CartProduct
                key={index}
                product={product}
                onRemove={() => removeCartProduct(index)}
                />
            ))}
            <div className="py-2 pr-16 flex justify-end items-center">
                <div className="text-gray-500">
                Subtotal:<br />
                Delivery:<br />
                Total:
                </div>
                <div className="font-semibold pl-2 text-right">
                ${subtotal.toFixed(2)}<br />
                $5.00<br />
                ${(subtotal + 5).toFixed(2)}
                </div>
            </div>
            </div>
            <div className="border-gray-100 p-4 rounded-lg">
            <h2><b>Checkout</b></h2>
            <form onSubmit={proceedToCheckout}>
                <AddressInputs
                addressProps={address}
                setAddressProp={handleAddressChange}
                />
                <button type="submit">Pay ${(subtotal+5).toFixed(2)}</button>
            </form>
            </div>
        </div>
        </section>
        </section>
    );
}