import DropTitle from "@/components/DropDown";
import { SideBar } from "@/components/SideBar";
import { BackgroundGradientAnimation } from "@/components/ui/animated-background";
import { Layers3 } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <SideBar>
        <div className="h-full w-full overflow-x-hidden no-scrollbar">
          <header className="px-20 w-full z-50 fixed p-6 bg-primary-foreground md:flex hidden items-center">
            <Link href="/">
                <h1 className="text-lg flex gap-3"><DropTitle title="DocsAI" label="DocsAI Premium" icon={Layers3}/></h1>
            </Link>
          </header>
          <BackgroundGradientAnimation className="z-0 w-full">
              <main>
                {children}
              </main>
          </BackgroundGradientAnimation>
        </div>
      </SideBar>
    </>
  );
}
