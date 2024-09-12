import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { RiArrowDownCircleLine } from "@remixicon/react";
  import { LucideIcon, icons } from "lucide-react"; // Import LucideIcon and available icons
  import Link from "next/link";
  import React from "react";
  
  // Add `LucideIcon` type for the icon prop
  function DropTitle({
    title,
    label,
    icon: IconComponent,
  }: {
    title?: string;
    label?: string;
    icon?: LucideIcon ; // Accept LucideIcon as the icon prop
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">{title}<RiArrowDownCircleLine/></DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <Link href="#">
            <DropdownMenuLabel className="flex gap-2 items-center">
              {IconComponent && <IconComponent className="text-black mr-2" />} {/* Render the icon */}
              {label}
            </DropdownMenuLabel>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  export default DropTitle;
  