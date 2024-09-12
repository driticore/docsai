"use client";

import React, { useState } from "react";
import { RiUpload2Line } from "@remixicon/react";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function MobileFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center mt-0">
      <label className="justify-center items-center border-2 bg-white rounded-full p-10 text-center flex cursor-pointer">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <RiUpload2Line className="text-4xl " />
      </label>
      {selectedFile && (
        <div className="mt-4 text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </div>
      )}
    </div>
  );
}
