import React from 'react'
import { RiSearchLine } from "react-icons/ri";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { SiNike } from 'react-icons/si';
import SearchTerm from './SearchTerm';

function SearchBar() {
  return (
    <div>
         <Sheet>
        <SheetTrigger asChild>
          <div className="relative flex items-center w-full cursor-pointer">
            {/* 🔹 Search Icon */}
            <div className="absolute md:left-0 right-0 flex h-[37px] w-[40px] items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
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
            <div className="flex h-1/2 flex-col sm:flex-row px-10 items-center justify-between">
              {/* Nike Logo */}
                <SiNike size={48} className="text-black" />

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
  )
}

export default SearchBar;