'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

// Fetching category details based on the menu item
async function fetchCategory(menuItem) {
  try {
    const response = await fetch(`/api/categories?id=${menuItem.categoryId}`);
    const category = await response.json();
    return category.name;
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return null;
  }
}

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
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    }
    fetchBestSellers();
  }, []);

  return (
    <section className="max-w-screen mx-auto px-8 md:px-10">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'WHAT WE SERVE'}
          mainHeader={'Try Our Best Sellers'} />
      </div>
      
      {/* Grid layout: 3 items per row for larger screens, 1 item per row for smaller screens */}
      <div 
        className="flex flex-col sm:flex-row justify-between gap-5 box-border">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <div key={item.id} className="flex-1">
            <MenuItem {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}
