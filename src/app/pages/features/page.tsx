import { BentoGridSecondDemo } from "@/components/BentoGrid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <>
    <Navbar />
      <MaxWidthWrapper className="pt-32">
        <div className="text-center">
          <h1 className="font-semibold mb-2">
            Choose a feature you&apos;d like to use
          </h1>
          <span>DocsAI is here to provide you with quality services.</span>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-20">
        <BentoGridSecondDemo></BentoGridSecondDemo>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
