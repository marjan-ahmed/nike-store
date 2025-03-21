'use client'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ruler } from "lucide-react";
import { useState } from "react";

export default function SizeGuidePopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="flex items-center text-sm font-medium group">
          <Ruler className="w-4 h-4 mr-1" />
          Size Guide
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-4 text-sm bg-white shadow-lg border border-gray-200 rounded-lg"
        align="start"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <h3 className="font-semibold text-base mb-2">Find Your Perfect Fit</h3>
        <p className="text-gray-600 mb-4">Check the size chart below:</p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">Size</th>
                <th className="border px-3 py-2 text-left">Chest (in)</th>
                <th className="border px-3 py-2 text-left">Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">S</td>
                <td className="border px-3 py-2">34-36"</td>
                <td className="border px-3 py-2">28-30"</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-3 py-2">M</td>
                <td className="border px-3 py-2">38-40"</td>
                <td className="border px-3 py-2">32-34"</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">L</td>
                <td className="border px-3 py-2">42-44"</td>
                <td className="border px-3 py-2">36-38"</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-3 py-2">XL</td>
                <td className="border px-3 py-2">46-48"</td>
                <td className="border px-3 py-2">40-42"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PopoverContent>
    </Popover>
  );
}
