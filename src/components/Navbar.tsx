"use client";

import Link from "next/link";
import { useState } from "react";
import { Navigation } from "./NavigationMenu";
import {
  RiGithubLine,
  RiInstagramLine,
  RiTwitterLine,
  RiMenu3Line,
  RiCloseLine,
} from "@remixicon/react";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-primary-foreground px-6 md:px-10 h-16 md:h-20 flex items-center justify-between z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/">
          <h1 className="font-semibold text-lg md:text-xl">DocsAI</h1>
        </Link>
        <div className="md:hidden ml-auto">
          <button onClick={toggleMenu} className="text-xl">
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </div>

      {/* Navigation for larger screens */}
      <nav className="hidden md:flex items-center space-x-4 md:space-x-8">
        <Navigation />
      </nav>

      {/* Social Icons */}
      <div className="hidden md:flex gap-4 md:gap-5">
        <Link href="https://x.com/gourneyza/" target="_blank">
          <RiTwitterLine className="text-lg md:text-xl" />
        </Link>
        <Link href="https://www.instagram.com/gourneyza/" target="_blank">
          <RiInstagramLine className="text-lg md:text-xl" />
        </Link>
        <Link href="https://github.com/gourneyza/" target="_blank">
          <RiGithubLine className="text-lg md:text-xl" />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-primary-foreground text-center p-6 flex flex-col space-y-4 md:hidden">
          <nav className="mb-10">
            <ul className="space-y-6">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/pages/features">Features</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </nav>
          <div className="flex gap-4 justify-center space-x-5">
            <Link href="https://x.com/gourneyza/" target="_blank">
              <RiTwitterLine className="text-lg" />
            </Link>
            <Link href="https://www.instagram.com/gourneyza/" target="_blank">
              <RiInstagramLine className="text-lg" />
            </Link>
            <Link href="https://github.com/gourneyza/" target="_blank">
              <RiGithubLine className="text-lg" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
