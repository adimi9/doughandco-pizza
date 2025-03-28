'use client';

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []);

  return (
    <section className="mt-8 min-h-screen px-14"> {/* Ensure scrolling */}
      {categories?.length > 0 && categories.map(c => (
        <div key={c.id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.categoryId === c.id).map(item => (
              <MenuItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
