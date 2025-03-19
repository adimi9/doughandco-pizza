'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import Image from "next/image";
import {useEffect, useState} from "react";

async function fetchCategory(menuItem) {
    try {
      // fetching category details 
      const response = await fetch(`/api/categories?id=${menuItem.categoryId}`);
      const category = await response.json(); 
      return category.name; 
  
    } catch(error) {
      console.error('Error fetching category:', error.message); 
      return null; 
    }
  }; 

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {

    async function fetchBestSellers() {
        try {
            const res = await fetch("/api/menu-items"); 
            const menuItems = await res.json(); 

            const favouriteItems = []; 

            for (const item of menuItems) {
                const categoryName = await fetchCategory(item); 
                if (categoryName === 'All Time Favourite') {
                    favouriteItems.push(item); 
                }
                if (favouriteItems.length === 3) break; 
            }

            setBestSellers(favouriteItems); 
        } catch(error) {
            console.error('Error fetching menu items:', error.message); 
        }
    }
    fetchBestSellers(); 
    }, []);

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'WHAT WE SERVE'}
          mainHeader={'Try Our Best Sellers'} />
        </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}