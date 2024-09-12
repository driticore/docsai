import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { RiClipboardFill, RiFileForbidFill, RiSignalWifi2Fill } from "@remixicon/react";
import { cn } from "@/lib/utils";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          link={item.link}
          img={item.img}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("border-2 border-solid border-black",item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    link:"/pages/features/document-analysis",
    img: "/card-1.png",
    title: "AI-Document Analysis",
    description: "Leverage AI-powered insights to analyze and refine document content, enhancing clarity and relevance.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <RiClipboardFill className="h-4 w-4 text-neutral-500" />,
  },
  {
    link:"/pages/features/document-analysis",
    img: "/card-2.png",
    title: "AI-Document Creation",
    description: "Effortlessly generate professional documents in various formats using AI-driven templates and customization tools.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <RiFileForbidFill className="h-4 w-4 text-neutral-500" />,
  },
  {
    link:"/pages/features/document-analysis",
    img: "/card-3.png",
    title: "AI-Document Editing",
    description: "Utilize DocsAI's intuitive editor and smart suggestions to modify and personalize documents in real time.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <RiSignalWifi2Fill className="h-4 w-4 text-neutral-500" />,
  },
];

