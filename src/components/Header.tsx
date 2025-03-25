import Image from "next/image";
import React from "react";
import { SiJordan, SiNike } from "react-icons/si";
import { Separator } from "./ui/separator";
import { NIKE_ITEMS } from "../../menu_items";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { FaRegHeart, FaSearch, FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "./ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import AddToCartIndicator from "./AddToCartIndicator";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import { FiUser } from "react-icons/fi";
import UserAccountMenu from "./UserAccountMenu";

function Header() {
  return (
    <>
      {/* 🔹 Top Bar (Hidden on Mobile) */}
      <div className="bg-[#F5F5F5] hidden w-full h-9 px-4 lg:flex justify-between items-center sm:px-14">
        <div className="flex gap-6 items-center">
          <SiJordan size={18} />
          <div className="w-[28px] h-[18px]">
            <Image
              src={"/Converse-logo.png"}
              alt="Converse Logo"
              width={30}
              height={15}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <nav className="text-[12px] font-semibold">
          <ul className="flex items-center gap-x-3">
            <li className="cursor-pointer">Find a Store</li>
            <Separator orientation="vertical" className="h-4 bg-black" />
            {/* Help Dropdown */}
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="relative group">
                    <NavigationMenuTrigger className="cursor-pointer bg-transparent text-[12px]">
                      Help
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="shadow-none">
                      <div className="flex w-52 flex-col rounded-xl p-4 text-[11px] opacity-70 justify-start gap-1">
                        <h1 className="text-lg font-semibold mb-2">Help</h1>
                        <NavigationMenuItem>Order Status</NavigationMenuItem>
                        <NavigationMenuItem>Dispatch and Delivery</NavigationMenuItem>
                        <NavigationMenuItem>Returns</NavigationMenuItem>
                        <NavigationMenuItem>Contact Us</NavigationMenuItem>
                        <NavigationMenuItem>Privacy Policy</NavigationMenuItem>
                        <NavigationMenuItem>Terms Of Sale</NavigationMenuItem>
                        <NavigationMenuItem>Terms Of Use</NavigationMenuItem>
                        <NavigationMenuItem>Send Us Feedback</NavigationMenuItem>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <AuthButtons />
          </ul>
        </nav>
      </div>

      {/* 🔹 Main Header */}
      <div className="flex justify-between bg-white items-center w-full h-14 px-6 sm:px-14">
        {/* 🔹 Logo */}
        <Link href={"https://nike.com/"}>
          <SiNike size={58} className="text-black" />
        </Link>

        {/* 🔹 Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex gap-5">
          {NIKE_ITEMS.map((item: any) => (
            <div key={item.category} className="group">
              <Link href={item.href} className="text-[16px] font-semibold py-1 hover:border-b-[3px] border-black">
                {item.category}
              </Link>
              {item.product && <MegaMenu product={item.product} />}
            </div>
          ))}
        </div>

        {/* 🔹 Search & Icons (Responsive) */}
        <div className="flex items-center gap-4">
          {/* Mobile: Icons in a row */}
          <div className="flex md:hidden items-center gap-3">
            <SearchBar />
            <UserAccountMenu />
            <AddToCartIndicator />
            <MobileMenu />
          </div>

          {/* Desktop: Search Bar & Icons */}
          <div className="relative items-center hidden md:flex w-full gap-4 max-w-md md:max-w-lg lg:max-w-xl">
            <SearchBar />
            <FaRegHeart className="hidden md:block" size={20} />
            <AddToCartIndicator />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
