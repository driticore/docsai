import { FileUploadComponent } from "@/components/FileUpload";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClientUser from "@/components/User";
import { RiCheckLine } from "@remixicon/react";
import React from "react";

function DocumentAnalysis() {


  return (
    <>
      <main className="items-center flex justify-center flex-col overflow-hidden">
        <div className="md:pt-32 py-10 md:px-5 px-10 z-0">
          <h1 className="text-5xl text-background mb-5">Hi <ClientUser userId={""}/></h1>
          <p className="text-4xl text-gray-400">
            Here to give you advice on your document
          </p>
        </div>
        <MaxWidthWrapper className="items-center ">
          <FileUploadComponent/>
        </MaxWidthWrapper>

        
        
      </main>
      <footer className="fixed z-50 md:p-5 p-4 flex flex-col items-center bg-background gap-5 justify-center w-full bottom-0">
        <div className="flex flex-row w-full justify-center gap-5">
          <Input type="text" placeholder="Enter a prompt here" className="md:w-1/2 w-full p-6 border-2"/>
          <Button type="submit" className="p-6"><RiCheckLine/></Button>
        </div>
        <span className="text-center text-[12px]">DocsAI may display inaccurate info, including about people, so double-check its responses. Your privacy and DocsAI Apps</span>

      </footer>
    </>
  );
}

export default DocumentAnalysis;
