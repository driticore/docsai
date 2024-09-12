"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RiAddCircleLine, RiHome2Line } from "@remixicon/react";
import {
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export function SideBar({ children }: { children?: React.ReactNode }) {
    const { user } = useUser();


  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <RiHome2Line className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-primary-foreground dark:bg-neutral-800 w-full justify-between max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 ",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 pt-32 items-start w-full">
          {open ? (
            <div className="hidden md:flex border-black">
              <Link href="/">
                <div className="flex gap-2 text-sm items-center">
                  <RiAddCircleLine /> New Chats
                </div>
              </Link>
            </div>
          ) : (
            <RiAddCircleLine />
          )}
          <div className="flex flex-col text-start h-full w-full">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full">
              <div className="md:mt-8 flex flex-col gap-4 md:gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <SidebarLink
              className="mt-10 w-full"
              link={{
                label: `${user?.firstName}`,
                href: "#",
                icon: (
                  <>
                    <div className="flex flex-row gap-5 items-center">
                        <SignedIn>
                        <UserButton />
                        </SignedIn>
                        
                    </div>
                  </>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-7 w-7 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
