"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="bg-transparent dark:bg-black  rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
