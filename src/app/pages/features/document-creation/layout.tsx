import { body, section } from "framer-motion/client";

export default function Layout( {children}:{children?: React.ReactNode} ) {
    return (
                <main className="bg-transparent w-full">
                    {children}
                </main>

    )
}