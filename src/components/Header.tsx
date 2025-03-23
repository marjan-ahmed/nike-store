import Image from "next/image";
import React from "react";
import { SiJordan, SiNike } from "react-icons/si";
import { Separator } from "./ui/separator";
import { NIKE_ITEMS } from "../../menu_items";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchTerm from "./SearchTerm";
import { FiUser } from "react-icons/fi";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "./ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import AddToCartIndicator from "./AddToCartIndicator";
import MobileMenu from "./MobileMenu";


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

        <Separator orientation="vertical" className="h-4 bg-black" />
        <li className="cursor-pointer">Join Us</li>
        <Separator orientation="vertical" className="h-4 bg-black" />
        
        {/* Sign In Link */}
        <li>
          <Link href="/signin" className="cursor-pointer">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
      </div>

      {/* 🔹 Main Header */}
      <div className="flex justify-between bg-white items-center w-full h-14 px-6 sm:px-14">
        <Link href={"https://nike.com/"}>
          <SiNike size={58} />
        </Link>


        {/* 🔹 Full Menu (Visible on Large Screens) */}
        <div className="hidden md:flex gap-5">
          {NIKE_ITEMS.map((item: any) => (
            <div key={item.category} className="group">
              <Link
                href={item.href}
                className="text-[16px] font-semibold py-1 hover:border-b-[3px] border-black"
              >
                {item.category}
              </Link>
              {item.product && <MegaMenu product={item.product} />}
            </div>
          ))}
        </div>

        {/* 🔹 Search & Icons */}
        <div className="flex gap-3.5 items-center">
  {/* 🔍 Search Box */}
  <div className="relative flex items-center w-full max-w-md md:max-w-lg lg:max-w-xl">
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative flex items-center w-full cursor-pointer">
            {/* 🔹 Search Icon */}
            <div className="absolute left-2 flex h-[37px] w-[40px] items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
              <RiSearchLine size={20} />
            </div>

            {/* 🔹 Search Input (Visible on md+ screens) */}
            <input
              type="text"
              placeholder="Search"
              className="h-[38px] w-full pl-12 pr-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:bg-white focus:outline-none hidden sm:block cursor-pointer"
              readOnly
            />
          </div>
        </SheetTrigger>

        {/* 🔹 Expanded Search Modal */}
        <SheetContent side="top" className="md:h-[300px] h-auto p-3">
          <SheetHeader>
            <div className="flex h-1/2 flex-col sm:flex-row px-4 items-center justify-between">
              {/* Nike Logo */}
              <Link href="https://nike.com/">
                <SiNike size={48} className="text-black" />
              </Link>

              {/* Search Input (Always visible in modal) */}
              <div className="relative w-full max-w-sm sm:max-w-4xl mt-4 sm:mt-0">
                <div className="absolute top-2.5 left-3 flex items-center">
                  <RiSearchLine size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Close Button */}
              <SheetClose asChild>
                <button className="text-gray-700 hover:text-black font-semibold mt-4 sm:mt-0">
                  Cancel
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          {/* 🔹 Popular Search Terms */}
          <div className="mt-6 flex flex-col items-center">
  <h1 className="text-sm text-gray-500 font-semibold mt-4 mb-3">
    Popular Search Terms
  </h1>
  <div className="flex flex-wrap justify-center gap-3">
    <SearchTerm term="air force 1" />
    <SearchTerm term="jordan" />
    <SearchTerm term="air max" />
    <SearchTerm term="soccer cleats" />
    <SearchTerm term="jordan 4" />
    <SearchTerm term="dunks" />
    <SearchTerm term="basketball shoes" />
    <SearchTerm term="kobe" />
  </div>
</div>
        </SheetContent>
      </Sheet>
    </div>

  <FaRegHeart className="hidden md:block" size={20} />
  <FiUser />
  <AddToCartIndicator />
  {/* 📱 Hamburger Menu (Now Placed at the End) */}
  <div className="md:hidden block">
  <MobileMenu />
  </div>
</div>
</div>
    </>
  );
}

export default Header;
