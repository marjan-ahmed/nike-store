import Link from "next/link"
import { ChevronDown, Globe } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Footer() {
  return (
    <footer className="mx-10 px-6 py-6 text-sm">
      {/* Mobile View */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="resources" className="border-b-0">
            <AccordionTrigger className="py-4 font-medium hover:no-underline">Resources</AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="block hover:text-black">
                    Find a Store
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Nike Journal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Become a Member
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Promo Codes
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="help" className="border-b-0">
            <AccordionTrigger className="py-4 font-medium hover:no-underline">Help</AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="block hover:text-black">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Shipping and Delivery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Reviews
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="company" className="border-b-0">
            <AccordionTrigger className="py-4 font-medium hover:no-underline">Company</AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="block hover:text-black">
                    About Nike
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Purpose
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block hover:text-black">
                    Report a concern
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Country Selector */}
        <div className="border-t border-gray-200 py-4">
          <button className="flex items-center text-gray-600 hover:text-black">
            <Globe className="h-4 w-4 mr-2" />
            <span>Canada</span>
          </button>
        </div>

        {/* Copyright and Links */}
        <div className="border-t border-gray-200 pt-4 pb-8 text-gray-600 text-xs space-y-3">
          <div>© {new Date().getFullYear()} Nike, Inc. All rights reserved</div>

          <div className="flex items-center">
            <Link href="#" className="hover:text-black">
              Guides
            </Link>
            <ChevronDown className="h-3 w-3 ml-1" />
          </div>

          <div>
            <Link href="#" className="hover:text-black">
              Terms of Use
            </Link>
          </div>
          <div>
            <Link href="#" className="hover:text-black">
              Terms of Sale
            </Link>
          </div>
          <div>
            <Link href="#" className="hover:text-black">
              Company Details
            </Link>
          </div>
          <div>
            <Link href="#" className="hover:text-black">
              Privacy & Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="border-t border-gray-200 pt-12 pb-16">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    Find a Store
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Nike Journal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Become a Member
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Promo Codes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Help</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Shipping and Delivery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <Link href="#" className="hover:text-black">
                      About Nike
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      News
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Investors
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Sustainability
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Purpose
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Report a concern
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex justify-end mt-4">
                <button className="flex items-center text-gray-600 hover:text-black">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>Canada</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-6 text-gray-600 text-xs">
          <div>© {new Date().getFullYear()} Nike, Inc. All rights reserved</div>
          <div className="flex gap-5 ml-auto">
            <div className="flex items-center">
              <Link href="#" className="hover:text-black">
                Guides
              </Link>
              <ChevronDown className="h-3 w-3 ml-1" />
            </div>
            <Link href="#" className="hover:text-black">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-black">
              Terms of Sale
            </Link>
            <Link href="#" className="hover:text-black">
              Company Details
            </Link>
            <Link href="#" className="hover:text-black">
              Privacy & Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

