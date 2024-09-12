import { RiCopyrightLine } from "@remixicon/react";
import MaxWidthWrapper from "./MaxWidthWrapper";

export function Footer() {
    return(
        <footer className="w-full bg-black text-white">
            <MaxWidthWrapper className="flex justify-center p-5 items-center">
                DocsAI<RiCopyrightLine/>2024 
            </MaxWidthWrapper>
        </footer>
    )
}