import Image from "next/image";
import React from "react";
import { SiJordan, SiNike } from "react-icons/si";
import { Separator } from "./ui/separator";
import { NIKE_ITEMS } from "../../constants";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { RiMenuFill, RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
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
        <nav>
          <ul className="flex text-[12px] font-semibold items-center space-x-3">
            <li>Find a Store</li>
            <Separator orientation="vertical" className="border-black" />
            <li>
            <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem className="transparent relative group">
      {/* Wrap text inside a div */}
      <NavigationMenuTrigger className="cursor-pointer bg-transparent text-[12px]">Help</NavigationMenuTrigger>
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
            <Separator orientation="vertical" className="border-black" />
            <li>Join Us</li>
            <Separator orientation="vertical" className="border-black" />
            <Link href={'/signin'}>
            <li>Sign In</li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* 🔹 Main Header */}
      <div className="flex justify-between bg-white items-center w-full h-14 px-6 sm:px-14">
        <Link href={"https://nike.com/"}>
          <SiNike size={58} />
        </Link>


        {/* 🔹 Full Menu (Visible on Large Screens) */}
        <div className="hidden sm:flex gap-5">
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
  <div className="relative flex items-center">
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex items-center cursor-pointer">
          {/* Search Icon */}
          <div className="absolute left-0.5 flex h-[37px] w-[40px] items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#cbcbcb]">
            <RiSearchLine size={20} />
          </div>
          {/* Search Input (Hidden on Small Screens) */}
          <input
            type="text"
            placeholder="Search"
            className="h-[38px] w-[168px] rounded-full bg-[#F5F5F5] px-[2.8em] font-semibold text-gray-600 hover:bg-[#dedede] hidden xl:block cursor-pointer"
            readOnly
          />
        </div>
      </SheetTrigger>

      {/* 🔹 Expanded Search Modal */}
      <SheetContent side="top" className="h-[20em]">
        <SheetHeader>
          <div className="flex justify-between mt-[-40px] mx-4">
            <Link href={"https://nike.com/"}>
              <SiNike size={88} />
            </Link>
            <div className="mt-7 relative mr-20">
              <div className="rounded-full left-0.5 w-[40px] flex justify-center items-center h-[38px] hover:bg-[#cbcbcb] bg-[#F5F5F5] absolute">
                <RiSearchLine size={20} />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="font-semibold text-gray-600 px-[2.8em] hidden xl:block rounded-full bg-[#F5F5F5] hover:bg-[#dedede] w-[90%] h-[38px] border border-black"
              />
            </div>
            <SheetClose asChild>
              <button className="font-semibold">Cancel</button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* 🔹 Popular Search Terms */}
        <div className="w-full sm:w-[80%] mx-auto mt-6">
          <h1 className="text-sm text-gray-500 font-semibold">
            Popular Search Terms
          </h1>
          <div className="mt-4">
            <div className="flex flex-wrap gap-4">
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
        </div>
      </SheetContent>
    </Sheet>
  </div>

  {/* ❤️ Wishlist & 🛒 Cart Icons */}
  <FaRegHeart size={20} />
  <FiUser size={20} />
  <AddToCartIndicator />

  {/* 📱 Hamburger Menu (Now Placed at the End) */}
  <div className="sm:hidden block">
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer p-">
          <RiMenuFill size={24} />
        </div>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col gap-5 p-5">
          {NIKE_ITEMS.map((item: any) => (
            <div key={item.category} className="group">
              <Link
                href={item.href}
                className="block text-[16px] font-semibold py-1 hover:border-b-[3px] border-black"
              >
                {item.category}
              </Link>
              {item.product && <MegaMenu product={item.product} />}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  </div>
</div>
</div>
    </>
  );
}

export default Header;
