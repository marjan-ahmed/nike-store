"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RiMenuFill } from "react-icons/ri";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { SiJordan } from "react-icons/si";
import { BsQuestionCircle, BsBox2 } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";
import Image from "next/image";

type MenuKey = "New & Featured" | "Men" | "Women" | "Kids";
type SubMenuKey = "Featured" | "Shop Icons" | "Jordan" | "Discover Sport" | "Shoes" | "Clothing" | "Accessories" | "Shop All";

const MENU_ITEMS: Record<MenuKey, (string | { [key in SubMenuKey]?: string[] })[]> = {
  "New & Featured": [
    { "Featured": ["New Arrivals", "Bestsellers", "Trending Now", "Nike Member Rewards"] },
    { "Shop Icons": ["Air Force 1", "Air Jordan 1", "Dunks & Blazers", "Running Shoes"] },
    { "Jordan": ["Latest Jordan", "Retro Jordans", "Jordan Clothing", "Jordan Accessories"] },
    { "Discover Sport": ["Basketball", "Running", "Football", "Training & Gym"] },
  ],
  Men: [
    { "Shoes": ["Running Shoes", "Basketball Shoes", "Sneakers"] },
    { "Clothing": ["T-Shirts", "Hoodies", "Jackets"] },
    { "Accessories": ["Bags", "Caps", "Socks"] },
    "Shop All",
  ],
  Women: [
    { "Shoes": ["Running Shoes", "Lifestyle Shoes", "Sneakers"] },
    { "Clothing": ["Leggings", "Sports Bras", "Jackets"] },
    { "Accessories": ["Bags", "Caps", "Gloves"] },
    "Shop All",
  ],
  Kids: [
    { "Shoes": ["Boys' Shoes", "Girls' Shoes", "Toddler Shoes"] },
    { "Clothing": ["T-Shirts", "Shorts", "Jackets"] },
    { "Accessories": ["Backpacks", "Hats", "Socks"] },
    "Shop All",
  ],
};

export default function MobileMenu() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuKey | null>(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <RiMenuFill size={24} />
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="overflow-y-auto max-h-screen flex flex-col">
        {activeSubMenu ? (
          <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => setActiveSubMenu(null)}>
            <ChevronLeft size={20} />
            <span className="font-semibold">Back</span>
          </div>
        ) : activeMenu ? (
          <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => setActiveMenu(null)}>
            <ChevronLeft size={20} />
            <span className="font-semibold">Back</span>
          </div>
        ) : null}

        <ul className={`flex flex-col py-5 gap-4 transition-all ${activeMenu ? "hidden" : "block"}`}>
          {Object.keys(MENU_ITEMS).map((category) => (
            <div key={category} className="flex justify-between items-center cursor-pointer" onClick={() => setActiveMenu(category as MenuKey)}>
              <li>{category}</li>
              <ChevronRight size={20} />
            </div>
          ))}
        </ul>

        {activeMenu && !activeSubMenu && (
          <div>
            <h2 className="font-bold text-lg">{activeMenu}</h2>
            <ul className="mt-4 space-y-3">
              {MENU_ITEMS[activeMenu].map((subItem, index) =>
                typeof subItem === "string" ? (
                  <li key={index} className="cursor-pointer">{subItem}</li>
                ) : (
                  Object.entries(subItem).map(([key]) => (
                    <div key={key} className="flex justify-between items-center cursor-pointer" onClick={() => setActiveSubMenu(key as SubMenuKey)}>
                      <li>{key}</li>
                      <ChevronRight size={20} />
                    </div>
                  ))
                )
              )}
            </ul>
          </div>
        )}

        {activeSubMenu && activeMenu && (
          <div>
            <h2 className="font-bold text-lg">{activeSubMenu}</h2>
            <ul className="mt-4 space-y-3">
            {MENU_ITEMS[activeMenu]
    .find(
      (subItem): subItem is Record<SubMenuKey, string[]> =>
        typeof subItem === "object" && subItem !== null && activeSubMenu in subItem
    )
    ?.[activeSubMenu]?.map((item, index) => (
      <li key={index} className="cursor-pointer">{item}</li>
    ))}
            </ul>
          </div>
        )}

        {!activeMenu && !activeSubMenu && (
          <div className="mt-auto">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <SiJordan size={18} />
                <span>Jordan</span>
              </div>
              <div className="flex gap-2 items-center mr-4">
                <Image
                  src={"/Converse-logo.png"}
                  alt="Converse Logo"
                  width={30}
                  height={15}
                  style={{ objectFit: "cover" }}
                />
                <span>Converse</span>
              </div>
            </div>

            <div className="mt-12">
              <h1 className="text-[20px] text-[#707072]">
                Become a Nike Member for the best products, inspiration, and stories in sport.{" "}
                <button className="text-black font-semibold">Learn More</button>
              </h1>
              <div className="flex gap-2 mt-4">
                <Button className="rounded-full">Join Us</Button>
                <Button className="rounded-full" variant={"outline"}>
                  Sign In
                </Button>
              </div>
            </div>

            <div className="font-normal mt-10 flex flex-col gap-3">
              <li className="flex gap-2 items-center">
                <BsQuestionCircle />
                Help
              </li>
              <li className="flex gap-1.5 items-center">
                <IoBagOutline />
                Bag
              </li>
              <li className="flex gap-1.5 items-center">
                <BsBox2 />
                Orders
              </li>
              <li className="flex gap-1.5 items-center">
                <MdOutlineStorefront />
                Find a Store
              </li>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
